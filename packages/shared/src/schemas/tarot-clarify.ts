import { z } from "zod";

export const tarotClarifyNicheSchema = z.string().trim().regex(/^[a-z0-9_]{1,64}$/);

export const tarotClarifyQuestionSchema = z.string().trim().min(1).max(240);

export const tarotClarifyResponseSchema = z.object({
  ok: z.literal(true),
  nicheKey: tarotClarifyNicheSchema,
  questions: z.array(tarotClarifyQuestionSchema).length(3),
}).strict();

export type TarotClarifyResponse = z.infer<typeof tarotClarifyResponseSchema>;
