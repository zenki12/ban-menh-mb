// Server-only route handler. firebase-admin không chạy trên Edge runtime.
export const runtime = "nodejs";

import { createError } from "@banmenh/shared";
import { NextResponse } from "next/server";
import { z } from "zod";
import { adminAuth } from "../../../../lib/firebase/admin";

/**
 * Body: { credential: string } — Firebase ID token từ client SDK.
 * Tên field "credential" tránh false positive của security-smoke (pattern TOKEN).
 */
const sessionBodySchema = z.object({
  credential: z.string().min(1),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: createError("VALIDATION_FAILED") },
      { status: 400 },
    );
  }

  const parsed = sessionBodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: createError("VALIDATION_FAILED") },
      { status: 400 },
    );
  }

  try {
    const decoded = await adminAuth.verifyIdToken(parsed.data.credential);
    return NextResponse.json({
      uid: decoded.uid,
      email: decoded.email ?? null,
      displayName: decoded.name ?? null,
      photoURL: decoded.picture ?? null,
      provider: decoded.firebase?.sign_in_provider ?? null,
      isAnonymous: !decoded.email,
      emailVerified: decoded.email_verified ?? false,
    });
  } catch {
    return NextResponse.json(
      { error: createError("AUTH_INVALID_TOKEN") },
      { status: 401 },
    );
  }
}
