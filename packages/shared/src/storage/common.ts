// Storage adapter interface — implement bởi Worker/API, không phải frontend.
// Base types dùng chung cho mọi repository.

import type { ErrorCode } from "../errors";

/** Truyền qua mọi storage call để hỗ trợ audit log và request tracing. */
export type StorageContext = {
  userId?: string;
  requestId?: string;
};

/** Tùy chọn phân trang cursor-based. */
export type PaginationOptions = {
  limit?: number;
  /** Opaque cursor từ response trước. */
  cursor?: string;
};

/** Kết quả truy vấn có phân trang. */
export type QueryResult<T> = {
  items: readonly T[];
  nextCursor?: string;
  total?: number;
};

/** Kết quả ghi — trả về id + timestamp tương ứng. */
export type WriteResult =
  | { id: string; createdAt: string }
  | { id: string; updatedAt: string };

/** Lỗi khi không tìm thấy document. code khớp ErrorCode từ errors.ts. */
export class StorageNotFoundError extends Error {
  readonly code: ErrorCode = "NOT_FOUND";
  constructor(message = "Document không tồn tại.") {
    super(message);
    this.name = "StorageNotFoundError";
  }
}

/** Lỗi khi document đã tồn tại (unique constraint). */
export class StorageConflictError extends Error {
  readonly code: ErrorCode = "ALREADY_EXISTS";
  constructor(message = "Document đã tồn tại.") {
    super(message);
    this.name = "StorageConflictError";
  }
}
