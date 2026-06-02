import { readFile } from "node:fs/promises";
import path from "node:path";
import { build } from "esbuild";

const kbPath = path.join(process.cwd(), "kb-private", "numerology", "kb.json");

const cases = [
  {
    fullName: "Hà Thu Hương",
    dob: "1996-09-03",
    expected: {
      soulChallenge: 3,
      destinyChallenge: 2,
      personalityChallenge: 1,
    },
  },
  {
    fullName: "Nông Xuân Thái",
    dob: "1996-01-01",
    expected: {
      soulChallenge: 7,
      destinyChallenge: 0,
      personalityChallenge: 7,
    },
  },
];

async function loadShared() {
  const { outputFiles } = await build({
    stdin: {
      contents: 'export { generateReport } from "@banmenh/shared";',
      loader: "ts",
      resolveDir: process.cwd(),
      sourcefile: "challenge-test-entry.ts",
    },
    bundle: true,
    format: "esm",
    logLevel: "silent",
    platform: "node",
    write: false,
  });

  return import(`data:text/javascript;base64,${Buffer.from(outputFiles[0].text).toString("base64")}`);
}

const kb = JSON.parse(await readFile(kbPath, "utf8"));
const { generateReport } = await loadShared();

for (const testCase of cases) {
  const report = await generateReport(testCase, kb);
  const actual = {
    soulChallenge: report.soulChallenge.number,
    destinyChallenge: report.destinyChallenge.number,
    personalityChallenge: report.personalityChallenge.number,
  };
  const pass = JSON.stringify(actual) === JSON.stringify(testCase.expected);
  console.log(testCase.fullName, pass ? "OK" : "FAIL", "actual:", actual, "expected:", testCase.expected);
  if (!pass) process.exit(1);
}

console.log("Challenge formula test pass: V2 challenge indicators match V1 formulas");
