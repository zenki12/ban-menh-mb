import type { NumerologyReport, PeriodIndicatorResult } from "@banmenh/shared";

import { readString, truncateText } from "./utils";

type Props = {
  report: NumerologyReport;
};

const CYCLE_META = [
  { icon: "🌱", label: "GIEO HẠT", phase: "Thanh xuân" },
  { icon: "🌳", label: "CHÍN", phase: "Trưởng thành" },
  { icon: "🌾", label: "THU HOẠCH", phase: "Viên mãn" },
] as const;

function CycleCard({
  cycle,
  meta,
}: {
  cycle: PeriodIndicatorResult;
  meta: (typeof CYCLE_META)[number];
}) {
  const title = readString(cycle.data, ["title", "name", "theme"]);
  const intro = readString(cycle.data, ["description", "meaning", "summary", "theme", "intro"]);

  return (
    <article className="bm-cycle-summary-card">
      <div className="bm-cycle-summary-header">
        <span className="bm-cycle-icon" aria-hidden="true">
          {meta.icon}
        </span>
        <div>
          <p className="bm-cycle-label">{meta.label}</p>
          <p className="bm-cycle-phase">{meta.phase}</p>
          <p className="bm-cycle-period">{cycle.period}</p>
          <p className="bm-cycle-number">
            Số {cycle.displayNumber ?? cycle.number}
            {title ? ` - ${title}` : ""}
          </p>
        </div>
      </div>
      {intro ? <p className="bm-cycle-intro">{truncateText(intro, 300)}</p> : null}
    </article>
  );
}

export function LifeCyclesSummary({ report }: Props) {
  if (!report.lifeCycles || report.lifeCycles.length < 3) return null;

  return (
    <section className="bm-life-cycles-summary">
      <h2>Chu kỳ Đường Đời</h2>
      <p className="bm-section-intro">
        Cuộc đời mỗi người trải qua 3 giai đoạn lớn: Gieo Hạt, Chín và Thu Hoạch. Mỗi giai đoạn có
        một con số chủ đạo riêng định hình bài học và năng lượng.
      </p>
      <div className="bm-cycles-grid">
        {report.lifeCycles.slice(0, 3).map((cycle, index) => (
          <CycleCard cycle={cycle} key={cycle.period} meta={CYCLE_META[index]} />
        ))}
      </div>
    </section>
  );
}
