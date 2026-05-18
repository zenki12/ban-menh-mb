// Server-only route handler. firebase-admin không chạy trên Edge runtime.
export const runtime = "nodejs";

import { createError } from "@banmenh/shared";
import { NextResponse } from "next/server";
import { adminAuth } from "../../../lib/firebase/admin";
import { firestoreEntitlementRepository } from "../../../lib/firestore";

function getBearerToken(request: Request): string | null {
  const auth = request.headers.get("Authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  return auth.slice(7);
}

export async function GET(request: Request) {
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

  try {
    const items = await firestoreEntitlementRepository.listByUser(uid, {
      userId: uid,
    });
    return NextResponse.json({ items });
  } catch {
    return NextResponse.json(
      { error: createError("INTERNAL_ERROR") },
      { status: 500 },
    );
  }
}
