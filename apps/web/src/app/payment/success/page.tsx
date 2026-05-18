"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { PageShell } from "../../../components/layout";
import { Button, Card, ErrorState, LoadingState } from "../../../components/ui";
import { fetchWithAuth } from "../../../lib/api/client";

type CheckResponse = {
  orderId: string;
  status: "pending" | "confirming" | "confirmed" | "expired" | "failed";
  amount: number;
  productCode: string;
  expiresAt: string | null;
  confirmedAt: string | null;
};

const MAX_POLLS = 20; // 20 × 3s = 60s
const POLL_INTERVAL_MS = 3000;

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [result, setResult] = useState<CheckResponse | null>(null);
  const [timedOut, setTimedOut] = useState(false);
  const [error, setError] = useState(false);
  const pollCount = useRef(0);

  useEffect(() => {
    if (!orderId) { setError(true); return; }

    const poll = async () => {
      try {
        const data = await fetchWithAuth<CheckResponse>(
          `/api/payment/check?orderId=${encodeURIComponent(orderId)}`,
        );
        if (
          data.status === "confirmed" ||
          data.status === "failed" ||
          data.status === "expired"
        ) {
          setResult(data);
          return;
        }
        pollCount.current += 1;
        if (pollCount.current >= MAX_POLLS) {
          setTimedOut(true);
          return;
        }
        setTimeout(() => void poll(), POLL_INTERVAL_MS);
      } catch {
        setError(true);
      }
    };

    setTimeout(() => void poll(), POLL_INTERVAL_MS);
  }, [orderId]);

  const isPolling = !result && !timedOut && !error;

  return (
    <>
      {isPolling && <LoadingState message="Đang xác nhận thanh toán..." />}

      {timedOut && (
        <ErrorState
          description="Hệ thống đang xác nhận, vui lòng kiểm tra ở /account sau ít phút."
          onRetry={() => router.push("/account")}
          retryLabel="Vào tài khoản"
        />
      )}

      {error && (
        <ErrorState
          code="PAYMENT_FAILED"
          onRetry={() => router.push("/pricing")}
          retryLabel="Quay lại bảng giá"
        />
      )}

      {result?.status === "confirmed" && (
        <Card padding="lg" variant="report">
          <div className="flex flex-col items-center gap-4 text-center">
            <span
              aria-hidden
              className="flex size-16 items-center justify-center rounded-full bg-[var(--bm-bg-glass)] text-4xl"
              style={{ color: "#4ade80" }}
            >
              ✓
            </span>
            <h2>Thanh toán thành công</h2>
            <p className="text-[var(--bm-text-soft)]">
              Mã đơn hàng: <code className="font-mono">{result.orderId}</code>
            </p>
            <p className="text-2xl font-bold text-[var(--bm-text-main)]">
              {new Intl.NumberFormat("vi-VN").format(result.amount)}₫
            </p>
            <Button
              className="mt-4"
              onClick={() => router.push("/account")}
              variant="primary"
            >
              Vào tài khoản xem quyền truy cập
            </Button>
          </div>
        </Card>
      )}

      {(result?.status === "failed" || result?.status === "expired") && (
        <ErrorState
          code="PAYMENT_FAILED"
          onRetry={() => router.push("/pricing")}
          retryLabel="Quay lại bảng giá"
        />
      )}
    </>
  );
}

export default function PaymentSuccessPage() {
  return (
    <PageShell title="Thanh toán" showBack={false} containerWidth="narrow">
      <Suspense fallback={<LoadingState message="Đang tải..." />}>
        <PaymentSuccessContent />
      </Suspense>
    </PageShell>
  );
}
