import { readFile } from "node:fs/promises";
import path from "node:path";
import { build } from "esbuild";

const kbPath = path.join(process.cwd(), "kb-private", "numerology", "kb.json");
const narrativePath = path.join(process.cwd(), "kb-private", "numerology", "narrative.json");

const cases = [
  { fullName: "Nguyễn Văn A", dob: "1990-05-15" },
  { fullName: "Trần Thị B", dob: "1985-11-22" },
  { fullName: "Lê Hoàng C", dob: "2000-01-01" },
  { fullName: "Nông Xuân Thái", dob: "1990-01-08", expectedLifePathDisplay: 10 },
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
  const synthesized = buildSynthesizedReport({ report, narrative, kb });
  const sections = synthesized.phases.flatMap((phase) => phase.sections);
  const htmlLength = sections.reduce((sum, item) => sum + item.html.length, 0);

  if (synthesized.phases.length !== 4) throw new Error(`${testCase.fullName}: expected 4 phases`);
  if (sections.length < 30) throw new Error(`${testCase.fullName}: expected at least 30 sections`);
  if (!sections.some((item) => item.number === "5" && item.html.includes(testCase.fullName))) {
    throw new Error(`${testCase.fullName}: lifePath narrative missing name`);
  }
  if (testCase.expectedLifePathDisplay) {
    const lifePathSection = sections.find((item) => item.number === "4");
    if (!lifePathSection?.html.includes("Số 10 (1+0=1)")) {
      throw new Error(`${testCase.fullName}: lifePath 10 narrative missing`);
    }
    if (synthesized.profileHeader.lifePathNumber !== testCase.expectedLifePathDisplay) {
      throw new Error(`${testCase.fullName}: profile lifePath display mismatch`);
    }
  }

  console.log(
    `${testCase.fullName}: phases=${synthesized.phases.length}, sections=${sections.length}, html=${htmlLength}`,
  );
}

console.log(`Synthesizer test pass: ${cases.length} cases generated V1-style sections without crash`);
