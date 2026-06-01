import fs from "node:fs";
import path from "node:path";
import { SOUL_CHALLENGE_EXTENDED } from "../../kb-private/numerology/soul-challenge-extended.mjs";

const sourcePath = path.join(process.cwd(), "kb-private", "numerology", "narrative_v1_full.js");
const outputPath = path.join(process.cwd(), "kb-private", "numerology", "narrative.json");
const CORE_KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "11", "22"];
const ONE_TO_NINE = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const ZERO_TO_NINE = ["0", ...ONE_TO_NINE];
const GROUP_CONFIG = {
  lifePath: { params: ["name"], keys: CORE_KEYS, nextGroup: "soul" },
  soul: { params: ["name"], keys: CORE_KEYS, nextGroup: "destiny" },
  destiny: { params: ["name", "d"], keys: CORE_KEYS, nextGroup: "personality" },
  personality: { params: ["name", "d"], keys: CORE_KEYS, nextGroup: "maturity" },
  maturity: { params: ["name", "d"], keys: CORE_KEYS, nextGroup: "attitude" },
  attitude: { params: ["name", "d"], keys: CORE_KEYS, nextGroup: "karmicLesson" },
  karmicLesson: { params: ["name"], keys: ONE_TO_NINE, nextGroup: "birthday" },
  birthday: { params: ["name", "d"], keys: CORE_KEYS, nextGroup: "pyramidPeak" },
  pyramidPeak: { params: ["name", "period", "peakIndex"], keys: ONE_TO_NINE, nextGroup: "pyramidChallenge" },
  pyramidChallenge: { params: ["name", "period"], keys: ZERO_TO_NINE, nextGroup: "tensionNumber" },
  tensionNumber: { params: ["name", "d"], keys: ZERO_TO_NINE, nextGroup: "soulChallenge" },
  soulChallenge: { params: ["name", "d"], keys: ZERO_TO_NINE, nextGroup: "destinyChallenge" },
  destinyChallenge: { params: ["name", "d"], keys: ZERO_TO_NINE, nextGroup: "personalityChallenge" },
  personalityChallenge: { params: ["name", "d"], keys: ZERO_TO_NINE, nextGroup: "cognitiveAbility" },
  cognitiveAbility: { params: ["name", "d"], keys: ONE_TO_NINE, nextGroup: "approachMotivation" },
  approachMotivation: { params: ["name", "d"], keys: ONE_TO_NINE, nextGroup: "approachAbility" },
  approachAbility: { params: ["name", "d"], keys: ONE_TO_NINE, nextGroup: "approachAttitude" },
  approachAttitude: { params: ["name", "d"], keys: ONE_TO_NINE, nextGroup: "personalYearDomains" },
  personalYearDomains: { params: ["name", "year", "age"], keys: [...ONE_TO_NINE, "11"], nextGroup: null },
};

function sliceGroup(source, groupName, nextGroupName) {
  const groupStart = source.indexOf(`  ${groupName}: {`);
  if (groupStart === -1) throw new Error(`Cannot locate group ${groupName}`);
  if (nextGroupName === null) {
    const braceStart = source.indexOf("{", groupStart);
    return source.slice(groupStart, skipExpression(source, braceStart + 1));
  }
  const nextStart = source.indexOf(`  ${nextGroupName}: {`, groupStart + 1);
  if (nextStart === -1) throw new Error(`Cannot locate next group ${nextGroupName}`);
  return source.slice(groupStart, nextStart);
}

function findOverrideGroup(source, groupName) {
  const pattern = new RegExp(`NarrativeTemplates\\.${groupName}\\s*=\\s*\\{`, "g");
  let match;
  let latest = null;

  while ((match = pattern.exec(source))) {
    const braceStart = source.indexOf("{", match.index);
    if (braceStart === -1) throw new Error(`Cannot locate override body for ${groupName}`);
    const braceEnd = skipExpression(source, braceStart + 1);
    latest = {
      index: match.index,
      text: source.slice(match.index, braceEnd),
    };
    pattern.lastIndex = braceEnd;
  }

  return latest;
}

