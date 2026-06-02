import { readFile } from "node:fs/promises";
import path from "node:path";
import { build } from "esbuild";

const narrativePath = path.join(process.cwd(), "kb-private", "numerology", "narrative.json");
const CORE = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "11", "22"];
const NINE = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const ZERO_TO_NINE = ["0", ...NINE];
const EXPECTED_KEYS = {
  lifePath: CORE, soul: CORE, destiny: CORE, birthday: CORE,
  personality: [...NINE, "11"], maturity: CORE, attitude: NINE, karmicLesson: NINE,
  pyramidPeak: NINE, pyramidChallenge: ["0", ...NINE], tensionNumber: NINE,
  soulChallenge: ZERO_TO_NINE, destinyChallenge: ZERO_TO_NINE, personalityChallenge: NINE,
  cognitiveAbility: NINE, approachMotivation: NINE, approachAbility: NINE,
  approachAttitude: NINE, personalYearDomains: NINE, karmicDebt: ["13", "14", "16", "19"],
};
const NAME_OPTIONAL_GROUPS = new Set(["karmicDebt"]);

async function loadSchema() {
  const { outputFiles } = await build({
    stdin: {
      contents: 'export { NarrativeKbSchema } from "@banmenh/shared";',
      loader: "ts",
      resolveDir: process.cwd(),
      sourcefile: "narrative-schema-entry.ts",
    },
    bundle: true,
    format: "esm",
    logLevel: "silent",
    platform: "node",
    write: false,
  });
  return import(`data:text/javascript;base64,${Buffer.from(outputFiles[0].text).toString("base64")}`);
}

function validateEntry(groupName, key, entry) {
  const errors = [];
  const prefix = `${groupName}.${key}`;
  if (!Array.isArray(entry.variables) || entry.variables.length === 0) {
    errors.push(`${prefix}.variables: must not be empty`);
  } else if (entry.variables[0] !== "name") {
    errors.push(`${prefix}.variables: first variable must be name`);
  }
  for (const variable of entry.variables ?? []) {
    if (NAME_OPTIONAL_GROUPS.has(groupName) && variable === "name") continue;
    if (!entry.html.includes(`{{${variable}}}`)) errors.push(`${prefix}.html: missing {{${variable}}}`);
  }
  if (entry.html.includes("${")) errors.push(`${prefix}.html: contains raw template expression`);
  return errors;
}

function validateSemantics(narrative) {
  const errors = [];
  const actualGroups = Object.keys(narrative).sort();
  const expectedGroups = Object.keys(EXPECTED_KEYS).sort();
  if (actualGroups.join(",") !== expectedGroups.join(",")) {
    errors.push(`groups: expected ${expectedGroups.join(",")}, got ${actualGroups.join(",")}`);
  }
  for (const [groupName, group] of Object.entries(narrative)) {
    if (!group || typeof group !== "object" || Array.isArray(group)) {
      errors.push(`${groupName}: group must be an object`);
      continue;
    }
    const actualKeys = Object.keys(group).sort((a, b) => Number(a) - Number(b));
    const expectedKeys = EXPECTED_KEYS[groupName];
    if (expectedKeys && actualKeys.join(",") !== expectedKeys.join(",")) {
      errors.push(`${groupName}: expected keys ${expectedKeys.join(",")}, got ${actualKeys.join(",")}`);
    }
    for (const [key, entry] of Object.entries(group)) errors.push(...validateEntry(groupName, key, entry));
  }
  return errors;
}

const narrative = JSON.parse(await readFile(narrativePath, "utf8"));
const { NarrativeKbSchema } = await loadSchema();
const result = NarrativeKbSchema.safeParse(narrative);
const semanticErrors = validateSemantics(narrative);
let total = 0;
for (const [groupName, group] of Object.entries(narrative)) {
  const count = Object.keys(group ?? {}).length;
  total += count;
  console.log(`${groupName}: ${count} entries`);
}
console.log(`total: ${total} entries`);
if (!result.success || semanticErrors.length > 0) {
  console.error("Validation fail:");
  if (!result.success) for (const issue of result.error.issues) console.error(`- ${issue.path.join(".")}: ${issue.message}`);
  for (const error of semanticErrors) console.error(`- ${error}`);
  process.exit(1);
}
console.log("Validation pass: Narrative KB structure and placeholders OK");
