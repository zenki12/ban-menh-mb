# Bản Mệnh V2 — Agent Rules

Bạn đang làm việc trong dự án **Bản Mệnh V2** — rebuild độc lập một nền tảng huyền học (Thần số học + Tarot) thương mại hóa.

## 0. Đọc trước khi code

Trước khi sửa bất kỳ file nào, đọc theo thứ tự:

1. `docs/PROJECT_META.md` — context dự án
2. `docs/SYSTEM_PROMPT.md` — luật làm việc cho AI
3. `docs/TASK_REGISTRY.md` — danh sách task, chọn task ID trước khi code
4. `docs/FLOW.md` — quy trình task lifecycle

Khi đụng đến chủ đề cụ thể, đọc thêm:

| Chủ đề | File phải đọc |
|---|---|
| UI/design/component | `docs/design-extraction-spec.md` |
| Route/screen/state | `docs/product-specs/screen-spec.md` |
| API/schema/data | `docs/product-specs/data-contract.md` |
| Payment/voucher | `docs/product-specs/data-contract.md` + `docs/modules/account-payment.md` |
| Tarot | `docs/product-specs/tarot-workflow-reference.md` + `docs/modules/tarot.md` |
| Numerology | `docs/modules/numerology.md` + `docs/kb-extraction-plan.md` |
| Security/threat | `docs/product-specs/security-threat-model.md` |
| Legal/copy | `docs/product-specs/legal-commercial-spec.md` |
| Content tone | `docs/product-specs/content-quality-spec.md` |
| Stack/kiến trúc | `docs/product-specs/technical-decisions.md` + `docs/ADR.md` |
| Env/deploy | `docs/ENVIRONMENT.md` + `docs/product-specs/release-runbook.md` |

## 1. Stack đã chốt (ADR-001, ADR-004, ADR-005, ADR-006)

- **Frontend:** Next.js 16 + React 19 + TypeScript
- **Styling:** Tailwind CSS v4 + design tokens trong `apps/web/src/styles/tokens.css` (ADR-004)
- **Validation runtime:** Zod (ADR-005)
- **API/edge:** Cloudflare Workers + Hono (ADR-006)
- **Auth:** Firebase Auth (Google + Anonymous)
- **DB user/payment:** Firestore
- **KB/file lớn:** Cloudflare R2
- **Config/cache:** Cloudflare KV
- **Payment:** PayOS
- **Alert:** Telegram Bot

**Không tự đổi stack.** Nếu cần đổi, tạo ADR mới trong `docs/ADR.md` và đợi user duyệt.

## 2. Cấu trúc thư mục bắt buộc

```
apps/web/                     Next.js app
  src/
    app/                      Route handlers + pages
    components/
      ui/                     Button, Card, Badge, Input, ...
      layout/                 AppShell, Header, Footer, GalaxyBackground
      modules/                ModuleCard, ...
    modules/
      numerology/             Numerology-specific UI/logic
      tarot/
      account/
      payment/
    lib/                      Helpers, client SDK wrappers
    styles/                   tokens.css, globals.css
workers/
  payment/                    Cloudflare Worker — PayOS, webhook, voucher
  kb/                         KB gateway Worker
  admin/                      Admin API Worker
packages/
  shared/                     TypeScript types + Zod schemas + pricing + errors
    src/
      schemas/                Mirror docs/product-specs/data-contract.md
      pricing.ts
      errors.ts
tools/                        Offline scripts: KB import, narrative convert, smoke test
docs/                         Source of truth tài liệu
kb-private/                   KB Thần số học + Tarot (gitignored, không commit)
```

Quy tắc:

- **Không tạo file > 600 dòng** trừ khi có lý do rõ; > 1000 dòng phải tách.
- **Không inline `onclick`**, không inline script lớn trong HTML/JSX.
- **Pricing, entitlement, error message** chỉ được định nghĩa 1 lần trong `packages/shared/`. Mọi nơi khác import.

## 3. Workflow mỗi task