function skipQuoted(source, index, quote) {
  let i = index + 1;
  while (i < source.length) {
    if (source[i] === "\\") {
      i += 2;
    } else if (source[i] === quote) {
      return i + 1;
    } else {
      i += 1;
    }
  }
  throw new Error("Unclosed quoted string in template expression");
}

function skipTemplate(source, index) {
  let i = index + 1;
  while (i < source.length) {
    if (source[i] === "\\") {
      i += 2;
    } else if (source[i] === "`") {
      return i + 1;
    } else if (source[i] === "$" && source[i + 1] === "{") {
      i = skipExpression(source, i + 2);
    } else {
      i += 1;
    }
  }
  throw new Error("Unclosed nested template literal");
}

function skipExpression(source, index) {
  let depth = 1;
  let i = index;
  while (i < source.length) {
    const char = source[i];
    if (char === "'" || char === '"') {
      i = skipQuoted(source, i, char);
    } else if (char === "`") {
      i = skipTemplate(source, i);
    } else if (char === "{") {
      depth += 1;
      i += 1;
    } else if (char === "}") {
      depth -= 1;
      i += 1;
      if (depth === 0) return i;
    } else {
      i += 1;
    }
  }
  throw new Error("Unclosed template expression");
}

function readTemplateLiteral(source, start) {
  let i = start;
  while (i < source.length) {
    if (source[i] === "\\") {
      i += 2;
    } else if (source[i] === "`") {
      return { body: source.slice(start, i), end: i + 1 };
    } else if (source[i] === "$" && source[i + 1] === "{") {
      i = skipExpression(source, i + 2);
    } else {
      i += 1;
    }
  }
  throw new Error("Unclosed template literal");
}

function readTemplateLiteralsFromObject(source, start) {
  const braceStart = source[start] === "{" ? start : source.indexOf("{", start);
  if (braceStart === -1) throw new Error("Cannot locate object body");
  const braceEnd = skipExpression(source, braceStart + 1);
  const objectBody = source.slice(braceStart + 1, braceEnd - 1);
  const chunks = [];
  let i = 0;
  while (i < objectBody.length) {
    if (objectBody[i] !== "`") {
      i += 1;
      continue;
    }
    const template = readTemplateLiteral(objectBody, i + 1);
    chunks.push(template.body);
    i = template.end;
  }
  return { body: chunks.join("\n"), end: braceEnd };
}

function fallbackFromExpression(expression) {
  if (!expression.includes("d?.")) return "";
  const match = /:\s*`([\s\S]*)`\s*$/.exec(expression.trim());
  return match?.[1] ?? "";
}

function replaceExpressions(body) {
  const directVariables = new Set(["name", "period", "year", "age", "peakIndex"]);
  let output = "";
  let i = 0;
  while (i < body.length) {
    if (body[i] !== "$" || body[i + 1] !== "{") {
      output += body[i];
      i += 1;
      continue;
    }

    const end = skipExpression(body, i + 2);
    const expression = body.slice(i + 2, end - 1).trim();
    output += directVariables.has(expression) ? `{{${expression}}}` : fallbackFromExpression(expression);
    i = end;
  }
  return output;
}

function stripLeadingListDashes(html) {
  return html.replace(/(<li[^>]*>\s*<p[^>]*>)-\s+/g, "$1");
}

function ensureVisiblePlaceholders(html, groupName) {
  if (groupName === "pyramidPeak" && !html.includes("{{peakIndex}}")) {
    return `<p class="nar"><strong>Đỉnh {{peakIndex}}</strong></p>\n${html}`;
  }
  if (groupName === "personalYearDomains" && (!html.includes("{{year}}") || !html.includes("{{age}}"))) {
    return `<p class="nar">Năm <strong>{{year}}</strong>, khi <strong>{{name}}</strong> bước sang tuổi <strong>{{age}}</strong>, các miền đời sống nổi bật như sau.</p>\n${html}`;
  }
  return html;
}

