import { reduce } from "./calculator";
import type { DobParts } from "./indicators";
import type { NumerologyReport } from "./report";

export type CareerKey = "KT" | "KD" | "XH" | "ST" | "NC";
export type CareerGroup = { key: CareerKey; label: string };
export type CareerTableRow = Record<CareerKey, number>;
export type CareerChartGroup = CareerGroup & { pct: number };
export type PersonalityGroup = {
  num: number;
  label: string;
  color: string;
};
export type PersonalityChartGroup = PersonalityGroup & { raw: number };
export type LineChartPoint = { year: number; value: number; isCurrent: boolean };

export const CAREER_TABLE: Record<string, CareerTableRow> = {
  "1": { KT: 5, KD: 58, XH: 8, ST: 5, NC: 4 },
  "2": { KT: 5, KD: 12, XH: 52, ST: 24, NC: 7 },
  "3": { KT: 5, KD: 8, XH: 10, ST: 67, NC: 10 },
  "4": { KT: 22, KD: 32, XH: 28, ST: 7, NC: 11 },
  "5": { KT: 14, KD: 38, XH: 16, ST: 18, NC: 14 },
  "6": { KT: 6, KD: 16, XH: 50, ST: 22, NC: 6 },
  "7": { KT: 8, KD: 10, XH: 16, ST: 8, NC: 58 },
  "8": { KT: 6, KD: 74, XH: 5, ST: 10, NC: 5 },
  "9": { KT: 6, KD: 8, XH: 55, ST: 26, NC: 5 },
  "11": { KT: 5, KD: 14, XH: 18, ST: 56, NC: 7 },
  "22": { KT: 38, KD: 38, XH: 8, ST: 8, NC: 8 },
  "33": { KT: 6, KD: 10, XH: 52, ST: 26, NC: 6 },
};

export const CAREER_GROUPS: CareerGroup[] = [
  { key: "KT", label: "Nhóm ngành Kỹ thuật & Công nghệ" },
  { key: "KD", label: "Nhóm ngành Kinh doanh & Quản lý" },
  { key: "XH", label: "Nhóm ngành Xã hội & Con người" },
  { key: "ST", label: "Nhóm ngành Sáng tạo & Nghệ thuật" },
  { key: "NC", label: "Nhóm ngành Nghiên cứu & Khoa học" },
];

export const PERSONALITY_GROUPS: PersonalityGroup[] = [
  { num: 1, label: "Mạnh mẽ - Độc lập - Tự tin", color: "#ef4444" },
  { num: 2, label: "Lắng nghe - Khéo léo - Nhạy cảm", color: "#f97316" },
  { num: 3, label: "Sáng tạo - Hoạt bát - Lạc quan", color: "#eab308" },
  { num: 4, label: "Cẩn thận - Cầu toàn - Thực tế", color: "#22c55e" },
  { num: 5, label: "Năng động - Linh hoạt - Tò mò", color: "#14b8a6" },
  { num: 6, label: "Quan tâm - Yêu thương - Kiểm soát", color: "#3b82f6" },
  { num: 7, label: "Thông thái - Khám phá - Truyền đạt", color: "#6366f1" },
  { num: 8, label: "Công bằng - Tập trung - Lý tưởng", color: "#8b5cf6" },
  { num: 9, label: "Trách nhiệm - Rộng lượng - Hào phóng", color: "#ec4899" },
];

function normalizeToHundred<T extends { pct: number }>(items: T[]): T[] {
  const total = items.reduce((sum, item) => sum + item.pct, 0);
  const diff = 100 - total;
  if (diff === 0 || items.length === 0) return items;
  const maxIndex = items.reduce((max, item, index) => (item.pct > items[max].pct ? index : max), 0);
  items[maxIndex] = { ...items[maxIndex], pct: items[maxIndex].pct + diff };
  return items;
}

export function calcCareerGroups(lifePath: number, destiny: number): CareerChartGroup[] {
  const lifePathRow = CAREER_TABLE[String(lifePath)] ?? CAREER_TABLE["5"];
  const destinyRow = CAREER_TABLE[String(destiny)] ?? CAREER_TABLE["5"];

  const rows = CAREER_GROUPS.map((group) => ({
    ...group,
    pct: Math.round(lifePathRow[group.key] * 0.55 + destinyRow[group.key] * 0.45),
  }));

  return normalizeToHundred(rows).sort((a, b) => b.pct - a.pct);
}

export function calcPersonalityGroups(dobParts: DobParts): PersonalityChartGroup[] {
  const digits = [
    String(dobParts.day).padStart(2, "0"),
    String(dobParts.month).padStart(2, "0"),
    String(dobParts.year).padStart(4, "0"),
  ].join("");
  const counts = Array.from({ length: 10 }, () => 0);

  for (const digit of digits) {
    const num = Number(digit);
    if (num >= 1 && num <= 9) counts[num] += 1;
  }

  const total = counts.reduce((sum, count) => sum + count, 0) || 1;
  const rows = PERSONALITY_GROUPS.map((group) => {
    const pct = Math.round((counts[group.num] / total) * 100);
    return {
      ...group,
      pct: Math.min(40, Math.max(3, pct)),
    };
  });

  return normalizeToHundred(rows)
    .map(({ pct, ...group }) => ({ ...group, raw: pct }))
    .sort((a, b) => b.raw - a.raw);
}

export function calcLineChartData(
  report: NumerologyReport,
  currentYear: number,
  from: number,
  to: number,
): LineChartPoint[] {
  const { day, month } = report.input.dobParts;

  return Array.from({ length: to - from + 1 }, (_, index) => {
    const offset = from + index;
    const year = currentYear + offset;
    const yearSum = reduce(year, false);
    return {
      year,
      value: reduce(day + month + yearSum, false),
      isCurrent: offset === 0,
    };
  });
}
