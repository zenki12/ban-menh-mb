// Storage adapter interface — implement bởi Worker/API, không phải frontend.
// Mirror docs/product-specs/data-contract.md mục 2 — collection `vouchers`.

import type { Voucher } from "../schemas";
import type { PaginationOptions, QueryResult, StorageContext } from "./common";

export type VoucherUpdatePatch = Partial<
  Pick<
    Voucher,
    | "discountType"
    | "discountValue"
    | "finalPrice"
    | "maxUses"
    | "perUserLimit"
    | "modules"
    | "startsAt"
    | "expiresAt"
    | "note"
  >
>;

export interface VoucherRepository {
  /** code unique uppercase (data-contract.md mục 4). */
  getByCode(code: string, ctx: StorageContext): Promise<Voucher | null>;
  listActive(
    options: PaginationOptions,
    ctx: StorageContext,
  ): Promise<QueryResult<Voucher>>;
  create(
    input: Omit<Voucher, "createdAt" | "updatedAt" | "usedCount">,
    ctx: StorageContext,
  ): Promise<Voucher>;
  /**
   * Tăng usedCount sau khi voucher được áp dụng thành công.
   * Phải atomic để tránh race condition vượt maxUses.
   */
  incrementUsage(code: string, ctx: StorageContext): Promise<Voucher>;
  setActive(
    code: string,
    active: boolean,
    ctx: StorageContext,
  ): Promise<Voucher>;
  update(
    code: string,
    patch: VoucherUpdatePatch,
    ctx: StorageContext,
  ): Promise<Voucher>;
}
