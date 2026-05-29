export const runtime = "nodejs";

import { createError } from "@banmenh/shared";
import { NextResponse } from "next/server";
import { z } from "zod";
import { checkEntitlement } from "../../../../lib/entitlements/service";
import { adminAuth } from "../../../../lib/firebase/admin";

const bodySchema = z.object({
  fullName: z.string().trim().min(1).max(200),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  nickname: z.string().trim().max(120).optional(),
  gender: z.enum(["male", "female"]).optional(),
});

function getBearerToken(request: Request): string | null {
  const auth = request.headers.get("Authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  const credential = auth.slice(7).trim();
  return credential.length > 0 ? credential : null;
}

async function readJson(request: Request): Promise<unknown | null> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const bearer = getBearerToken(request);
  if (!bearer) {
    return NextResponse.json({ error: createError("AUTH_REQUIRED") }, { status: 401 });
  }

  let uid: string;
  try {
    const decoded = await adminAuth.verifyIdToken(bearer);
    uid = decoded.uid;
  } catch {
    return NextResponse.json({ error: createError("AUTH_INVALID_TOKEN") }, { status: 401 });
  }

  const parsed = bodySchema.safeParse(await readJson(request));
  if (!parsed.success) {
    return NextResponse.json({ error: createError("VALIDATION_FAILED") }, { status: 400 });
  }

  const workerUrl = process.env.KB_WORKER_URL ?? "http://localhost:8787";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);
  let unlocked = false;
  let entitlement = null;
  try {
    const result = await checkEntitlement(uid, "numerology_single_report");
    unlocked = result.has;
    entitlement = result.has ? result.entitlement : null;
  } catch (entitlementErr) {
    console.error("[numerology/report] checkEntitlement failed:", entitlementErr);
  }

  try {
    const response = await fetch(`${workerUrl.replace(/\/$/, "")}/numerology/report`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${bearer}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...parsed.data, includeSections: unlocked }),
      signal: controller.signal,
    });

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
    console.log(`[numerology/report] uid=${uid} status=${response.status} indicators=${indicatorCount}`);

    if (typeof payload === "string") {
      return new NextResponse(payload, { status: response.status });
    }
    if (response.ok && typeof payload === "object" && payload !== null && "report" in payload) {
      const responsePayload = payload as { report?: unknown };
      const report =
        responsePayload.report && typeof responsePayload.report === "object"
          ? { ...(responsePayload.report as Record<string, unknown>) }
          : responsePayload.report;
      if (!unlocked && report && typeof report === "object") {
        delete (report as Record<string, unknown>).sections;
      }
      return NextResponse.json({ ...payload, report, unlocked, entitlement }, { status: response.status });
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
