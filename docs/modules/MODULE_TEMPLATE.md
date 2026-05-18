# MODULE SPEC — [Tên Module]
> **Mục đích:** Mô tả biên giới, scope, dữ liệu, API và rủi ro riêng của một module. Dùng file này khi dự án có nhiều module lớn/nhỏ để tránh AI trộn logic giữa các module.
>
> **Định dạng thời gian:** `YYYY-MM-DD HH:mm +07`

---

## 1. Thông Tin Module

| Trường | Nội dung |
|--------|----------|
| **Tên module** | [Tên module] |
| **ID / Code name** | [module-id] |
| **Owner** | Codex / [Tên người] |
| **Review owner** | Claude / Self-review / [Tên người] |
| **Status** | `TODO` \| `IN_PROGRESS` \| `IN_REVIEW` \| `DONE` \| `PAUSED` |
| **Liên quan task** | P1.1, P2.3, ... |

---

## 2. Purpose

> Module này giải quyết việc gì cho user/business?

[Mô tả ngắn gọn]

---

## 3. In Scope

- [ ] [Tính năng thuộc module]
- [ ] [Tính năng thuộc module]

---

## 4. Out Of Scope

> Ghi rõ những gì module này KHÔNG làm để tránh scope creep.

- [Không làm gì — lý do]
- [Không làm gì — lý do]

---

## 5. User Journey

1. [User làm bước 1]
2. [User làm bước 2]
3. [Kết quả mong muốn]

---

## 6. Data Ownership

> Module này sở hữu dữ liệu nào? Module khác có được đọc/ghi không?

| Entity / Collection | Owner | Ai được đọc | Ai được ghi | Ghi chú |
|---------------------|-------|-------------|-------------|--------|
| [entity] | [module] | [role/module] | [role/module] | |

---

## 7. API / Interface

> Endpoint, event, function hoặc interface mà module expose.

| Interface | Input | Output | Auth required? | Ghi chú |
|----------|-------|--------|----------------|--------|
| `GET /api/...` | ... | ... | Yes/No | |

---

## 8. Dependencies

Module này phụ thuộc:

- [Module/service 1]
- [Module/service 2]

Module này được module khác dùng bởi:

- [Module 1]
- [Module 2]

Dependency bị cấm:

- [Module/service không được import/gọi trực tiếp]

---

## 9. Acceptance Criteria

- [ ] [Điều kiện đo được]
- [ ] [Điều kiện đo được]
- [ ] Không làm ngoài scope module.
- [ ] Không vi phạm data ownership.

---

## 10. Risks

| Risk | Severity | Mitigation | Link RISK_REGISTER |
|------|----------|------------|--------------------|
| [Rủi ro] | LOW/MEDIUM/HIGH/CRITICAL | [Giảm thiểu] | R-xxx |

---

## 11. Security / Privacy Notes

- [ ] Module có đụng PII không?
- [ ] Module có đụng payment không?
- [ ] Module có đụng private KB không?
- [ ] Module có gọi AI/third-party không?
- [ ] Module có cần rate limit không?

Nếu tick bất kỳ mục nhạy cảm nào, task liên quan phải dùng FULL security audit trong `DEVLOG.md`.

---

## 12. Current Status / Notes

| Ngày & Giờ | Cập nhật | Người ghi |
|------------|----------|-----------|
| YYYY-MM-DD HH:mm +07 | Tạo module spec | — |

