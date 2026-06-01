# ADR - Architecture Decision Records

> File này chỉ giữ các quyết định kiến trúc đã được chốt cho Bản Mệnh V2. Template hướng dẫn chung nằm ở bộ template gốc, không trộn vào docs dự án để tránh AI đọc nhầm placeholder thành quyết định thật.

## Quy tắc sử dụng

- Khi thay đổi stack, storage, payment, auth, KB, deploy hoặc module boundary, phải tạo/cập nhật ADR.
- ADR chỉ được đánh `ACCEPTED` khi đã có bối cảnh, lựa chọn thay thế, lý do chọn và hệ quả.
- Nếu quyết định bị thay thế, đổi status thành `SUPERSEDED` và ghi ADR thay thế.

## Index

| ID | Ngày | Category | Tiêu đề | Status | Thay thế bởi |
|---|---|---|---|---|---|
| ADR-001 | 2026-05-13 | Stack/Architecture | Stack chính của Bản Mệnh V2 | ACCEPTED | - |
| ADR-002 | 2026-05-13 | Security/Data | KB thần số học phải nằm ở private backend/storage | ACCEPTED | - |
| ADR-003 | 2026-05-13 | Product/Architecture | Tarot MVP dùng KB + template engine, chưa dùng AI tạo sinh | ACCEPTED | - |
| ADR-004 | 2026-05-16 | Stack/Styling | Tailwind CSS v4 + design tokens cho UI | ACCEPTED | - |
| ADR-005 | 2026-05-16 | Stack/Validation | Zod cho runtime validation và schema | ACCEPTED | - |
| ADR-006 | 2026-05-16 | Stack/API | Hono framework cho Cloudflare Workers | ACCEPTED | - |

---

## ADR-001 - Stack chính của Bản Mệnh V2

| Field | Value |
|---|---|
| Status | ACCEPTED |
| Category | Stack/Architecture |
| Owner | Zenki / Codex |
| Liên quan | PROJECT_META, ENVIRONMENT, technical-decisions |

### Bối cảnh

Bản Mệnh V2 là rebuild mới hoàn toàn, cần module hóa rõ, có route riêng cho từng module như `/than-so-hoc` và `/tarot`, thanh toán/entitlement riêng, dev/test và production tách biệt.

### Lựa chọn đã cân nhắc

- Next.js + TypeScript + Cloudflare Workers.
- Firebase-only app.
- Static frontend + nhiều Worker rời.

### Quyết định

Dùng Next.js + TypeScript cho app chính. Dùng Cloudflare Workers cho API edge/payment/webhook/voucher/alert/KB gateway khi phù hợp. Dùng Firebase Auth/Firestore cho auth, user, payment metadata và entitlement. Dùng Cloudflare R2/KV cho KB/file lớn/config/cache.

### Lý do

- Next.js phù hợp module hóa UI, route và SEO.
- TypeScript giảm lỗi khi app có nhiều module.
- Workers phù hợp webhook/payment/edge API và tách dev/prod.
- Firestore phù hợp dữ liệu user/payment/entitlement cần nguồn sự thật ổn định.
- R2/KV phù hợp KB/file lớn/config nhỏ và không đưa KB vào frontend.

### Hệ quả

- Cần policy môi trường rõ để không dùng nhầm key production ở dev.
- Cần API boundary rõ: frontend không tự đọc KB private hoặc tự xác nhận payment.
- Cần smoke test static artifact để đảm bảo không lộ KB/secret.

---

## ADR-002 - KB thần số học phải nằm ở private backend/storage

| Field | Value |
|---|---|
| Status | ACCEPTED |
| Category | Security/Data |
| Owner | Zenki / Codex |
| Liên quan | input-inventory, kb-extraction-plan, security-threat-model |

### Bối cảnh

KB thần số học là tài sản thương mại lõi. Nếu đưa vào `public/`, static bundle, localStorage hoặc endpoint raw không bảo vệ, người khác có thể tải toàn bộ KB.

### Lựa chọn đã cân nhắc

- Đưa KB vào frontend để xử lý nhanh.
- Đưa KB vào Firestore.
- Đưa KB vào R2/private storage và truy cập qua API/Worker.

