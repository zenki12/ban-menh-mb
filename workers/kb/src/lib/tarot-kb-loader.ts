// Tarot KB loader: KV stores small indexes, R2 stores large combo detail files.

export interface TarotKBCard {
  id: number;
  name: string;
  nameVi: string;
  arcana: "major" | "minor";
  suit: string | null;
  image: string;
  keywords: string[];
  keywordsRev: string[];
  upright: string;
  reversed: string;
  aspects: Record<string, string>;
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

export type TarotKBComboDetail = Record<string, Record<string, string>>;

const KV_KEYS = {
  cards: "kb-tarot-cards",
  comboIndex: "kb-tarot-combo-index",
  taxonomy: "kb-tarot-taxonomy",
  daily: "kb-tarot-daily",
  clarify: "kb-tarot-clarify",
} as const;

let cachedCards: TarotKBCard[] | null = null;
let cachedComboIndex: TarotKBComboIndex | null = null;

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
