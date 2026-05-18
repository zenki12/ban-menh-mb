# Bản Mệnh V2 Technical Decisions

Ngày cập nhật: 2026-05-13

Tài liệu này khóa các quyết định kỹ thuật chính để tránh AI/dev tự chọn stack, tự thêm dependency hoặc tạo kiến trúc phình to.

## 1. Mục Tiêu Kỹ Thuật

- App nhỏ, rõ module, dễ audit.
- Tách dev/test và production ngay từ đầu.
- Backend quyết định payment, entitlement, KB access.
- Không để KB/secret lọt vào static frontend.
- Dễ rollback khi payment hoặc frontend lỗi.

## 2. Stack Đề Xuất

Frontend:

- Framework: Next.js hoặc Astro + React islands. Nếu cần app/account/payment phức tạp, ưu tiên Next.js.
- Language: TypeScript.
- Styling: CSS modules hoặc Tailwind, nhưng phải có design tokens chung.
- Icons: lucide-react hoặc icon assets nội bộ đã duyệt.

Backend/API:

- Cloudflare Workers cho payment/admin/kb API.
- Không gọi payment provider trực tiếp từ frontend.
- Không expose raw KB qua static files.

Database/storage:

- Firestore hoặc Cloudflare D1/KV/R2 tùy hạ tầng hiện có.
- Nếu dùng Firestore: phải có rules rõ ràng và không cho client ghi entitlement/purchase confirmed.
- Nếu dùng KV: chỉ dùng cho config/KB/cache, không dùng làm nguồn sự thật duy nhất cho giao dịch tiền nếu cần consistency cao.

Auth:

- Google login.
- Anonymous session có thể dùng cho free flow, nhưng paid entitlement nên gắn với user khi có thể.
- Admin API không dùng Google user thường; dùng admin token/role riêng.

Deploy:

- Frontend dev: `dev.banmenh.online`.
- Frontend production: `banmenh.online`.
- Worker dev và production tách tên, tách secret, tách storage.

## 3. Folder Rules

Đề xuất:

```text
apps/
  web/
    src/
      app/
      modules/
        numerology/
        tarot/
        account/
        payment/
      components/
      styles/
      lib/
workers/
  payment/
  kb/
  admin/
packages/
  shared/
    pricing.ts
    entitlements.ts
    schemas.ts
    errors.ts
docs/
```

Rules:

- Không tạo file HTML khổng lồ chứa toàn bộ app.
- Không inline script lớn trong HTML.
- Không inline `onclick`.
- Không copy logic pricing vào nhiều nơi.
- Pricing/entitlement phải nằm trong shared module.
- Mỗi module có folder riêng, không nhồi mọi thứ vào `app.js`.
- File > 600 dòng phải có lý do; nếu vượt 1.000 dòng thì phải tách.

## 4. Dependency Rules

- Không thêm dependency mới nếu native API hoặc dependency hiện có xử lý được.
- Không thêm UI framework lớn nếu chỉ cần vài component.
- Không thêm package không rõ maintenance/security.
- Mọi dependency mới phải trả lời:
  - Dùng để làm gì?
  - Có thay thế nhẹ hơn không?
  - Có ảnh hưởng bundle size không?
  - Có rủi ro license/security không?

## 5. Auth / Permission Matrix

```text
Resource                Anonymous   User Owner   Admin   Webhook
users                   create self  read self    read    no
reports                 create free  read own     read    no
purchases               create       read own     read    update confirmed
entitlements            no write     read own     CRUD    create/update
vouchers                validate     validate     CRUD    read
payment_logs            no           no           read    create
tarot_readings local    browser      browser      no      no
tarot_readings cloud    no           CRUD own     read    no
private KB              no raw       gated read   read    no
```

Nguyên tắc:

- Frontend không được ghi `purchase.status = confirmed`.
- Frontend không được tạo/sửa entitlement.
- Webhook chỉ được cập nhật purchase/entitlement sau verify signature.
- Admin API phải audit log mọi hành động tạo/sửa/xóa voucher.

## 6. Error Handling Chuẩn

API error format:

```ts
{
  ok: false,
  code: "UNAUTHORIZED" | "PAYMENT_EXPIRED" | "VOUCHER_INVALID" | "RATE_LIMITED" | "INTERNAL_ERROR",
  message: string,
  requestId?: string
}
```

Frontend:

- Không hiển thị lỗi raw như `Failed to fetch`.
- Lỗi payment phải có CTA thử lại/hỗ trợ.
- Lỗi auth phải có CTA đăng nhập.
- Lỗi API phải có requestId nếu backend cung cấp.

## 7. Observability

Bắt buộc:

- Payment success alert.
- Payment error alert.
- Admin voucher action log.
- Webhook verify fail log.
- KB unauthorized access log ở mức aggregate, tránh log PII.

Không log:

- Full admin token.
- PayOS secret.
- Raw câu hỏi Tarot nếu không cần.
- Full họ tên/ngày sinh trong error log.

## 8. Test Strategy

MVP tối thiểu:

- Unit test pricing/voucher.
- Unit test entitlement rules.
- Integration test payment webhook idempotency.
- Security smoke test KB/static artifact.
- Manual E2E checklist trước production deploy.

