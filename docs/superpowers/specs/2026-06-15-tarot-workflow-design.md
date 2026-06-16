# Tarot Workflow Design

Date: 2026-06-15

## Goal

Xây dựng Tarot như một luồng trải nghiệm liền mạch theo tinh thần Mystery Tarot, nhưng giữ branding, component, và data flow riêng của Bản Mệnh V2.

## Scope

### In scope

- `/tarot` mở bằng hero/entry riêng.
- Chọn chủ đề lớn, rồi mở niche con trong cùng modal.
- Chọn / nhập câu hỏi.
- Chọn kiểu trải bài.
- Màn loading / nghi thức trước khi bốc bài.
- Bàn 78 lá để bốc.
- Màn hiển thị các lá đã bốc.
- Màn `Kết nối tâm thức` trước luận giải cuối.
- Màn luận giải cuối chỉ hiển thị các lá đã bốc và nội dung đọc bài, không có lưới 78 lá phụ.

### Out of scope

- KB Tarot thật.
- AI đọc bài.
- Lịch sử cloud.
- Payment / entitlement mới.
- Clone code, asset, hoặc endpoint của website tham chiếu.

## User Journey

### 1. Entry

User vào `/tarot`, thấy CTA `Bắt đầu hành trình`.

### 2. Chọn lĩnh vực

Hiện modal fullscreen với 5 chủ đề:

- Tình yêu
- Sự nghiệp
- Tài chính
- Sức khỏe
- Bản thân

Có thêm `Xem thêm` để mở nhóm niche mở rộng.

### 3. Chọn niche

Click một chủ đề lớn sẽ mở danh sách niche tương ứng ngay trong cùng modal.

Mỗi niche:

- có tên chính
- có mô tả ngắn
- có mũi tên hoặc affordance rõ ràng

Có tìm kiếm nhanh theo niche.

### 4. Nhập câu hỏi

Màn câu hỏi có 2 tab:

- Câu hỏi gợi ý
- Tự nhập

User có thể chọn câu hỏi mẫu hoặc tự nhập câu hỏi riêng.

### 5. Chọn kiểu trải bài

Hiện các lựa chọn:

- 1 lá
- 3 lá
- 5 lá
- 7 lá
- 10 lá
- 12 lá

Mỗi option có mô tả ngắn.

### 6. Loading / nghi thức

Sau khi xác nhận trải bài, hiện màn chuyển cảnh ngắn:

- câu hỏi đã chọn
- lời nhắc tập trung
- animation nhẹ kiểu nghi thức

### 7. Bàn 78 lá

Hiện toàn bộ deck úp.

User click từng lá để bốc.

Khi đủ số lá:

- khóa deck
- chuyển sang màn lá đã chọn

### 8. Hiển thị lá đã bốc

Hiển thị đúng số lá đã chọn.

Các lá ban đầu ở trạng thái úp, có thể mở theo tiến trình.

### 9. Kết nối tâm thức

Trước khi vào luận giải cuối, hiện một màn xác nhận chiều sâu câu hỏi:

- tiêu đề riêng
- một đoạn dẫn ngắn
- 3 câu hỏi kết nối tâm thức
- lựa chọn trả lời đơn giản

### 10. Luận giải cuối

Màn cuối chỉ có:

- tiêu đề câu hỏi
- danh sách lá đã bốc
- phần luận giải theo lá và theo spread
- CTA tiếp tục / xem lại / quay về

Không render lại grid 78 lá đầy đủ.

## State Machine

```text
landing
→ fieldSelect
→ nicheSelect
→ question
→ spreadSelect
→ ritualLoading
→ deckDraw
→ spreadReveal
→ consciousnessCheck
→ finalReading
```

## UX Rules

- Hover / focus phải có cursor bàn tay ở mọi option tương tác.
- Option chọn phải có highlight rõ.
- Mobile-first: mọi modal stack 1 cột khi cần.
- Không đổi trang liên tục nếu chưa cần.
- Không lồng nhiều lớp nội dung dư ở màn cuối.
- Copy user-facing 100% tiếng Việt có dấu.

## Implementation Notes

- Giai đoạn đầu chỉ dựng workflow shell và mock data.
- Chưa nối KB Tarot thật.
- Khi workflow ổn mới lắp KB vào các điểm:
  - nghĩa lá đơn
  - nghĩa theo vị trí
  - nhóm câu hỏi/niche
  - kết quả tổng hợp

