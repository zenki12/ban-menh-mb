import { Card } from "../../ui";
import { scrollToUnlockCTA } from "./scrollToUnlock";

type TeaseSectionProps = {
  icon: string;
  title: string;
  intro: string;
  lockMessage?: string;
};

export function TeaseSection({
  icon,
  title,
  intro,
  lockMessage = "Mở khóa để xem chi tiết + cách hóa giải",
}: TeaseSectionProps) {
  return (
    <Card
      as="article"
      className="border-[var(--bm-border-purple)] shadow-[var(--bm-shadow-purple)]"
      variant="report"
      padding="lg"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="text-4xl" aria-hidden="true">
          {icon}
        </div>
        <div>
          <h3>{title}</h3>
          <p className="mt-3 max-w-3xl text-[var(--bm-text-soft)]">{intro}</p>
          <button
            type="button"
            onClick={scrollToUnlockCTA}
            className="mt-5 w-full cursor-pointer rounded-xl border border-[var(--bm-border-purple)] bg-[rgba(2,6,23,0.45)] p-4 text-left text-sm font-bold text-[var(--bm-primary-soft)] transition hover:-translate-y-0.5 hover:shadow-[var(--bm-shadow-purple)]"
          >
            🔒 {lockMessage}
          </button>
        </div>
      </div>
    </Card>
  );
}
