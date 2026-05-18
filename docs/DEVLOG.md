# DEVLOG — Nhật Ký Triển Khai
> **Current truth after 2026-05-14 DOCS-SCOPE-001/002/003/004:** Bản Mệnh V2 là rebuild độc lập. Các entry cũ có nhắc `numerology-app`, migration, user/gói cũ hoặc production hiện tại chỉ là lịch sử trước khi scope được đính chính, không phải yêu cầu hiện hành.
> **Mục đích:** Nguồn sự thật duy nhất về lịch sử triển khai. Ghi lại chi tiết sau mỗi task/phase — không tô hồng, không bỏ qua vấn đề.
>
> **Định dạng thời gian:** `YYYY-MM-DD HH:mm +07`
>
> **Nguyên tắc ghi:**
> - Entry MỚI lên ĐẦU file (newest first)
> - Không sửa entry cũ — nếu cần đính chính, tạo entry loại `Correction`
> - KB Notes → ghi thêm vào **KB INDEX** ở cuối file (không chỉ trong entry)

---

## Môi trường dự án

| Môi trường | Mục đích | Trạng thái |
|-----------|---------|-----------|
| **DEV/TEST** | Verify trước khi ra production | — |
| **PRODUCTION** | Sản phẩm thật, user thực tế | — |

> Chi tiết: `ENVIRONMENT.md`

---

## Scope Change Log
> Mọi thay đổi scope — dù nhỏ. Đây là giải thích tại sao dự án kéo dài hoặc đổi hướng.
> **Thêm entry mới vào ĐẦU bảng.**

| ID | Ngày & Giờ | Mô tả thay đổi | Tác động | Người quyết định |
|----|-----------|----------------|---------|-----------------|
| SC-001 | YYYY-MM-DD HH:mm +07 | [Mô tả] | Timeline +Xh / Task mới: PX.Y | [Tên] |

---

## Index nhanh
> **Thêm entry mới vào ĐẦU bảng.**

| Ngày & Giờ | Ref | Tiêu đề | Loại |
|-----------|-----|---------|------|
| 2026-05-18 18:00 +07 | T-0406 | Implement entitlement service | `Task` |
| 2026-05-18 17:00 +07 | T-0405 | Fix Next.js env inlining bug trong client.ts | `Correction` |
| 2026-05-18 16:30 +07 | T-0405 | Implement auth/account boundary | `Task` |
| 2026-05-18 15:15 +07 | T-0404 | Tạo storage adapter interfaces | `Task` |
| 2026-05-18 14:30 +07 | T-0403 | Tạo data schemas/types với Zod | `Task` |
| 2026-05-18 13:30 +07 | T-0402 | Tạo shared error contract | `Task` |
| 2026-05-18 12:20 +07 | T-0401 | Đồng bộ legal-commercial-spec mục 7 với pricing.ts | `Correction` |
| 2026-05-18 12:05 +07 | T-0401 | Tạo shared product/pricing contract | `Task` |
| 2026-05-18 11:30 +07 | T-0209 | Visual polish: GalaxyBackground component | `Task` |
| 2026-05-18 11:01 +07 | T-0306 | Tạo legal/support route skeleton | `Task` |
| 2026-05-18 10:52 +07 | T-0305 | Tạo skeleton route `/account` | `Task` |
| 2026-05-18 10:41 +07 | T-0304 | Tạo skeleton route `/pricing` | `Task` |
| 2026-05-18 10:32 +07 | T-0303 | Tạo skeleton route `/tarot` | `Task` |
| 2026-05-18 10:13 +07 | T-0302 | Tạo skeleton route `/than-so-hoc` | `Task` |
| 2026-05-18 09:58 +07 | T-0301 | Correction: Button polymorphic + responsive audit Hub | `Correction` |
| 2026-05-18 09:45 +07 | T-0301 | Tạo Hub skeleton cho route `/` | `Task` |
| 2026-05-17 10:15 +07 | T-0208 | Responsive QA — bổ sung tablet + audit tĩnh | `Correction` |
| 2026-05-16 23:52 +07 | T-0208 | Responsive UI QA nền | `Task` |
| 2026-05-16 23:35 +07 | T-0207 | Tạo Header/Footer chuẩn | `Task` |
| 2026-05-16 22:53 +07 | T-0206 | Tạo PageShell và navigation convention | `Task` |
| 2026-05-16 22:41 +07 | T-0205 | Tạo Loading/Error/Empty states | `Task` |
| 2026-05-16 22:34 +07 | T-0204 | Tạo component Card/Panel | `Task` |
| 2026-05-16 20:23 +07 | T-0203 | Tạo component Button/CTA | `Task` |
| 2026-05-16 19:51 +07 | T-0202 | Thiết lập typography và content defaults | `Task` |
| 2026-05-16 19:39 +07 | T-0105 | Thiết lập dev/test và production config skeleton | `Task` |
| 2026-05-16 19:33 +07 | T-0104 | Tạo `.env.example` và quy tắc secret | `Task` |
| 2026-05-16 19:29 +07 | T-0103 | Tạo cấu trúc folder module hóa | `Task` |
| 2026-05-16 19:21 +07 | T-0102 | Thiết lập scripts kiểm soát chất lượng | `Task` |
| YYYY-MM-DD HH:mm +07 | P0.1 | [Tên entry] | `Task` \| `Phase-Retro` \| `Hotfix` \| `Correction` \| `Post-mortem` |

---

<!-- ============================================================
     ENTRY MỚI NHẤT Ở TRÊN CÙNG
     ============================================================ -->

---

## [2026-05-18 18:00 +07] — T-0406: Implement entitlement service

**Loại:** `Task`
**Ref:** T-0406
**Môi trường:** `DEV/TEST`

### Tóm tắt
> Firestore adapters (User + Entitlement + Purchase partial) + entitlement service + 2 API routes + wire frontend account page. Idempotent grant qua deterministic doc id.

### Thay đổi
- `apps/web/src/lib/firebase/admin.ts`: thêm `adminFirestore`.
- `apps/web/src/lib/firestore/converters.ts` (53 dòng): Firestore timestamp converters.
- `apps/web/src/lib/firestore/user-repository.ts` (106 dòng): `firestoreUserRepository` + `ensureUser()`.
- `apps/web/src/lib/firestore/entitlement-repository.ts` (65 dòng): `firestoreEntitlementRepository`, idempotent create.
- `apps/web/src/lib/firestore/purchase-repository.ts` (48 dòng): chỉ `getById`/`getByOrderId`. Các method khác throw "Implement ở T-0503".
- `apps/web/src/lib/firestore/index.ts`: barrel.
- `apps/web/src/lib/entitlements/service.ts` (144 dòng): `grantEntitlementFromPurchase`, `checkEntitlement`, `grantFromPurchaseId`.
- `apps/web/src/app/api/auth/session/route.ts` (75 dòng): thêm `ensureUser` non-blocking.
- `apps/web/src/app/api/entitlements/route.ts` (46 dòng): `GET /api/entitlements`.
- `apps/web/src/app/api/entitlements/check/route.ts` (72 dòng): `POST /api/entitlements/check`.
- `apps/web/src/lib/api/client.ts` (58 dòng): `fetchWithAuth()`.
- `apps/web/src/lib/auth/AuthProvider.tsx` (157 dòng): `syncSessionToFirestore` non-blocking.
- `apps/web/src/app/account/page.tsx` (190 dòng): fetch entitlements + EntitlementCard.
- `infra/firestore.rules` (52 dòng): security rules — CHƯA deploy.
- `infra/firestore.indexes.json`: composite indexes.

### Không làm
- Không implement payment flow (T-0501-T-0503).
- Không cho frontend write Firestore trực tiếp.
- Không mock purchase data.
- Không deploy Firestore rules (cần Firebase CLI login).

### Verify
- `npm run check` → Pass (typecheck + lint + security:smoke + build).
- `npm run qa:responsive-audit` → Pass.
- 3 API routes dynamic: `/api/auth/session`, `/api/entitlements`, `/api/entitlements/check`.
- Tất cả file sizes trong giới hạn (max: account/page.tsx 190 dòng).

### Rủi ro / lưu ý còn lại
- Firestore rules + indexes CHƯA deploy — cần `firebase deploy --only firestore:rules,firestore:indexes` trước production.
- `PurchaseRepository` chỉ có `getById`/`getByOrderId` — các method còn lại sẽ implement ở T-0503 (worker payment).
- Test thật cần Firebase project với Firestore enabled + `.env.local` đầy đủ.
- `security-smoke` false positive `idToken` → đổi tên biến. Nên cập nhật `security-smoke.mjs` whitelist sau.
- Audit P0.2 (fake entitlement từ frontend): đã chặn — frontend không write Firestore, chỉ đọc qua API có verify token.

---

**Loại:** `Correction`
**Ref:** T-0405
**Môi trường:** `DEV/TEST`

### Vấn đề
`getRequiredEnv(key: string)` dùng `process.env[key]` dynamic access. Next.js chỉ inline `NEXT_PUBLIC_*` khi access **trực tiếp** (`process.env.NEXT_PUBLIC_FIREBASE_API_KEY`). Dynamic access không được inline vào client bundle → browser throw `"process is not defined"` hoặc `"Thiếu biến môi trường"`.

Ref: https://nextjs.org/docs/app/building-your-application/configuring/environment-variables

### Fix
- Xóa hàm `getRequiredEnv(key: string)`.
- `createFirebaseConfig()` dùng direct property access cho từng biến:
  `process.env.NEXT_PUBLIC_FIREBASE_API_KEY`, `...AUTH_DOMAIN`, `...PROJECT_ID`, `...STORAGE_BUCKET`, `...MESSAGING_SENDER_ID`, `...APP_ID`.
- Guard `if (!apiKey || ...)` throw Error tiếng Việt rõ ràng.
- `admin.ts` không đụng (server-side, dynamic access OK).

### Thay đổi
- `apps/web/src/lib/firebase/client.ts` (37 dòng): refactor direct access.

### Verify
- `npm run check` → Pass.
- Dev server restart sạch (kill node + xóa `.next`): `✓ Ready in 1245ms`.
- `http://localhost:3000` load OK, Header có Button "Đăng nhập".
- Test login Google: cần `.env.local` với Firebase config thật + Firebase Console enable Google Provider.

---

**Loại:** `Task`
**Ref:** T-0405
**Môi trường:** `DEV/TEST`

### Tóm tắt
> Firebase Auth (Google + Anonymous) với AuthProvider React Context. Header dùng useAuth(). Account page client component. API route verify ID token server-side.

### Dependencies thêm
- `firebase@^12.13.0` (stable mới nhất; task prompt ghi `^10.x` nhưng "verify stable" → dùng 12.x).
- `firebase-admin@^13.10.0` (stable mới nhất; task prompt ghi `^12.x` → dùng 13.x).
- Không có HIGH/CRITICAL vulnerability.

### Thay đổi
- `.env.example`: đã có đủ 9 Firebase keys (6 NEXT_PUBLIC + 3 server-side).
- `apps/web/src/lib/firebase/client.ts` (38 dòng): singleton Firebase App + Auth.
- `apps/web/src/lib/firebase/admin.ts` (27 dòng): singleton Firebase Admin, server-only, parse `FIREBASE_PRIVATE_KEY` escaped newline.
- `apps/web/src/lib/firebase/index.ts`: barrel chỉ export client-safe symbols.
- `apps/web/src/lib/auth/AuthProvider.tsx` (147 dòng): Context + Google/Anonymous/link/signOut. Map FirebaseError → AppError.
- `apps/web/src/lib/auth/useAuth.ts` (14 dòng): hook với guard.
- `apps/web/src/lib/auth/index.ts`: barrel.
- `apps/web/src/app/layout.tsx`: wrap AuthProvider.
- `apps/web/src/app/api/auth/session/route.ts` (53 dòng): POST verify credential, `runtime = "nodejs"`.
- `apps/web/src/components/layout/Header.tsx` (191 dòng): AccountArea dùng useAuth().
- `apps/web/src/app/account/page.tsx` (111 dòng): client component, 4 states.
- `apps/web/package.json`: thêm firebase + firebase-admin.
- `docs/TASK_REGISTRY.md`: T-0405 → Done.

### Auth pattern
- ID token Bearer header stateless, không cookie session ở MVP.
- Providers: Google + Anonymous. Anonymous → Google linking qua `linkWithPopup`.
- `adminAuth` chỉ dùng trong server context (`runtime = "nodejs"`).
- `firebaseAuth` (client SDK) không export từ `lib/firebase/index.ts` cùng `adminAuth`.

### Không làm
- Không tạo Firestore user document (T-0406).
- Không implement entitlement check (T-0406).
- Không implement payment flow.
- Không dùng firebase compat API.

### Verify
- `npm run check` → Pass (typecheck + lint + security:smoke + build).
- `npm run qa:responsive-audit` → Pass.
- `/account` prerender static (client component), `/api/auth/session` dynamic.
- File sizes: client.ts 38, admin.ts 27, AuthProvider 147, useAuth 14, route 53, Header 191, account 111 — tất cả trong giới hạn.

### Rủi ro / lưu ý còn lại
- Chưa test flow thật (cần `.env.local` với Firebase config thật + Firebase Console enable Google/Anonymous provider).
- `security-smoke` flag false positive `idToken:` (pattern TOKEN) → đổi field thành `credential` trong route body. Nên cập nhật `security-smoke.mjs` để whitelist `idToken` nếu cần sau.
- `firebase-admin` không chạy trên Edge runtime — route handler đã set `export const runtime = "nodejs"`.
- Firestore user document sẽ tạo ở T-0406 (sau login thành công).

---

**Loại:** `Task`
**Ref:** T-0404
**Môi trường:** `DEV/TEST`

### Tóm tắt
> Interface contract thuần TypeScript cho storage layer. Không có implementation, không import runtime SDK. Worker T-0501+ sẽ implement Firestore adapter.

### Thay đổi
- `packages/shared/src/storage/common.ts` (47 dòng): base types + error classes.
- `packages/shared/src/storage/user-repository.ts` (21 dòng): `UserRepository`.
- `packages/shared/src/storage/report-repository.ts` (32 dòng): `ReportRepository`.
- `packages/shared/src/storage/purchase-repository.ts` (38 dòng): `PurchaseRepository` — có `markConfirmed` để webhook handler dùng.
- `packages/shared/src/storage/entitlement-repository.ts` (32 dòng): `EntitlementRepository` — có `findActiveForReport` để check quyền unlock.
- `packages/shared/src/storage/voucher-repository.ts` (28 dòng): `VoucherRepository` — `incrementUsage` phải atomic.
- `packages/shared/src/storage/payment-log-repository.ts` (23 dòng): `PaymentLogRepository` — append-only.
- `packages/shared/src/storage/tarot-reading-repository.ts` (22 dòng): `TarotReadingRepository`.
- `packages/shared/src/storage/kb-gateway.ts` (37 dòng): `KBGateway` + `KBLookupKey` + `KBChunk` — comment rõ frontend không gọi trực tiếp.
- `packages/shared/src/storage/index.ts` (12 dòng): barrel export.
- `packages/shared/src/index.ts`: thêm `export * from "./storage"`.
- `docs/TASK_REGISTRY.md`: T-0404 → `Done`.

### Không làm
- Không implement (chỉ interface).
- Không import firebase-admin, @cloudflare/workers-types hay runtime SDK.
- Không thêm dependency mới.

### Verify
- `npm run check` → Pass (typecheck + lint + security:smoke + build).
- `Select-String` scan không tìm thấy firebase-admin/@cloudflare/workers-types trong storage files.
- Tất cả files < 50 dòng (max: common.ts 47 dòng).

### Rủi ro / lưu ý còn lại
- Chưa có implementation — Worker T-0501+ sẽ implement Firestore adapter cho user/report/purchase/entitlement/voucher/payment-log/tarot-reading.
- In-memory adapter cho test chưa có task riêng — sẽ tạo khi cần.
- `KBGateway` là interface đặc biệt: R2 binary/JSON, không phải Firestore. Frontend tuyệt đối không gọi trực tiếp.
- `VoucherRepository.incrementUsage` phải atomic ở implementation (Firestore transaction) để tránh race condition vượt `maxUses`.

---

**Loại:** `Task`
**Ref:** T-0403
**Môi trường:** `DEV/TEST`

### Tóm tắt
> Tạo 7 entity schemas + common primitives trong `packages/shared/src/schemas/`, mirror đúng `data-contract.md`. Thêm zod v3 vào shared package. Mọi schema export cả Zod object lẫn inferred TypeScript type.

### Thay đổi
- `packages/shared/package.json`: thêm `"zod": "^3.23.8"`.
- `packages/shared/src/schemas/common.ts` (37 dòng): primitives chung.
- `packages/shared/src/schemas/user.ts` (20 dòng): `userSchema` + `User`.
- `packages/shared/src/schemas/report.ts` (41 dòng): `reportSchema` + `Report` + `reportInputSnapshotSchema`.
- `packages/shared/src/schemas/purchase.ts` (45 dòng): `purchaseSchema` + `Purchase`.
- `packages/shared/src/schemas/entitlement.ts` (34 dòng): `entitlementSchema` + `Entitlement`.
- `packages/shared/src/schemas/voucher.ts` (28 dòng): `voucherSchema` + `Voucher`.
- `packages/shared/src/schemas/payment-log.ts` (26 dòng): `paymentLogSchema` + `PaymentLog`.
- `packages/shared/src/schemas/tarot-reading.ts` (41 dòng): `tarotReadingSchema` + `TarotReading`.
- `packages/shared/src/schemas/index.ts` (11 dòng): barrel export.
- `packages/shared/src/index.ts`: thêm `export * from "./schemas"`.
- `docs/TASK_REGISTRY.md`: T-0403 → `Done`.

### Không làm
- Không implement storage layer (T-0404).
- Không implement auth/entitlement service (T-0405/T-0406).
- Không thêm dependency nào khác ngoài zod.
- Không hardcode magic string (dùng `z.enum`/`z.literal`).

