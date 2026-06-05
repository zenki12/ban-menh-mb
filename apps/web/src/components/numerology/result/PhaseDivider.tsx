type Props = {
  letter: "A" | "B" | "C" | "D";
  title: string;
};

export function PhaseDivider({ letter, title }: Props) {
  return (
    <h2 className={`bm-phase-divider bm-phase-divider-${letter}`}>
      <span className="bm-phase-letter">{letter}</span>
      <span className="bm-phase-title">{title}</span>
    </h2>
  );
}
