export const runtime = "nodejs";

import {
  createError,
  tarotCardDetailResponseSchema,
  tarotCardDetailSchema,
} from "@banmenh/shared";
import { NextResponse } from "next/server";
import { z } from "zod";
import { adminAuth } from "../../../../../lib/firebase/admin";
import { getLocalTarotCardDetail } from "../../../../../lib/tarot/local-tarot-kb";

type RouteContext = { params: Promise<{ cardId: string }> };

const querySchema = z.object({
  niche: z.string().regex(/^[a-z0-9_]{1,64}$/).default("general"),
  reversed: z.enum(["true", "false"]).default("false"),
});

const workerResponseSchema = z.object({
  ok: z.literal(true),
  card: tarotCardDetailSchema,
  text: z.string().optional(),
});

function bearerToken(request: Request): string | null {
  const authorization = request.headers.get("Authorization");
  if (!authorization?.startsWith("Bearer ")) return null;
  return authorization.slice(7).trim() || null;
}

export async function GET(request: Request, context: RouteContext) {
  const bearer = bearerToken(request);
  if (!bearer) return NextResponse.json({ error: createError("AUTH_REQUIRED") }, { status: 401 });

  try {
    await adminAuth.verifyIdToken(bearer);
  } catch {
    return NextResponse.json({ error: createError("AUTH_INVALID_TOKEN") }, { status: 401 });
  }

  const { cardId: rawCardId } = await context.params;
  const cardId = Number(rawCardId);
  const url = new URL(request.url);
  const query = querySchema.safeParse({
    niche: url.searchParams.get("niche") ?? undefined,
    reversed: url.searchParams.get("reversed") ?? undefined,
  });
  if (!Number.isInteger(cardId) || cardId < 0 || cardId > 77 || !query.success) {
    return NextResponse.json({ error: createError("VALIDATION_FAILED") }, { status: 400 });
  }

  const isReversed = query.data.reversed === "true";
  const nicheKey = query.data.niche;

  // 1. Thử lấy từ Cloudflare KB Worker nếu có bật
  const workerUrl = process.env.NEXT_PUBLIC_KB_WORKER_URL?.trim().replace(/\/$/, "");
  if (workerUrl && !workerUrl.includes("localhost:8787") && !workerUrl.includes("127.0.0.1:8787")) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4_000);
    try {
      const params = new URLSearchParams(query.data);
      const response = await fetch(`${workerUrl}/tarot/card/${cardId}?${params}`, {
        headers: { Authorization: `Bearer ${bearer}` },
        signal: controller.signal,
        cache: "no-store",
      });
      if (response.ok) {
        const parsed = workerResponseSchema.safeParse(await response.json());
        if (parsed.success) {
          return NextResponse.json(tarotCardDetailResponseSchema.parse({ ok: true, card: parsed.data.card }));
        }
      }
    } catch {
      // Bỏ qua để fallback xuống local
    } finally {
      clearTimeout(timeout);
    }
  }

  // 2. Tự động đọc trực tiếp từ kho cards.json chuẩn Mystery Tarot
  const localCard = getLocalTarotCardDetail(cardId, nicheKey, isReversed);
  if (localCard) {
    return NextResponse.json(tarotCardDetailResponseSchema.parse({ ok: true, card: localCard }));
  }

  return NextResponse.json({ error: createError("NOT_FOUND") }, { status: 404 });
}
