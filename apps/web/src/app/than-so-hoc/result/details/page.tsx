"use client";

import { createError, isAppError, type AppError } from "@banmenh/shared";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";

import { PageShell } from "../../../../components/layout";
import { FullReport, type NumerologyReportWithSections } from "../../../../components/numerology/result/FullReport";
import { ErrorState, LoadingState } from "../../../../components/ui";
import { fetchWithAuth } from "../../../../lib/api/client";

type ReportResponse = {
  ok: true;
  report: NumerologyReportWithSections;
};

function buildSummaryHref(search: { toString: () => string }) {
  const query = search.toString();
  return query ? `/than-so-hoc/result?${query}` : "/than-so-hoc/result";
}


function ResultDetailsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [report, setReport] = useState<NumerologyReportWithSections | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AppError | null>(null);

  const input = useMemo(() => {
    const fullName = searchParams.get("fullName")?.trim() ?? "";
    const dob = searchParams.get("dob")?.trim() ?? "";
    const gender = searchParams.get("gender") ?? undefined;
    const nickname = searchParams.get("nickname")?.trim() || undefined;
    return { fullName, dob, gender, nickname };
  }, [searchParams]);
  const summaryHref = buildSummaryHref(searchParams);

  const fetchReport = useCallback(async () => {
    if (!input.fullName || !input.dob) {
      router.replace("/than-so-hoc");
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
    } catch (err) {
      setError(isAppError(err) ? err : createError("INTERNAL_ERROR"));
    } finally {
      setLoading(false);
    }
  }, [input, router]);

  useEffect(() => {
    void fetchReport();
  }, [fetchReport]);

  if (loading) return <LoadingState message="Đang tải luận giải..." />;
  if (error) {
    return <ErrorState code={error.code} requestId={error.requestId} onRetry={fetchReport} />;
  }
  if (!report) return <ErrorState code="KB_NOT_AVAILABLE" onRetry={fetchReport} />;

  return (
    <PageShell title="Luận giải Thần số học" showBack backHref={summaryHref} backLabel="Tổng quan">
      <FullReport report={report} userName={input.fullName} />

      <div className="mt-10 text-sm leading-relaxed text-[var(--bm-text-muted)]">
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
