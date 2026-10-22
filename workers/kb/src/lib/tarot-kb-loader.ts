// Tarot KB loader: KV stores small indexes, R2 stores large combo detail files.

import {
  TAROT_COMBO_DOMAINS,
  type TarotComboDomainReading,
  type TarotComboLibraryItem,
} from "@banmenh/shared";

export interface TarotKBCard {
  id: number;
  name: string;
  nameVi: string;
  number?: string;
  arcana: "major" | "minor";
  suit: string | null;
  image: string;
  keywords: string[];
  keywordsRev: string[];
  upright: string;
  reversed: string;
  element?: string;
  planet?: string;
  zodiac?: string;
  numerology?: string;
  aspects: Record<string, string | { upright?: string; reversed?: string }>;
}

export function getTarotAspectMeaning(card: TarotKBCard, niche: string, reversed: boolean): string {
  const nested = card.aspects?.[niche];
  if (typeof nested === "object" && nested) {
    return (reversed ? nested.reversed : nested.upright) ?? "";
  }
  if (typeof nested === "string") return nested;

  const flattened = card.aspects?.[reversed ? `${niche}_rev` : niche];
  if (typeof flattened === "string") return flattened;

  const general = card.aspects?.general;
  if (typeof general === "object" && general) {
    return (reversed ? general.reversed : general.upright) ?? "";
  }
  const flatGeneral = card.aspects?.[reversed ? "general_rev" : "general"];
  return typeof flatGeneral === "string" ? flatGeneral : "";
}

export interface TarotKBComboEntry {
  id: string;
  size: number;
  keys: string[];
  title: string;
  desc: string;
  detail_file: string;
}

export interface TarotKBComboIndex {
  counts: { unique_combos: number };
  combos: TarotKBComboEntry[];
}

export interface TarotComboDrawnCard {
  id: number;
  nameEn: string;
  nameVi: string;
  orientation: "upright" | "reversed";
}

export interface TarotKBMatchedCombo {
  entry: TarotKBComboEntry;
  cards: TarotComboDrawnCard[];
  orientationVariant: string;
}

export type TarotKBComboDetail = Record<string, Record<string, string>>;

export interface TarotKBClarify {
  source?: string;
  permission?: string;
  credit_display?: string;
  groups: Record<string, string[]>;
}

const KV_KEYS = {
  cards: "kb-tarot-cards",
  comboIndex: "kb-tarot-combo-index",
  taxonomy: "kb-tarot-taxonomy",
  daily: "kb-tarot-daily",
  clarify: "kb-tarot-clarify",
} as const;

let cachedCards: TarotKBCard[] | null = null;
let cachedComboIndex: TarotKBComboIndex | null = null;
let cachedClarify: TarotKBClarify | null = null;

async function kvGet<T>(kv: KVNamespace, key: string): Promise<T> {
  const raw = await kv.get(key);
  if (!raw) throw new Error(`KV key '${key}' not found. Run tarot KB upload script first.`);
  return JSON.parse(raw) as T;
}

export async function loadTarotCards(kv: KVNamespace): Promise<TarotKBCard[]> {
  if (cachedCards) return cachedCards;
  const data = await kvGet<{ cards: TarotKBCard[] }>(kv, KV_KEYS.cards);
  cachedCards = data.cards;
  return cachedCards;
}

export async function loadTarotComboIndex(kv: KVNamespace): Promise<TarotKBComboIndex> {
  if (cachedComboIndex) return cachedComboIndex;
  cachedComboIndex = await kvGet<TarotKBComboIndex>(kv, KV_KEYS.comboIndex);
  return cachedComboIndex;
}

export async function loadTarotClarifyQuestions(kv: KVNamespace): Promise<TarotKBClarify> {
  if (cachedClarify) return cachedClarify;
  cachedClarify = await kvGet<TarotKBClarify>(kv, KV_KEYS.clarify);
  return cachedClarify;
}

export async function loadTarotComboDetail(
  r2: R2Bucket,
  comboEntry: TarotKBComboEntry,
): Promise<TarotKBComboDetail | null> {
  const obj = await r2.get(comboEntry.detail_file);
  if (!obj) return null;
  const text = await obj.text();
  return JSON.parse(text) as TarotKBComboDetail;
}

