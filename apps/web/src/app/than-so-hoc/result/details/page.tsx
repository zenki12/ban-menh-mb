"use client";

import { createError, isAppError, type AppError } from "@banmenh/shared";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";

import { PageShell } from "../../../../components/layout";
import { FAQSection } from "../../../../components/numerology/result/FAQSection";
import { FreeIndicatorSection } from "../../../../components/numerology/result/FreeIndicatorSection";
import { FullReport, type NumerologyReportWithSections } from "../../../../components/numerology/result/FullReport";
import { LockedSectionsGrouped } from "../../../../components/numerology/result/LockedSectionsGrouped";
import { MagneticCTA } from "../../../../components/numerology/result/MagneticCTA";
import { PartialIndicatorSection } from "../../../../components/numerology/result/PartialIndicatorSection";
import { StickyBottomCTA } from "../../../../components/numerology/result/StickyBottomCTA";
import { ErrorState, LoadingState, UnauthorizedState } from "../../../../components/ui";
import { fetchWithAuth } from "../../../../lib/api/client";
import { useAuth } from "../../../../lib/auth";

type ReportResponse = {
  ok: true;
  report: NumerologyReportWithSections;
  unlocked: boolean;
  entitlement: unknown;
};

const PRICE = "99.000đ";

function buildSummaryHref(search: { toString: () => string }) {
  const query = search.toString();
  return query ? `/than-so-hoc/result?${query}` : "/than-so-hoc/result";
}

function isAuthError(code: AppError["code"]) {
  return code === "AUTH_REQUIRED" || code === "AUTH_INVALID_TOKEN" || code === "AUTH_SESSION_EXPIRED";
}

function authErrorDescription(code: AppError["code"]) {
  return code === "AUTH_REQUIRED"
    ? "Bạn cần đăng nhập trước khi xem báo cáo Thần số học."
    : "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại để tiếp tục.";
}

function loginReturnHref() {
  if (typeof window === "undefined") return "/";
  const returnUrl = `${window.location.pathname}${window.location.search}`;
  return `/?returnUrl=${encodeURIComponent(returnUrl)}`;
}

function asRecord(data: unknown): Record<string, unknown> {
  return data && typeof data === "object" ? (data as Record<string, unknown>) : {};
}

function themeBullets(data: unknown, fallback: string[]) {
  const record = asRecord(data);
  const fields = ["theme", "description", "meaning", "lesson", "title"];
  const chunks = fields
    .map((field) => record[field])
    .filter((value): value is string => typeof value === "string" && value.trim().length > 0)
    .flatMap((value) => value.split(/[.\n]/).map((part) => part.trim()).filter(Boolean));
  return (chunks.length ? chunks : fallback).slice(0, 3);
}

function LockedDetailsPreview({
  report,
  onUnlock,
}: {
  report: NumerologyReportWithSections;
  onUnlock: () => void;
}) {
  return (
    <>
      <section className="grid gap-10">
        <FreeIndicatorSection
          hint="Chỉ số cốt lõi định hình hành trình phát triển chính của bạn."
          indicator={report.lifePath}
          title="Số Đường Đời"
        />

        <PartialIndicatorSection
          hint="Tài năng tự nhiên và món quà bẩm sinh thể hiện qua ngày sinh."
          indicator={report.birthday}
          themeBullets={themeBullets(report.birthday.data, [
            "Nhìn nhanh năng lực tự nhiên",
            "Gợi ý cách dùng món quà bẩm sinh",
            "Phần luận giải sâu đang được khóa",
          ])}
          title="Số Ngày Sinh"
        />

        <PartialIndicatorSection
          hint="Chủ đề vận hành chính trong năm hiện tại."
          indicator={report.personalYear}
          themeBullets={themeBullets(report.personalYear.data, [
            "Nhận diện chủ đề nổi bật của năm",
            "Ưu tiên hành động phù hợp",
            "Giữ năng lượng ổn định qua từng giai đoạn",
          ])}
          title={`Năm cá nhân ${report.personalYear.year}`}
        />
      </section>

      <LockedSectionsGrouped onUnlock={onUnlock} report={report} />
      <MagneticCTA price={PRICE} onClick={onUnlock} />
      <FAQSection />
      <StickyBottomCTA onUnlock={onUnlock} />
    </>
  );
}

function ResultDetailsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const [report, setReport] = useState<NumerologyReportWithSections | null>(null);
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
  const summaryHref = buildSummaryHref(searchParams);
  const paymentHref = useMemo(() => {
    const query = searchParams.toString();
    return query ? `/than-so-hoc/payment?${query}` : "/than-so-hoc/payment";
  }, [searchParams]);
  const openPayment = useCallback(() => router.push(paymentHref), [paymentHref, router]);

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

  if (loading || authLoading) return <LoadingState message="Đang tải luận giải..." />;
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
  if (!report) return <ErrorState code="KB_NOT_AVAILABLE" onRetry={fetchReport} />;

  return (
    <PageShell title="Luận giải Thần số học" showBack backHref={summaryHref} backLabel="Tổng quan">
      {unlocked ? (
        <FullReport report={report} userName={input.fullName} />
      ) : (
        <LockedDetailsPreview onUnlock={openPayment} report={report} />
      )}

      <div className="mt-10 pb-24 text-sm leading-relaxed text-[var(--bm-text-muted)] md:pb-0">
        <p>
          Các con số gợi mở xu hướng, nhưng không quyết định toàn bộ cuộc đời bạn. Bản luận giải
          này chỉ dùng để tham khảo và tự quan sát bản thân; điều quan trọng nhất vẫn là cách bạn
          sống, lựa chọn, rèn luyện và gieo thiện lành mỗi ngày.
        </p>
        <p className="mt-2">
          Và cuối cùng, xin hãy ghi nhớ{" "}
          <strong className="text-[var(--bm-gold-bright)]">Đức năng thắng số</strong>
        </p>
      </div>
    </PageShell>
  );
}

export default function NumerologyResultDetailsPage() {
  return (
    <Suspense fallback={<LoadingState message="Đang tải luận giải..." />}>
      <ResultDetailsContent />
    </Suspense>
  );
}
