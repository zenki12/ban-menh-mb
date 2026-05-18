// Mirror docs/product-specs/data-contract.md mục 2 — collection `vouchers`.
// Đổi schema phải đồng bộ docs.

import { z } from "zod";
import { moduleSchema, timestampSchema, vndAmountSchema } from "./common";

export const discountTypeSchema = z.enum(["fixed", "percent", "finalPrice"]);
export type DiscountType = z.infer<typeof discountTypeSchema>;

export const voucherSchema = z.object({
  /** Unique uppercase (data-contract.md mục 4). */
  code: z.string().min(1).max(64).toUpperCase(),
  active: z.boolean(),
  modules: z.array(moduleSchema).min(1),
  discountType: discountTypeSchema,
  discountValue: vndAmountSchema.optional(),
  finalPrice: vndAmountSchema.optional(),
  maxUses: z.number().int().positive().optional(),
  usedCount: z.number().int().nonnegative(),
  perUserLimit: z.number().int().positive().optional(),
  startsAt: timestampSchema.optional(),
  expiresAt: timestampSchema.optional(),
  note: z.string().max(500).optional(),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
});

export type Voucher = z.infer<typeof voucherSchema>;
