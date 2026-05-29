import type { DetectedArrow, GridCells } from "@banmenh/shared";

type CombinedChartGridProps = {
  dobCells: GridCells;
  nameCells: GridCells;
  combinedCells: GridCells;
  detectedArrows: DetectedArrow[];
  isolated: number[];
  compensated: number[];
};

const POS: Record<number, { x: number; y: number }> = {
  3: { x: 16.67, y: 16.67 },
  6: { x: 50, y: 16.67 },
  9: { x: 83.33, y: 16.67 },
  2: { x: 16.67, y: 50 },
  5: { x: 50, y: 50 },
  8: { x: 83.33, y: 50 },
  1: { x: 16.67, y: 83.33 },
  4: { x: 50, y: 83.33 },
  7: { x: 83.33, y: 83.33 },
};
const GRID = [3, 6, 9, 2, 5, 8, 1, 4, 7];

function value(num: number, count: number) {
  if (!count) return "·";
  return count === 1 ? String(num) : `${num}×${count}`;
}

export function CombinedChartGrid({
  dobCells,
  nameCells,
  combinedCells,
  detectedArrows,
  isolated,
  compensated,
}: CombinedChartGridProps) {
  const presentArrows = detectedArrows.filter((arrow) => arrow.present);

  return (
    <div className="rounded-lg border border-[var(--bm-border-subtle)] bg-[var(--bm-bg-glass)] p-4">
      <div className="relative">
        <svg className="pointer-events-none absolute inset-0 z-10 size-full" viewBox="0 0 100 100">
          {presentArrows.map((arrow) => {
            const start = POS[arrow.cells[0]];
            const end = POS[arrow.cells[2]];
            return (
              <line
                key={arrow.key}
                stroke="rgba(251,191,36,0.72)"
                strokeLinecap="round"
                strokeWidth="2.4"
                x1={start.x}
                x2={end.x}
                y1={start.y}
                y2={end.y}
              />
            );
          })}
        </svg>
        <div className="grid grid-cols-3 gap-2">
          {GRID.map((num) => {
            const count = combinedCells[num] ?? 0;
            const isIsolated = isolated.includes(num);
            const isCompensated = compensated.includes(num);
            return (
              <div
                className={[
                  "relative z-20 flex aspect-square flex-col items-center justify-center rounded-lg border text-lg font-bold",
                  count
                    ? "border-[var(--bm-border-gold)] bg-[rgba(251,191,36,0.08)] text-[var(--bm-gold-bright)]"
                    : "border-dashed border-[var(--bm-border-subtle)] text-[var(--bm-text-muted)]",
                  isCompensated ? "shadow-[0_0_0_2px_rgba(167,139,250,0.55)]" : "",
                  isIsolated ? "border-dotted border-red-300" : "",
                ].join(" ")}
                key={num}
              >
                {isIsolated ? <span className="absolute right-1 top-1 text-xs">!</span> : null}
                <span>{value(num, count)}</span>
                {count ? (
                  <span className="mt-1 text-[10px] font-medium text-[var(--bm-text-muted)]">
                    {dobCells[num] ?? 0}/{nameCells[num] ?? 0}
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-5 grid gap-3 text-sm text-[var(--bm-text-soft)]">
        <p>
          <strong className="text-[var(--bm-text-main)]">Mũi tên hiện diện:</strong>{" "}
          {presentArrows.length ? presentArrows.map((arrow) => arrow.name).join("; ") : "Chưa có mũi tên đủ 3 số."}
        </p>
        <p>
          <strong className="text-[var(--bm-text-main)]">Số lẻ loi:</strong>{" "}
          {isolated.length ? isolated.join(", ") : "Không có số lẻ loi nổi bật."}
        </p>
        <p>
          <strong className="text-[var(--bm-text-main)]">Số được tên bù:</strong>{" "}
          {compensated.length ? compensated.join(", ") : "Không có số bù rõ rệt từ tên."}
        </p>
      </div>
    </div>
  );
}
