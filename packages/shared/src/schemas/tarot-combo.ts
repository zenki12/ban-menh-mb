import { z } from "zod";

const shortText = z.string().trim().min(1).max(180);

export const tarotComboCardSchema = z.object({
  id: z.number().int().min(0).max(77),
  nameEn: shortText,
  nameVi: shortText,
  orientation: z.enum(["upright", "reversed"]),
}).strict();

export const tarotComboLookupRequestSchema = z.object({
  nicheKey: z.string().trim().regex(/^[a-z0-9_]{1,64}$/),
  cards: z.array(tarotComboCardSchema).min(1).max(12),
  testMode: z.boolean().optional().default(false),
}).strict();

export const tarotComboClientRequestSchema = tarotComboLookupRequestSchema
  .omit({ testMode: true })
  .extend({ testModeRequested: z.boolean().optional().default(false) })
  .strict();

export const tarotMatchedComboSchema = z.object({
  id: z.string().trim().min(1).max(500),
  size: z.number().int().min(2).max(5),
  title: z.string().trim().min(1).max(500),
  description: z.string().trim().max(2_000),
  text: z.string().trim().min(1).max(12_000),
  orientationVariant: z.string().regex(/^(Up|Rev)(_(Up|Rev)){1,4}$/),
  cards: z.array(tarotComboCardSchema).min(2).max(5),
}).strict();

export const tarotComboLookupResponseSchema = z.object({
  ok: z.literal(true),
  combos: z.array(tarotMatchedComboSchema).max(3),
  testMode: z.boolean(),
}).strict();

export type TarotComboCard = z.infer<typeof tarotComboCardSchema>;
export type TarotComboLookupRequest = z.infer<typeof tarotComboLookupRequestSchema>;
export type TarotComboClientRequest = z.infer<typeof tarotComboClientRequestSchema>;
export type TarotMatchedCombo = z.infer<typeof tarotMatchedComboSchema>;
export type TarotComboLookupResponse = z.infer<typeof tarotComboLookupResponseSchema>;