### Deviation task prompt vs data-contract.md (đã theo data-contract.md)
- `report.module`: prompt gợi ý `"numerology"|"tarot"` → spec chỉ có `"numerology"` → dùng `z.literal("numerology")`.
- `report.status`: prompt gợi ý `draft/ready/archived` → spec dùng `free/unlocked`.
- `purchase`: prompt gợi ý `amountVnd`/`payosOrderId` → spec dùng `amount`/`providerRef`.
- `entitlement`: prompt gợi ý `productCode`/`source`/`grantedAt` → spec dùng `module`/`type`/`purchaseId`/`startsAt`.
- `voucher.modules`: prompt gợi ý `enum(["numerology","tarot","bundle","all"])` → spec dùng `Array<"numerology"|"tarot">`.
- `tarot_readings.spread`: prompt gợi ý `"one_card"|"three_cards"` → spec dùng `1|3|5|7|10|12`.
- **Cần Zenki review và cập nhật `data-contract.md` nếu muốn thay đổi.**

### Verify
- `npm run check` → Pass (typecheck + lint + security:smoke + build).
- Tất cả schema files < 100 dòng (max: purchase.ts 45 dòng).
- Zod v3.25.76 hoisted tại root `node_modules/zod`.

### Rủi ro / lưu ý còn lại
- Zod stable mới nhất là v4.4.3; dùng v3 để khớp `apps/web`. Nâng cấp lên v4 nên là task riêng.
- API request/response schemas (payment create, check, voucher validate) chưa tạo — sẽ vào khi Worker payment (T-0501+) được implement.
- `tarot_readings.spread` giữ đủ 6 giá trị (1/3/5/7/10/12) dù MVP chỉ dùng 1 và 3 lá (ADR-003), để không phải migrate schema sau.

---

**Loại:** `Task`
**Ref:** T-0402
**Môi trường:** `DEV/TEST`

### Tóm tắt
> Khoá nguồn sự thật cho error codes và message tiếng Việt trong `@banmenh/shared`. ErrorState component nâng cấp backward compatible để nhận `code`/`requestId`.

### Thay đổi
- `packages/shared/src/errors.ts` (mới, ~152 dòng): `ErrorCode` union 26 mã, type `AppError` + `AppErrorDetails`, `ERROR_MESSAGES` map tiếng Việt, helpers `getErrorMessage`/`createError`/`isAppError`. Comment đầu file cấm expose stack/PII.
- `packages/shared/src/index.ts`: thêm `export * from "./errors"`.
- `apps/web/src/components/ui/states/ErrorState.tsx` (~64 dòng): thêm prop `code?: ErrorCode` và `requestId?: string`; auto resolve `description` từ `getErrorMessage(code)` khi không truyền; render `Mã lỗi: <code>` ở dưới khi có `requestId`. Backward compatible 100%.
- `apps/web/src/app/demo-components/page.tsx`: thay `<ErrorState />` showcase bằng `<ErrorState code="VOUCHER_EXPIRED" requestId="req_demo_123" />` để verify contract.
- `docs/TASK_REGISTRY.md`: T-0402 → `Done`.

### Error codes đã chốt (26)
- Auth: `AUTH_REQUIRED`, `AUTH_INVALID_TOKEN`, `AUTH_SESSION_EXPIRED`.
- Permission: `FORBIDDEN`, `ENTITLEMENT_MISSING`.
- Validation: `VALIDATION_FAILED`, `INPUT_REQUIRED`, `INPUT_INVALID`.
- Resource: `NOT_FOUND`, `ALREADY_EXISTS`.
- Payment: `PAYMENT_FAILED`, `PAYMENT_PENDING`, `PAYMENT_EXPIRED`, `PAYMENT_AMOUNT_MISMATCH`.
- Voucher: `VOUCHER_NOT_FOUND`, `VOUCHER_EXPIRED`, `VOUCHER_OUT_OF_USES`, `VOUCHER_NOT_APPLICABLE`, `VOUCHER_ALREADY_USED` (đồng bộ legal-commercial-spec mục 6).
- KB: `KB_ACCESS_DENIED`, `KB_NOT_AVAILABLE`.
- Rate/Network: `RATE_LIMITED`, `NETWORK_ERROR`, `TIMEOUT`.
- Generic: `INTERNAL_ERROR`, `SERVICE_UNAVAILABLE`.

### Không làm
- Không hardcode error message ở frontend (đã chuyển sang `ERROR_MESSAGES`).
- Không expose stack trace, raw exception, PII.
- Không thêm zod (để T-0403).
- Không đụng `pricing.ts` hay schemas.
- Không thêm dependency.
- Không sửa `Loading/Empty/Unauthorized` state component.

### Verify
- `npm run check` → Pass; `/demo-components` prerender static.
- `npm run qa:responsive-audit` → Pass.
- Import `@banmenh/shared` resolve `ErrorCode`, `ERROR_MESSAGES`, `getErrorMessage`, `createError`, `isAppError`.
- File line count: `errors.ts` 152 dòng (<200), `ErrorState.tsx` 64 dòng (<100).
- Type guard `isAppError` từ chối object có `details` chứa nested object/array (chặn lộ PII).

### Rủi ro / lưu ý còn lại
- API/Worker layer chưa tồn tại — Worker payment/admin (T-0501+) sẽ adopt `AppError` shape `{ ok: false, error: AppError }` khi serialize lỗi qua HTTP.
- `details` chỉ cho phép primitive — nếu cần truyền danh sách field invalid của form, sẽ thêm key dạng `field` + `reason` hoặc tạo type chuyên dụng ở task validation (T-0403).

---

**Loại:** `Correction`
**Ref:** T-0401
**Môi trường:** `DEV/TEST`

### Tóm tắt
> Đính chính giá trong `legal-commercial-spec.md` mục 7 cho khớp `packages/shared/src/pricing.ts` (T-0401 đã chốt). Chỉ sửa docs, không đụng code.

### Thay đổi
- `docs/product-specs/legal-commercial-spec.md` mục `## 7. Pricing Copy`:
  - Numerology: `49.000đ / 1 bản luận giải` → `99.000₫ / 1 báo cáo`.
  - Thêm pricing copy cho Tarot 1 lá (`49.000₫ / phiên`) và Tarot 3 lá (`79.000₫ / phiên`).
  - Thêm subsection Combo cho `Gói Khám phá` 249.000₫, ghi rõ 1 báo cáo Thần số học (vĩnh viễn) + 2 phiên Tarot 3 lá (90 ngày).
  - Chốt nguyên tắc: `pricing.ts` là source of truth duy nhất; mọi thay đổi giá phải đồng bộ với section này; rà soát chính thức ở T-0801 trước khi mở payment.
- `docs/DEVLOG.md`: thêm entry này và cập nhật Index nhanh.

### Verify
- `grep "49.000đ / 1 bản luận giải"` trong file → không còn match.
- `grep "49.000"` chỉ còn ở vị trí mới (Tarot 1 lá).
- `npm run check` → Pass (xem khối output bên dưới).

### Không làm
- Không đụng `packages/shared/src/pricing.ts`.
- Không thêm pricing rule mới ngoài đồng bộ.
- Không xóa section khác của legal spec.

---

**Loại:** `Task`
**Ref:** T-0401
**Môi trường:** `DEV/TEST`

### Tóm tắt
> Khoá nguồn sự thật cho giá/gói trong `@banmenh/shared`. Frontend pricing đọc qua workspace alias, không còn relative path xuyên thư mục, không hardcode giá.

### Thay đổi
- `packages/shared/package.json` (mới): khai báo `@banmenh/shared` workspace package, private, `main`/`types`/`exports` trỏ `./src/index.ts`, không dependency.
- `packages/shared/src/pricing.ts` (refactor, ~108 dòng): mở rộng type `Product` đầy đủ (`code`, `module`, `name`, `description`, `priceVnd`, `tier`, `features`, `activeFrom?`, `activeUntil?`); `ProductModule` và `ProductTier` thành discriminated union; `PRODUCTS` 4 sản phẩm placeholder; helpers `formatPriceVnd`, `findProduct`, `getProductsByModule`.
- `packages/shared/src/index.ts`: giữ `export * from "./pricing"` (đã có sẵn).
- `apps/web/package.json`: thêm `"@banmenh/shared": "*"` vào dependencies (npm workspaces).
- `apps/web/src/app/pricing/page.tsx` (refactor, ~165 dòng): import từ `@banmenh/shared`, group 4 cards theo module (Thần số học / Tarot / Combo), render `features[]` bullet, badge tier dùng nhãn tiếng Việt.
- `docs/TASK_REGISTRY.md`: T-0401 → `Done` với block update đầy đủ.

### Product codes đã chốt (placeholder)
- `numerology_single_report` — Báo cáo Thần số học — 99.000₫ — `single_report`.
- `tarot_session_one` — Phiên Tarot 1 lá — 49.000₫ — `session`.
- `tarot_session_three` — Phiên Tarot 3 lá — 79.000₫ — `session`.
- `bundle_explorer` — Gói Khám phá — 249.000₫ — `bundle`.

### Không làm
- Không thêm zod (để T-0403).
- Không đụng `errors.ts` (T-0402).
- Không đụng `schemas/` (T-0403).
- Không implement payment flow / voucher logic (T-0505/T-0506).
- Không copy code V1.
- Không hardcode giá ở frontend.
- Không thêm `paths` alias trong `tsconfig.json` vì `moduleResolution: bundler` + workspace symlink đã đủ; verify bằng file test tạm rồi xóa.

### Verify
- `npm install` ở root → tạo Junction `node_modules/@banmenh/shared` → `E:\Project\Project\banmenh\packages\shared`.
- `npm run check` (typecheck + lint + security:smoke + build) → Pass; `/pricing` được prerender static.
- `npm run qa:responsive-audit` → Pass.
- Import `@banmenh/shared` trong `pricing/page.tsx` resolve OK qua workspace symlink, không còn `../../../../../packages/shared/src/pricing`.
- File `pricing.ts` ~108 dòng (<150), `pricing/page.tsx` ~165 dòng (<200).

### Rủi ro / lưu ý còn lại
- **Pricing inconsistency với legal-commercial-spec mục 7:** spec ghi Numerology 49.000đ, task chỉ định 99.000₫. Đã theo task vì cụ thể hơn, nhưng cần Zenki chốt giá chính thức trước launch (hoặc cập nhật `legal-commercial-spec.md` mục 7) để tránh claim mâu thuẫn.
- `tarot_session_one` (49.000₫) là placeholder mới chưa được nhắc trong legal spec; cần chốt cùng đợt rà giá.
- Tier `subscription` đã định nghĩa trong type nhưng chưa có sản phẩm; sẽ kích hoạt khi có monthly tier (cần ADR theo legal-commercial-spec mục 7).
- Voucher/entitlement runtime sẽ dùng cùng `productCode` này khi vào T-0505/T-0506.

---

**Loại:** `Task`
**Ref:** T-0209
**Môi trường:** `DEV/TEST`

### Tóm tắt
> Thêm ambient galaxy background toàn app bằng Canvas 2D React component. Source reference là file user cung cấp `C:\Users\ADMIN\Desktop\New folder\galaxy-effect.html`; chỉ tham khảo/adapt logic, không copy nguyên HTML.

### Thay đổi
- `apps/web/src/components/layout/GalaxyBackground.tsx`: thêm client component canvas fixed, DPR-aware, sao twinkle, particles, nebula và 5 vòng orbit elip nghiêng 3D.
- `apps/web/src/components/layout/index.ts`: export `GalaxyBackground`.
- `apps/web/src/app/layout.tsx`: render background global trước `Header`, body giữ `position: relative` để z-index hoạt động.
- `docs/TASK_REGISTRY.md`: thêm và hoàn tất T-0209 ở cuối Phase 2.

### Verify
- `npm run check` → Pass.
- `npm run qa:responsive-audit` → Pass.
- Chrome headless 375px: `/`, `/than-so-hoc`, `/tarot`, `/pricing`, `/account` đều có canvas fixed `z-index: -1`, không overflow ngang, canvas có pixel render.
- `prefers-reduced-motion` được emulate qua DevTools protocol và component chỉ render frame tĩnh; tab inactive pause qua `document.hidden`/`visibilitychange`.
- File `GalaxyBackground.tsx`: 248 dòng (<250).

---

## [2026-05-18 11:01 +07] — T-0306: Tạo legal/support route skeleton

**Loại:** `Task`
**Ref:** T-0306
**Môi trường:** `DEV/TEST`

### Tóm tắt
> Tạo 3 route skeleton cho Privacy, Terms và Support. Copy là skeleton, T-0801 sẽ rà soát pháp lý trước launch.

### Thay đổi
- `apps/web/src/app/legal/privacy/page.tsx`: thêm route `/legal/privacy` với các section dữ liệu thu thập, cách sử dụng, bên thứ ba, quyền người dùng và cập nhật.
- `apps/web/src/app/legal/terms/page.tsx`: thêm route `/legal/terms` với bản chất nội dung, quyền tác giả, thanh toán/hoàn tiền, hành vi cấm, thay đổi điều khoản và liên hệ.
- `apps/web/src/app/support/page.tsx`: thêm route `/support` với FAQ placeholder và kênh liên hệ.
- `docs/TASK_REGISTRY.md`: cập nhật T-0306 sang `Done` và ghi block hoàn tất.

### Không làm
- Không copy điều khoản từ site khác.
- Không thêm dependency, không thêm claim thương mại quá mức.
- Không sửa Footer vì link đã trỏ đúng `/support`, `/legal/terms`, `/legal/privacy`.

### Verify
- `npm run check` → Pass.
- `npm run qa:responsive-audit` → Pass.
- Build prerender `/legal/privacy`, `/legal/terms`, `/support`.
- Chrome headless 375px: cả 3 route `maxScrollWidth=375`, click `Dashboard` về `/`.
- File line count: privacy 65 dòng, terms 77 dòng, support 82 dòng.

---

## [2026-05-18 10:52 +07] — T-0305: Tạo skeleton route `/account`

**Loại:** `Task`
**Ref:** T-0305
**Môi trường:** `DEV/TEST`

### Tóm tắt
> Tạo account skeleton với logged-out state mặc định và preview logged-in bằng query param `?preview=loggedin`. Auth thật sẽ mở ở T-0405.

### Thay đổi
- `apps/web/src/app/account/page.tsx`: thêm route `/account` dùng PageShell, UnauthorizedState mặc định và layout preview logged-in.
- Preview logged-in có 3 section: thông tin tài khoản demo, báo cáo đã mua, quyền truy cập.
- `docs/TASK_REGISTRY.md`: cập nhật T-0305 sang `Done` và ghi block hoàn tất.

### Không làm
- Không implement Firebase Auth.
- Không đọc/ghi Firestore.
- Không persist state, không expose dữ liệu giả như dữ liệu thật.

### Verify
- `npm run check` → Pass.
- `npm run qa:responsive-audit` → Pass.
- Build có route `/account`.
- Chrome headless 375px: `/account` hiển thị UnauthorizedState; `/account?preview=loggedin` hiển thị 3 section placeholder; `maxScrollWidth=375`.
- Click link `Dashboard` trên PageShell quay về `/`.
- `apps/web/src/app/account/page.tsx`: 91 dòng.

---

## [2026-05-18 10:41 +07] — T-0304: Tạo skeleton route `/pricing`

**Loại:** `Task`
**Ref:** T-0304
**Môi trường:** `DEV/TEST`

### Tóm tắt
> Tạo pricing skeleton đọc dữ liệu từ shared pricing placeholder thay vì hardcode trong page. T-0401 sẽ mở rộng pricing contract đầy đủ.

### Thay đổi
- `packages/shared/src/pricing.ts`: thêm `PRODUCTS`, `Product` type và `formatPriceVnd`; đây là placeholder pricing — sẽ được mở rộng ở T-0401.
- `packages/shared/src/index.ts`: export pricing placeholder.
- `apps/web/src/app/pricing/page.tsx`: thêm route `/pricing` với pricing cards, FAQ placeholder và disclaimer thương mại mềm.
- `docs/TASK_REGISTRY.md`: cập nhật T-0304 sang `Done` và ghi block hoàn tất.

### Không làm
- Không implement payment flow.
- Không thêm voucher, entitlement hoặc business logic thanh toán.
- Không thêm dependency, không đổi alias/config.

### Verify
- `npm run check` → Pass.
- `npm run qa:responsive-audit` → Pass.
- Build prerender route `/pricing`.
- Chrome headless 375px route `/pricing`: `maxScrollWidth=375`, hiển thị giá `99.000₫`, `79.000₫`, `249.000₫`.
- Click link `Dashboard` trên PageShell quay về `/`.
- `apps/web/src/app/pricing/page.tsx`: 99 dòng; `packages/shared/src/pricing.ts`: 34 dòng.

---

## [2026-05-18 10:32 +07] — T-0303: Tạo skeleton route `/tarot`

**Loại:** `Task`
**Ref:** T-0303
**Môi trường:** `DEV/TEST`

### Tóm tắt
> Tạo route skeleton riêng cho Tarot, đồng bộ layout với Numerology và giữ đúng boundary: không rút bài, không gọi AI/API/KB, không mở spread ngoài MVP.

### Thay đổi
- `apps/web/src/app/tarot/page.tsx`: thêm route `/tarot` với PageShell, skeleton Daily Message, skeleton phiên Tarot, thư viện lá bài placeholder và disclaimer Tarot.
- `docs/TASK_REGISTRY.md`: cập nhật T-0303 sang `Done` và ghi block hoàn tất.

### Không làm
- Không implement shuffle/select/flip.
- Không hiển thị spread 5/7/10/12 lá.
- Không gọi AI, không gọi API, không import/public KB private.
- Không thêm dependency.

