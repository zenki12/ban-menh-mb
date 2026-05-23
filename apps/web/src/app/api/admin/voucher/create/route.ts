export const runtime = "nodejs";

import { createError } from "@banmenh/shared";
import { NextResponse } from "next/server";
import { appendAdminLog } from "../../../../../lib/admin/audit-log";
import { firestoreVoucherRepository } from "../../../../../lib/firestore";
import {
  authErrorResponse,
  createVoucherBodySchema,
  parseJson,
  storageErrorResponse,
} from "../_shared";

export async function POST(request: Request) {
  const authError = authErrorResponse(request);
  if (authError) return authError;

  const body = await parseJson(request);
  if (body instanceof NextResponse) return body;

  const parsed = createVoucherBodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: createError("VALIDATION_FAILED") }, { status: 400 });
  }

  try {
    const voucher = await firestoreVoucherRepository.create(
      { ...parsed.data, active: true },
      { userId: "admin" },
    );
    void appendAdminLog("voucher.create", voucher.code, {
      modules: voucher.modules,
      discountType: voucher.discountType,
      maxUses: voucher.maxUses,
    });
    return NextResponse.json({ ok: true, voucher });
  } catch (err) {
    return storageErrorResponse(err);
  }
}
