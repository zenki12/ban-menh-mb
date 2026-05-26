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

function countEntries(value) {
  return Object.keys(value).length;
}

const raw = await readFile(narrativePath, "utf8");
const narrative = JSON.parse(raw);
const { NarrativeKbSchema } = await loadSchema();
const result = NarrativeKbSchema.safeParse(narrative);

const lifePathCount = countEntries(narrative.lifePath ?? {});
const destinyCount = countEntries(narrative.destiny ?? {});
console.log(`lifePath: ${lifePathCount} entries`);
console.log(`destiny: ${destinyCount} entries`);
console.log(`total: ${lifePathCount + destinyCount} entries`);

if (!result.success) {
  console.error("Validation fail:");
  console.error(result.error.issues.map((issue) => `- ${issue.path.join(".")}: ${issue.message}`).join("\n"));
  process.exit(1);
}

console.log("Validation pass: Narrative KB structure OK");
