# Module: Tarot

## Purpose

Tạo trải nghiệm Tarot có workflow rõ: daily message, chọn chủ đề, chọn spread, rút bài, đọc ý nghĩa, xem cộng hưởng và lưu lịch sử.

## Current Status

Spec ready for MVP planning

## Scope

### MVP

- Landing `/tarot`.
- Daily message popup/card.
- Bắt đầu hành trình tra cứu.
- Chọn chủ đề/câu hỏi.
- Spread 1 lá và 3 lá.
- Rút bài/flip/reveal.
- Kết quả từ KB + template engine, không AI.
- Sách phép Tarot/dictionary 78 lá.
- Local history cơ bản.
- Credit display.

### P1

- Combo/cộng hưởng.
- Clarify questions.
- Top topics.
- Spread 5/7.
- Cloud history nếu có auth.
- Guide/Master entitlement nếu chốt pricing.

### P2

- Spread 10/12.
- Manual reading.
- AI/Gemini hybrid nếu có ADR mới.
- Streak/share/advanced analytics.

## Out of Scope

- Không clone code/asset/endpoint/branding của Mystery Tarot/TAROT-vibe.
- Không dùng AI generation trong MVP.
- Không mở spread lớn trước khi 1/3 lá ổn.
- Không thêm payment/AI/storage mới nếu chưa có ADR hoặc task rõ.

## Data Model

- KB canonical: `E:\huyen hoc AI\test\kb\commercial\tarot_kb`.
- Entry points: cards, daily, taxonomy, clarify, combo index, combo details, assets.
- Data contract chi tiết sẽ nằm trong `docs/product-specs/data-contract.md` khi implement API.

## API / Interface

- Frontend chỉ gọi API/module service đã định nghĩa.
- Không đọc trực tiếp KB/private storage từ client.
- API Tarot kiểm tra quota/entitlement server-side.
- Combo details/premium reading không public raw dump.

## Dependencies

- Account/auth state nếu cloud history hoặc paid tier.
- Payment/entitlement cho Guide/Master.
- Logging/audit cho reading, quota, payment-sensitive actions.
- Content quality guideline cho claim và disclaimer.

## Acceptance Criteria

- UI/UX bám workflow trong `docs/product-specs/tarot-workflow-reference.md`.
- Có test/smoke cho daily, reading 1/3 lá, dictionary.
- Không lộ secret/KB trong client/static asset.
- Có credit display theo `CREDITS.md`.
- Có disclaimer rõ cho Tarot.
- Cập nhật DEVLOG và RISK_REGISTER sau task liên quan.

## Risks

- Nội dung Tarot claim quá mức hoặc thiếu disclaimer.
- KB/asset có yêu cầu credit/licensing.
- Upsell quá sớm làm lệch journey.
- History chứa câu hỏi nhạy cảm.
- App phình nếu mở 5/7/10/12 lá quá sớm.

## V2 Workflow Reference

- Target UX tham chiếu: `https://www.mystery-tarot.net/`.
- Chi tiết workflow: `docs/product-specs/tarot-workflow-reference.md`.
- Rebuild mới bằng code/hạ tầng/branding Bản Mệnh V2.
