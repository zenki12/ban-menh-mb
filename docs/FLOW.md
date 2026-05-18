# FLOW — Sơ Đồ Vận Hành Dự Án
> Đọc file này để hiểu toàn bộ quy trình vận hành. Render tốt nhất trên: **Obsidian, GitHub, GitLab, VSCode (Markdown Preview Mermaid)**

---

## 1. TỔNG QUAN VÒNG ĐỜI DỰ ÁN

```mermaid
flowchart TD
    START([🚀 Khởi động dự án]) --> INIT

    subgraph INIT ["📋 Khởi tạo — Làm 1 lần duy nhất"]
        direction TB
        F1[Điền PROJECT_META.md\nTên, stack, team, scope, budget] --> F2
        F2[Lập TASK_REGISTRY.md\nChia phases + tasks] --> F3
        F3[Ghi risks ban đầu\nvào RISK_REGISTER.md] --> F4
        F4[Ghi ADRs đầu tiên\nvào ADR.md] --> F5
        F5[Setup ENVIRONMENT.md\nCấu hình 2 môi trường]
    end

    INIT --> PHASE_LOOP

    subgraph PHASE_LOOP ["🔄 Vòng lặp Phase"]
        direction TB
        PH_START([Bắt đầu Phase]) --> TASK_LOOP
        TASK_LOOP[⚙️ Làm task\nxem Flow 2] --> CHECK_TASKS{Còn task\nchưa xong?}
        CHECK_TASKS -->|Có| TASK_LOOP
        CHECK_TASKS -->|Không| CLOSE_PHASE[🏁 Đóng Phase\nxem Flow 4]
        CLOSE_PHASE --> CHECK_PHASES{Còn phase\ntiếp theo?}
        CHECK_PHASES -->|Có| PH_START
    end

    CHECK_PHASES -->|Không| DONE([✅ Project Done / Launch])

    TASK_LOOP -.->|"🚨 Incident"| HOTFIX[⚡ Hotfix\nxem Flow 3]
    HOTFIX -.-> TASK_LOOP
    TASK_LOOP -.->|"📐 Scope thay đổi"| SCOPE[📐 Scope Change\nxem Flow 5]
    SCOPE -.-> TASK_LOOP

    style INIT fill:#e8f4fd,stroke:#2196F3
    style PHASE_LOOP fill:#f3f9f1,stroke:#4CAF50
    style DONE fill:#e8f5e9,stroke:#4CAF50
    style HOTFIX fill:#fff3e0,stroke:#FF9800
    style SCOPE fill:#fce4ec,stroke:#E91E63
```

---

## 2. TASK LIFECYCLE — Vòng đời một task

