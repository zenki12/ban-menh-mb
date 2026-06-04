import {
  PYTHAGORAS_CHART,
  normalizeVietnameseName,
  rawConsonantSum,
  rawLetterSum,
  rawVowelSum,
  reduce,
  wordSum,
} from "./calculator";

export type DobParts = { day: number; month: number; year: number };
export type KarmicDebtNumber = 13 | 14 | 16 | 19;
export type IndicatorCalculation = {
  number: number;
  raw: number;
  displayNumber?: number;
  isMaster: boolean;
  karmicDebt?: KarmicDebtNumber;
};
export type PeriodCalculation = IndicatorCalculation & { period: string };

const KARMIC_DEBTS = new Set([13, 14, 16, 19]);
const MASTER_NUMBERS = new Set([11, 22, 33]);

function result(raw: number, keepMaster = true): IndicatorCalculation {
  const number = reduce(raw, keepMaster);
  return {
    number,
    raw,
    isMaster: MASTER_NUMBERS.has(number),
    karmicDebt: detectKarmicDebt(raw),
  };
}

export function detectKarmicDebt(rawSum: number): KarmicDebtNumber | undefined {
  let current = Math.abs(Math.trunc(rawSum));
  while (current > 9) {
    if (KARMIC_DEBTS.has(current)) return current as KarmicDebtNumber;
    current = String(current)
      .split("")
      .reduce((sum, digit) => sum + Number(digit), 0);
  }
  return KARMIC_DEBTS.has(current) ? (current as KarmicDebtNumber) : undefined;
}

export function calcLifePath(dob: DobParts): IndicatorCalculation {
  const raw = reduce(dob.day) + reduce(dob.month) + reduce(dob.year);
  const calculation = result(raw);
  const lastTwo = Math.abs(raw) % 100;
  const lastTwoSum = Math.floor(lastTwo / 10) + (lastTwo % 10);
  return raw === 10 || lastTwoSum === 10 ? { ...calculation, displayNumber: 10 } : calculation;
}

export function calcDestiny(fullName: string): IndicatorCalculation {
  return result(rawLetterSum(fullName));
}

export function calcSoul(fullName: string): IndicatorCalculation {
  return result(rawVowelSum(fullName));
}

export function calcPersonality(fullName: string): IndicatorCalculation {
  return result(rawConsonantSum(fullName));
}

export function calcBirthday(day: number): IndicatorCalculation {
  return result(day);
}

export function calcAttitude(dob: DobParts): IndicatorCalculation {
  return result(dob.day + dob.month);
}

export function calcPersonalYear(dob: DobParts, currentYear: number): IndicatorCalculation {
  return result(dob.day + dob.month + reduce(currentYear, false));
}

export function calcPersonalMonth(
  dob: DobParts,
  currentYear: number,
  currentMonth: number,
): IndicatorCalculation {
  return result(calcPersonalYear(dob, currentYear).number + currentMonth, false);
}

export function calcPersonalDay(dob: DobParts, currentDate: Date): IndicatorCalculation {
  const personalMonth = calcPersonalMonth(
    dob,
    currentDate.getUTCFullYear(),
    currentDate.getUTCMonth() + 1,
  );
  return result(personalMonth.number + currentDate.getUTCDate(), false);
}

export function calcPyramidPeaks(dob: DobParts): PeriodCalculation[] {
  const lifePath = calcLifePath(dob).number;
  const rd = reduce(dob.day);
  const rm = reduce(dob.month);
  const ry = reduce(dob.year, false);
  const base = 36 - lifePath;
  const p1 = result(rm + rd);
  const p2 = result(rd + ry);
  const p3 = result(p1.number + p2.number);
  const p4 = result(rm + ry);

  return [
    { ...p1, period: `0 - ${base} tuổi` },
    { ...p2, period: `${base + 1} - ${base + 9} tuổi` },
    { ...p3, period: `${base + 10} - ${base + 18} tuổi` },
    { ...p4, period: `${base + 19} tuổi trở đi` },
  ];
}