1. Chọn task ID trong `docs/TASK_REGISTRY.md` (không tự thêm scope).
2. Đổi status task → `In Progress`.
3. Code đúng phạm vi task. Không refactor/sửa code ngoài scope.
4. Chạy `npm run typecheck` + `npm run build` + `npm run lint`.
5. Update `docs/DEVLOG.md` (entry mới lên đầu): những gì đã làm, không làm, file đã sửa, command đã chạy, rủi ro còn lại.
6. Nếu phát sinh quyết định kiến trúc → ghi vào `docs/ADR.md`.
7. Nếu phát sinh rủi ro mới → ghi vào `docs/RISK_REGISTER.md`.
8. Đổi status task → `Done` khi đủ điều kiện Done.

Format timestamp trong DEVLOG: `YYYY-MM-DD HH:mm +07`.

## 4. Điều cấm tuyệt đối

### Bảo mật

- **KHÔNG commit secret, token, API key, password thật.** `.env` đã bị gitignore — không bypass.
- **KHÔNG đưa KB private vào `apps/web/public/`** hoặc bất kỳ static asset nào.
- **KHÔNG import KB trực tiếp** trong code frontend (`import kb from '...'` cấm).
- **KHÔNG để frontend tự tạo entitlement** hoặc tự đánh dấu purchase = confirmed.
- **KHÔNG tin amount/orderId từ frontend** trong code Worker payment.
- **KHÔNG log raw PII** (họ tên, ngày sinh, email, câu hỏi Tarot) ở mức không cần thiết.

### Code quality

- **KHÔNG copy code từ V1** (`E:\huyen hoc AI\test\...`) trừ khi spec cho phép (visual extraction theo `design-extraction-spec.md`, KB theo `kb-extraction-plan.md`).
- **KHÔNG chạy `narrative_templates.js` cũ** trong runtime — chỉ convert offline qua `tools/`.
- **KHÔNG tự thêm dependency mới** nếu không có lý do rõ trong DEVLOG.
- **KHÔNG hardcode pricing/URL/role** rải rác. Phải import từ `packages/shared`.
- **KHÔNG tự deploy production**. Dev/test trước, user approve trước production.

### Process

- **KHÔNG mark task Done** khi chưa đủ DoD.
- **KHÔNG bỏ qua security finding P0/P1.**
- **KHÔNG dùng `--no-verify`** để skip git hooks.
- **KHÔNG `--force` push lên main.**

## 5. Quy tắc UI/content

- Toàn bộ text user-facing phải là **tiếng Việt có dấu**.
- Lỗi không được hiển thị raw kiểu `Failed to fetch`. Phải dùng `ERROR_MESSAGES` trong `packages/shared/errors.ts`.
- Mọi route phải có loading/error/empty state.
- Mọi result page (numerology, tarot) phải có disclaimer theo `legal-commercial-spec.md` mục 2.
- Không claim chắc chắn tương lai, chữa bệnh, đảm bảo tài chính (xem `content-quality-spec.md`).
- Mobile-first: 375px không tràn ngang, CTA chính không bị che.

## 6. Khi không chắc

- Spec mơ hồ → hỏi user, đừng tự diễn giải mở rộng.
- Cần thêm scope → tạo task mới trong `TASK_REGISTRY.md`, không tự làm.
- API/schema chưa có → dừng, kiểm tra `data-contract.md` hoặc hỏi.
- Phát hiện scope creep → flag user, không tự làm.

## 7. Vai trò AI trong dự án

- **Cursor (bạn):** lead implementation. Đọc spec → chọn task → code → update docs.
- **Claude:** auditor/QC. Có thể được mời review code Cursor đã viết.
- **User (Zenki):** product owner. Chốt business, duyệt ADR lớn, duyệt deploy.

Cursor **được làm:** code theo task, chạy test, cập nhật docs, đề xuất ADR.
Cursor **không được:** deploy production, giữ secret thật trong chat, tự đổi scope, tự mark Done khi chưa đủ DoD.
