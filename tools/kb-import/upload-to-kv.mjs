import { execSync } from "node:child_process";
import { statSync } from "node:fs";
import path from "node:path";
import { build } from "esbuild";

const namespaceId = "70886bee025145cf8ff352bcfa0148b6";
const files = [
  {
    key: "kb-numerology",
    path: path.join("kb-private", "numerology", "kb.json"),
    schema: "NumerologyKbSchema",
  },
  {
    key: "kb-narrative",
    path: path.join("kb-private", "numerology", "narrative.json"),
    schema: "NarrativeKbSchema",
  },
];

async function loadSchemas() {
  const { outputFiles } = await build({
    stdin: {
      contents: 'export { NumerologyKbSchema, NarrativeKbSchema } from "@banmenh/shared";',
      loader: "ts",
      resolveDir: process.cwd(),
      sourcefile: "kv-upload-schema-entry.ts",
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

function run(command) {
  console.log(command);
  execSync(command, { stdio: "inherit" });
}

const schemas = await loadSchemas();

try {
  for (const file of files) {
    const absolutePath = path.join(process.cwd(), file.path);
    const size = statSync(absolutePath).size;
    const json = JSON.parse(await import("node:fs/promises").then((fs) => fs.readFile(absolutePath, "utf8")));
    const schema = schemas[file.schema];
    const parsed = schema.safeParse(json);
    if (!parsed.success) {
      throw new Error(`${file.key} validation failed: ${parsed.error.message}`);
    }

    console.log(`${file.key}: ${(size / 1024).toFixed(1)} KiB validated`);
    run(
      `wrangler kv key put --remote --namespace-id ${namespaceId} "${file.key}" --path "${file.path}"`,
    );
  }

  console.log("KV upload complete");
} catch (err) {
  console.error("KV upload failed:");
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
}
