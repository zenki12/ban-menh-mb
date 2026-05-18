# HƯỚNG DẪN DÙNG TEMPLATE VIBE-CODING CHO NGƯỜI NON-TECH
> File này hướng dẫn cách dùng bộ template khi làm việc với Codex, Claude, Cursor hoặc IDE có AI. Bạn không cần hiểu sâu kỹ thuật; chỉ cần dùng đúng câu lệnh và đúng quy trình.

---

## 1. Bộ File Này Dùng Để Làm Gì?

Bộ template này giúp AI code có kỷ luật hơn.

Nếu không có template, AI rất dễ:

- Làm lan man ngoài yêu cầu.
- Tự đổi kiến trúc.
- Tự thêm code rác.
- Quên cập nhật tài liệu.
- Làm xong nhưng không test.
- Làm lộ secret/KB/dữ liệu nhạy cảm.
- Deploy nhầm production.

Bộ template này ép AI phải:

- Biết dự án là gì.
- Biết task nào đang làm.
- Biết khi nào được bắt đầu.
- Biết khi nào được coi là xong.
- Ghi lại đã làm gì.
- Ghi lại rủi ro và quyết định.
- Tách dev/test khỏi production.

---

## 2. Bộ File Chuẩn

```text
README.md
PROJECT_META.md
SYSTEM_PROMPT.md
FLOW.md
TASK_REGISTRY.md
DEVLOG.md
ADR.md
RISK_REGISTER.md
ENVIRONMENT.md
```

Nếu dự án có nhiều module, thêm:

```text
modules/
  module-1.md
  module-2.md
  module-3.md
```

---

## 3. Vai Trò Từng File

| File | Hiểu đơn giản là gì? | Khi nào mở? |
|------|----------------------|-------------|
| `README.md` | Luật dùng cả bộ template | Khi mới bắt đầu dự án |
| `PROJECT_META.md` | Hồ sơ gốc của dự án | Đọc đầu tiên |
| `SYSTEM_PROMPT.md` | Luật bắt buộc cho AI | Copy vào IDE/project rules |
| `FLOW.md` | Sơ đồ quy trình làm việc | Khi không biết bước tiếp theo |
| `TASK_REGISTRY.md` | Danh sách việc phải làm | Mỗi ngày |
| `DEVLOG.md` | Nhật ký đã làm gì | Sau mỗi task |
| `ADR.md` | Vì sao chọn kiến trúc này | Khi có quyết định lớn |
| `RISK_REGISTER.md` | Rủi ro có thể xảy ra | Khi phát hiện rủi ro |
| `ENVIRONMENT.md` | Dev/prod đang ở đâu | Khi deploy hoặc sửa ENV |

---

## 4. Quy Trình Mỗi Ngày

Mỗi lần muốn AI làm việc, đi theo 7 bước:

1. Mở IDE.
2. Nói AI đọc `SYSTEM_PROMPT.md`.
3. Nói AI đọc `TASK_REGISTRY.md`.
4. Chọn một task.
5. Cho AI làm đúng task đó.
6. Yêu cầu AI test/check.
7. Yêu cầu AI cập nhật `TASK_REGISTRY.md` và `DEVLOG.md`.

Câu lệnh mẫu:

```text
Đọc SYSTEM_PROMPT.md, PROJECT_META.md, README.md và TASK_REGISTRY.md.
Chọn task TODO tiếp theo đã đủ Definition of Ready.
Chưa sửa code.
Trước tiên tóm tắt cho tôi: task ID, bối cảnh, yêu cầu, output cần có, điều kiện Done và file cần đọc thêm.
```

Nếu bạn đồng ý:

```text
OK bắt đầu task đó.
Cập nhật TASK_REGISTRY.md status sang IN_PROGRESS.
Làm đúng phạm vi task, không mở rộng scope.
Sau khi xong, chạy check phù hợp, cập nhật DEVLOG.md và chuyển task sang IN_REVIEW.
```

Sau khi review ổn:

```text
Nếu đã đủ Definition of Done, cập nhật TASK_REGISTRY.md sang DONE.
Nếu có quyết định kiến trúc thì cập nhật ADR.md.
Nếu có rủi ro thì cập nhật RISK_REGISTER.md.
Nếu có deploy/env thì cập nhật ENVIRONMENT.md.
```

---

## 5. Khi Làm Một Task Cụ Thể

```text
Làm task P2.3 trong TASK_REGISTRY.md.
Trước khi sửa code, đọc SYSTEM_PROMPT.md, PROJECT_META.md, README.md, TASK_REGISTRY.md và các file liên quan.
Tóm tắt lại phạm vi task, output cần có và điều kiện Done.
Chờ tôi xác nhận rồi mới implement.
```

Sau khi AI tóm tắt đúng:

```text
OK implement.
Không làm ngoài scope.
Sau khi xong, chạy test/check phù hợp, cập nhật TASK_REGISTRY.md và DEVLOG.md.
Nếu phát sinh rủi ro hoặc quyết định kiến trúc thì cập nhật file tương ứng.
```

---

## 6. Khi Thêm Feature Mới