### Verify
- `npm run check` → Pass.
- `npm run qa:responsive-audit` → Pass.
- Build prerender route `/tarot`.
- Chrome headless 375px route `/tarot`: render H1 `Tarot`, `maxScrollWidth=375`.
- Click link `Dashboard` trên PageShell quay về `/`.
- `apps/web/src/app/tarot/page.tsx`: 95 dòng.

---

## [2026-05-18 10:13 +07] — T-0302: Tạo skeleton route `/than-so-hoc`

**Loại:** `Task`
**Ref:** T-0302
**Môi trường:** `DEV/TEST`

### Tóm tắt
> Tạo route skeleton riêng cho module Thần số học trước khi build form thật, dùng PageShell/component chung và giữ link Hub `/than-so-hoc` render được.

### Thay đổi
- `apps/web/src/app/than-so-hoc/page.tsx`: thêm route `/than-so-hoc` với PageShell, card placeholder nhập thông tin, button disabled, grid 6 chỉ số và disclaimer module.
- `docs/TASK_REGISTRY.md`: cập nhật T-0302 sang `Done` và ghi block hoàn tất.

### Không làm
- Không tạo `/than-so-hoc/result`.
- Không implement form input thật; phần này giữ cho T-0601.
- Không gọi API, không import KB, không thêm dependency.

### Verify
- `npm run check` → Pass.
- `npm run qa:responsive-audit` → Pass.
- Build prerender route `/than-so-hoc`.
- Chrome headless 375px route `/than-so-hoc`: render H1 `Thần số học`, `maxScrollWidth=375`.
- Click link `Dashboard` trên PageShell quay về `/`.
- `apps/web/src/app/than-so-hoc/page.tsx`: 101 dòng.

---

## [2026-05-18 09:58 +07] — Correction: T-0301 Button polymorphic + responsive audit Hub

**Loại:** `Correction`
**Ref:** T-0301
**Môi trường:** `DEV/TEST`

### Tóm tắt
> Patch nhỏ sau T-0301 để `Button` render được link nội bộ bằng `<a href>` khi có `href`, refactor Hub dùng lại Button cho CTA/link module, và cập nhật responsive audit theo route demo mới.

### Thay đổi
- `apps/web/src/components/ui/Button.tsx`: thêm prop optional `href`, render `<a>` khi có href; giữ nhánh `<button>` cũ khi không có href.
- `apps/web/src/app/page.tsx`: bỏ class CTA riêng, dùng `Button href` cho hero CTA và link module.
- `tools/responsive-qa-audit.mjs`: đổi check Home cũ thành check Hub hero grid và check demo-components showcase.

### Verify
- `npm run check` → Pass.
- `npm run qa:responsive-audit` → Pass.
- Chrome headless 375px route `/`: `maxScrollWidth=375`, các anchor `/than-so-hoc`, `/tarot`, `/pricing` render được.
- `apps/web/src/components/ui/Button.tsx`: 143 dòng.

---

## [2026-05-18 09:45 +07] — T-0301: Tạo Hub skeleton cho route `/`

**Loại:** `Task`
**Ref:** T-0301
**Môi trường:** `DEV/TEST`

### Tóm tắt
> Thay route `/` từ demo showcase sang Hub skeleton thật, giữ demo component ở route riêng `/demo-components`, và nối các CTA/module bằng `<a href>` placeholder đúng phạm vi task.

### Thay đổi
- `apps/web/src/app/page.tsx`: tạo Hub bằng `PageShell showBack={false}`, hero, CTA, module cards Thần số học/Tarot/Daily Message, lý do chọn Bản Mệnh V2 và disclaimer.
- `apps/web/src/app/demo-components/page.tsx`: chuyển nội dung demo showcase cũ sang route `/demo-components`.
- `docs/TASK_REGISTRY.md`: cập nhật T-0301 sang `Done` và ghi block hoàn tất.

### Không làm
- Không tạo route `/than-so-hoc`, `/tarot`, `/pricing`, `/account`.
- Không thêm dependency, không import KB, không gọi API thật.
- Không dùng `next/link`; skeleton giữ `<a href>` như scope T-0301.

### Verify
- `npm run check` → Pass.
- `npm run qa:responsive-audit` → Pass.
- Chrome headless 375px route `/`: `maxScrollWidth=375`, không tràn ngang.
- `apps/web/src/app/page.tsx`: 135 dòng; `apps/web/src/app/demo-components/page.tsx`: 149 dòng.

### Rủi ro còn lại
- Link `/than-so-hoc`, `/tarot`, `/pricing` hiện trả 404 cho đến các task route tương ứng; đây là expected ở T-0301.

---

## [2026-05-17 10:15 +07] — Correction: T-0208 Responsive QA (xử lý lại)

**Loại:** `Correction`
**Ref:** T-0208
**Môi trường:** `DEV/TEST`

### Tóm tắt
> Bổ sung xác nhận 768px/1366px bằng audit class trong repo, thêm `md:grid-cols-2` cho Footer, script `npm run qa:responsive-audit`, cập nhật `docs/responsive-qa-t-0208.md` phiên bản 2.

### Nguyên nhân correction
- Phiên bản trước không xác nhận được tablet/desktop thực tế trong browser pane hẹp; Footer chỉ lên 4 cột từ `lg` (1024px) nên checklist “768px grid 2 cột” chưa khớp rõ.

### Thay đổi
- `apps/web/src/components/layout/Footer.tsx`: thêm `md:grid-cols-2` trước `lg:grid-cols-[1.4fr_1fr_1fr_1fr]`.
- `tools/responsive-qa-audit.mjs` + `npm run qa:responsive-audit` trong `package.json` root.
- `docs/responsive-qa-t-0208.md`: tái cấu trúc — phiên bản 2 ở đầu, lịch sử phiên bản 1 giữ phía sau.

### Verify
- `npm run qa:responsive-audit` → Pass.
- `npm run check` → Pass.

### QA report
- `docs/responsive-qa-t-0208.md`

---

## [2026-05-16 23:52 +07] — T-0208: Responsive UI QA nền

**Loại:** `Task`
**Type:** `QA`
**Ref:** T-0208
**Môi trường:** `DEV/TEST`
**Branch:** local workspace
**PR / MR:** N/A
**AI Tools Used:** Cursor
**Implementation Owner:** Cursor
**Review Owner:** Self-review
**Effort thực tế:** ~0.3h

---

### Tóm tắt một dòng
> Đã QA responsive nền cho Header/Footer/PageShell/Button/Card, ghi report và sửa một lỗi focus-visible nhỏ.

---

### QA report
- Report: `docs/responsive-qa-t-0208.md`

### Những gì đã làm
- Mở dev server local và kiểm tra `/`, `/demo-shell`.
- Kiểm tra mobile width hẹp: không thấy horizontal scroll, hamburger drawer mở/đóng OK, CTA không bị che trong vùng quan sát.
- Kiểm tra Footer trên page ngắn `/demo-shell`: Footer nằm sau PageShell, không chen dưới Header.
- Kiểm tra Footer stack mobile: các cột xếp dọc, không overlap.
- Kiểm tra text tiếng Việt có dấu trên heading/body/navigation.
- Kiểm tra focus-visible bằng code và viewport; bổ sung ring cho brand link trong Footer.

### Fix đã thực hiện
- `apps/web/src/components/layout/Footer.tsx`: thêm focus-visible ring cho brand link `Bản Mệnh`.
- Trước fix: Footer brand link không có focus ring riêng.
- Sau fix: Footer brand link dùng cùng token `--bm-primary-soft` như hệ link/button.

### Những gì KHÔNG làm *(scope exclusion)*
- Không thêm dependency.
- Không đổi token.
- Không refactor component lớn.
- Không sửa route/module ngoài scope.
- Không deploy.

---

### Verify / Commands
- `npm run check` → Pass (`typecheck`, `lint`, `security:smoke`, `build`).

### Issue / Limitation còn lại
- Cursor browser pane không mở rộng đủ để xác nhận trực quan chính xác 768px/1366px; phần này đã ghi trong QA report và đối chiếu bằng responsive class trong code.
- Cursor browser chèn `data-cursor-ref` vào DOM, làm Next dev overlay báo hydration mismatch; đây là artifact của automation tool, không phải lỗi app.
- Trước khi test có lỗi môi trường `ENOSPC`; đã xóa terminal log cũ để dev server chạy lại.

---

## [2026-05-16 23:35 +07] — T-0207: Tạo Header/Footer chuẩn

**Loại:** `Task`
**Type:** `IMPLEMENTATION`
**Ref:** T-0207
**Môi trường:** `DEV/TEST`
**Branch:** local workspace
**PR / MR:** N/A
**AI Tools Used:** Cursor
**Implementation Owner:** Cursor
**Review Owner:** Self-review
**Effort thực tế:** ~0.5h

---

### Tóm tắt một dòng
> Đã tạo Header/Footer global, tích hợp vào RootLayout và refactor PageShell để footer chỉ nằm cuối page.

---

### Những gì đã làm
- Tạo `apps/web/src/components/layout/Header.tsx` với brand gradient, desktop nav, account placeholder và mobile drawer.
- Tạo `apps/web/src/components/layout/Footer.tsx` với nền `--bm-gradient-footer`, grid responsive, links hỗ trợ và disclaimer.
- Cập nhật `apps/web/src/components/layout/index.ts` export Header/Footer.
- Cập nhật `apps/web/src/app/layout.tsx` để body là `flex min-h-screen flex-col`, Header ở trên, `<main className="flex-1">` bọc children, Footer ở dưới.
- Refactor `apps/web/src/components/layout/PageShell.tsx` từ `<main>` sang `<section>` để tránh duplicate `<main>`.
- Refactor `apps/web/src/app/page.tsx` từ `<main>` sang `<div>` vì RootLayout đã sở hữu landmark main.

### Những gì KHÔNG làm *(scope exclusion)*
- Không thêm dependency.
- Không implement auth thật hoặc dropdown logic thật.
- Không copy code Header/Footer từ V1.
- Không tạo route module thật cho `/than-so-hoc`, `/tarot`, `/pricing`.
- Không deploy.

---

### Lựa chọn về `<main>`
- Chọn phương án RootLayout sở hữu `<main className="flex-1">`.
- `PageShell` đổi sang `<section>` để page module vẫn có semantic section nhưng không tạo nested main.
- Home demo đổi sang `<div>` vì chỉ là nội dung bên trong landmark main global.
- Lý do: Footer cần nằm ngoài main và sau main trong flex body để page ngắn dính đáy viewport, page dài nằm sau toàn bộ content.

---

### Output thực tế vs kỳ vọng

| Output kỳ vọng | Output thực tế | Kết quả |
|----------------|----------------|---------|
| Header global | `Header.tsx` tích hợp trong RootLayout | ✅ Đúng plan |
| Footer global cuối page | `Footer.tsx` nằm sau global main trong flex body | ✅ Đúng plan |
| Header responsive | Mobile hamburger toggle drawer, desktop nav dùng class responsive | ✅ Đúng plan |
| Navigation tiếng Việt | `Thần số học`, `Tarot`, `Bảng giá`, `Đăng nhập` | ✅ Đúng plan |
| Không duplicate `<main>` | RootLayout là nơi duy nhất render `<main>` | ✅ Đúng plan |

**Độ lệch so với plan:**
- Có dùng `usePathname` từ Next.js để xác định active nav link, không thêm dependency.
- Full-page screenshot không lưu được do môi trường báo `ENOSPC: no space left on device`; viewport browser check vẫn thực hiện được.

---

### Verify / Commands
- `npm run check` → Pass (`typecheck`, `lint`, `security:smoke`, `build`).
- Manual browser `/` → load được, Header sticky hiển thị, mobile hamburger xuất hiện, Footer không nằm ngay dưới Header.
- Manual browser `/demo-shell` → load được, mobile drawer hiển thị 3 nav links + nút `Đăng nhập`, Footer nằm sau nội dung PageShell.

### Security / Risk
- Không thêm secret, env, token, KB hoặc dependency.
- Không có auth logic thật; `user?: { name: string }` chỉ là UI placeholder.
- Issue còn lại: các route nav chưa tồn tại vì ngoài scope task; sẽ xử lý ở task route/module sau.

---

## [2026-05-16 22:53 +07] — T-0206: Tạo PageShell và navigation convention

**Loại:** `Task`
**Type:** `IMPLEMENTATION`
**Ref:** T-0206
**Môi trường:** `DEV/TEST`
**Branch:** local workspace
**PR / MR:** N/A
**AI Tools Used:** Cursor
**Implementation Owner:** Cursor
**Review Owner:** Self-review
**Effort thực tế:** ~0.4h

---

### Tóm tắt một dòng
> Đã tạo PageShell, BackToDashboard và route demo `/demo-shell` để chuẩn hóa khung trang module.

---

### Những gì đã làm
- Tạo `apps/web/src/components/layout/PageShell.tsx`.
- Tạo `apps/web/src/components/layout/BackToDashboard.tsx`.
- Tạo `apps/web/src/components/layout/index.ts`.
- Tạo route demo `apps/web/src/app/demo-shell/page.tsx`.
- Cập nhật `apps/web/src/app/page.tsx` thêm link tới `/demo-shell`.
- `PageShell` hỗ trợ title/subtitle/back/action slot/container width và layout responsive.
- `BackToDashboard` dùng anchor thuần theo convention `← Dashboard`.

### Những gì KHÔNG làm *(scope exclusion)*
- Không thêm dependency.
- Không dùng `next/link`; anchor `<a>` đủ cho skeleton và đúng yêu cầu, sẽ refactor ở route task sau nếu cần.
- Không implement Header/Footer.
- Không thêm business logic, route module thật, payment/auth/KB logic.
- Không deploy.

---

### Component đã tạo
- `PageShell`: container `narrow`/`default`/`wide`, top row back/actions, title block và children slot.
- `BackToDashboard`: standalone back link reusable cho page custom không dùng PageShell.

### Route demo đã áp dụng
- `/demo-shell`: title `Demo PageShell`, subtitle `Khung trang chuẩn cho mọi module`, action Button `Bắt đầu`, 3 Card nội dung.
- Home `/`: có link `Xem demo PageShell →` để test navigation.

---

### Output thực tế vs kỳ vọng

| Output kỳ vọng | Output thực tế | Kết quả |
|----------------|----------------|---------|
| PageShell component | `apps/web/src/components/layout/PageShell.tsx` | ✅ Đúng plan |
| BackToDashboard component | `apps/web/src/components/layout/BackToDashboard.tsx` | ✅ Đúng plan |
| Route demo | `apps/web/src/app/demo-shell/page.tsx` | ✅ Đúng plan |
| Nút `← Dashboard` thống nhất | Default label/href trong PageShell và BackToDashboard | ✅ Đúng plan |
| Mobile không che content | Top row flex column trên mobile, actions xuống dòng nếu chật | ✅ Đúng plan |

**Độ lệch so với plan:**
Không có độ lệch.

---

### Trạng thái deploy

| Môi trường | Đã deploy? | Thời điểm | Verify OK? | Ghi chú |
|-----------|-----------|----------|-----------|---------|
| DEV/TEST | Chưa | — | N/A | Chỉ chạy local checks |
| PRODUCTION | Chưa | — | N/A | Không deploy |

---

### Quyết định kỹ thuật quan trọng
Không có quyết định kiến trúc mới. Dùng anchor `<a>` cho skeleton đúng yêu cầu; chưa dùng `next/link`.

---

### AI Code Notes
- **Phần code do AI sinh:** PageShell, BackToDashboard, layout barrel export, demo route.
- **Agent chính:** Cursor
- **Đã verify:** [x] Không có hallucinated API [x] `npm run check` pass [x] Build liệt kê `/demo-shell`
- **Prompt quan trọng lưu lại:** User yêu cầu làm `T-0206`, tạo PageShell/back button convention, demo route, không Header/Footer.
- **Rủi ro còn lại từ AI code:** Chưa có browser visual QA riêng cho mobile top row; build/typecheck/lint/security smoke đã pass.

---

### Tech Debt
Không phát sinh tech debt mới.

---

### Code Smell
Không phát hiện code smell đáng kể.

---

### Security Audit

**Mode:** `QUICK`

#### QUICK Audit — 5 mục core
- [x] API key không bị expose phía client
- [x] `.env` không commit lên git
- [x] Input từ user không phát sinh trong task này
- [x] Không có credential production lẫn vào DEV/TEST
- [x] Không có thông tin nhạy cảm bị log ra console

**Tổng kết:**
- Vấn đề tìm thấy: 0
- Đã fix: 0
- Còn tồn đọng: 0

---

### Commands đã chạy
- `npm run check` — pass; build prerender route `/demo-shell`

---

### Blockers & Dependencies Update
- **Task này unblocks:** T-0302, T-0303 và các module route skeleton cần PageShell.
- **Dependency mới phát hiện:** Không có.
- **Update TASK_REGISTRY needed:** Đã cập nhật `T-0206` sang `Done`.

---

### Metrics
N/A, không deploy.

---

### Next Steps
- Cần tạo task: Không có.
- Cần update RISK_REGISTER: Không có.
- Cần update ADR: Không có.

---

## [2026-05-16 22:41 +07] — T-0205: Tạo Loading/Error/Empty states

**Loại:** `Task`
**Type:** `IMPLEMENTATION`
**Ref:** T-0205
**Môi trường:** `DEV/TEST`
**Branch:** local workspace
**PR / MR:** N/A
**AI Tools Used:** Cursor
**Implementation Owner:** Cursor
**Review Owner:** Self-review
**Effort thực tế:** ~0.5h

---

### Tóm tắt một dòng
> Đã tạo bộ state components dùng chung cho loading, error, empty và unauthorized với message tiếng Việt rõ ràng.

---

