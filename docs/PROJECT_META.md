# PROJECT_META - Bản Mệnh V2

## 1. Thông tin dự án

| Field | Value |
|---|---|
| Project name | Bản Mệnh V2 |
| Codename | banmenh-v2 |
| Owner | Zenki |
| Business domain | Huyền học / self-discovery / paid digital report |
| Current status | Independent rebuild planning; codebase chính thức chỉ bắt đầu khi task `T-0101` được duyệt |
| Primary market | Việt Nam |
| Production domain | https://banmenh.online |
| Dev/Test domain | https://dev.banmenh.online |
| Project root | `E:\Project\Project\banmenh` - thư mục dự án chính thức của Bản Mệnh V2 |
| Docs source of truth | `E:\Project\Project\banmenh\docs` - nơi chứa tài liệu, spec, đặc tả, task và audit |
| Codebase status | Project root đã tồn tại; mọi code/scaffold/build chính thức chỉ được tính sau khi `T-0101` được user duyệt và cập nhật DEVLOG |

## 2. Mục tiêu sản phẩm

Bản Mệnh V2 là dự án rebuild mới hoàn toàn. Nền tảng bắt đầu với Thần số học và Tarot, tách rõ từng module, từng cơ chế thanh toán, từng lớp dữ liệu/KB và từng luồng vận hành để giảm tech debt, giảm rủi ro lộ dữ liệu, và có thể thương mại hóa ổn định.

## 3. Phạm vi MVP

- Hub / Dashboard module hóa.
- Thần số học: tra cứu miễn phí có giới hạn, mua báo cáo đầy đủ 49.000đ/lượt.
- Tarot MVP: trải bài không AI, có daily message, lịch sử cơ bản, thư viện ý nghĩa lá bài.
- Account / Payment: đăng nhập, entitlement, PayOS, voucher, Telegram alert.
- Dev/Test và Production tách biệt.
- KB thần số học và KB Tarot đã có sẵn, phải được đưa vào private backend/storage khi triển khai.
- File thiết kế giao diện đã có sẵn và là input cho UI implementation.

## 4. Ngoài phạm vi MVP

- App mobile native.
- Admin UI đầy đủ cho voucher/payment.
- Tarot AI/Gemini analysis.
- Tarot spread 5/7/10/12 lá ở bản đầu.
- Module Tử vi, Bát tự, Chòm sao, Ma trận định mệnh ở bản đầu.
- Marketplace chuyên gia / tư vấn trực tiếp.

## 5. Tech stack dự kiến

| Layer | Choice |
|---|---|
| Frontend | Next.js + TypeScript |
| API / edge | Cloudflare Workers |
| Auth | Google Auth / Firebase Auth |
| User & payment data | Firestore |
| KB / private data | Cloudflare R2/KV hoặc private backend storage |
| Payment | PayOS |
| Alerting | Telegram Bot |
| CI/CD | Giai đoạn đầu deploy thủ công; có thể chuyển sang GitHub auto deploy sau khi có policy secret scanning/ENV rõ ràng |

## 6. Vai trò AI trong dự án

| Role | Trách nhiệm |
|---|---|
| Codex | Lead implementation, task breakdown, code changes, verification, cập nhật docs |
| Claude | QC/Audit: review spec, security, tech debt, UX/content, logic thương mại |
| User | Product owner, chốt quyết định business, approve deploy/secret/payment |

## 7. Tài sản cần bảo vệ

- Knowledge Base thần số học.
- PayOS keys và webhook checksum.
- Admin token.
- Telegram bot token/chat ID.
- Dữ liệu cá nhân người dùng: tên, ngày sinh, email, lịch sử tra cứu.
- Entitlement/payment state.


## 8. Project Root Và Docs Boundary

- `E:\Project\Project\banmenh` là project root chính thức của Bản Mệnh V2.
- `E:\Project\Project\banmenh\docs` là source of truth cho tài liệu/spec/đặc tả/quy trình.
- Không coi bất kỳ scaffold/code/build nào là chính thức nếu chưa có task tương ứng trong `TASK_REGISTRY.md` và chưa được ghi nhận trong `DEVLOG.md`.
- Khi bắt đầu implementation, code app phải nằm trong project root hoặc cấu trúc con được task phê duyệt, không tạo workspace khác nếu user chưa yêu cầu.
- Trong giai đoạn tài liệu hiện tại: chỉ cập nhật docs/spec, không build, không chạy dev server, không deploy.

## 8. V2 Independence Boundary

- Các nguồn ngoài scope nằm ngoài phạm vi triển khai Bản Mệnh V2.
- Bản Mệnh V2 phải khởi tạo codebase, database/storage, worker/API và payment boundary mới.
- Không import dữ liệu từ nguồn ngoài scope trong MVP.
- Chỉ dùng file thiết kế và 2 bộ KB do user cung cấp làm input chính.
- Khi V2 hoàn thiện và pass test, mới lập kế hoạch gắn domain production cho V2.


## 9. Approved Input Sources

- Design/visual: extract từ V1/local files, chỉ lấy visual style và effect idea.
- Numerology KB: `E:\huyen hoc AI\test\than-so-hoc-export\kb.json` là canonical source.
- Numerology narrative: `E:\huyen hoc AI\test\numerology_core\narrative_templates.js` chỉ dùng để convert sang safe data format.
- Tarot KB: `E:\huyen hoc AI\test\kb\commercial\tarot_kb` là canonical source.
- Tarot workflow reference: Mystery Tarot website, chỉ dùng để spec workflow/UX.
