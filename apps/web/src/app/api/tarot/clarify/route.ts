export const runtime = "nodejs";

import {
  createError,
  tarotClarifyNicheSchema,
  tarotClarifyResponseSchema,
} from "@banmenh/shared";
import { NextResponse } from "next/server";
import { adminAuth } from "../../../../lib/firebase/admin";
import { getLocalTarotClarifyQuestions } from "../../../../lib/tarot/local-tarot-kb";

function bearerToken(request: Request): string | null {
  const authorization = request.headers.get("Authorization");
  if (!authorization?.startsWith("Bearer ")) return null;
  return authorization.slice(7).trim() || null;
}

export async function GET(request: Request) {
  const bearer = bearerToken(request);
  if (!bearer) return NextResponse.json({ error: createError("AUTH_REQUIRED") }, { status: 401 });

  try {
    await adminAuth.verifyIdToken(bearer);
  } catch {
    return NextResponse.json({ error: createError("AUTH_INVALID_TOKEN") }, { status: 401 });
  }

  const niche = tarotClarifyNicheSchema.safeParse(new URL(request.url).searchParams.get("niche") ?? "general");
  if (!niche.success) {
    return NextResponse.json({ error: createError("VALIDATION_FAILED") }, { status: 400 });
  }

  // 1. Thử lấy từ Cloudflare KB Worker nếu có bật
  const workerUrl = process.env.NEXT_PUBLIC_KB_WORKER_URL?.trim().replace(/\/$/, "");
  if (workerUrl && !workerUrl.includes("localhost:8787") && !workerUrl.includes("127.0.0.1:8787")) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4_000);
    try {
      const response = await fetch(`${workerUrl}/tarot/clarify?niche=${encodeURIComponent(niche.data)}`, {
        headers: { Authorization: `Bearer ${bearer}` },
        signal: controller.signal,
        cache: "no-store",
      });
      if (response.ok) {
        const parsed = tarotClarifyResponseSchema.safeParse(await response.json());
        if (parsed.success && parsed.data.nicheKey === niche.data) {
          return NextResponse.json(parsed.data);
        }
      }
    } catch {
      // Bỏ qua để fallback xuống local KB bên dưới
    } finally {
      clearTimeout(timeout);
    }
  }

  // 2. Tự động đọc từ kho 80 ngách cục bộ (1.659 câu hỏi) chuẩn Mystery Tarot
  const localQuestions = getLocalTarotClarifyQuestions(niche.data);
  if (localQuestions && localQuestions.length === 3) {
    return NextResponse.json({
      nicheKey: niche.data,
      questions: localQuestions,
    });
  }

  return NextResponse.json({ error: createError("KB_NOT_AVAILABLE") }, { status: 503 });
}
