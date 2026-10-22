import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import type {
  TarotCardDetail,
  TarotComboCard,
  TarotComboLibraryDetailResponse,
  TarotComboLibraryItem,
  TarotComboLibraryResponse,
  TarotComboLookupResponse,
  TarotMatchedCombo,
} from "@banmenh/shared";
import { TAROT_COMBO_DOMAINS } from "@banmenh/shared";

interface ClarifyData {
  groups: Record<string, string[]>;
}

interface CardData {
  cards: Array<{
    id: number;
    name: string;
    nameVi: string;
    number?: string;
    arcana: string;
    keywords: string[];
    keywordsRev?: string[];
    upright: string;
    reversed: string;
    element?: string;
    planet?: string;
    zodiac?: string;
    numerology?: string;
    aspects?: Record<string, any>;
  }>;
}

interface ComboIndexData {
  combos: Array<{
    id: string;
    size: number;
    keys: string[];
    title: string;
    desc: string;
    detail_file: string;
  }>;
}

type ComboDetailData = Record<string, Record<string, string>>;

let cachedClarify: ClarifyData | null = null;
let cachedCards: CardData | null = null;
let cachedComboIndex: ComboIndexData | null = null;

const CANONICAL_DIR = path.resolve("E:/huyen hoc AI/test/kb/commercial/tarot_kb");

const NUMBER_ALIASES: Record<string, string> = {
  one: "1", two: "2", three: "3", four: "4", five: "5",
  six: "6", seven: "7", eight: "8", nine: "9", ten: "10",
};

function normalizeCardName(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ")
    .replace(/^(one|two|three|four|five|six|seven|eight|nine|ten)\b/, (word) => NUMBER_ALIASES[word] ?? word);
}

function ensureCards(): CardData | null {
  if (cachedCards) return cachedCards;
  const filePath = path.join(CANONICAL_DIR, "cards", "cards.json");
  if (!existsSync(filePath)) return null;
  cachedCards = JSON.parse(readFileSync(filePath, "utf-8")) as CardData;
  return cachedCards;
}

function ensureComboIndex(): ComboIndexData | null {
  if (cachedComboIndex) return cachedComboIndex;
  const indexPath = path.join(CANONICAL_DIR, "combos", "combo_index.json");
  if (!existsSync(indexPath)) return null;
  cachedComboIndex = JSON.parse(readFileSync(indexPath, "utf-8")) as ComboIndexData;
  return cachedComboIndex;
}

function normalizeComboSearch(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase().trim();
}

function localComboItem(
  entry: ComboIndexData["combos"][number],
  cardData: CardData,
): TarotComboLibraryItem | null {
  const cards = entry.keys.map((key) => {
    const card = cardData.cards.find((candidate) => normalizeCardName(candidate.name) === normalizeCardName(key));
    return card ? { id: card.id, nameEn: card.name, nameVi: card.nameVi } : null;
  });
  if (!cards.every((card): card is NonNullable<typeof card> => card !== null)) return null;
  return { id: entry.id, size: entry.size, title: entry.title, description: entry.desc, cards };
}

export function getLocalTarotClarifyQuestions(nicheKey: string): string[] | null {
  try {
    if (!cachedClarify) {
      const filePath = path.join(CANONICAL_DIR, "clarify", "clarify_questions.json");
      if (!existsSync(filePath)) return null;
      const raw = readFileSync(filePath, "utf-8");
      cachedClarify = JSON.parse(raw) as ClarifyData;
    }
    const pool = cachedClarify.groups[nicheKey] ?? cachedClarify.groups.general;
    if (!pool || pool.length === 0) return null;

    // Lấy ngẫu nhiên 3 câu không trùng
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  } catch (err) {
    console.error("[local-tarot-kb] Error reading clarify questions:", err);
    return null;
  }
}

export function getLocalTarotCardDetail(
  cardId: number,
  nicheKey: string,
  reversed: boolean,
): TarotCardDetail | null {
  try {
    const cardData = ensureCards();
    if (!cardData) return null;
    const card = cardData.cards.find((c) => c.id === cardId);
    if (!card) return null;

    let meaning = reversed ? card.reversed : card.upright;
    let aspectMeaning = meaning;
    const aspect = card.aspects?.[nicheKey];
    if (typeof aspect === "object" && aspect) {
      aspectMeaning = (reversed ? aspect.reversed : aspect.upright) || aspectMeaning;
    } else if (typeof aspect === "string") {
      aspectMeaning = aspect;
    } else {
      const flattened = card.aspects?.[reversed ? `${nicheKey}_rev` : nicheKey];
      if (typeof flattened === "string") aspectMeaning = flattened;
    }

    const keywords = (reversed && card.keywordsRev && card.keywordsRev.length > 0)
      ? card.keywordsRev
      : (card.keywords || []);

    return {
      id: card.id,
      nameEn: card.name,
      nameVi: card.nameVi,
      number: card.number ?? "",
      orientation: reversed ? "reversed" : "upright",
      element: card.element ?? "",
      planet: card.planet ?? "",
      zodiac: card.zodiac ?? "",
      numerology: card.numerology ?? "",
      keywords,
      meaning,
      aspectMeaning,
    };
  } catch (err) {
    console.error("[local-tarot-kb] Error reading full card detail:", err);
    return null;
  }
}

