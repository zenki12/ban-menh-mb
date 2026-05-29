import { normalizeVietnameseName, reduce } from "./calculator";
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
export type GridSource = "dob" | "name" | "combined";
export type GridCells = Record<number, number>;
export type ArrowEntry = string | { name?: string; description?: string };
export type DetectedArrow = {
  key: string;
  cells: [number, number, number];
  name: string;
  description: string;
  present: boolean;
};

export const DEFAULT_GRID_ARROWS: Record<string, ArrowEntry> = {
  "1_2_3": "Mũi tên lập kế hoạch - Khả năng lập kế hoạch và thực hiện.",
  "4_5_6": "Mũi tên ý chí - Giàu ý chí, không ngại khó khăn.",
  "7_8_9": "Mũi tên hành động - Tính hành động và chủ động cao.",
  "1_4_7": "Mũi tên thực tế - Năng lượng vật chất và tổ chức.",
  "2_5_8": "Mũi tên cân bằng tinh thần - Cảm xúc ổn định, trực giác tốt.",
  "3_6_9": "Mũi tên trí tuệ - Trí nhớ, tư duy và lý trí.",
  "1_5_9": "Mũi tên quyết tâm - Năng lượng hành động cao, không trì hoãn.",
  "3_5_7": "Mũi tên trí tuệ - Trí nhớ tốt, khả năng học tập và phân tích.",
};

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

export function calcCareerGroups(lifePath: number, destiny: number): CareerChartGroup[] {
  const lifePathRow = CAREER_TABLE[String(lifePath)] ?? CAREER_TABLE["5"];
  const destinyRow = CAREER_TABLE[String(destiny)] ?? CAREER_TABLE["5"];

  const rows = CAREER_GROUPS.map((group) => ({
    ...group,
    pct: Math.round(lifePathRow[group.key] * 0.55 + destinyRow[group.key] * 0.45),
  }));

  const total = rows.reduce((sum, row) => sum + row.pct, 0);
  const diff = 100 - total;
  if (diff !== 0) {
    const maxIndex = rows.reduce((max, row, index) => (row.pct > rows[max].pct ? index : max), 0);
    rows[maxIndex] = { ...rows[maxIndex], pct: rows[maxIndex].pct + diff };
  }

  return rows.sort((a, b) => b.pct - a.pct);
}

export function calcPersonalityGroups(dobParts: DobParts): PersonalityChartGroup[] {
  const digits = [
    String(dobParts.day).padStart(2, "0"),
    String(dobParts.month).padStart(2, "0"),
    String(dobParts.year).padStart(4, "0"),
  ].join("");
  const counts: Record<number, number> = {};
  for (let i = 1; i <= 9; i++) counts[i] = 0;

  for (const digit of digits) {
    const num = Number(digit);
    if (num >= 1 && num <= 9) counts[num] += 1;
  }

  const total = Object.values(counts).reduce((sum, count) => sum + count, 0) || 1;
  const minPct = 3;
  const maxPct = 40;
  const result = PERSONALITY_GROUPS.map((group) => ({
    ...group,
    raw: Math.round((counts[group.num] / total) * 100),
  }));

  for (let iter = 0; iter < 100; iter++) {
    const zeroIdx = result.findIndex((group) => group.raw < minPct);
    if (zeroIdx === -1) break;
    const deficit = minPct - result[zeroIdx].raw;
    result[zeroIdx].raw = minPct;
    let maxIdx = 0;
    for (let i = 0; i < result.length; i++) {
      if (i !== zeroIdx && result[i].raw > result[maxIdx].raw) maxIdx = i;
    }
    result[maxIdx].raw = Math.max(minPct, result[maxIdx].raw - deficit);
  }

  for (let iter = 0; iter < 100; iter++) {
    const overIdx = result.findIndex((group) => group.raw > maxPct);
    if (overIdx === -1) break;
    const excess = result[overIdx].raw - maxPct;
    result[overIdx].raw = maxPct;
    let minIdx = 0;
    for (let i = 0; i < result.length; i++) {
      if (i !== overIdx && result[i].raw < result[minIdx].raw) minIdx = i;
    }
    result[minIdx].raw += excess;
  }

  const sum = result.reduce((totalPct, group) => totalPct + group.raw, 0);
  if (sum !== 100) {
    let maxIdx = 0;
    for (let i = 0; i < result.length; i++) {
      if (result[i].raw > result[maxIdx].raw) maxIdx = i;
    }
    result[maxIdx].raw += 100 - sum;
  }

  return result.sort((a, b) => b.raw - a.raw);
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

function emptyCells(): GridCells {
  const cells: GridCells = {};
  for (let i = 1; i <= 9; i++) cells[i] = 0;
  return cells;
}

export function calcBirthChartCells(dobParts: DobParts): GridCells {
  const cells = emptyCells();
  const digits = `${String(dobParts.day).padStart(2, "0")}${String(dobParts.month).padStart(2, "0")}${String(dobParts.year).padStart(4, "0")}`;
  for (const digit of digits) {
    const num = Number(digit);
    if (num >= 1 && num <= 9) cells[num] += 1;
  }
  return cells;
}

export function calcNameChartCells(fullName: string, letterMap: Record<string, number>): GridCells {
  const cells = emptyCells();
  for (const char of normalizeVietnameseName(fullName)) {
    const num = letterMap[char];
    if (num >= 1 && num <= 9) cells[num] += 1;
  }
  return cells;
}

function cellsFromArrowKey(key: string): [number, number, number] | null {
  const digits = key.match(/[1-9]/g)?.map(Number) ?? [];
  if (digits.length < 3) return null;
  return [digits[0], digits[1], digits[2]];
}

function arrowText(entry: ArrowEntry): { name: string; description: string } {
  if (typeof entry !== "string") {
    return {
      name: entry.name ?? "Mũi tên",
      description: entry.description ?? "",
    };
  }
  const [name, ...rest] = entry.split(/\s+-\s+/);
  return { name: name.trim(), description: rest.join(" - ").trim() };
}

export function detectArrows(
  cells: GridCells,
  arrowsKb: Record<string, ArrowEntry> = DEFAULT_GRID_ARROWS,
): DetectedArrow[] {
  return Object.entries(arrowsKb)
    .map(([key, entry]) => {
      const arrowCells = cellsFromArrowKey(key);
      if (!arrowCells) return null;
      const text = arrowText(entry);
      return {
        key,
        cells: arrowCells,
        name: text.name,
        description: text.description,
        present: arrowCells.every((num) => (cells[num] ?? 0) > 0),
      };
    })
    .filter((item): item is DetectedArrow => item !== null);
}

export function detectIsolatedNumbers(cells: GridCells, presentArrows: DetectedArrow[]): number[] {
  const connected = new Set<number>();
  for (const arrow of presentArrows) {
    if (arrow.present) arrow.cells.forEach((num) => connected.add(num));
  }
  return Object.entries(cells)
    .filter(([, count]) => count > 0)
    .map(([num]) => Number(num))
    .filter((num) => !connected.has(num));
}

export function calcCombinedCells(dobCells: GridCells, nameCells: GridCells): GridCells {
  const cells = emptyCells();
  for (let i = 1; i <= 9; i++) cells[i] = (dobCells[i] ?? 0) + (nameCells[i] ?? 0);
  return cells;
}

export function findCompensated(dobCells: GridCells, nameCells: GridCells): number[] {
  return Array.from({ length: 9 }, (_, index) => index + 1).filter(
    (num) => (dobCells[num] ?? 0) === 0 && (nameCells[num] ?? 0) > 0,
  );
}
