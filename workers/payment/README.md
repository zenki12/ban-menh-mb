# Payment Worker — Bản Mệnh

Cloudflare Worker xử lý webhook PayOS và payment boundary.

## Status

- **T-0503a** (scaffold): ✅ Done — Hono setup, /health endpoint.
- **T-0503b** (webhook logic): ✅ Done — PayOS signature verify, Firestore REST, entitlement grant.
- **T-0504** (Telegram alert): 🔲 Todo.

## Endpoints

| Method | Path | Status |
|--------|------|--------|
| GET | `/` | ✅ "Bản Mệnh — Payment Worker" |
| GET | `/health` | ✅ `{ ok: true, service, timestamp }` |
| POST | `/webhook/payos` | ✅ Verify signature + update Firestore |

## Run dev

```bash
cd workers/payment
npm install
npm run dev
# → http://localhost:8787
```

## Setup secrets

Copy giá trị từ `apps/web/.env.local` vào `workers/payment/.dev.vars`:

```
PAYOS_CHECKSUM_KEY=<từ .env.local>
FIREBASE_PROJECT_ID=<từ .env.local>
FIREBASE_CLIENT_EMAIL=<từ .env.local>
FIREBASE_PRIVATE_KEY="<từ .env.local — giữ nguyên dấu ngoặc kép>"
```

File `.dev.vars` đã gitignored — không commit.

## Expose webhook qua ngrok (để test với PayOS)

```bash
# Terminal 1
cd workers/payment
npm run dev

# Terminal 2
ngrok http 8787
# Copy URL dạng https://xxxx.ngrok-free.app
# Paste vào PayOS dashboard → Webhook URL
```

**Lưu ý:** ngrok free URL đổi mỗi lần restart, phải re-config PayOS dashboard.

## Security

- Không commit `.dev.vars` (gitignored).
- Secrets thật set qua `wrangler secret put` khi deploy.
- Không import firebase-admin (không chạy ở Workers runtime).
- Không trust amount/orderId từ frontend.
- Amount mismatch → reject 400, không unlock.
- Webhook replay → idempotent (check purchase.status trước khi update).
