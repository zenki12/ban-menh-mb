// Storage adapter interface — implement bởi Worker/API, không phải frontend.
// Mirror docs/product-specs/data-contract.md mục 2 — collection `entitlements`.

import type { Entitlement } from "../schemas";
import type { StorageContext } from "./common";

export interface EntitlementRepository {
  getById(id: string, ctx: StorageContext): Promise<Entitlement | null>;
  /** Lấy tất cả entitlement của user — dùng cho /api/entitlements. */
  listByUser(
    userId: string,
    ctx: StorageContext,
  ): Promise<readonly Entitlement[]>;
  /**
   * Tìm entitlement active cho một report cụ thể.
   * Dùng để kiểm tra quyền unlock trước khi trả nội dung.
   */
  findActiveForReport(
    userId: string,
    reportId: string,
    ctx: StorageContext,
  ): Promise<Entitlement | null>;
  /**
   * Tạo entitlement sau khi payment confirmed.
   * purchaseId unique — không tạo trùng (data-contract.md mục 4).
   */
  create(
    input: Omit<Entitlement, "id">,
    ctx: StorageContext,
  ): Promise<Entitlement>;
  markCancelled(id: string, ctx: StorageContext): Promise<Entitlement>;
}