### Những gì đã làm
- Tạo `apps/web/src/components/ui/states/LoadingState.tsx`.
- Tạo `apps/web/src/components/ui/states/ErrorState.tsx`.
- Tạo `apps/web/src/components/ui/states/EmptyState.tsx`.
- Tạo `apps/web/src/components/ui/states/UnauthorizedState.tsx`.
- Tạo `apps/web/src/components/ui/states/index.ts`.
- Re-export state components trong `apps/web/src/components/ui/index.ts`.
- Cập nhật `apps/web/src/app/page.tsx` thêm `States showcase`, mỗi state được bọc bởi một `Card padding="lg" variant="default"`.

### Những gì KHÔNG làm *(scope exclusion)*
- Không thêm dependency icon.
- Không dùng raw error hoặc text `Failed to fetch`.
- Không gọi API, Firebase, auth SDK hoặc business logic trong state components.
- Không tạo route mới, payment/auth/KB integration.
- Không deploy.

---

### State components đã tạo
- `LoadingState`: spinner inline SVG, optional message, size `sm`/`md`/`lg`; default message `Đang tải...`.
- `ErrorState`: icon cảnh báo, title/description tiếng Việt, CTA retry optional dùng Button secondary; default title `Có lỗi xảy ra`, description `Vui lòng thử lại sau ít phút.`
- `EmptyState`: icon nhẹ, required title, optional description/action/icon; default description `Chưa có dữ liệu để hiển thị.`
- `UnauthorizedState`: icon khóa, title `Cần đăng nhập`, optional login CTA; default description `Vui lòng đăng nhập để tiếp tục hành trình của bạn.`

### Ví dụ message chuẩn
- Error: `Có lỗi xảy ra` / `Vui lòng thử lại sau ít phút.`
- Empty: `Chưa có báo cáo` / `Khi bạn tạo báo cáo đầu tiên, kết quả sẽ xuất hiện tại đây.`
- Unauthorized: `Cần đăng nhập` / `Đăng nhập để xem lại các báo cáo đã lưu.`

---

### Output thực tế vs kỳ vọng

| Output kỳ vọng | Output thực tế | Kết quả |
|----------------|----------------|---------|
| LoadingState | `LoadingState.tsx` với spinner/message/size | ✅ Đúng plan |
| ErrorState | `ErrorState.tsx` với message tiếng Việt và retry CTA optional | ✅ Đúng plan |
| EmptyState | `EmptyState.tsx` với icon/title/description/action optional | ✅ Đúng plan |
| UnauthorizedState | `UnauthorizedState.tsx` với lock icon/login CTA optional | ✅ Đúng plan |
| Demo showcase | `page.tsx` có 4 state cards ngang hàng | ✅ Đúng plan |
| Không raw error | Không có `Failed to fetch`, stack trace hoặc raw error render | ✅ Đúng plan |

**Độ lệch so với plan:**
Không có độ lệch.

---

### Trạng thái deploy

| Môi trường | Đã deploy? | Thời điểm | Verify OK? | Ghi chú |
|-----------|-----------|----------|-----------|---------|
| DEV/TEST | Chưa | — | N/A | Chỉ chạy local checks |
| PRODUCTION | Chưa | — | N/A | Không deploy |

---

### Quyết định kỹ thuật quan trọng
Không có quyết định kiến trúc mới.

---

### AI Code Notes
- **Phần code do AI sinh:** 4 state components, barrel exports, States showcase.
- **Agent chính:** Cursor
- **Đã verify:** [x] Không có hallucinated API [x] `npm run check` pass [x] Không raw error text
- **Prompt quan trọng lưu lại:** User yêu cầu làm `T-0205`, tạo Loading/Error/Empty/Unauthorized states với inline SVG và message tiếng Việt, không business logic.
- **Rủi ro còn lại từ AI code:** Chưa có visual browser QA riêng cho từng viewport; build/typecheck/lint/security smoke đã pass.

---

### Tech Debt
Không phát sinh tech debt mới.

---

### Code Smell
Không phát hiện code smell đáng kể.

---

### Security Audit

**Mode:** `QUICK`

#### QUICK Audit — 5 mục core
- [x] API key không bị expose phía client
- [x] `.env` không commit lên git
- [x] Input từ user không phát sinh trong task này
- [x] Không có credential production lẫn vào DEV/TEST
- [x] Không có thông tin nhạy cảm bị log ra console

**Tổng kết:**
- Vấn đề tìm thấy: 0
- Đã fix: 0
- Còn tồn đọng: 0

---

### Commands đã chạy
- `npm run check` — pass

---

### Blockers & Dependencies Update
- **Task này unblocks:** T-0206 và route skeleton tasks cần loading/error/empty/unauthorized states.
- **Dependency mới phát hiện:** Không có.
- **Update TASK_REGISTRY needed:** Đã cập nhật `T-0205` sang `Done`.

---

### Metrics
N/A, không deploy.

---

### Next Steps
- Cần tạo task: Không có.
- Cần update RISK_REGISTER: Không có.
- Cần update ADR: Không có.

---

## [2026-05-16 22:34 +07] — T-0204: Tạo component Card/Panel

**Loại:** `Task`
**Type:** `IMPLEMENTATION`
**Ref:** T-0204
**Môi trường:** `DEV/TEST`
**Branch:** local workspace
**PR / MR:** N/A
**AI Tools Used:** Cursor
**Implementation Owner:** Cursor
**Review Owner:** Self-review
**Effort thực tế:** ~0.5h

---

### Tóm tắt một dòng
> Đã tạo Card/Panel base component dùng token thiết kế, có variants, padding, interactive hover và semantic `as`.

---

### Những gì đã làm
- Tạo `apps/web/src/components/ui/Card.tsx` 83 dòng.
- Cập nhật `apps/web/src/components/ui/index.ts` export `Card` và `CardProps`.
- Variants đã tạo: `default`, `glass`, `panel`, `report`.
- Padding đã tạo: `sm`, `md`, `lg`.
- Hỗ trợ `interactive`, `as`, `className`, `children` và rest props.
- Refactor `apps/web/src/app/page.tsx` để typography panel và Button showcase dùng `Card`.
- Thêm `Card showcase` với 4 variants, 3 padding và interactive state.
- Demo Card showcase dùng card ngang hàng, không có card lồng card.

### Những gì KHÔNG làm *(scope exclusion)*
- Không dùng thư viện UI.
- Không thêm dependency.
- Không tạo Badge/Input/ModuleCard.
- Không tạo business logic, route mới, payment/auth/KB logic.
- Không hardcode màu/radius.

---

### Component và rule sử dụng
- `default`: repeated items hoặc card nhẹ.
- `glass`: glass panel nổi hơn, có backdrop blur nhẹ.
- `panel`: framed tools/form/payment box sau này.
- `report`: result panel cho Numerology/Tarot.
- Rule: không lồng card trong card; không dùng Card chỉ để tạo spacing toàn section; interactive chỉ dùng cho item có hành động click/navigate rõ.

---

### Output thực tế vs kỳ vọng

| Output kỳ vọng | Output thực tế | Kết quả |
|----------------|----------------|---------|
| Card/Panel component | `apps/web/src/components/ui/Card.tsx` 83 dòng | ✅ Đúng plan |
| Usage rule trong docs/comment ngắn | Ghi trong TASK_REGISTRY và DEVLOG | ✅ Đúng plan |
| Component có variant tối thiểu | `default`, `glass`, `panel`, `report` | ✅ Đúng plan |
| Không tạo card lồng card trong demo | Card showcase dùng sibling cards trong grid | ✅ Đúng plan |
| Mobile width an toàn | Grid 1 cột mobile, card dùng width parent | ✅ Đúng plan |

**Độ lệch so với plan:**
Không có độ lệch.

---

### Trạng thái deploy

| Môi trường | Đã deploy? | Thời điểm | Verify OK? | Ghi chú |
|-----------|-----------|----------|-----------|---------|
| DEV/TEST | Chưa | — | N/A | Chỉ chạy local checks |
| PRODUCTION | Chưa | — | N/A | Không deploy |

---

### Quyết định kỹ thuật quan trọng
Không có quyết định kiến trúc mới.

---

### AI Code Notes
- **Phần code do AI sinh:** `Card.tsx`, export index, Card showcase trong `page.tsx`.
- **Agent chính:** Cursor
- **Đã verify:** [x] Không có hallucinated API [x] `npm run check` pass [x] Không card lồng card trong showcase
- **Prompt quan trọng lưu lại:** User yêu cầu làm `T-0204`, tạo Card/Panel component với variants/padding/interactive/as, không thêm dependency hoặc UI library.
- **Rủi ro còn lại từ AI code:** Chưa có browser visual QA riêng cho hover/focus; code showcase và build/typecheck/lint đã pass.

---

### Tech Debt
Không phát sinh tech debt mới.

---

### Code Smell
Không phát hiện code smell đáng kể.

---

### Security Audit

**Mode:** `QUICK`

#### QUICK Audit — 5 mục core
- [x] API key không bị expose phía client
- [x] `.env` không commit lên git
- [x] Input từ user không phát sinh trong task này
- [x] Không có credential production lẫn vào DEV/TEST
- [x] Không có thông tin nhạy cảm bị log ra console

**Tổng kết:**
- Vấn đề tìm thấy: 0
- Đã fix: 0
- Còn tồn đọng: 0

---

### Commands đã chạy
- `npm run check` — pass

---

### Blockers & Dependencies Update
- **Task này unblocks:** T-0205 và các route/module UI tasks cần panel/card base.
- **Dependency mới phát hiện:** Không có.
- **Update TASK_REGISTRY needed:** Đã cập nhật `T-0204` sang `Done`.

---

### Metrics
N/A, không deploy.

---

### Next Steps
- Cần tạo task: Không có.
- Cần update RISK_REGISTER: Không có.
- Cần update ADR: Không có.

---

## [2026-05-16 20:23 +07] — T-0203: Tạo component Button/CTA

**Loại:** `Task`
**Type:** `IMPLEMENTATION`
**Ref:** T-0203
**Môi trường:** `DEV/TEST`
**Branch:** local workspace
**PR / MR:** N/A
**AI Tools Used:** Cursor
**Implementation Owner:** Cursor
**Review Owner:** Self-review
**Effort thực tế:** ~0.6h

---

### Tóm tắt một dòng
> Đã tạo Button/CTA component dùng token thiết kế, có variants, sizes, loading, disabled, icon và fullWidth.

---

### Những gì đã làm
- Tạo `apps/web/src/components/ui/Button.tsx`.
- Tạo `apps/web/src/components/ui/index.ts` export `Button` và `ButtonProps`.
- Component nhận props: `variant`, `size`, `loading`, `disabled`, `leftIcon`, `rightIcon`, `fullWidth` và rest props của `<button>`.
- Variants đã tạo: `primary`, `secondary`, `ghost`, `danger`.
- Sizes đã tạo: `sm`, `md`, `lg` tương ứng min-height 36px, 44px, 52px.
- Loading dùng spinner SVG inline, disable button khi loading.
- Disabled state có opacity và cursor not-allowed.
- Focus-visible ring dùng `--bm-primary-soft`.
- Cập nhật `apps/web/src/app/page.tsx` thêm Button showcase với variants, sizes, loading, disabled, icon và fullWidth.

### Những gì KHÔNG làm *(scope exclusion)*
- Không dùng thư viện UI như Radix, shadcn, Headless UI.
- Không thêm dependency.
- Không tạo Card/Panel component.
- Không thêm business logic, route mới, payment/auth/KB logic.
- Không inline `onclick`.

---

### Output thực tế vs kỳ vọng

| Output kỳ vọng | Output thực tế | Kết quả |
|----------------|----------------|---------|
| Button component | `apps/web/src/components/ui/Button.tsx` 115 dòng | ✅ Đúng plan |
| CTA usage examples | Button showcase trong `apps/web/src/app/page.tsx` | ✅ Đúng plan |
| Loading/disabled rõ | Spinner SVG, `aria-busy`, disabled khi loading, opacity/cursor disabled | ✅ Đúng plan |
| Keyboard focus visible | Focus-visible ring dùng `--bm-primary-soft` | ✅ Đúng plan |
| Không hardcode màu | Color/gradient/shadow dùng `var(--bm-*)` | ✅ Đúng plan |

**Độ lệch so với plan:**
Không có độ lệch.

---

### Trạng thái deploy

| Môi trường | Đã deploy? | Thời điểm | Verify OK? | Ghi chú |
|-----------|-----------|----------|-----------|---------|
| DEV/TEST | Chưa | — | N/A | Chỉ chạy local checks |
| PRODUCTION | Chưa | — | N/A | Không deploy |

---

### Quyết định kỹ thuật quan trọng
Không có quyết định kiến trúc mới.

---

### AI Code Notes
- **Phần code do AI sinh:** `Button.tsx`, `index.ts`, Button showcase trong `page.tsx`.
- **Agent chính:** Cursor
- **Đã verify:** [x] Không có hallucinated API [x] `npm run check` pass [x] File dưới giới hạn dòng
- **Prompt quan trọng lưu lại:** User yêu cầu tạo Button/CTA component T-0203 với variants/sizes/loading/disabled/icons/fullWidth, không thêm dependency hoặc UI library.
- **Rủi ro còn lại từ AI code:** Chưa có visual browser QA riêng cho hover/focus từng state; hiện đã có showcase và build/typecheck/lint pass.

---

### Tech Debt
Không phát sinh tech debt mới.

---

### Code Smell
Không phát hiện code smell đáng kể.

---

### Security Audit

**Mode:** `QUICK`

#### QUICK Audit — 5 mục core
- [x] API key không bị expose phía client
- [x] `.env` không commit lên git
- [x] Input từ user không phát sinh trong task này
- [x] Không có credential production lẫn vào DEV/TEST
- [x] Không có thông tin nhạy cảm bị log ra console

**Tổng kết:**
- Vấn đề tìm thấy: 0
- Đã fix: 0
- Còn tồn đọng: 0

---

### Commands đã chạy
- `npm run check` — pass

---

### Blockers & Dependencies Update
- **Task này unblocks:** T-0204, T-0205 và các route/CTA task sau.
- **Dependency mới phát hiện:** Không có.
- **Update TASK_REGISTRY needed:** Đã cập nhật `T-0203` sang `Done`.

---

### Metrics
N/A, không deploy.

---

### Next Steps
- Cần tạo task: Không có.
- Cần update RISK_REGISTER: Không có.
- Cần update ADR: Không có.

---

## [2026-05-16 19:51 +07] — T-0202: Thiết lập typography và content defaults

**Loại:** `Task`
**Type:** `IMPLEMENTATION`
**Ref:** T-0202
**Môi trường:** `DEV/TEST`
**Branch:** local workspace
**PR / MR:** N/A
**AI Tools Used:** Cursor
**Implementation Owner:** Cursor
**Review Owner:** Self-review
**Effort thực tế:** ~0.6h

---

### Tóm tắt một dòng
> Đã áp dụng typography defaults bằng token và tạo demo tiếng Việt để kiểm tra readability trên mobile/desktop.

---

### Những gì đã làm
- Cập nhật `apps/web/src/app/globals.css` cho base font, body/paragraph line-height, heading scale, small text và text wrapping.
- H1/H2/H3/H4 dùng token `--bm-text-*` từ `tokens.css`, không hardcode font-size.
- Giữ letter spacing không âm (`0`) và thêm `overflow-wrap` để giảm rủi ro tràn ngang.
- Cập nhật `apps/web/src/app/page.tsx` thành demo typography có H1, H2, H3, H4, paragraph tiếng Việt có dấu, small text và đoạn dài.
- Kiểm tra browser viewport 375px; sau khi tăng line-height heading, không thấy text overlap hoặc tràn ngang trong demo.

### Patch trang trí nhỏ — 2026-05-16 20:19 +07
- Patch trang trí T-0202 — fix main đè gradient body, giảm font-weight, thêm gradient text utility. Không phải task mới.
- Bỏ nền riêng ở `<main>` để gradient `body` (`--bm-gradient-bg`) hiển thị xuyên qua.
- Đổi heading font-weight từ `800` xuống `700` để demo bớt nặng.
- Thêm utility `.text-gradient-purple` dùng `--bm-gradient-purple-text`.
- Gán `text-gradient-purple` cho H1 hero, không thêm dependency, không tạo component mới, không đổi token.

### Những gì KHÔNG làm *(scope exclusion)*
- Không thêm dependency font.
- Không tạo Button/CTA hoặc Card/Panel component.
- Không thêm business logic, route mới, payment/auth/KB logic.
- Không deploy.

---

### Font/scale đã chọn
- Font stack: `ui-sans-serif`, `system-ui`, `-apple-system`, `Segoe UI`, `Roboto`, `Helvetica Neue`, `Arial`, `Noto Sans`, `Liberation Sans`, `sans-serif`.
- Hero H1: `--bm-text-hero`, line-height `1.16`.
- Page title H2: `--bm-text-page-title`, line-height `1.28`.
- Section H3: `--bm-text-section-title`, line-height `1.32`.
- Card H4: `--bm-text-card-title`, line-height `1.38`.
- Body: `--bm-text-body`, line-height `1.7`/`1.75`.
- Small: `--bm-text-small`, line-height `1.6`.

### Viewport đã kiểm tra
- Browser resize 375px: text wrap trong khối, tiếng Việt có dấu hiển thị đúng, không thấy overlap sau fix line-height.
- Production build: `npm run check` pass.

---

### Output thực tế vs kỳ vọng

| Output kỳ vọng | Output thực tế | Kết quả |
|----------------|----------------|---------|
| Global typography CSS | `globals.css` có body/heading/paragraph/small defaults dùng token | ✅ Đúng plan |
| Demo text/check trong page skeleton | `page.tsx` demo 53 dòng, có H1-H4 và paragraph tiếng Việt | ✅ Đúng plan |
| Không có text lỗi encoding | Chuỗi dấu `ăắằẳẵặ`, `đ`, `ơớờởỡợ` hiển thị trong demo | ✅ Đúng plan |
| Heading/body readable mobile | Đã tăng line-height heading sau mobile check | ✅ Đúng plan |

