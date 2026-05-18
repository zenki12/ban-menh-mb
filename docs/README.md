# PROJECT MANAGEMENT TEMPLATE SYSTEM
> **Phiên bản template:** v2.1
> **Cập nhật lần cuối:** 2026-05-14 01:10 +07
> **Dành cho:** Dự án tầm trung đến phức tạp — solo dev hoặc team nhỏ — bao gồm vibe-coding / AI-assisted development

---

## Quy ước dùng cho Bản Mệnh V2

- Project root chính thức: `E:\Project\Project\banmenh`.
- Tài liệu/spec/đặc tả nằm trong: `E:\Project\Project\banmenh\docs`.
- Khi đang làm tài liệu, chỉ cập nhật file trong `docs`; không code, không build, không chạy dev server, không deploy.
- Khi bắt đầu implementation, phải chọn task trong `TASK_REGISTRY.md`, xác nhận với user, rồi mới sửa code trong project root.
- Code/scaffold/build chưa được task hóa và chưa ghi `DEVLOG.md` thì chưa được coi là chính thức.

---

## Bộ file và vai trò

| File | Vai trò | Cập nhật khi nào |
|------|---------|-----------------|
| `README.md` | File này — hướng dẫn dùng cả hệ thống | Khi quy trình thay đổi |
| `PROJECT_META.md` | Thông tin gốc của dự án, stack, team, scope | Khi project info thay đổi |
| `SYSTEM_PROMPT.md` | Luật bắt buộc cho AI agent | Khi rule làm việc thay đổi |
| `FLOW.md` | Sơ đồ quy trình vận hành | Khi workflow thay đổi |
| `TASK_REGISTRY.md` | Theo dõi tất cả phase và task | Liên tục trong suốt dự án |
| `DEVLOG.md` | Nhật ký chi tiết sau mỗi task/phase | Sau mỗi task DONE, hotfix, scope change |
| `ADR.md` | Quyết định kiến trúc quan trọng | Khi có quyết định tech không hiển nhiên |
| `RISK_REGISTER.md` | Rủi ro tiềm tàng và kế hoạch đối phó | Khi phát hiện risk mới, sau mỗi phase |
| `ENVIRONMENT.md` | Cấu hình và lịch sử deploy 2 môi trường | Sau mỗi lần deploy, khi config thay đổi |
| `VIBE_CODING_GUIDE_NON_TECH.md` | Hướng dẫn thao tác cho người non-tech | Khi cần cập nhật cách dùng template |
| `modules/MODULE_TEMPLATE.md` | Template spec cho từng module | Khi dự án có nhiều module |

---

## Sơ đồ quan hệ giữa các file

```
PROJECT_META.md          ← Đọc đầu tiên, context cho mọi file còn lại
      │
      ▼
SYSTEM_PROMPT.md         ← Luật bắt buộc cho AI agent
      │
      ▼
TASK_REGISTRY.md         ← Trung tâm: mọi việc cần làm
      │
      ├──[khi task DONE]──────► DEVLOG.md          ← Ghi lại chi tiết
      │                               │
      ├──[quyết định lớn]─────► ADR.md             ← Quyết định kiến trúc
      │                               │
      ├──[risk mới]───────────► RISK_REGISTER.md   ← Rủi ro tiềm tàng
      │                               │
      └──[deploy]─────────────► ENVIRONMENT.md     ← Trạng thái môi trường

FLOW.md                  ← Sơ đồ quy trình, dùng khi không chắc bước tiếp theo
```

**Cross-reference chuẩn:**
- Task ref: `P1.2` (Phase.Task)
- ADR ref: `ADR-001`
- Risk ref: `R-001`
- Tech Debt ref: `TD-20260514-001`
- Incident ref: `INC-001`
- Scope Change ref: `SC-001`

---

## Vòng đời 1 task — thứ tự update file

```
0. Đọc `PROJECT_META.md`, `SYSTEM_PROMPT.md`, `FLOW.md`

1. Tạo task trong TASK_REGISTRY.md
   └─ Điền: Bối cảnh, Yêu cầu, Output, Goal, DoR, DoD

2. Trước khi START → tick DoR
   └─ Nếu chưa đủ DoR: BLOCKED, ghi lý do

3. Làm task → IN_PROGRESS

4. Xong → tick DoD
   └─ Nếu có quyết định kiến trúc lớn → ghi vào ADR.md
   └─ Nếu phát sinh risk mới → ghi vào RISK_REGISTER.md
   └─ Nếu có deploy → update ENVIRONMENT.md (Deployment History)

5. Viết entry vào DEVLOG.md
   └─ Ghi KB Notes vào section KB Index ở cuối DEVLOG

6. Mark DONE trong TASK_REGISTRY.md
   └─ Update Dashboard + BLOCKED section
```

---

## Vòng đời 1 phase — thứ tự update file

```
1. Khi tất cả tasks DONE/SKIPPED:
   a. Review RISK_REGISTER.md — update status các risk liên quan
   b. Review ADR.md — có ADR nào cần review theo điều kiện không?
   c. Viết Phase Retrospective vào DEVLOG.md
      └─ Bao gồm Project Health Snapshot
   d. Update ENVIRONMENT.md nếu phase có deploy production
   e. Tick Phase Exit Criteria trong TASK_REGISTRY.md
   f. Mark phase DONE, update Dashboard
```

