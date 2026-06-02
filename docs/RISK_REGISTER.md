# RISK_REGISTER - Bản Mệnh V2

## 1. Cách dùng

- Mỗi rủi ro phải có owner, mức độ, trạng thái và hành động giảm thiểu.
- Khi task liên quan đến security/payment/KB xong, phải cập nhật file này.
- Không đóng rủi ro nếu chưa có bằng chứng kiểm tra.

## 2. Risk Dashboard

| ID | Risk | Area | Severity | Status | Owner | Mitigation |
|---|---|---|---|---|---|---|
| R-001 | KB thần số học bị public trong bundle/static asset | KB/Security | Critical | Open | Codex/User | Chỉ lưu KB private backend, smoke test URL public |
| R-002 | Secret/admin token bị commit vào repo | Security | Critical | Open | User/Codex | Secret scanning, không ghi secret vào docs, dùng env/secret store |
| R-003 | Thanh toán thành công nhưng không unlock entitlement | Payment | High | Open | Codex | Idempotent webhook, verify amount/order/user/module |
| R-004 | Webhook bị replay hoặc giả mạo | Payment/Security | High | Open | Codex | Verify checksum, order status, amount, idempotency |
| R-005 | V2 vô tình phụ thuộc/copy lại code hoặc hạ tầng ngoài scope | Architecture/Process | High | Open | Codex/User | V2 dùng project, DB/storage, worker và payment boundary mới; không copy code/hạ tầng ngoài scope |
| R-006 | Nội dung Tarot nói quá claim hoặc gây hiểu nhầm | Legal/Content | Medium | Open | User/Claude | Content guideline, disclaimer, không cam kết chắc chắn |
| R-007 | Voucher test/campaign bị lạm dụng | Payment | Medium | Open | User/Codex | maxUses, perUserLimit, expiresAt, audit log |
| R-008 | Agent code vượt scope gây phình app/tech debt | Process | High | Open | Codex/Claude | TASK_REGISTRY, review diff, no task no code |
| R-009 | Dev/Test dùng nhầm production key | Environment | High | Open | User/Codex | ENVIRONMENT rõ ràng, prefix env, deploy checklist |
| R-010 | PII người dùng lưu/log quá mức cần thiết | Privacy | High | Open | Codex | Data minimization, mask logs, retention policy |
| R-011 | Import KB/design sai cách làm lộ tài sản lõi | KB/Security | Critical | Open | Codex/User | KB chỉ import vào private storage/API layer; design asset kiểm tra license/quyền dùng trước khi đưa vào repo |
| R-012 | Copy nhầm logic/workflow V1 khi chỉ được lấy visual/KB | Process/Architecture | High | Open | Codex/Claude | Design extraction spec và KB extraction plan phải được dùng trước khi code; review diff không cho copy app logic cũ |
| R-013 | Dùng workflow/asset Tarot tham chiếu vượt quá quyền cho phép | Legal/Content | High | Open | User/Claude | Mystery Tarot/TAROT-vibe chỉ là workflow reference; asset/code/branding cần license rõ trước khi dùng |
| R-014 | Công thức numerology V2 có thể lệch V1 ngoài 3 challenge indicators đã fix | Numerology/KB | Medium | Open | Codex/Claude | Audit toàn bộ formula report.ts/indicators.ts với V1 engine.browser.js; thêm regression tests theo từng nhóm chỉ số |

## 3. Review cadence

- Review nhanh sau mỗi task có thay đổi code.
- Review đầy đủ cuối mỗi phase.
- Review bắt buộc trước production deploy.
