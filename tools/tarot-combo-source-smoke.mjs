import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.env.TAROT_KB_SOURCE ?? "E:/huyen hoc AI/test/kb/commercial/tarot_kb";
const index = JSON.parse(readFileSync(path.join(root, "combos", "combo_index.json"), "utf8"));
const cards = JSON.parse(readFileSync(path.join(root, "cards", "cards.json"), "utf8")).cards;
const aliases = {
  one: "1", two: "2", three: "3", four: "4", five: "5",
  six: "6", seven: "7", eight: "8", nine: "9", ten: "10",
};
const normalize = (value) => value.trim().toLowerCase().replace(/\s+/g, " ")
  .replace(/^(one|two|three|four|five|six|seven|eight|nine|ten)\b/, (word) => aliases[word]);
const cardNames = new Set(cards.map((card) => normalize(card.name)));
const missingCards = [...new Set(index.combos.flatMap((combo) => combo.keys)
  .filter((key) => !cardNames.has(normalize(key))))];
const missingFiles = index.combos.filter((combo) => !existsSync(path.join(root, combo.detail_file)));
const counts = Object.fromEntries([2, 3, 4, 5].map((size) => [size, index.combos.filter((combo) => combo.size === size).length]));

if (index.combos.length !== 1544) throw new Error(`Sai tổng số combo: ${index.combos.length}.`);
if (missingCards.length > 0) throw new Error(`Không ánh xạ được lá bài: ${missingCards.join(", ")}.`);
if (missingFiles.length > 0) throw new Error(`Thiếu ${missingFiles.length} file detail.`);

console.log(JSON.stringify({
  combos: index.combos.length,
  counts,
  uniqueCards: new Set(index.combos.flatMap((combo) => combo.keys.map(normalize))).size,
  missingCards: 0,
  missingDetailFiles: 0,
}, null, 2));
