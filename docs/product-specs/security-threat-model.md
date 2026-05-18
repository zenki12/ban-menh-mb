# Bản Mệnh V2 Security Threat Model

Ngày cập nhật: 2026-05-13

Mục tiêu: liệt kê rủi ro bảo mật/thương mại quan trọng trước khi rebuild để tránh lặp lại lỗi đã từng gặp.

## 1. Tài Sản Cần Bảo Vệ

- KB Thần số học private.
- KB Tarot private.
- Admin token.
- PayOS secret/webhook secret.
- User PII: họ tên, ngày sinh, email, câu hỏi Tarot.
- Entitlement/quyền đã mua.
- Voucher/promotions.
- Payment logs.

## 2. Rủi Ro P0

### P0.1 KB private bị public trong static build

Rủi ro:

- Đối thủ tải toàn bộ KB.
- Mất lợi thế thương mại.

Kiểm soát:

- KB chỉ nằm trong Worker/KV/private storage.
- Static artifact scan trước deploy.
- `/api/kb/*` no auth trả `401`.
- Không đặt file `*_knowledge_base.json` trong web public.

### P0.2 Fake entitlement từ frontend

Rủi ro:

- User tự sửa localStorage hoặc gọi API sai để unlock.

Kiểm soát:

- Entitlement chỉ tạo từ backend sau payment confirmed.
- Mọi unlock check qua backend.
- Frontend chỉ hiển thị theo response backend.

### P0.3 Webhook replay tạo quyền trùng

Rủi ro:

- Một payment sinh nhiều entitlement.

Kiểm soát:

- `orderId` unique.
- `purchaseId` unique trong entitlement.
- Webhook idempotent.
- Nếu order confirmed rồi, webhook lặp trả ok nhưng không tạo quyền mới.

### P0.4 Secret/token bị commit

Rủi ro:

- Bị chiếm admin/payment.

Kiểm soát:

- Secret scan trước commit/deploy.
- Token thật lưu ngoài repo.
- Rotate token nếu nghi lộ.
- File hướng dẫn chỉ có placeholder.

## 3. Rủi Ro P1

### P1.1 Voucher abuse

Rủi ro:

- Khách dùng mã test/giảm sâu ngoài ý muốn.

Kiểm soát:

- `active`, `startsAt`, `expiresAt`.
- `maxUses`, `perUserLimit`.
- Admin log khi tạo/sửa/tắt voucher.
- Telegram alert với voucher giảm sâu.

### P1.2 Payment amount mismatch

Rủi ro:

- User trả ít hơn giá thật nhưng vẫn unlock.

Kiểm soát:

- Backend tự tính giá từ productCode + voucher.
- Webhook check amount expected.
- Không nhận amount từ frontend làm nguồn sự thật.

### P1.3 Admin API brute force

Rủi ro:

- Dò token admin.

Kiểm soát:

- Token dài, random.
- Rate limit admin endpoint.
- CORS Origin allowlist.
- Alert khi nhiều request 401.

### P1.4 Log chứa PII

Rủi ro:

- Lộ họ tên/ngày sinh/câu hỏi cá nhân qua log.

Kiểm soát:

- Log hash hoặc id thay vì raw input.
- Redact email/token/phone.
- Chỉ log nội dung cần debug.

### P1.5 AI provider data exposure

Rủi ro:

- Nếu gửi câu hỏi/user data sang AI provider mà không nói rõ trong Privacy.

Kiểm soát:

- Nếu dùng AI, cập nhật Privacy/Terms.
- Copy UI phải nói rõ “AI hỗ trợ diễn giải” nếu có.
- Không claim “Không AI” khi backend có gọi AI.

## 4. Rủi Ro P2

- UI lỗi encoding làm mất niềm tin thương mại.
- QR hết hạn không hướng dẫn tạo lại.
- Telegram alert fail im lặng.
- Mobile CTA bị che.
- Footer/header lệch giữa các module.

## 5. Security Smoke Test Bắt Buộc

```text
[ ] Không có secret/token trong git diff
[ ] Không có KB private trong static artifact
[ ] /api/kb/* no auth = 401
[ ] Admin API no token = 401
[ ] Voucher disabled trả thông báo đúng
[ ] Payment webhook replay không tạo entitlement trùng
[ ] Payment amount mismatch không unlock
[ ] QR expired không unlock
[ ] Telegram test alert pass
```

## 6. Quy Tắc Với Multi-Agent

- Codex là người sửa code/deploy chính.
- Claude chỉ QC/audit, không giữ secret, không deploy.
- Không agent nào được tự thêm dependency lớn nếu chưa có lý do.
- Không agent nào được public KB ra frontend để “test nhanh”.
- Mọi audit finding P0/P1 phải xử lý trước production deploy.