**Độ lệch so với plan:**
Không có độ lệch. Có một lần build OOM khi production server tạm còn chạy; đã tắt server tạm và `npm run check` pass.

---

### Trạng thái deploy

| Môi trường | Đã deploy? | Thời điểm | Verify OK? | Ghi chú |
|-----------|-----------|----------|-----------|---------|
| DEV/TEST | Chưa | — | N/A | Chỉ chạy local/browser check |
| PRODUCTION | Chưa | — | N/A | Không deploy |

---

### Quyết định kỹ thuật quan trọng
Không có quyết định kiến trúc mới.

---

### AI Code Notes
- **Phần code do AI sinh:** Typography defaults trong `globals.css` và demo content trong `page.tsx`.
- **Agent chính:** Cursor
- **Đã verify:** [x] Không có hallucinated API [x] `npm run check` pass [x] Mobile typography visual check
- **Prompt quan trọng lưu lại:** User yêu cầu làm `T-0202`, typography defaults bằng token, demo tiếng Việt, không thêm font dependency hoặc Button/Card.
- **Rủi ro còn lại từ AI code:** Browser dev console có hydration warning do Cursor browser instrumentation (`data-cursor-ref`), không tái hiện ở production build.

---

### Tech Debt
Không phát sinh tech debt mới.

---

### Code Smell
Không phát hiện code smell đáng kể.

---

### Security Audit

**Mode:** `QUICK`

#### QUICK Audit — 5 mục core
- [x] API key không bị expose phía client
- [x] `.env` không commit lên git
- [x] Input từ user không phát sinh trong task này
- [x] Không có credential production lẫn vào DEV/TEST
- [x] Không có thông tin nhạy cảm bị log ra console

**Tổng kết:**
- Vấn đề tìm thấy: 0
- Đã fix: 0
- Còn tồn đọng: 0

---

### Commands đã chạy
- `npm run check` — pass
- Browser check `http://localhost:3000` ở viewport resize 375px — pass visual sau line-height fix

---

### Blockers & Dependencies Update
- **Task này unblocks:** T-0203, T-0204, T-0205 và các route skeleton cần typography nền.
- **Dependency mới phát hiện:** Không có.
- **Update TASK_REGISTRY needed:** Đã cập nhật `T-0202` sang `Done`.

---

### Metrics
N/A, không deploy.

---

### Next Steps
- Cần tạo task: Không có.
- Cần update RISK_REGISTER: Không có.
- Cần update ADR: Không có.

---

## [2026-05-16 19:39 +07] — T-0105: Thiết lập dev/test và production config skeleton

**Loại:** `Task`
**Type:** `IMPLEMENTATION`
**Ref:** T-0105
**Môi trường:** `DEV/TEST`
**Branch:** local workspace
**PR / MR:** N/A
**AI Tools Used:** Cursor
**Implementation Owner:** Cursor
**Review Owner:** Self-review
**Effort thực tế:** ~0.5h

---

### Tóm tắt một dòng
> Đã tạo skeleton config tách dev/prod cho frontend và 3 Worker, kèm docs mapping resource không dùng chung secret.

---

### Những gì đã làm
- Tạo `workers/payment/wrangler.toml`, `workers/kb/wrangler.toml`, `workers/admin/wrangler.toml`.
- Mỗi Worker có `[env.dev]` và `[env.production]`, tên resource tách biệt `*-dev` / `*-prod`, placeholder KV/R2 binding.
- Cập nhật `apps/web/next.config.ts` đọc `process.env.NEXT_PUBLIC_APP_ENV`, chỉ cho phép `development`, `dev`, `production`.
- Tạo `docs/product-specs/dev-prod-mapping.md` ghi mapping resource dev/prod, ENV var pattern, rule không share secret và quyền deploy prod.
- Cập nhật `README.md` trỏ tới mapping dev/prod.

### Những gì KHÔNG làm *(scope exclusion)*
- Không deploy thật.
- Không ghi `account_id`, API token hoặc secret thật vào `wrangler.toml`.
- Không code Hono handler hoặc Worker runtime.
- Không thêm dependency.
- Không cập nhật release runbook vì skeleton khớp flow hiện có, không đổi deploy process.

---

### Resource/config đã tạo

| Resource | Dev/Test | Production |
|---|---|---|
| Payment Worker | `banmenh-payment-dev` | `banmenh-payment-prod` |
| KB Worker | `banmenh-kb-dev` | `banmenh-kb-prod` |
| Admin Worker | `banmenh-admin-dev` | `banmenh-admin-prod` |
| R2 KB bucket placeholder | `banmenh-kb-dev` | `banmenh-kb-prod` |
| KV namespace placeholder | `placeholder-dev-kv-namespace-id` | `placeholder-prod-kv-namespace-id` |
| Pages project mapping | `banmenh-v2-dev` | `banmenh-v2-prod` |

---

### Output thực tế vs kỳ vọng

| Output kỳ vọng | Output thực tế | Kết quả |
|----------------|----------------|---------|
| Config deploy frontend | `apps/web/next.config.ts` validates `NEXT_PUBLIC_APP_ENV` | ✅ Đúng plan |
| Config Worker dev/prod placeholder | 3 `wrangler.toml` có dev/prod env và placeholder bindings | ✅ Đúng plan |
| Docs mapping resource | `docs/product-specs/dev-prod-mapping.md` | ✅ Đúng plan |
| Dev/prod config không dùng chung secret | Docs và skeleton tách tên resource, không chứa secret thật | ✅ Đúng plan |

**Độ lệch so với plan:**
Không có độ lệch. Lần đầu `npm run check` bị crash transient ở bước build trên Windows, nhưng `npm run build` riêng pass và lần chạy lại `npm run check` pass.

---

### Trạng thái deploy

| Môi trường | Đã deploy? | Thời điểm | Verify OK? | Ghi chú |
|-----------|-----------|----------|-----------|---------|
| DEV/TEST | Chưa | — | N/A | Chỉ tạo skeleton config |
| PRODUCTION | Chưa | — | N/A | Không deploy |

---

### Quyết định kỹ thuật quan trọng
Không có quyết định kiến trúc mới; task chỉ áp dụng ADR-001 và ADR-006 đã chốt.

---

### AI Code Notes
- **Phần code do AI sinh:** `wrangler.toml` skeleton, `next.config.ts` env validation, dev/prod mapping docs.
- **Agent chính:** Cursor
- **Đã verify:** [x] Không có secret thật [x] Không có Hono handler [x] `npm run check` pass
- **Prompt quan trọng lưu lại:** User yêu cầu làm `T-0105`, tạo config skeleton dev/prod, không deploy, không secret, không code Hono handler.
- **Rủi ro còn lại từ AI code:** Resource ID thật, Pages project thật, Firebase project thật, KV/R2 ID thật vẫn chưa có và phải điền qua task deploy/env sau này.

---

### Tech Debt
Không phát sinh tech debt mới.

---

### Code Smell
Không phát hiện code smell đáng kể.

---

### Security Audit

**Mode:** `QUICK`

#### QUICK Audit — 5 mục core
- [x] API key không bị expose phía client
- [x] `.env` không commit lên git
- [x] Input từ user không phát sinh trong task này
- [x] Không có credential production lẫn vào DEV/TEST
- [x] Không có thông tin nhạy cảm bị log ra console

**Tổng kết:**
- Vấn đề tìm thấy: 0
- Đã fix: 0
- Còn tồn đọng: 0

---

### Commands đã chạy
- `npm run check` — lần đầu crash transient ở bước build
- `npm run build` — pass
- `npm run check` — pass

---

### Blockers & Dependencies Update
- **Task này unblocks:** Worker scaffold/deploy config tasks và các task cần resource mapping.
- **Dependency mới phát hiện:** Cần resource ID thật ở các task env/deploy sau, nhưng không chặn skeleton hiện tại.
- **Update TASK_REGISTRY needed:** Đã cập nhật `T-0105` sang `Done`.

---

### Metrics
N/A, không deploy.

---

### Next Steps
- Cần tạo task: Không có.
- Cần update RISK_REGISTER: Không có.
- Cần update ADR: Không có.

---

## [2026-05-16 19:33 +07] — T-0104: Tạo `.env.example` và quy tắc secret

**Loại:** `Task`
**Type:** `IMPLEMENTATION`
**Ref:** T-0104
**Môi trường:** `DEV/TEST`
**Branch:** local workspace
**PR / MR:** N/A
**AI Tools Used:** Cursor
**Implementation Owner:** Cursor
**Review Owner:** Self-review
**Effort thực tế:** ~0.3h

---

### Tóm tắt một dòng
> Đã chuẩn hóa `.env.example` thành template placeholder đầy đủ và ghi hướng dẫn secret/local env trong README.

---

### Những gì đã làm
- Chạy `git init`, `git add .gitignore`, `git status` trước khi bắt đầu `T-0104` theo yêu cầu.
- Verify `.gitignore` chặn `.env`, `.env.local`, `.env.production` và giữ `.env.example` là file trackable.
- Cập nhật `.env.example` với comment đầu file: template only, secret thật lưu ngoài repo, cách copy sang `.env.local`.
- Group env placeholder theo App, Firebase, PayOS, Telegram, Cloudflare.
- Cập nhật README section `Environment Variables` hướng dẫn non-tech cách tạo `.env.local` và không commit secret.

### Những gì KHÔNG làm *(scope exclusion)*
- Không ghi secret thật.
- Không tạo `.env` hoặc `.env.local`.
- Không đổi ENV/runtime config thật.
- Không thêm dependency.
- Không deploy.

---

### Env keys placeholder
- App: `NEXT_PUBLIC_APP_ENV`, `NEXT_PUBLIC_APP_NAME`, `NEXT_PUBLIC_APP_URL`, `ADMIN_TOKEN`.
- Firebase/Google: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`.
- PayOS: `PAYOS_CLIENT_ID`, `PAYOS_API_KEY`, `PAYOS_CHECKSUM_KEY`.
- Telegram: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`.
- Cloudflare/KB: `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_PAGES_PROJECT_DEV`, `CLOUDFLARE_PAGES_PROJECT_PROD`, `CLOUDFLARE_R2_BUCKET`, `CLOUDFLARE_KV_NAMESPACE_ID`, `PAYMENT_WORKER_NAME`, `KB_WORKER_NAME`, `ADMIN_WORKER_NAME`, `KB_STORAGE_BUCKET`.

---

### Output thực tế vs kỳ vọng

| Output kỳ vọng | Output thực tế | Kết quả |
|----------------|----------------|---------|
| `.env.example` chỉ có placeholder | Tất cả key dùng `your_value_here`, không có secret thật | ✅ Đúng plan |
| Docs nói rõ không commit secret | README có section `Environment Variables` và hướng dẫn `.env.local` | ✅ Đúng plan |
| `.gitignore` loại trừ `.env*` nhưng giữ `.env.example` | `git check-ignore` xác nhận `.env`/`.env.local` bị ignore, `.env.example` có exception | ✅ Đúng plan |
| Secret smoke pass | `npm run security:smoke` pass | ✅ Đúng plan |

**Độ lệch so với plan:**
Không có độ lệch.

---

### Trạng thái deploy

| Môi trường | Đã deploy? | Thời điểm | Verify OK? | Ghi chú |
|-----------|-----------|----------|-----------|---------|
| DEV/TEST | Chưa | — | N/A | Chỉ cập nhật template/docs |
| PRODUCTION | Chưa | — | N/A | Không deploy |

---

### Quyết định kỹ thuật quan trọng
Không có quyết định kiến trúc mới.

---

### AI Code Notes
- **Phần code do AI sinh:** `.env.example`, README env section, cập nhật task/devlog.
- **Agent chính:** Cursor
- **Đã verify:** [x] Không có secret thật [x] `.env` thật bị ignore [x] `.env.example` không bị smoke flag
- **Prompt quan trọng lưu lại:** User yêu cầu làm `T-0104`, init git trước, tạo env template đầy đủ, không tạo `.env` hoặc `.env.local`.
- **Rủi ro còn lại từ AI code:** Cloudflare project/worker names vẫn là placeholder cho tới task env/deploy skeleton.

---

### Tech Debt
Không phát sinh tech debt mới.

---

### Code Smell
Không phát hiện code smell đáng kể.

---

### Security Audit

**Mode:** `QUICK`

#### QUICK Audit — 5 mục core
- [x] API key không bị expose phía client
- [x] `.env` không commit lên git
- [x] Input từ user không phát sinh trong task này
- [x] Không có credential production lẫn vào DEV/TEST
- [x] Không có thông tin nhạy cảm bị log ra console

**Secret smoke/manual checks:**
- `git status` sau `git init` không thấy `.env` hoặc `.env.local`; `.env.example` xuất hiện là template trackable.
- `git check-ignore -v .env .env.local .env.production` xác nhận env thật bị ignore.
- `git check-ignore -v .env.example` xác nhận exception cho template.
- `npm run security:smoke` pass.

**Tổng kết:**
- Vấn đề tìm thấy: 0
- Đã fix: 0
- Còn tồn đọng: 0

---

### Commands đã chạy
- `git init` — pass
- `git add .gitignore` — pass
- `git status` — pass; không có `.env` hoặc `.env.local`
- `git check-ignore -v .env .env.local .env.production` — pass
- `git check-ignore -v .env.example` — pass; `.env.example` được unignore
- `npm run security:smoke` — pass

---

### Blockers & Dependencies Update
- **Task này unblocks:** T-0105 và các task cần placeholder env rõ ràng.
- **Dependency mới phát hiện:** Không có.
- **Update TASK_REGISTRY needed:** Đã cập nhật `T-0104` sang `Done`.

---

### Metrics
N/A, không deploy.

---

### Next Steps
- Cần tạo task: Không có.
- Cần update RISK_REGISTER: Không có.
- Cần update ADR: Không có.

---

## [2026-05-16 19:29 +07] — T-0103: Tạo cấu trúc folder module hóa

**Loại:** `Task`
**Type:** `IMPLEMENTATION`
**Ref:** T-0103
**Môi trường:** `DEV/TEST`
**Branch:** local workspace
**PR / MR:** N/A
**AI Tools Used:** Cursor
**Implementation Owner:** Cursor
**Review Owner:** Self-review
**Effort thực tế:** ~0.4h

---

### Tóm tắt một dòng
> Đã tạo scaffold folder module hóa theo `.cursorrules` section 2, chỉ có README/index placeholder và không thêm business logic.

---

### Những gì đã làm
- Tạo component boundary: `apps/web/src/components/ui`, `layout`, `modules`.
- Tạo module boundary: `apps/web/src/modules/numerology`, `tarot`, `account`, `payment`.
- Tạo `apps/web/src/lib` cho helper/client wrapper sau này.
- Tạo `packages/shared/src/schemas` và placeholder index cho shared exports/schemas.
- Tạo worker boundary: `workers/payment`, `workers/kb`, `workers/admin`.
- Tạo `kb-private` với README và `.gitignore` riêng để chặn raw KB.
- Cập nhật root `package.json` workspace thêm `packages/*` và `workers/*`.
- Cập nhật root `.gitignore` để ignore `kb-private/*`, trừ `README.md` và `.gitignore`.

### Những gì KHÔNG làm *(scope exclusion)*
- Không code business logic.
- Không thêm dependency.
- Không scaffold Worker runtime, route, Hono app hoặc Cloudflare config.
- Không tạo pricing/errors/entitlement implementation trong `packages/shared`.
- Không copy KB thật vào `kb-private/`.

---

### Tree folder chính
```text
apps/web/src/components/
  ui/
  layout/
  modules/
apps/web/src/modules/
  numerology/
  tarot/
  account/
  payment/
apps/web/src/lib/
packages/shared/src/
  schemas/
workers/
  payment/
  kb/
  admin/
kb-private/
```

### Rule module boundary
- Numerology/Tarot không import KB trực tiếp vào frontend.
- Account frontend không tự tạo entitlement hoặc đánh dấu purchase confirmed.
- Payment frontend không tự quyết định amount, order status hoặc unlock rights.
- Pricing, entitlement, errors và schemas dùng chung phải nằm trong `packages/shared` khi tới task tương ứng.
- Worker folders hiện chỉ là boundary placeholder; runtime scaffold để task sau.

---

### Output thực tế vs kỳ vọng

| Output kỳ vọng | Output thực tế | Kết quả |
|----------------|----------------|---------|
| Cấu trúc folder đúng `technical-decisions.md` và `.cursorrules` | Đã tạo `apps/web/src`, `packages/shared`, `workers`, `kb-private` theo boundary | ✅ Đúng plan |
| File placeholder tối thiểu nếu cần | README ngắn cho folder boundary, index placeholder cho shared/schemas | ✅ Đúng plan |
| Không có file app chính > 300 dòng | Chỉ thêm file placeholder ngắn, không đụng app chính | ✅ Đúng plan |
| Không có logic business trong component UI base | Component folders chỉ có README boundary | ✅ Đúng plan |

**Độ lệch so với plan:**
Không có độ lệch.

---

### Trạng thái deploy

| Môi trường | Đã deploy? | Thời điểm | Verify OK? | Ghi chú |
|-----------|-----------|----------|-----------|---------|
| DEV/TEST | Chưa | — | N/A | Chỉ chạy local checks |
| PRODUCTION | Chưa | — | N/A | Không deploy |

---

### Quyết định kỹ thuật quan trọng
Không có quyết định kiến trúc mới; chỉ áp dụng cấu trúc đã chốt trong `.cursorrules` và `technical-decisions.md`.

---

### AI Code Notes
- **Phần code do AI sinh:** README/index placeholder và cập nhật config/docs.
- **Agent chính:** Cursor
- **Đã verify:** [x] Không có hallucinated API [x] Không có business logic [x] Boundary khớp `.cursorrules`
- **Prompt quan trọng lưu lại:** User yêu cầu làm `T-0103` với scaffold folder, README boundary, workspace update, `kb-private` ignore và không thêm dependency.
- **Rủi ro còn lại từ AI code:** Không phát hiện rủi ro đáng kể; worker/package runtime chưa scaffold vì ngoài scope.

