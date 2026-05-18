# Bản Mệnh V2 Input Inventory

Ngày cập nhật: 2026-05-16

## 1. Nguyên tắc chung

Bản Mệnh V2 là rebuild mới. Chỉ được dùng các input đã chốt dưới đây theo đúng phạm vi cho phép.

Không được lấy từ V1:

- App logic.
- Payment/voucher flow.
- API/Worker cũ.
- LocalStorage/session flow cũ.
- Routing/workflow cũ.
- Code JS/CSS nguyên khối nếu chưa tách thành token/spec.

Được lấy:

- Visual style/giao diện/hiệu ứng từ V1.
- KB Thần số học từ nguồn V1 đã chỉ định.
- KB Tarot từ bundle commercial đã chỉ định.
- Workflow Tarot tham chiếu từ Mystery Tarot, nhưng code và branding phải rebuild mới.

## 2. Design input

| Input | Path | Vai trò | Được dùng thế nào | Không được dùng thế nào |
|---|---|---|---|---|
| Premium UI demo | `E:\huyen hoc AI\test\demo-premium-ui.html` | Visual reference chính | Lấy màu, glow, background, card feel, motion idea | Không copy nguyên HTML/JS |
| Design system demo | `E:\huyen hoc AI\test\demo-design-system.html` | Token/component reference | Lấy token/badge/button/card style | Không dùng làm app shell |
| V1 core CSS | `E:\huyen hoc AI\test\numerology_core\style.css` | Visual reference V1 | Extract color/effect/layout pattern | Không copy file vào V2 |
| Antigravity CSS | `E:\huyen hoc AI\test\Antigravity\khamphabanthan\style.css` | Visual reference phụ | Extract layout/hero/effect | Không copy workflow |

## 3. KB Thần số học input

| Input | Path | Vai trò | Ghi chú bảo mật |
|---|---|---|---|
| Structured KB | `E:\huyen hoc AI\test\than-so-hoc-export\kb.json` | Canonical KB chính | Private, không đưa vào frontend/static |
| Structured KB duplicate | `E:\huyen hoc AI\test\numerology_core\numerology_knowledge_base.json` | Dùng để đối chiếu | Không cần giữ 2 nguồn trong V2 |
| Narrative templates | `E:\huyen hoc AI\test\numerology_core\narrative_templates.js` | Nguồn văn phong/narrative | Cần convert sang JSON/MDX an toàn |
| Engine/interpreter | `E:\huyen hoc AI\test\than-so-hoc-export\interpreter.js` và engine liên quan | Tham khảo công thức | Không copy nguyên nếu chưa audit |

## 4. KB Tarot input

| Input | Path | Vai trò |
|---|---|---|
| Commercial Tarot KB | `E:\huyen hoc AI\test\kb\commercial\tarot_kb` | Canonical Tarot KB |
| Manifest | `kb/commercial/tarot_kb/manifest.json` | Metadata/counts/source/permission |
| Cards | `cards/cards.json` | 78 lá bài + meanings |
| Combos | `combos/combo_index.json` + `combos/details/*.json` | 1544 combo/cộng hưởng |
| Daily | `daily/daily_messages.json` | 3120 daily messages |
| Clarify | `clarify/clarify_questions.json` | 1659 câu hỏi làm rõ |
| Taxonomy | `taxonomy/niche.json` | 5 groups, 70 niches |
| Images | `assets/cards/*.jpg` | 78 ảnh lá bài |

## 5. Tarot workflow reference

| Reference | URL/Path | Vai trò | Ghi chú |
|---|---|---|---|
| Mystery Tarot website | `https://www.mystery-tarot.net/` | Workflow/UX reference | Rebuild mới, không clone endpoint/code/branding |
| TAROT-vibe repo | `https://github.com/turniodev/TAROT-vibe` | Repo reference nếu user cung cấp/truy cập được | Chỉ tham khảo flow/data shape; cần kiểm license nếu dùng trực tiếp |
| Local audits | `E:\huyen hoc AI\test\docs\tarot-*` | Kết quả phân tích trước đó | Dùng làm nền spec |

## 6. Quy tắc bảo mật input

- KB Thần số học và Tarot KB là tài sản lõi.
- Không commit KB private vào frontend bundle.
- Không đặt KB trong `public/`.
- Không expose raw KB endpoint không auth/rate limit.
- Không đưa secret/token vào docs hoặc repo.
- Nếu cần dùng GitHub auto deploy sau này, secrets phải nằm trong Cloudflare/Firebase secret store.