---

## Khi có Hotfix production

```
1. Tạo entry loại Hotfix trong DEVLOG.md NGAY (ngay cả khi đang fix)
2. Fix xong → deploy → verify
3. Update ENVIRONMENT.md (Deployment History)
4. Nếu root cause là risk đã biết → update RISK_REGISTER.md (OCCURRED)
5. Nếu root cause là tech debt → link TD-xxx
6. Tạo task follow-up trong TASK_REGISTRY.md để prevent recurrence
```

---

## Khi scope thay đổi

```
1. Ghi vào Scope Change Log trong DEVLOG.md (SC-xxx)
2. Update tasks bị ảnh hưởng trong TASK_REGISTRY.md
3. Nếu thay đổi lớn → tạo ADR mới hoặc update ADR cũ
4. Assess risk mới nếu có → RISK_REGISTER.md
```

---

## Quy tắc .gitignore

**KHÔNG commit lên git:**
- Giá trị thật của `.env`, `.env.local`, `.env.production`
- File nào chứa API keys, passwords, secrets

**CÓ THỂ commit (không chứa giá trị thật):**
- `ENVIRONMENT.md` — chỉ chứa tên biến và nơi lưu, không có giá trị
- `PROJECT_META.md` — không chứa secrets
- Tất cả file template còn lại

**Gợi ý `.gitignore`:**
```
.env
.env.local
.env.production
.env.*.local
```

---

## Vibe-coding / AI-assisted development

Bộ template này có các phần đặc biệt cho AI-generated code:

**Trong `TASK_REGISTRY.md`:**
- Field "AI Tools Used" trong task metadata
- DoD có checklist riêng cho AI-generated code

**Trong `DEVLOG.md`:**
- Section "AI Code Notes" trong mỗi task entry
- Quick Audit mode khi task 100% AI-generated

**Nguyên tắc vàng cho vibe-coding:**
1. AI sinh code nhanh → tech debt tích lũy nhanh → ghi vào DEVLOG thành thật hơn
2. Luôn verify output AI trước khi mark DONE (AI hallucinate APIs)
3. Lưu lại prompt quan trọng để reproduce sau này
4. AI-generated code cần review kỹ hơn vì không có "người hiểu đầy đủ context"
5. Codex mặc định là implementation lead; Claude mặc định là auditor/QC nếu dùng cả hai
6. Không để cả hai agent cùng sửa một file hoặc cùng một module trong cùng thời điểm nếu chưa phân quyền rõ

## Codex + Claude workflow đề xuất

| Agent | Vai trò chính | Được làm | Không được làm |
|-------|---------------|----------|----------------|
| Codex | Project lead / implementation owner | Chọn task, implement, test, cập nhật docs, đề xuất ADR | Tự deploy production, tự đổi scope lớn, tự mark DONE khi chưa đủ DoD |
| Claude | Auditor / QC reviewer | Review scope, code quality, security, KB/PII/payment, docs consistency | Deploy, giữ secret, tự sửa code chính nếu chưa được giao |
| User | Product owner / final approver | Chốt scope, pricing, legal, production deploy, quyết định cuối | Không cần tự đọc code chi tiết nếu audit/checklist đã rõ |

Luồng chuẩn:

```text
Codex làm task → IN_REVIEW → Claude audit → Codex fix findings → DEVLOG → DONE
```

---

## Timezone chuẩn

Tất cả timestamp trong bộ template dùng: `YYYY-MM-DD HH:mm +07`

Ví dụ: `2026-05-14 02:30 +07`

Lý do: khi debug incident, server logs thường ở UTC. Ghi rõ timezone giúp so sánh chính xác.

---

## Archiving strategy

| File | Khi nào archive | Cách archive |
|------|----------------|--------------|
| DEVLOG.md | Sau mỗi Phase Retro | Move task entries của phase đó sang `DEVLOG_ARCHIVE_PX.md` |
| ENVIRONMENT.md Deployment History | Khi vượt 30 entries | Move entries cũ sang `DEPLOY_HISTORY_ARCHIVE.md` |
| TASK_REGISTRY.md | Khi phase DONE | Giữ nguyên nhưng collapse phase cũ |

---

## Template versioning

| Version | Ngày | Thay đổi chính |
|---------|------|----------------|
| v1.0 | 2026-05-13 | Tạo ban đầu: TASK_REGISTRY, DEVLOG |
| v1.1 | 2026-05-13 | Thêm ADR, RISK_REGISTER, ENVIRONMENT |
| v2.0 | 2026-05-14 | Fix 70 issues, thêm README và PROJECT_META, vibe-coding support |
| v2.1 | 2026-05-14 | Thêm SYSTEM_PROMPT, FLOW vào core workflow, thêm hướng dẫn non-tech và vai trò Codex/Claude |

**Khi nâng cấp template cho project đang chạy:**
- Đọc changelog
- Chỉ thêm section mới, không xóa data cũ
- Ghi vào DEVLOG loại `Correction`: "Updated template từ vX.Y lên vA.B"
