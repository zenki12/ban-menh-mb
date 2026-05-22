// Server-only route handler. Voucher validation is backend-owned.
export const runtime = "nodejs";

import { createError } from "@banmenh/shared";
import { NextResponse } from "next/server";
import { z } from "zod";
import { adminAuth } from "../../../../lib/firebase/admin";
import { validateVoucher } from "../../../../lib/voucher/service";

const validateBodySchema = z.object({
  code: z.string().min(1).max(64).toUpperCase(),
  productCode: z.string().min(1),
});

function getBearerToken(request: Request): string | null {
  const auth = request.headers.get("Authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  return auth.slice(7);
}

export async function POST(request: Request) {
  const bearer = getBearerToken(request);
  if (!bearer) {
    return NextResponse.json({ error: createError("AUTH_REQUIRED") }, { status: 401 });
  }

  let uid: string;
  try {
    const decoded = await adminAuth.verifyIdToken(bearer);
    uid = decoded.uid;
  } catch {
    return NextResponse.json({ error: createError("AUTH_INVALID_TOKEN") }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: createError("VALIDATION_FAILED") }, { status: 400 });
  }

  const parsed = validateBodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: createError("VALIDATION_FAILED") }, { status: 400 });
  }

  const result = await validateVoucher(parsed.data.code, parsed.data.productCode, uid);
  if (!result.valid) {
    return NextResponse.json({ valid: false, error: result.error });
  }

  return NextResponse.json({
    valid: true,
    discountVnd: result.discountVnd,
    finalAmount: result.finalAmount,
    voucher: {
      code: result.voucher.code,
      discountType: result.voucher.discountType,
    },
  });
}
