// Mirror docs/product-specs/data-contract.md mục 2 — collection `purchases`.
// Đổi schema phải đồng bộ docs.

import { z } from "zod";
import {
  currencySchema,
  idSchema,
  moduleSchema,
  timestampSchema,
  vndAmountSchema,
} from "./common";

export const purchaseStatusSchema = z.enum([
  "pending",
  "confirming",
  "confirmed",
  "failed",
  "expired",
]);
export type PurchaseStatus = z.infer<typeof purchaseStatusSchema>;

export const paymentProviderSchema = z.enum(["payos"]);
export type PaymentProvider = z.infer<typeof paymentProviderSchema>;

export const purchaseSchema = z.object({
  id: idSchema,
  /** Money flow phải có `orderId` (data-contract.md mục 1). Unique. */
  orderId: z.string().min(1),
  userId: idSchema.optional(),
  module: moduleSchema,
  /** `productCode` đến từ `@banmenh/shared` pricing contract (T-0401). */
  productCode: z.string().min(1),
  amount: vndAmountSchema,
  currency: currencySchema,
  status: purchaseStatusSchema,
  provider: paymentProviderSchema,
  /** Reference từ provider (vd: PayOS transaction id). */
  providerRef: z.string().min(1).optional(),
  voucherCode: z.string().min(1).optional(),
  createdAt: timestampSchema,
  confirmedAt: timestampSchema.optional(),
  expiresAt: timestampSchema.optional(),
});

export type Purchase = z.infer<typeof purchaseSchema>;
