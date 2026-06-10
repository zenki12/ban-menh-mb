import { createHmac, timingSafeEqual } from "node:crypto";
import assert from "node:assert/strict";

function buildPayosSignatureString(data) {
  return Object.keys(data)
    .sort()
    .map((key) => {
      const value = data[key];
      if (value !== null && typeof value === "object") {
        throw new Error(`PayOS signature: non-primitive value at key "${key}"`);
      }
      return `${key}=${value ?? ""}`;
    })
    .join("&");
}

function sign(data, checksumKey) {
  return createHmac("sha256", checksumKey)
    .update(buildPayosSignatureString(data))
    .digest("hex");
}

function verify(data, received, checksumKey) {
  const computedHex = sign(data, checksumKey);
  const computedBuf = Buffer.from(computedHex, "hex");
  const receivedBuf = Buffer.from(received.toLowerCase(), "hex");
  if (computedBuf.length !== receivedBuf.length) return false;
  return timingSafeEqual(computedBuf, receivedBuf);
}

const checksumKey = "test-checksum-key";
const payload = {
  amount: 99000,
  orderCode: 123456,
  status: "PAID",
};

const validSignature = sign(payload, checksumKey);
const invalidSignature = `${validSignature.slice(0, -2)}${
  validSignature.endsWith("00") ? "01" : "00"
}`;

assert.equal(verify(payload, validSignature, checksumKey), true, "valid signature should pass");
assert.equal(verify(payload, invalidSignature, checksumKey), false, "1-byte diff should fail");
assert.equal(verify(payload, validSignature.slice(0, -2), checksumKey), false, "different length should fail");
assert.throws(
  () => verify({ ...payload, nested: { unsafe: true } }, validSignature, checksumKey),
  /non-primitive value/,
  "object value should throw",
);

console.log("[payos:test-sig] all checks passed");
