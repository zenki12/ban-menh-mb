# Tarot Workflow Reference - Bản Mệnh V2

Ngày cập nhật: 2026-05-16

Reference chính: `https://www.mystery-tarot.net/`

> Tài liệu này chỉ dùng Mystery Tarot làm tham chiếu cấu trúc hệ thống, database/KB và user journey. Bản Mệnh V2 phải rebuild mới bằng branding, code, hạ tầng, routing, payment, auth và vận hành riêng.

## 1. Mục tiêu

Module Tarot của Bản Mệnh V2 cần tạo cảm giác “hành trình” thay vì chỉ là form rút bài. Người dùng nên có:

- Daily message khi vào module.
- Lối vào rõ để bắt đầu hành trình.
- Lịch sử/thông điệp quá khứ.
- Sách phép Tarot/dictionary.
- Chủ đề mọi người đang hỏi.
- Nhiều spread nhưng triển khai theo phase để tránh phình app.
- Upsell mạnh hơn Thần số học, nhưng không làm nghẽn trải nghiệm free.

## 2. Không clone

- Không clone code frontend/backend của Mystery Tarot/TAROT-vibe.
- Không dùng endpoint/API/config của bên khác.
- Không copy branding, music, animation asset nếu chưa có quyền.
- Không dùng Google/Gemini/config từ repo ngoài.
- Không public raw KB premium.

## 3. Thông tin reference đã ghi nhận

Từ website public:

- Landing có CTA `Bắt Đầu Hành Trình`.
- Có `Thông điệp quá khứ`.
- Có `Sách phép Tarot & Ý nghĩa thẻ bài`.
- Có daily message popup/section.
- Có thông báo giới hạn năng lượng/free usage.
- Tier tham chiếu:
  - Người Dẫn Đường: 29.000đ/tháng, 5 lần trải bài/ngày.
  - Bậc Thầy Tarot: 109.000đ/tháng, không giới hạn.
- Spread tham chiếu:
  - 1 lá: năng lượng/ngày.
  - 3 lá: quá khứ - hiện tại - tương lai.
  - 5 lá: sâu hơn, cooldown 1 ngày.
  - 7 lá: Celtic đầy đủ, cooldown 7 ngày.
  - 10 lá: Celtic Cross, cooldown 30 ngày.
  - 12 lá: chiêm tinh học toàn diện, khuyến nghị 3 tháng/lần.
- Dictionary có 78 lá, combo/cộng hưởng và luận giải thủ công.

## 4. KB Tarot hiện có

Canonical path:

```text
E:\huyen hoc AI\test\kb\commercial\tarot_kb
```

### Manifest

| Field | Value |
|---|---|
| Version | `1.0.0` |
| Bundle | `commercial_tarot_kb` |
| Permission | `Used with permission from the author. Attribution required.` |
| Credit required | `Dữ liệu luận giải và thiết kế lá bài: Mystery Tarot của turni0 (Phúc Hoàng), sử dụng với sự cho phép của tác giả.` |
| Manifest SHA-256 | `b1310fe0abdb7f60e940f2938330f80f15dba1895eeb904161fdec9877473042` |

### Coverage

| Area | Count |
|---|---:|
| Cards | 78 |
| Major Arcana | 22 |
| Minor Arcana | 56 |
| Card aspect keys | 70 |
| Combo entries | 1544 |
| Combo detail files | 1544 |
| Clarify groups | 80 |
| Clarify questions | 1659 |
| Daily messages | 78 |
| Taxonomy groups/niches | 5 groups / 70 niches |

### Entry points

| File | Use |
|---|---|
| `cards/cards.json` | 78 lá, nghĩa xuôi/ngược, aspect theo chủ đề |
| `daily/daily_messages.json` | Daily message popup/daily draw |
| `taxonomy/niche.json` | Chủ đề và niche để user chọn câu hỏi |
| `clarify/clarify_questions.json` | Câu hỏi làm rõ theo chủ đề |
| `combos/combo_index.json` | Index cộng hưởng/combo |
| `combos/details/*.json` | Luận giải combo chi tiết, lazy-load |
| `assets/image_manifest.json` | Mapping ảnh lá bài |
| `assets/cards/*.jpg` | Ảnh lá bài, cần giữ credit |

## 5. System Structure đề xuất