export function calcPyramidChallenges(dob: DobParts): PeriodCalculation[] {
  const lifePath = calcLifePath(dob).number;
  const rd = reduce(dob.day, false);
  const rm = reduce(dob.month, false);
  const ry = reduce(dob.year, false);
  const base = 36 - lifePath;
  const c1 = result(Math.abs(rm - rd), false);
  const c2 = result(Math.abs(rd - ry), false);
  const c3 = result(Math.abs(c1.number - c2.number), false);
  const c4 = result(Math.abs(rm - ry), false);

  return [
    { ...c1, period: `0 - ${base} tuổi` },
    { ...c2, period: `${base + 1} - ${base + 9} tuổi` },
    { ...c3, period: `${base + 10} - ${base + 18} tuổi` },
    { ...c4, period: "giai đoạn chủ đạo cuối đời" },
  ];
}

export function calcKarmicLessons(fullName: string): number[] {
  const present = new Set(
    normalizeVietnameseName(fullName)
      .split("")
      .map((char) => PYTHAGORAS_CHART[char])
      .filter((value): value is number => Boolean(value)),
  );

  return Array.from({ length: 9 }, (_, index) => index + 1).filter((n) => !present.has(n));
}

export function calcMaturity(lifePath: number, destiny: number): IndicatorCalculation {
  return result(lifePath + destiny);
}

export function calcTensionNumber(soulNum: number, personalityNum: number): IndicatorCalculation {
  return result(Math.abs(soulNum - personalityNum), false);
}

function nameParts(fullName: string): string[] {
  return normalizeVietnameseName(fullName).trim().split(/\s+/).filter(Boolean);
}

export function calcCornerstone(firstName: string): IndicatorCalculation & { letter?: string } {
  const letter = normalizeVietnameseName(firstName).replace(/[^A-Z]/g, "")[0];
  return { ...result(letter ? PYTHAGORAS_CHART[letter] ?? 0 : 0, false), letter };
}

export function calcCapstone(firstName: string): IndicatorCalculation & { letter?: string } {
  const letters = normalizeVietnameseName(firstName).replace(/[^A-Z]/g, "");
  const letter = letters[letters.length - 1];
  return { ...result(letter ? PYTHAGORAS_CHART[letter] ?? 0 : 0, false), letter };
}

export function calcLifeCycles(dob: DobParts): PeriodCalculation[] {
  const lifePath = calcLifePath(dob).number;
  const c1 = result(reduce(dob.month));
  const c2 = result(reduce(dob.day));
  const c3 = result(reduce(dob.year, false), false);
  const cycle1EndAge = 36 - lifePath;

  return [
    { ...c1, period: `0 - ${cycle1EndAge} tuổi` },
    { ...c2, period: `${cycle1EndAge + 1} - ${cycle1EndAge + 27} tuổi` },
    { ...c3, period: `${cycle1EndAge + 28} tuổi trở đi` },
  ];
}

export function calcApproachMotivation(fullName: string): IndicatorCalculation {
  return result(wordSum(nameParts(fullName)[0] ?? ""));
}

export function calcApproachAbility(dob: DobParts): IndicatorCalculation {
  return result(reduce(dob.day, false), false);
}

export function calcApproachAttitude(dob: DobParts): IndicatorCalculation {
  return result(reduce(dob.month, false), false);
}

export function calcCognitiveAbility(dob: DobParts): IndicatorCalculation {
  return result(reduce(dob.day, false) + reduce(dob.month, false), false);
}

export function calcOverrideDifficulty(dob: DobParts): IndicatorCalculation {
  return result(dob.day + reduce(dob.year, false), false);
}

export function getFirstName(fullName: string): string {
  const parts = nameParts(fullName);
  return parts[parts.length - 1] ?? "";
}
