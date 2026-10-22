import { z } from "zod";

const metadataText = z.string().trim().min(1).max(500);

export const tarotComboLibraryCardSchema = z.object({
  id: z.number().int().min(0).max(77),
  nameEn: z.string().trim().min(1).max(180),
  nameVi: z.string().trim().min(1).max(180),
}).strict();

export const tarotComboLibraryQuerySchema = z.object({
  page: z.coerce.number().int().min(1).max(200).default(1),
  pageSize: z.coerce.number().int().min(15).max(15).default(15),
  size: z.enum(["all", "2", "3", "4", "5"]).default("all"),
  q: z.string().trim().max(100).default(""),
}).strict();

export const tarotComboLibraryItemSchema = z.object({
  id: z.string().trim().min(1).max(500),
  size: z.number().int().min(2).max(5),
  title: metadataText,
  description: z.string().trim().max(2_000),
  cards: z.array(tarotComboLibraryCardSchema).min(2).max(5),
}).strict();

export const tarotComboLibraryResponseSchema = z.object({
  ok: z.literal(true),
  items: z.array(tarotComboLibraryItemSchema).max(15),
  total: z.number().int().min(0).max(2_000),
  page: z.number().int().min(1),
  pageSize: z.literal(15),
  totalPages: z.number().int().min(0).max(200),
}).strict();

export const tarotComboNicheReadingSchema = z.object({
  key: z.string().regex(/^[a-z0-9_]{1,64}$/),
  label: z.string().trim().min(1).max(180),
  upright: z.string().trim().min(1).max(12_000),
  reversed: z.string().trim().min(1).max(12_000),
}).strict();

export const tarotComboDomainReadingSchema = z.object({
  key: z.enum(["love", "finance", "health", "career", "self"]),
  label: z.string().trim().min(1).max(100),
  niches: z.array(tarotComboNicheReadingSchema).max(25),
}).strict();

export const tarotComboLibraryDetailResponseSchema = z.object({
  ok: z.literal(true),
  combo: tarotComboLibraryItemSchema,
  domains: z.array(tarotComboDomainReadingSchema).length(5),
}).strict();

export type TarotComboLibraryCard = z.infer<typeof tarotComboLibraryCardSchema>;
export type TarotComboLibraryItem = z.infer<typeof tarotComboLibraryItemSchema>;
export type TarotComboLibraryResponse = z.infer<typeof tarotComboLibraryResponseSchema>;
export type TarotComboLibraryDetailResponse = z.infer<typeof tarotComboLibraryDetailResponseSchema>;
export type TarotComboDomainReading = z.infer<typeof tarotComboDomainReadingSchema>;