export function getLocalTarotMatchedCombos(
  cards: TarotComboCard[],
  nicheKey: string,
  testMode: boolean,
): TarotComboLookupResponse | null {
  try {
    const comboIndex = ensureComboIndex();
    if (!comboIndex) return null;

    const cardData = ensureCards();
    if (!cardData) return null;
    const byName = new Map(cards.map((card) => [normalizeCardName(card.nameEn), card]));
    let entries = comboIndex.combos
      .filter((entry) => entry.size >= 2 && entry.size <= 5 && entry.size <= cards.length)
      .map((entry) => {
        const matchedCards = entry.keys.map((key) => byName.get(normalizeCardName(key)) ?? null);
        return matchedCards.every((card): card is TarotComboCard => card !== null)
          ? { entry, cards: matchedCards }
          : null;
      })
      .filter((match): match is NonNullable<typeof match> => match !== null)
      .sort((left, right) => right.entry.size - left.entry.size);

    if (testMode) {
      const maxForcedSize = Math.max(2, Math.min(5, cards.length));
      const candidates = comboIndex.combos.filter((entry) => entry.size <= maxForcedSize);
      const entry = candidates[Math.floor(Math.random() * candidates.length)];
      if (entry) {
        const forcedCards = entry.keys.map((key, index) => {
          const kbCard = cardData.cards.find((card) => normalizeCardName(card.name) === normalizeCardName(key));
          return kbCard ? {
            id: kbCard.id,
            nameEn: kbCard.name,
            nameVi: kbCard.nameVi,
            orientation: cards[index]?.orientation ?? cards[0]?.orientation ?? "upright",
          } satisfies TarotComboCard : null;
        });
        if (forcedCards.every((card): card is TarotComboCard => card !== null)) {
          entries = [{ entry, cards: forcedCards }];
        }
      }
    }

    const seen = new Set<string>();
    const combos: TarotMatchedCombo[] = [];
    for (const match of entries) {
      if (combos.length >= 3) break;
      const identity = match.entry.keys.map(normalizeCardName).sort().join("|");
      if (seen.has(identity)) continue;
      seen.add(identity);
      const orientationVariant = match.cards
        .map((card) => card.orientation === "reversed" ? "Rev" : "Up")
        .join("_");
      const detailPath = path.join(CANONICAL_DIR, match.entry.detail_file);
      if (!existsSync(detailPath)) continue;
      const detail = JSON.parse(readFileSync(detailPath, "utf-8")) as ComboDetailData;
      const text = detail[nicheKey]?.[orientationVariant] ?? detail.general?.[orientationVariant] ?? "";
      if (!text.trim()) continue;
      combos.push({
        id: match.entry.id,
        size: match.entry.size,
        title: match.entry.title,
        description: match.entry.desc,
        text,
        orientationVariant,
        cards: match.cards,
      });
    }

    return { ok: true, combos, testMode };
  } catch {
    console.error("[local-tarot-kb] Không thể đọc dữ liệu combo Tarot.");
    return null;
  }
}

export function getLocalTarotComboLibrary(input: {
  page: number;
  pageSize: number;
  size: "all" | "2" | "3" | "4" | "5";
  q: string;
}): TarotComboLibraryResponse | null {
  try {
    const index = ensureComboIndex();
    const cardData = ensureCards();
    if (!index || !cardData) return null;
    const query = normalizeComboSearch(input.q);
    const filtered = index.combos.filter((entry) => {
      const sizeMatch = input.size === "all" || entry.size === Number(input.size);
      const searchMatch = !query || normalizeComboSearch(`${entry.title} ${entry.keys.join(" ")}`).includes(query);
      return sizeMatch && searchMatch;
    });
    const totalPages = Math.ceil(filtered.length / input.pageSize);
    const page = totalPages === 0 ? 1 : Math.min(input.page, totalPages);
    const offset = (page - 1) * input.pageSize;
    const items = filtered.slice(offset, offset + input.pageSize)
      .map((entry) => localComboItem(entry, cardData))
      .filter((item): item is TarotComboLibraryItem => item !== null);
    return { ok: true, items, total: filtered.length, page, pageSize: 15, totalPages };
  } catch {
    console.error("[local-tarot-kb] Không thể đọc index thư viện combo.");
    return null;
  }
}

export function getLocalTarotComboLibraryDetail(comboId: string): TarotComboLibraryDetailResponse | null {
  try {
    const index = ensureComboIndex();
    const cardData = ensureCards();
    if (!index || !cardData) return null;
    const entry = index.combos.find((candidate) => candidate.id.toLowerCase() === comboId.toLowerCase());
    if (!entry) return null;
    const combo = localComboItem(entry, cardData);
    const detailPath = path.join(CANONICAL_DIR, entry.detail_file);
    if (!combo || !existsSync(detailPath)) return null;
    const detail = JSON.parse(readFileSync(detailPath, "utf-8")) as ComboDetailData;
    const uprightVariant = entry.size <= 3 ? Array(entry.size).fill("Up").join("_") : "All_Up";
    const reversedVariant = entry.size <= 3 ? Array(entry.size).fill("Rev").join("_") : "All_Rev";
    const domains = TAROT_COMBO_DOMAINS.map((domain) => ({
      key: domain.key as "love" | "finance" | "health" | "career" | "self",
      label: domain.label,
      niches: domain.niches.flatMap((niche) => {
        const upright = detail[niche.key]?.[uprightVariant]?.trim();
        const reversed = detail[niche.key]?.[reversedVariant]?.trim();
        return upright && reversed ? [{ key: niche.key, label: niche.label, upright, reversed }] : [];
      }),
    }));
    return { ok: true, combo, domains };
  } catch {
    console.error("[local-tarot-kb] Không thể đọc detail thư viện combo.");
    return null;
  }
}

export function getLocalTarotCardAspectMeaning(cardId: number, nicheKey: string, reversed: boolean) {
  const detail = getLocalTarotCardDetail(cardId, nicheKey, reversed);
  if (!detail) return null;
  return {
    aspectMeaning: detail.aspectMeaning,
    element: detail.element,
    planet: detail.planet,
    zodiac: detail.zodiac,
    numerology: detail.numerology,
  };
}