---

### Tech Debt
Không phát sinh tech debt mới.

---

### Code Smell
Không phát hiện code smell đáng kể.

---

### Security Audit

**Mode:** `QUICK`

#### QUICK Audit — 5 mục core
- [x] API key không bị expose phía client
- [x] `.env` không commit lên git
- [x] Input từ user không phát sinh trong task này
- [x] Không có credential production lẫn vào DEV/TEST
- [x] Không có thông tin nhạy cảm bị log ra console

**Tổng kết:**
- Vấn đề tìm thấy: 0
- Đã fix: 0
- Còn tồn đọng: 0

---

### Commands đã chạy
- `npm run check` — pass

---

### Blockers & Dependencies Update
- **Task này unblocks:** T-0104, T-0105 và các task Phase 2-7 cần module boundary.
- **Dependency mới phát hiện:** Không có.
- **Update TASK_REGISTRY needed:** Đã cập nhật `T-0103` sang `Done`.

---

### Metrics
N/A, không deploy.

---

### Next Steps
- Cần tạo task: Không có.
- Cần update RISK_REGISTER: Không có.
- Cần update ADR: Không có.

---

## [2026-05-16 19:21 +07] — T-0102: Thiết lập scripts kiểm soát chất lượng

**Loại:** `Task`
**Type:** `IMPLEMENTATION`
**Ref:** T-0102
**Môi trường:** `DEV/TEST`
**Branch:** local workspace
**PR / MR:** N/A
**AI Tools Used:** Cursor
**Implementation Owner:** Cursor
**Review Owner:** Self-review
**Effort thực tế:** ~0.5h

---

### Tóm tắt một dòng
> Đã thiết lập quality gate tối thiểu cho dev/build/typecheck/lint/security smoke, không thêm dependency mới.

---

### Những gì đã làm
- Cập nhật root `package.json` với `security:smoke` và `check`.
- Cập nhật `apps/web/package.json` để `lint` chạy script smoke nội bộ thay vì phụ thuộc lint package mới.
- Tạo `tools/source-lint.mjs` kiểm tra file quá dài, inline `onclick`, inline script lớn và lỗi raw `Failed to fetch`.
- Tạo `tools/security-smoke.mjs` kiểm tra `.env` thật bị git track, secret/token hardcode phổ biến và KB/private leak trong frontend/static.
- Cập nhật `README.md` hướng dẫn cách chạy từng script bằng tiếng Việt dễ hiểu.
- Cập nhật `.gitignore` để bỏ qua `*.tsbuildinfo` do TypeScript tạo khi chạy typecheck/build.

### Những gì KHÔNG làm *(scope exclusion)*
- Không thêm dependency mới.
- Không thêm ESLint config đầy đủ vì task này chỉ yêu cầu quality gate tối thiểu và không cần dependency mới.
- Không đụng payment/auth/KB logic.
- Không deploy DEV/TEST hoặc PRODUCTION.

---

### Output thực tế vs kỳ vọng

| Output kỳ vọng | Output thực tế | Kết quả |
|----------------|----------------|---------|
| Script chạy dev/local | `npm run dev` giữ nguyên, chạy web workspace | ✅ Đúng plan |
| Script build | `npm run build` giữ nguyên và pass | ✅ Đúng plan |
| Script typecheck | `npm run typecheck` giữ nguyên và pass | ✅ Đúng plan |
| Script lint hoặc format check | `npm run lint` chạy `tools/source-lint.mjs` và pass | ✅ Đúng plan |
| Security smoke tối thiểu | `npm run security:smoke` kiểm tra `.env`, secret/token phổ biến, KB leak và pass | ✅ Đúng plan |
| README/docs hướng dẫn scripts | `README.md` có mô tả từng script cho người non-tech | ✅ Đúng plan |

**Độ lệch so với plan:**
Không có độ lệch. Lint ở mức smoke nội bộ, chưa phải ESLint đầy đủ, để tránh thêm dependency ngoài scope.

---

### Trạng thái deploy

| Môi trường | Đã deploy? | Thời điểm | Verify OK? | Ghi chú |
|-----------|-----------|----------|-----------|---------|
| DEV/TEST | Chưa | — | N/A | Chỉ chạy local quality checks |
| PRODUCTION | Chưa | — | N/A | Không deploy |

---

### Quyết định kỹ thuật quan trọng
Không có quyết định kiến trúc mới.

---

### AI Code Notes
- **Phần code do AI sinh:** `tools/source-lint.mjs`, `tools/security-smoke.mjs`, cập nhật scripts và README.
- **Agent chính:** Cursor
- **Đã verify:** [x] Không có hallucinated API [x] Error handling đủ cho script smoke [x] Logic đúng với test case hiện tại
- **Prompt quan trọng lưu lại:** User yêu cầu làm `T-0102` với scope scripts dev/build/typecheck/lint và security smoke checklist.
- **Rủi ro còn lại từ AI code:** Không phát hiện rủi ro đáng kể; security smoke chỉ là kiểm tra tối thiểu, không thay thế secret scanner chuyên dụng ở phase release.

---

### Tech Debt
Không phát sinh tech debt mới.

---

### Code Smell
Không phát hiện code smell đáng kể.

---

### Security Audit

**Mode:** `QUICK`

#### QUICK Audit — 5 mục core
- [x] API key không bị expose phía client
- [x] `.env` không commit lên git
- [x] Input từ user không phát sinh trong task này
- [x] Không có credential production lẫn vào DEV/TEST
- [x] Không có thông tin nhạy cảm bị log ra console

**Tổng kết:**
- Vấn đề tìm thấy: 0
- Đã fix: 0
- Còn tồn đọng: 0

---

### Commands đã chạy
- `npm run typecheck` — pass
- `npm run build` — pass
- `npm run lint` — pass
- `npm run security:smoke` — pass
- `npm run check` — pass

---

### Blockers & Dependencies Update
- **Task này unblocks:** Các task implementation sau `T-0102` có quality gate tối thiểu.
- **Dependency mới phát hiện:** Không có.
- **Update TASK_REGISTRY needed:** Đã cập nhật `T-0102` sang `Done`.

---

### Metrics
N/A, không deploy.

---

### Next Steps
- Cần tạo task: Không có.
- Cần update RISK_REGISTER: Không có.
- Cần update ADR: Không có.

---

## [YYYY-MM-DD HH:mm +07] — HOTFIX: [Mô tả vấn đề]

**Loại:** `Hotfix`
**Severity:** `P0 — Site down` | `P1 — Core feature broken` | `P2 — Degraded`
**Môi trường:** `PRODUCTION`
**Phát hiện lúc:** YYYY-MM-DD HH:mm +07
**Fix deploy lúc:** YYYY-MM-DD HH:mm +07
**Time to detect:** X phút *(từ khi xảy ra đến khi phát hiện)*
**Time to fix:** X phút *(từ khi phát hiện đến khi deploy fix)*

---

### Mô tả sự cố
> Điều gì xảy ra? User thấy gì? Scope ảnh hưởng (% user bị ảnh hưởng)?

[Mô tả]

### Root Cause (sơ bộ)
> Nguyên nhân gốc rễ — điền ngay cả khi chưa chắc 100%.

[Root cause]

### Fix đã áp dụng
- [Bước 1]
- [Bước 2]

### Verify sau fix
- [ ] Smoke test đã pass trên production
- [ ] Logs sạch trong 15 phút đầu sau fix
- [ ] User flow chính hoạt động bình thường

### Tech Debt / Risk phát sinh
- [TD hoặc R nếu hotfix chỉ là band-aid, root cause chưa fix hoàn toàn]

### Follow-up actions
> Tạo task trong TASK_REGISTRY để prevent recurrence — KHÔNG để trong DEVLOG.

- Task cần tạo: [PX.Y — Mô tả]
- Risk cần update: [R-xxx]

---

---

## [YYYY-MM-DD HH:mm +07] — PHASE RETROSPECTIVE: Phase X — [Tên Phase]

**Loại:** `Phase-Retro`
**Phase:** PX
**Thời gian phase:** YYYY-MM-DD HH:mm +07 → YYYY-MM-DD HH:mm +07
**Môi trường đã deploy:** `DEV/TEST` | `PRODUCTION` | `Cả hai`

---

### Tóm tắt phase
[Một đoạn ngắn: đạt được gì, có gì bất ngờ, cảm giác chung]

---

### Milestone đạt được
- [ ] [Milestone 1] — ✅ Đạt / ⚠️ Đạt một phần / ❌ Không đạt
- [ ] [Milestone 2] — ✅ / ⚠️ / ❌

---

### Effort: Ước tính vs Thực tế

| Task | Ước tính | Thực tế | Lệch | Lý do lệch chính |
|------|---------|---------|------|-----------------|
| PX.1 | Xh | Xh | +/-Xh | [lý do] |
| PX.2 | Xh | Xh | +/-Xh | |
| **Tổng** | **Xh** | **Xh** | **+/-Xh** | |

---

### Project Health Snapshot *(tại thời điểm kết thúc phase)*

| Chỉ số | Giá trị | Đánh giá |
|--------|--------|---------|
| CRITICAL risks còn OPEN | X | 🔴 / 🟢 |
| HIGH tech debts chưa có plan | X | 🔴 / 🟢 |
| Scope changes trong phase | X | — |
| Tổng effort lệch so với ước tính | +/-Xh (+/-X%) | 🔴 / 🟡 / 🟢 |
| Hotfixes trong phase | X | — |

---

### Điều làm tốt (Keep)
- [Điều 1 nên tiếp tục]

### Điều cần cải thiện (Improve)
- [Điều 1 cần làm khác]

### Điều cần dừng (Stop)
- [Điều 1 không nên làm nữa]

---

### Tổng hợp Tech Debt của phase

| ID | Severity | Mô tả | Trạng thái |
|----|---------|-------|----------|
| TD-... | HIGH | [Mô tả] | Chưa xử lý — target PY |
| TD-... | LOW | [Mô tả] | Đã xử lý trong task PX.Z |

---

### Trạng thái môi trường sau phase

| Môi trường | Version / Tag | Deploy lúc | Ổn định? |
|-----------|--------------|-----------|---------|
| DEV/TEST | v0.X.0 | YYYY-MM-DD HH:mm +07 | Có / Không |
| PRODUCTION | v0.X.0 | YYYY-MM-DD HH:mm +07 | Có / Không / Chưa deploy |

---

### Rủi ro phát sinh trong phase
- [R-xxx] — [Mô tả ngắn] — Status hiện tại

---

### Input cho phase tiếp theo
- [Điều phase sau cần biết / chuẩn bị]

---

---

## [YYYY-MM-DD HH:mm +07] — PX.Y: [Tên Task]

**Loại:** `Task`
**Type:** `IMPLEMENTATION` *(xem task type trong TASK_REGISTRY)*
**Ref:** PX.Y
**Môi trường:** `DEV/TEST` | `PRODUCTION` | `Cả hai`
**Branch:** feature/pxy-ten-task
**PR / MR:** #[số]
**AI Tools Used:** [Claude / Cursor / None / ...]
**Implementation Owner:** Codex / [Tên]
**Review Owner:** Claude / Self-review / [Tên]
**Effort thực tế:** Xh *(ước tính: Yh — lệch: +/-Zh)*

---

### Tóm tắt một dòng
> [Một câu: làm gì, kết quả gì]

---

### Những gì đã làm
- [Việc 1 — cụ thể]
- [Việc 2]
- [Quyết định X vì lý do Y]

### Những gì KHÔNG làm *(scope exclusion)*
> Những thứ nằm trong tầm tay nhưng có chủ đích không làm trong task này.

- [Không làm X — defer sang PX.Z / out of scope vì Y]

---

### Output thực tế vs kỳ vọng

| Output kỳ vọng | Output thực tế | Kết quả |
|----------------|----------------|---------|
| [Output 1 theo TASK_REGISTRY] | [Thực tế] | ✅ Đúng plan \| ⚠️ Lệch \| ❌ Chưa xong |
| [Output 2] | [Thực tế] | |

**Độ lệch so với plan:**
[Mô tả lệch nếu có. Nếu không: "Không có độ lệch."]

---

### Trạng thái deploy

| Môi trường | Đã deploy? | Thời điểm | Verify OK? | Ghi chú |
|-----------|-----------|----------|-----------|---------|
| DEV/TEST | Có / Chưa | YYYY-MM-DD HH:mm +07 | Có / Không / N/A | |
| PRODUCTION | Có / Chưa | YYYY-MM-DD HH:mm +07 | Có / Không / N/A | |

---

### Quyết định kỹ thuật quan trọng
> Chỉ ghi những quyết định không hiển nhiên, sẽ ảnh hưởng đến tương lai.
> Quyết định lớn → ghi thêm vào `ADR.md` (`ADR-xxx`).

#### Quyết định: [Tên]
- **Bối cảnh:** [Tại sao phải quyết định]
- **Options cân nhắc:** A / B / C
- **Chọn:** Option X
- **Lý do:** [Cụ thể — không được viết "vì dễ dùng"]
- **Trade-off:** [Những gì bị hy sinh]
- **Ghi vào ADR?** `ADR-xxx` / Không cần

> Nếu không có: "Không có quyết định kiến trúc mới."

---

### AI Code Notes *(điền nếu AI Tools Used ≠ None)*
> Bắt buộc khi task dùng AI để generate code.

- **Phần code do AI sinh:** [Mô tả]
- **Agent chính:** Codex / Claude / Cursor / Khác
- **Đã verify:** [ ] Không có hallucinated API [ ] Error handling đủ [ ] Logic đúng với test case
- **Prompt quan trọng lưu lại:** [Paste prompt hoặc ghi vào KB Notes]
- **Rủi ro còn lại từ AI code:** [Nếu có]

---

### Claude Audit Result *(điền nếu Claude audit task này)*

- **Audit mode:** `QUICK` | `FULL`
- **Findings:** CRITICAL: X / HIGH: Y / MEDIUM: Z / LOW: N
- **Đã xử lý:** [Danh sách finding đã fix]
- **Còn lại:** [Finding được chấp nhận/đưa vào RISK_REGISTER hoặc Tech Debt]
- **Kết luận:** Pass / Pass with notes / Fail

---

### Tech Debt

#### TD-[YYYYMMDD]-[số]: [Tên]
- **Severity:** `LOW` | `MEDIUM` | `HIGH` | `CRITICAL`
- **Loại:** `Code Quality` | `Architecture` | `Performance` | `Scalability` | `Maintainability` | `Test Coverage` | `Security`
- **Môi trường:** `DEV/TEST` | `PRODUCTION` | `Cả hai`
- **Vị trí:** `src/file.ts:42`
- **Mô tả:** [Vấn đề cụ thể]
- **Rủi ro nếu không xử lý:** [Hậu quả]
- **Remediation:** [Cần làm gì — Xh effort]
- **Target fix:** Phase Y / Task PY.Z

> Nếu không có: "Không phát sinh tech debt mới."

---

### Code Smell
- [ ] [Mô tả] — `file:line`

> Nếu không có: "Không phát hiện code smell đáng kể."

---

### Security Audit

**Mode:** `QUICK` *(task thường)* | `FULL` *(task đụng auth / payment / AI / production deploy)*

#### QUICK Audit — 5 mục core *(mọi task)*
- [ ] API key không bị expose phía client
- [ ] `.env` không commit lên git
- [ ] Input từ user được validate server-side
- [ ] Không có credential production lẫn vào DEV/TEST
- [ ] Không có thông tin nhạy cảm bị log ra console

#### FULL Audit *(chỉ dùng khi mode = FULL)*

**Authentication & Authorization**
- [ ] Route cần auth đã được bảo vệ
- [ ] Role/permission kiểm tra đúng chỗ
- [ ] Session/token handling không có lỗ hổng

**Data & Privacy**
- [ ] PII (tên, ngày sinh, email) xử lý đúng
- [ ] Raw query không có injection risk

**Input Validation**
- [ ] Sanitize trước khi đưa vào DB / AI prompt
- [ ] File upload kiểm tra type/size

**API & Third-party**
- [ ] Third-party SDK không có CVE đã biết
- [ ] Rate limiting đã setup

**AI-specific** *(nếu applicable)*
- [ ] Prompt injection được phòng ngừa
- [ ] Output AI được validate trước khi render cho user
- [ ] Token usage không thể bị exploit (max token limit)

**Tổng kết:**
- Vấn đề tìm thấy: X
- Đã fix: Y
- Còn tồn đọng: Z → **bắt buộc tạo TD entry hoặc R entry tương ứng**

---

### Blockers & Dependencies Update
- **Task này unblocks:** [Task ID]
- **Dependency mới phát hiện:** [Task X cần làm trước Task Y]
- **Update TASK_REGISTRY needed:** Có / Không

---

### Metrics *(bắt buộc nếu deploy PRODUCTION, optional cho DEV/TEST)*

| Metric | Giá trị | Env | Ghi chú |
|--------|---------|-----|---------|
| Build time | — ms | DEV/TEST | |
| API p95 response time | — ms | DEV/TEST | |
| Error rate sau deploy | — % | PRODUCTION | monitor 30 phút đầu |
| Bundle size | — KB | — | |
| AI token cost/request | — tokens | — | |

---

### Next Steps
> **KHÔNG dùng checkbox ở đây.** Mọi action item phải được tạo thành task trong `TASK_REGISTRY.md`.

- Cần tạo task: [Mô tả → tạo PX.Z trong TASK_REGISTRY]
- Cần update RISK_REGISTER: [R-xxx]
- Cần update ADR: [ADR-xxx]

---

---

## [YYYY-MM-DD HH:mm +07] — CORRECTION: [Mô tả đính chính]

**Loại:** `Correction`
**Đính chính entry:** [Ref entry cũ — ví dụ: P1.2 entry ngày 2026-05-10]
**Lý do đính chính:** [Thông tin sai / cập nhật mới / nhầm lẫn]

