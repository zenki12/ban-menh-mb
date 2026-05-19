// PayOS yêu cầu orderCode là number, không phải UUID.
// Max safe integer: 9007199254740991 (~9e15).
// Pattern: Unix seconds (10 digits) * 10000 + random 4 digits = 14 digits max.
// Ví dụ: 1747500000 * 10000 + 1234 = 17475000001234 (~1.7e13, an toàn).
// Tránh dùng Date.now() * 10000 (~1.7e16) vì vượt safe integer limit.

/**
 * Tạo orderCode numeric unique cho PayOS.
 * PayOS chấp nhận number, không phải UUID string.
 */
export function generateOrderId(): number {
  return Math.floor(Date.now() / 1000) * 10000 + Math.floor(Math.random() * 10000);
}
