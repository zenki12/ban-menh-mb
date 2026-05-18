// Mirror docs/product-specs/data-contract.md mục 2 — collection `entitlements`.
// Đổi schema phải đồng bộ docs.

import { z } from "zod";
import { idSchema, moduleSchema, timestampSchema } from "./common";

export const entitlementTypeSchema = z.enum([
  "single_report",
  "tarot_guide",
  "tarot_master",
]);
export type EntitlementType = z.infer<typeof entitlementTypeSchema>;

export const entitlementStatusSchema = z.enum([
  "active",
  "expired",
  "cancelled",
]);
export type EntitlementStatus = z.infer<typeof entitlementStatusSchema>;

export const entitlementSchema = z.object({
  id: idSchema,
  userId: idSchema.optional(),
  module: moduleSchema,
  type: entitlementTypeSchema,
  reportId: idSchema.optional(),
  purchaseId: idSchema,
  status: entitlementStatusSchema,
  startsAt: timestampSchema,
  expiresAt: timestampSchema.optional(),
  lifetime: z.boolean().optional(),
});

export type Entitlement = z.infer<typeof entitlementSchema>;
