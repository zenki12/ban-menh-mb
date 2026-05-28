"use client";

import {
  createError,
  isAppError,
  type AppError,
  type NumerologyReport,
} from "@banmenh/shared";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";

import { PageShell } from "../../../components/layout";
import { SummaryDashboard } from "../../../components/numerology/result/SummaryDashboard";
import { ErrorState, LoadingState } from "../../../components/ui";
import { fetchWithAuth } from "../../../lib/api/client";
import { useAuth } from "../../../lib/auth";

type ReportResponse = {
  ok: true;
  report: NumerologyReport;
  unlocked: boolean;
  entitlement: unknown;
};

const PRODUCT_CODE = "numerology_single_report";

function ResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const [report, setReport] = useState<NumerologyReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AppError | null>(null);
  const [unlocked, setUnlocked] = useState(false);

  const input = useMemo(() => {
    const fullName = searchParams.get("fullName")?.trim() ?? "";
    const dob = searchParams.get("dob")?.trim() ?? "";
    const gender = searchParams.get("gender") ?? undefined;
    const nickname = searchParams.get("nickname")?.trim() || undefined;
    return { fullName, dob, gender, nickname };
  }, [searchParams]);

  const openPayment = useCallback(
    () => router.push(`/payment/setup?productCode=${PRODUCT_CODE}`),
    [router],
  );

  const fetchReport = useCallback(async () => {
    if (!input.fullName || !input.dob) {
      router.replace("/than-so-hoc");
      return;
    }
    if (authLoading) return;
    if (!user) {
      setLoading(false);
      setError(createError("AUTH_REQUIRED"));
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetchWithAuth<ReportResponse>("/api/numerology/report", {
        method: "POST",
        body: JSON.stringify(input),
      });
      setReport(response.report);
      setUnlocked(response.unlocked);
    } catch (err) {
      setError(isAppError(err) ? err : createError("INTERNAL_ERROR"));
    } finally {
      setLoading(false);
    }
  }, [authLoading, input, router, user]);

  useEffect(() => {
    void fetchReport();
  }, [fetchReport]);

  if (loading || authLoading) {
    return <LoadingState message="Đang phân tích dashboard Thần số học..." />;
  }
  if (error) {
    return <ErrorState code={error.code} requestId={error.requestId} onRetry={fetchReport} />;
  }
  if (!report) {
    return <ErrorState code="KB_NOT_AVAILABLE" onRetry={fetchReport} />;
  }

  return (
    <PageShell title="Tổng quan Thần số học" showBack backHref="/than-so-hoc" backLabel="Nhập lại">
      <SummaryDashboard
        dob={input.dob}
        onUnlock={openPayment}
        report={report}
        unlocked={unlocked}
        userName={input.fullName}
      />
      <p className="mt-10 text-sm text-[var(--bm-text-muted)]">
        Nội dung Thần số học chỉ dùng để tham khảo và tự quan sát, không khẳng định tương lai
        chắc chắn, không thay thế tư vấn chuyên môn hoặc quyết định quan trọng.
      </p>
    </PageShell>
  );
}

export default function NumerologyResultPage() {
  return (
    <Suspense fallback={<LoadingState message="Đang tải dashboard..." />}>
      <ResultContent />
    </Suspense>
  );
}
