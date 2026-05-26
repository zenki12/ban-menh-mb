import { readFile } from "node:fs/promises";
import path from "node:path";
import { build } from "esbuild";

const kbPath = path.join(process.cwd(), "kb-private", "numerology", "kb.json");

async function loadSchema() {
  const { outputFiles } = await build({
    stdin: {
      contents: 'export { NumerologyKbSchema } from "@banmenh/shared";',
      loader: "ts",
      resolveDir: process.cwd(),
      sourcefile: "kb-schema-entry.ts",
    },
    bundle: true,
    format: "esm",
    logLevel: "silent",
    platform: "node",
    write: false,
  });

  const encoded = Buffer.from(outputFiles[0].text).toString("base64");
  const moduleUrl = `data:text/javascript;base64,${encoded}`;
  return import(moduleUrl);
}

function countIndicators(kb) {
  const excluded = new Set([
    "meta",
    "letter_map",
    "vowels",
    "y_rule",
    "birth_chart_grid",
    "birth_chart_axes",
  ]);

  return Object.entries(kb).reduce((total, [section, value]) => {
    if (excluded.has(section) || !value || typeof value !== "object" || Array.isArray(value)) {
      return total;
    }

    return total + Object.keys(value).filter((key) => key !== "note").length;
  }, 0);
}

function formatIssue(issue) {
  const at = issue.path.length > 0 ? issue.path.join(".") : "<root>";
  return `- ${at}: ${issue.message}`;
}

const raw = await readFile(kbPath, "utf8");
const kb = JSON.parse(raw);
const { NumerologyKbSchema } = await loadSchema();
const result = NumerologyKbSchema.safeParse(kb);

console.log(`So nhom KB: ${Object.keys(kb).length}`);
console.log(`So chi so tim duoc: ${countIndicators(kb)}`);

if (!result.success) {
  console.error("Validation fail:");
  console.error(result.error.issues.map(formatIssue).join("\n"));
  process.exit(1);
}

console.log("Validation pass: Numerology KB structure OK");