export async function loadTarotDailyMessages(
  kv: KVNamespace,
): Promise<Record<string, { upright: string[]; reversed: string[] }>> {
  const data = await kvGet<{ messages: Record<string, { upright: string[]; reversed: string[] }> }>(
    kv,
    KV_KEYS.daily,
  );
  return data.messages;
}

export function findTarotCombo(
  combos: TarotKBComboEntry[],
  cardNames: string[],
): TarotKBComboEntry | null {
  const normalize = (value: string) => value.trim().toLowerCase();
  const exact = cardNames.map(normalize).join("_");
  const found = combos.find((combo) => combo.id === exact);
  if (found) return found;

  const sorted = [...cardNames]
    .sort((a, b) => normalize(a).localeCompare(normalize(b)))
    .map(normalize)
    .join("_");
  return combos.find((combo) => combo.id === sorted) ?? null;
}

const NUMBER_ALIASES: Record<string, string> = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
  ten: "10",
};

export function normalizeTarotCardName(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/^(one|two|three|four|five|six|seven|eight|nine|ten)\b/, (word) => NUMBER_ALIASES[word] ?? word);
}

export function normalizeTarotComboSearch(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
}

export function buildTarotComboLibraryItem(
  entry: TarotKBComboEntry,
  kbCards: TarotKBCard[],
): TarotComboLibraryItem | null {
  const cards = entry.keys.map((key) => {
    const card = kbCards.find((candidate) => normalizeTarotCardName(candidate.name) === normalizeTarotCardName(key));
    return card ? { id: card.id, nameEn: card.name, nameVi: card.nameVi } : null;
  });
  if (!cards.every((card): card is NonNullable<typeof card> => card !== null)) return null;
  return {
    id: entry.id,
    size: entry.size,
    title: entry.title,
    description: entry.desc,
    cards,
  };
}

export function buildTarotComboDomainReadings(
  detail: TarotKBComboDetail,
  comboSize: number,
): TarotComboDomainReading[] {
  const uprightVariant = comboSize <= 3 ? Array(comboSize).fill("Up").join("_") : "All_Up";
  const reversedVariant = comboSize <= 3 ? Array(comboSize).fill("Rev").join("_") : "All_Rev";
  return TAROT_COMBO_DOMAINS.map((domain) => ({
    key: domain.key as TarotComboDomainReading["key"],
    label: domain.label,
    niches: domain.niches.flatMap((niche) => {
      const upright = detail[niche.key]?.[uprightVariant]?.trim();
      const reversed = detail[niche.key]?.[reversedVariant]?.trim();
      return upright && reversed ? [{ key: niche.key, label: niche.label, upright, reversed }] : [];
    }),
  }));
}

/**
 * Dò mọi combo là tập con của phiên trải. Thứ tự lá trong phiên không ảnh hưởng;
 * variant chiều luôn được dựng theo thứ tự canonical trong combo index.
 */
export function findMatchedCombos(
  combos: TarotKBComboEntry[],
  drawnCards: TarotComboDrawnCard[],
): TarotKBMatchedCombo[] {
  const byName = new Map<string, TarotComboDrawnCard[]>();
  for (const card of drawnCards) {
    const key = normalizeTarotCardName(card.nameEn);
    byName.set(key, [...(byName.get(key) ?? []), card]);
  }

  const seen = new Set<string>();
  const matches: TarotKBMatchedCombo[] = [];
  for (const entry of combos) {
    if (entry.size < 2 || entry.size > 5 || entry.size > drawnCards.length) continue;

    const used = new Map<string, number>();
    const cards: TarotComboDrawnCard[] = [];
    let complete = true;
    for (const rawKey of entry.keys) {
      const key = normalizeTarotCardName(rawKey);
      const offset = used.get(key) ?? 0;
      const card = byName.get(key)?.[offset];
      if (!card) {
        complete = false;
        break;
      }
      used.set(key, offset + 1);
      cards.push(card);
    }
    if (!complete || cards.length !== entry.size) continue;

    const identity = entry.keys.map(normalizeTarotCardName).sort().join("|");
    if (seen.has(identity)) continue;
    seen.add(identity);
    matches.push({
      entry,
      cards,
      orientationVariant: cards
        .map((card) => card.orientation === "reversed" ? "Rev" : "Up")
        .join("_"),
    });
  }

  return matches.sort((left, right) => right.entry.size - left.entry.size);
}
