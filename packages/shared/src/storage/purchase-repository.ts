// Storage adapter interface — implement bởi Worker/API, không phải frontend.
// Mirror docs/product-specs/data-contract.md mục 2 — collection `purchases`.

import type { Purchase, PurchaseStatus } from "../schemas";
import type { PaginationOptions, QueryResult, StorageContext } from "./common";

export interface PurchaseRepository {
  getById(id: string, ctx: StorageContext): Promise<Purchase | null>;
  /**
   * Lookup theo orderId — unique (data-contract.md mục 4).
   * Dùng để idempotency check trong webhook handler.
   */
  getByOrderId(orderId: string, ctx: StorageContext): Promise<Purchase | null>;
  listByUser(
    userId: string,
    options: PaginationOptions,
    ctx: StorageContext,
  ): Promise<QueryResult<Purchase>>;
  create(
    input: Omit<Purchase, "id" | "createdAt">,
    ctx: StorageContext,
  ): Promise<Purchase>;
  updateStatus(
    id: string,
    status: PurchaseStatus,
    ctx: StorageContext,
  ): Promise<Purchase>;
  /**
   * Đánh dấu confirmed sau khi webhook verify thành công.
   * Không tin amount/orderId từ frontend (security-threat-model P1.2).
   */
  markConfirmed(
    id: string,
    confirmedAt: string,
    providerRef: string,
    ctx: StorageContext,
  ): Promise<Purchase>;
}
