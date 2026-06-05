import type { NumerologyReport } from "@banmenh/shared";

type Props = {
  report: NumerologyReport;
};

type FieldMeta = {
  icon: string;
  label: string;
  tone?: "positive" | "negative" | "neutral";
};

const FIELD_META: Record<string, FieldMeta> = {
  description: { icon: "📋", label: "Tổng quan", tone: "neutral" },
  meaning: { icon: "💭", label: "Ý nghĩa", tone: "neutral" },
  theme: { icon: "🎯", label: "Chủ đề", tone: "neutral" },
  energy: { icon: "⚡", label: "Năng lượng", tone: "neutral" },
  focus: { icon: "🔎", label: "Trọng tâm", tone: "neutral" },
  action: { icon: "🚀", label: "Hành động gợi ý", tone: "positive" },
  moon_link: { icon: "🌙", label: "Liên kết Mặt Trăng", tone: "neutral" },
  best_for: { icon: "✓", label: "Phù hợp", tone: "positive" },
  warning: { icon: "⚠️", label: "Lưu ý", tone: "negative" },
  avoid: { icon: "🚫", label: "Nên tránh", tone: "negative" },
  advice: { icon: "💡", label: "Lời khuyên", tone: "positive" },
  career: { icon: "💼", label: "Công việc", tone: "neutral" },
  love: { icon: "❤️", label: "Tình cảm", tone: "neutral" },
  finance: { icon: "💰", label: "Tài chính", tone: "neutral" },
  health: { icon: "🌿", label: "Sức khỏe", tone: "neutral" },
};

export function PersonalMonthFull({ report }: Props) {
  const month = report.personalMonth;
  const data = (month.data ?? {}) as Record<string, unknown>;
  const monthNum = month.month;
  const number = month.number;
  const title = typeof data.title === "string" && data.title.trim() ? data.title.trim() : `Năng lượng tháng ${monthNum}`;
  const aspects = Object.entries(FIELD_META)
    .map(([key, meta]) => {
      const value = data[key];
      return typeof value === "string" && value.trim() ? { key, meta, value: value.trim() } : null;
    })
    .filter((item): item is { key: string; meta: FieldMeta; value: string } => item !== null);

  if (aspects.length === 0) {
    return (
      <section className="bm-preview-month-full">
        <h3>
          Tháng {monthNum} - Số Cá Nhân {number} - "{title}"
        </h3>
        <p className="bm-preview-month-desc">
          Dữ liệu tháng đang được cập nhật. Báo cáo đầy đủ có chi tiết tất cả 12 tháng và 3 năm tới.
        </p>
      </section>
    );
  }

  const intro = aspects.find((item) => item.key === "description" || item.key === "meaning");
  const others = aspects.filter((item) => item.key !== "description" && item.key !== "meaning");

  return (
    <section className="bm-preview-month-full">
      <h3>
        Tháng {monthNum} - Số Cá Nhân {number}
        {title ? ` - "${title}"` : ""}
      </h3>

      {intro && <p className="bm-preview-month-desc">{intro.value}</p>}

      {others.length > 0 && (
        <div className="bm-preview-month-aspects">
          {others.map(({ key, meta, value }) => (
            <div
              className={`bm-preview-aspect ${
                meta.tone === "positive"
                  ? "bm-preview-aspect-positive"
                  : meta.tone === "negative"
                    ? "bm-preview-aspect-negative"
                    : ""
              }`}
              key={key}
            >
              <strong>
                {meta.icon} {meta.label}:
              </strong>{" "}
              {value}
            </div>
          ))}
        </div>
      )}

      <p className="bm-preview-month-note">
        Đây là luận giải đầy đủ tháng {monthNum}. Báo cáo đầy đủ có chi tiết tất cả 12 tháng cá nhân, 3 năm tới
        và biểu đồ vận số 11 năm.
      </p>
    </section>
  );
}