```mermaid
flowchart TD
    CREATE["📝 Tạo task\nTASK_REGISTRY.md\nĐiền đủ: Type, DoR, Bối cảnh,\nYêu cầu, Output, Goal, DoD"] --> DOR

    DOR{"✅ Tick đủ\nDefinition of Ready?"}
    DOR -->|"❌ Chưa đủ"| BLOCKED["🔴 Status: BLOCKED\n— Ghi vào bảng ⚠️ BLOCKED\n— Ghi lý do blocked\n— Đặt action để unblock"]
    BLOCKED -->|"Dependency resolved"| DOR
    DOR -->|"✅ Đủ"| INPROG["🔵 Status: IN_PROGRESS\nGhi Ngày bắt đầu + HH:mm +07"]

    INPROG --> WORK["⚙️ Làm việc..."]

    WORK --> AI_CHECK{"Dùng AI\ngenerate code?"}
    AI_CHECK -->|Có| AI_REVIEW["🤖 AI Code Review:\n— Verify không hallucinated API\n— Check error handling\n— Test logic với test case thực\n— Lưu prompt quan trọng"]
    AI_CHECK -->|Không| ARCH_CHECK
    AI_REVIEW --> ARCH_CHECK

    ARCH_CHECK{"Có quyết định\nkiến trúc lớn?"}
    ARCH_CHECK -->|Có| ADR["📘 Ghi ADR.md\nADR-xxx"]
    ARCH_CHECK -->|Không| RISK_CHECK
    ADR --> RISK_CHECK

    RISK_CHECK{"Phát sinh\nrisk mới?"}
    RISK_CHECK -->|Có| RISK["📊 Ghi RISK_REGISTER.md\nR-xxx với Inherent/Residual score"]
    RISK_CHECK -->|Không| DEPLOY_CHECK
    RISK --> DEPLOY_CHECK

    DEPLOY_CHECK{"Cần\ndeploy?"}
    DEPLOY_CHECK -->|Có| DEPLOY["🚀 Chạy deploy checklist\nUpdate ENVIRONMENT.md\nGhi Deployment History"]
    DEPLOY_CHECK -->|Không| REVIEW
    DEPLOY --> REVIEW

    REVIEW["🔍 Status: IN_REVIEW\n— Solo: self-review sau 2h\n— Team: peer review\n— AI code: checklist riêng"]
    REVIEW --> DOD{"✅ Tick đủ\nDefinition of Done?"}
    DOD -->|"❌ Chưa đủ"| INPROG
    DOD -->|"✅ Đủ"| DEVLOG

    DEVLOG["📓 Viết DEVLOG entry\n— Những gì đã làm / KHÔNG làm\n— Output thực tế vs kỳ vọng\n— Tech Debt mới\n— Security Audit\n— KB Notes → cập nhật KB INDEX"]

    DEVLOG --> DONE["✅ Status: DONE\n— Ghi Ngày hoàn thành + HH:mm +07\n— Ghi Effort thực tế\n— Update Dashboard\n— Xóa khỏi BLOCKED nếu có\n— Trigger tasks bị unblock"]

    style CREATE fill:#e3f2fd,stroke:#1976D2
    style BLOCKED fill:#ffebee,stroke:#c62828
    style INPROG fill:#e8eaf6,stroke:#3949AB
    style REVIEW fill:#fff8e1,stroke:#F9A825
    style DONE fill:#e8f5e9,stroke:#2E7D32
    style ADR fill:#e8eaf6,stroke:#5C6BC0
    style RISK fill:#fce4ec,stroke:#C2185B
    style DEVLOG fill:#f3e5f5,stroke:#7B1FA2
```

---

## 3. HOTFIX FLOW — Xử lý sự cố production

```mermaid
flowchart TD
    DETECT([🚨 Phát hiện incident\nProduction]) --> ASSESS

    ASSESS{"🔴 Severity?"}
    ASSESS -->|"P0: Site down\nData at risk"| P0["⚡ NGAY LẬP TỨC:\n1. Mở DEVLOG — tạo Hotfix entry\n2. Ghi thời điểm phát hiện\n3. Không cần hoàn thiện — ghi trước"]
    ASSESS -->|"P1: Core feature broken\n>20% user ảnh hưởng"| P1["Tạo Hotfix entry DEVLOG\nMục tiêu: fix trong 1-4h"]
    ASSESS -->|"P2: Degraded\nMinor issue"| P2["Tạo task thường\nTASK_REGISTRY.md\nxử lý trong sprint hiện tại"]

    P0 --> FIX
    P1 --> FIX
    FIX["🔧 Fix code\n— Identify root cause\n— Implement fix\n— Minimal change — đừng refactor"]

    FIX --> DEPLOY_HOTFIX{"P0?"}
    DEPLOY_HOTFIX -->|"P0: Skip DEV/TEST\nnếu không có time"| PROD_DEPLOY
    DEPLOY_HOTFIX -->|"P1: Verify trên\nDEV/TEST trước"| DEV_VERIFY["Verify trên DEV/TEST\n5 phút smoke test"]
    DEV_VERIFY --> PROD_DEPLOY

    PROD_DEPLOY["🚀 Deploy PRODUCTION\nGhi thời điểm deploy"]
    PROD_DEPLOY --> SMOKE{"Smoke test\npass?"}

    SMOKE -->|"❌ Fail"| ROLLBACK["🔙 ROLLBACK NGAY\nVercel Dashboard:\nDeployments → Promote previous\n— App: ~2 phút\n— DB: restore backup nếu có data import"]
    ROLLBACK --> FIX

    SMOKE -->|"✅ Pass"| MONITOR["👁️ Monitor\n— P0: theo dõi 1 giờ\n— P1: theo dõi 30 phút\nXem: error rate, logs, response time"]
    MONITOR --> STABLE{"Ổn định?"}
    STABLE -->|"❌ Vẫn lỗi"| ROLLBACK
    STABLE -->|"✅ OK"| DOCUMENT

    DOCUMENT["📝 Hoàn thiện documentation\n1. DEVLOG: hoàn thiện Hotfix entry\n   — Root cause, fix, timeline\n2. RISK_REGISTER: đổi risk sang OCCURRED\n   tạo INC-xxx trong Incident Log\n3. ENVIRONMENT: ghi Deployment History\n4. TASK_REGISTRY: tạo follow-up task\n   prevent recurrence"]

    DOCUMENT --> POSTMORTEM{"P0?"}
    POSTMORTEM -->|Có| PM["📋 Post-mortem\nDEVLOG entry loại Post-mortem:\n— Timeline đầy đủ\n— 5 Whys root cause analysis\n— Action items prevent recurrence"]
    POSTMORTEM -->|Không| END_HOTFIX
    PM --> END_HOTFIX

    END_HOTFIX([✅ Hotfix hoàn tất])
    P2 --> END_HOTFIX

    style DETECT fill:#ffebee,stroke:#c62828
    style P0 fill:#ffcdd2,stroke:#b71c1c
    style P1 fill:#ffe0b2,stroke:#e65100
    style ROLLBACK fill:#ffcdd2,stroke:#b71c1c
    style DOCUMENT fill:#f3e5f5,stroke:#7B1FA2
    style END_HOTFIX fill:#e8f5e9,stroke:#2E7D32
```

