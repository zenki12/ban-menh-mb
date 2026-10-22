import { z } from "zod";

const optionalShortText = z.string().trim().max(120).optional().default("");

export const tarotAiCardInputSchema = z.object({
  id: z.number().int().min(0).max(77),
  nameVi: z.string().trim().min(1).max(100),
  nameEn: z.string().trim().min(1).max(100),
  position: z.string().trim().min(1).max(100),
  orientation: z.enum(["upright", "reversed"]),
  imageFile: z.string().trim().max(160).optional(),
  aspectMeaning: z.string().trim().max(2_000).optional().default(""),
  meaning: z.string().trim().min(1).max(2_000),
  keywords: z.array(z.string().trim().min(1).max(80)).max(12).default([]),
  planet: optionalShortText,
  zodiac: optionalShortText,
  element: optionalShortText,
  numerology: optionalShortText,
}).strict();

export const tarotClarificationSchema = z.object({
  question: z.string().trim().min(1).max(240),
  answer: z.boolean(),
}).strict();

export const tarotAiReadingRequestSchema = z.object({
  profile: z.object({
    name: z.string().trim().min(1).max(100).default("Bạn"),
    dob: z.string().trim().max(20).optional().default(""),
    gender: z.string().trim().max(40).optional().default(""),
  }).strict(),
  themeLabel: z.string().trim().min(1).max(100),
  nicheLabel: z.string().trim().min(1).max(120),
  nicheKey: z.string().trim().min(1).max(100),
  question: z.string().trim().min(1).max(200),
  spread: z.union([z.literal(1), z.literal(3), z.literal(5), z.literal(7), z.literal(10), z.literal(12)]),
  cards: z.array(tarotAiCardInputSchema).min(1).max(12),
  clarifications: z.array(tarotClarificationSchema).length(3),
  additionalContext: z.string().trim().max(1_000).optional().default(""),
}).strict().superRefine((value, context) => {
  if (value.cards.length !== value.spread) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Số lá bài phải khớp kiểu trải bài.",
      path: ["cards"],
    });
  }
});

export const tarotAiCardReadingSchema = z.object({
  position: z.string().trim().min(1).max(100),
  cardName: z.string().trim().min(1).max(140),
  interpretation: z.string().trim().min(1).max(3_000),
}).strict();

export const tarotAiGeneratedReadingSchema = z.object({
  overview: z.string().trim().min(1).max(5_000),
  cards: z.array(tarotAiCardReadingSchema).min(1).max(12),
  synergy: z.string().trim().min(1).max(5_000),
  advice: z.array(z.string().trim().min(1).max(1_000)).length(3),
}).strict();

export const tarotAiReadingSchema = tarotAiGeneratedReadingSchema.extend({
  markdown: z.string().trim().min(1).max(15_000),
});

export const tarotAiReadingResponseSchema = z.object({
  ok: z.literal(true),
  fallback: z.boolean(),
  source: z.enum(["gemini", "template"]),
  reading: tarotAiReadingSchema,
  disclosure: z.string().trim().min(1),
}).strict();

export type TarotAiReadingRequest = z.infer<typeof tarotAiReadingRequestSchema>;
export type TarotAiCardReading = z.infer<typeof tarotAiCardReadingSchema>;
export type TarotAiGeneratedReading = z.infer<typeof tarotAiGeneratedReadingSchema>;
export type TarotAiReading = z.infer<typeof tarotAiReadingSchema>;
export type TarotAiReadingResponse = z.infer<typeof tarotAiReadingResponseSchema>;
