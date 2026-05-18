// Mirror docs/product-specs/data-contract.md mục 2 — collection `payment_logs`.
// Đổi schema phải đồng bộ docs. Retention tối thiểu 180 ngày (mục 5).

import { z } from "zod";
import { idSchema, timestampSchema } from "./common";

export const paymentLogLevelSchema = z.enum(["info", "warn", "error"]);
export type PaymentLogLevel = z.infer<typeof paymentLogLevelSchema>;

export const paymentLogSchema = z.object({
  id: idSchema,
  orderId: z.string().min(1).optional(),
  level: paymentLogLevelSchema,
  /** Event name tự do (data-contract.md dùng `event: string`). */
  event: z.string().min(1).max(120),
  /** Message không được chứa PII raw (security-threat-model P1.4). */
  message: z.string().min(1).max(2000),
  /**
   * Metadata tùy chọn. Raw webhook payload phải được redact trước khi lưu
   * (data-contract.md mục 5).
   */
  metadata: z.record(z.string(), z.unknown()).optional(),
  createdAt: timestampSchema,
});

export type PaymentLog = z.infer<typeof paymentLogSchema>;
