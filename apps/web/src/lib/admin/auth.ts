import { createError, type AppError } from "@banmenh/shared";
import { timingSafeEqual } from "crypto";

type AdminAuthResult =
  | { ok: true }
  | { ok: false; status: number; error: AppError };

function safeEqual(actual: string, expected: string): boolean {
  const actualBuffer = Buffer.from(actual);
  const expectedBuffer = Buffer.from(expected);
  if (actualBuffer.length !== expectedBuffer.length) return false;
  try {
    return timingSafeEqual(actualBuffer, expectedBuffer);
  } catch {
    return actual === expected;
  }
}

export function verifyAdminToken(request: Request): AdminAuthResult {
  const configuredAdmin = process.env["ADMIN_TOKEN"]?.trim();
  if (!configuredAdmin) {
    return {
      ok: false,
      status: 500,
      error: {
        ...createError("INTERNAL_ERROR"),
        message: "Server admin chưa được cấu hình.",
      },
    };
  }

  const adminHeader = request.headers.get("X-Admin-Token")?.trim();
  if (!adminHeader) {
    return { ok: false, status: 401, error: createError("AUTH_REQUIRED") };
  }

  if (!safeEqual(adminHeader, configuredAdmin)) {
    return { ok: false, status: 401, error: createError("AUTH_INVALID_TOKEN") };
  }

  return { ok: true };
}
