"use client";
import {
  createError,
  findProduct,
  formatPriceVnd,
  isAppError,
  type AppError,
} from "@banmenh/shared";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState, type ReactNode } from "react";
import { PageShell } from "../../../components/layout";
import { Button, Card, ErrorState, LoadingState } from "../../../components/ui";
import { fetchWithAuth } from "../../../lib/api/client";
import { useAuth } from "../../../lib/auth";
type VoucherStatus = "idle" | "validating" | "valid" | "invalid";
type VoucherResult = {
  discountVnd: number;
  finalAmount: number;
  voucher: { code: string; discountType: string };
};
type VoucherValidateResponse =
  | ({ valid: true } & VoucherResult)
  | { valid: false; error: AppError };
type CreateResponse = {
  orderId: string;
  amount: number;
  qrCode: string;
  checkoutUrl?: string;
  voucherCode?: string | null;
  discountVnd?: number;
  expiresAt: string;
};
const STORAGE_KEY = "banmenh-payment-pending";
function StatusBadge({ tone, children }: { tone: "success" | "danger"; children: ReactNode }) {
  const color =
    tone === "success"
      ? "border-[rgba(52,211,153,0.35)] text-[var(--bm-success-soft)]"
      : "border-[rgba(252,165,165,0.35)] text-[var(--bm-danger-soft)]";
  return (
    <span className={`inline-flex items-center rounded-full border bg-[var(--bm-bg-glass)] px-3 py-1 text-sm font-bold ${color}`}>
      {children}
    </span>
  );
}
function PriceRow({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: "success" | "total";
}) {
  const valueClass =
    accent === "success"
      ? "text-[var(--bm-success-soft)]"
      : accent === "total"
        ? "bg-[image:var(--bm-gradient-gold-text)] bg-clip-text text-2xl text-transparent"
        : "text-[var(--bm-text-main)]";
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-[var(--bm-text-soft)]">{label}</span>
      <span className={`font-bold ${valueClass}`}>{value}</span>
    </div>
  );
}
function SetupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productCode = searchParams.get("productCode");
  const product = useMemo(() => (productCode ? findProduct(productCode) : undefined), [productCode]);
  const { user, signInWithGoogle } = useAuth();
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherStatus, setVoucherStatus] = useState<VoucherStatus>("idle");
  const [voucherResult, setVoucherResult] = useState<VoucherResult | null>(null);
  const [voucherError, setVoucherError] = useState<AppError | null>(null);
  const [creating, setCreating] = useState(false);
  const [createErrorState, setCreateErrorState] = useState<AppError | null>(null);
  useEffect(() => {
    if (!productCode) router.replace("/pricing");
  }, [productCode, router]);
  if (!productCode) return <LoadingState message="Đang mở bảng giá..." />;
  if (!product) {
    return (
      <Card padding="lg" variant="glass">
        <ErrorState
          title="Sản phẩm không tồn tại"
          description="Gói bạn chọn không còn khả dụng. Vui lòng quay lại bảng giá để chọn gói khác."
          onRetry={() => router.push("/pricing")}
          retryLabel="Về bảng giá"
        />
      </Card>
    );
  }
  const selectedProduct = product;
  const validVoucher = voucherStatus === "valid" ? voucherResult : null;
  const totalAmount = validVoucher ? validVoucher.finalAmount : selectedProduct.priceVnd;
  const appliedCode = validVoucher ? validVoucher.voucher.code : voucherCode.trim().toUpperCase();
  function clearVoucher() {
    setVoucherCode("");
    setVoucherStatus("idle");
    setVoucherResult(null);
    setVoucherError(null);
  }
  async function ensureSignedIn() {
    if (!user) await signInWithGoogle();
  }
  async function handleApplyVoucher() {
    const normalized = voucherCode.trim().toUpperCase();
    setCreateErrorState(null);
    if (!normalized) {
      clearVoucher();
      return;
    }
    setVoucherCode(normalized);
    setVoucherStatus("validating");
    setVoucherResult(null);
    setVoucherError(null);
    try {
      await ensureSignedIn();
      const data = await fetchWithAuth<VoucherValidateResponse>("/api/voucher/validate", {
        method: "POST",
        body: JSON.stringify({ code: normalized, productCode: selectedProduct.code }),
      });
      if (data.valid) {
        setVoucherResult({
          discountVnd: data.discountVnd,
          finalAmount: data.finalAmount,
          voucher: data.voucher,
        });
        setVoucherStatus("valid");
      } else {
        setVoucherError(data.error);
        setVoucherStatus("invalid");
      }
    } catch (err) {
      setVoucherError(isAppError(err) ? err : createError("NETWORK_ERROR"));
      setVoucherStatus("invalid");
    }
  }
  async function handleConfirm() {
    setCreating(true);
    setCreateErrorState(null);
    try {
      await ensureSignedIn();
      const data = await fetchWithAuth<CreateResponse>("/api/payment/create", {
        method: "POST",
        body: JSON.stringify({
          productCode: selectedProduct.code,
          voucherCode: validVoucher ? appliedCode : undefined,
        }),
      });
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          orderId: data.orderId,
          qrCode: data.qrCode,
          checkoutUrl: data.checkoutUrl,
          amount: data.amount,
          productName: selectedProduct.name,
          voucherCode: data.voucherCode,
          discountVnd: data.discountVnd ?? 0,
          expiresAt: data.expiresAt,
        }),
      );
      router.push(`/payment/checkout?orderId=${encodeURIComponent(data.orderId)}`);
    } catch (err) {
      setCreateErrorState(isAppError(err) ? err : createError("PAYMENT_FAILED"));
    } finally {
      setCreating(false);
    }
  }
  return (
    <Card padding="lg" variant="glass">
      <div className="space-y-8">
        <section>
          <h2>{selectedProduct.name}</h2>
          <p className="mt-3 text-[var(--bm-text-soft)]">{selectedProduct.description}</p>
          <ul className="mt-5 space-y-2 text-sm text-[var(--bm-text-soft)]">
            {selectedProduct.features.map((feature) => (
              <li className="flex items-start gap-2" key={feature}>
                <span aria-hidden className="text-[var(--bm-gold-bright)]">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>
        <hr className="border-[var(--bm-border-subtle)]" />
        <section>
          <h3>Mã giảm giá</h3>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              void handleApplyVoucher();
            }}
            className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]"
          >
            <input
              className="min-h-11 w-full rounded-lg border border-[var(--bm-border-subtle)] bg-[var(--bm-bg-glass)] px-4 text-[var(--bm-text-main)] outline-none transition focus:border-[var(--bm-border-purple)]"
              maxLength={64}
              onChange={(event) => {
                setVoucherCode(event.target.value);
                setVoucherStatus("idle");
                setVoucherResult(null);
                setVoucherError(null);
              }}
              placeholder="Nhập mã nếu có"
              value={voucherCode}
            />
            <Button
              disabled={voucherStatus === "validating"}
              loading={voucherStatus === "validating"}
              type="submit"
              variant="secondary"
            >
              Áp dụng
            </Button>
          </form>
          {validVoucher ? (
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <StatusBadge tone="success">✓ Đã áp dụng voucher {appliedCode}</StatusBadge>
                <p className="text-sm text-[var(--bm-success-soft)]">
                  Giảm {formatPriceVnd(validVoucher.discountVnd)}
                </p>
              </div>
              <Button onClick={clearVoucher} variant="ghost">Bỏ voucher</Button>
            </div>
          ) : null}
          {voucherStatus === "invalid" && voucherError ? (
            <div className="mt-4">
              <StatusBadge tone="danger">✗ {voucherError.message}</StatusBadge>
            </div>
          ) : null}
        </section>
        <hr className="border-[var(--bm-border-subtle)]" />
        <section className="space-y-4">
          <h3>Tổng cộng</h3>
          <PriceRow label="Giá gốc" value={formatPriceVnd(selectedProduct.priceVnd)} />
          {validVoucher ? (
            <PriceRow
              accent="success"
              label={`Giảm giá (${appliedCode})`}
              value={`-${formatPriceVnd(validVoucher.discountVnd)}`}
            />
          ) : null}
          <div className="border-t border-[var(--bm-border-subtle)] pt-4">
            <PriceRow accent="total" label="Tổng cộng" value={formatPriceVnd(totalAmount)} />
          </div>
        </section>
        {createErrorState ? (
          <Card padding="md" variant="default">
            <ErrorState
              code={createErrorState.code}
              requestId={createErrorState.requestId}
              title="Không thể tạo đơn thanh toán"
            />
          </Card>
        ) : null}
        <Button fullWidth loading={creating} onClick={() => void handleConfirm()} size="lg">
          Xác nhận thanh toán
        </Button>
        <p className="text-sm text-[var(--bm-text-muted)]">
          Thanh toán được xử lý qua PayOS. Số tiền tạo QR được tính ở backend theo
          gói đã chọn và voucher hợp lệ, không lấy số tiền tự nhập từ trình duyệt.
        </p>
      </div>
    </Card>
  );
}
export default function PaymentSetupPage() {
  return (
    <PageShell title="Xác nhận đơn hàng" showBack backHref="/pricing" containerWidth="narrow">
      <Suspense fallback={<LoadingState message="Đang tải đơn hàng..." />}>
        <SetupContent />
      </Suspense>
    </PageShell>
  );
}
