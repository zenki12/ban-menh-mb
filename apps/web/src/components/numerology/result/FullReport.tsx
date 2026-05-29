import {
  calcBirthChartCells,
  calcCombinedCells,
  calcCareerGroups,
  calcNameChartCells,
  DEFAULT_GRID_ARROWS,
  detectArrows,
  detectIsolatedNumbers,
  findCompensated,
  PYTHAGORAS_CHART,
  type NumerologyReport,
  type Phase,
  type SynthesizedReport,
} from "@banmenh/shared";
import { Card } from "../../ui";
import { BirthChartGrid } from "./charts/BirthChartGrid";
import { CareerBars } from "./charts/CareerBars";
import { CombinedChartGrid } from "./charts/CombinedChartGrid";
import { PyramidSvgChart } from "./charts/PyramidSvgChart";
import { PhaseDivider, ProfileHeaderCard, SectionHeader } from "./v1";

export type NumerologyReportWithSections = NumerologyReport & {
  profileHeader?: SynthesizedReport["profileHeader"];
  phases?: Phase[];
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

function BirthGridSlot({ report }: { report: NumerologyReport }) {
  return (
    <div className="mt-6 max-w-md">
      <BirthChartGrid cells={calcBirthChartCells(report.input.dobParts)} source="dob" title="Biểu đồ Ngày Sinh" />
    </div>
  );
}

function CombinedGridSlot({ report }: { report: NumerologyReport }) {
  const dobCells = calcBirthChartCells(report.input.dobParts);
  const nameCells = calcNameChartCells(report.input.fullName, PYTHAGORAS_CHART);
  const combinedCells = calcCombinedCells(dobCells, nameCells);
  const arrows = detectArrows(combinedCells, DEFAULT_GRID_ARROWS);
  const presentArrows = arrows.filter((arrow) => arrow.present);
  const isolated = detectIsolatedNumbers(combinedCells, presentArrows);
  const compensated = findCompensated(dobCells, nameCells);

  return (
    <div className="mt-6 grid gap-5 lg:grid-cols-2">
      <BirthChartGrid cells={nameCells} source="name" title="Biểu đồ Tên" />
      <CombinedChartGrid
        combinedCells={combinedCells}
        compensated={compensated}
        detectedArrows={arrows}
        dobCells={dobCells}
        isolated={isolated}
        nameCells={nameCells}
      />
    </div>
  );
}

function ChartSlot({ slot, report }: { slot?: Phase["sections"][number]["chartSlot"]; report: NumerologyReport }) {
  if (slot === "pyramid") {
    return (
      <PyramidSvgChart
        challenges={report.pyramidChallenges}
        dobParts={report.input.dobParts}
        peaks={report.pyramidPeaks}
      />
    );
  }
  if (slot === "birth-grid") return <BirthGridSlot report={report} />;
  if (slot === "combined-grid") return <CombinedGridSlot report={report} />;
  if (slot === "career-bars") {
    return <CareerBars groups={calcCareerGroups(report.lifePath.number, report.destiny.number)} />;
  }
  return null;
}

function SectionBody({ item, report }: { item: Phase["sections"][number]; report: NumerologyReport }) {
  if (item.chartSlot === "career-bars") {
    const [beforeChart, afterChart = ""] = item.html.split("<!-- CHART:career-bars -->");
    return (
      <>
        <div className="nar-container mt-5" dangerouslySetInnerHTML={{ __html: beforeChart }} />
        <div className="mt-6">
          <ChartSlot report={report} slot={item.chartSlot} />
        </div>
        {afterChart ? <div className="nar-container mt-5" dangerouslySetInnerHTML={{ __html: afterChart }} /> : null}
      </>
    );
  }

  return (
    <>
      <ChartSlot report={report} slot={item.chartSlot} />
      <div className="nar-container mt-5" dangerouslySetInnerHTML={{ __html: item.html }} />
    </>
  );
}

export function FullReport({ report, userName }: FullReportProps) {
  const phases = report.phases ?? [];
  const profileHeader =
    report.profileHeader ?? {
      name: userName,
      dob: report.input.dob,
      lifePathNumber: report.lifePath.number,
      chips8: [],
    };

  if (!phases.length) return <EmptySections userName={userName} />;

  return (
    <div className="grid gap-12">
      <ProfileHeaderCard {...profileHeader} />
      {phases.map((phase) => (
        <section className="grid gap-6" key={phase.letter}>
          <PhaseDivider letter={phase.letter} title={phase.title} />
          {phase.sections.map((item) => (
            <Card as="article" className="v1-report-section" id={item.id} key={item.id} variant="glass" padding="lg">
              <SectionHeader number={item.number} title={item.title} />
              {item.intro ? <p className="mt-4 text-[var(--bm-text-soft)]">{item.intro}</p> : null}
              <SectionBody item={item} report={report} />
            </Card>
          ))}
        </section>
      ))}
    </div>
  );
}
