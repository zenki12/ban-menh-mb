import type { NumerologyReport, SectionBlock } from "@banmenh/shared";
import { Card } from "../../ui";

export type NumerologyReportWithSections = NumerologyReport & {
  sections?: SectionBlock[];
};

type FullReportProps = {
  report: NumerologyReportWithSections;
  userName: string;
};

function EmptySections({ userName }: { userName: string }) {
  return (
    <Card as="article" variant="glass" padding="lg">
      <h2>Báo cáo đang được chuẩn bị</h2>
      <p className="mt-3 text-[var(--bm-text-soft)]">
        Báo cáo đầy đủ của {userName} đã mở khóa, nhưng phần luận giải chi tiết chưa được trả về từ KB Worker.
      </p>
    </Card>
  );
}

function IndicatorEssay({ indicator }: { indicator: SectionBlock["indicators"][number] }) {
  return (
    <Card
      as="article"
      className="border-[var(--bm-border-subtle)]"
      id={`indicator-${indicator.key}`}
      variant="glass"
      padding="lg"
    >
      <div className="index-title">
        <span className="number">{indicator.label}</span>
        {indicator.number !== "" ? <span className="num-badge">{indicator.number}</span> : null}
      </div>
      <div className="nar-container mt-5" dangerouslySetInnerHTML={{ __html: indicator.html }} />
    </Card>
  );
}

export function FullReport({ report, userName }: FullReportProps) {
  const sections = report.sections ?? [];
  if (!sections.length) return <EmptySections userName={userName} />;

  return (
    <div className="grid gap-12">
      <p className="text-[var(--bm-text-soft)]">
        Báo cáo đầy đủ cho {userName}: toàn bộ phần luận giải chi tiết đã được mở khóa trong tài khoản.
      </p>
      {sections.map((section) => (
        <section className="grid gap-6" id={`section-${section.id}`} key={section.id}>
          <div className="section-header">{section.title}</div>
          {section.intro ? <p className="text-[var(--bm-text-soft)]">{section.intro}</p> : null}
          <div className="grid gap-6">
            {section.indicators.map((indicator) => (
              <IndicatorEssay indicator={indicator} key={indicator.key} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
