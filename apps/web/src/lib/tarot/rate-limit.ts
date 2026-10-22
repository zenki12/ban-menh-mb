import { createError } from "@banmenh/shared";
import { NextResponse } from "next/server";

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();
const WINDOW_MS = 10 * 60_000;
const USER_LIMIT = 5;
const IP_LIMIT = 20;

function clientIp(request: Request): string {
  return request.headers.get("cf-connecting-ip")
    ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? "unknown";
}

function consume(key: string, limit: number, now: number): number | null {
  const current = buckets.get(key);
  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return null;
  }
  if (current.count >= limit) return current.resetAt;
  current.count += 1;
  return null;
}

function cleanupExpired(now: number) {
  if (buckets.size < 500) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export function tarotRateLimitResponse(request: Request, uid?: string | null): NextResponse | null {
  const now = Date.now();
  const userReset = uid && uid !== "guest" ? consume(`tarot-ai:user:${uid}`, USER_LIMIT, now) : null;
  const ipReset = consume(`tarot-ai:ip:${clientIp(request)}`, IP_LIMIT, now);
  cleanupExpired(now);

  const resetAt = userReset ?? ipReset;
  if (!resetAt) return null;

  const retryAfter = Math.max(1, Math.ceil((resetAt - now) / 1_000));
  return NextResponse.json(
    { error: createError("RATE_LIMITED") },
    { status: 429, headers: { "Retry-After": String(retryAfter) } },
  );
}

export function tarotLibraryRateLimitResponse(request: Request, uid?: string | null): NextResponse | null {
  const now = Date.now();
  const userReset = uid && uid !== "guest" ? consume(`tarot-library:user:${uid}`, 120, now) : null;
  const ipReset = consume(`tarot-library:ip:${clientIp(request)}`, 240, now);
  cleanupExpired(now);
  const resetAt = userReset ?? ipReset;
  if (!resetAt) return null;
  const retryAfter = Math.max(1, Math.ceil((resetAt - now) / 1_000));
  return NextResponse.json(
    { error: createError("RATE_LIMITED") },
    { status: 429, headers: { "Retry-After": String(retryAfter) } },
  );
}
