"use client";

type PersonalityGroup = {
  num: number;
  label: string;
  color: string;
  raw: number;
};

type PersonalityBarsProps = {
  groups: PersonalityGroup[];
};

export function PersonalityBars({ groups }: PersonalityBarsProps) {
  return (
    <div className="space-y-3 rounded-lg border border-white/10 bg-[#130f22]/80 p-4 sm:p-5">
      {groups.map((group) => (
        <div
          className="grid grid-cols-[minmax(0,1fr)_minmax(104px,42%)_3.5rem] items-center gap-3 text-sm sm:grid-cols-[16rem_minmax(160px,1fr)_3.5rem]"
          key={group.num}
        >
          <div className="min-w-0">
            <div className="font-semibold text-[#f5e8c7]">Số {group.num}</div>
            <div className="break-words text-xs leading-snug text-white/58">{group.label}</div>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full shadow-[0_0_14px_rgba(255,255,255,0.18)]"
              style={{ backgroundColor: group.color, width: `${group.raw}%` }}
            />
          </div>
          <div className="text-right font-semibold text-white/78">{group.raw}%</div>
        </div>
      ))}
    </div>
  );
}
