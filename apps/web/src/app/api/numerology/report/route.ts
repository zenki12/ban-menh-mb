export const runtime = "nodejs";

import { createError } from "@banmenh/shared";
import { NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  fullName: z.string().trim().min(1).max(200),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  nickname: z.string().trim().max(120).optional(),
  gender: z.enum(["male", "female"]).optional(),
});

async function readJson(request: Request): Promise<unknown | null> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const parsed = bodySchema.safeParse(await readJson(request));
  if (!parsed.success) {
    return NextResponse.json({ error: createError("VALIDATION_FAILED") }, { status: 400 });
  }

  const workerUrl = process.env.KB_WORKER_URL ?? "http://localhost:8787";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);
  const [kbFetchResult] = await Promise.allSettled([
    fetch(`${workerUrl.replace(/\/$/, "")}/numerology/report`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...parsed.data, includeSections: true }),
      signal: controller.signal,
    }),
  ]);

  if (kbFetchResult.status === "rejected") {
    clearTimeout(timeout);
    console.error("[numerology/report] KB fetch failed:", kbFetchResult.reason);
    return NextResponse.json({ error: createError("KB_NOT_AVAILABLE") }, { status: 502 });
  }

  try {
    const response = kbFetchResult.value;

    const text = await response.text();
    let payload: unknown = text;
    try {
      payload = JSON.parse(text);
    } catch {
      // Worker should return JSON, but keep status forwarding if it does not.
    }

    const indicatorCount =
      typeof payload === "object" &&
      payload !== null &&
      "report" in payload &&
      typeof (payload as { report?: { meta?: { indicatorCount?: unknown } } }).report?.meta
        ?.indicatorCount === "number"
        ? (payload as { report: { meta: { indicatorCount: number } } }).report.meta.indicatorCount
        : 0;
    console.log(`[numerology/report] access=public status=${response.status} indicators=${indicatorCount}`);

    if (typeof payload === "string") {
      return new NextResponse(payload, { status: response.status });
    }
    if (response.ok && typeof payload === "object" && payload !== null && "report" in payload) {
      const responsePayload = payload as { report?: unknown };
      const report =
        responsePayload.report && typeof responsePayload.report === "object"
          ? { ...(responsePayload.report as Record<string, unknown>) }
          : responsePayload.report;
      return NextResponse.json(
        { ...payload, report, unlocked: true, entitlement: null },
        { status: response.status },
      );
    }
    return NextResponse.json(payload, { status: response.status });
  } catch (err) {
    console.error("[numerology/report] worker call failed:", err);
    const code = err instanceof Error && err.name === "AbortError" ? "TIMEOUT" : "KB_NOT_AVAILABLE";
    return NextResponse.json({ error: createError(code) }, { status: code === "TIMEOUT" ? 504 : 502 });
  } finally {
    clearTimeout(timeout);
  }
}
