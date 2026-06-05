export const TOTAL_INDICATORS = 33;
export const PREVIEW_INDICATORS = 2;
export const LOCKED_COUNT = TOTAL_INDICATORS - PREVIEW_INDICATORS;

export function asRecord(data: unknown): Record<string, unknown> {
  return data && typeof data === "object" ? (data as Record<string, unknown>) : {};
}

export function readString(data: unknown, fields: string[]): string {
  const record = asRecord(data);
  for (const field of fields) {
    const value = record[field];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
}

export function truncateText(value: string, maxLength: number): string {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;
  const trimmed = normalized.slice(0, maxLength).trimEnd();
  return `${trimmed}...`;
}
