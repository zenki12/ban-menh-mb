#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import {
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
} from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const ignoredDirs = new Set([
  ".agent",
  ".agents",
  ".claude",
  ".git",
  ".kiro",
  ".next",
  "_bmad",
  "kb-private",
  "node_modules",
]);
const textExtensions = new Set([
  ".css",
  ".env",
  ".example",
  ".html",
  ".js",
  ".json",
  ".jsx",
  ".md",
  ".mjs",
  ".ts",
  ".tsx",
  ".txt",
]);

const frontendDirs = ["apps/web/public", "apps/web/src"];
const forbiddenKbPathPatterns = [
  /(^|\/)kb-private(\/|$)/i,
  /(^|\/)tarot_kb(\/|$)/i,
  /(^|\/)than-so-hoc-export(\/|$)/i,
  /(^|\/)numerology_core(\/|$)/i,
  /(^|\/)narrative_templates\.js$/i,
  /(^|\/)kb\.json$/i,
];
const forbiddenKbImportPatterns = [
  /from\s+["'][^"']*(kb-private|tarot_kb|than-so-hoc-export|numerology_core|narrative_templates|kb\.json)[^"']*["']/i,
  /import\s*\([^)]*["'][^"']*(kb-private|tarot_kb|than-so-hoc-export|numerology_core|narrative_templates|kb\.json)[^"']*["'][^)]*\)/i,
];
const secretAssignmentPattern =
  /^\s*(?:export\s+)?(?:const\s+)?(?:[A-Z0-9_]*(?:SECRET|TOKEN|PASSWORD|PRIVATE_KEY|API_KEY|CHECKSUM_KEY|CLIENT_SECRET|BOT_TOKEN)[A-Z0-9_]*)\s*[:=]\s*["']?([^"'\s#]+)["']?/i;
const placeholderValues = new Set([
  "",
  "changeme",
  "change_me",
  "example",
  "placeholder",
  "todo",
  "your_value_here",
]);

const issues = [];

function toRelative(filePath) {
  return path.relative(rootDir, filePath).replaceAll(path.sep, "/");
}

function walk(dir, onFile) {
  if (!existsSync(dir)) return;

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (ignoredDirs.has(entry.name)) continue;
      walk(fullPath, onFile);
      continue;
    }

    if (entry.isFile()) onFile(fullPath);
  }
}

function checkTrackedEnvFiles() {
  let tracked = "";

  try {
    tracked = execFileSync("git", ["ls-files", "-z", "--", ".env", ".env.*"], {
      cwd: rootDir,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
  } catch {
    return;
  }

  const envFiles = tracked.split("\0").filter(Boolean);
  for (const filePath of envFiles) {
    if (filePath !== ".env.example") {
      issues.push(`${filePath}: .env thật đang được git track.`);
    }
  }
}

function checkSecretAssignments() {
  walk(rootDir, (filePath) => {
    const relativePath = toRelative(filePath);
    const ext = path.extname(filePath);

    if (relativePath === ".env.example") return;
    // Workers source dùng tên biến env như FIREBASE_PRIVATE_KEY trong type/param
    // — không phải hardcode secret. Scan KB leak riêng qua checkKbLeakage.
    if (relativePath.startsWith("workers/")) return;
    if (!textExtensions.has(ext) && !relativePath.endsWith("package-lock.json")) return;

    const content = readFileSync(filePath, "utf8");
    const lines = content.split(/\r?\n/);

    lines.forEach((line, index) => {
      const match = line.match(secretAssignmentPattern);
      if (!match) return;

      const value = match[1].trim().replace(/,$/, "");
      if (placeholderValues.has(value.toLowerCase())) return;

      issues.push(`${relativePath}:${index + 1}: nghi ngờ hardcode secret/token.`);
    });
  });
}

function checkKbLeakage() {
  for (const dir of frontendDirs) {
    const absoluteDir = path.resolve(rootDir, dir);

    walk(absoluteDir, (filePath) => {
      const relativePath = toRelative(filePath);

      if (forbiddenKbPathPatterns.some((pattern) => pattern.test(relativePath))) {
        issues.push(`${relativePath}: KB/private source không được nằm trong frontend/static asset.`);
      }

      if (![".js", ".jsx", ".mjs", ".ts", ".tsx"].includes(path.extname(filePath))) return;

      const content = readFileSync(filePath, "utf8");
      if (forbiddenKbImportPatterns.some((pattern) => pattern.test(content))) {
        issues.push(`${relativePath}: frontend không được import trực tiếp KB/private data.`);
      }
    });
  }
}

try {
  if (!statSync(rootDir).isDirectory()) {
    throw new Error("Project root không hợp lệ.");
  }

  checkTrackedEnvFiles();
  checkSecretAssignments();
  checkKbLeakage();
} catch (error) {
  console.error(`[security-smoke] Không thể chạy smoke check: ${error.message}`);
  process.exit(1);
}

if (issues.length > 0) {
  console.error("[security-smoke] Không đạt:");
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log("[security-smoke] Pass: không phát hiện .env thật, secret hardcode phổ biến, hoặc KB leak trong frontend/static.");
