// Ban Menh V2 - KB Worker. Generates reports from private KV data.

import { generateReport } from "@banmenh/shared";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { verifyFirebaseToken } from "./lib/auth";
import { loadKb, loadNarrative } from "./lib/kb-loader";

type Env = {
  BANMENH_KB_DEV: KVNamespace;
  FIREBASE_PROJECT_ID: string;
  FIREBASE_CLIENT_EMAIL: string;
  FIREBASE_PRIVATE_KEY: string;
};

type ReportBody = {
  fullName: string;
  dob: string;
};

const app = new Hono<{ Bindings: Env }>();
app.use("*", logger());

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
  return { fullName, dob };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

app.get("/", (c) => c.text("Bản Mệnh V2 — KB Worker"));

app.get("/health", (c) =>
  c.json({ ok: true, service: "kb-worker", timestamp: new Date().toISOString() }),
);

app.post("/numerology/report", async (c) => {
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
    const escapedName = escapeHtml(body.fullName);
    const lifePathNarrative = narrative.lifePath[String(report.lifePath.number)]?.html.replaceAll(
      "{{name}}",
      escapedName,
    );
    const destinyNarrative = narrative.destiny[String(report.destiny.number)]?.html.replaceAll(
      "{{name}}",
      escapedName,
    );

    return c.json({
      ok: true,
      report: {
        ...report,
        lifePath: { ...report.lifePath, narrative: lifePathNarrative ?? null },
        destiny: { ...report.destiny, narrative: destinyNarrative ?? null },
      },
    });
  } catch (err) {
    console.error("[kb-worker] report generation failed:", err);
    const res = error("SERVER_ERROR", "Không thể tạo báo cáo.", 500);
    return c.json(res.body, res.status);
  }
});

export default app;
