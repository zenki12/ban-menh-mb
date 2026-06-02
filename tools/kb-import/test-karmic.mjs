import { build } from "esbuild";

async function loadKarmic() {
  const { outputFiles } = await build({
    stdin: {
      contents: 'export { detectKarmicDebt } from "@banmenh/shared";',
      loader: "ts",
      resolveDir: process.cwd(),
      sourcefile: "karmic-entry.ts",
    },
    bundle: true,
    format: "esm",
    logLevel: "silent",
    platform: "node",
    write: false,
  });

  return import(`data:text/javascript;base64,${Buffer.from(outputFiles[0].text).toString("base64")}`);
}

const { detectKarmicDebt } = await loadKarmic();

const cases = [
  { raw: 10, expected: undefined, label: "raw=10 NOT karmic" },
  { raw: 13, expected: 13, label: "raw=13 karmic" },
  { raw: 14, expected: 14, label: "raw=14 karmic" },
  { raw: 16, expected: 16, label: "raw=16 karmic" },
  { raw: 19, expected: 19, label: "raw=19 karmic" },
  { raw: 9, expected: undefined, label: "raw=9 not karmic" },
];

let pass = true;
for (const testCase of cases) {
  const actual = detectKarmicDebt(testCase.raw);
  const ok = actual === testCase.expected;
  if (!ok) pass = false;
  console.log(testCase.label, ok ? "OK" : "FAIL", "actual:", actual, "expected:", testCase.expected);
}

if (!pass) process.exit(1);
console.log("Karmic debt tests pass: 10 excluded, 13/14/16/19 included");
