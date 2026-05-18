// Entitlement service — server context only. KHÔNG import vào client component.
// Frontend không được tạo entitlement trực tiếp (security-threat-model P0.2).

import type {
  Entitlement,
  EntitlementType,
  ModuleCode,
  Purchase,
  StorageContext,
} from "@banmenh/shared";
import { createError } from "@banmenh/shared";
import {
  firestoreEntitlementRepository,
  firestorePurchaseRepository,
} from "../firestore";

type EntitlementSpec = {
  module: ModuleCode;
  type: EntitlementType;
  /** undefined = lifetime (single_report). số ngày = session. */
  expiresInDays?: number;
  /** Suffix cho deterministic id khi 1 purchase tạo nhiều entitlement. */
  idSuffix?: string;
};

const PRODUCT_ENTITLEMENT_MAP: Record<string, EntitlementSpec[]> = {
  numerology_single_report: [
    { module: "numerology", type: "single_report" },
  ],
  tarot_session_one: [
    { module: "tarot", type: "tarot_guide", expiresInDays: 90 },
  ],
  tarot_session_three: [
    { module: "tarot", type: "tarot_guide", expiresInDays: 90 },
  ],
  bundle_explorer: [
    { module: "numerology", type: "single_report", idSuffix: "_num" },
    { module: "tarot", type: "tarot_guide", expiresInDays: 90, idSuffix: "_tarot" },
  ],
};

/**
 * Tạo entitlement từ purchase đã confirmed.
 * Idempotent: deterministic doc id `${userId}_${purchaseId}[_suffix]`.
 * Không cho frontend gọi trực tiếp — chỉ webhook/API server gọi.
 */
export async function grantEntitlementFromPurchase(
  purchase: Purchase,
  ctx: StorageContext,
): Promise<Entitlement[]> {
  if (purchase.status !== "confirmed") {
    throw createError("PAYMENT_FAILED", {
      details: { purchaseId: purchase.id, status: purchase.status },
    });
  }

  const userId = purchase.userId;
  if (!userId || userId !== ctx.userId) {
    throw createError("FORBIDDEN");
  }

  const specs = PRODUCT_ENTITLEMENT_MAP[purchase.productCode];
  if (!specs || specs.length === 0) {
    throw createError("NOT_FOUND", {
      details: { productCode: purchase.productCode },
    });
  }

  const now = new Date();
  const results: Entitlement[] = [];

  for (const spec of specs) {
    const expiresAt = spec.expiresInDays
      ? new Date(now.getTime() + spec.expiresInDays * 86400000).toISOString()
      : undefined;

    const entitlement = await firestoreEntitlementRepository.create(
      {
        userId,
        module: spec.module,
        type: spec.type,
        purchaseId: purchase.id + (spec.idSuffix ?? ""),
        status: "active",
        startsAt: now.toISOString(),
        expiresAt,
        lifetime: !spec.expiresInDays,
      },
      ctx,
    );
    results.push(entitlement);
  }

  return results;
}

/**
 * Kiểm tra user có entitlement active cho productCode/reportId không.
 * Dùng trước khi trả nội dung KB.
 */
export async function checkEntitlement(
  userId: string,
  productCode: string,
  reportId?: string,
): Promise<{ has: boolean; entitlement?: Entitlement }> {
  const ctx: StorageContext = { userId };

  if (reportId) {
    const found = await firestoreEntitlementRepository.findActiveForReport(
      userId,
      reportId,
      ctx,
    );
    if (found) return { has: true, entitlement: found };
  }

  const specs = PRODUCT_ENTITLEMENT_MAP[productCode];
  if (!specs || specs.length === 0) return { has: false };

  const all = await firestoreEntitlementRepository.listByUser(userId, ctx);
  const spec = specs[0];
  const match = all.find(
    (e) =>
      e.module === spec.module &&
      e.type === spec.type &&
      e.status === "active" &&
      (!e.expiresAt || new Date(e.expiresAt) > new Date()),
  );

  if (match) return { has: true, entitlement: match };
  return { has: false };
}

/**
 * Verify purchase từ Firestore và grant entitlement.
 * Dùng trong webhook handler (T-0503).
 */
export async function grantFromPurchaseId(
  purchaseId: string,
  ctx: StorageContext,
): Promise<Entitlement[]> {
  const purchase = await firestorePurchaseRepository.getById(purchaseId, ctx);
  if (!purchase) throw createError("NOT_FOUND");
  return grantEntitlementFromPurchase(purchase, ctx);
}
