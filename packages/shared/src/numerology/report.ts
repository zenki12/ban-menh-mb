import type { NumerologyKb } from "../schemas/numerology-kb";
import {
  type DobParts,
  type IndicatorCalculation,
  type KarmicDebtNumber,
  calcApproachAbility,
  calcApproachAttitude,
  calcApproachMotivation,
  calcAttitude,
  calcBirthday,
  calcCapstone,
  calcCognitiveAbility,
  calcCornerstone,
  calcDestiny,
  calcKarmicLessons,
  calcLifeCycles,
  calcLifePath,
  calcMaturity,
  calcOverrideDifficulty,
  calcPersonalDay,
  calcPersonalMonth,
  calcPersonalYear,
  calcPersonality,
  calcPyramidChallenges,
  calcPyramidPeaks,
  calcSoul,
  getFirstName,
} from "./indicators";

export type NumerologyInput = {
  fullName: string;
  dob: string;
  currentDate?: string;
};

export type IndicatorResult<T = unknown> = {
  number: number;
  raw: number;
  isMaster: boolean;
  karmicDebt?: KarmicDebtNumber;
  data: T | null;
};

export type PeriodIndicatorResult<T = unknown> = IndicatorResult<T> & { period: string };
export type KarmicLessonsResult = {
  missingNumbers: number[];
  data: Array<{ number: number; info: unknown | null }>;
};

export type NumerologyReport = {
  input: NumerologyInput & { dobParts: DobParts };
  birthday: IndicatorResult;
  attitude: IndicatorResult;
  lifePath: IndicatorResult;
  lifeCycles: PeriodIndicatorResult[];
  pyramidPeaks: PeriodIndicatorResult[];
  pyramidChallenges: PeriodIndicatorResult[];
  personalYear: IndicatorResult & { year: number };
  personalMonth: IndicatorResult & { month: number };
  personalDay: IndicatorResult & { date: string };
  destiny: IndicatorResult;
  maturity: IndicatorResult;
  soul: IndicatorResult;
  personality: IndicatorResult;
  soulChallenge: IndicatorResult;
  destinyChallenge: IndicatorResult;
  personalityChallenge: IndicatorResult;
  karmicLessons: KarmicLessonsResult;
  maturityAbility: IndicatorResult;
  cognitiveAbility: IndicatorResult;
  overrideDifficulty: IndicatorResult;
  approachMotivation: IndicatorResult;
  approachAbility: IndicatorResult;
  approachAttitude: IndicatorResult;
  cornerstone: IndicatorResult & { letter?: string };
  capstone: IndicatorResult & { letter?: string };
  meta: { calculatedAt: string; kbVersion: string; indicatorCount: number };
};

function parseDob(dob: string): DobParts {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dob);
  if (!match) throw new Error("Ngay sinh phai dung dinh dang YYYY-MM-DD.");

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() + 1 !== month ||
    date.getUTCDate() !== day
  ) {
    throw new Error("Ngay sinh khong hop le.");
  }

  return { day, month, year };
}

function parseCurrentDate(value?: string): Date {
  if (!value) return new Date();
  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime())) throw new Error("Ngay hien tai khong hop le.");
  return date;
}

function lookup(kb: NumerologyKb, section: keyof NumerologyKb, key: number | string): unknown | null {
  const sectionData = kb[section] as Record<string, unknown> | undefined;
  return sectionData?.[String(key)] ?? null;
}

function withData(
  kb: NumerologyKb,
  section: keyof NumerologyKb,
  value: IndicatorCalculation,
): IndicatorResult {
  return { ...value, data: lookup(kb, section, value.number) };
}

function withPeriodData(
  kb: NumerologyKb,
  section: keyof NumerologyKb,
  value: IndicatorCalculation & { period: string },
): PeriodIndicatorResult {
  return { ...value, data: lookup(kb, section, value.number) };
}

export async function generateReport(
  input: NumerologyInput,
  kb: NumerologyKb,
): Promise<NumerologyReport> {
  const fullName = input.fullName.trim();
  if (!fullName) throw new Error("Can nhap ho ten.");

  const dob = parseDob(input.dob);
  const currentDate = parseCurrentDate(input.currentDate);
  const currentYear = currentDate.getUTCFullYear();
  const currentMonth = currentDate.getUTCMonth() + 1;
  const firstName = getFirstName(fullName);

  const lifePath = calcLifePath(dob);
  const destiny = calcDestiny(fullName);
  const soul = calcSoul(fullName);
  const personality = calcPersonality(fullName);
  const maturity = calcMaturity(lifePath.number, destiny.number);
  const personalYear = calcPersonalYear(dob, currentYear);
  const personalMonth = calcPersonalMonth(dob, currentYear, currentMonth);
  const personalDay = calcPersonalDay(dob, currentDate);
  const karmicLessons = calcKarmicLessons(fullName);

  return {
    input: { ...input, fullName, dobParts: dob },
    birthday: withData(kb, "birthday_number", calcBirthday(dob.day)),
    attitude: withData(kb, "attitude_number", calcAttitude(dob)),
    lifePath: withData(kb, "life_path", lifePath),
    lifeCycles: calcLifeCycles(dob).map((item) => withPeriodData(kb, "life_cycle", item)),
    pyramidPeaks: calcPyramidPeaks(dob).map((item) => withPeriodData(kb, "pyramid_peak", item)),
    pyramidChallenges: calcPyramidChallenges(dob).map((item) =>
      withPeriodData(kb, "pyramid_challenge", item),
    ),
    personalYear: { ...withData(kb, "personal_year", personalYear), year: currentYear },
    personalMonth: { ...withData(kb, "personal_month", personalMonth), month: currentMonth },
    personalDay: {
      ...withData(kb, "personal_day", personalDay),
      date: currentDate.toISOString().slice(0, 10),
    },
    destiny: withData(kb, "destiny_number", destiny),
    maturity: withData(kb, "maturity_number", maturity),
    soul: withData(kb, "soul_number", soul),
    personality: withData(kb, "personality_number", personality),
    soulChallenge: withData(kb, "soul_challenge", soul),
    destinyChallenge: withData(kb, "destiny_challenge", destiny),
    personalityChallenge: withData(kb, "personality_challenge", personality),
    karmicLessons: {
      missingNumbers: karmicLessons,
      data: karmicLessons.map((number) => ({
        number,
        info: lookup(kb, "karmic_lessons", number),
      })),
    },
    maturityAbility: withData(kb, "maturity_ability", maturity),
    cognitiveAbility: withData(kb, "cognitive_ability", calcCognitiveAbility(dob)),
    overrideDifficulty: withData(kb, "override_difficulty", calcOverrideDifficulty(dob)),
    approachMotivation: withData(kb, "approach_motivation", calcApproachMotivation(fullName)),
    approachAbility: withData(kb, "approach_ability", calcApproachAbility(dob)),
    approachAttitude: withData(kb, "approach_attitude", calcApproachAttitude(dob)),
    cornerstone: { ...calcCornerstone(firstName), data: null },
    capstone: { ...calcCapstone(firstName), data: null },
    meta: {
      calculatedAt: new Date().toISOString(),
      kbVersion: kb.meta.version,
      indicatorCount: 33,
    },
  };
}
