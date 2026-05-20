export type PaymentErrorType =
  | "signature_mismatch"
  | "amount_mismatch"
  | "purchase_not_found"
  | "server_error";

export function formatVnd(amount: number): string {
  return `${new Intl.NumberFormat("vi-VN").format(amount)}₫`;
}

function inlineCode(value: unknown): string {
  return `\`${String(value ?? "unknown").replace(/`/g, "'")}\``;
}

function shortUserId(userId: string): string {
  if (!userId) return "unknown";
  return `${userId.slice(0, 8)}...`;
}

export async function sendTelegram(
  botToken: string,
  chatId: string,
  text: string,
  parseMode = "Markdown",
): Promise<void> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: parseMode,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      console.warn(`[telegram] sendMessage failed status=${response.status}`);
    }
  } catch (err) {
    console.warn("[telegram] sendMessage failed:", err);
  } finally {
    clearTimeout(timeout);
  }
}

export function formatPaymentSuccess(
  orderId: string,
  amount: number,
  productCode: string,
  userId: string,
): string {
  return [
    "*✅ Thanh toán thành công*",
    `Order: ${inlineCode(orderId)}`,
    `Amount: ${inlineCode(formatVnd(amount))}`,
    `Product: ${inlineCode(productCode)}`,
    `User: ${inlineCode(shortUserId(userId))}`,
    `Time: ${inlineCode(new Date().toISOString())}`,
  ].join("\n");
}

export function formatPaymentError(
  type: PaymentErrorType,
  orderId: string,
  details: Record<string, unknown> = {},
): string {
  const lines: string[] = [];

  if (type === "signature_mismatch") {
    lines.push("*⚠️ Signature mismatch*", `Order: ${inlineCode(orderId)}`);
    lines.push(`IP: ${inlineCode(details.ip)}`);
  } else if (type === "amount_mismatch") {
    lines.push("*🚨 Amount mismatch*", `Order: ${inlineCode(orderId)}`);
    lines.push(`Expected: ${inlineCode(formatVnd(Number(details.expected ?? 0)))}`);
    lines.push(`Got: ${inlineCode(formatVnd(Number(details.got ?? 0)))}`);
  } else if (type === "purchase_not_found") {
    lines.push("*ℹ️ Purchase not found (fake/test)*", `Order: ${inlineCode(orderId)}`);
  } else {
    lines.push("*🔴 Server error*", `Order: ${inlineCode(orderId)}`);
    lines.push(`Error: ${inlineCode(details.message)}`);
  }

  lines.push(`Time: ${inlineCode(new Date().toISOString())}`);
  return lines.join("\n");
}
