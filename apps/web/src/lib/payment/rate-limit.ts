import { createError } from "@banmenh/shared";
import { NextResponse } from "next/server";

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

export function paymentRateLimitResponse(request: Request): NextResponse | null {
  return rateLimitResponse(`payment:create:${clientIp(request)}`, 10);
}

function rateLimitResponse(key: string, limit: number, windowMs = 60_000): NextResponse | null {
  const now = Date.now();
  const current = buckets.get(key);
  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    cleanupExpired(now);
    return null;
  }

  if (current.count >= limit) {
    const retryAfter = Math.max(1, Math.ceil((current.resetAt - now) / 1000));
    return NextResponse.json(
      { error: createError("RATE_LIMITED") },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  current.count += 1;
  return null;
}

function clientIp(request: Request): string {
  return (
    request.headers.get("CF-Connecting-IP") ??
    request.headers.get("X-Forwarded-For")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

function cleanupExpired(now: number) {
  if (buckets.size < 10_000) return;
  for (const [key, bucket] of buckets.entries()) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}
