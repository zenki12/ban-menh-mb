# Module: Bát tự

## Purpose

Module tương lai cho Bát tự, chưa thuộc MVP.

## Current Status

Paused / Future

## Scope

- Giữ placeholder spec để không làm lẫn scope MVP.

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

- Scope creep nếu triển khai trước khi core ổn.
