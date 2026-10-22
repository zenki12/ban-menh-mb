export const DAILY_SEEN_KEY = "tarot_daily_seen";
export const DAILY_REVEALED_KEY = "bm_tarot_daily_revealed_v1";

export function hasDailyDate(key: string, date: string): boolean {
  try {
    return window.localStorage.getItem(key) === date;
  } catch {
    return false;
  }
}

export function storeDailyDate(key: string, date: string): void {
  try {
    window.localStorage.setItem(key, date);
  } catch {
    // Daily draw vẫn hoạt động trong bộ nhớ phiên nếu trình duyệt chặn localStorage.
  }
}
