"use client";

type LinePoint = { year: number; value: number; isCurrent: boolean };

type LineChartVanSoProps = {
  data: LinePoint[];
};

const WIDTH = 720;
const HEIGHT = 260;
const PAD_X = 42;
const TOP = 34;
const BOTTOM = 58;

function pointToSvg(point: LinePoint, index: number, total: number) {
  const x = PAD_X + (index * (WIDTH - PAD_X * 2)) / Math.max(1, total - 1);
  const y = TOP + ((9 - point.value) * (HEIGHT - TOP - BOTTOM)) / 8;
  return { x, y };
}

export function LineChartVanSo({ data }: LineChartVanSoProps) {
  const points = data.map((point, index) => pointToSvg(point, index, data.length));
  const line = points.map((point) => `${point.x},${point.y}`).join(" ");

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-white/10 bg-[#130f22]/80 p-3 sm:p-5">
      <svg
        aria-label="Biểu đồ chu kỳ vận số"
        className="h-auto min-w-[620px] overflow-visible"
        role="img"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      >
        <defs>
          <linearGradient id="van-so-line" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#f7c948" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <filter id="van-so-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {[1, 3, 5, 7, 9].map((value) => {
          const y = TOP + ((9 - value) * (HEIGHT - TOP - BOTTOM)) / 8;
          return (
            <g key={value}>
              <line x1={PAD_X} x2={WIDTH - PAD_X} y1={y} y2={y} stroke="rgba(255,255,255,0.08)" />
              <text fill="rgba(255,255,255,0.48)" fontSize="12" x="10" y={y + 4}>
                {value}
              </text>
            </g>
          );
        })}
        <polyline fill="none" points={line} stroke="url(#van-so-line)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        {data.map((point, index) => {
          const svgPoint = points[index];
          return (
            <g key={point.year}>
              <text fill="#f5e8c7" fontSize="13" fontWeight="700" textAnchor="middle" x={svgPoint.x} y={svgPoint.y - 14}>
                {point.value}
              </text>
              <circle
                cx={svgPoint.x}
                cy={svgPoint.y}
                fill={point.isCurrent ? "#f7c948" : "#130f22"}
                filter={point.isCurrent ? "url(#van-so-glow)" : undefined}
                r={point.isCurrent ? 8 : 6}
                stroke={point.isCurrent ? "#fff7d6" : "#f7c948"}
                strokeWidth="3"
              />
              <text fill={point.isCurrent ? "#f7c948" : "rgba(255,255,255,0.62)"} fontSize="12" fontWeight={point.isCurrent ? "700" : "500"} textAnchor="middle" x={svgPoint.x} y={HEIGHT - 18}>
                {point.year}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
