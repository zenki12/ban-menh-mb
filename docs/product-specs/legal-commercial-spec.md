# Bản Mệnh V2 Legal & Commercial Spec

Ngày cập nhật: 2026-05-13

Tài liệu này không thay thế tư vấn luật sư. Đây là spec sản phẩm để tránh claim sai, thiếu disclaimer hoặc vận hành thanh toán mập mờ.

## 1. Nguyên Tắc

- Nội dung huyền học chỉ mang tính tham khảo/tự phản tỉnh.
- Không claim chắc chắn tương lai, chữa bệnh, cam kết tài chính hoặc thay thế chuyên gia.
- Giá, quyền truy cập, thời hạn, hoàn tiền phải rõ trước khi user thanh toán.
- MVP hiện tại chốt hướng non-AI cho phần luận giải Tarot.
- Nếu sau này dùng AI, phải nói rõ trong Privacy/Terms và không claim “Không AI”.

## 2. Disclaimer Bắt Buộc

Đặt ở footer, trang kết quả và Terms:

```text
Nội dung trên Bản Mệnh chỉ mang tính tham khảo, hỗ trợ tự phản tỉnh và giải trí có định hướng. Kết quả không thay thế tư vấn y tế, tâm lý, pháp lý, tài chính hoặc các quyết định chuyên môn. Bạn chịu trách nhiệm với các quyết định cá nhân của mình.
```

Không được dùng:

- “Chính xác tuyệt đối”.
- “Cam kết thay đổi vận mệnh”.
- “Đảm bảo giàu có/kết hôn/thăng chức”.
- “Chẩn đoán bệnh”.
- “Tư vấn tài chính/pháp lý chuyên nghiệp”.

## 3. Privacy Requirements

Dữ liệu có thể thu thập:

- Email/tên tài khoản Google.
- Họ tên khai sinh.
- Tên thường dùng/biệt danh.
- Ngày sinh.
- Giới tính.
- Câu hỏi Tarot.
- Lịch sử thanh toán.
- Lịch sử report/reading nếu user đăng nhập.

Privacy copy phải nói rõ:

- Thu thập dữ liệu gì.
- Dùng để làm gì.
- Lưu trong bao lâu.
- Ai có quyền truy cập.
- Có gửi sang bên thứ ba không.
- User yêu cầu xóa dữ liệu như thế nào.

MVP hiện tại dùng hướng non-AI:

```text
Kết quả được tạo từ hệ thống công thức và kho tri thức nội bộ của Bản Mệnh, không sử dụng AI tạo sinh cho phần luận giải này.
```

Nếu sau này dùng AI provider:

```text
Một số nội dung có thể được xử lý bởi nhà cung cấp AI bên thứ ba để hỗ trợ cá nhân hóa diễn giải. Bản Mệnh không gửi thông tin thanh toán hoặc admin secret sang các nhà cung cấp này.
```

Không được để hai claim mâu thuẫn. Nếu bật AI sau này, phải cập nhật Privacy/Terms trước khi deploy production.

## 4. Terms Requirements

Terms cần có:

- Mô tả dịch vụ.
- Điều kiện sử dụng.
- Tài khoản và bảo mật tài khoản.
- Thanh toán.
- Voucher/khuyến mại.
- Chính sách hoàn tiền.
- Giới hạn trách nhiệm.
- Quyền sở hữu nội dung/KB.
- Hành vi bị cấm.
- Cách liên hệ hỗ trợ.

## 5. Refund Policy

Đề xuất chính sách rõ và dễ vận hành:

```text
Với sản phẩm luận giải số được mở khóa ngay sau thanh toán, Bản Mệnh chỉ hỗ trợ hoàn tiền khi có lỗi kỹ thuật khiến bạn không thể truy cập nội dung đã mua và đội ngũ hỗ trợ không thể khắc phục trong thời gian hợp lý.
```

Cần nói rõ:

- Không hoàn tiền vì user “không thấy đúng”.
- Có hỗ trợ nếu thanh toán thành công nhưng không unlock.
- Thời hạn gửi yêu cầu hỗ trợ: ví dụ 7 ngày từ lúc thanh toán.
- Kênh hỗ trợ: Zalo/email.

## 6. Voucher Policy

Voucher phải hiển thị rõ:

- Mã voucher.
- Giá trị giảm.
- Module áp dụng.
- Thời hạn.
- Giới hạn số lượt.
- Giới hạn mỗi user nếu có.

Thông báo lỗi chuẩn:

- “Mã voucher không tồn tại.”
- “Mã voucher đã hết hạn.”
- “Mã voucher đã hết lượt sử dụng.”
- “Mã voucher không áp dụng cho gói này.”
- “Bạn đã dùng mã này trước đó.”

## 7. Pricing Copy

Giá chính thức và copy pricing đến từ `packages/shared/src/pricing.ts` (T-0401). File này là nguồn sự thật duy nhất. Tài liệu này phải phản ánh đúng giá đã chốt trong code.

Thần số học:

- "99.000₫ / 1 báo cáo".
- "Mở khóa vĩnh viễn cho hồ sơ đã mua".
- Không dùng chữ "không giới hạn" nếu chỉ áp dụng cho một report.

Tarot:

- Phiên 1 lá: "49.000₫ / phiên".
- Phiên 3 lá: "79.000₫ / phiên".
- Không hứa quyền/gói ngoài scope trong V2 nếu chưa có chính sách riêng được user approve.
- Nếu có monthly tier, phải ghi rõ là theo tháng.
- Nếu chưa có auto-renew, không gọi là subscription tự động.

Combo:

- "Gói Khám phá: 249.000₫".
- Bao gồm: 1 báo cáo Thần số học (vĩnh viễn) + 2 phiên Tarot 3 lá (90 ngày).
- Phải ghi rõ thời hạn 90 ngày cho phần phiên Tarot, không gây hiểu nhầm vĩnh viễn.

Lưu ý chung:

- Mọi thay đổi giá phải đồng bộ giữa `pricing.ts` và section này.
- Giá hiện tại là placeholder pre-launch; sẽ được rà soát chính thức ở T-0801 trước khi mở payment thật.

## 8. Commercial Risk Checklist

```text
[ ] Giá hiển thị trước khi thanh toán
[ ] Số tiền QR đúng sau voucher
[ ] Quyền nhận được sau thanh toán rõ ràng
[ ] Refund policy có trên Terms
[ ] Disclaimer có trên footer/result
[ ] Không claim quá mức
[ ] AI/non-AI claim nhất quán với implementation thật
[ ] Voucher policy rõ
[ ] Contact support rõ
```
