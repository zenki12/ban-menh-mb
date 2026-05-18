// PayOS integration. Document: https://payos.vn/docs/api/
// HTTP fetch trực tiếp tới PayOS API — không dùng SDK third-party.
// Chỉ dùng trong server context (Node.js runtime).

import { signPayosPaymentRequest } from "./signature";

const PAYOS_API_URL = "https://api-merchant.payos.vn";

type PayosItem = {
  name: string;
  quantity: number;
  price: number;
};

type CreatePaymentRequestParams = {
  orderCode: number;
  amount: number;
  /** Tối đa 25 ký tự theo PayOS. Sẽ tự truncate. */
  description: string;
  items?: PayosItem[];
  returnUrl: string;
  cancelUrl: string;
};

export type PayosPaymentResponse = {
  qrCode: string;
  checkoutUrl: string;
  paymentLinkId: string;
  orderCode: number;
  status: string;
  /** Unix timestamp (seconds) khi QR hết hạn. */
  expiredAt?: number;
};

function getRequiredEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `Thiếu biến môi trường PayOS: ${key}. Kiểm tra .env.local.`,
    );
  }
  return value;
}

/**
 * Gọi PayOS API POST /v2/payment-requests để tạo payment link + QR.
 * Backend tự tính amount từ pricing contract — không tin amount từ frontend.
 */
export async function createPaymentRequest(
  params: CreatePaymentRequestParams,
): Promise<PayosPaymentResponse> {
  const clientId = getRequiredEnv("PAYOS_CLIENT_ID");
  const apiKey = getRequiredEnv("PAYOS_API_KEY");
  const checksumKey = getRequiredEnv("PAYOS_CHECKSUM_KEY");

  // PayOS giới hạn description 25 ký tự
  const description = params.description.slice(0, 25);

  const signature = signPayosPaymentRequest(
    {
      amount: params.amount,
      cancelUrl: params.cancelUrl,
      description,
      orderCode: params.orderCode,
      returnUrl: params.returnUrl,
    },
    checksumKey,
  );

  const body = {
    orderCode: params.orderCode,
    amount: params.amount,
    description,
    items: params.items ?? [],
    returnUrl: params.returnUrl,
    cancelUrl: params.cancelUrl,
    signature,
  };

  const response = await fetch(`${PAYOS_API_URL}/v2/payment-requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-client-id": clientId,
      "x-api-key": apiKey,
    },
    body: JSON.stringify(body),
  });

  const json = (await response.json()) as {
    code: string;
    desc: string;
    data?: PayosPaymentResponse;
  };

  if (json.code !== "00" || !json.data) {
    throw new Error(
      `PayOS trả lỗi: ${json.desc ?? "Không xác định"} (code: ${json.code})`,
    );
  }

  return json.data;
}
