import { build } from "esbuild";

async function loadCharts() {
  const { outputFiles } = await build({
    stdin: {
      contents: 'export { calcCareerGroups, calcPersonalityGroups } from "@banmenh/shared";',
      loader: "ts",
      resolveDir: process.cwd(),
      sourcefile: "charts-entry.ts",
    },
    bundle: true,
    format: "esm",
    logLevel: "silent",
    platform: "node",
    write: false,
  });

  return import(`data:text/javascript;base64,${Buffer.from(outputFiles[0].text).toString("base64")}`);
}

function compactPersonality(groups) {
  return groups.map(({ num, raw }) => ({ num, raw }));
}

function compactCareer(groups) {
  return groups.map(({ key, pct }) => ({ key, pct }));
}

function assertDeepEqual(label, actual, expected) {
  const actualJson = JSON.stringify(actual);
  const expectedJson = JSON.stringify(expected);
  if (actualJson !== expectedJson) {
    throw new Error(`${label} mismatch\nactual:   ${actualJson}\nexpected: ${expectedJson}`);
  }
}

const { calcCareerGroups, calcPersonalityGroups } = await loadCharts();

const personalityCases = [
  {
    label: "01/01/1111 cap edge",
    dobParts: { day: 1, month: 1, year: 1111 },
    expected: [
      { num: 1, raw: 40 },
      { num: 2, raw: 39 },
      { num: 3, raw: 3 },
      { num: 4, raw: 3 },
      { num: 5, raw: 3 },
      { num: 6, raw: 3 },
      { num: 7, raw: 3 },
      { num: 8, raw: 3 },
      { num: 9, raw: 3 },
    ],
  },
  {
    label: "05/05/1995 typical",
    dobParts: { day: 5, month: 5, year: 1995 },
    expected: [
      { num: 9, raw: 33 },
      { num: 5, raw: 32 },
      { num: 1, raw: 17 },
      { num: 2, raw: 3 },
      { num: 3, raw: 3 },
      { num: 4, raw: 3 },
      { num: 6, raw: 3 },
      { num: 7, raw: 3 },
      { num: 8, raw: 3 },
    ],
  },
  {
    label: "15/08/1992 tied groups",
    dobParts: { day: 15, month: 8, year: 1992 },
    expected: [
      { num: 1, raw: 23 },
      { num: 9, raw: 23 },
      { num: 2, raw: 14 },
      { num: 5, raw: 14 },
      { num: 8, raw: 14 },
      { num: 3, raw: 3 },
      { num: 4, raw: 3 },
      { num: 6, raw: 3 },
      { num: 7, raw: 3 },
    ],
  },
];

for (const testCase of personalityCases) {
  const actual = compactPersonality(calcPersonalityGroups(testCase.dobParts));
  assertDeepEqual(testCase.label, actual, testCase.expected);
}

assertDeepEqual(
  "career lifePath=1 destiny=5",
  compactCareer(calcCareerGroups(1, 5)),
  [
    { key: "KD", pct: 59 },
    { key: "XH", pct: 12 },
    { key: "ST", pct: 11 },
    { key: "KT", pct: 9 },
    { key: "NC", pct: 9 },
  ],
);

console.log("Chart tests pass: 3 personality cases + 1 career case");
