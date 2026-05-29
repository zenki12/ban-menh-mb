export type YearCardProps = {
  year: number;
  vanSo: number;
  age: number;
  html: string;
};

export function YearCard({ year, vanSo, age, html }: YearCardProps) {
  return (
    <article className="year-card-deep">
      <div className="year-card-deep-head">
        <span>NĂM {year}</span>
        <strong>VẬN SỐ {vanSo}</strong>
        <em>{age} tuổi</em>
      </div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
