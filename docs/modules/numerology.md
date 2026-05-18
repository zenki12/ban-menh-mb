# Module: Thần số học

## Purpose

Tra cứu và bán báo cáo thần số học cá nhân hóa, với bản miễn phí giới hạn và bản trả phí đầy đủ.

## Current Status

MVP core

## Scope

- Form nhập thông tin cá nhân tối thiểu.
- Báo cáo miễn phí có giới hạn nội dung.
- Báo cáo trả phí mở khóa 30 chỉ số/nội dung đầy đủ.
- Payment 49.000đ/lượt tra cứu.
- KB thần số học phải nằm ở private backend/storage.

## Out of Scope

- Không tự mở rộng ngoài TASK_REGISTRY.
- Không thêm payment/AI/storage mới nếu chưa có ADR hoặc task rõ.

## Data Model

- Sẽ được chi tiết trong `docs/product-specs/data-contract.md`.
- Mọi thay đổi data model phải cập nhật ADR nếu ảnh hưởng kiến trúc.

## API / Interface

- Frontend chỉ gọi API/module service đã định nghĩa.
- Không đọc trực tiếp KB/private storage từ client.

## Dependencies

- Auth/account state.
- Payment/entitlement nếu module có nội dung trả phí.
- Logging/audit với các thao tác nhạy cảm.

## Acceptance Criteria

- Có UI/UX rõ theo module.
- Có test/smoke cho luồng chính.
- Không lộ secret/KB trong client/static asset.
- Cập nhật DEVLOG và RISK_REGISTER sau task liên quan.

## Risks

- KB bị lộ qua frontend bundle.
- Sai entitlement sau thanh toán.
- Lưu/log quá nhiều PII.