```text
Tarot Module
  Landing / Entry
  Daily Message
  Topic & Question Builder
  Spread Selector
  Ritual / Focus Screen
  Deck Draw / Card Reveal
  Reading Result
  History
  Tarot Library
  Premium / Entitlement
  Analytics / Top Topics
```

Boundary:

- UI không đọc trực tiếp raw KB private.
- Nếu card images được public, vẫn phải giữ credit.
- Combo detail và premium reading nên đi qua API/Worker để kiểm soát payload/entitlement.
- Payment/tier là module account-payment xử lý, Tarot chỉ hỏi entitlement.

## 6. User Journey chi tiết

### 6.1 Entry / Landing

Màn đầu của `/tarot`:

- Daily message popup hoặc card nổi bật.
- CTA chính: `Bắt đầu hành trình`.
- CTA phụ: `Thông điệp quá khứ`.
- CTA phụ: `Sách phép Tarot`.
- Section: `Mọi người đang hỏi điều gì?`.
- Gợi ý topic phổ biến như tình yêu, sự nghiệp, tài chính, người yêu cũ, crush, quyết định, gia đình.

Không nên:

- Bắt login ngay từ đầu.
- Chặn trả phí trước khi user hiểu value.
- Đưa quá nhiều plan pricing ngay màn đầu.

### 6.2 Daily Message

MVP:

- Mỗi user/session được mở daily message.
- Nếu chưa login, lưu local session.
- Nếu login, sync cloud history sau P1.
- Daily card có mặt sau, click để reveal.
- Sau reveal có CTA: `Bắt đầu trải bài sâu hơn`.

Data:

- `daily/daily_messages.json`.
- `cards/cards.json`.

### 6.3 Topic & Question Builder

Flow:

1. Chọn group/topic.
2. Chọn niche/câu hỏi gợi ý.
3. Cho phép nhập câu hỏi custom.
4. Nếu câu hỏi quá ngắn/mơ hồ, gợi ý clarify question.

Data:

- `taxonomy/niche.json`.
- `clarify/clarify_questions.json`.

### 6.4 Spread Selector

MVP chỉ mở:

| Spread | Cards | Free/Paid | Ghi chú |
|---|---:|---|---|
| Daily / 1 lá | 1 | Free | Entry nhẹ, tạo habit |
| Quá khứ - Hiện tại - Tương lai | 3 | Free/limited | Core MVP |

P1:

| Spread | Cards | Free/Paid | Cooldown |
|---|---:|---|---|
| Trải bài 5 lá | 5 | Paid hoặc limited | 1 ngày |
| Celtic đầy đủ | 7 | Paid | 7 ngày |

P2:

| Spread | Cards | Free/Paid | Cooldown |
|---|---:|---|---|
| Celtic Cross | 10 | Master | 30 ngày |
| 12 Nhà Chiêm Tinh | 12 | Master | 90 ngày khuyến nghị |

Rule:

- Cooldown là UX/health mechanic, không giả vờ là kỹ thuật bắt buộc.
- Nếu dùng cooldown cho paid tier, phải nói rõ trong pricing.

### 6.5 Ritual / Focus Screen

Trước khi rút bài:

- Hiển thị câu hỏi đã chọn.
- Hiển thị spread đã chọn.
- Text ngắn: hướng user tập trung.
- CTA: `Mở bài`.

Không dùng text mê tín quá mức hoặc claim chắc chắn tương lai.

### 6.6 Draw / Reveal

MVP:

- Deck 78 lá.
- Random server-side hoặc deterministic seed server-side nếu cần audit.
- User click chọn số lá tương ứng.
- Reveal từng lá, hiển thị upright/reversed nếu có.
- Position label rõ: `Hiện tại`, `Xu hướng`, `Gợi ý`, v.v.

Không để client tự quyết định kết quả nếu kết quả liên quan quota/payment/history.

### 6.7 Result

Result cần có:

- Tóm tắt câu hỏi.
- Spread + danh sách lá.
- Nghĩa từng lá theo position.
- Tổng luận theo topic.
- Combo/cộng hưởng nếu match.
- Clarify questions nếu kết quả chưa đủ rõ.
- CTA:
  - Free: `Mở luận giải chuyên sâu`.
  - Paid: `Lưu thông điệp`, `Xem lại lịch sử`, `Tra nghĩa lá bài`.

### 6.8 History / Past Messages

MVP:

- Local history cho guest, giới hạn số item.

P1:

- Cloud history cho user login.
- Filter theo topic/spread/date.

Không lưu PII không cần thiết trong history.

