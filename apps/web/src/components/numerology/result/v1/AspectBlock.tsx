export type AspectBlockProps = {
  icon: string;
  label: string;
  subtitle?: string;
  html: string;
};

export function AspectBlock({ icon, label, subtitle, html }: AspectBlockProps) {
  return (
    <div className="aspect-block">
      <div className="aspect-label">
        <span aria-hidden="true">{icon}</span>
        <span>{label}</span>
      </div>
      {subtitle ? <div className="aspect-subtitle">{subtitle}</div> : null}
      <div className="aspect-paragraph" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
