export const runtime = "nodejs";

import { createError } from "@banmenh/shared";
import { NextResponse } from "next/server";
import { appendAdminLog } from "../../../../../../lib/admin/audit-log";
import { firestoreVoucherRepository } from "../../../../../../lib/firestore";
import {
  authErrorResponse,
  normalizeCodeParam,
  parseJson,
  storageErrorResponse,
  updateVoucherBodySchema,
} from "../../_shared";

type RouteContext = { params: Promise<{ code: string }> };

export async function POST(request: Request, context: RouteContext) {
  const authError = authErrorResponse(request);
  if (authError) return authError;

  const body = await parseJson(request);
  if (body instanceof NextResponse) return body;

  const parsed = updateVoucherBodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: createError("VALIDATION_FAILED") }, { status: 400 });
  }

  const { code } = await context.params;
  const normalized = normalizeCodeParam(code);
  try {
    const voucher = await firestoreVoucherRepository.update(
      normalized,
      parsed.data,
      { userId: "admin" },
    );
    void appendAdminLog("voucher.update", normalized, { fields: Object.keys(parsed.data) });
    return NextResponse.json({ ok: true, voucher });
  } catch (err) {
    return storageErrorResponse(err);
  }
}