### Quyết định

KB thần số học không được nằm trong public asset, client bundle, localStorage hoặc file tĩnh deploy ra web. Frontend chỉ gọi API/Worker để lấy đúng phần nội dung được phép theo entitlement.

### Lý do

- Bảo vệ tài sản nội dung.
- Dễ kiểm soát quyền truy cập theo gói/free/paid.
- Dễ audit log truy cập KB.

### Hệ quả

- Cần import pipeline riêng cho KB.
- Cần smoke test sau build/deploy để xác nhận KB không public.
- Cần log aggregate, tránh log PII/raw KB quá mức.

---

## ADR-003 - Tarot MVP dùng KB + template engine, chưa dùng AI tạo sinh

| Field | Value |
|---|---|
| Status | ACCEPTED |
| Category | Product/Architecture |
| Owner | Zenki / Codex |
| Liên quan | tarot-workflow-reference, modules/tarot, content-quality-spec |

### Bối cảnh

Module Tarot cần rebuild workflow theo hướng có daily message, chọn chủ đề, chọn spread, luận giải và thư viện lá bài. Nếu dùng AI/Gemini ngay từ MVP, chi phí, độ ổn định nội dung và rủi ro claim sẽ khó kiểm soát.

### Lựa chọn đã cân nhắc

- AI/Gemini tạo toàn bộ luận giải ngay từ MVP.
- KB + template engine cho MVP, AI để phase sau.
- Chỉ làm thư viện nghĩa lá bài, chưa có reading flow.

### Quyết định

Tarot MVP dùng KB + template engine, chưa dùng AI tạo sinh cho phần luận giải chính. Workflow tham chiếu Mystery Tarot ở mức cấu trúc UX/user journey, nhưng dùng branding, code, KB và hạ tầng riêng của Bản Mệnh V2.

### Lý do

- Dễ audit nội dung.
- Giảm chi phí và rủi ro vận hành.
- Phù hợp khi KB Tarot đang được rebuild và cần kiểm soát chất lượng.

### Hệ quả

- Cần đầu tư KB/schema/template đủ tốt.
- Trải nghiệm phải bù bằng UX, daily message, history, topic insights và upsell hợp lý.
- AI có thể thêm sau bằng ADR mới khi có cost guardrail, content safety và logging.

---

## ADR-004 - Tailwind CSS v4 + design tokens cho UI

| Field | Value |
|---|---|
| Status | ACCEPTED |
| Category | Stack/Styling |
| Owner | Codex |
| Liên quan | technical-decisions, design-extraction-spec, apps/web |

### Bối cảnh

Tài liệu `technical-decisions.md` để mở giữa Tailwind và CSS modules. `design-extraction-spec.md` đã định nghĩa ~30 color tokens, gradient, typography scale, radius và shadow. Cần khóa choice để Cursor/AI không tự chọn khác và để token có một source of truth dùng được cả ở CSS custom property lẫn utility class.

### Lựa chọn đã cân nhắc

- Vanilla CSS modules + biến CSS thuần.
- Tailwind v3 + config.js.
- Tailwind v4 + `@theme inline` trong CSS (CSS-first config).
- Stylex / Panda CSS / vanilla-extract.

### Quyết định

Dùng Tailwind CSS v4 với:

- `apps/web/src/styles/tokens.css` chứa CSS custom properties (`--bm-*`) là source of truth.
- Trong cùng file, dùng `@theme inline` map các token sang Tailwind theme để có utility class kiểu `bg-bg-void`, `text-primary-soft`, `rounded-2xl`.
- `apps/web/src/app/globals.css` import `tailwindcss` và `tokens.css`.
- `postcss.config.mjs` cấu hình `@tailwindcss/postcss` plugin.

### Lý do

- Token định nghĩa một lần, dùng được cả CSS thuần (`var(--bm-primary)`) lẫn Tailwind class (`bg-primary`).
- Tailwind v4 dùng CSS-first config, ít boilerplate hơn v3, không cần `tailwind.config.js`.
- Hỗ trợ tốt cho Next.js 16 + React 19.
- Dễ audit visual khi review PR vì class name rõ ràng.

### Không chọn

