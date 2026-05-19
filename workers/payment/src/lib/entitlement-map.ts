// Duplicate từ apps/web/src/lib/entitlements/service.ts.
// Khi sửa pricing strategy, đồng bộ cả 2 nơi.
// Worker không thể import từ apps/web — phải duplicate.

export type EntitlementSpec = {
  module: "numerology" | "tarot";
  type: "single_report" | "tarot_guide" | "tarot_master";
  /** undefined = lifetime. số ngày = subscription. */
  expiresInDays?: number;
  /** Suffix cho deterministic id khi 1 purchase tạo nhiều entitlement. */
  idSuffix?: string;
};

export const PRODUCT_ENTITLEMENT_MAP: Record<string, EntitlementSpec[]> = {
  numerology_single_report: [
    { module: "numerology", type: "single_report" },
  ],
  tarot_guide_monthly: [
    { module: "tarot", type: "tarot_guide", expiresInDays: 30 },
  ],
  tarot_guide_quarterly: [
    { module: "tarot", type: "tarot_guide", expiresInDays: 90 },
  ],
};
