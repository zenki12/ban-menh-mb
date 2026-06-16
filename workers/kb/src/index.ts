// Ban Menh - KB Worker. Generates reports from private KV data.

import { buildSynthesizedReport, generateReport, type NarrativeKb } from "@banmenh/shared";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { verifyFirebaseToken } from "./lib/auth";
import { loadKb, loadNarrative } from "./lib/kb-loader";
import { checkRateLimit, getClientIp } from "./lib/rate-limit";

type Env = {
  BANMENH_KB_DEV: KVNamespace;
  FIREBASE_PROJECT_ID: string;
  FIREBASE_CLIENT_EMAIL: string;
  FIREBASE_PRIVATE_KEY: string;
  CORS_ALLOWED_ORIGINS?: string;
};

type ReportBody = {
  fullName: string;
  dob: string;
  includeSections?: boolean;
};

const app = new Hono<{ Bindings: Env }>();
app.use("*", logger());

const DEFAULT_ALLOWED_ORIGINS = new Set([
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://dev.banmenh.online",
  "https://banmenh.online",
]);

function getAllowedOrigins(env: Env): Set<string> {
  const origins = new Set(DEFAULT_ALLOWED_ORIGINS);
  for (const origin of env.CORS_ALLOWED_ORIGINS?.split(",") ?? []) {
    const trimmed = origin.trim();
    if (trimmed) origins.add(trimmed);
  }
  return origins;
}

app.use("*", async (c, next) => {
  const origin = c.req.header("Origin");
  const allowedOrigin = origin && getAllowedOrigins(c.env).has(origin) ? origin : null;
  const corsHeaders = {
    Vary: "Origin",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Authorization,Content-Type",
  };

  if (c.req.method === "OPTIONS") {
    if (!allowedOrigin) return c.body(null, 403);
    return new Response(null, {
      status: 204,
      headers: {
        ...corsHeaders,
        "Access-Control-Allow-Origin": allowedOrigin,
      },
    });
  }

  await next();

  c.header("Vary", "Origin");
  if (allowedOrigin) c.header("Access-Control-Allow-Origin", allowedOrigin);
});

function error(code: string, message: string, status: 400 | 401 | 500) {
  return { body: { error: { code, message } }, status };
}

function getBearerToken(header: string | undefined): string | null {
  if (!header?.startsWith("Bearer ")) return null;
  const token = header.slice("Bearer ".length).trim();
  return token.length > 0 ? token : null;
}

function validateBody(body: unknown): ReportBody | null {
  if (!body || typeof body !== "object") return null;
  const record = body as Record<string, unknown>;
  const fullName = typeof record.fullName === "string" ? record.fullName.trim() : "";
  const dob = typeof record.dob === "string" ? record.dob.trim() : "";
  if (!fullName || fullName.length > 200) return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) return null;
  return { fullName, dob, includeSections: record.includeSections === true };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function mergeNarrative(html: string, vars: Record<string, string | number>): string {
  let out = html;
  for (const [k, v] of Object.entries(vars)) {
    out = out.replaceAll(`{{${k}}}`, escapeHtml(String(v)));
  }
  return out;
}

function getNarrative(
  narrative: NarrativeKb,
  group: keyof NarrativeKb,
  number: number,
  vars: Record<string, string | number>,
): string | null {
  const entry = narrative[group]?.[String(number)];
  return entry ? mergeNarrative(entry.html, vars) : null;
}

function attachNarrative<T extends { number: number }>(
  item: T,
  narrative: NarrativeKb,
  group: keyof NarrativeKb,
  vars: Record<string, string | number>,
  lookupNumber = item.number,
): T & { narrative: string | null } {
  return { ...item, narrative: getNarrative(narrative, group, lookupNumber, vars) };
}

app.get("/", (c) => c.text("Bản Mệnh - KB Worker"));

app.get("/health", (c) =>
  c.json({ ok: true, service: "kb-worker", timestamp: new Date().toISOString() }),
);