- Vanilla CSS: viết nhiều, dễ duplicate, khó refactor responsive.
- Tailwind v3: phải maintain `tailwind.config.js` song song với `tokens.css`, dễ lệch.
- Stylex / Panda / vanilla-extract: ecosystem nhỏ hơn, learning curve, không cần thiết với scope MVP.

### Hệ quả

- `apps/web/package.json` phải có `tailwindcss@^4` + `@tailwindcss/postcss@^4`.
- Mọi token mới phải thêm vào `tokens.css` trong cả `:root` lẫn `@theme inline`.
- Khi đổi token, cập nhật cả `design-extraction-spec.md` để tránh lệch docs ↔ code.
- Không hardcode màu/spacing trong component. Lint rule có thể được thêm sau.

### Điều kiện được đổi

- Khi Tailwind v4 có breaking change lớn hoặc Next.js không hỗ trợ.
- Khi token system phình lớn cần migration sang Panda/Stylex (chỉ sau khi MVP ổn).

---

## ADR-005 - Zod cho runtime validation và schema

| Field | Value |
|---|---|
| Status | ACCEPTED |
| Category | Stack/Validation |
| Owner | Codex |
| Liên quan | data-contract, packages/shared |

### Bối cảnh

`docs/product-specs/data-contract.md` có TypeScript types cho mọi entity (`users`, `reports`, `purchases`, `entitlements`, `vouchers`, `payment_logs`, `tarot_readings`) và API request/response. Cần validate runtime tại 3 nơi: Worker nhận webhook PayOS, Next.js API route nhận input từ user, frontend parse response từ API. Nếu mỗi nơi tự viết validate, dễ lệch contract.

### Lựa chọn đã cân nhắc

- Zod.
- Yup.
- Joi.
- Valibot (nhẹ hơn Zod).
- io-ts (functional, learning curve cao).
- Tự viết validator.

### Quyết định

Dùng **Zod** làm thư viện validation chính. Mọi schema định nghĩa trong `packages/shared/src/schemas/`. Export cả `z.object()` schema và inferred TypeScript type.

### Lý do

- Zod kết hợp type + validation trong một định nghĩa: `z.infer<typeof UserSchema>` cho TypeScript type.
- Cộng đồng lớn, ecosystem tốt (`@hono/zod-validator`, `zod-to-openapi`, `zod-form-data`).
- Tích hợp tốt với Hono (Worker) và Next.js Route Handler.
- API rõ ràng, dễ đọc.

### Không chọn

- Yup/Joi: TypeScript inference yếu hơn.
- Valibot: nhẹ hơn nhưng ecosystem nhỏ hơn, ít middleware sẵn cho Hono.
- io-ts: learning curve cao, không phù hợp team nhỏ.
- Tự viết: dễ lệch contract giữa 3 layer.

### Hệ quả

- `apps/web` và `workers/*` đều phụ thuộc `zod` (qua `packages/shared`).
- Mọi API request body/query/params validate qua Zod trước khi xử lý logic.
- Mọi webhook payload (PayOS, Telegram nếu có) validate qua Zod.
- Khi cập nhật `data-contract.md`, phải cập nhật schema tương ứng và rebuild types.

### Điều kiện được đổi

- Nếu Zod có vấn đề bundle size nghiêm trọng cho Worker (Zod v4 đã giảm size đáng kể, hiện không phải vấn đề).
- Nếu cần feature mà Valibot/io-ts có còn Zod không có.

---

## ADR-006 - Hono framework cho Cloudflare Workers

