// PayOS signature helper. Document: https://payos.vn/docs/api/
// Dùng node:crypto — không thêm dependency.

import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Tạo signature cho PayOS payment request.
 *
 * PayOS dùng fixed field order (KHÔNG sort A-Z) cho payment request:
 * `amount=${amount}&cancelUrl=${cancelUrl}&description=${description}&orderCode=${orderCode}&returnUrl=${returnUrl}`
 *
 * Ref: https://github.com/mewisme/payos-bun/blob/main/src/utils/createSignature.ts
 */
export function signPayosPaymentRequest(
  params: {
    amount: number;
    cancelUrl: string;
    description: string;
    orderCode: number;
    returnUrl: string;
  },
  checksumKey: string,
): string {
  const queryString = [
    `amount=${params.amount}`,
    `cancelUrl=${params.cancelUrl}`,
    `description=${params.description}`,
    `orderCode=${params.orderCode}`,
    `returnUrl=${params.returnUrl}`,
  ].join("&");

  return createHmac("sha256", checksumKey).update(queryString).digest("hex");
}

/**
 * Verify signature từ PayOS response/webhook.
 * Sort fields A-Z, join "key=value&" pattern.
 */
export function verifyPayosSignature(
  data: Record<string, unknown>,
  signature: string,
  checksumKey: string,
): boolean {
  const sortedKeys = Object.keys(data).sort();
  const queryString = sortedKeys
    .map((key) => {
      const value = data[key];
      if (value !== null && typeof value === "object") {
        throw new Error(`PayOS signature: non-primitive value at key "${key}"`);
      }
      return `${key}=${value ?? ""}`;
    })
    .join("&");
  const expected = createHmac("sha256", checksumKey)
    .update(queryString)
    .digest("hex");
  const expectedBuf = Buffer.from(expected, "hex");
  const receivedBuf = Buffer.from(signature.toLowerCase(), "hex");
  if (expectedBuf.length !== receivedBuf.length) return false;
  return timingSafeEqual(expectedBuf, receivedBuf);
}
