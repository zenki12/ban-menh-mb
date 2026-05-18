# Bản Mệnh V2 Data Contract

Ngày cập nhật: 2026-05-13

Tài liệu này định nghĩa dữ liệu/API cốt lõi để frontend, backend và payment không tự hiểu khác nhau.

## 1. Nguyên Tắc

- Backend là nguồn sự thật cho user, payment, entitlement và voucher.
- Frontend không tự tạo quyền unlock.
- Mọi money flow phải có `orderId`.
- Mọi webhook phải idempotent.
- Không log raw PII nếu không cần thiết.

## 2. Collections / Tables

### users

```ts
{
  id: string,
  email?: string,
  displayName?: string,
  photoURL?: string,
  provider: "google" | "anonymous",
  createdAt: string,
  updatedAt: string
}
```

### reports

```ts
{
  id: string,
  userId?: string,
  module: "numerology",
  inputHash: string,
  inputSnapshot: {
    fullName: string,
    nickname?: string,
    gender?: "male" | "female",
    birthDate: string
  },
  status: "free" | "unlocked",
  createdAt: string,
  updatedAt: string
}
```

### purchases

```ts
{
  id: string,
  orderId: string,
  userId?: string,
  module: "numerology" | "tarot",
  productCode: string,
  amount: number,
  currency: "VND",
  status: "pending" | "confirming" | "confirmed" | "failed" | "expired",
  provider: "payos",
  providerRef?: string,
  voucherCode?: string,
  createdAt: string,
  confirmedAt?: string,
  expiresAt?: string
}
```

### entitlements

```ts
{
  id: string,
  userId?: string,
  module: "numerology" | "tarot",
  type: "single_report" | "tarot_guide" | "tarot_master",
  reportId?: string,
  purchaseId: string,
  status: "active" | "expired" | "cancelled",
  startsAt: string,
  expiresAt?: string,
  lifetime?: boolean
}
```

### vouchers

```ts
{
  code: string,
  active: boolean,
  modules: Array<"numerology" | "tarot">,
  discountType: "fixed" | "percent" | "finalPrice",
  discountValue?: number,
  finalPrice?: number,
  maxUses?: number,
  usedCount: number,
  perUserLimit?: number,
  startsAt?: string,
  expiresAt?: string,
  note?: string,
  createdAt: string,
  updatedAt: string
}
```

### payment_logs

```ts
{
  id: string,
  orderId?: string,
  level: "info" | "warn" | "error",
  event: string,
  message: string,
  metadata?: Record<string, unknown>,
  createdAt: string
}
```

### tarot_readings

```ts
{
  id: string,
  userId?: string,
  theme: string,
  subTheme?: string,
  question?: string,
  spread: 1 | 3 | 5 | 7 | 10 | 12,
  cards: Array<{
    cardId: number,
    reversed: boolean,
    position: number
  }>,
  analysis?: string,
  createdAt: string
}
```

## 3. API Contract

### `POST /api/payment/create`

Request:

```ts
{
  module: "numerology" | "tarot",
  productCode: string,
  reportId?: string,
  voucherCode?: string,
  returnUrl?: string
}
```

Response:

```ts
{
  ok: true,
  orderId: string,
  amount: number,
  qrCode: string,
  checkoutUrl?: string,
  expiresAt: string
}
```

### `GET /api/payment/check?orderId=...`

Response:

```ts
{
  ok: true,
  orderId: string,
  status: "pending" | "confirming" | "confirmed" | "failed" | "expired",
  entitlementId?: string,
  unlockUrl?: string
}
```

### `POST /api/payment/webhook`

Yêu cầu:

- Verify signature.
- Không tin amount/order từ client.
- Nếu webhook lặp, không tạo entitlement trùng.
- Nếu status đã confirmed, trả success idempotent.

### `POST /api/vouchers/validate`

Request:

```ts
{
  code: string,
  module: "numerology" | "tarot",
  productCode: string,
  userId?: string
}
```

Response:

```ts
{
  ok: true,
  code: string,
  discountType: "fixed" | "percent" | "finalPrice",
  discountValue?: number,
  finalPrice?: number,
  originalAmount: number,
  payableAmount: number
}
```

### `GET /api/entitlements`

Response:

```ts
{
  ok: true,
  entitlements: Array<{
    module: string,
    type: string,
    status: string,
    reportId?: string,
    expiresAt?: string,
    lifetime?: boolean
  }>
}
```

## 4. Indexes Và Constraints

- `purchases.orderId` unique.
- `entitlements.purchaseId` unique nếu một purchase chỉ tạo một entitlement.
- `reports.inputHash + userId` có thể index để tìm lại report.
- `vouchers.code` unique uppercase.
- `payment_logs.orderId` index.
- `tarot_readings.userId + createdAt` index.

## 5. Retention

- Payment logs: giữ tối thiểu 180 ngày.
- Raw webhook payload: nếu lưu, phải redact dữ liệu nhạy cảm.
- Tarot local history: client tự giữ, có giới hạn.
- Cloud history: cần delete/export khi user yêu cầu trong tương lai.

