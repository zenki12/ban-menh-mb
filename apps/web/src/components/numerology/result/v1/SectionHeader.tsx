type SectionHeaderProps = {
  number: string;
  title: string;
  titleBadge?: string;
};

export function SectionHeader({ number, title, titleBadge }: SectionHeaderProps) {
  return (
    <div className="v1-section-header">
      <span className="v1-section-number">{number}</span>
      <h3>{title}</h3>
      {titleBadge ? <span className="v1-section-title-badge">{titleBadge}</span> : null}
    </div>
  );
}
