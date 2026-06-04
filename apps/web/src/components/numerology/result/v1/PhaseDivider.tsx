type PhaseDividerProps = {
  letter: string;
  title: string;
};

export function PhaseDivider({ letter, title }: PhaseDividerProps) {
  return (
    <div className="phase-divider" data-phase={letter}>
      <span>PHẦN {letter}.</span>
      <strong>{title}</strong>
    </div>
  );
}
