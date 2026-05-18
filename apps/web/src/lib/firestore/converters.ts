// Firestore document converters — dùng trong server context (admin SDK).
// Không import vào client component.

import type { DocumentData, DocumentSnapshot } from "firebase-admin/firestore";
import { Timestamp } from "firebase-admin/firestore";

/**
 * Chuyển Firestore Timestamp hoặc string sang ISO string.
 * Firestore Admin SDK trả về Timestamp object, không phải string.
 */
export function convertFirestoreTimestamp(value: unknown): string {
  if (value instanceof Timestamp) {
    return value.toDate().toISOString();
  }
  if (typeof value === "string") return value;
  if (typeof value === "number") return new Date(value).toISOString();
  return new Date().toISOString();
}

/**
 * Chuyển Firestore document snapshot sang plain object với timestamps đã convert.
 * Chỉ convert field có tên kết thúc bằng "At" hoặc "startsAt"/"expiresAt".
 */
export function fromFirestoreDoc<T extends Record<string, unknown>>(
  doc: DocumentSnapshot<DocumentData>,
): T | null {
  if (!doc.exists) return null;
  const data = doc.data() as Record<string, unknown>;
  const result: Record<string, unknown> = { id: doc.id };

  for (const [key, value] of Object.entries(data)) {
    if (
      value instanceof Timestamp ||
      (key.endsWith("At") && value !== undefined)
    ) {
      result[key] = convertFirestoreTimestamp(value);
    } else {
      result[key] = value;
    }
  }

  return result as T;
}

/**
 * Chuẩn bị data để ghi vào Firestore — loại bỏ field `id` (dùng làm doc id).
 */
export function toFirestoreDoc<T extends { id?: string }>(
  data: T,
): Omit<T, "id"> {
  const { id: _id, ...rest } = data;
  return rest as Omit<T, "id">;
}
