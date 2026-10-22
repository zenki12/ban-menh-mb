import { tarotAiReadingSchema, type TarotAiReadingResponse } from "@banmenh/shared";
import { z } from "zod";
import type { ReadingSession } from "./tarot-data";
import { tarotCardImageSrc } from "./tarot-kb";

export const TAROT_HISTORY_STORAGE_KEY = "bm_tarot_history_v1";
export const TAROT_HISTORY_LIMIT = 15;

const historyCardSchema = z.object({
  id: z.number().int().min(0).max(77),
  nameVi: z.string().trim().min(1).max(100),
  nameEn: z.string().trim().min(1).max(100),
  position: z.string().trim().min(1).max(100),
  orientation: z.enum(["upright", "reversed"]),
  imageSrc: z.string().trim().min(1).max(240),
}).strict();

const historyEntrySchema = z.object({
  id: z.string().trim().min(1).max(160),
  timestamp: z.string().datetime(),
  themeLabel: z.string().trim().min(1).max(100),
  question: z.string().trim().min(1).max(200),
  spread: z.union([z.literal(1), z.literal(3)]),
  cards: z.array(historyCardSchema).min(1).max(3),
  summary: z.string().trim().min(1).max(5_000),
  reading: tarotAiReadingSchema,
  source: z.enum(["gemini", "template"]),
}).strict();

const historySchema = z.array(historyEntrySchema).max(TAROT_HISTORY_LIMIT);

export type TarotHistoryEntry = z.infer<typeof historyEntrySchema>;
export type TarotHistoryResult = {
  entries: TarotHistoryEntry[];
  storageAvailable: boolean;
};

function browserStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function loadTarotHistory(): TarotHistoryResult {
  const storage = browserStorage();
  if (!storage) return { entries: [], storageAvailable: false };

  try {
    const raw = storage.getItem(TAROT_HISTORY_STORAGE_KEY);
    if (!raw) return { entries: [], storageAvailable: true };
    const parsed = historySchema.safeParse(JSON.parse(raw));
    if (!parsed.success) return { entries: [], storageAvailable: true };
    return {
      entries: [...parsed.data].sort((a, b) => b.timestamp.localeCompare(a.timestamp)),
      storageAvailable: true,
    };
  } catch {
    return { entries: [], storageAvailable: false };
  }
}

export function createTarotHistoryEntry(
  session: ReadingSession,
  response: TarotAiReadingResponse,
): TarotHistoryEntry {
  const timestamp = new Date().toISOString();
  const randomId = typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  return historyEntrySchema.parse({
    id: randomId,
    timestamp,
    themeLabel: session.themeLabel,
    question: session.question,
    spread: session.spread,
    cards: session.cards.map((card) => ({
      id: card.id,
      nameVi: card.nameVi,
      nameEn: card.nameEn,
      position: card.position,
      orientation: card.orientation,
      imageSrc: tarotCardImageSrc(card),
    })),
    summary: response.reading.overview,
    reading: response.reading,
    source: response.source,
  });
}

export function saveTarotHistory(entry: TarotHistoryEntry): TarotHistoryResult {
  const current = loadTarotHistory();
  const entries = [entry, ...current.entries.filter((item) => item.id !== entry.id)]
    .slice(0, TAROT_HISTORY_LIMIT);
  const storage = browserStorage();
  if (!storage) return { entries, storageAvailable: false };

  try {
    storage.setItem(TAROT_HISTORY_STORAGE_KEY, JSON.stringify(entries));
    return { entries, storageAvailable: true };
  } catch {
    return { entries, storageAvailable: false };
  }
}

export function deleteTarotHistoryEntry(id: string): TarotHistoryResult {
  const current = loadTarotHistory();
  const entries = current.entries.filter((item) => item.id !== id);
  const storage = browserStorage();
  if (!storage) return { entries, storageAvailable: false };

  try {
    storage.setItem(TAROT_HISTORY_STORAGE_KEY, JSON.stringify(entries));
    return { entries, storageAvailable: true };
  } catch {
    return { entries, storageAvailable: false };
  }
}

export function clearTarotHistory(): TarotHistoryResult {
  const storage = browserStorage();
  if (!storage) return { entries: [], storageAvailable: false };

  try {
    storage.removeItem(TAROT_HISTORY_STORAGE_KEY);
    return { entries: [], storageAvailable: true };
  } catch {
    return { entries: [], storageAvailable: false };
  }
}