function extractGroup(groupText, groupName, config) {
  const entries = {};
  const entryPattern = /(\d+|11|22|33):\s*\(([^)]*)\)\s*=>\s*(`|\(\{)/g;
  let match;
  while ((match = entryPattern.exec(groupText))) {
    const key = match[1];
    const params = match[2].split(",").map((param) => param.trim());
    const template =
      match[3] === "`"
        ? readTemplateLiteral(groupText, entryPattern.lastIndex)
        : readTemplateLiteralsFromObject(groupText, entryPattern.lastIndex - 1);
    entryPattern.lastIndex = template.end;
    if (!config.keys.includes(key)) continue;
    if (params[0] !== "name") throw new Error(`${groupName}.${key} does not accept name first`);
    if (!config.keys.includes(key)) throw new Error(`${groupName}.${key} is not configured`);
    if (entries[key]) throw new Error(`${groupName}.${key} extracted more than once`);

    let html = stripLeadingListDashes(replaceExpressions(template.body));
    html = ensureVisiblePlaceholders(html, groupName);
    if (!html.includes("{{name}}")) throw new Error(`${groupName}.${key} missing {{name}}`);
    if (html.includes("${")) throw new Error(`${groupName}.${key} has raw template expressions`);
    for (const param of config.params) {
      if (param !== "d" && !html.includes(`{{${param}}}`)) {
        throw new Error(`${groupName}.${key} missing {{${param}}}`);
      }
    }
    entries[key] = { html, variables: config.params.filter((param) => param !== "d") };
  }

  const count = Object.keys(entries).length;
  if (count === 0) throw new Error(`${groupName}: no entries extracted`);
  return entries;
}

function validateSoulChallengeHtml(key, html) {
  const required = [
    "Thử thách này biểu hiện như thế nào trong cuộc sống",
    "Nguồn gốc sâu của Thử thách này",
    "Biểu hiện trong các mối quan hệ",
    "Những gì bạn cần thực hành",
    "Dấu hiệu cho thấy bạn đang vượt qua Thử thách này",
    "Tóm lại",
    "{{name}}",
  ];
  const missing = required.filter((item) => !html.includes(item));
  if (html.length < 4500) throw new Error(`T-0606c: soulChallenge[${key}] length ${html.length} < 4500`);
  if (missing.length > 0) throw new Error(`T-0606c: soulChallenge[${key}] missing ${missing.join(" | ")}`);
  if (html.includes("${")) throw new Error(`T-0606c: soulChallenge[${key}] has leaked template expression`);
}

function mergeExtendedSoulChallenge(narrative) {
  const validKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  for (const key of validKeys) {
    if (key === "1") {
      const html = narrative.soulChallenge[key]?.html ?? "";
      if (!html.includes("Nguồn gốc sâu")) {
        throw new Error("T-0606c: V1 soulChallenge[1] thiếu rich content - extractor V1 fail");
      }
      continue;
    }
    const extended = SOUL_CHALLENGE_EXTENDED[Number(key)];
    if (!extended) {
      throw new Error(`T-0606c: SOUL_CHALLENGE_EXTENDED missing key ${key}`);
    }
    narrative.soulChallenge[key] = {
      html: extended,
      variables: ["name"],
    };
  }

  for (const key of validKeys) {
    validateSoulChallengeHtml(key, narrative.soulChallenge[key]?.html ?? "");
  }
}

const source = fs.readFileSync(sourcePath, "utf8");
const narrative = {};
let total = 0;

for (const [groupName, config] of Object.entries(GROUP_CONFIG)) {
  const overrideGroup = findOverrideGroup(source, groupName);
  const literalGroupText = sliceGroup(source, groupName, config.nextGroup);
  const literalEntries = extractGroup(literalGroupText, groupName, config);
  const overrideEntries = overrideGroup ? extractGroup(overrideGroup.text, groupName, config) : {};
  narrative[groupName] = { ...literalEntries, ...overrideEntries };
  const count = Object.keys(narrative[groupName]).length;
  total += count;
  console.log(
    `${groupName}: ${count} entries${
      overrideGroup ? ` (override @ ${overrideGroup.index}, ${Object.keys(overrideEntries).length} entries)` : ""
    }`,
  );
}

mergeExtendedSoulChallenge(narrative);

fs.writeFileSync(outputPath, `${JSON.stringify(narrative, null, 2)}\n`, "utf8");
console.log(`total: ${total} entries`);
