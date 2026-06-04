import {
  createError,
  discountTypeSchema,
  StorageConflictError,
  StorageNotFoundError,
  voucherSchema,
} from "@banmenh/shared";
import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyAdminToken } from "../../../../lib/admin/auth";
import { adminRateLimitResponse } from "../../../../lib/admin/rate-limit";

const voucherFields = {
  code: voucherSchema.shape.code,
  discountType: discountTypeSchema,
  discountValue: voucherSchema.shape.discountValue,
  finalPrice: voucherSchema.shape.finalPrice,
  maxUses: voucherSchema.shape.maxUses,
  perUserLimit: voucherSchema.shape.perUserLimit,
  modules: voucherSchema.shape.modules,
  startsAt: voucherSchema.shape.startsAt,
  expiresAt: voucherSchema.shape.expiresAt,
  note: voucherSchema.shape.note,
};

function validateDiscountFields(
  value: { discountType?: string; discountValue?: number; finalPrice?: number },
  ctx: z.RefinementCtx,
) {
  if (
    (value.discountType === "fixed" || value.discountType === "percent") &&
    value.discountValue === undefined
  ) {
    ctx.addIssue({ code: "custom", path: ["discountValue"], message: "discountValue required" });
  }
  if (value.discountType === "finalPrice" && value.finalPrice === undefined) {
    ctx.addIssue({ code: "custom", path: ["finalPrice"], message: "finalPrice required" });
  }
}

export const createVoucherBodySchema = z
  .object(voucherFields)
  .strict()
  .superRefine(validateDiscountFields);

export const updateVoucherBodySchema = z
  .object({
    discountType: voucherFields.discountType.optional(),
    discountValue: voucherFields.discountValue,
    finalPrice: voucherFields.finalPrice,
    maxUses: voucherFields.maxUses,
    perUserLimit: voucherFields.perUserLimit,
    modules: voucherFields.modules.optional(),
    startsAt: voucherFields.startsAt,
    expiresAt: voucherFields.expiresAt,
    note: voucherFields.note,
  })
  .strict()
  .refine((value) => Object.keys(value).length > 0, { message: "empty patch" })
  .superRefine(validateDiscountFields);

export function authErrorResponse(request: Request): NextResponse | null {
  const rateLimitError = adminRateLimitResponse(request);
  if (rateLimitError) return rateLimitError;

  const auth = verifyAdminToken(request);
  return auth.ok ? null : NextResponse.json({ error: auth.error }, { status: auth.status });
}

export async function parseJson(request: Request): Promise<unknown | NextResponse> {
  try {
    return await request.json();
  } catch {
    return NextResponse.json({ error: createError("VALIDATION_FAILED") }, { status: 400 });
  }
}

export function storageErrorResponse(err: unknown): NextResponse {
  if (err instanceof StorageConflictError) {
    return NextResponse.json({ error: createError("ALREADY_EXISTS") }, { status: 409 });
  }
  if (err instanceof StorageNotFoundError) {
    return NextResponse.json({ error: createError("NOT_FOUND") }, { status: 404 });
  }
  console.error("[admin/voucher] storage error:", err);
  return NextResponse.json({ error: createError("INTERNAL_ERROR") }, { status: 500 });
}

export function normalizeCodeParam(code: string): string {
  return decodeURIComponent(code).trim().toUpperCase();
}
