export const runtime = "nodejs";

import {
  createError,
  tarotComboClientRequestSchema,
  tarotComboLookupRequestSchema,
  tarotComboLookupResponseSchema,
} from "@banmenh/shared";
import { NextResponse } from "next/server";
import { adminAuth } from "../../../../lib/firebase/admin";
import { getLocalTarotMatchedCombos } from "../../../../lib/tarot/local-tarot-kb";
import { tarotRateLimitResponse } from "../../../../lib/tarot/rate-limit";

function bearerToken(request: Request): string | null {
  const authorization = request.headers.get("Authorization");
  if (!authorization?.startsWith("Bearer ")) return null;
  return authorization.slice(7).trim() || null;
}

function isComboTestModeAllowed(request: Request, requested: boolean): boolean {
  if (!requested) return false;
  if (process.env.NODE_ENV !== "production") return true;
  const hostname = new URL(request.url).hostname.toLowerCase();
  const isPublicProduction = hostname === "banmenh.online" || hostname === "www.banmenh.online";
  return process.env.TAROT_COMBO_TEST_MODE === "true" && !isPublicProduction;
}

export async function POST(request: Request) {
  const bearer = bearerToken(request);
  if (!bearer) return NextResponse.json({ error: createError("AUTH_REQUIRED") }, { status: 401 });

  let uid: string;
  try {
    uid = (await adminAuth.verifyIdToken(bearer)).uid;
  } catch {
    return NextResponse.json({ error: createError("AUTH_INVALID_TOKEN") }, { status: 401 });
  }

  const rateLimitError = tarotRateLimitResponse(request, uid);
  if (rateLimitError) return rateLimitError;

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: createError("VALIDATION_FAILED") }, { status: 400 });
  }
  const input = tarotComboClientRequestSchema.safeParse(json);
  if (!input.success) {
    return NextResponse.json({ error: createError("VALIDATION_FAILED") }, { status: 400 });
  }

  const testMode = isComboTestModeAllowed(request, input.data.testModeRequested);
  const workerInput = tarotComboLookupRequestSchema.parse({
    nicheKey: input.data.nicheKey,
    cards: input.data.cards,
    testMode,
  });
  const workerUrl = process.env.NEXT_PUBLIC_KB_WORKER_URL?.trim().replace(/\/$/, "");

  if (workerUrl && !workerUrl.includes("localhost:8787") && !workerUrl.includes("127.0.0.1:8787")) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5_000);
    try {
      const response = await fetch(`${workerUrl}/tarot/combo`, {
        method: "POST",
        headers: { Authorization: `Bearer ${bearer}`, "Content-Type": "application/json" },
        body: JSON.stringify(workerInput),
        signal: controller.signal,
        cache: "no-store",
      });
      if (response.ok) {
        const parsed = tarotComboLookupResponseSchema.safeParse(await response.json());
        if (parsed.success) return NextResponse.json(parsed.data);
      }
    } catch {
      // Tiếp tục với fallback server-side; không log dữ liệu phiên Tarot.
    } finally {
      clearTimeout(timeout);
    }
  }

  const local = getLocalTarotMatchedCombos(workerInput.cards, workerInput.nicheKey, testMode);
  if (local) return NextResponse.json(tarotComboLookupResponseSchema.parse(local));

  // Combo là nội dung bổ trợ: thiếu KB không được làm sập màn kết quả.
  return NextResponse.json({ ok: true, combos: [], testMode: false });
}
