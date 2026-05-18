# Bản Mệnh V2 KB Extraction Plan

Ngày cập nhật: 2026-05-16

## 1. Mục tiêu

Giữ lại KB Thần số học và KB Tarot do user cung cấp, nhưng đưa vào Bản Mệnh V2 theo cách an toàn: có schema rõ, import có kiểm soát, không lộ ra frontend/static asset, không chạy JS nguồn cũ trong app mới.

## 2. KB Thần số học - nguồn canonical

### Canonical source

```text
E:\huyen hoc AI\test\than-so-hoc-export\kb.json
```

### Duplicate/check source

```text
E:\huyen hoc AI\test\numerology_core\numerology_knowledge_base.json
```

### Checksum

| File | Size | SHA-256 |
|---|---:|---|
| `than-so-hoc-export/kb.json` | 216913 bytes | `a6aed5a839631a6fdb3ee5558da445b91f41dd8dba12d1c601ea9b09f346f22c` |
| `numerology_core/numerology_knowledge_base.json` | 216913 bytes | `a6aed5a839631a6fdb3ee5558da445b91f41dd8dba12d1c601ea9b09f346f22c` |

Kết luận: hai file structured KB giống hệt nhau. V2 chốt `than-so-hoc-export/kb.json` làm canonical source. File còn lại chỉ dùng để kiểm tra checksum, không giữ hai nguồn song song trong app.

## 3. Structured KB schema đã thấy

Top-level keys: 33 nhóm.

| Key | Type | Count | Sample keys/value |
|---|---|---:|---|
| `approach_ability` | dict | 10 | 1, 2, 3, 4, 5, 6, 7, 8 |
| `approach_attitude` | dict | 10 | 1, 2, 3, 4, 5, 6, 7, 8 |
| `approach_motivation` | dict | 10 | 1, 2, 3, 4, 5, 6, 7, 8 |
| `attitude_number` | dict | 12 | 1, 2, 3, 4, 5, 6, 7, 8 |
| `birth_chart_axes` | dict | 4 | note, grid_layout, arrows_present, arrows_absent |
| `birth_chart_grid` | dict | 5 | layout, arrows, axes, isolated_numbers, multiple_numbers |
| `birthday_number` | dict | 11 | 1, 2, 3, 4, 5, 6, 7, 8 |
| `cognitive_ability` | dict | 10 | 1, 2, 3, 4, 5, 6, 7, 8 |
| `compatibility` | dict | 54 | note, 1_1, 1_2, 1_3, 1_4, 1_5, 1_6, 1_7 |
| `destiny_challenge` | dict | 11 | 0, 1, 2, 3, 4, 5, 6, 7 |
| `destiny_number` | dict | 12 | 1, 2, 3, 4, 5, 6, 7, 8 |
| `karmic_debt` | dict | 5 | 10, 13, 14, 16, 19 |
| `karmic_lessons` | dict | 9 | 1, 2, 3, 4, 5, 6, 7, 8 |
| `letter_map` | dict | 26 | A, B, C, D, E, F, G, H |
| `life_cycle` | dict | 12 | 1, 2, 3, 4, 5, 6, 7, 8 |
| `life_path` | dict | 12 | 1, 2, 3, 4, 5, 6, 7, 8 |
| `maturity_ability` | dict | 12 | 1, 2, 3, 4, 5, 6, 7, 8 |
| `maturity_number` | dict | 9 | 1, 2, 3, 4, 5, 6, 7, 8 |
| `meta` | dict | 4 | version, source, system, language |
| `override_difficulty` | dict | 10 | 1, 2, 3, 4, 5, 6, 7, 8 |
| `personal_day` | dict | 10 | 1, 2, 3, 4, 5, 6, 7, 8 |
| `personal_month` | dict | 11 | 1, 2, 3, 4, 5, 6, 7, 8 |
| `personal_year` | dict | 10 | 1, 2, 3, 4, 5, 6, 7, 8 |
| `personality_challenge` | dict | 11 | 0, 1, 2, 3, 4, 5, 6, 7 |
| `personality_number` | dict | 13 | 1, 2, 3, 4, 5, 6, 7, 8 |
| `pyramid_challenge` | dict | 10 | 0, 1, 2, 3, 4, 5, 6, 7 |
| `pyramid_peak` | dict | 10 | 1, 2, 3, 4, 5, 6, 7, 8 |
| `soul_challenge` | dict | 11 | 0, 1, 2, 3, 4, 5, 6, 7 |
| `soul_number` | dict | 13 | 1, 2, 3, 4, 5, 6, 7, 8 |
| `tension_number` | dict | 11 | 0, 1, 2, 3, 4, 5, 6, 7 |
| `triads` | dict | 3 | 1-5-7, 2-4-8, 3-6-9 |
| `vowels` | list | 5 | A, E, I, O, U |
| `y_rule` | str | 1 | scalar |

Nhóm dữ liệu chính:

- Core calculation reference: `letter_map`, `vowels`, `y_rule`.
- Core reading: `life_path`, `destiny_number`, `soul_number`, `personality_number`, `birthday_number`, `attitude_number`, `maturity_number`.
- Time/cycle: `life_cycle`, `personal_year`, `personal_month`, `personal_day`, `pyramid_peak`, `pyramid_challenge`.
- Deep analysis: `karmic_debt`, `karmic_lessons`, `triads`, `birth_chart_grid`, `birth_chart_axes`, `compatibility`.
- Extended/challenge: `soul_challenge`, `destiny_challenge`, `personality_challenge`, `tension_number`, `override_difficulty`.

