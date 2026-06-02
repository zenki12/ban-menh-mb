import { build } from "esbuild";

async function loadGridAnalysis() {
  const { outputFiles } = await build({
    stdin: {
      contents:
        'export { ARROWS, CELL_KNOWLEDGE, buildArrowsAnalysis, buildCellAnalysis, buildCompensationAnalysis, combineGridCells, parseDigitGrid, parseNameGrid } from "@banmenh/shared";',
      loader: "ts",
      resolveDir: process.cwd(),
      sourcefile: "grid-analysis-entry.ts",
    },
    bundle: true,
    format: "esm",
    logLevel: "silent",
    platform: "node",
    write: false,
  });

  return import(`data:text/javascript;base64,${Buffer.from(outputFiles[0].text).toString("base64")}`);
}

function assertDeepEqual(label, actual, expected) {
  const actualJson = JSON.stringify(actual);
  const expectedJson = JSON.stringify(expected);
  if (actualJson !== expectedJson) {
    throw new Error(`${label} mismatch\nactual:   ${actualJson}\nexpected: ${expectedJson}`);
  }
}

function assertIncludes(label, value, needle) {
  if (!value.includes(needle)) {
    throw new Error(`${label} missing ${needle}`);
  }
}

const {
  ARROWS,
  CELL_KNOWLEDGE,
  buildArrowsAnalysis,
  buildCellAnalysis,
  buildCompensationAnalysis,
  combineGridCells,
  parseDigitGrid,
  parseNameGrid,
} = await loadGridAnalysis();

assertDeepEqual("CELL_KNOWLEDGE entries", Object.keys(CELL_KNOWLEDGE).sort(), [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
]);
assertDeepEqual("ARROWS count", ARROWS.length, 8);

const dobGrid = parseDigitGrid("19960202");
assertDeepEqual("parseDigitGrid 19960202", dobGrid, {
  1: 1,
  2: 2,
  3: 0,
  4: 0,
  5: 0,
  6: 1,
  7: 0,
  8: 0,
  9: 2,
});

const nameGrid = parseNameGrid("H\u00e0 Thu H\u01b0\u01a1ng");
assertDeepEqual("parseNameGrid Ha Thu Huong", nameGrid, {
  1: 1,
  2: 1,
  3: 2,
  4: 0,
  5: 1,
  6: 1,
  7: 1,
  8: 3,
  9: 0,
});

const cellHtml = buildCellAnalysis(dobGrid, "dob");
assertIncludes("cell analysis heading", cellHtml, "Ph\u00e2n T\u00edch T\u1eebng S\u1ed1 Trong Bi\u1ec3u \u0110\u1ed3 Ng\u00e0y Sinh");
assertDeepEqual("cell analysis paragraph count", (cellHtml.match(/<p class="nar">/g) || []).length, 9);

const arrowHtml = buildArrowsAnalysis(dobGrid, "Bi\u1ec3u \u0111\u1ed3 Ng\u00e0y Sinh");
assertIncludes("arrow analysis heading", arrowHtml, "Ph\u00e2n T\u00edch M\u0169i T\u00ean S\u1ee9c M\u1ea1nh");
assertIncludes("arrow analysis missing class", arrowHtml, "missing-arrow");
assertDeepEqual("arrow block count", (arrowHtml.match(/arrow-block/g) || []).length, 8);

const activeArrowHtml = buildArrowsAnalysis({ 1: 1, 2: 1, 3: 1, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 }, "Test Grid");
assertIncludes("arrow analysis active class", activeArrowHtml, "active-arrow");

const combinedGrid = combineGridCells(dobGrid, nameGrid);
const compensationHtml = buildCompensationAnalysis(dobGrid, nameGrid, combinedGrid, "H\u00e0 Thu H\u01b0\u01a1ng");
assertIncludes("compensation intro", compensationHtml, "Khi k\u1ebft h\u1ee3p bi\u1ec3u \u0111\u1ed3 ng\u00e0y sinh v\u00e0 bi\u1ec3u \u0111\u1ed3 t\u00ean");
assertIncludes("compensation blocks", compensationHtml, "arrow-block");
assertIncludes("compensation escaped name", compensationHtml, "H\u00e0 Thu H\u01b0\u01a1ng");

console.log("Grid analysis tests pass: V1 CELL_KNOWLEDGE/ARROWS + parse/render cases");
