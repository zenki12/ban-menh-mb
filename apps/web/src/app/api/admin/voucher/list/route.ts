export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { appendAdminLog } from "../../../../../lib/admin/audit-log";
import { firestoreVoucherRepository } from "../../../../../lib/firestore";
import { authErrorResponse, storageErrorResponse } from "../_shared";

export async function GET(request: Request) {
  const authError = authErrorResponse(request);
  if (authError) return authError;

  const url = new URL(request.url);
  const parsedLimit = Number.parseInt(url.searchParams.get("limit") ?? "50", 10);
  const limit = Number.isFinite(parsedLimit)
    ? Math.min(Math.max(parsedLimit, 1), 100)
    : 50;
  const cursor = url.searchParams.get("cursor") ?? undefined;

  try {
    const result = await firestoreVoucherRepository.listAll(
      { limit, cursor },
      { userId: "admin" },
    );
    void appendAdminLog("voucher.list", "vouchers");
    return NextResponse.json(result);
  } catch (err) {
    return storageErrorResponse(err);
  }
}
