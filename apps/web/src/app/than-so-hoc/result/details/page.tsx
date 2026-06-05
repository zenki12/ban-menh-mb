"use client";

import { createError, isAppError, type AppError, type IndicatorResult, type NumerologyReport } from "@banmenh/shared";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";

import { PageShell } from "../../../../components/layout";
import { FreeIndicatorSection } from "../../../../components/numerology/result/FreeIndicatorSection";
import { FullReport, type NumerologyReportWithSections } from "../../../../components/numerology/result/FullReport";
import { LockedGrid, type LockedGroup } from "../../../../components/numerology/result/LockedGrid";
import { MagneticCTA } from "../../../../components/numerology/result/MagneticCTA";
import { PartialIndicatorSection } from "../../../../components/numerology/result/PartialIndicatorSection";
import { StickyBottomCTA } from "../../../../components/numerology/result/StickyBottomCTA";
import { TeaseSection } from "../../../../components/numerology/result/TeaseSection";
import { LOCKED_COUNT } from "../../../../components/numerology/result/utils";
import { ErrorState, LoadingState } from "../../../../components/ui";
import { fetchWithAuth } from "../../../../lib/api/client";
import { useAuth } from "../../../../lib/auth";

type ReportResponse = {
  ok: true;
  report: NumerologyReportWithSections;
  unlocked: boolean;
  entitlement: unknown;
};
type KarmicTease = { hasKarmic: true; debt: number; sourceIndicator: string } | { hasKarmic: false };

const PRICE = "99.000đ";
const sourceLabels: Record<string, string> = {
  lifePath: "Số đường đời",
  destiny: "Số sứ mệnh",
  maturity: "Số trưởng thành",
  maturityAbility: "Năng lực trưởng thành",
  overrideDifficulty: "Khó khăn cần vượt",
  soul: "Số linh hồn",
  personality: "Số cá tính",
};

const lockedGroups: LockedGroup[] = [
  {
    label: "Cá tính & Linh hồn",
    icon: "👤",
    items: ["Số sứ mệnh", "Số linh hồn", "Số cá tính", "Số thái độ", "Động lực tiếp cận", "Năng lực tiếp cận", "Thái độ tiếp cận"].map((title) => ({ title })),
  },
  {
    label: "Chu kỳ thời gian",
    icon: "⏳",
    items: ["12 tháng cá nhân", "Ngày cá nhân", "3 chu kỳ cuộc đời", "4 đỉnh kim tự tháp", "4 thử thách kim tự tháp"].map((title) => ({ title })),
  },
  {
    label: "Bài học & Hành trình",
    icon: "🎯",
    items: ["Bài học karmic", "Số trưởng thành", "Năng lực trưởng thành", "Năng lực nhận thức", "Khó khăn vượt qua", "Thử thách linh hồn", "Thử thách sứ mệnh", "Thử thách cá tính"].map((title) => ({ title })),
  },
  {
    label: "Dấu ấn biểu tượng",
    icon: "💎",
    items: [{ title: "Chữ cái mở đầu" }, { title: "Chữ cái đóng" }],
  },
];

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

function detectKarmicForTease(report: NumerologyReport): KarmicTease {
  const keys = ["lifePath", "destiny", "maturity", "maturityAbility", "overrideDifficulty", "soul", "personality"] as const;
  for (const key of keys) {
    const indicator = report[key] as IndicatorResult | undefined;
    if (indicator?.karmicDebt) {
      return { hasKarmic: true, debt: indicator.karmicDebt, sourceIndicator: key };
    }
  }
  return { hasKarmic: false };
}

function buildSummaryHref(search: { toString: () => string }) {
  const query = search.toString();
  return query ? `/than-so-hoc/result?${query}` : "/than-so-hoc/result";
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
      const response = await fetchWithAuth<ReportResponse>("/api/numerology/report", { method: "POST", body: JSON.stringify(input) });
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
  if (error) return <ErrorState code={error.code} requestId={error.requestId} onRetry={fetchReport} />;
  if (!report) return <ErrorState code="KB_NOT_AVAILABLE" onRetry={fetchReport} />;

  const karmic = detectKarmicForTease(report);
  const personalYearTitle = `Năm cá nhân ${report.personalYear.year}`;

  return (
    <>
      <PageShell title="Luận giải Thần số học" showBack backHref={summaryHref} backLabel="Tổng quan">
        {unlocked ? (
          <FullReport report={report} userName={input.fullName} />
        ) : (
          <>
            <section className="grid gap-10">
              <FreeIndicatorSection hint="Hướng phát triển chính từ ngày sinh." indicator={report.lifePath} title="Số đường đời" />
              <PartialIndicatorSection
                hint="Chủ đề và xu hướng năm nay"
                indicator={report.personalYear}
                themeBullets={themeBullets(report.personalYear.data, ["Nhận diện chủ đề nổi bật của năm", "Ưu tiên những hành động phù hợp", "Giữ năng lượng ổn định qua từng giai đoạn"])}
                title={personalYearTitle}
              />
              {karmic.hasKarmic ? (
                <TeaseSection icon="!" intro={`Bạn mang nợ nghiệp số ${karmic.debt} từ ${sourceLabels[karmic.sourceIndicator]}. Đây là bài học cuộc đời quan trọng.`} title="Bài học nghiệp lực" />
              ) : (
                <PartialIndicatorSection
                  hint="Năng lực tự nhiên bạn mang vào đời sống."
                  indicator={report.birthday}
                  themeBullets={themeBullets(report.birthday.data, ["Nhìn nhanh món quà bẩm sinh", "Gợi ý cách dùng năng lực tự nhiên", "Phần luận giải sâu đang được khóa"])}
                  title="Số ngày sinh"
                />
              )}
            </section>
            <LockedGrid groups={lockedGroups} lockedCount={LOCKED_COUNT} />
            <MagneticCTA price={PRICE} onClick={openPayment} />
          </>
        )}
        <div className="mt-10 pb-24 text-sm leading-relaxed text-[var(--bm-text-muted)] md:pb-0">
          <p>
            Các con số gợi mở xu hướng, nhưng không quyết định toàn bộ cuộc đời bạn. Bản luận giải này chỉ dùng để
            tham khảo và tự quan sát bản thân, điều quan trọng nhất vẫn là cách bạn sống, lựa chọn, rèn luyện, gieo
            thiện lành mỗi ngày.
          </p>
          <p className="mt-2">
            Và cuối cùng, xin hãy ghi nhớ:{" "}
            <strong className="text-[var(--bm-gold-bright)]">Đức năng thắng số.</strong>
          </p>
        </div>
      </PageShell>
      {unlocked ? null : <StickyBottomCTA ctaLabel="Mở khóa →" onClick={openPayment} price={PRICE} />}
    </>
  );
}

export default function NumerologyResultDetailsPage() {
  return (
    <Suspense fallback={<LoadingState message="Đang tải luận giải..." />}>
      <ResultDetailsContent />
    </Suspense>
  );
}
