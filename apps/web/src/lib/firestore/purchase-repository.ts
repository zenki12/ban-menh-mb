// Firestore implementation của PurchaseRepository — PARTIAL, server context only.
// Chỉ implement getById + getByOrderId (cần cho entitlement grant verify).
// create/updateStatus/markConfirmed sẽ implement ở T-0503 (worker payment).

import type { Purchase, PurchaseRepository } from "@banmenh/shared";
import { adminFirestore } from "../firebase/admin";
import { fromFirestoreDoc } from "./converters";

const COLLECTION = "purchases";

function col() {
  return adminFirestore.collection(COLLECTION);
}

export const firestorePurchaseRepository: Pick<
  PurchaseRepository,
  "getById" | "getByOrderId"
> = {
  async getById(id, _ctx) {
    const doc = await col().doc(id).get();
    return fromFirestoreDoc<Purchase>(doc);
  },

  async getByOrderId(orderId, _ctx) {
    const snap = await col()
      .where("orderId", "==", orderId)
      .limit(1)
      .get();
    if (snap.empty) return null;
    return fromFirestoreDoc<Purchase>(snap.docs[0]);
  },
};

// Các method còn lại sẽ implement ở T-0503 (worker payment context).
// Không mock — throw rõ ràng nếu vô tình gọi.
export function notImplementedPurchaseRepository(): PurchaseRepository {
  const stub = firestorePurchaseRepository as PurchaseRepository;
  const notImpl = () => {
    throw new Error(
      "PurchaseRepository method chưa implement ở Next.js side. Xem T-0503 (worker payment).",
    );
  };
  stub.listByUser = notImpl;
  stub.create = notImpl;
  stub.updateStatus = notImpl;
  stub.markConfirmed = notImpl;
  return stub;
}
