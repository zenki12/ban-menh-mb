export const runtime = "nodejs";

import {
  createError,
  tarotComboLibraryQuerySchema,
  tarotComboLibraryResponseSchema,
} from "@banmenh/shared";
import { NextResponse } from "next/server";
import { adminAuth } from "../../../../lib/firebase/admin";
import { getLocalTarotComboLibrary } from "../../../../lib/tarot/local-tarot-kb";
import { tarotLibraryRateLimitResponse } from "../../../../lib/tarot/rate-limit";

function bearerToken(request: Request): string | null {
  const authorization = request.headers.get("Authorization");
  if (!authorization?.startsWith("Bearer ")) return null;
  return authorization.slice(7).trim() || null;
}

export async function GET(request: Request) {
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

  const url = new URL(request.url);
  const query = tarotComboLibraryQuerySchema.safeParse({
    page: url.searchParams.get("page") ?? undefined,
    pageSize: url.searchParams.get("pageSize") ?? undefined,
    size: url.searchParams.get("size") ?? undefined,
    q: url.searchParams.get("q") ?? undefined,
  });
  if (!query.success) return NextResponse.json({ error: createError("VALIDATION_FAILED") }, { status: 400 });

  const workerUrl = process.env.NEXT_PUBLIC_KB_WORKER_URL?.trim().replace(/\/$/, "");
  if (workerUrl && !workerUrl.includes("localhost:8787") && !workerUrl.includes("127.0.0.1:8787")) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5_000);
    try {
      const params = new URLSearchParams({
        page: String(query.data.page),
        pageSize: String(query.data.pageSize),
        size: query.data.size,
        q: query.data.q,
      });
      const response = await fetch(`${workerUrl}/tarot/combos?${params}`, {
        headers: { Authorization: `Bearer ${bearer}` },
        signal: controller.signal,
        cache: "no-store",
      });
      if (response.ok) {
        const parsed = tarotComboLibraryResponseSchema.safeParse(await response.json());
        if (parsed.success) return NextResponse.json(parsed.data);
      }
    } catch {
      // Fallback server-side; không log raw query.
    } finally {
      clearTimeout(timeout);
    }
  }

  const local = getLocalTarotComboLibrary(query.data);
  if (local) return NextResponse.json(tarotComboLibraryResponseSchema.parse(local));
  return NextResponse.json({ error: createError("KB_NOT_AVAILABLE") }, { status: 503 });
}
