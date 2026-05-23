// Firestore implementation của VoucherRepository - server context only.
// Collection: "vouchers", doc id = uppercase voucher code.

import type {
  PaginationOptions,
  QueryResult,
  StorageContext,
  Voucher,
  VoucherRepository,
  VoucherUpdatePatch,
} from "@banmenh/shared";
import {
  StorageConflictError,
  StorageNotFoundError,
  voucherSchema,
} from "@banmenh/shared";
import {
  FieldValue,
  type DocumentSnapshot,
  type Query,
} from "firebase-admin/firestore";
import { adminFirestore } from "../firebase/admin";
import { fromFirestoreDoc } from "./converters";

const COLLECTION = "vouchers";

function col() {
  return adminFirestore.collection(COLLECTION);
}

function normalizeCode(code: string): string {
  return code.trim().toUpperCase();
}

function parseDoc(doc: DocumentSnapshot): Voucher | null {
  const data = fromFirestoreDoc<Record<string, unknown>>(doc);
  if (!data) return null;
  return voucherSchema.parse(data);
}

async function requireVoucher(code: string, ctx: StorageContext): Promise<Voucher> {
  const voucher = await firestoreVoucherRepository.getByCode(code, ctx);
  if (!voucher) throw new StorageNotFoundError("Voucher không tồn tại.");
  return voucher;
}

function normalizePatch(patch: VoucherUpdatePatch): Record<string, unknown> {
  const allowed: Array<keyof VoucherUpdatePatch> = [
    "discountType",
    "discountValue",
    "finalPrice",
    "maxUses",
    "perUserLimit",
    "modules",
    "startsAt",
    "expiresAt",
    "note",
  ];
  const data: Record<string, unknown> = {};
  for (const key of allowed) {
    if (patch[key] !== undefined) data[key] = patch[key];
  }
  data.updatedAt = new Date().toISOString();
  return data;
}

async function listQuery(query: Query, limit: number): Promise<QueryResult<Voucher>> {
  const snapshot = await query.limit(limit + 1).get();
  const docs = snapshot.docs.slice(0, limit);
  const items = docs.map((doc) => voucherSchema.parse(fromFirestoreDoc(doc)));
  const overflow = snapshot.docs.length > limit;
  const nextCursor = overflow ? items.at(-1)?.createdAt : undefined;
  return nextCursor ? { items, nextCursor } : { items };
}

export const firestoreVoucherRepository: VoucherRepository & {
  listAll(options: PaginationOptions, ctx: StorageContext): Promise<QueryResult<Voucher>>;
} = {
  async getByCode(code, _ctx) {
    const doc = await col().doc(normalizeCode(code)).get();
    return parseDoc(doc);
  },

  async listActive(options, _ctx) {
    const limit = Math.min(Math.max(options.limit ?? 50, 1), 100);
    let query = col().where("active", "==", true).orderBy("createdAt", "desc");
    if (options.cursor) query = query.startAfter(options.cursor);
    return listQuery(query, limit);
  },

  async listAll(options, _ctx) {
    const limit = Math.min(Math.max(options.limit ?? 50, 1), 100);
    let query = col().orderBy("createdAt", "desc");
    if (options.cursor) query = query.startAfter(options.cursor);
    return listQuery(query, limit);
  },

  async create(input, _ctx) {
    const now = new Date().toISOString();
    const voucher = voucherSchema.parse({
      ...input,
      code: normalizeCode(input.code),
      usedCount: 0,
      createdAt: now,
      updatedAt: now,
    });
    try {
      await col().doc(voucher.code).create(voucher);
    } catch (err) {
      if ((err as { code?: number | string }).code === 6) {
        throw new StorageConflictError("Voucher đã tồn tại.");
      }
      throw err;
    }
    return voucher;
  },

  async incrementUsage(code, ctx) {
    const normalized = normalizeCode(code);
    await col().doc(normalized).update({
      usedCount: FieldValue.increment(1),
      updatedAt: new Date().toISOString(),
    });
    return requireVoucher(normalized, ctx);
  },

  async setActive(code, active, ctx) {
    const normalized = normalizeCode(code);
    await requireVoucher(normalized, ctx);
    await col().doc(normalized).update({
      active,
      updatedAt: new Date().toISOString(),
    });
    return requireVoucher(normalized, ctx);
  },

  async update(code, patch, ctx) {
    const normalized = normalizeCode(code);
    await requireVoucher(normalized, ctx);
    await col().doc(normalized).update(normalizePatch(patch));
    return requireVoucher(normalized, ctx);
  },
};
