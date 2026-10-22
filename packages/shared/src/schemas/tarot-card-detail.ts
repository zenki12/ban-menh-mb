import { z } from "zod";

const detailText = z.string().trim().max(5_000);
const metadataText = z.string().trim().max(160);

export const tarotCardDetailSchema = z.object({
  id: z.number().int().min(0).max(77),
  nameEn: metadataText.min(1),
  nameVi: metadataText.min(1),
  number: metadataText,
  orientation: z.enum(["upright", "reversed"]),
  element: metadataText,
  planet: metadataText,
  zodiac: metadataText,
  numerology: metadataText,
  keywords: z.array(z.string().trim().min(1).max(100)).max(16),
  meaning: detailText.min(1),
  aspectMeaning: detailText.min(1),
}).strict();

export const tarotCardDetailResponseSchema = z.object({
  ok: z.literal(true),
  card: tarotCardDetailSchema,
}).strict();

export type TarotCardDetail = z.infer<typeof tarotCardDetailSchema>;
export type TarotCardDetailResponse = z.infer<typeof tarotCardDetailResponseSchema>;
