import { z } from "zod";
const noteField = z.object({ note: z.string().optional() });
const stringArraySchema = z.array(z.string());
const numberArraySchema = z.array(z.number().int());
const recordWithNote = <T extends z.ZodTypeAny>(valueSchema: T) => noteField.catchall(valueSchema);
export const LetterMapSchema = z.record(z.string(), z.number().int());
export type LetterMap = z.infer<typeof LetterMapSchema>;
export const KarmicDebtSchema = z.object({
  reduces_to: z.number().int(),
  meaning: z.string(),
  lesson: z.string(),
  description: z.string().optional(),
  how_to_reduce: z.union([z.string(), stringArraySchema]).optional(),
  negative_aspects: stringArraySchema.optional(),
});
export type KarmicDebt = z.infer<typeof KarmicDebtSchema>;
export const LifeCycleSchema = z.object({
  theme: z.string(),
  cycle1: z.string(),
  cycle2: z.string(),
  cycle3: z.string(),
});
export type LifeCycle = z.infer<typeof LifeCycleSchema>;
export const BirthdayNumberSchema = z.object({
  title: z.string(),
  strengths: z.string(),
  weaknesses: z.string(),
  lesson: z.string(),
  gift: z.string(),
  career_fit: z.string(),
  relationship_style: z.string(),
});
export type BirthdayNumber = z.infer<typeof BirthdayNumberSchema>;
export const PyramidPeakSchema = z.string();
export type PyramidPeak = z.infer<typeof PyramidPeakSchema>;
export const PyramidChallengeSchema = z.string();
export type PyramidChallenge = z.infer<typeof PyramidChallengeSchema>;
const LifePathSchema = z.object({
  title: z.string(),
  description: z.string(),
  strengths: z.string(),
  weaknesses: z.string(),
  career: z.string(),
  health: z.string(),
  love: z.string().optional(),
  positive_traits: stringArraySchema,
  negative_traits: stringArraySchema,
  best_partners: numberArraySchema,
  challenging_partners: numberArraySchema,
  parenting_style: z.string(),
  money_style: z.string(),
  famous: stringArraySchema,
});
const DestinyNumberSchema = z.object({
  title: z.string(),
  positive: z.string(),
  negative: z.string(),
  mission: z.string(),
  career: z.string(),
  relationship: z.string(),
  growth_path: z.string(),
});
const SoulNumberSchema = z.object({
  title: z.string(),
  core: z.string(),
  desire: z.string(),
  fear: z.string(),
  in_relationship: z.string(),
  shadow: z.string(),
});
const PersonalityNumberSchema = z.object({
  title: z.string(),
  traits: z.string(),
  first_impression: z.string(),
  how_others_see: z.string(),
  style_tip: z.string(),
});
const MaturityNumberSchema = z.object({
  title: z.string(),
  description: z.string(),
  theme: z.string(),
  life_lesson: z.string(),
  advice: z.string(),
  warning: z.string(),
});
const AttitudeNumberSchema = z.object({
  title: z.string(),
  description: z.string(),
  first_vibe: z.string(),
  strength: z.string(),
  blind_spot: z.string(),
});
const PersonalYearSchema = z.object({
  title: z.string(),
  theme: z.string(),
  career: z.string(),
  finance: z.string(),
  love: z.string().optional(),
  health: z.string(),
  study: z.string(),
  advice: z.string(),
  warning: z.string(),
});
const PersonalMonthSchema = z.object({
  title: z.string(),
  focus: z.string(),
  action: z.string(),
  moon_link: z.string(),
  warning: z.string(),
});
const KarmicLessonSchema = z.object({
  missing_letters: stringArraySchema,
  lesson: z.string(),
});
const ChallengeSchema = z.object({
  title: z.string(),
  description: z.string(),
  core_lesson: z.string(),
  practical_tip: z.string().optional(),
  style_upgrade: z.string().optional(),
});
const AbilitySchema = z.object({
  title: z.string(),
  description: z.string(),
  peak_age: z.string().optional(),
  how_to_develop: z.string().optional(),
  strength: z.string().optional(),
  blind_spot: z.string().optional(),
  best_environment: z.string().optional(),
  trigger: z.string().optional(),
  how_to_motivate: z.string().optional(),
  signature_move: z.string().optional(),
  growth_tip: z.string().optional(),
  perception: z.string().optional(),
  reframe: z.string().optional(),
});
const BirthChartGridSchema = z.object({
  layout: z.object({
    row3: numberArraySchema,
    row2: numberArraySchema,
    row1: numberArraySchema,
    outside: numberArraySchema,
  }),
  arrows: z.record(z.string(), z.string()),
  axes: z.record(z.string(), z.object({ name: z.string(), description: z.string() })),
  isolated_numbers: recordWithNote(z.string()),
  multiple_numbers: recordWithNote(z.string()),
});
const CompatibilitySchema = recordWithNote(
  z.object({
    score: z.number().int(),
    dynamic: z.string(),
    strengths: z.string(),
    challenges: z.string(),
    advice: z.string(),
  }),
);
export const NumerologyKbSchema = z.object({
  meta: z.object({
    version: z.string(),
    source: z.string(),
    system: z.string(),
    language: z.string(),
  }),
  letter_map: LetterMapSchema,
  vowels: stringArraySchema,
  y_rule: z.string(),
  karmic_debt: z.record(z.string(), KarmicDebtSchema),
  life_cycle: recordWithNote(LifeCycleSchema),
  pyramid_peak: recordWithNote(PyramidPeakSchema),
  pyramid_challenge: recordWithNote(PyramidChallengeSchema),
  birthday_number: z.record(z.string(), BirthdayNumberSchema),
  life_path: z.record(z.string(), LifePathSchema),
  destiny_number: z.record(z.string(), DestinyNumberSchema),
  soul_number: recordWithNote(SoulNumberSchema),
  personality_number: recordWithNote(PersonalityNumberSchema),
  maturity_number: z.record(z.string(), MaturityNumberSchema),
  attitude_number: z.record(z.string(), AttitudeNumberSchema),
  personal_year: z.record(z.string(), PersonalYearSchema),
  personal_month: recordWithNote(PersonalMonthSchema),
  personal_day: z.record(z.string(), z.string()),
  karmic_lessons: z.record(z.string(), KarmicLessonSchema),
  triads: z.record(z.string(), z.object({ name: z.string(), traits: z.string() })),
  tension_number: z.record(z.string(), z.string()),
  birth_chart_grid: BirthChartGridSchema,
  soul_challenge: recordWithNote(ChallengeSchema),
  destiny_challenge: recordWithNote(ChallengeSchema),
  personality_challenge: recordWithNote(ChallengeSchema),
  maturity_ability: recordWithNote(AbilitySchema),
  override_difficulty: recordWithNote(z.object({ positives: stringArraySchema, negatives: stringArraySchema, advice: z.string() })),
  cognitive_ability: recordWithNote(AbilitySchema),
  approach_motivation: recordWithNote(AbilitySchema),
  approach_ability: recordWithNote(AbilitySchema),
  approach_attitude: recordWithNote(AbilitySchema),
  birth_chart_axes: noteField,
  compatibility: CompatibilitySchema,
});
export type NumerologyKb = z.infer<typeof NumerologyKbSchema>;

export const NarrativeEntrySchema = z.object({
  html: z.string().min(50),
  variables: z.array(z.string()),
});
export type NarrativeEntry = z.infer<typeof NarrativeEntrySchema>;

export const NarrativeKbSchema = z.object({
  lifePath: z.record(z.string(), NarrativeEntrySchema),
  destiny: z.record(z.string(), NarrativeEntrySchema),
});
export type NarrativeKb = z.infer<typeof NarrativeKbSchema>;
