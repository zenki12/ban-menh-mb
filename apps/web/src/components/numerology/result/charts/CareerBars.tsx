"use client";

type CareerGroup = {
  key: string;
  label: string;
  pct: number;
};

type CareerBarsProps = {
  groups: CareerGroup[];
};

const fills = [
  "linear-gradient(90deg, #f7c948, #a855f7)",
  "linear-gradient(90deg, #d8b4fe, #f0b84a)",
  "linear-gradient(90deg, #8b5cf6, #f7c948)",
  "linear-gradient(90deg, #7c3aed, #d6a93a)",
  "linear-gradient(90deg, #6d28d9, #a7791f)",
];

export function CareerBars({ groups }: CareerBarsProps) {
  return (
    <div className="space-y-4 rounded-lg border border-white/10 bg-[#130f22]/80 p-4 sm:p-5">
      {groups.map((group, index) => (
        <div
          className="grid grid-cols-[minmax(0,1fr)_minmax(104px,42%)_3.5rem] items-center gap-3 text-sm sm:grid-cols-[18rem_minmax(160px,1fr)_3.5rem]"
          key={group.key}
        >
          <div className="min-w-0">
            <div className="font-semibold text-[#f5e8c7]">{group.label}</div>
            <div className="text-xs uppercase tracking-[0.08em] text-white/40">{group.key}</div>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full shadow-[0_0_16px_rgba(247,201,72,0.22)]"
              style={{ background: fills[index] ?? fills[fills.length - 1], width: `${group.pct}%` }}
            />
          </div>
          <div className="text-right font-semibold text-white/78">{group.pct}%</div>
        </div>
      ))}
    </div>
  );
}
