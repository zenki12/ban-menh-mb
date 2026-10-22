export const runtime = "nodejs";

import {
  createError,
  tarotComboLibraryDetailResponseSchema,
} from "@banmenh/shared";
import { NextResponse } from "next/server";
import { adminAuth } from "../../../../../lib/firebase/admin";
import { getLocalTarotComboLibraryDetail } from "../../../../../lib/tarot/local-tarot-kb";
import { tarotLibraryRateLimitResponse } from "../../../../../lib/tarot/rate-limit";

type RouteContext = { params: Promise<{ comboId: string }> };

function bearerToken(request: Request): string | null {
  const authorization = request.headers.get("Authorization");
  if (!authorization?.startsWith("Bearer ")) return null;
  return authorization.slice(7).trim() || null;
}

export async function GET(request: Request, context: RouteContext) {
  const bearer = bearerToken(request);
  if (!bearer) return NextResponse.json({ error: createError("AUTH_REQUIRED") }, { status: 401 });
  let uid: string;
  try {
    uid = (await adminAuth.verifyIdToken(bearer)).uid;
  } catch {
    return NextResponse.json({ error: createError("AUTH_INVALID_TOKEN") }, { status: 401 });
  }
  const rateLimitError = tarotLibraryRateLimitResponse(request, uid);
  if (rateLimitError) return rateLimitError;

  const comboId = (await context.params).comboId.trim().toLowerCase();
  if (!/^[a-z0-9_ ]{1,100}$/.test(comboId)) {
    return NextResponse.json({ error: createError("VALIDATION_FAILED") }, { status: 400 });
  }

  const workerUrl = process.env.NEXT_PUBLIC_KB_WORKER_URL?.trim().replace(/\/$/, "");
  if (workerUrl && !workerUrl.includes("localhost:8787") && !workerUrl.includes("127.0.0.1:8787")) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5_000);
    try {
      const response = await fetch(`${workerUrl}/tarot/combos/${encodeURIComponent(comboId)}`, {
        headers: { Authorization: `Bearer ${bearer}` },
        signal: controller.signal,
        cache: "no-store",
      });
      if (response.ok) {
        const parsed = tarotComboLibraryDetailResponseSchema.safeParse(await response.json());
        if (parsed.success) return NextResponse.json(parsed.data);
      }
    } catch {
      // Fallback server-side; không log combo ID từ request.
    } finally {
      clearTimeout(timeout);
    }
  }

  const local = getLocalTarotComboLibraryDetail(comboId);
  if (local) return NextResponse.json(tarotComboLibraryDetailResponseSchema.parse(local));
  return NextResponse.json({ error: createError("NOT_FOUND") }, { status: 404 });
}
