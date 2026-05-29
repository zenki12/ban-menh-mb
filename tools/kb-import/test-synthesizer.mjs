import { readFile } from "node:fs/promises";
import path from "node:path";
import { build } from "esbuild";

const kbPath = path.join(process.cwd(), "kb-private", "numerology", "kb.json");
const narrativePath = path.join(process.cwd(), "kb-private", "numerology", "narrative.json");

const cases = [
  { fullName: "Nguyễn Văn A", dob: "1990-05-15" },
  { fullName: "Trần Thị B", dob: "1985-11-22" },
  { fullName: "Lê Hoàng C", dob: "2000-01-01" },
];

async function loadShared() {
  const { outputFiles } = await build({
    stdin: {
      contents: 'export { buildSynthesizedReport, generateReport } from "@banmenh/shared";',
      loader: "ts",
      resolveDir: process.cwd(),
      sourcefile: "synthesizer-entry.ts",
    },
    bundle: true,
    format: "esm",
    logLevel: "silent",
    platform: "node",
    write: false,
  });

  return import(`data:text/javascript;base64,${Buffer.from(outputFiles[0].text).toString("base64")}`);
}

const [kb, narrative] = await Promise.all([
  readFile(kbPath, "utf8").then(JSON.parse),
  readFile(narrativePath, "utf8").then(JSON.parse),
]);
const { buildSynthesizedReport, generateReport } = await loadShared();

for (const testCase of cases) {
  const report = await generateReport(testCase, kb);
  const sections = buildSynthesizedReport({ report, narrative, kb });
  const indicators = sections.flatMap((section) => section.indicators);
  const htmlLength = indicators.reduce((sum, item) => sum + item.html.length, 0);

  if (sections.length !== 6) throw new Error(`${testCase.fullName}: expected 6 sections`);
  if (indicators.length < 33) throw new Error(`${testCase.fullName}: expected at least 33 indicators`);
  if (!indicators.some((item) => item.key === "lifePath" && item.html.includes(testCase.fullName))) {
    throw new Error(`${testCase.fullName}: lifePath narrative missing name`);
  }

  console.log(
    `${testCase.fullName}: sections=${sections.length}, indicators=${indicators.length}, html=${htmlLength}`,
  );
}

console.log("Synthesizer test pass: 3 cases generated V1-style sections without crash");
