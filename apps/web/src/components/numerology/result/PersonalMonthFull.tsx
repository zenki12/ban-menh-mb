import type { NumerologyReport } from "@banmenh/shared";

import { readString } from "./utils";

type Props = {
  report: NumerologyReport;
};

export function PersonalMonthFull({ report }: Props) {
  const month = report.personalMonth;
  const data = month.data as Record<string, unknown> | null;
  const number = month.number;
  const monthNum = month.month;
  const title = readString(data, ["title", "theme"]) || `Năng lượng tháng ${monthNum}`;
  const theme = readString(data, ["theme"]);
  const energy = readString(data, ["energy"]);
  const focus = readString(data, ["focus"]);
  const avoid = readString(data, ["avoid"]);
  const bestFor = readString(data, ["best_for"]);
  const description = readString(data, ["description", "meaning"]);

  return (
    <section className="bm-preview-month-full">
      <h3>
        Tháng {monthNum} - Số Cá Nhân {number}
        {title ? ` - "${title}"` : ""}
      </h3>

      {description ? (
        <p className="bm-preview-month-desc">{description}</p>
      ) : (
        <p className="bm-preview-month-desc">Dữ liệu tháng đang cập nhật.</p>
      )}

      <div className="bm-preview-month-aspects">
        {theme && (
          <div className="bm-preview-aspect">
            <strong>🎯 Chủ đề:</strong> {theme}
          </div>
        )}
        {energy && (
          <div className="bm-preview-aspect">
            <strong>⚡ Năng lượng:</strong> {energy}
          </div>
        )}
        {focus && (
          <div className="bm-preview-aspect">
            <strong>🔎 Trọng tâm:</strong> {focus}
          </div>
        )}
        {bestFor && (
          <div className="bm-preview-aspect bm-preview-aspect-positive">
            <strong>✓ Phù hợp:</strong> {bestFor}
          </div>
        )}
        {avoid && (
          <div className="bm-preview-aspect bm-preview-aspect-negative">
            <strong>⚠️ Nên tránh:</strong> {avoid}
          </div>
        )}
      </div>

      <p className="bm-preview-month-note">
        Đây là toàn bộ luận giải tháng {monthNum}. Báo cáo đầy đủ có chi tiết cho cả 12 tháng, 3 năm tới và
        biểu đồ vận số 11 năm.
      </p>
    </section>
  );
}
