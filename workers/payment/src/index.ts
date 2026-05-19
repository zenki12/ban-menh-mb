// Bản Mệnh V2 — Payment Worker (Cloudflare Workers + Hono)
// T-0503a: scaffold + /health. T-0503b: webhook logic.

import { Hono } from "hono";
import { logger } from "hono/logger";
import { PRODUCT_ENTITLEMENT_MAP } from "./lib/entitlement-map";
import {
  firestoreCreate,
  firestoreGet,
  firestorePatch,
  getAccessToken,
} from "./lib/firestore";
import { verifyPayosWebhook } from "./lib/payos-signature";

type Env = {
  PAYOS_CHECKSUM_KEY: string;
  FIREBASE_PROJECT_ID: string;
  FIREBASE_CLIENT_EMAIL: string;
  FIREBASE_PRIVATE_KEY: string;
};

// Zod không available ở Workers — validate thủ công
function isWebhookBody(
  body: unknown,
): body is { code: string; desc: string; data: Record<string, unknown>; signature: string } {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.code === "string" &&
    typeof b.signature === "string" &&
    typeof b.data === "object" &&
    b.data !== null
  );
}

const app = new Hono<{ Bindings: Env }>();

app.use("*", logger());

app.get("/", (c) => c.text("Bản Mệnh V2 — Payment Worker"));

app.get("/health", (c) =>
  c.json({ ok: true, service: "payment-worker", timestamp: new Date().toISOString() }),
);

app.post("/webhook/payos", async (c) => {
  const env = c.env;
  const now = new Date().toISOString();

  // 1. Parse body
  let body: unknown;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ ok: false, error: "Invalid JSON" }, 400);
  }

  if (!isWebhookBody(body)) {
    return c.json({ ok: false, error: "Missing required fields" }, 400);
  }

  const { data, signature } = body;

  // 2. Verify PayOS signature
  if (!env.PAYOS_CHECKSUM_KEY) {
    console.error("[webhook] PAYOS_CHECKSUM_KEY not configured");
    return c.json({ ok: false, error: "Server misconfigured" }, 500);
  }
  const valid = await verifyPayosWebhook(data, signature, env.PAYOS_CHECKSUM_KEY);
  if (!valid) {
    console.warn("[webhook] signature mismatch");
    return c.json({ ok: false, error: "Invalid signature" }, 401);
  }

  const orderId = String(data.orderCode);
  const sa = {
    projectId: env.FIREBASE_PROJECT_ID,
    clientEmail: env.FIREBASE_CLIENT_EMAIL,
    privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  };

  // 3. Get access token
  let accessToken: string;
  try {
    accessToken = await getAccessToken(sa);
  } catch (err) {
    console.error("[webhook] getAccessToken failed:", err);
    return c.json({ ok: false, error: "Auth error" }, 500);
  }

  // 4. Lookup purchase
  const purchase = await firestoreGet(sa.projectId, accessToken, "purchases", orderId);
  if (!purchase) {
    console.error(`[webhook] purchase not found: orderId=${orderId}`);
    return c.json({ ok: false, error: "Purchase not found" }, 404);
  }

  // 5. Idempotency
  if (purchase.status === "confirmed") {
    return c.json({ ok: true, idempotent: true, orderId });
  }

  // 6. Amount check — KHÔNG tin amount từ webhook nếu không khớp
  const webhookAmount = Number(data.amount);
  const purchaseAmount = Number(purchase.amount);
  if (webhookAmount !== purchaseAmount) {
    console.error(
      `[webhook] amount mismatch orderId=${orderId} expected=${purchaseAmount} got=${webhookAmount}`,
    );
    return c.json({ ok: false, error: "Amount mismatch" }, 400);
  }

  // 7. Update purchase → confirmed
  try {
    await firestorePatch(
      sa.projectId,
      accessToken,
      "purchases",
      orderId,
      {
        status: "confirmed",
        confirmedAt: now,
        providerRef: String(data.transactionId ?? data.reference ?? ""),
      },
      ["status", "confirmedAt", "providerRef"],
    );
  } catch (err) {
    console.error("[webhook] firestorePatch purchase failed:", err);
    return c.json({ ok: false, error: "DB error" }, 500);
  }

  // 8. Grant entitlement(s)
  const specs = PRODUCT_ENTITLEMENT_MAP[String(purchase.productCode ?? "")];
  if (specs && specs.length > 0) {
    const userId = String(purchase.userId ?? "");
    for (const spec of specs) {
      const entitlementId = `${userId}_${orderId}${spec.idSuffix ?? ""}`;
      const expiresAt = spec.expiresInDays
        ? new Date(Date.now() + spec.expiresInDays * 86400000).toISOString()
        : undefined;
      try {
        await firestoreCreate(sa.projectId, accessToken, "entitlements", entitlementId, {
          userId,
          module: spec.module,
          type: spec.type,
          purchaseId: orderId,
          status: "active",
          startsAt: now,
          expiresAt,
          lifetime: !spec.expiresInDays,
        });
      } catch (err) {
        console.error(`[webhook] firestoreCreate entitlement ${entitlementId} failed:`, err);
      }
    }
  }

  // 9. Append payment log
  try {
    const logId = `${orderId}_${Date.now()}`;
    await firestoreCreate(sa.projectId, accessToken, "payment_logs", logId, {
      orderId,
      level: "info",
      event: "webhook_success",
      message: "Confirmed by PayOS webhook",
      createdAt: now,
    });
  } catch (err) {
    console.warn("[webhook] payment_log append failed:", err);
  }

  // TODO T-0504: Telegram alert khi payment confirmed

  return c.json({ ok: true, orderId, status: "confirmed" });
});

export default app;
