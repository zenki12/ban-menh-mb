# Bản Mệnh V2 PRD MVP

Ngày cập nhật: 2026-05-13

Mục tiêu của MVP: rebuild nền tảng Bản Mệnh theo hướng nhỏ, chắc, thương mại hóa được, không cố làm đầy đủ tất cả module ngay từ đầu.

## 1. Nguyên Tắc Scope

- Chỉ build phần có thể bán, đo được, vận hành được.
- Không đưa tính năng vào MVP nếu chưa có owner nội dung, owner vận hành và tiêu chí test.
- Không public KB private trong static frontend.
- Không dùng payment/entitlement chỉ dựa vào localStorage.
- Mọi thay đổi tiền/quyền truy cập phải do backend quyết định.

## 2. MVP Bao Gồm

### Hub

- Trang chủ/hub chính tại `/`.
- Hiển thị các module: Thần số học, Tarot.
- Mỗi module dẫn sang route riêng.
- Header/footer thống nhất.
- CTA pricing/account rõ ràng.

### Account

- Đăng nhập Google.
- Xem quyền đã mua.
- Xem lịch sử mua hàng cơ bản.
- Xem lại báo cáo Thần số học đã mua.

### Thần Số Học

- Route `/than-so-hoc`.
- Form nhập họ tên, tên thường dùng, giới tính, ngày sinh.
- Kết quả free giới hạn.
- CTA nâng cấp rõ ràng.
- Payment 49.000đ cho 1 bản luận giải.
- Sau payment success, tự unlock đúng report đã mua.
- User xem lại report trong account.

### Tarot MVP

- Route `/tarot`.
- Landing Tarot riêng.
- Daily Message cơ bản.
- Reading Wizard tối thiểu: chọn chủ đề, nhập câu hỏi, chọn spread 1 hoặc 3 lá.
- Trải bài có shuffle/chọn/flip.
- Kết quả gồm: tổng quan, ý nghĩa từng lá, trả lời câu hỏi, lời khuyên.
- Lịch sử local giới hạn.
- Pricing của V2 thiết kế mới theo module/tier.

### Payment

- Tạo QR PayOS.
- Check trạng thái thanh toán.
- Webhook idempotent.
- Telegram alert cho payment success và lỗi nghiêm trọng.
- Voucher fixed amount và percentage.
- Admin voucher qua API có auth token.

### Security

- Dev/test và production tách riêng.
- Security smoke test trước deploy.
- Không có secret trong repo.
- Không có KB private trong static artifact.

## 3. Không Thuộc MVP

- Tarot 5/7/10/12 lá.
- Manual Spread Analyzer.
- Cloud Tarot history.
- Tarot community top topics nếu chưa có event tracking chuẩn.
- Subscription tự động gia hạn.
- Admin UI voucher trên web.
- Mobile app native.
- Multi-language.
- AI cá nhân hóa nâng cao, trừ khi cập nhật legal copy và privacy.

## 4. Success Metrics

- Free user có thể hoàn tất một lượt tra cứu Thần số học không lỗi.
- Paid user thanh toán xong được unlock trong vòng 5 giây sau khi PayOS xác nhận.
- Payment webhook không tạo entitlement trùng khi nhận callback lặp.
- 0 KB private xuất hiện trong static build.
- 0 secret/token xuất hiện trong git diff.
- Tối thiểu 95% flow chính pass trong checklist trước production deploy.

## 5. MVP Release Gate

Chỉ được go-live production khi:

- `screen-spec.md` đã được đối chiếu với UI thật.
- `data-contract.md` đã khớp với backend thật.
- `security-threat-model.md` không còn P0/P1 mở.
- `release-runbook.md` đã test ít nhất một lần trên dev/test.
- Product owner duyệt copy legal, pricing và refund policy.