Các case payment bắt buộc:

- Create order thường.
- Create order có voucher fixed.
- Create order có voucher percent.
- QR expired.
- Webhook success.
- Webhook replay.
- Amount mismatch.
- Voucher disabled sau khi order đã tạo.

## 9. Definition Of Technical Done

- Typecheck pass.
- Build pass.
- Không file app chính khổng lồ.
- Không secret trong diff.
- Không KB private trong static artifact.
- API error format thống nhất.
- Payment edge cases đã test.
- Rollback path rõ.

## 10. Decision Records

### DR-001: Stack Chính Của V2

Quyết định:

- Dùng Next.js + TypeScript cho frontend.
- Dùng Cloudflare Workers cho payment/admin/kb API.
- Dùng design tokens chung, ưu tiên Tailwind hoặc CSS modules theo setup cuối cùng.

Lý do:

- App có nhiều route, account, payment, entitlement và report detail; Next.js phù hợp hơn app HTML thuần.
- TypeScript giúp giảm lỗi khi model dữ liệu/payment/entitlement tăng độ phức tạp.
- Cloudflare Workers phù hợp webhook, voucher, KB gateway, Telegram alert và tách dev/prod.
- Kiến trúc này giảm rủi ro app phình thành một file HTML/JS lớn.

Không chọn:

- HTML thuần: nhanh ban đầu nhưng dễ tạo tech debt, khó tách module, khó kiểm soát state/payment.
- Astro làm core app: tốt cho content site, nhưng account/payment/entitlement nhiều state sẽ kém thuận lợi hơn Next.js.
- Firebase-only backend: thuận tiện nhưng khó kiểm soát payment gateway, KB gateway và admin boundary theo yêu cầu bảo mật.

Hệ quả:

- Cần setup build/deploy bài bản hơn.
- Cần type/shared schema ngay từ đầu.
- Đổi lại app dễ bảo trì, dễ audit và dễ mở rộng module hơn.

Điều kiện được đổi:

- Chỉ đổi stack nếu có bằng chứng Next.js/Workers không đáp ứng yêu cầu production hoặc chi phí vận hành vượt ngưỡng chấp nhận.

### DR-002: Database Và Storage

Quyết định:

- Dùng Firestore làm nguồn sự thật cho user, reports, purchases, entitlements, vouchers, payment logs và cloud history.
- Dùng Cloudflare R2 cho KB/file JSON lớn và Cloudflare KV cho config nhỏ/cache/manifest ít thay đổi.
- Frontend không đọc KB trực tiếp; phải đi qua Worker/API có kiểm tra quyền.

Lý do:

- Firestore phù hợp dữ liệu theo user, quyền sở hữu, lịch sử và truy vấn account.
- Payment/entitlement cần nguồn sự thật ổn định hơn KV.
- R2 phù hợp KB lớn/file JSON ít thay đổi; KV phù hợp config nhỏ/cache/manifest cần đọc nhanh; cả hai đều phải tách khỏi frontend static build.
- Workers đứng giữa giúp kiểm soát auth, entitlement, rate limit và logging.

Không chọn:

- Chỉ dùng KV cho toàn bộ hệ thống: không phù hợp làm nguồn sự thật cho giao dịch tiền.
- Đưa KB vào frontend/static assets: rủi ro lộ KB thương mại.
- Đưa toàn bộ KB lớn vào Firestore: dễ tốn chi phí và không tối ưu cho nội dung ít thay đổi.

Hệ quả:

- Cần đồng bộ config dev/prod riêng.
- Cần import/export KB có kiểm soát, chỉ lấy từ nguồn KB do user cung cấp.
- Cần API gateway cho KB ngay từ đầu.

Điều kiện được đổi:

- Có thể thay Firestore bằng DB khác nếu trước khi code MVP có quyết định hạ tầng mới, nhưng phải giữ nguyên nguyên tắc: transaction/user data có nguồn sự thật riêng, KB private không nằm trong static frontend.

### DR-003: Tarot MVP Non-AI

Quyết định:

- Tarot MVP dùng KB + template engine, chưa dùng AI tạo sinh.
- AI chỉ là optional future feature cho tier cao sau khi cập nhật Privacy/Terms và marketing claim.

Lý do:

- Giữ đúng định vị “tri thức chuyên gia / không AI” trong giai đoạn đầu.
- Nội dung ổn định, dễ audit, ít rủi ro pháp lý hơn.
- Tránh AI sinh nội dung phán quá mức, gây sợ hãi hoặc mâu thuẫn.
- Giảm chi phí và giảm độ khó vận hành khi Tarot KB đang rebuild.

Không chọn:

- Dùng Gemini/OpenAI ngay từ MVP.
- Dùng AI làm nguồn luận giải chính nhưng vẫn claim “Không AI”.

Hệ quả:

- Cần đầu tư KB Tarot và template kỹ hơn.
- MVP ít linh hoạt hơn AI, nhưng đáng tin cậy và dễ kiểm soát hơn.
- Nếu bật AI sau này, phải đổi legal copy, privacy, terms và positioning.

Điều kiện được đổi:

- Chỉ bật AI sau khi có spec riêng cho AI, privacy/terms đã cập nhật, content safety đã test và product owner duyệt claim mới.
