import { readFile } from "node:fs/promises";
import path from "node:path";
import { build } from "esbuild";

const kbPath = path.join(process.cwd(), "kb-private", "numerology", "kb.json");
const narrativePath = path.join(process.cwd(), "kb-private", "numerology", "narrative.json");

const TEST_CASES = [
  { fullName: "Nguyễn Văn A", dob: "1990-05-15" },
  { fullName: "Trần Thị B", dob: "1985-11-22" },
  { fullName: "Nông Xuân Thái", dob: "1996-09-03" },
];

const FORBIDDEN_ASCII = [
  { pattern: /\btuoi\b/gi, expected: "tuổi" },
  { pattern: /\btro di\b/gi, expected: "trở đi" },
  { pattern: /\bgiai doan\b/gi, expected: "giai đoạn" },
];

async function loadShared() {
  const { outputFiles } = await build({
    stdin: {
      contents: 'export { buildSynthesizedReport, generateReport } from "@banmenh/shared";',
      loader: "ts",
      resolveDir: process.cwd(),
      sourcefile: "diacritics-entry.ts",
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

for (const testCase of TEST_CASES) {
  const report = await generateReport(testCase, kb);
  const synthesized = buildSynthesizedReport({ report, narrative, kb });
  const sectionsHtml = synthesized.phases
    .flatMap((phase) => phase.sections)
    .map((section) => section.html)
    .join("\n");
  const periods = [...report.pyramidPeaks, ...report.pyramidChallenges, ...report.lifeCycles]
    .map((item) => item.period)
    .join("\n");
  const target = `${sectionsHtml}\n${periods}`;

  for (const rule of FORBIDDEN_ASCII) {
    rule.pattern.lastIndex = 0;
    const match = rule.pattern.exec(target);
    if (match) {
      throw new Error(
        `${testCase.dob}: found ASCII "${match[0]}" near index ${match.index}; expected "${rule.expected}"`,
      );
    }
  }
}

console.log("Diacritics test pass: no ASCII Vietnamese leakage");
