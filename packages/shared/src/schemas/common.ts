// Mirror docs/product-specs/data-contract.md mục 2 (primitives chung).
// Đổi schema phải đồng bộ docs.

import { z } from "zod";

/**
 * Timestamp dạng ISO-8601 string (data-contract.md dùng `string` cho mọi
 * `createdAt`/`updatedAt`/`startsAt`/`expiresAt`/`confirmedAt`). Backend là
 * nguồn sự thật cho thời gian, frontend không tự sinh.
 */
export const timestampSchema = z
  .string()
  .min(1)
  .refine((value) => !Number.isNaN(Date.parse(value)), {
    message: "timestamp phải là ISO-8601 string hợp lệ",
  });

/** ID document/record. Đủ rộng cho Firestore auto-id và uuid. */
export const idSchema = z.string().min(1).max(128);

/** Số tiền VND, integer không âm (data-contract.md dùng `amount: number`). */
export const vndAmountSchema = z.number().int().nonnegative();

/** Ngày sinh dạng `YYYY-MM-DD` (data-contract.md `birthDate: string`). */
export const isoDateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
  message: "Định dạng ngày phải là YYYY-MM-DD",
});

/** Email cho user provider Google. */
export const emailSchema = z.string().email();

/** Module business hiện hành. */
export const moduleSchema = z.enum(["numerology", "tarot"]);
export type ModuleCode = z.infer<typeof moduleSchema>;

/** Currency hiện hành (data-contract.md chỉ liệt kê `"VND"`). */
export const currencySchema = z.literal("VND");