| Field | Value |
|---|---|
| Status | ACCEPTED |
| Category | Stack/API |
| Owner | Codex |
| Liên quan | technical-decisions, workers/* |

### Bối cảnh

`docs/product-specs/technical-decisions.md` đã chốt Cloudflare Workers cho payment/admin/kb API nhưng chưa chọn framework. Worker vanilla phải tự handle routing, parsing, error, CORS, middleware → dễ duplicate code giữa 3 worker (payment, kb, admin).

### Lựa chọn đã cân nhắc

- Hono.
- Itty Router.
- Worktop.
- Vanilla Worker (`fetch` handler thuần).
- tRPC.

### Quyết định

Dùng **Hono** làm framework cho cả 3 Worker (`workers/payment`, `workers/kb`, `workers/admin`).

### Lý do

- TypeScript-first, type-safe routing, context typing rõ ràng.
- Middleware ecosystem tốt: CORS, JWT, logger, `@hono/zod-validator` tích hợp Zod (ADR-005).
- Bundle size nhỏ, phù hợp Cloudflare Workers (giới hạn 1MB script).
- Cùng API style cho cả 3 Worker → reuse middleware/helper.
- Hỗ trợ deploy qua `wrangler` chuẩn.

### Không chọn

- Itty Router: nhỏ gọn nhưng ecosystem middleware nhỏ hơn.
- Worktop: ít update.
- Vanilla: phải tự viết routing, error handler, middleware → duplicate code và dễ bug.
- tRPC: tốt nhưng coupling frontend ↔ backend chặt, không phù hợp với webhook PayOS và admin API public.

### Hệ quả

- Mỗi Worker phụ thuộc `hono` + `@hono/zod-validator`.
- Middleware chung (auth verify Firebase token, error handler, request logger, rate limit) để trong `packages/shared/src/worker-middleware/` hoặc `workers/_shared/`.
- `wrangler.toml` mỗi Worker có 2 environment: `dev` và `production`, không share secret.
- Worker test dùng `@cloudflare/workers-types` + `wrangler dev` local.

### Điều kiện được đổi

- Nếu Hono breaking change nặng và migration cost cao.
- Nếu sau MVP cần GraphQL hoặc tRPC end-to-end type-safe cho admin dashboard.

---

## ADR-007 - Numerology narrative extension khi V1 partial-rich

| Field | Value |
|---|---|
| Status | ACCEPTED |
| Category | KB/Narrative |
| Owner | Codex |
| Liên quan | T-0606c, tools/kb-import/extract-narrative.mjs, kb-private/numerology |

### Bối cảnh

T-0606b mở rộng extractor để đọc các `NarrativeTemplates.groupName = { ... }` override trong V1. Audit tiếp theo phát hiện một số override có thể partial-rich: ví dụ `soulChallenge` có entry `[1]` rich theo cấu trúc 5-aspect, nhưng `[0, 2-8]` vẫn ngắn và `[9]` fallback từ original.

Nếu chỉ copy literal V1, chất lượng thương mại giữa các number trong cùng một indicator không đồng đều. Nếu sửa trực tiếp V1 source hoặc sinh nội dung runtime, pipeline sẽ mất tính truy vết và tăng rủi ro vận hành.

### Quyết định

Khi audit phát hiện một nhóm narrative V1 partial-rich, dự án cho phép tạo nội dung mở rộng offline, static, đặt trong `kb-private/numerology/`, rồi để extractor merge V1 literal với extended content.

Quy tắc áp dụng:

- Entry V1 rich giữ nguyên, không paraphrase.
- Entry extended phải được tạo/duyệt offline, không gọi LLM runtime.
- File extended nằm trong `kb-private` và không commit.
- Extractor phải validate length, cấu trúc section, placeholder `{{name}}`, và không leak `${...}` trước khi ghi `narrative.json`.
- DEVLOG/TASK_REGISTRY phải ghi rõ entry nào là V1 literal, entry nào là extended static.

### Hệ quả

Ưu điểm:

- Chất lượng narrative đồng đều hơn giữa các number.
- Runtime vẫn chỉ đọc JSON/static content, không phát sinh LLM call.
- Nguồn gốc nội dung extended được phân biệt rõ với V1 literal.

Đánh đổi:

- Nội dung extended không phải V1 literal, nên cần audit riêng và ghi provenance rõ.
- Extractor phụ thuộc vào file private tương ứng khi regenerate narrative.
- Các group khác có thể cần audit tiếp nếu V1 override có pattern partial-rich tương tự.

### Trigger áp dụng

- V1 entry trong cùng group ngắn bất thường, ví dụ dưới 2000 chars trong khi một entry cùng group có cấu trúc rich.
- Entry thiếu các sub-section headers quan trọng đã được group rich sử dụng.
- Audit nội dung phát hiện trải nghiệm người dùng không đồng đều giữa các number.