### 6.9 Tarot Library / Sách Phép

MVP:

- Dictionary 78 lá.
- Search theo tên EN/VI.
- Filter Major/Minor/suit.
- Detail page: upright, reversed, aspect summary.

P1/P2:

- Combo dictionary.
- Manual reading: user xếp bài vật lý rồi app phân tích theo KB.

## 7. Pricing / Commercial Model đề xuất

Vì Tarot có tính habit và repeat cao hơn Thần số học, không nên bán giống 49k/lần như Thần số học.

Đề xuất:

| Tier | Giá | Ai nên dùng | Quyền lợi |
|---|---:|---|---|
| Free | 0đ | User mới | Daily message, 1-3 lượt cơ bản/ngày, dictionary 78 lá cơ bản |
| Guide | 29.000đ/tháng | User dùng đều | 5 lượt/ngày, spread 1/3/5, history cloud, không quảng cáo nếu có ads |
| Master | 109.000đ/tháng | Power user | Không giới hạn lượt hợp lý, spread 7/10/12, combo sâu, priority queue nếu sau này có AI |

Gợi ý cho Bản Mệnh V2:

- MVP có thể chỉ triển khai Free + Master để giảm phức tạp.
- Nếu muốn upsell mạnh hơn, dùng Guide/Master ngay từ đầu nhưng phải làm entitlement rõ.
- Không đưa “Gặp chuyên gia” nếu chưa có vận hành thật.

## 8. MVP/P1/P2 Scope

### MVP - Build trước

- `/tarot` landing.
- Daily message.
- Topic/question builder.
- Spread 1 lá và 3 lá.
- Draw/reveal.
- Result từ KB/template engine.
- Dictionary 78 lá.
- Local history.
- Basic quota.
- Credit display.

### P1 - Sau khi MVP ổn

- Combo/cộng hưởng.
- Clarify questions.
- Top topics từ event thật hoặc seed có kiểm soát.
- Spread 5/7.
- Auth/cloud history.
- Guide/Master entitlement.

### P2 - Sau khi thương mại ổn

- Spread 10/12.
- Manual reading.
- AI/Gemini hybrid nếu có ADR mới.
- Streak/gamification.
- Share result.
- Advanced analytics.

## 9. Data/API Contract sơ bộ

```text
GET  /api/tarot/daily
GET  /api/tarot/topics
POST /api/tarot/readings
GET  /api/tarot/readings/:id
GET  /api/tarot/history
GET  /api/tarot/cards
GET  /api/tarot/cards/:id
GET  /api/tarot/combos/:id
```

Security:

- `POST /readings` kiểm tra quota/entitlement server-side.
- `GET /history` yêu cầu auth nếu cloud history.
- `GET /combos/:id` có thể gated nếu premium.
- Không có endpoint trả toàn bộ combo details premium.

## 10. Content & Legal Rules

- Hiển thị credit theo `CREDITS.md`/manifest ở footer, About hoặc modal nguồn dữ liệu.
- Nội dung Tarot phải có disclaimer: định hướng tự chiêm nghiệm, không thay thế tư vấn pháp lý, tài chính, y tế, tâm lý chuyên môn.
- Không claim “chính xác tuyệt đối”, “tiên tri chắc chắn”, “đảm bảo kết quả”.
- Chủ đề nhạy cảm như sức khỏe, pháp lý, tài chính, mang thai phải dùng wording thận trọng.

## 11. Risks

| Risk | Severity | Mitigation |
|---|---|---|
| Copy nhầm code/asset bên ngoài | High | Chỉ dùng workflow reference, review diff |
| Lộ raw KB combo/premium | High | API gateway, không static raw premium |
| Pricing quá phức tạp từ MVP | Medium | MVP tối giản Free + 1 paid tier nếu cần |
| Tarot claim quá đà | High | Content guideline + disclaimer |
| Cooldown làm user khó chịu | Medium | Giải thích là nhịp trải nghiệm, paid tier rõ quyền lợi |
| History chứa câu hỏi nhạy cảm | High | Data minimization, delete/export sau P1 |

## 12. Definition of Done cho Tarot Spec

- Workflow landing/daily/journey/reading/result/library/history rõ.
- Mapping với KB local rõ.
- MVP/P1/P2 rõ.
- Pricing direction rõ.
- Legal/security risks rõ.
- Không yêu cầu clone code/asset/endpoint bên ngoài.