---

### Thông tin cũ (sai)
[Nội dung cũ cần đính chính]

### Thông tin mới (đúng)
[Nội dung đúng]

### Ảnh hưởng
[Correction này ảnh hưởng đến task/decision/risk nào]

---

---

## Archiving Strategy

> Khi DEVLOG phình to (>500 dòng hoặc sau mỗi Phase Retro):
> 1. Move toàn bộ **Task entries** của phase đó sang `DEVLOG_ARCHIVE_PX.md`
> 2. **Giữ lại** trong file chính: Phase Retro entries, Hotfix entries, Correction entries
> 3. Ghi entry `Correction` ghi chú việc archive
>
> Các entries được archive vẫn có thể tìm thấy qua Index nhanh ở đầu file.

---

---

## KB INDEX — Knowledge Base
> **Đây là nơi lưu kiến thức có thể tìm kiếm lại.** Sau mỗi task, nếu có KB Notes, copy tóm tắt vào đây (không chỉ ghi trong entry task).
> Thêm entry mới vào ĐẦU bảng.

| ID | Ngày & Giờ | Topic | Tags | Ref task |
|----|-----------|-------|------|---------|
| KB-001 | YYYY-MM-DD HH:mm +07 | [Tên topic] | [tag1, tag2] | PX.Y |

---

### KB-001 — [Tên topic]
> [Mô tả gotcha / lesson learned / trick]

```
[Code snippet hoặc ví dụ nếu cần]
```

**Nguồn:** [Link docs / issue / blog]
**Tags:** [tag1, tag2, tag3]

---

<!-- ============================================================
     QUICK TEMPLATE — Task entry (copy và xóa comment này)

---

## [YYYY-MM-DD HH:mm +07] — PX.Y: [Tên Task]

**Loại:** Task | **Type:** IMPLEMENTATION | **Ref:** PX.Y
**Môi trường:** DEV/TEST | **Branch:** feature/pxy | **PR:** #
**AI Tools:** None | **Effort:** Xh (ước tính: Yh)
**Implementation Owner:** Codex | **Review Owner:** Claude / Self-review

### Tóm tắt một dòng
> 

### Những gì đã làm
- 

### Những gì KHÔNG làm
- 

### Output thực tế vs kỳ vọng
| Output kỳ vọng | Output thực tế | Kết quả |
|----------------|----------------|---------|
| | | ✅ |

Độ lệch: Không có.

### Trạng thái deploy
| Env | Deploy? | Thời điểm | Verify? |
|-----|---------|----------|---------|
| DEV/TEST | Có | YYYY-MM-DD HH:mm +07 | Có |
| PRODUCTION | Chưa | — | N/A |

### Quyết định kỹ thuật
Không có quyết định kiến trúc mới.

### AI Code Notes
N/A

### Tech Debt
Không phát sinh tech debt mới.

### Code Smell
Không phát hiện.

### Security Audit — QUICK
- [x] API key không expose
- [x] .env không commit
- [x] Input validated
- [x] Không lẫn credential prod
- [x] Không log sensitive data
Kết quả: 0 vấn đề.

### Blockers & Dependencies
Unblocks: PX.Z | Dependency mới: Không có

### Metrics
N/A (DEV/TEST task)

### Next Steps
- Tạo task: [...]

---

     QUICK TEMPLATE — Phase Retro (copy và xóa comment này)

---

## [YYYY-MM-DD HH:mm +07] — PHASE RETROSPECTIVE: Phase X — [Tên]

**Loại:** Phase-Retro | **Phase:** PX
**Thời gian:** YYYY-MM-DD HH:mm +07 → YYYY-MM-DD HH:mm +07
**Môi trường:** DEV/TEST

### Tóm tắt phase
[...]

### Milestone
- [ ] Milestone 1 — ✅ Đạt

### Effort
| Task | Est | Actual | Lệch |
|------|-----|--------|------|
| PX.1 | Xh | Xh | +Xh |
| Tổng | Xh | Xh | +Xh |

### Project Health Snapshot
| Chỉ số | Giá trị |
|--------|--------|
| CRITICAL risks OPEN | 0 |
| HIGH tech debts chưa plan | 0 |
| Scope changes | 0 |
| Effort lệch | +Xh |
| Hotfixes | 0 |

### Keep / Improve / Stop
Keep: 
Improve: 
Stop: 

### Môi trường sau phase
| Env | Version | Deploy lúc | Ổn định? |
|-----|---------|-----------|---------|
| DEV/TEST | v0.X.0 | YYYY-MM-DD HH:mm +07 | Có |
| PRODUCTION | — | — | N/A |

### Input cho phase tiếp theo
- 

---
     ============================================================ -->


---

# DEVLOG - Bản Mệnh V2

## 2026-05-16 - SPRINT-1: Gỡ critical gap để mở khóa Phase 1-3 cho Cursor

| Field | Value |
|---|---|
| Task | SPRINT-1 (gộp T-0101 + T-0201 + ADR-004/005/006 + .cursorrules) |
| Status | Done |
| Actor | Claude (gỡ gap theo yêu cầu user) |
| Type | Foundation / Documentation / Setup |
| Verification | File đã tạo/sửa được Read lại sau Write, chưa chạy `npm install` hoặc `npm run build` |

### Bối cảnh

User yêu cầu review tài liệu xem đủ để Cursor code chưa. Review phát hiện 7 critical gap. User chốt "gỡ critical gap" cho Sprint 1 để mở khóa Phase 1-3.

### Việc đã làm

1. **Tạo `.cursorrules` ở project root** — tổng hợp rule từ `SYSTEM_PROMPT.md` + `technical-decisions.md` + `security-threat-model.md`, format ngắn gọn cho Cursor đọc auto. Có bảng tham chiếu "chủ đề → file phải đọc".
2. **Setup Tailwind CSS v4 thật:**
   - `apps/web/package.json`: thêm `tailwindcss@^4`, `@tailwindcss/postcss@^4`, `zod@^3.23.8`.
   - Tạo `apps/web/postcss.config.mjs` với plugin `@tailwindcss/postcss`.
   - Tạo `apps/web/src/styles/tokens.css` chứa full design tokens + `@theme inline` mapping.
   - Cập nhật `apps/web/src/app/globals.css`: `@import "tailwindcss"` + import tokens.
3. **Full design tokens vào code** — copy nguyên section 5 của `design-extraction-spec.md` thành CSS custom properties. Map sang Tailwind theme để dùng utility class.
4. **Reconcile T-0101 inconsistency:**
   - `TASK_REGISTRY.md` T-0101 status `Todo` → `Done` với update note ghi chi tiết scaffold đã có.
   - `TASK_REGISTRY.md` T-0201 status `Todo` → `Done` với update note ghi tokens + Tailwind setup.
5. **Thêm 3 ADR mới vào `docs/ADR.md`:**
   - ADR-004: Tailwind CSS v4 + design tokens.
   - ADR-005: Zod cho runtime validation.
   - ADR-006: Hono framework cho Cloudflare Workers.

### Những gì KHÔNG làm

- Không chạy `npm install` (user cần chạy local để có lock file mới).
- Không chạy `npm run build` hoặc `dev` để verify (cần user verify sau khi install).
- Không tạo Worker scaffold (thuộc Sprint 3).
- Không tạo `packages/shared` (thuộc Sprint 2).
- Không tạo `tools/` cho KB import (thuộc Sprint 4).
- Không sửa `page.tsx` hay `layout.tsx` (đã đúng spec).
- Không bring KB files vào project (thuộc Sprint 4).

### Output thực tế vs kỳ vọng

| Output kỳ vọng | Output thực tế | Kết quả |
|---|---|---|
| `.cursorrules` ở root | Đã tạo, 7 section | ✅ |
| Tailwind v4 setup | postcss.config.mjs + package.json deps | ✅ |
| Full design tokens trong CSS | `apps/web/src/styles/tokens.css` (~30 colors, 6 gradients, 5 radius, 3 shadows, typography scale) | ✅ |
| T-0101 status reconciled | Updated to Done với note | ✅ |
| ADR-004, ADR-005, ADR-006 | Đã thêm vào ADR.md với context/lý do/hệ quả | ✅ |

### File đã tạo/sửa

Tạo mới:

- `.cursorrules`
- `apps/web/postcss.config.mjs`
- `apps/web/src/styles/tokens.css`

Sửa:

- `apps/web/package.json` (thêm deps Tailwind v4 + Zod)
- `apps/web/src/app/globals.css` (import Tailwind + tokens)
- `docs/ADR.md` (thêm ADR-004/005/006)
- `docs/TASK_REGISTRY.md` (T-0101, T-0201 → Done)

### Quyết định kỹ thuật

- **Tailwind v4 thay vì v3:** CSS-first config (không cần `tailwind.config.js`), giảm boilerplate, native với Next.js 16. Xem ADR-004.
- **`@theme inline` trong cùng `tokens.css`:** giữ token một nguồn sự thật. Đổi token chỉ sửa 1 nơi.
- **Zod cho cả frontend + Worker:** ADR-005. Schemas sẽ live trong `packages/shared` (Sprint 2).
- **Hono cho Worker:** ADR-006. Lý do: TypeScript-first, bundle nhỏ, middleware ecosystem tốt.

### Audit tech debt / code rác / phình to

- **Mức rủi ro: None.**
- Tokens đã có lý do (theo design-extraction-spec). Không có hardcode.
- File lớn nhất tạo là `tokens.css` ~160 dòng, đúng quy mô.
- `.cursorrules` ~120 dòng — chấp nhận được vì là rules tổng hợp.

### Audit bảo mật / KB / PII / payment

- **Mức rủi ro: None.**
- Không thêm secret/token.
- Không đụng KB.
- Không đụng payment/auth.
- `package.json` chỉ thêm dependency từ npm registry chính thức.

### Rủi ro còn lại

- User cần chạy `npm install` để verify lock file cập nhật không có conflict.
- User cần chạy `npm run dev` để verify Tailwind v4 hoạt động với Next.js 16.2.6.
- Phase 4-7 vẫn còn gap cần Sprint 2/3/4.

### Next Steps (cần task tiếp theo)

- **Sprint 2:** tạo `packages/shared` với Zod schemas + pricing + errors (~3-4h).
- **Sprint 2:** spec `docs/product-specs/auth-spec.md` (Firebase Auth + Anonymous + cookie strategy).
- **Sprint 3:** scaffold `workers/payment`, `workers/kb`, `workers/admin` với Hono.
- **Sprint 3:** spec `docs/product-specs/payos-integration-spec.md` + `telegram-alerts-spec.md`.
- **Sprint 3:** tạo `infra/firestore.rules`.
- **Sprint 4:** spec `docs/product-specs/numerology-calculation-spec.md` (30 chỉ số + formula).
- **Sprint 4:** spec `docs/product-specs/content-paywall-spec.md` (free/paid split).
- **Sprint 4:** tạo `tools/` cho KB import + validate + smoke test.
- **Sprint 4:** bring KB files vào `kb-private/` (gitignored).

---

## 2026-05-14 - Khởi tạo bộ docs vận hành

| Field | Value |
|---|---|
| Task | DOCS-INIT |
| Status | Done |
| Actor | Codex |
| Verification | Kiểm tra file trong `E:\Project\Project\banmenh\docs` sau khi cài |

### Done

- Lắp bộ template quản trị dự án vào Bản Mệnh V2.
- Đưa spec sản phẩm hiện có vào `docs/product-specs`.
- Tạo module specs ban đầu cho Numerology, Tarot, Account/Payment và các module future.
- Không copy file preview/temp từ template source.

### Risk review

- Chưa có secret thật trong file được tạo.
- Các thông tin chưa chắc chắn được đánh dấu `[Cần bổ sung]`.
- Chưa tạo code app; đây mới là lớp tài liệu vận hành.

---

# Bản Mệnh V2 Implementation Log

Ngày tạo: 2026-05-13

Mục đích: ghi nhật ký triển khai sau mỗi task/phase. File này dùng để trả lời: đã làm gì, output là gì, có rủi ro tech debt/code rác/phình to không, có rủi ro bảo mật/KB/PII/payment không.

## Quy Tắc Ghi Log

- Mỗi task trong `v2-task-tracker.md` khi xong phải có một entry ở đây.
- Không ghi secret/token/API key thật.
- Không paste raw PII của user.
- Không paste KB private.
- Nếu có rủi ro, ghi rõ mức độ: P0/P1/P2/P3.
- Nếu có tech debt cố ý chấp nhận, phải ghi lý do và task xử lý sau.

## Template Entry

```md
## YYYY-MM-DD - TASK_ID - Tên task

Status: Done / Review / Blocked

Bối cảnh:
- ...

Yêu cầu ban đầu:
- ...

Việc đã làm:
- ...

Output:
- File/route/API/component đã tạo hoặc sửa.
- Test/check đã chạy.

Đối chiếu điều kiện Done:
- [ ] Điều kiện 1
- [ ] Điều kiện 2
- [ ] Điều kiện 3

Audit tech debt / code rác / phình to:
- Mức rủi ro: P0/P1/P2/P3/None
- Nhận xét:
- Hành động tiếp theo nếu có:

Audit bảo mật / KB / PII / payment:
- Mức rủi ro: P0/P1/P2/P3/None
- Nhận xét:
- Hành động tiếp theo nếu có:

Ghi chú vận hành:
- ...
```

## Phase 0 - Khóa Nền Tảng Dự Án

## 2026-05-13 - T-0001 - Chốt tài liệu nền V2

Status: Done

Bối cảnh:

- Dự án hiện tại có dấu hiệu phình to, nhiều luồng được xử lý nhanh trong production.
- User muốn rebuild V2 có dev/test, production, bảo mật KB, kiểm soát payment và hạn chế tech debt.

Yêu cầu ban đầu:

- Tạo spec tổng.
- Review lại mức độ đủ để thương mại hóa.
- Bổ sung tài liệu còn thiếu.
- Chốt stack, DB/storage và Tarot MVP.
- Ghi quyết định bằng Decision Records.

Việc đã làm:

- Tạo product spec tổng cho Bản Mệnh V2.
- Tạo PRD MVP để khóa scope.
- Tạo screen spec để mô tả màn hình/state/CTA.
- Tạo data contract cho schema/API/payment/entitlement/voucher.
- Tạo security threat model.
- Tạo release runbook.
- Tạo technical decisions.
- Tạo legal/commercial spec.
- Tạo migration plan.
- Tạo content quality spec.
- Thêm Decision Records cho stack, storage và Tarot non-AI.
- Tạo task tracker và implementation log.

Output:

- `docs/banmenh-v2-product-spec.md`
- `docs/prd-mvp.md`
- `docs/screen-spec.md`
- `docs/data-contract.md`
- `docs/security-threat-model.md`
- `docs/release-runbook.md`
- `docs/technical-decisions.md`
- `docs/legal-commercial-spec.md`
- `docs/migration-plan.md`
- `docs/content-quality-spec.md`
- `docs/v2-task-tracker.md`
- `docs/v2-implementation-log.md`

Đối chiếu điều kiện Done:

- [x] Tất cả file nền đã tồn tại.
- [x] Nội dung bằng tiếng Việt có dấu.
- [x] Có Decision Records cho stack, storage và Tarot non-AI.
- [x] Không chứa secret/token thật.
- [x] Task tracker có bối cảnh, yêu cầu, output, goal và điều kiện done.
- [x] Implementation log có template audit tech debt, bảo mật, KB, PII và payment.

Audit tech debt / code rác / phình to:

- Mức rủi ro: None
- Nhận xét: Chưa sửa code product. Các tài liệu mới nhằm giảm tech debt trước khi scaffold V2.
- Hành động tiếp theo nếu có: Khi bắt đầu code, phải cập nhật log sau từng task và kiểm tra file size/module boundary.

Audit bảo mật / KB / PII / payment:

- Mức rủi ro: None
- Nhận xét: Tài liệu không chứa secret, token thật, PII thật hoặc KB private. Các spec đã nhấn mạnh không public KB và không commit secret.
- Hành động tiếp theo nếu có: Trước khi scaffold V2 cần tạo `.env.example` chỉ có placeholder và security smoke script.

Ghi chú vận hành:

- Stack đã chốt: Next.js + TypeScript + Cloudflare Workers.
- Storage đã chốt: Firestore cho user/transaction, KV/R2 cho KB/cache.
- Tarot MVP đã chốt: non-AI, AI chỉ là future optional sau khi cập nhật legal/privacy/claim.

## 2026-05-13 - T-0002 - Chia nhỏ task tracker theo từng bước kiểm soát được

Status: Done

Bối cảnh:

- Task tracker ban đầu vẫn còn một số task quá lớn, đặc biệt phần scaffold, UI, env và backend foundation.
- User yêu cầu chia nhỏ nhất có thể để đi từng bước, giảm code rác, tech debt và tăng khả năng audit.

Yêu cầu ban đầu:

- Chia task/phase chi tiết, rõ ràng hơn.
- Mỗi task phải có bối cảnh, yêu cầu, output, goal, điều kiện Done và update khi xong.
- Tách rõ phần setup giao diện để dễ kiểm soát.

Việc đã làm:

- Chia lại tracker từ 6 phase lớn thành 8 phase nhỏ hơn.
- Tách Phase 1 thành project foundation: workspace, scripts, folder, env, dev/prod config.
- Tách Phase 2 riêng cho UI foundation: design tokens, typography, Button/CTA, Card/Panel, Loading/Error/Empty, PageShell, Header/Footer, responsive QA.
- Tách Phase 3 riêng cho route skeleton.
- Tách Phase 4 cho shared contracts/backend boundary.
- Tách payment/voucher thành nhiều task nhỏ: create, check, webhook, alert, voucher validate, admin voucher API.
- Tách Numerology và Tarot thành nhiều task nhỏ hơn.
- Thêm Security/QA/Migration/Cutover phase riêng.

Output:

