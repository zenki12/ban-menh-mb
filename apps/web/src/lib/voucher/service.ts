import {
  createError,
  findProduct,
  type AppError,
  type Voucher,
} from "@banmenh/shared";
import { firestoreVoucherRepository } from "../firestore";

type ValidVoucherResult = {
  valid: true;
  discountVnd: number;
  finalAmount: number;
  voucher: Voucher;
};

type InvalidVoucherResult = {
  valid: false;
  error: AppError;
};

export type VoucherValidationResult = ValidVoucherResult | InvalidVoucherResult;

const PAYOS_MIN_AMOUNT = 1000;

function clampDiscount(productPrice: number, discount: number): number {
  return Math.min(productPrice, Math.max(0, Math.floor(discount)));
}

function calculateDiscount(productPrice: number, voucher: Voucher): number | null {
  if (voucher.discountType === "fixed") {
    if (voucher.discountValue === undefined) return null;
    return clampDiscount(productPrice, voucher.discountValue);
  }
  if (voucher.discountType === "percent") {
    if (voucher.discountValue === undefined) return null;
    return clampDiscount(productPrice, (productPrice * voucher.discountValue) / 100);
  }
  if (voucher.finalPrice === undefined) return null;
  return clampDiscount(productPrice, productPrice - voucher.finalPrice);
}

export async function validateVoucher(
  code: string,
  productCode: string,
  userId: string,
): Promise<VoucherValidationResult> {
  const normalizedCode = code.trim().toUpperCase();
  const voucher = await firestoreVoucherRepository.getByCode(normalizedCode, { userId });
  if (!voucher) {
    return { valid: false, error: createError("VOUCHER_NOT_FOUND") };
  }

  const now = Date.now();
  if (!voucher.active) {
    return { valid: false, error: createError("VOUCHER_EXPIRED") };
  }
  if (voucher.startsAt && now < Date.parse(voucher.startsAt)) {
    return { valid: false, error: createError("VOUCHER_EXPIRED") };
  }
  if (voucher.expiresAt && now > Date.parse(voucher.expiresAt)) {
    return { valid: false, error: createError("VOUCHER_EXPIRED") };
  }
  if (voucher.maxUses !== undefined && voucher.usedCount >= voucher.maxUses) {
    return { valid: false, error: createError("VOUCHER_OUT_OF_USES") };
  }

  // TODO T-0506/T-0801: enforce perUserLimit by querying confirmed purchases.
  const product = findProduct(productCode);
  if (!product) {
    return { valid: false, error: createError("NOT_FOUND") };
  }
  if (product.module === "bundle" || !voucher.modules.includes(product.module)) {
    return { valid: false, error: createError("VOUCHER_NOT_APPLICABLE") };
  }

  const rawDiscount = calculateDiscount(product.priceVnd, voucher);
  if (rawDiscount === null) {
    return { valid: false, error: createError("VOUCHER_NOT_APPLICABLE") };
  }

  let discountVnd = rawDiscount;
  let finalAmount = Math.max(0, product.priceVnd - discountVnd);
  if (finalAmount > 0 && finalAmount < PAYOS_MIN_AMOUNT) {
    finalAmount = PAYOS_MIN_AMOUNT;
    discountVnd = product.priceVnd - PAYOS_MIN_AMOUNT;
  }

  return { valid: true, discountVnd, finalAmount, voucher };
}
