// Bản Mệnh V2 — Payment Worker (Cloudflare Workers + Hono)
// T-0503a: scaffold + /health endpoint.
// T-0503b: PayOS webhook verify, Firestore REST, entitlement grant.

import { Hono } from "hono";
import { logger } from "hono/logger";

type Env = {
  // Bindings sẽ thêm ở T-0503b:
  // PAYOS_CHECKSUM_KEY: string;
  // FIREBASE_PROJECT_ID: string;
  // FIREBASE_CLIENT_EMAIL: string;
  // FIREBASE_PRIVATE_KEY: string;
};

const app = new Hono<{ Bindings: Env }>();

app.use("*", logger());

app.get("/", (c) => c.text("Bản Mệnh V2 — Payment Worker"));

app.get("/health", (c) =>
  c.json({
    ok: true,
    service: "payment-worker",
    timestamp: new Date().toISOString(),
  }),
);

app.post("/webhook/payos", async (c) => {
  // TODO T-0503b: verify PayOS signature, update purchase status,
  // grant entitlement idempotent qua Firestore REST API.
  return c.json({ ok: false, error: "Not implemented yet (T-0503b)" }, 501);
});

export default app;
