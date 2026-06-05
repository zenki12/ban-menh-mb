"use client";

import { createError, isAppError, type AppError, type Phase } from "@banmenh/shared";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";

import { PageShell } from "../../../../components/layout";
import { FAQSection } from "../../../../components/numerology/result/FAQSection";
import { FullReport, type NumerologyReportWithSections } from "../../../../components/numerology/result/FullReport";
import { LockedSectionsGrouped } from "../../../../components/numerology/result/LockedSectionsGrouped";
import { MagneticCTA } from "../../../../components/numerology/result/MagneticCTA";
import { PartialIndicatorSection } from "../../../../components/numerology/result/PartialIndicatorSection";
import { StickyBottomCTA } from "../../../../components/numerology/result/StickyBottomCTA";
import { SummaryDashboard } from "../../../../components/numerology/result/SummaryDashboard";
import { ErrorState, LoadingState, UnauthorizedState, Card } from "../../../../components/ui";
import { SectionHeader } from "../../../../components/numerology/result/v1";
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
  return [...chunks, ...fallback].filter((item, index, all) => all.indexOf(item) === index).slice(0, 3);
}

const personalMonthSummaries: Record<number, { bullets: string[]; summary: string }> = {
  1: {
    bullets: [
      "Tháng khởi đầu, chủ động và mở hướng mới",
      "Phù hợp để ra quyết định, bắt tay vào việc và tạo nhịp đi riêng",
      "Tránh nóng vội hoặc ôm quá nhiều mục tiêu cùng lúc",
    ],
    summary:
      "Trong tháng này, năng lượng số 1 khuyến khích bạn bắt đầu rõ ràng hơn: chọn một việc quan trọng, tự đứng ra dẫn nhịp và biến ý tưởng thành bước hành động đầu tiên. Đây không phải tháng để chờ mọi thứ hoàn hảo, mà là tháng để tạo đà.",
  },
  2: {
    bullets: [
      "Tháng hợp tác, lắng nghe và điều chỉnh nhịp quan hệ",
      "Phù hợp để xây cầu nối, thương lượng và làm việc cùng người khác",
      "Tránh nhạy cảm quá mức hoặc phụ thuộc vào phản ứng bên ngoài",
    ],
    summary:
      "Năng lượng số 2 đưa trọng tâm về sự tinh tế trong tương tác. Tháng này phù hợp để bạn lắng nghe nhiều hơn, làm mềm các va chạm và chọn cách đi cùng người khác thay vì tự gánh mọi thứ một mình.",
  },
  3: {
    bullets: [
      "Tháng biểu đạt, kết nối và làm mới cảm hứng",
      "Phù hợp để giao tiếp, sáng tạo, truyền thông và chia sẻ ý tưởng",
      "Tránh phân tán, nói nhiều hơn làm hoặc để cảm xúc kéo lệch kế hoạch",
    ],
    summary:
      "Năng lượng số 3 mở ra một tháng nhẹ hơn, giàu tương tác và cảm hứng. Nếu biết chọn đúng kênh biểu đạt, bạn có thể khiến công việc, quan hệ và tinh thần trở nên thông thoáng hơn.",
  },
  4: {
    bullets: [
      "Tháng xây nền, kỷ luật và xử lý việc còn dang dở",
      "Phù hợp để lập kế hoạch, chỉnh quy trình và hoàn thiện chi tiết",
      "Tránh trì trệ, cứng nhắc hoặc quá sa vào kiểm soát",
    ],
    summary:
      "Năng lượng số 4 yêu cầu bạn quay về với cấu trúc. Tháng này hợp để dọn lại nền tảng, làm chắc các việc cơ bản và biến những ý định rời rạc thành hệ thống có thể theo được.",
  },
  5: {
    bullets: [
      "Tháng biến chuyển, linh hoạt và mở trải nghiệm mới",
      "Phù hợp để thử cách làm khác, di chuyển, kết nối và thích nghi",
      "Tránh bốc đồng, thay đổi vì chán hoặc bỏ dở việc quan trọng",
    ],
    summary:
      "Năng lượng số 5 khiến nhịp tháng nhanh hơn. Bạn có thể gặp nhiều thay đổi nhỏ nhưng liên tiếp; điểm quan trọng là giữ sự linh hoạt mà vẫn nhớ mục tiêu chính mình đang theo.",
  },
  6: {
    bullets: [
      "Tháng trách nhiệm, chăm sóc và cân bằng đời sống cá nhân",
      "Phù hợp để vun đắp quan hệ, gia đình, cam kết và chất lượng sống",
      "Tránh ôm hết trách nhiệm hoặc can thiệp quá sâu vào chuyện của người khác",
    ],
    summary:
      "Năng lượng số 6 kéo bạn về những điều cần được chăm nom kỹ hơn: gia đình, tình cảm, cam kết và sự hài hòa trong môi trường sống. Tháng này đẹp khi bạn biết cho đi mà không đánh mất ranh giới.",
  },
  7: {
    bullets: [
      "Tháng chiêm nghiệm, học sâu và rà soát lại hướng đi",
      "Phù hợp để nghiên cứu, nghỉ nhịp, quan sát và lắng nghe trực giác",
      "Tránh cô lập quá lâu hoặc suy diễn mọi thứ theo hướng nặng nề",
    ],
    summary:
      "Năng lượng số 7 làm tháng này chậm và sâu hơn. Đây là lúc bạn nên bớt chạy theo bề mặt, dành thời gian hiểu bản chất vấn đề và chọn lại điều thật sự đáng đầu tư tinh thần.",
  },
  8: {
    bullets: [
      "Tháng hành động thực tế, tài chính và kết quả hữu hình",
      "Phù hợp để chốt việc, thương lượng, quản trị nguồn lực và đo hiệu quả",
      "Tránh áp lực thành tích hoặc dùng quyền lực một cách căng thẳng",
    ],
    summary:
      "Năng lượng số 8 đưa bạn vào tháng cần rõ ràng về nguồn lực, trách nhiệm và kết quả. Nếu biết hành động có chiến lược, đây là tháng tốt để tạo bước tiến cụ thể trong công việc và tài chính.",
  },
  9: {
    bullets: [
      "Tháng hoàn tất, buông điều cũ và nhìn lại toàn cảnh",
      "Phù hợp để kết thúc việc dang dở, dọn cảm xúc và chuẩn bị chu kỳ mới",
      "Tránh níu kéo những điều đã hết vai trò hoặc quyết định trong bi quan",
    ],
    summary:
      "Năng lượng số 9 khép lại một nhịp cũ để bạn nhẹ hơn trước khi bước tiếp. Tháng này phù hợp để hoàn tất, tha thứ, sắp xếp lại ưu tiên và trả không gian cho điều mới đang đến.",
  },
};

