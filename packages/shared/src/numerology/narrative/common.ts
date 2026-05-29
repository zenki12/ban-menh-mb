// Shared helpers for V1-style numerology narrative rendering.

export type NarrativeContext = {
  lifePath: number;
  soul: number;
  destiny: number;
  personality: number;
  maturity: number;
  birthday: number;
  attitude: number;
};

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function asRecord(data: unknown): Record<string, unknown> {
  return data && typeof data === "object" ? (data as Record<string, unknown>) : {};
}

export function readString(data: unknown, keys: string[]): string {
  const record = asRecord(data);
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) return value.trim();
    if (Array.isArray(value)) {
      const items = value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
      if (items.length) return items.join(", ");
    }
  }
  return "";
}

export function generic(label: string, num: number | string, name: string, kbData: unknown): string {
  const title = readString(kbData, ["title", "theme"]) || `${label} ${num}`;
  const parts = [
    readString(kbData, ["description", "meaning", "dynamic", "core", "traits", "theme"]),
    readString(kbData, ["lesson", "core_lesson", "life_lesson", "mission", "desire"]),
    readString(kbData, ["strengths", "strength", "positive", "gift", "career", "career_fit"]),
    readString(kbData, ["weaknesses", "negative", "blind_spot", "warning", "trap", "challenge"]),
    readString(kbData, ["advice", "growth_path", "how_to_develop", "how_to_overcome", "resolution"]),
  ].filter(Boolean);

  if (!parts.length) return `<p class="nar"><em>Dữ liệu ${escapeHtml(label)} đang được cập nhật.</em></p>`;

  return [
    `<p class="nar"><strong>${escapeHtml(name)}</strong> mang <strong>${escapeHtml(label)} ${escapeHtml(String(num))}</strong> — ${escapeHtml(title)}.</p>`,
    ...parts.map((part) => `<p class="nar">${escapeHtml(part)}</p>`),
  ].join("");
}
