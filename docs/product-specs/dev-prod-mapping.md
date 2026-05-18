# Dev/Prod Resource Mapping

Tài liệu này khóa quy ước đặt tên resource để tránh dùng nhầm production khi phát triển.

## Nguyên tắc

- Dev/Test và Production phải dùng resource, secret và payment config riêng.
- Không share secret giữa dev và prod.
- Không commit `account_id`, API token, webhook secret, service account hoặc key thật.
- Chỉ user Zenki được duyệt và thực hiện production deploy.
- Mọi production deploy phải đi theo `docs/product-specs/release-runbook.md`.

## Resource Mapping

| Resource | Dev/Test | Production | Ghi chú |
|---|---|---|---|
| Frontend Pages project | `banmenh-v2-dev` | `banmenh-v2-prod` | Domain production chỉ gắn khi user duyệt |
| Frontend URL | `https://dev.banmenh.online` | `https://banmenh.online` | Không hardcode trong code |
| Firestore project | `banmenh-v2-dev` | `banmenh-v2-prod` | Tách project hoặc namespace rõ |
| R2 KB bucket | `banmenh-kb-dev` | `banmenh-kb-prod` | Không public KB qua static asset |
| KV config namespace | `banmenh-config-dev` | `banmenh-config-prod` | ID thật không commit |
| Payment Worker | `banmenh-payment-dev` | `banmenh-payment-prod` | Secret qua `wrangler secret put` |
| KB Worker | `banmenh-kb-dev` | `banmenh-kb-prod` | No-auth raw KB phải bị chặn |
| Admin Worker | `banmenh-admin-dev` | `banmenh-admin-prod` | Admin token riêng từng env |
| PayOS account | PayOS sandbox/test | PayOS live | Không dùng live key ở dev |
| Telegram chat | Test alert chat | Production alert chat | Không log token/chat secret |

## ENV Var Mapping

| ENV var | Dev/Test pattern | Production pattern | Secret? |
|---|---|---|---:|
| `NEXT_PUBLIC_APP_ENV` | `dev` | `production` | No |
| `NEXT_PUBLIC_APP_URL` | `https://dev.banmenh.online` | `https://banmenh.online` | No |
| `FIREBASE_PROJECT_ID` | `banmenh-v2-dev` | `banmenh-v2-prod` | Yes |
| `FIREBASE_CLIENT_EMAIL` | dev service account email | prod service account email | Yes |
| `FIREBASE_PRIVATE_KEY` | dev service account key | prod service account key | Yes |
| `GOOGLE_CLIENT_ID` | dev OAuth client | prod OAuth client | Yes |
| `GOOGLE_CLIENT_SECRET` | dev OAuth secret | prod OAuth secret | Yes |
| `PAYOS_CLIENT_ID` | sandbox/test client | live client | Yes |
| `PAYOS_API_KEY` | sandbox/test key | live key | Yes |
| `PAYOS_CHECKSUM_KEY` | sandbox/test checksum | live checksum | Yes |
| `ADMIN_TOKEN` | dev admin token | prod admin token | Yes |
| `TELEGRAM_BOT_TOKEN` | test bot token | prod bot token | Yes |
| `TELEGRAM_CHAT_ID` | test chat | prod alert chat | Yes |
| `KB_STORAGE_BUCKET` | `banmenh-kb-dev` | `banmenh-kb-prod` | Yes/No |
| `CLOUDFLARE_PAGES_PROJECT_DEV` | `banmenh-v2-dev` | N/A | No |
| `CLOUDFLARE_PAGES_PROJECT_PROD` | N/A | `banmenh-v2-prod` | No |
| `PAYMENT_WORKER_NAME` | `banmenh-payment-dev` | `banmenh-payment-prod` | No |
| `KB_WORKER_NAME` | `banmenh-kb-dev` | `banmenh-kb-prod` | No |
| `ADMIN_WORKER_NAME` | `banmenh-admin-dev` | `banmenh-admin-prod` | No |

## Worker Config Skeleton

`workers/payment/wrangler.toml`, `workers/kb/wrangler.toml` và `workers/admin/wrangler.toml` chỉ chứa placeholder. Resource thật, secret và binding ID thật phải được cấu hình bằng platform secret/config theo từng môi trường.