function personalMonthFallback(number: number) {
  return personalMonthSummaries[number] ?? personalMonthSummaries[1];
}

function findFreeLifePathSection(report: NumerologyReportWithSections): Phase["sections"][number] | null {
  for (const phase of report.phases ?? []) {
    const section = phase.sections.find((item) => item.number === "4");
    if (section) return section;
  }
  return null;
}

function FreeFullSection({ report }: { report: NumerologyReportWithSections }) {
  const section = findFreeLifePathSection(report);
  if (!section) return null;

  return (
    <Card as="article" className="v1-report-section border-[var(--bm-border-gold)]" variant="glass" padding="lg">
      <div className="mb-4 inline-flex rounded-full border border-[var(--bm-border-gold)] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[var(--bm-gold-bright)]">
        Mở miễn phí
      </div>
      <SectionHeader number={section.number} title={section.title} titleBadge={section.titleBadge} />
      {section.quickIntro ? (
        <div className="mt-5 border-l-2 border-[var(--bm-gold-bright)] py-1 pl-4">
          <div className="flex flex-wrap items-baseline gap-2">
            {section.quickIntro.badge ? (
              <span className="rounded-full border border-[var(--bm-border-gold)] px-2.5 py-0.5 text-xs font-black text-[var(--bm-gold-bright)]">
                {section.quickIntro.badge}
              </span>
            ) : null}
            <p className="text-base font-bold leading-7 text-[var(--bm-text-main)]">
              {section.quickIntro.headline}
            </p>
          </div>
          <p className="mt-2 max-w-[72ch] text-sm leading-7 text-[var(--bm-text-soft)]">
            {section.quickIntro.summary}
          </p>
        </div>
      ) : null}
      {section.intro ? <p className="mt-4 text-[var(--bm-text-soft)]">{section.intro}</p> : null}
      <div className="nar-container mt-5" dangerouslySetInnerHTML={{ __html: section.html }} />
    </Card>
  );
}

function LockedDetailsPreview({
  dob,
  name,
  report,
  onUnlock,
}: {
  dob: string;
  name: string;
  report: NumerologyReportWithSections;
  onUnlock: () => void;
}) {
  const monthFallback = personalMonthFallback(report.personalMonth.number);

  return (
    <>
      <section className="grid gap-10">
        <SummaryDashboard dob={dob} report={report} showCta={false} unlocked={false} userName={name} />

        <FreeFullSection report={report} />

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

        <PartialIndicatorSection
          hint="Chủ đề vận hành trong tháng hiện tại, giúp bạn chọn trọng tâm hành động ngắn hạn."
          indicator={{
            ...report.personalMonth,
            data: {
              ...asRecord(report.personalMonth.data),
              description: monthFallback.summary,
            },
          }}
          themeBullets={themeBullets(report.personalMonth.data, monthFallback.bullets)}
          title={`Tháng ${report.personalMonth.month}/${report.personalYear.year}`}
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
        <LockedDetailsPreview dob={input.dob} name={input.fullName} onUnlock={openPayment} report={report} />
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