---

## 4. PHASE CLOSURE — Đóng một phase

```mermaid
flowchart TD
    CHECK_ALL{"Tất cả tasks\nDONE hoặc SKIPPED\ncó lý do?"}
    CHECK_ALL -->|"❌ Chưa"| CONTINUE["Tiếp tục làm\ncác task còn lại"]
    CONTINUE --> CHECK_ALL

    CHECK_ALL -->|"✅ Rồi"| EXIT_CHECK{"Phase Exit Criteria\ntất cả ticked?"}
    EXIT_CHECK -->|"❌ Còn thiếu"| FIX_EXIT["Xử lý items còn thiếu:\n— Tech Debt CRITICAL chưa có plan?\n— ADR chưa ghi?\n— BLOCKED chưa resolve?"]
    FIX_EXIT --> EXIT_CHECK

    EXIT_CHECK -->|"✅ Đủ"| RISK_REVIEW["📊 Review RISK_REGISTER.md\n— Update status các risk liên quan\n— Check CRITICAL risks đang OPEN\n— Thêm risk mới nếu phát hiện"]

    RISK_REVIEW --> ADR_REVIEW["📘 Review ADR.md\n— Có ADR nào trigger\n'Điều kiện review lại' không?\n— Status nào cần cập nhật?"]

    ADR_REVIEW --> RETRO["📓 Viết Phase Retrospective\nDEVLOG.md\n— Tóm tắt phase\n— Milestone đạt được\n— Effort: ước tính vs thực tế\n— Project Health Snapshot\n— Keep / Improve / Stop\n— Tech Debt summary\n— Input cho phase sau"]

    RETRO --> ENV_CHECK{"Phase có\ndeploy production?"}
    ENV_CHECK -->|Có| ENV_UPDATE["🌐 Update ENVIRONMENT.md\n— Version / Tag\n— Deployment History\n— Trạng thái hiện tại"]
    ENV_CHECK -->|Không| ARCHIVE
    ENV_UPDATE --> ARCHIVE

    ARCHIVE["🗄️ Archive DEVLOG\nMove task entries của phase này\nsang DEVLOG_ARCHIVE_PX.md\nGiữ lại: Phase Retro, Hotfix, Correction"]

    ARCHIVE --> MARK_DONE["✅ Mark Phase DONE\nTASK_REGISTRY:\n— Đổi status phase\n— Update Dashboard + timestamp\n— Update BLOCKED section"]

    MARK_DONE --> CHANGELOG["📋 Update CHANGELOG.md\nnếu phase có user-facing changes\n(dành cho user, khác với DEVLOG)"]

    CHANGELOG --> NEXT([▶️ Bắt đầu Phase tiếp theo])

    style CHECK_ALL fill:#fff8e1,stroke:#F9A825
    style RETRO fill:#f3e5f5,stroke:#7B1FA2
    style ARCHIVE fill:#e8eaf6,stroke:#3949AB
    style NEXT fill:#e8f5e9,stroke:#2E7D32
```

