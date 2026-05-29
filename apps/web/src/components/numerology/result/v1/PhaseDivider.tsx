type PhaseDividerProps = {
  letter: string;
  title: string;
};

export function PhaseDivider({ letter, title }: PhaseDividerProps) {
  return (
    <div className="phase-divider">
      <span>PHẦN {letter}.</span>
      <strong>{title}</strong>
    </div>
  );
}
