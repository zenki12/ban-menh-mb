// Storage adapter interface — implement bởi Worker/API, không phải frontend.
// Mirror docs/product-specs/data-contract.md mục 2 — collection `tarot_readings`.

import type { TarotReading } from "../schemas";
import type { PaginationOptions, QueryResult, StorageContext } from "./common";

export interface TarotReadingRepository {
  getById(id: string, ctx: StorageContext): Promise<TarotReading | null>;
  /**
   * userId + createdAt index (data-contract.md mục 4).
   * Cloud history cần delete/export khi user yêu cầu (mục 5).
   */
  listByUser(
    userId: string,
    options: PaginationOptions,
    ctx: StorageContext,
  ): Promise<QueryResult<TarotReading>>;
  create(
    input: Omit<TarotReading, "id" | "createdAt">,
    ctx: StorageContext,
  ): Promise<TarotReading>;
}