---

## 5. SCOPE CHANGE FLOW — Khi scope thay đổi

```mermaid
flowchart TD
    REQUEST(["📐 Yêu cầu thay đổi scope\n(feature mới / bỏ feature / đổi hướng)"])

    REQUEST --> NECESSARY{"Cần thiết\nngay bây giờ?"}
    NECESSARY -->|"❌ Không"| DEFER["Defer hoặc Reject\nGhi nhận lý do vào\nTask SKIPPED hoặc comment\ntrong TASK_REGISTRY"]
    DEFER --> END_NO(["⏸️ Không thay đổi gì"])

    NECESSARY -->|"✅ Có"| IMPACT["📊 Đánh giá tác động:\n— Effort thêm bao nhiêu giờ?\n— Timeline bị đẩy bao nhiêu?\n— Task nào bị ảnh hưởng?\n— Risk mới nào phát sinh?"]

    IMPACT --> SCOPE_LOG["📓 Ghi SC-xxx\nScope Change Log trong DEVLOG.md\n— Mô tả thay đổi\n— Tác động timeline / effort\n— Người quyết định"]

    SCOPE_LOG --> META_UPDATE{"Scope definition\nthay đổi?"}
    META_UPDATE -->|Có| UPDATE_META["📋 Update PROJECT_META.md\n— In-scope / Out-of-scope list\n— Definition of Project Done"]
    META_UPDATE -->|Không| UPDATE_TASKS
    UPDATE_META --> UPDATE_TASKS

    UPDATE_TASKS["📝 Update TASK_REGISTRY.md\n— Tạo task mới nếu có việc mới\n— Cancel task nếu bỏ feature\n  (mark SKIPPED + ghi lý do)\n— Modify task nếu scope thay đổi\n— Update Dashboard + dependencies"]

    UPDATE_TASKS --> RISK_NEW{"Tạo risk mới?"}
    RISK_NEW -->|Có| ADD_RISK["📊 Thêm R-xxx\nvào RISK_REGISTER.md"]
    RISK_NEW -->|Không| ADR_NEW
    ADD_RISK --> ADR_NEW

    ADR_NEW{"Thay đổi\nkiến trúc?"}
    ADR_NEW -->|Có| UPDATE_ADR["📘 Tạo ADR mới\nhoặc SUPERSEDE ADR trước đó\nBao gồm impact assessment"]
    ADR_NEW -->|Không| END_SCOPE
    UPDATE_ADR --> END_SCOPE

    END_SCOPE(["✅ Scope change documented\nTiếp tục vận hành"])

    style REQUEST fill:#fce4ec,stroke:#E91E63
    style DEFER fill:#efebe9,stroke:#795548
    style IMPACT fill:#fff8e1,stroke:#F9A825
    style END_SCOPE fill:#e8f5e9,stroke:#2E7D32
```

---

## 6. FILE INTERACTION MAP — Action nào → Update file nào

