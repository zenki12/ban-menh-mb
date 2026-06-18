import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");

const KB_ROOT = "D:/huyen hoc AI/test/kb/commercial/tarot_kb";
const cardsSource = resolve(KB_ROOT, "cards/cards.json");
const comboIndexSource = resolve(KB_ROOT, "combos/combo_index.json");
const cardsOutput = resolve(rootDir, "scripts/tmp-cards-transformed.json");
const comboIndexOutput = resolve(rootDir, "scripts/tmp-combo-index.json");

function flattenAspects(aspects = {}) {
  const flat = {};

  for (const [niche, value] of Object.entries(aspects)) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      flat[niche] = value.upright ?? value.up ?? "";
      flat[`${niche}_rev`] = value.reversed ?? value.rev ?? "";
      continue;
    }

    flat[niche] = typeof value === "string" ? value : "";
  }

  return flat;
}

function main() {
  mkdirSync(dirname(cardsOutput), { recursive: true });

  const cardsData = JSON.parse(readFileSync(cardsSource, "utf8"));
  const cards = Array.isArray(cardsData.cards) ? cardsData.cards : [];
  const transformedCards = cards.map((card) => ({
    ...card,
    aspects: flattenAspects(card.aspects),
  }));

  writeFileSync(
    cardsOutput,
    JSON.stringify({ ...cardsData, cards: transformedCards }, null, 2),
    "utf8",
  );
  copyFileSync(comboIndexSource, comboIndexOutput);

  console.log("Tarot KB transform complete.");
  console.log(`Cards: ${cards.length} -> ${cardsOutput}`);
  console.log(`Combo index -> ${comboIndexOutput}`);
  console.log("");
  console.log("Run from workers/kb:");
  console.log(
    'npx wrangler kv:key put --binding BANMENH_KB_DEV "kb-tarot-cards" --path "../../scripts/tmp-cards-transformed.json"',
  );
  console.log(
    'npx wrangler kv:key put --binding BANMENH_KB_DEV "kb-tarot-combo-index" --path "../../scripts/tmp-combo-index.json"',
  );
}

try {
  main();
} catch (err) {
  console.error("Tarot KB transform failed.");
  console.error(err instanceof Error ? err.message : err);
  process.exitCode = 1;
}
