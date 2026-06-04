type SectionHeaderProps = {
  number: string;
  title: string;
  phase?: "A" | "B" | "C" | "D";
};

const PHASE_BADGE_CLASS: Record<string, string> = {
  A: "phase-badge-A",
  B: "phase-badge-B",
  C: "phase-badge-C",
  D: "phase-badge-D",
};

export function SectionHeader({ number, title, phase }: SectionHeaderProps) {
  const badgeClass = phase ? PHASE_BADGE_CLASS[phase] ?? "" : "";

  return (
    <div className="v1-section-header">
      <span className={badgeClass}>{number}</span>
      <h3>{title}</h3>
    </div>
  );
}
