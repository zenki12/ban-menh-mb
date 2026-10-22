import type { TarotClarifyResponse } from "@banmenh/shared";
import { fetchWithAuth } from "../../lib/api/client";
import { selectConsciousnessQuestions, type ThemeKey } from "./tarot-data";

export async function loadNicheClarifyQuestions(
  nicheKey: string,
  theme: ThemeKey,
  ensureAnonymousAuth: () => Promise<unknown>,
): Promise<[string, string, string]> {
  const fallback = selectConsciousnessQuestions(theme);
  try {
    await ensureAnonymousAuth();
    const response = await fetchWithAuth<TarotClarifyResponse>(
      `/api/tarot/clarify?niche=${encodeURIComponent(nicheKey)}`,
      { cache: "no-store" },
    );
    if (response.nicheKey !== nicheKey || response.questions.length !== 3) return fallback;
    return response.questions as [string, string, string];
  } catch {
    return fallback;
  }
}
