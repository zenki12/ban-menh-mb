// Firestore implementation của PurchaseRepository — server context only.
// Collection: "purchases", doc id = orderId string.
// create() implement ở đây (T-0501). updateStatus/markConfirmed ở T-0503 (worker payment).

import type { Purchase, PurchaseRepository } from "@banmenh/shared";
import { adminFirestore } from "../firebase/admin";
import { fromFirestoreDoc, toFirestoreDoc } from "./converters";

const COLLECTION = "purchases";

function col() {
  return adminFirestore.collection(COLLECTION);
}

export const firestorePurchaseRepository: Pick<
  PurchaseRepository,
  "getById" | "getByOrderId" | "create"
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

  async create(input, _ctx) {
    const now = new Date().toISOString();
    // doc id = orderId để lookup nhanh và đảm bảo unique
    const docId = input.orderId;
    const data: Purchase = {
      ...input,
      id: docId,
      createdAt: now,
    };
    await col().doc(docId).set(toFirestoreDoc(data));
    return data;
  },
};

/**
 * Update providerRef sau khi PayOS trả về paymentLinkId.
 * Không thuộc interface chuẩn — chỉ dùng nội bộ trong payment create flow.
 */
export async function updatePurchaseProviderRef(
  orderId: string,
  providerRef: string,
): Promise<void> {
  await col().doc(orderId).update({ providerRef });
}

// updateStatus + markConfirmed sẽ implement ở T-0503 (worker payment context).
// Không mock — throw rõ ràng nếu vô tình gọi.
export function getNotImplementedMethods(): Pick<
  PurchaseRepository,
  "listByUser" | "updateStatus" | "markConfirmed"
> {
  const notImpl = (): never => {
    throw new Error(
      "PurchaseRepository method chưa implement ở Next.js side. Xem T-0503 (worker payment).",
    );
  };
  return {
    listByUser: notImpl,
    updateStatus: notImpl,
    markConfirmed: notImpl,
  };
}
