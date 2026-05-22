// Firestore implementation c?a VoucherRepository - server context only.
// Collection: "vouchers", doc id = uppercase voucher code.

import type { Voucher, VoucherRepository } from "@banmenh/shared";
import { voucherSchema } from "@banmenh/shared";
import { FieldValue } from "firebase-admin/firestore";
import { adminFirestore } from "../firebase/admin";
import { fromFirestoreDoc } from "./converters";

const COLLECTION = "vouchers";

function col() {
  return adminFirestore.collection(COLLECTION);
}

function normalizeCode(code: string): string {
  return code.trim().toUpperCase();
}

function notImplemented(): never {
  throw new Error("Implement ở T-0506");
}

export const firestoreVoucherRepository: VoucherRepository = {
  async getByCode(code, _ctx) {
    const doc = await col().doc(normalizeCode(code)).get();
    const data = fromFirestoreDoc<Record<string, unknown>>(doc);
    if (!data) return null;
    return voucherSchema.parse(data);
  },

  async incrementUsage(code, _ctx) {
    const normalized = normalizeCode(code);
    await col().doc(normalized).update({
      usedCount: FieldValue.increment(1),
      updatedAt: new Date().toISOString(),
    });
    const updated = await this.getByCode(normalized, _ctx);
    if (!updated) throw new Error("Voucher not found after incrementUsage");
    return updated;
  },

  listActive: notImplemented,
  create: notImplemented,
  setActive: notImplemented,
};
