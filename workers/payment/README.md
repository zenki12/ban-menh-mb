# Payment Worker — Bản Mệnh V2

Cloudflare Worker xử lý webhook PayOS và payment boundary.

## Status

- **T-0503a** (scaffold): ✅ Done — Hono setup, /health endpoint.
- **T-0503b** (webhook logic): 🔲 Todo — PayOS signature verify, Firestore REST, entitlement grant.

## Run dev

```bash
cd workers/payment
npm install
npm run dev
# → http://localhost:8787
```

## Endpoints

| Method | Path | Status |
|--------|------|--------|
| GET | `/` | ✅ "Bản Mệnh V2 — Payment Worker" |
| GET | `/health` | ✅ `{ ok: true, service, timestamp }` |
| POST | `/webhook/payos` | 🔲 501 Not Implemented (T-0503b) |

## Security

- Không commit `.dev.vars` (gitignored).
- Secrets thật set qua `wrangler secret put`.
- Không import firebase-admin (không chạy ở Workers runtime).
- Không trust amount/orderId từ frontend.
