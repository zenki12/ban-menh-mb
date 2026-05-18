// PayOS yêu cầu orderCode là number, không phải UUID.
// Pattern: timestamp ms * 10000 + random 4 digits → 17-19 digit number.

/**
 * Tạo orderCode numeric unique cho PayOS.
 * PayOS chấp nhận number, không phải UUID string.
 */
export function generateOrderId(): number {
  return Date.now() * 10000 + Math.floor(Math.random() * 10000);
}
