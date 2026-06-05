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
import { FAQSection } from "../../../components/numerology/result/FAQSection";
import { StickyBottomCTA } from "../../../components/numerology/result/StickyBottomCTA";
import { SummaryDashboard } from "../../../components/numerology/result/SummaryDashboard";
import { ErrorState, LoadingState, UnauthorizedState } from "../../../components/ui";
import { fetchWithAuth } from "../../../lib/api/client";
import { useAuth } from "../../../lib/auth";

type ReportResponse = {
  ok: true;
  report: NumerologyReport;
  unlocked: boolean;
  entitlement: unknown;
};

function isAuthError(code: AppError["code"]) {
  return code === "AUTH_REQUIRED" || code === "AUTH_INVALID_TOKEN" || code === "AUTH_SESSION_EXPIRED";
}

function authErrorDescription(code: AppError["code"]) {
  return code === "AUTH_REQUIRED"
    ? "Bạn cần đăng nhập trước khi xem báo cáo Thần Số Học."
    : "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại để tiếp tục.";
}

function loginReturnHref() {
  if (typeof window === "undefined") return "/";
  const returnUrl = `${window.location.pathname}${window.location.search}`;
  return `/?returnUrl=${encodeURIComponent(returnUrl)}`;
}

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

  const paymentHref = useMemo(() => {
    const query = searchParams.toString();
    return query ? `/than-so-hoc/payment?${query}` : "/than-so-hoc/payment";
  }, [searchParams]);
  const openPayment = useCallback(() => router.push(paymentHref), [paymentHref, router]);
  const showLockedNotice = searchParams.get("notice") === "locked";

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
    if (isAuthError(error.code)) {
      return (
        <UnauthorizedState
          description={authErrorDescription(error.code)}
          onLogin={() => router.push(loginReturnHref())}
        />
      );
    }
    return <ErrorState code={error.code} requestId={error.requestId} onRetry={fetchReport} />;
  }
  if (!report) {
    return <ErrorState code="KB_NOT_AVAILABLE" onRetry={fetchReport} />;
  }

  return (
    <PageShell title="Tổng quan Thần số học" showBack backHref="/than-so-hoc" backLabel="Nhập lại">
      {showLockedNotice ? (
        <div className="mb-6 rounded-lg border border-[var(--bm-border-gold)] bg-[rgba(247,201,72,0.08)] px-4 py-3 text-sm font-semibold text-[var(--bm-gold-bright)]">
          Báo cáo chi tiết cần mở khóa trước khi xem.
        </div>
      ) : null}
      <SummaryDashboard
        dob={input.dob}
        onUnlock={openPayment}
        report={report}
        unlocked={unlocked}
        userName={input.fullName}
      />
      <FAQSection />
      <p className="mt-10 text-sm text-[var(--bm-text-muted)]">
        Nội dung Thần số học chỉ dùng để tham khảo và tự quan sát, không khẳng định tương lai
        chắc chắn, không thay thế tư vấn chuyên môn hoặc quyết định quan trọng.
      </p>
      {unlocked ? null : <StickyBottomCTA onUnlock={openPayment} />}
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
