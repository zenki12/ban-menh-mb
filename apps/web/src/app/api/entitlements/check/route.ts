// Server-only route handler. firebase-admin không chạy trên Edge runtime.
export const runtime = "nodejs";

import { createError } from "@banmenh/shared";
import { NextResponse } from "next/server";
import { z } from "zod";
import { adminAuth } from "../../../../lib/firebase/admin";
import { checkEntitlement } from "../../../../lib/entitlements/service";

const checkBodySchema = z.object({
  productCode: z.string().min(1),
  reportId: z.string().min(1).optional(),
});

function getBearerToken(request: Request): string | null {
  const auth = request.headers.get("Authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  return auth.slice(7);
}

export async function POST(request: Request) {
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

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: createError("VALIDATION_FAILED") },
      { status: 400 },
    );
  }

  const parsed = checkBodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: createError("VALIDATION_FAILED") },
      { status: 400 },
    );
  }

  try {
    const result = await checkEntitlement(
      uid,
      parsed.data.productCode,
      parsed.data.reportId,
    );
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: createError("INTERNAL_ERROR") },
      { status: 500 },
    );
  }
}