```text
Tôi muốn thêm feature: [mô tả feature].
Đừng code ngay.
Hãy kiểm tra PROJECT_META.md, TASK_REGISTRY.md, RISK_REGISTER.md và module spec liên quan nếu có.
Cho tôi biết:
1. Feature này có nằm trong scope không?
2. Thuộc module nào?
3. Có ảnh hưởng API/data/payment/KB/AI không?
4. Cần tạo task mới nào?
5. Có cần ADR hoặc RISK_REGISTER không?
```

Nếu bạn đồng ý:

```text
OK tạo task mới trong TASK_REGISTRY.md.
Chưa code.
Sau khi tôi duyệt task thì mới implement.
```

---

## 7. Khi Sửa Bug

```text
Có bug: [mô tả bug].
Đọc SYSTEM_PROMPT.md, TASK_REGISTRY.md, DEVLOG.md gần nhất và file module liên quan.
Đừng sửa code ngay.
Trước tiên phân tích:
1. Nguyên nhân có thể là gì?
2. Ảnh hưởng module nào?
3. Có rủi ro bảo mật/payment/KB/PII không?
4. Nên tạo task bugfix nào trong TASK_REGISTRY.md?
```

Khi bạn duyệt:

```text
OK sửa bug.
Làm thay đổi nhỏ nhất đủ fix lỗi.
Không refactor ngoài scope.
Sau khi sửa, chạy check liên quan và cập nhật DEVLOG.md.
```

---

## 8. Khi Đụng Payment / Voucher

```text
Task này liên quan payment/voucher.
Đọc SYSTEM_PROMPT.md, TASK_REGISTRY.md, RISK_REGISTER.md, ENVIRONMENT.md và DEVLOG.md.
Chưa code.
Trước tiên liệt kê các case bắt buộc phải test:
- payment success
- payment expired
- webhook replay
- amount mismatch
- voucher disabled
- unauthorized admin
Sau đó chờ tôi xác nhận.
```

Chỉ khi bạn duyệt:

```text
OK implement trên DEV/TEST.
Không deploy production.
Sau khi xong, ghi FULL Security Audit trong DEVLOG.md.
```

---

## 9. Khi Deploy

DEV/TEST:

```text
Chuẩn bị deploy DEV/TEST.
Đọc SYSTEM_PROMPT.md, ENVIRONMENT.md, FLOW.md, TASK_REGISTRY.md và DEVLOG.md.
Không deploy production.
Trước tiên liệt kê checklist pre-deploy, command sẽ chạy và cách verify sau deploy.
```

Production:

```text
Chuẩn bị production deploy.
Không deploy ngay.
Trước tiên xác nhận:
1. Task liên quan đã DONE chưa?
2. DEV/TEST đã verify chưa?
3. Có risk CRITICAL/HIGH đang OPEN không?
4. Rollback plan là gì?
5. Smoke test production gồm những gì?
Chờ tôi xác nhận rồi mới deploy.
```

---

## 10. Khi Dùng Claude Audit

Sau khi Codex làm xong task và chuyển `IN_REVIEW`, gửi cho Claude:

```text
Bạn là auditor/QC, không sửa code.
Hãy review task [ID] dựa trên:
- PROJECT_META.md
- SYSTEM_PROMPT.md
- TASK_REGISTRY.md
- DEVLOG.md entry mới nhất
- Các file code/docs liên quan

Kiểm tra:
1. Có làm ngoài scope không?
2. Output có khớp TASK_REGISTRY không?
3. DoD đã đủ chưa?
4. Có code smell/tech debt không?
5. Có rủi ro security/PII/payment/KB/AI không?
6. Có thiếu cập nhật ADR/RISK/ENV không?

Trả findings theo severity: CRITICAL/HIGH/MEDIUM/LOW.
Không sửa code.
```

Nếu Claude có findings, đưa lại cho Codex:

```text
Đây là audit findings từ Claude.
Hãy xử lý các finding CRITICAL/HIGH trước.
Không mở rộng scope.
Sau khi sửa, cập nhật DEVLOG.md phần audit result.
```

---

## 11. Câu Lệnh Kết Thúc Task

```text
Trước khi kết thúc task, tự kiểm tra:
1. Có làm ngoài scope không?
2. Output có khớp TASK_REGISTRY không?
3. Definition of Done đã tick đủ chưa?
4. Có phát sinh tech debt/code smell không?
5. Có rủi ro bảo mật/KB/PII/payment/AI không?
6. Đã cập nhật DEVLOG.md chưa?
7. Có cần cập nhật ADR/RISK_REGISTER/ENVIRONMENT không?

Nếu thiếu mục nào thì xử lý trước, chưa được báo DONE.
```

---

## 12. Quy Tắc Dễ Nhớ

```text
Trước khi làm: TASK_REGISTRY
Trong khi làm: SYSTEM_PROMPT + FLOW
Làm xong: DEVLOG
Đổi kiến trúc: ADR
Có rủi ro: RISK_REGISTER
Deploy/ENV: ENVIRONMENT
Thông tin gốc: PROJECT_META
```

