import type { GridCells, GridSource } from "@banmenh/shared";

type BirthChartGridProps = {
  cells: GridCells;
  title: string;
  source: GridSource;
};

const GRID = [3, 6, 9, 2, 5, 8, 1, 4, 7];

function cellValue(num: number, count: number) {
  if (!count) return "·";
  return count === 1 ? String(num) : `${num}×${count}`;
}

export function BirthChartGrid({ cells, title, source }: BirthChartGridProps) {
  return (
    <div className="rounded-lg border border-[var(--bm-border-subtle)] bg-[var(--bm-bg-glass)] p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h4 className="text-base font-bold text-[var(--bm-text-main)]">{title}</h4>
        <span className="rounded-full border border-[var(--bm-border-subtle)] px-3 py-1 text-xs uppercase tracking-wider text-[var(--bm-text-soft)]">
          {source}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {GRID.map((num) => {
          const count = cells[num] ?? 0;
          return (
            <div
              className={[
                "flex aspect-square items-center justify-center rounded-lg border text-lg font-bold",
                count
                  ? "border-[var(--bm-border-gold)] bg-[rgba(251,191,36,0.08)] text-[var(--bm-gold-bright)]"
                  : "border-dashed border-[var(--bm-border-subtle)] text-[var(--bm-text-muted)]",
              ].join(" ")}
              key={num}
            >
              {cellValue(num, count)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