app.post("/numerology/report", async (c) => {
  const rateLimit = checkRateLimit(`numerology:report:${getClientIp(c.req.raw.headers)}`, 60);
  if (!rateLimit.allowed) {
    return c.json(
      { error: { code: "RATE_LIMITED", message: "Bạn đang thao tác quá nhanh, vui lòng đợi một chút." } },
      429,
      { "Retry-After": String(rateLimit.retryAfterSeconds) },
    );
  }

  const token = getBearerToken(c.req.header("Authorization"));
  if (!token) {
    const res = error("AUTH_REQUIRED", "Thiếu Bearer token.", 401);
    return c.json(res.body, res.status);
  }

  try {
    await verifyFirebaseToken(token, c.env.FIREBASE_PROJECT_ID);
  } catch {
    const res = error("AUTH_INVALID_TOKEN", "Token không hợp lệ.", 401);
    return c.json(res.body, res.status);
  }

  let json: unknown;
  try {
    json = await c.req.json();
  } catch {
    const res = error("VALIDATION_INVALID_INPUT", "Body JSON không hợp lệ.", 400);
    return c.json(res.body, res.status);
  }

  const body = validateBody(json);
  if (!body) {
    const res = error("VALIDATION_INVALID_INPUT", "fullName hoặc dob không hợp lệ.", 400);
    return c.json(res.body, res.status);
  }

  try {
    const [kb, narrative] = await Promise.all([
      loadKb(c.env.BANMENH_KB_DEV),
      loadNarrative(c.env.BANMENH_KB_DEV),
    ]);
    const report = await generateReport(body, kb);
    const synthesized = body.includeSections ? buildSynthesizedReport({ report, narrative, kb }) : undefined;
    const nameVars = { name: body.fullName };
    const personalYearVars = {
      ...nameVars,
      year: report.personalYear.year,
      age: report.personalYear.year - report.input.dobParts.year,
    };

    return c.json({
      ok: true,
      report: {
        ...report,
        lifePath: attachNarrative(
          report.lifePath,
          narrative,
          "lifePath",
          nameVars,
          report.lifePath.displayNumber ?? report.lifePath.number,
        ),
        soul: attachNarrative(report.soul, narrative, "soul", nameVars),
        destiny: attachNarrative(report.destiny, narrative, "destiny", nameVars),
        personality: attachNarrative(report.personality, narrative, "personality", nameVars),
        maturity: attachNarrative(report.maturity, narrative, "maturity", nameVars),
        tensionNumber: attachNarrative(report.tensionNumber, narrative, "tensionNumber", nameVars),
        attitude: attachNarrative(report.attitude, narrative, "attitude", nameVars),
        birthday: attachNarrative(report.birthday, narrative, "birthday", nameVars),
        soulChallenge: attachNarrative(report.soulChallenge, narrative, "soulChallenge", nameVars),
        destinyChallenge: attachNarrative(report.destinyChallenge, narrative, "destinyChallenge", nameVars),
        personalityChallenge: attachNarrative(
          report.personalityChallenge,
          narrative,
          "personalityChallenge",
          nameVars,
        ),
        cognitiveAbility: attachNarrative(report.cognitiveAbility, narrative, "cognitiveAbility", nameVars),
        approachMotivation: attachNarrative(
          report.approachMotivation,
          narrative,
          "approachMotivation",
          nameVars,
        ),
        approachAbility: attachNarrative(report.approachAbility, narrative, "approachAbility", nameVars),
        approachAttitude: attachNarrative(report.approachAttitude, narrative, "approachAttitude", nameVars),
        personalYear: attachNarrative(report.personalYear, narrative, "personalYearDomains", personalYearVars),
        pyramidPeaks: report.pyramidPeaks.map((item, index) =>
          attachNarrative(item, narrative, "pyramidPeak", {
            ...nameVars,
            period: item.period,
            peakIndex: index + 1,
          }),
        ),
        pyramidChallenges: report.pyramidChallenges.map((item) =>
          attachNarrative(item, narrative, "pyramidChallenge", { ...nameVars, period: item.period }),
        ),
        ...(synthesized ? { profileHeader: synthesized.profileHeader, phases: synthesized.phases } : {}),
      },
      ...(synthesized ? { profileHeader: synthesized.profileHeader, phases: synthesized.phases } : {}),
    });
  } catch (err) {
    console.error("[kb-worker] report generation failed:", err);
    const res = error("SERVER_ERROR", "Không thể tạo báo cáo.", 500);
    return c.json(res.body, res.status);
  }
});

export default app;
