# Bản Mệnh V2 Release Runbook

Ngày cập nhật: 2026-05-13

Tài liệu này dùng để dev/test, deploy production và rollback.

## 1. Nguyên Tắc

- Không deploy thẳng production nếu chưa pass dev/test.
- Không deploy khi còn P0/P1 security issue.
- Không deploy nếu payment flow chưa test.
- Không deploy nếu không có rollback note.

## 2. Dev/Test Flow

1. Pull latest code.
2. Cài dependencies.
3. Chạy lint/typecheck/build.
4. Chạy unit/integration tests nếu có.
5. Chạy security smoke.
6. Deploy dev/test.
7. Test thủ công các flow chính.
8. Ghi lại kết quả.

Checklist dev/test:

```text
[ ] Hub load
[ ] /than-so-hoc load
[ ] Numerology free result pass
[ ] Numerology payment create pass
[ ] Voucher fixed pass
[ ] Voucher percent pass
[ ] Payment success unlock pass
[ ] Payment expired pass
[ ] /tarot load
[ ] Tarot 1 lá pass
[ ] Tarot 3 lá pass
[ ] Account entitlement pass
[ ] Telegram alert pass
[ ] Mobile check pass
```

## 3. Production Deploy Flow

Chỉ thực hiện sau khi dev/test pass.

1. Kiểm tra git diff.
2. Kiểm tra không có secret.
3. Kiểm tra static artifact không có KB private.
4. Deploy Worker production.
5. Deploy frontend production.
6. Smoke test production.
7. Test payment nhỏ nếu cần.
8. Theo dõi Telegram/log 15-30 phút.

Production smoke:

```text
[ ] Homepage 200
[ ] /than-so-hoc 200
[ ] /tarot 200
[ ] /account không login xử lý đúng
[ ] /api/kb no auth = 401
[ ] Admin API no token = 401
[ ] Payment create trả QR
[ ] Payment check pending không lỗi
[ ] Telegram test alert pass
```

## 4. Rollback

Khi rollback:

- Rollback frontend về version trước.
- Rollback Worker nếu payment/API lỗi.
- Không xóa data production trừ khi có backup và lý do rõ.
- Nếu payment bị ảnh hưởng, ưu tiên tắt CTA payment hoặc bật maintenance message.

Rollback trigger:

- Payment success nhưng không unlock.
- Webhook lỗi hàng loạt.
- KB private bị public.
- Login/account lỗi toàn bộ.
- UI production bị lỗi encoding diện rộng.

## 5. Incident Playbook

### Payment success nhưng không unlock

1. Kiểm tra order trong PayOS.
2. Kiểm tra purchase status.
3. Kiểm tra entitlement đã tạo chưa.
4. Nếu payment confirmed nhưng chưa unlock, tạo entitlement thủ công qua admin API.
5. Ghi payment log.
6. Fix idempotency/webhook nếu là lỗi hệ thống.

### Telegram không báo

1. Gọi test alert endpoint.
2. Kiểm tra bot token/chat id trong secret.
3. Kiểm tra bot đã được start chưa.
4. Kiểm tra worker log.

### Voucher lỗi

1. GET danh sách voucher.
2. Kiểm tra `active`, `expiresAt`, `maxUses`, `perUserLimit`.
3. Nếu mã test còn active ngoài ý muốn, tắt ngay.
4. Kiểm tra log tạo/sửa voucher.

### KB bị nghi lộ

1. Tắt route/static file lộ nếu có.
2. Deploy placeholder 404/401.
3. Rotate key nếu liên quan.
4. Audit artifact và git history.
5. Ghi incident report.

## 6. Go/No-Go

Go production nếu:

- Dev/test pass.
- Payment pass.
- Security smoke pass.
- Không còn P0/P1.
- Product owner duyệt.

No-go nếu:

- Có secret trong diff.
- Có KB private trong static artifact.
- Payment chưa test.
- Legal copy chưa duyệt.
- Rollback path chưa rõ.