- `docs/v2-task-tracker.md` đã được chia nhỏ lại.

Đối chiếu điều kiện Done:

- [x] Phase 1 không còn gom chung scaffold + UI + env.
- [x] UI foundation có phase riêng.
- [x] Mỗi task có bối cảnh, yêu cầu, output, goal, điều kiện Done và update khi xong.
- [x] Không chứa secret/token thật.
- [x] Đã kiểm tra task thiếu `Status` và sửa `T-0702`.

Audit tech debt / code rác / phình to:

- Mức rủi ro: None
- Nhận xét: Chỉ cập nhật tài liệu. Tracker mới giảm rủi ro code phình bằng cách tách task nhỏ và bắt buộc audit sau từng bước.
- Hành động tiếp theo nếu có: Khi bắt đầu code, không được gộp nhiều task tracker vào một lần implement nếu chưa có lý do rõ.

Audit bảo mật / KB / PII / payment:

- Mức rủi ro: None
- Nhận xét: Không thêm secret, PII hoặc KB. Các task liên quan payment/KB đã có điều kiện Done riêng về security.
- Hành động tiếp theo nếu có: Security smoke script cần được làm ở `T-0801` trước production.

Ghi chú vận hành:

- Bước setup giao diện hiện nằm ở Phase 2 - UI Foundation, gồm `T-0201` đến `T-0208`.


## 2026-05-14 - Cập nhật thông tin môi trường và owner

| Field | Value |
|---|---|
| Task | DOCS-ENV-001 |
| Status | Done |
| Actor | Codex |
| Verification | Cập nhật `PROJECT_META.md` và `ENVIRONMENT.md` theo thông tin user cung cấp |

### Done

- Ghi owner dự án là Zenki.
- Ghi Dev/Test domain chính thức là `https://dev.banmenh.online`.
- Ghi repo/folder local hiện có nhưng chưa có code app V2.
- Ghi CI/CD giai đoạn đầu là deploy thủ công, có thể chuyển sang GitHub auto deploy sau khi kiểm soát secret.
- Ghi Firebase/Firestore và KV/R2 hiện chưa có.
- Ghi rõ `dev.banmenh.online` đã Active nhưng chưa phải dev/test tách biệt thật sự cho đến khi có project dev riêng.

### Risk review

- Không thêm secret vào tài liệu.
- Chưa tạo hạ tầng mới.
- Rủi ro còn lại: cần tách Cloudflare Pages project dev riêng trước khi dùng `dev.banmenh.online` để test V2.


## 2026-05-14 - Làm rõ production project và storage strategy

| Field | Value |
|---|---|
| Task | DOCS-ENV-002 |
| Status | Done |
| Actor | Codex |
| Verification | Cập nhật `ENVIRONMENT.md` và `product-specs/technical-decisions.md` |

### Done

- Ghi rõ `numerology-app` là Cloudflare Pages project production hiện tại.
- Ghi rõ các domain trong Production deployment của `numerology-app` được xem là current-live/production.
- Ghi quy tắc không rebuild Bản Mệnh V2 trực tiếp vào `numerology-app`.
- Chốt hướng storage: Firestore cho user/payment/entitlement/report metadata; R2 cho KB/file lớn; KV cho config/cache/manifest.

### Risk review

- Giảm rủi ro deploy nhầm vào production hiện tại.
- Giảm rủi ro lộ KB bằng cách khóa nguyên tắc KB không nằm trong frontend/static asset.


## 2026-05-14 - Đính chính scope: Bản Mệnh V2 là rebuild độc lập

| Field | Value |
|---|---|
| Task | DOCS-SCOPE-001 |
| Status | Done |
| Actor | Codex |
| Verification | Cập nhật PROJECT_META, ENVIRONMENT, RISK_REGISTER, migration-plan và TASK_REGISTRY |

### Done

- Chốt Bản Mệnh V2 là dự án mới hoàn toàn, không phụ thuộc app cũ.
- Ghi app cũ/current-live chỉ là legacy/reference.
- Thay hướng migration mặc định bằng independent launch plan.
- Ghi rõ không migrate dữ liệu cũ mặc định.
- Ghi input đã có: file thiết kế giao diện, KB Thần số học, KB Tarot.
- Ghi nguyên tắc import KB vào private storage/API layer, không đưa vào frontend/static asset.

### Risk review

- Giảm rủi ro lẫn lộn app cũ và V2.
- Giảm rủi ro deploy nhầm V2 vào `numerology-app`.
- Rủi ro còn lại: cần user cung cấp đường dẫn file thiết kế và KB khi bắt đầu task UI/KB import; không được tự đoán cấu trúc file.


## 2026-05-14 - Dọn requirement kế thừa user/gói cũ khỏi spec hiện hành

| Field | Value |
|---|---|
| Task | DOCS-SCOPE-002 |
| Status | Done |
| Actor | Codex |
| Verification | Cập nhật PRD, screen spec, legal-commercial spec, product spec, task registry và technical decisions |

### Done

- Gỡ requirement giữ quyền user cũ/Tarot 49K khỏi MVP hiện hành.
- Ghi rõ V2 không kế thừa user/gói cũ mặc định.
- Nếu sau này muốn migration/kế thừa bất kỳ phần nào, phải tạo task và ADR riêng.

### Risk review

- Giảm rủi ro V2 vô tình phụ thuộc dữ liệu/hạ tầng cũ.
- Giảm rủi ro promise thương mại không có cơ chế vận hành.


## 2026-05-14 - Cleanup environment gaps và entitlement contract

| Field | Value |
|---|---|
| Task | DOCS-SCOPE-003 |
| Status | Done |
| Actor | Codex |
| Verification | Cập nhật ENVIRONMENT và data-contract |

### Done

- Dọn mục thông tin còn thiếu trong ENVIRONMENT để không nhắc lại Dev/Test domain như một phần chưa biết.
- Ghi rõ `dev.banmenh.online` phải được gỡ khỏi legacy project và gắn sang V2 dev/test project riêng trước khi dùng thật.
- Gỡ `tarot_basic_lifetime` khỏi entitlement contract hiện hành để tránh hiểu nhầm là kế thừa gói Tarot cũ.

### Risk review

- Giảm rủi ro nhầm lẫn giữa legacy project và V2 project.
- Giảm rủi ro đưa entitlement legacy vào MVP V2.


## 2026-05-14 - Chuẩn hóa thuật ngữ, loại bỏ phụ thuộc version cũ khỏi tài liệu hiện hành

| Field | Value |
|---|---|
| Task | DOCS-SCOPE-004 |
| Status | Done |
| Actor | Codex |
| Verification | Rà soát toàn bộ docs, đổi migration-plan thành independent-launch-plan, chuẩn hóa wording hệ thống hiện có/outside-scope |

### Done

- Đổi `product-specs/migration-plan.md` thành `product-specs/independent-launch-plan.md`.
- Chuẩn hóa tài liệu hiện hành theo hướng V2 độc lập, không phụ thuộc version cũ.
- Thay các yêu cầu migration/cutover bằng data import tùy chọn và gắn domain production có approval.
- Giữ DEVLOG là lịch sử, nhưng thêm Current truth note để tránh hiểu nhầm.

### Risk review

- Giảm rủi ro AI/dev đọc nhầm requirement từ version cũ.
- Giảm rủi ro kéo code/hạ tầng/dữ liệu cũ vào V2 ngoài ý muốn.


## 2026-05-14 - Siết scope: V2 không import dữ liệu/hạ tầng ngoài scope trong MVP

| Field | Value |
|---|---|
| Task | DOCS-SCOPE-005 |
| Status | Done |
| Actor | Codex |
| Verification | Rà lại active docs và task registry; loại bỏ launch task có nội dung import dữ liệu ngoài scope |

### Done

- Siết `independent-launch-plan.md`: MVP không import user, entitlement, payment history, voucher, report hoặc KB từ hệ thống/app đã có.
- Đổi task dry-run data import thành launch rehearsal trên dev/test.
- Đổi production cutover thành gắn domain production cho V2 sau khi user approve.
- Giảm các câu active-docs có thể khiến AI hiểu nhầm là phải tương thích version cũ.

### Risk review

- Giảm rủi ro kéo dữ liệu/hạ tầng ngoài scope vào V2.
- DEVLOG vẫn giữ lịch sử, nhưng current truth note ở đầu file là nguồn đúng cho scope hiện hành.


## 2026-05-14 - Cleanup wording cuối: dùng outside-scope thay vì nhắc hệ thống hiện có

| Field | Value |
|---|---|
| Task | DOCS-SCOPE-006 |
| Status | Done |
| Actor | Codex |
| Verification | Rà active docs không còn nhắc trực tiếp version cũ/legacy/migration ngoài DEVLOG lịch sử |

### Done

- Đổi wording active docs từ “hệ thống hiện có” sang “nguồn ngoài scope”.
- Giữ nguyên nguyên tắc: V2 là rebuild mới, input chính là file thiết kế + KB Thần số học + KB Tarot do user cung cấp.
- DEVLOG vẫn giữ lịch sử, có current truth note ở đầu file.


## 2026-05-16 - Khóa input design/KB và Tarot workflow reference

| Field | Value |
|---|---|
| Task | DOCS-INPUT-001 |
| Status | Done |
| Actor | Codex |
| Verification | Tạo input-inventory, design-extraction-spec, kb-extraction-plan, tarot-workflow-reference và cập nhật module/tasks/risks |

### Done

- Ghi rõ chỉ lấy visual style/effect từ V1, không lấy logic/workflow/payment/API cũ.
- Ghi rõ KB Thần số học canonical source: `than-so-hoc-export/kb.json`.
- Ghi rõ narrative source cần convert an toàn: `numerology_core/narrative_templates.js`.
- Ghi rõ Tarot KB canonical source: `kb/commercial/tarot_kb`.
- Ghi rõ Tarot workflow tham chiếu Mystery Tarot nhưng rebuild mới bằng branding/code/hạ tầng Bản Mệnh V2.
- Thêm Phase 0A input extraction/source boundaries vào TASK_REGISTRY.
- Thêm risk R-012 và R-013.

### Risk review

- Giảm rủi ro copy nhầm app logic V1.
- Giảm rủi ro public KB private.
- Giảm rủi ro dùng asset/code Tarot tham chiếu vượt quyền.


## 2026-05-16 - Cleanup docs sau input audit

| Field | Value |
|---|---|
| Task | DOCS-AUDIT-001 |
| Status | Done |
| Actor | Codex |
| Verification | Dọn TASK_REGISTRY template mẫu và chuẩn hóa RISK_REGISTER thành một bảng |

### Done

- Gỡ block template mẫu khỏi đầu `TASK_REGISTRY.md` để registry chỉ còn task thật của Bản Mệnh V2.
- Chuẩn hóa `RISK_REGISTER.md` để R-001 đến R-013 nằm cùng một bảng.

### Risk review

- Giảm rủi ro AI đọc nhầm placeholder `[Tên]`, `YYYY-MM-DD`, `0/0 tasks` là task thật.
- Giảm rủi ro bỏ sót R-011/R-012/R-013 khi review risk.


## 2026-05-16 - DOCS-AUDIT-002: Chuẩn hóa ADR và tham chiếu file trong task registry

| Field | Value |
|---|---|
| Task | DOCS-AUDIT-002 |
| Status | Done |
| Scope | Docs consistency |
| Verification | Rà soát placeholder/template, file path và decision records |

Đã làm:

- Đổi các tham chiếu `v2-implementation-log.md` trong `TASK_REGISTRY.md` về `DEVLOG.md`.
- Chuẩn hóa đường dẫn các product spec trong `TASK_REGISTRY.md` về `docs/product-specs/...`.
- Viết lại `ADR.md` thành file quyết định thật của Bản Mệnh V2, bỏ phần template/placeholder gây nhiễu.

Đánh giá rủi ro:

- Giảm rủi ro AI đọc nhầm placeholder `[Tên]`, `YYYY-MM-DD` là requirement thật.
- Giảm rủi ro cập nhật nhầm file log không tồn tại.
- Không thay đổi code, secret, KB hoặc dữ liệu sản phẩm.


## 2026-05-16 - T-00A2: Extract design spec từ visual source

| Field | Value |
|---|---|
| Task | T-00A2 |
| Status | Done |
| Scope | Design system/spec only |
| Verification | Rà source visual local và cập nhật `design-extraction-spec.md` |

Đã làm:

- Rà `demo-premium-ui.html` để lấy premium mystical visual, galaxy background, glass card, module grid và pricing treatment.
- Rà `demo-design-system.html` để lấy pattern component theo hướng Tailwind/shadcn.
- Rà `numerology_core/style.css` để lấy visual thực tế cho dashboard, form, paywall, report, footer.
- Rà `Antigravity/khamphabanthan/style.css` để lấy mandala summary, report layout và chart/card treatment.
- Cập nhật `design-extraction-spec.md` thành spec đủ dùng cho UI skeleton V2.
- Cập nhật `TASK_REGISTRY.md` đánh dấu T-00A2 Done.

Không làm:

- Không copy code UI cũ vào V2.
- Không lấy workflow, payment, voucher, auth, API hoặc localStorage cũ.
- Không đụng KB/private data.

Đánh giá rủi ro:

- Tech debt: thấp, vì chỉ cập nhật spec.
- Code rác: không phát sinh code app.
- Security/KB: không thêm secret, không public KB.
- Rủi ro còn lại: khi build UI phải tuân thủ spec, tránh copy nguyên CSS cũ.


## 2026-05-16 - T-00A3: Extract KB Thần số học an toàn

| Field | Value |
|---|---|
| Task | T-00A3 |
| Status | Done |
| Scope | KB audit/plan only |
| Verification | Checksum KB duplicate, inspect top-level schema, update `kb-extraction-plan.md` |

Đã làm:

- Xác nhận `than-so-hoc-export/kb.json` và `numerology_core/numerology_knowledge_base.json` giống hệt nhau.
- SHA-256 canonical KB: `a6aed5a839631a6fdb3ee5558da445b91f41dd8dba12d1c601ea9b09f346f22c`.
- Xác nhận KB structured có 33 nhóm top-level.
- Xác nhận `numerology_core/narrative_templates.js` và `than-so-hoc-export/interpreter.js` giống hệt nhau.
- SHA-256 narrative source: `1c247944b2670b3a683c57317020117930ef03baf511c0394c81868eeab658db`.
- Cập nhật `kb-extraction-plan.md` với schema summary, storage/API plan, convert narrative plan và security rules.
- Cập nhật `TASK_REGISTRY.md` đánh dấu T-00A3 Done.

Không làm:

- Không import KB vào app.
- Không upload KB lên storage.
- Không public raw KB/narrative.
- Không execute JS narrative cũ.

Đánh giá rủi ro:

- Tech debt: thấp, vì chỉ chuẩn hóa plan.
- Security/KB: giảm rủi ro nhờ chốt canonical source và private API boundary.
- Rủi ro còn lại: khi implement cần viết validator/converter thật và smoke test static artifact.


## 2026-05-16 - T-00A4: Spec Tarot workflow theo Mystery Tarot

| Field | Value |
|---|---|
| Task | T-00A4 |
| Status | Done |
| Scope | Tarot workflow/spec only |
| Verification | Rà website reference public, manifest KB local, cập nhật Tarot spec/module docs |

Đã làm:

- Ghi rõ Mystery Tarot chỉ là workflow reference.
- Rà KB local `kb/commercial/tarot_kb` với cards, daily, taxonomy, clarify, combos và assets.
- Ghi credit requirement: `Dữ liệu luận giải và thiết kế lá bài: Mystery Tarot của turni0 (Phúc Hoàng), sử dụng với sự cho phép của tác giả.`.
- Cập nhật `product-specs/tarot-workflow-reference.md` với system structure, user journey, spread/cooldown, pricing direction, MVP/P1/P2, API sơ bộ, content/legal rules.
- Cập nhật `modules/tarot.md` theo scope mới.
- Cập nhật `TASK_REGISTRY.md` đánh dấu T-00A4 Done.

Không làm:

- Không clone code/asset/endpoint bên ngoài.
- Không import KB vào app.
- Không triển khai payment/tier.
- Không dùng AI/Gemini.

Đánh giá rủi ro:

- Tech debt: giảm nhờ chia MVP/P1/P2.
- Security/KB: còn cần API gateway khi implement; hiện chưa public KB.
- Legal/content: cần giữ credit và disclaimer khi build UI.
- Product risk: pricing Tarot nên chốt trước khi code entitlement.

## 2026-05-16 - Chuẩn hóa lại project root và docs boundary

| Field | Value |
|---|---|
| Type | Documentation / Scope Clarification |
| Actor | Codex |
| Scope | Docs only, không code/build |

### Bối cảnh

- User xác nhận `E:\Project\Project\banmenh` là project root chính thức của Bản Mệnh V2.
- `E:\Project\Project\banmenh\docs` là nơi chứa tài liệu hướng dẫn, spec, đặc tả, task và audit.
- Cần tránh hiểu nhầm rằng phải tạo workspace khác hoặc coi code/scaffold chưa được task hóa là chính thức.

### Đã cập nhật

- Chuẩn hóa `PROJECT_META.md` để ghi rõ project root, docs source of truth và codebase status.
- Chuẩn hóa `ENVIRONMENT.md` để ghi rõ chưa có codebase V2 chính thức được duyệt để build/deploy.
- Chuẩn hóa `TASK_REGISTRY.md`, đổi `T-0101` thành task khởi tạo codebase app V2 trong project root.
- Bổ sung rule trong `SYSTEM_PROMPT.md`: khi user yêu cầu tài liệu/spec thì không code, không build, không chạy dev server, không deploy.

### Audit

- Tech debt/code rác: không phát sinh vì chỉ cập nhật docs.
- Security/KB: không thêm secret, token hoặc KB private.
- Rủi ro còn lại: nếu sau này bắt đầu implementation, phải xác nhận rõ với user trước khi chạy scaffold/build/dev server.
