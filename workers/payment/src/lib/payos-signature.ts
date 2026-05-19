// PayOS webhook signature verify — Web Crypto (crypto.subtle).
// KHÔNG dùng node:crypto (không chạy ở Cloudflare Workers runtime).
// Document: https://payos.vn/docs/api/

/**
 * Verify signature từ PayOS webhook.
 * Sort keys A-Z, build "key=value&key=value" query string, HMAC-SHA256.
 */
export async function verifyPayosWebhook(
  data: Record<string, unknown>,
  signature: string,
  checksumKey: string,
): Promise<boolean> {
  const sortedKeys = Object.keys(data).sort();
  const queryString = sortedKeys
    .map((key) => `${key}=${String(data[key])}`)
    .join("&");

  const encoder = new TextEncoder();
  const keyData = encoder.encode(checksumKey);
  const msgData = encoder.encode(queryString);

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signatureBuffer = await crypto.subtle.sign("HMAC", cryptoKey, msgData);
  const signatureHex = Array.from(new Uint8Array(signatureBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return signatureHex.toLowerCase() === signature.toLowerCase();
}
