# Hướng dẫn quản lý Voucher (Admin)

> Dành cho Zenki — Bản Mệnh V2 MVP.
> Mọi action voucher đều qua API, audit log trong Firestore collection `admin_logs`.

---

## Mục lục

1. [Setup ADMIN_TOKEN lần đầu](#1-setup-admin_token-lần-đầu)
2. [Tạo voucher mới (CREATE)](#2-tạo-voucher-mới-create)
3. [Xem danh sách voucher (LIST)](#3-xem-danh-sách-voucher-list)
4. [Sửa voucher (UPDATE)](#4-sửa-voucher-update)
5. [Tạm dừng voucher (PAUSE)](#5-tạm-dừng-voucher-pause)
6. [Bật lại voucher (ACTIVATE)](#6-bật-lại-voucher-activate)
7. [Xóa mềm voucher (DELETE)](#7-xóa-mềm-voucher-delete)
8. [Use case thực tế](#8-use-case-thực-tế)
9. [Troubleshooting](#9-troubleshooting)
10. [Audit log + Bảo mật](#10-audit-log--bảo-mật)

---

## 1. Setup ADMIN_TOKEN lần đầu

### Bước 1.1 — Generate token random

Mở PowerShell (Windows + R → gõ `powershell` → Enter).

Paste nguyên block sau, Enter:

```powershell
$bytes = New-Object byte[] 32
[System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
[Convert]::ToBase64String($bytes)
```

Output 1 dòng kiểu:

```
kJ8mP3vN9wQ2xR5tY7bC1zA4dF6gH0iL+yT5sW=
```

**Copy nguyên dòng đó** (44 ký tự).

### Bước 1.2 — Lưu vào password manager

Mở 1Password / Bitwarden / Notepad → tạo entry:

```
Tên: Bản Mệnh V2 ADMIN_TOKEN (dev)
Ngày: 2026-05-21
Giá trị: [chuỗi random >= 32 ký tự từ password manager]
```

Save lại. **Đừng làm mất.**

### Bước 1.3 — Paste vào `.env.local`

Mở file `E:\Project\Project\banmenh\apps\web\.env.local` bằng VS Code hoặc Notepad.

Tìm dòng:

```
ADMIN_TOKEN=your_value_here
```

Thay thành (paste token thật):

```
ADMIN_TOKEN=your_value_here
```

Save (Ctrl+S).

### Bước 1.4 — Verify file đúng format

```powershell
cd E:\Project\Project\banmenh
Get-Content apps/web/.env.local | Select-String "ADMIN_TOKEN"
```

Phải in ra:

```
ADMIN_TOKEN=your_value_here
```

Không được thấy `your_value_here`.

### Bước 1.5 — Restart Next.js dev server

Trong terminal đang chạy `npm run dev`:

1. Bấm Ctrl+C → confirm Y → tắt
2. Chạy:

```powershell
taskkill /IM node.exe /F
cd E:\Project\Project\banmenh
npm run dev
```

Đợi `Ready in XXXms`.

### Bước 1.6 — Test token work

Mở PowerShell mới, paste (thay `PASTE_TOKEN_HERE`):

```powershell
$token = "PASTE_TOKEN_HERE"
$base = "http://localhost:3000/api/admin/voucher"

curl.exe -X GET "$base/list" -H "X-Admin-Token: $token" -i
```

Kết quả phải có:

```
HTTP/1.1 200 OK
{"items":[{"code":"TEST10",...}]}
```

→ Token hoạt động. Sẵn sàng dùng.

---

## 2. Tạo voucher mới (CREATE)

### Setup biến (chạy 1 lần mỗi session PowerShell)

```powershell
$token = "PASTE_TOKEN_CUA_BAN"
$base = "http://localhost:3000/api/admin/voucher"
```

### 2.1 — Voucher percent (giảm % giá)

Voucher giảm 20% cho Numerology + Tarot:

```powershell
curl.exe -X POST "$base/create" `
  -H "X-Admin-Token: $token" `
  -H "Content-Type: application/json" `
  -d '{\"code\":\"TET2026\",\"discountType\":\"percent\",\"discountValue\":20,\"modules\":[\"numerology\",\"tarot\"],\"maxUses\":500,\"expiresAt\":\"2026-02-15T00:00:00.000Z\"}'
```

**Giải nghĩa:**
- `code`: tên voucher (uppercase, max 64 ký tự)
- `discountType`: "percent"
- `discountValue`: 20 (= 20%)
- `modules`: áp dụng cho ["numerology", "tarot"] hoặc 1 trong 2
- `maxUses`: tổng lượt dùng tối đa
- `expiresAt`: ngày hết hạn (ISO format)

### 2.2 — Voucher fixed (giảm số tiền cố định)

Giảm 5.000₫:

```powershell
curl.exe -X POST "$base/create" `
  -H "X-Admin-Token: $token" `
  -H "Content-Type: application/json" `
  -d '{\"code\":\"FIXED5K\",\"discountType\":\"fixed\",\"discountValue\":5000,\"modules\":[\"numerology\"],\"maxUses\":100}'
```

**Khác biệt:**
- `discountType`: "fixed"
- `discountValue`: 5000 (= 5.000₫)

### 2.3 — Voucher finalPrice (set giá cuối)

User trả còn 50.000₫ bất kể giá gốc:

```powershell
curl.exe -X POST "$base/create" `
  -H "X-Admin-Token: $token" `
  -H "Content-Type: application/json" `
  -d '{\"code\":\"FLASH50K\",\"discountType\":\"finalPrice\",\"finalPrice\":50000,\"modules\":[\"numerology\"],\"maxUses\":20,\"expiresAt\":\"2026-05-31T23:59:59.000Z\"}'
```

**Khác biệt:**
- `discountType`: "finalPrice"
- `finalPrice`: 50000 (giá cuối user trả)
- (không có `discountValue`)

### 2.4 — Các field optional khác

| Field | Mô tả | Ví dụ |
|---|---|---|
| `startsAt` | Voucher chỉ active từ ngày này | `"2026-01-01T00:00:00.000Z"` |
| `expiresAt` | Hết hạn lúc | `"2026-12-31T23:59:59.000Z"` |
| `perUserLimit` | Mỗi user dùng tối đa N lần (chưa implement, defer) | `1` |
| `note` | Ghi chú nội bộ (max 500 ký tự) | `"Chiến dịch Tết 2026"` |
| `modules` | Array, ít nhất 1 | `["numerology"]` hoặc `["tarot"]` hoặc cả 2 |

### 2.5 — Lỗi thường gặp

- **409 "Mục này đã tồn tại"** → Code voucher đã có. Đổi tên khác.
- **400 "Thông tin nhập chưa hợp lệ"** → Sai field hoặc thiếu required. Kiểm tra JSON.
- **401** → Token sai. Verify với `echo $token`.

---

## 3. Xem danh sách voucher (LIST)

```powershell
curl.exe -X GET "$base/list" -H "X-Admin-Token: $token"
```

Hoặc giới hạn 10 voucher đầu:

```powershell
curl.exe -X GET "$base/list?limit=10" -H "X-Admin-Token: $token"
```

**Output:**

```json
{
  "items": [
    {
      "code": "TEST10",
      "active": true,
      "discountType": "percent",
      "discountValue": 10,
      "modules": ["numerology"],
      "usedCount": 0,
      "maxUses": 100,
      "createdAt": "2026-05-21T...",
      "updatedAt": "2026-05-21T..."
    },
    {
      "code": "TET2026",
      ...
    }
  ],
  "nextCursor": "..."
}
```

`nextCursor` dùng để pagination — nếu có thì gọi tiếp với `?cursor=<value>`.

---

## 4. Sửa voucher (UPDATE)

### 4.1 — Tăng số lượt dùng

```powershell
curl.exe -X POST "$base/TEST10/update" `
  -H "X-Admin-Token: $token" `
  -H "Content-Type: application/json" `
  -d '{\"maxUses\":1000}'
```

### 4.2 — Đổi giá trị giảm

```powershell
curl.exe -X POST "$base/TEST10/update" `
  -H "X-Admin-Token: $token" `
  -H "Content-Type: application/json" `
  -d '{\"discountValue\":15}'
```

### 4.3 — Đổi ngày hết hạn

```powershell
curl.exe -X POST "$base/TEST10/update" `
  -H "X-Admin-Token: $token" `
  -H "Content-Type: application/json" `
  -d '{\"expiresAt\":\"2026-12-31T23:59:59.000Z\"}'
```

### 4.4 — Sửa nhiều field cùng lúc

```powershell
curl.exe -X POST "$base/TEST10/update" `
  -H "X-Admin-Token: $token" `
  -H "Content-Type: application/json" `
  -d '{\"maxUses\":2000,\"discountValue\":25,\"note\":\"Promo Tết mở rộng\"}'
```

### 4.5 — Field cấm sửa

Hệ thống KHÔNG cho phép sửa qua admin update:
- `code` (immutable — phải tạo voucher mới)
- `usedCount` (chỉ Worker increment được)
- `active` (dùng pause/activate thay vì update)
- `createdAt` (auto)

Field cho phép sửa: `discountType`, `discountValue`, `finalPrice`, `maxUses`, `perUserLimit`, `modules`, `startsAt`, `expiresAt`, `note`.

---

## 5. Tạm dừng voucher (PAUSE)

User nhập voucher đã pause sẽ thấy "Mã voucher đã hết hạn":

```powershell
curl.exe -X POST "$base/TEST10/pause" -H "X-Admin-Token: $token"
```

Set `active: false` ngay lập tức. Hiệu quả tức thì cho user mới (user đang dùng QR sẵn không bị ảnh hưởng).

---

## 6. Bật lại voucher (ACTIVATE)

```powershell
curl.exe -X POST "$base/TEST10/activate" -H "X-Admin-Token: $token"
```

Set `active: true`.

---

## 7. Xóa mềm voucher (DELETE)

**Lưu ý:** Đây là **SOFT DELETE**, data vẫn còn trong Firestore. Chỉ set `active: false` + ghi audit log "deleted".

Tại sao soft delete? Để purchase cũ với `voucherCode = "TEST10"` vẫn trace được voucher info (kiểm tra lịch sử doanh thu, hoàn tiền, v.v.).

```powershell
curl.exe -X POST "$base/TEST10/delete" -H "X-Admin-Token: $token"
```

Hard delete (xóa hẳn): chưa hỗ trợ ở MVP. Nếu cần, làm thủ công trong Firebase Console.

---

## 8. Use case thực tế

### Scenario 1: Chiến dịch Tết 2026

**Bước 1.** Tạo voucher 30% giảm giá, valid Tết:

```powershell
curl.exe -X POST "$base/create" `
  -H "X-Admin-Token: $token" `
  -H "Content-Type: application/json" `
  -d '{\"code\":\"TET2026\",\"discountType\":\"percent\",\"discountValue\":30,\"modules\":[\"numerology\",\"tarot\"],\"maxUses\":1000,\"startsAt\":\"2026-01-20T00:00:00.000Z\",\"expiresAt\":\"2026-02-20T23:59:59.000Z\",\"note\":\"Chiến dịch Tết Nguyên Đán 2026\"}'
```

**Bước 2.** Marketing share code `TET2026` qua kênh social media.

**Bước 3.** Theo dõi usedCount mỗi vài ngày:

```powershell
curl.exe -X GET "$base/list" -H "X-Admin-Token: $token" | ConvertFrom-Json | Select-Object -ExpandProperty items | Where-Object code -eq "TET2026"
```

**Bước 4.** Hết Tết (21/2/2026), pause:

```powershell
curl.exe -X POST "$base/TET2026/pause" -H "X-Admin-Token: $token"
```

### Scenario 2: Voucher bị abuse — pause khẩn

Phát hiện voucher TEST10 dùng quá 50 lần/giờ (bất thường):

```powershell
curl.exe -X POST "$base/TEST10/pause" -H "X-Admin-Token: $token"
```

→ Trong 1 giây, mọi user mới nhập TEST10 sẽ bị từ chối.

Sau khi điều tra → activate lại nếu OK:

```powershell
curl.exe -X POST "$base/TEST10/activate" -H "X-Admin-Token: $token"
```

### Scenario 3: Voucher hot, mở rộng lượt

Voucher TEST10 sắp hết 100/100 lượt mà nhu cầu vẫn cao:

```powershell
curl.exe -X POST "$base/TEST10/update" `
  -H "X-Admin-Token: $token" `
  -H "Content-Type: application/json" `
  -d '{\"maxUses\":2000}'
```

### Scenario 4: Tặng voucher cho 1 user VIP

Tạo voucher mới với maxUses=1 + dùng note ghi user cụ thể:

```powershell
curl.exe -X POST "$base/create" `
  -H "X-Admin-Token: $token" `
  -H "Content-Type: application/json" `
  -d '{\"code\":\"VIP_NGUYEN_VAN_A\",\"discountType\":\"finalPrice\",\"finalPrice\":1000,\"modules\":[\"numerology\"],\"maxUses\":1,\"note\":\"Tặng anh Nguyễn Văn A theo email 21/05/2026\"}'
```

→ Voucher chỉ user nhận được dùng 1 lần, giá còn 1.000₫.

### Scenario 5: Cuối tháng, review tất cả voucher

```powershell
curl.exe -X GET "$base/list" -H "X-Admin-Token: $token" | ConvertFrom-Json | Format-Table
```

→ Xem danh sách voucher active + usedCount.

---

## 9. Troubleshooting

### Lỗi: `Invalid JSON`

Nguyên nhân: escape dấu `"` sai.

❌ Sai:
```powershell
-d '{"code":"TEST10"}'
```

✅ Đúng:
```powershell
-d '{\"code\":\"TEST10\"}'
```

### Lỗi: `401 Unauthorized`

- Token sai → check `$token` value
- Quên `-H "X-Admin-Token: $token"` header
- `$token` chưa set trong session PowerShell

Verify:
```powershell
echo $token
```

Phải in ra token đã set.

### Lỗi: `500 Server admin chưa được cấu hình`

ADMIN_TOKEN trong `.env.local` còn placeholder `your_value_here` hoặc rỗng.

Fix: làm lại Bước 1.3 + restart Next.js (Bước 1.5).

### Lỗi: `409 Mục này đã tồn tại`

Code voucher đã có trong Firestore. Đổi code khác hoặc dùng update.

### Lỗi: `404 Not Found`

URL sai hoặc voucher code chưa tồn tại.

Verify:
```powershell
curl.exe -X GET "$base/list" -H "X-Admin-Token: $token"
```

Xem code có trong list không.

### Lỗi: connect refused

Next.js dev chưa chạy. Mở terminal khác:

```powershell
cd E:\Project\Project\banmenh
npm run dev
```

Đợi `Ready in XXXms` rồi thử lại.

---

## 10. Audit log + Bảo mật

### 10.1 — Xem audit log

Mọi action admin tự động ghi vào Firestore collection `admin_logs`.

Vào Firebase Console:
1. https://console.firebase.google.com → project `ban-menh-v2`
2. Firestore Database → collection `admin_logs`
3. Mỗi document chứa:

```
action: "voucher.create" | "voucher.pause" | "voucher.delete" | ...
target: "TEST10"
source: "admin_api"
createdAt: "2026-05-21T..."
details: { ... }
```

→ Trace lại được mọi thao tác admin.

### 10.2 — Quy tắc bảo mật

| Việc | Đúng / Sai |
|---|---|
| Lưu token trong `.env.local` | ✅ (file gitignored) |
| Lưu trong 1Password / Bitwarden | ✅ |
| Commit vào git | ❌ TUYỆT ĐỐI KHÔNG |
| Share qua chat / email / Telegram | ❌ |
| Dùng cùng token cho dev + production | ❌ (2 token khác nhau) |
| Reuse password cá nhân làm token | ❌ |
| Token < 32 ký tự | ❌ (brute force được) |

### 10.3 — Khi nào đổi token?

- Nghi token bị lộ → đổi ngay
- Định kỳ 6 tháng → 1 năm
- Khi có nhân viên admin rời đi
- Khi đổi từ dev sang production (token khác hoàn toàn)

### 10.4 — Cách đổi token

1. Generate token mới (Bước 1.1)
2. Update `.env.local` (Bước 1.3)
3. Restart Next.js (Bước 1.5)
4. Test work (Bước 1.6)
5. Update token trong password manager
6. Xóa token cũ khỏi password manager

---

## Phụ lục — Danh sách endpoint API

Tất cả base URL: `http://localhost:3000/api/admin/voucher`

| Endpoint | Method | Mục đích |
|---|---|---|
| `/create` | POST | Tạo voucher mới |
| `/list` | GET | List tất cả voucher |
| `/{code}/update` | POST | Sửa voucher |
| `/{code}/pause` | POST | Tạm dừng voucher |
| `/{code}/activate` | POST | Bật lại voucher |
| `/{code}/delete` | POST | Soft delete voucher |

Header chung: `X-Admin-Token: <token>`.

Body JSON cho POST: `Content-Type: application/json`.

---

## Phụ lục — Voucher schema đầy đủ

```typescript
{
  code: string,                            // Unique, uppercase, max 64
  active: boolean,                         // Tự động true khi create
  discountType: "fixed" | "percent" | "finalPrice",
  discountValue?: number,                  // Required cho fixed/percent
  finalPrice?: number,                     // Required cho finalPrice
  modules: ("numerology" | "tarot")[],     // Ít nhất 1
  maxUses?: number,                        // Optional, mặc định unlimited
  usedCount: number,                       // Auto, KHÔNG sửa
  perUserLimit?: number,                   // Defer, chưa implement check
  startsAt?: string,                       // ISO date optional
  expiresAt?: string,                      // ISO date optional
  note?: string,                           // Ghi chú nội bộ, max 500
  createdAt: string,                       // Auto ISO
  updatedAt: string                        // Auto ISO
}
```

---

*Document version: 1.0 — 2026-05-21*
*Maintained by: Zenki / Codex*