## 4. Narrative source

### Source files

```text
E:\huyen hoc AI\test\numerology_core\narrative_templates.js
E:\huyen hoc AI\test\than-so-hoc-export\interpreter.js
```

| File | Size | SHA-256 |
|---|---:|---|
| `numerology_core/narrative_templates.js` | 1041504 bytes | `1c247944b2670b3a683c57317020117930ef03baf511c0394c81868eeab658db` |
| `than-so-hoc-export/interpreter.js` | 1041504 bytes | `1c247944b2670b3a683c57317020117930ef03baf511c0394c81868eeab658db` |

Kết luận: hai file narrative/interpreter giống hệt nhau.

File narrative hiện là JS lớn, chứa HTML string và function template như `lifePath`, `soul`, `personality`, `lifeCycle`, `pyramidPeak`, v.v. Không được copy/chạy nguyên file này trong V2.

## 5. Cách convert narrative an toàn

Không dùng `eval`, không execute JS cũ trong runtime production.

Quy trình đề xuất:

1. Tạo script offline trong `tools/` để parse/export nội dung narrative sang JSON/MDX an toàn.
2. Chuẩn hóa placeholder thành dạng rõ ràng, ví dụ `{name}`, `{number}`, `{description}`.
3. Sanitize HTML allowlist: `p`, `strong`, `em`, `ul`, `ol`, `li`, `br`, `div` với class allowlist hạn chế.
4. Loại bỏ inline style nếu không cần; style phải do UI V2 quyết định.
5. Tách nội dung theo namespace:
   - `life_path`
   - `soul_number`
   - `destiny_number`
   - `personality_number`
   - `life_cycle`
   - `personal_year`
   - `pyramid_peak`
   - `compatibility`
6. Validate output bằng schema trước khi upload private storage.
7. Không commit raw narrative đã convert nếu nội dung được xem là private/premium.

## 6. Storage/API plan cho KB Thần số học

### Storage

| Data | Storage đề xuất | Public? | Ghi chú |
|---|---|---:|---|
| Structured KB `kb.json` | Cloudflare R2/private backend | No | File JSON lớn, ít thay đổi |
| Narrative templates đã convert | Cloudflare R2/private backend | No | Premium content, không static |
| Manifest/version/checksum | Cloudflare KV | No/limited | Chỉ metadata không nhạy cảm |
| Derived report metadata | Firestore | No | User/report/payment state |

### API boundary

Frontend không đọc trực tiếp R2/KV. Mọi truy cập đi qua API/Worker:

```text
Frontend -> API/Worker -> Auth/Entitlement check -> KB gateway -> R2/KV -> sanitized response
```

API chỉ trả phần cần thiết cho màn hình hiện tại:

- Free summary: chỉ trả nội dung free/tóm tắt.
- Paid report: trả nội dung premium theo entitlement/report id.
- Không có endpoint raw kiểu `/kb.json`, `/narrative.json`, `/all`.

## 7. Validation bắt buộc trước khi code app

- Validate JSON parse của canonical KB.
- So SHA-256 với manifest import.
- Validate top-level keys đủ nhóm bắt buộc.
- Validate từng nhóm là object/list/scalar đúng schema.
- Validate narrative convert không còn JS function.
- Validate HTML đã sanitize.
- Validate không có secret/token/PII trong KB.
- Build smoke test: fail nếu static artifact chứa marker của raw KB/narrative.

Marker smoke test đề xuất:

- `letter_map`
- `karmic_debt`
- `NarrativeTemplates`
- `lifePath:`
- một vài phrase private được chọn thủ công nhưng không in ra log public.

## 8. Security rules

- KB là tài sản lõi, không commit vào frontend/public/static.
- Không import KB bằng `import kb from ...` trong code frontend.
- Không lưu KB trong localStorage/sessionStorage/indexedDB.
- Không log raw KB response.
- Không cho client tự quyết định entitlement.
- Rate limit API KB.
- Audit log aggregate: user id, report id, module, section, status; không log full content.

## 9. Output implementation sau này

Khi bắt đầu code import KB, cần tạo tối thiểu:

- `tools/validate_numerology_kb.ts` hoặc `.js`
- `tools/convert_numerology_narrative.ts` hoặc `.js`
- `apps/api/src/kb/numerologyGateway.ts`
- `apps/api/src/kb/numerologySchema.ts`
- `apps/web` chỉ gọi typed API, không import KB.
- Security smoke test kiểm tra artifact public.

## 10. KB Tarot

Tarot KB sẽ xử lý ở T-00A4/Tarot workflow. Nguồn canonical đã ghi:

```text
E:\huyen hoc AI\test\kb\commercial\tarot_kb
```

Nguyên tắc tương tự: không public raw premium KB, không clone code/asset ngoài scope, chỉ dùng workflow reference nếu quyền sử dụng rõ.

## 11. Kết luận T-00A3

T-00A3 đủ điều kiện Done ở mức tài liệu/plan:

- Canonical KB đã rõ.
- Duplicate KB đã được checksum.
- Narrative source đã rõ và trùng bản.
- Storage/API/security plan đã rõ.
- Chưa import KB vào app, chưa public dữ liệu.
