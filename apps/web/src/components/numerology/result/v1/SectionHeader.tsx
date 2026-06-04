type SectionHeaderProps = {
  number: string;
  title: string;
};

export function SectionHeader({ number, title }: SectionHeaderProps) {
  return (
    <div className="v1-section-header">
      <span>{number}</span>
      <h3>{title}</h3>
    </div>
  );
}
