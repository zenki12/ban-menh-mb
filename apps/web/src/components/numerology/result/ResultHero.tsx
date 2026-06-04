import { Card } from "../../ui";

type ResultHeroProps = {
  name: string;
  dob: string;
  totalIndicators: number;
  unlocked?: boolean;
};

function formatDOB(dob: string) {
  const [year, month, day] = dob.split("-");
  return day && month && year ? `${day}/${month}/${year}` : dob;
}

export function ResultHero({ name, dob, totalIndicators, unlocked = false }: ResultHeroProps) {
  return (
    <Card className="mb-12" padding="lg" variant="glass">
      <p className="text-sm font-bold uppercase tracking-[0.28em] text-[var(--bm-gold-bright)]">
        ✓ Báo cáo Thần số học
      </p>
      <h1 className="mt-4 max-w-3xl text-4xl font-bold text-gradient-purple sm:text-5xl">
        {name}
      </h1>
      <p className="mt-5 text-lg text-[var(--bm-text-soft)]">
        <span aria-hidden="true">☀</span> Sinh ngày {formatDOB(dob)}
        <span className="mx-2 text-[var(--bm-text-muted)]">·</span>
        <span aria-hidden="true">📮</span> Đã phân tích {totalIndicators} chỉ số
      </p>
      {unlocked ? (
        <div className="mt-5 inline-flex rounded-full border border-[var(--bm-border-gold)] bg-[image:var(--bm-gradient-gold-text)] px-4 py-2 text-sm font-bold text-[var(--bm-bg-void)] shadow-[var(--bm-shadow-gold)]">
          ✓ Đã mở khóa
        </div>
      ) : null}
      <div className="mt-8 h-px w-24 bg-[image:var(--bm-gradient-gold-text)]" />
    </Card>
  );
}
