// Server-only route handler. firebase-admin không chạy trên Edge runtime.
export const runtime = "nodejs";

// SECURITY: Backend tự tính amount từ pricing contract.
// KHÔNG tin amount từ frontend (security-threat-model P1.2).

import { createError, findProduct } from "@banmenh/shared";
import { NextResponse } from "next/server";
import { z } from "zod";
import { adminAuth } from "../../../../lib/firebase/admin";
import {
  firestorePurchaseRepository,
  updatePurchaseProviderRef,
} from "../../../../lib/firestore";
import { generateOrderId } from "../../../../lib/payment/order-id";
import { createPaymentRequest } from "../../../../lib/payos/client";
import { validateVoucher } from "../../../../lib/voucher/service";

const createBodySchema = z.object({
  productCode: z.string().min(1),
  voucherCode: z.string().min(1).max(64).toUpperCase().optional(),
});

function getBearerToken(request: Request): string | null {
  const auth = request.headers.get("Authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  return auth.slice(7);
}

export async function POST(request: Request) {
  // 1. Auth
  const bearer = getBearerToken(request);
  if (!bearer) {
    return NextResponse.json(
      { error: createError("AUTH_REQUIRED") },
      { status: 401 },
    );
  }

  let uid: string;
  try {
    const decoded = await adminAuth.verifyIdToken(bearer);
    uid = decoded.uid;
  } catch {
    return NextResponse.json(
      { error: createError("AUTH_INVALID_TOKEN") },
      { status: 401 },
    );
  }

  // 2. Parse + validate body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: createError("VALIDATION_FAILED") },
      { status: 400 },
    );
  }

  const parsed = createBodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: createError("VALIDATION_FAILED") },
      { status: 400 },
    );
  }

  const { productCode, voucherCode } = parsed.data;

  // 3. Lookup product — backend tự tính amount từ pricing contract
  const product = findProduct(productCode);
  if (!product) {
    return NextResponse.json(
      { error: createError("NOT_FOUND") },
      { status: 404 },
    );
  }

  // 4. Tính amount. Voucher chỉ được validate server-side.
  let amount = product.priceVnd;
  let discountVnd: number | undefined;
  if (voucherCode) {
    const voucherResult = await validateVoucher(voucherCode, productCode, uid);
    if (!voucherResult.valid) {
      return NextResponse.json(
        { error: voucherResult.error },
        { status: 400 },
      );
    }
    amount = voucherResult.finalAmount;
    discountVnd = voucherResult.discountVnd;
  }

  // 5. Tạo orderId numeric cho PayOS
  const orderCode = generateOrderId();
  const orderId = String(orderCode);

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

  // 6. Tạo purchase document (status: pending)
  const ctx = { userId: uid };
  try {
    await firestorePurchaseRepository.create(
      {
        orderId,
        userId: uid,
        module: product.module === "bundle" ? "numerology" : product.module,
        productCode,
        amount,
        currency: "VND",
        status: "pending",
        provider: "payos",
        voucherCode: voucherCode ?? undefined,
        discountVnd,
        expiresAt,
      },
      ctx,
    );
  } catch (err) {
    console.error("[payment/create] firestore create failed:", err);
    return NextResponse.json(
      { error: createError("INTERNAL_ERROR") },
      { status: 500 },
    );
  }

  // 7. Gọi PayOS tạo payment link
  let payosData: Awaited<ReturnType<typeof createPaymentRequest>>;
  try {
    payosData = await createPaymentRequest({
      orderCode,
      amount,
      description: voucherCode ? `${product.name} (${voucherCode})` : product.name,
      items: [{ name: product.name, quantity: 1, price: amount }],
      returnUrl: `${appUrl}/payment/success?orderId=${orderId}`,
      cancelUrl: `${appUrl}/payment/cancel?orderId=${orderId}`,
    });
  } catch (err) {
    // Log lỗi không chứa secret/raw response
    console.error(
      `[payment/create] PayOS error for orderId=${orderId}:`,
      err instanceof Error ? err.message : "unknown",
    );
    return NextResponse.json(
      { error: createError("PAYMENT_FAILED") },
      { status: 502 },
    );
  }

  // 8. Update providerRef (paymentLinkId từ PayOS)
  try {
    await updatePurchaseProviderRef(orderId, payosData.paymentLinkId);
  } catch {
    // Non-blocking — không fail request nếu update providerRef lỗi
    console.warn(`[payment/create] updateProviderRef failed for orderId=${orderId}`);
  }

  // Log tối thiểu — KHÔNG log amount, KHÔNG log PayOS raw response
  console.log(`[payment/create] created orderId=${orderId} purchaseId=${orderId}`);

  return NextResponse.json({
    orderId,
    amount,
    qrCode: payosData.qrCode,
    checkoutUrl: payosData.checkoutUrl,
    voucherCode: voucherCode ?? null,
    discountVnd: discountVnd ?? 0,
    expiresAt,
  });
}
