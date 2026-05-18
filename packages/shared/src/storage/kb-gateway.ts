// Storage adapter interface — implement bởi Worker/API, không phải frontend.
// KB nằm ở Cloudflare R2 (ADR-002). Frontend không được gọi gateway này
// trực tiếp — phải qua Worker /api/kb/* có entitlement check.

import type { StorageContext } from "./common";

/** Key để lookup một chunk KB từ R2. */
export type KBLookupKey = {
  module: "numerology" | "tarot";
  topic: string;
  indicator?: string;
};

/** Một đơn vị nội dung KB trả về từ R2. */
export type KBChunk = {
  key: string;
  content: string;
  meta?: Record<string, string | number | boolean>;
};

/**
 * Gateway truy cập KB private (R2/KV).
 *
 * SECURITY: Frontend không được gọi gateway này trực tiếp.
 * Phải qua Worker /api/kb/* có entitlement check.
 * Không log raw content KB ra payment_logs hoặc bất kỳ log public nào.
 */
export interface KBGateway {
  fetchChunk(
    key: KBLookupKey,
    ctx: StorageContext,
  ): Promise<KBChunk | null>;
  fetchChunks(
    keys: readonly KBLookupKey[],
    ctx: StorageContext,
  ): Promise<readonly KBChunk[]>;
}
