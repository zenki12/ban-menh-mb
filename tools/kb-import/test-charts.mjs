import { build } from "esbuild";

async function loadCharts() {
  const { outputFiles } = await build({
    stdin: {
      contents:
        'export { calcBirthChartCells, calcCareerGroups, calcCombinedCells, calcNameChartCells, calcPersonalityGroups, detectArrows, detectIsolatedNumbers, findCompensated } from "@banmenh/shared";',
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

const {
  calcBirthChartCells,
  calcCareerGroups,
  calcCombinedCells,
  calcNameChartCells,
  calcPersonalityGroups,
  detectArrows,
  detectIsolatedNumbers,
  findCompensated,
} = await loadCharts();

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

assertDeepEqual("birth grid 15/08/1992", calcBirthChartCells({ day: 15, month: 8, year: 1992 }), {
  1: 2,
  2: 1,
  3: 0,
  4: 0,
  5: 1,
  6: 0,
  7: 0,
  8: 1,
  9: 2,
});

const arrowCells = { 1: 2, 2: 0, 3: 0, 4: 1, 5: 0, 6: 0, 7: 1, 8: 0, 9: 0 };
const arrows = detectArrows(arrowCells, { "147": "Mũi tên thực tế - Có đủ 1-4-7." });
assertDeepEqual("arrow 147 present", arrows.map(({ key, present }) => ({ key, present })), [
  { key: "147", present: true },
]);
assertDeepEqual("isolated without arrows", detectIsolatedNumbers({ 1: 1, 2: 0, 3: 0, 4: 0, 5: 1, 6: 0, 7: 0, 8: 0, 9: 0 }, []), [1, 5]);

const dobCells = calcBirthChartCells({ day: 15, month: 8, year: 1992 });
const nameCells = calcNameChartCells("Nguyen Van A", {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
});
assertDeepEqual("combined cell 3", calcCombinedCells(dobCells, nameCells)[3], nameCells[3]);
assertDeepEqual("compensated includes name-only numbers", findCompensated(dobCells, nameCells).includes(3), true);

console.log("Chart tests pass: 3 personality + career + grid/arrow cases");
