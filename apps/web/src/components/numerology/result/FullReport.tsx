import {
  calcBirthChartCells,
  calcCombinedCells,
  calcNameChartCells,
  DEFAULT_GRID_ARROWS,
  detectArrows,
  detectIsolatedNumbers,
  findCompensated,
  PYTHAGORAS_CHART,
  type NumerologyReport,
  type SectionBlock,
} from "@banmenh/shared";
import { Card } from "../../ui";
import { BirthChartGrid } from "./charts/BirthChartGrid";
import { CombinedChartGrid } from "./charts/CombinedChartGrid";
import { PyramidSvgChart } from "./charts/PyramidSvgChart";

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

function GridCharts({ report }: { report: NumerologyReport }) {
  const dobCells = calcBirthChartCells(report.input.dobParts);
  const nameCells = calcNameChartCells(report.input.fullName, PYTHAGORAS_CHART);
  const combinedCells = calcCombinedCells(dobCells, nameCells);
  const arrows = detectArrows(combinedCells, DEFAULT_GRID_ARROWS);
  const presentArrows = arrows.filter((arrow) => arrow.present);
  const isolated = detectIsolatedNumbers(combinedCells, presentArrows);
  const compensated = findCompensated(dobCells, nameCells);

  return (
    <section className="mt-8 grid gap-6">
      <div className="section-header">BIỂU ĐỒ NGÀY SINH, TÊN & TỔNG HỢP</div>
      <p className="text-[var(--bm-text-soft)]">
        Ba biểu đồ 3×3 cho thấy các con số hiện diện trong ngày sinh, trong tên gọi và phần tổng hợp giữa hai nguồn.
      </p>
      <div className="grid gap-5 lg:grid-cols-3">
        <BirthChartGrid cells={dobCells} source="dob" title="Biểu đồ ngày sinh" />
        <BirthChartGrid cells={nameCells} source="name" title="Biểu đồ tên" />
        <CombinedChartGrid
          combinedCells={combinedCells}
          compensated={compensated}
          detectedArrows={arrows}
          dobCells={dobCells}
          isolated={isolated}
          nameCells={nameCells}
        />
      </div>
    </section>
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
          {section.id === "time-cycles" ? (
            <PyramidSvgChart
              challenges={report.pyramidChallenges}
              dobParts={report.input.dobParts}
              peaks={report.pyramidPeaks}
            />
          ) : null}
          <div className="grid gap-6">
            {section.indicators.map((indicator) => (
              <IndicatorEssay indicator={indicator} key={indicator.key} />
            ))}
          </div>
          {section.id === "lessons" ? <GridCharts report={report} /> : null}
        </section>
      ))}
    </div>
  );
}
