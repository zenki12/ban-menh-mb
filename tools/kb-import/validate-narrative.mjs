import { readFile } from "node:fs/promises";
import path from "node:path";
import { build } from "esbuild";

const narrativePath = path.join(process.cwd(), "kb-private", "numerology", "narrative.json");

async function loadSchema() {
  const { outputFiles } = await build({
    stdin: {
      contents: 'export { NarrativeKbSchema } from "@banmenh/shared";',
      loader: "ts",
      resolveDir: process.cwd(),
      sourcefile: "narrative-schema-entry.ts",
    },
    bundle: true,
    format: "esm",
    logLevel: "silent",
    platform: "node",
    write: false,
  });

  const encoded = Buffer.from(outputFiles[0].text).toString("base64");
  return import(`data:text/javascript;base64,${encoded}`);
}

function validateEntry(groupName, key, entry) {
  const errors = [];
  const prefix = `${groupName}.${key}`;
  if (!Array.isArray(entry.variables) || entry.variables.length === 0) {
    errors.push(`${prefix}.variables: must not be empty`);
  } else if (entry.variables[0] !== "name") {
    errors.push(`${prefix}.variables: first variable must be name`);
  }

  for (const variable of entry.variables ?? []) {
    if (!entry.html.includes(`{{${variable}}}`)) {
      errors.push(`${prefix}.html: missing {{${variable}}}`);
    }
  }

  if (entry.html.includes("${")) {
    errors.push(`${prefix}.html: contains raw template expression`);
  }
  return errors;
}

function validateSemantics(narrative) {
  const errors = [];
  for (const [groupName, group] of Object.entries(narrative)) {
    if (!group || typeof group !== "object" || Array.isArray(group)) {
      errors.push(`${groupName}: group must be an object`);
      continue;
    }
    for (const [key, entry] of Object.entries(group)) {
      errors.push(...validateEntry(groupName, key, entry));
    }
  }
  return errors;
}

function countEntries(group) {
  return Object.keys(group ?? {}).length;
}

const raw = await readFile(narrativePath, "utf8");
const narrative = JSON.parse(raw);
const { NarrativeKbSchema } = await loadSchema();
const result = NarrativeKbSchema.safeParse(narrative);
const semanticErrors = validateSemantics(narrative);

let total = 0;
for (const [groupName, group] of Object.entries(narrative)) {
  const count = countEntries(group);
  total += count;
  console.log(`${groupName}: ${count} entries`);
}
console.log(`total: ${total} entries`);

if (!result.success || semanticErrors.length > 0) {
  console.error("Validation fail:");
  if (!result.success) {
    for (const issue of result.error.issues) {
      console.error(`- ${issue.path.join(".")}: ${issue.message}`);
    }
  }
  for (const error of semanticErrors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Validation pass: Narrative KB structure and placeholders OK");
