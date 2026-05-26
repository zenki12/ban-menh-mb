import fs from "node:fs";
import path from "node:path";

const sourcePath = path.join(process.cwd(), "kb-private", "numerology", "narrative_v1_full.js");
const outputPath = path.join(process.cwd(), "kb-private", "numerology", "narrative.json");
const WANTED_KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "11", "22"];

function sliceGroup(source, groupName, nextGroupName) {
  const groupStart = source.indexOf(`  ${groupName}: {`);
  const nextStart = source.indexOf(`  ${nextGroupName}: {`, groupStart + 1);
  if (groupStart === -1 || nextStart === -1) throw new Error(`Cannot locate group ${groupName}`);
  return source.slice(groupStart, nextStart);
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

function fallbackFromExpression(expression) {
  if (!expression.includes("d?.")) return "";
  const match = /:\s*`([\s\S]*)`\s*$/.exec(expression.trim());
  return match?.[1] ?? "";
}

function replaceExpressions(body) {
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
    output += expression === "name" ? "{{name}}" : fallbackFromExpression(expression);
    i = end;
  }
  return output;
}

function extractGroup(groupText, groupName) {
  const entries = {};
  const entryPattern = /(\d+|11|22|33):\s*\(([^)]*)\)\s*=>\s*`/g;
  let match;
  while ((match = entryPattern.exec(groupText))) {
    const key = match[1];
    const params = match[2].split(",").map((param) => param.trim());
    const template = readTemplateLiteral(groupText, entryPattern.lastIndex);
    entryPattern.lastIndex = template.end;
    if (!WANTED_KEYS.includes(key)) continue;
    if (params[0] !== "name") throw new Error(`${groupName}.${key} does not accept name first`);

    const html = replaceExpressions(template.body);
    if (!html.includes("{{name}}")) throw new Error(`${groupName}.${key} missing {{name}}`);
    if (html.includes("${name}") || html.includes("${")) throw new Error(`${groupName}.${key} has raw template expressions`);
    entries[key] = { html, variables: ["name"] };
  }

  const count = Object.keys(entries).length;
  if (count !== WANTED_KEYS.length) throw new Error(`${groupName}: expected 11 entries, got ${count}`);
  return entries;
}

const source = fs.readFileSync(sourcePath, "utf8");
const narrative = {
  lifePath: extractGroup(sliceGroup(source, "lifePath", "soul"), "lifePath"),
  destiny: extractGroup(sliceGroup(source, "destiny", "personality"), "destiny"),
};

fs.writeFileSync(outputPath, `${JSON.stringify(narrative, null, 2)}\n`, "utf8");
console.log(`lifePath: ${Object.keys(narrative.lifePath).length} entries`);
console.log(`destiny: ${Object.keys(narrative.destiny).length} entries`);
console.log(`sample lifePath.1: ${narrative.lifePath["1"].html.slice(0, 100)}`);
