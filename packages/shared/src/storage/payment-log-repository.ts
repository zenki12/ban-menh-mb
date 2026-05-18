// Storage adapter interface — implement bởi Worker/API, không phải frontend.
// Mirror docs/product-specs/data-contract.md mục 2 — collection `payment_logs`.
// Retention tối thiểu 180 ngày (data-contract.md mục 5).

import type { PaymentLog } from "../schemas";
import type { PaginationOptions, QueryResult, StorageContext } from "./common";

export interface PaymentLogRepository {
  /**
   * Append-only — không update/delete log.
   * metadata phải được redact PII trước khi gọi (security-threat-model P1.4).
   */
  append(
    entry: Omit<PaymentLog, "id" | "createdAt">,
    ctx: StorageContext,
  ): Promise<PaymentLog>;
  /** orderId index (data-contract.md mục 4). */
  listByOrderId(
    orderId: string,
    options: PaginationOptions,
    ctx: StorageContext,
  ): Promise<QueryResult<PaymentLog>>;
}
