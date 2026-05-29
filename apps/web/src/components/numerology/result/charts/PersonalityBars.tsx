"use client";

import type { PersonalityChartGroup } from "@banmenh/shared";

type PersonalityBarsProps = {
  groups: PersonalityChartGroup[];
};

export function PersonalityBars({ groups }: PersonalityBarsProps) {
  return (
    <div className="grid gap-x-6 gap-y-4 rounded-lg border border-white/10 bg-[#130f22]/80 p-4 md:grid-cols-2 sm:p-5">
      {groups.map((group, index) => (
        <div className="rounded-lg border border-white/8 bg-white/[0.03] p-3" key={group.num}>
          <div className="flex items-center justify-between gap-3 text-sm">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <span
                aria-hidden="true"
                className="size-2 shrink-0 rounded-full"
                style={{ backgroundColor: group.color }}
              />
              <span className="min-w-0 truncate text-white/78">
                <strong className="text-[#f5e8c7]">{index + 1}.</strong> {group.label}
              </span>
            </div>
            <span className="shrink-0 font-bold text-[var(--bm-gold-bright)]">{group.raw}%</span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/8">
            <div
              className="h-full rounded-full shadow-[0_0_14px_rgba(255,255,255,0.18)]"
              style={{ backgroundColor: group.color, width: `${group.raw}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
