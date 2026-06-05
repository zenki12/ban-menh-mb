import { readFile } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { build } from "esbuild";

const kbPath = path.join(process.cwd(), "kb-private", "numerology", "kb.json");
const v1EnginePath = path.join(process.cwd(), "kb-private", "numerology", "engine.v1.js");
const cases = [
  { fullName: "Nguyễn Văn A", dob: "1990-05-15", expectedLifePath: 3 },
  { fullName: "Trần Thị B", dob: "1985-11-22", expectedLifePath: 11 },
  { fullName: "Lê Hoàng C", dob: "2000-01-01", expectedLifePath: 4 },
  { fullName: "Nông Xuân Thái", dob: "1990-01-08", expectedLifePath: 1, expectedDisplayNumber: 10 },
];
const v1CompareCase = { fullName: "Le Hoang C", dob: "2000-01-01" };

async function loadEngine() {
  const { outputFiles } = await build({
    stdin: {
      contents: 'export { generateReport, calcLifePath, calcDestiny } from "@banmenh/shared";',
      loader: "ts",
      resolveDir: process.cwd(),
      sourcefile: "engine-entry.ts",
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
const { generateReport, calcLifePath, calcDestiny } = await loadEngine();

async function loadV1Engine() {
  const source = await readFile(v1EnginePath, "utf8");
  const sandbox = {
    module: { exports: {} },
    exports: {},
    require(specifier) {
      if (specifier.endsWith("numerology_knowledge_base.json")) return kb;
      if (specifier === "path") return path;
      throw new Error(`Blocked V1 require: ${specifier}`);
    },
  };
  vm.runInNewContext(source, sandbox, { filename: v1EnginePath });
  return sandbox.module.exports;
}

for (const testCase of cases) {
  const report = await generateReport(testCase, kb);
  const lifePath = calcLifePath(report.input.dobParts).number;
  const destiny = calcDestiny(testCase.fullName).number;

  if (report.lifePath.number !== testCase.expectedLifePath || lifePath !== testCase.expectedLifePath) {
    throw new Error(`${testCase.fullName}: lifePath mismatch`);
  }
  if (testCase.expectedDisplayNumber && report.lifePath.displayNumber !== testCase.expectedDisplayNumber) {
    throw new Error(`${testCase.fullName}: lifePath displayNumber mismatch`);
  }
  if (testCase.expectedDisplayNumber && report.lifePath.data?.title !== "Con số của sự hoàn thành & khởi đầu mới") {
    throw new Error(`${testCase.fullName}: lifePath 10 KB data missing`);
  }
  if (report.destiny.number !== destiny) {
    throw new Error(`${testCase.fullName}: destiny mismatch`);
  }
  if (!report.tensionNumber || typeof report.tensionNumber.number !== "number") {
    throw new Error(`${testCase.fullName}: missing tensionNumber`);
  }
  if (report.personalYearsRange?.length !== 3) {
    throw new Error(`${testCase.fullName}: personalYearsRange must contain 3 entries`);
  }
  if (report.personalMonthsRange?.length !== 3) {
    throw new Error(`${testCase.fullName}: personalMonthsRange must contain 3 entries`);
  }

  console.log(JSON.stringify(report, null, 2));
}

const v1 = await loadV1Engine();
const v1Report = v1.generateReport(v1CompareCase.fullName, "01/01/2000");
const v2Report = await generateReport(v1CompareCase, kb);

if (
  v1Report.life_path.number !== v2Report.lifePath.number ||
  v1Report.destiny_number.number !== v2Report.destiny.number
) {
  throw new Error("V1 compare mismatch for life path or destiny");
}

console.log(
  `V1 compare pass: lifePath=${v2Report.lifePath.number}, destiny=${v2Report.destiny.number}`,
);
console.log(`Engine test pass: ${cases.length} cases generated without crash`);
