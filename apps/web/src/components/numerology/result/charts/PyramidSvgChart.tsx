import { reduce, type DobParts, type PeriodIndicatorResult } from "@banmenh/shared";

type PyramidSvgChartProps = {
  peaks: PeriodIndicatorResult[];
  challenges: PeriodIndicatorResult[];
  dobParts: DobParts;
};

const R = 24;
const RC = 22;
const RB = 23;
const BLUE = "#1a52a8";
const PEAK_FILL = "#1e3a8a";
const CHALLENGE_FILL = "#64748b";
const LINE = "#2563eb";

function line(x1: number, y1: number, x2: number, y2: number, color = LINE, width = 1.8) {
  return <line stroke={color} strokeLinecap="round" strokeWidth={width} x1={x1} x2={x2} y1={y1} y2={y2} />;
}

function Node({
  cx,
  cy,
  fill,
  stroke,
  textColor,
  value,
  radius,
}: {
  cx: number;
  cy: number;
  fill: string;
  stroke: string;
  textColor: string;
  value: number | string | undefined;
  radius: number;
}) {
  return (
    <>
      <circle cx={cx} cy={cy} fill={fill} filter="url(#node-shadow)" r={radius} stroke={stroke} strokeWidth="2.5" />
      <text dominantBaseline="central" fill={textColor} fontSize="17" fontWeight="800" textAnchor="middle" x={cx} y={cy}>
        {value ?? "?"}
      </text>
    </>
  );
}

function PeriodLabel({
  x,
  y,
  period,
  side,
}: {
  x: number;
  y: number;
  period?: string;
  side: "left" | "right" | "above-right";
}) {
  if (!period) return null;
  const tx = side === "left" ? x - R - 8 : x + R + 8;
  const anchor = side === "left" ? "end" : "start";
  const ty = side === "above-right" ? y - 10 : y - 8;
  return (
    <text fill={BLUE} fontSize="11" fontWeight="700" textAnchor={anchor} x={tx} y={ty}>
      {period}
    </text>
  );
}

export function PyramidSvgChart({ peaks, challenges, dobParts }: PyramidSvgChartProps) {
  const baseMonth = reduce(dobParts.month, false);
  const baseDay = reduce(dobParts.day, false);
  const baseYear = reduce(dobParts.year, false);

  return (
    <div className="overflow-hidden rounded-lg border border-[var(--bm-border-subtle)] bg-[var(--bm-bg-glass)] p-4">
      <svg aria-label="Biểu đồ kim tự tháp" className="mx-auto block w-full max-w-[680px]" role="img" viewBox="0 0 700 600">
        <defs>
          <filter height="150%" id="node-shadow" width="150%" x="-25%" y="-25%">
            <feDropShadow dx="0" dy="3" floodColor="#1e3a8a" floodOpacity="0.18" stdDeviation="5" />
          </filter>
        </defs>
        <text fill={BLUE} fontSize="11" fontWeight="800" opacity="0.85" x="12" y="172">PHẦN</text>
        <text fill={BLUE} fontSize="11" fontWeight="800" opacity="0.85" x="12" y="187">ĐỈNH CAO</text>
        <text fill={CHALLENGE_FILL} fontSize="11" fontWeight="800" opacity="0.85" x="12" y="418">PHẦN</text>
        <text fill={CHALLENGE_FILL} fontSize="11" fontWeight="800" opacity="0.85" x="12" y="433">THỬ THÁCH</text>
        <line stroke={BLUE} strokeDasharray="6,5" strokeOpacity="0.2" strokeWidth="1" x1="58" x2="642" y1="300" y2="300" />
        {line(80, 300, 200, 200)}
        {line(350, 300, 200, 200)}
        {line(350, 300, 500, 200)}
        {line(620, 300, 500, 200)}
        {line(200, 200, 350, 120)}
        {line(500, 200, 350, 120)}
        {line(350, 120, 350, 68)}
        {line(80, 300, 200, 400, "#94a3b8", 1.5)}
        {line(350, 300, 200, 400, "#94a3b8", 1.5)}
        {line(350, 300, 500, 400, "#94a3b8", 1.5)}
        {line(620, 300, 500, 400, "#94a3b8", 1.5)}
        {line(200, 400, 350, 480, "#94a3b8", 1.5)}
        {line(500, 400, 350, 480, "#94a3b8", 1.5)}
        {line(350, 480, 350, 532, "#94a3b8", 1.5)}
        <PeriodLabel period={peaks[0]?.period} side="left" x={200} y={200} />
        <PeriodLabel period={peaks[1]?.period} side="right" x={500} y={200} />
        <PeriodLabel period={peaks[2]?.period} side="left" x={350} y={120} />
        <PeriodLabel period={peaks[3]?.period} side="above-right" x={350} y={45} />
        <Node cx={200} cy={200} fill={PEAK_FILL} radius={R} stroke="white" textColor="white" value={peaks[0]?.number} />
        <Node cx={500} cy={200} fill={PEAK_FILL} radius={R} stroke="white" textColor="white" value={peaks[1]?.number} />
        <Node cx={350} cy={120} fill={PEAK_FILL} radius={R} stroke="white" textColor="white" value={peaks[2]?.number} />
        <Node cx={350} cy={45} fill={PEAK_FILL} radius={R} stroke="white" textColor="white" value={peaks[3]?.number} />
        <Node cx={200} cy={400} fill="white" radius={RC} stroke={CHALLENGE_FILL} textColor={CHALLENGE_FILL} value={challenges[0]?.number} />
        <Node cx={500} cy={400} fill="white" radius={RC} stroke={CHALLENGE_FILL} textColor={CHALLENGE_FILL} value={challenges[1]?.number} />
        <Node cx={350} cy={480} fill="white" radius={RC} stroke={CHALLENGE_FILL} textColor={CHALLENGE_FILL} value={challenges[2]?.number} />
        <Node cx={350} cy={555} fill="white" radius={RC} stroke={CHALLENGE_FILL} textColor={CHALLENGE_FILL} value={challenges[3]?.number} />
        <Node cx={80} cy={300} fill="white" radius={RB} stroke={BLUE} textColor={BLUE} value={baseMonth} />
        <text fill={BLUE} fontSize="10" fontWeight="700" textAnchor="middle" x="80" y="338">Tháng {dobParts.month}</text>
        <Node cx={350} cy={300} fill="white" radius={RB} stroke={BLUE} textColor={BLUE} value={baseDay} />
        <text fill={BLUE} fontSize="10" fontWeight="700" textAnchor="middle" x="350" y="338">Ngày {dobParts.day}</text>
        <Node cx={620} cy={300} fill="white" radius={RB} stroke={BLUE} textColor={BLUE} value={baseYear} />
        <text fill={BLUE} fontSize="10" fontWeight="700" textAnchor="middle" x="620" y="338">{dobParts.year}</text>
      </svg>
    </div>
  );
}
