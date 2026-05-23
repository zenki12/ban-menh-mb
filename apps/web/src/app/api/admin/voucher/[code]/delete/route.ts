export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { appendAdminLog } from "../../../../../../lib/admin/audit-log";
import { firestoreVoucherRepository } from "../../../../../../lib/firestore";
import { authErrorResponse, normalizeCodeParam, storageErrorResponse } from "../../_shared";

type RouteContext = { params: Promise<{ code: string }> };

export async function POST(request: Request, context: RouteContext) {
  const authError = authErrorResponse(request);
  if (authError) return authError;

  const { code } = await context.params;
  const normalized = normalizeCodeParam(code);
  try {
    const voucher = await firestoreVoucherRepository.setActive(
      normalized,
      false,
      { userId: "admin" },
    );
    void appendAdminLog("voucher.delete", normalized, { note: "soft delete" });
    return NextResponse.json({ ok: true, voucher });
  } catch (err) {
    return storageErrorResponse(err);
  }
}
