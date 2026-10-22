import type { ThemeKey } from "./tarot-data";

const STORAGE_PREFIX = "bm_tarot_theme_day_v1";

export function localTarotDateKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function tarotThemeDayStorageKey(theme: ThemeKey, date: string): string {
  return `${STORAGE_PREFIX}:${theme}_${date}`;
}

export function hasCompletedTarotTheme(theme: ThemeKey, date: string): boolean {
  try {
    return window.localStorage.getItem(tarotThemeDayStorageKey(theme, date)) === `${theme}_${date}`;
  } catch {
    return false;
  }
}

export function markTarotThemeCompleted(theme: ThemeKey, date: string): boolean {
  try {
    window.localStorage.setItem(tarotThemeDayStorageKey(theme, date), `${theme}_${date}`);
    return true;
  } catch {
    return false;
  }
}