```mermaid
flowchart LR
    subgraph ACTIONS ["🎯 Actions / Events"]
        A1["Task DONE"]
        A2["Task BLOCKED"]
        A3["Deploy lên bất kỳ env"]
        A4["Quyết định kiến trúc lớn"]
        A5["Phát hiện risk mới"]
        A6["Incident / Hotfix"]
        A7["Phase kết thúc"]
        A8["Scope thay đổi"]
        A9["Secret cần rotate"]
        A10["Tech debt phát sinh"]
    end

    subgraph FILES ["📁 Files cần update"]
        F_TR["TASK_REGISTRY\n.md"]
        F_DL["DEVLOG\n.md"]
        F_ADR["ADR\n.md"]
        F_RR["RISK_REGISTER\n.md"]
        F_ENV["ENVIRONMENT\n.md"]
        F_PM["PROJECT_META\n.md"]
    end

    A1 --> F_TR
    A1 --> F_DL
    A2 --> F_TR
    A3 --> F_ENV
    A3 --> F_DL
    A4 --> F_ADR
    A4 --> F_DL
    A5 --> F_RR
    A5 --> F_DL
    A6 --> F_DL
    A6 --> F_RR
    A6 --> F_ENV
    A6 --> F_TR
    A7 --> F_DL
    A7 --> F_TR
    A7 --> F_RR
    A7 --> F_ADR
    A7 --> F_ENV
    A8 --> F_DL
    A8 --> F_TR
    A8 --> F_PM
    A9 --> F_ENV
    A10 --> F_DL

    style ACTIONS fill:#e3f2fd,stroke:#1976D2
    style FILES fill:#f3e5f5,stroke:#7B1FA2
```

---

## 7. DAILY / WEEKLY ROUTINE

```mermaid
flowchart TD
    subgraph DAILY ["☀️ Đầu ngày làm việc — 5 phút"]
        D1["👁️ Nhìn vào\n⚠️ BLOCKED section\nTASK_REGISTRY"] --> D2["📊 Check Dashboard\nTask nào đang IN_PROGRESS?"] --> D3["🎯 Chọn task ưu tiên\ncao nhất để làm hôm nay"]
    end

    subgraph AFTER_TASK ["✅ Sau mỗi task DONE — 15-30 phút"]
        T1["Tick DoD checklist"] --> T2["Viết DEVLOG entry\nkể cả entry ngắn"] --> T3["Update KB INDEX\nnếu học được gì"] --> T4["Update Dashboard\nvà BLOCKED section"]
    end

    subgraph WEEKLY ["📅 Cuối tuần / Sau mỗi phase — 30-60 phút"]
        W1["Review RISK_REGISTER\nCRITICAL risks vẫn OPEN?"] --> W2["Review ADR\nCó điều kiện review nào triggered?"] --> W3["Check Budget\nPROJECT_META cost tracking"] --> W4["Phase Retro nếu phase vừa đóng"]
    end

    subgraph BEFORE_PROD ["🚀 Trước mỗi deploy PRODUCTION"]
        P1["Tick toàn bộ\nPRODUCTION checklist\nENVIRONMENT.md"] --> P2["Smoke test DEV/TEST\npass chưa?"] --> P3["Deploy + Monitor\ntheo window tương ứng"]
    end

    style DAILY fill:#e3f2fd,stroke:#1976D2
    style AFTER_TASK fill:#e8f5e9,stroke:#2E7D32
    style WEEKLY fill:#fff8e1,stroke:#F9A825
    style BEFORE_PROD fill:#fce4ec,stroke:#E91E63
```

---

## 8. LEGEND — Bảng màu và ký hiệu

| Màu node | Ý nghĩa |
|----------|---------|
| 🔵 Xanh dương nhạt | Start / Tạo mới |
| 🟢 Xanh lá nhạt | Hoàn thành / Done |
| 🔴 Đỏ nhạt | Lỗi / Blocked / Nguy hiểm |
| 🟡 Vàng nhạt | Đang xử lý / Warning |
| 🟣 Tím nhạt | Documentation / File update |
| 🟠 Cam nhạt | Hotfix / Urgent |

| Ký hiệu | Ý nghĩa |
|---------|---------|
| `-->` | Flow bình thường |
| `-.->` | Flow đặc biệt / exception |
| `{}` | Decision point |
| `([])` | Start / End |
| `[]` | Process / Action |
| `subgraph` | Nhóm các bước liên quan |

---

> **Tip:** Render file này trong **Obsidian** (cài plugin Mermaid) hoặc paste từng diagram lên [mermaid.live](https://mermaid.live) để xem trực quan.
