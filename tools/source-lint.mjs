#!/usr/bin/env node

import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const targetArg = process.argv[2] ?? "apps/web/src";
const targetDir = path.resolve(rootDir, targetArg);
const allowedExtensions = new Set([".css", ".js", ".jsx", ".mjs", ".ts", ".tsx"]);
const issues = [];

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if ([".next", "node_modules"].includes(entry.name)) continue;
      walk(fullPath);
      continue;
    }

    if (!entry.isFile() || !allowedExtensions.has(path.extname(entry.name))) continue;
    checkFile(fullPath);
  }
}

function checkFile(filePath) {
  const relativePath = path.relative(rootDir, filePath).replaceAll(path.sep, "/");
  const content = readFileSync(filePath, "utf8");
  const lineCount = content.split(/\r?\n/).length;

  if (lineCount > 600) {
    issues.push(`${relativePath}: file dài ${lineCount} dòng, vượt giới hạn 600 dòng.`);
  }

  if (/\bonclick\s*=/.test(content)) {
    issues.push(`${relativePath}: phát hiện inline onclick=, không dùng inline handler HTML.`);
  }

  if (/<script\b[\s\S]{500,}<\/script>/i.test(content)) {
    issues.push(`${relativePath}: phát hiện inline script lớn trong source UI.`);
  }

  if (/Failed to fetch/.test(content)) {
    issues.push(`${relativePath}: không hiển thị lỗi raw "Failed to fetch" cho user.`);
  }
}

try {
  if (!statSync(targetDir).isDirectory()) {
    throw new Error(`${targetArg} không phải thư mục.`);
  }

  walk(targetDir);
} catch (error) {
  console.error(`[source-lint] Không thể kiểm tra ${targetArg}: ${error.message}`);
  process.exit(1);
}

if (issues.length > 0) {
  console.error("[source-lint] Không đạt:");
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log("[source-lint] Pass: không phát hiện rule violation cơ bản.");
