"use client";

import { useMemo, useState } from "react";
import type { Phase } from "@banmenh/shared";

type FloatingReportNavProps = {
  phases: Phase[];
};

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function FloatingReportNav({ phases }: FloatingReportNavProps) {
  const [open, setOpen] = useState(false);
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);
  const phaseSummaries = useMemo(
    () =>
      phases.map((phase) => ({
        firstNumber: phase.sections[0]?.number,
        key: phase.letter,
        sectionCount: phase.sections.length,
        title: phase.title,
      })),
    [phases],
  );

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open ? (
        <div className="max-h-[min(70vh,560px)] w-[min(86vw,360px)] overflow-y-auto rounded-2xl border border-[var(--bm-border-gold)] bg-[rgba(22,10,52,0.94)] p-3 shadow-[var(--bm-shadow-purple)] backdrop-blur-xl">
          <div className="mb-2 px-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--bm-gold-bright)]">
            Mục lục luận giải
          </div>
          <div className="grid gap-2">
            {phases.map((phase) => {
              const expanded = expandedPhase === phase.letter;
              const summary = phaseSummaries.find((item) => item.key === phase.letter);
              return (
                <div className="rounded-xl bg-white/[0.03]" key={phase.letter}>
                  <button
                    aria-expanded={expanded}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[var(--bm-text-main)] transition hover:bg-white/8"
                    onClick={() => setExpandedPhase(expanded ? null : phase.letter)}
                    type="button"
                  >
                    <span className="grid h-9 min-w-9 place-items-center rounded-lg bg-[var(--bm-bg-glass)] text-sm font-black text-[var(--bm-gold-bright)] ring-1 ring-[var(--bm-border-subtle)]">
                      {phase.letter}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold">{phase.title}</span>
                      <span className="block text-[11px] uppercase tracking-[0.14em] text-[var(--bm-text-muted)]">
                        {summary?.firstNumber ? `Từ mục ${summary.firstNumber}` : "Chưa có mục"} ·{" "}
                        {summary?.sectionCount ?? 0} mục
                      </span>
                    </span>
                    <span className="text-lg text-[var(--bm-gold-bright)]">{expanded ? "−" : "+"}</span>
                  </button>

                  {expanded ? (
                    <div className="grid gap-1 px-2 pb-2">
                      {phase.sections.map((section) => (
                        <button
                          aria-label={`Đi tới mục ${section.number}. ${section.title}`}
                          className="flex w-full items-start gap-3 rounded-lg px-3 py-2 text-left text-sm text-[var(--bm-text-soft)] transition hover:bg-white/8 hover:text-[var(--bm-text-main)]"
                          key={section.id}
                          onClick={() => {
                            setOpen(false);
                            scrollToId(section.id);
                          }}
                          type="button"
                        >
                          <span className="mt-0.5 min-w-8 text-xs font-black text-[var(--bm-gold-bright)]">
                            {section.number}
                          </span>
                          <span className="line-clamp-2 flex-1">{section.title}</span>
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      <div className="flex items-center gap-3">
        <button
          aria-expanded={open}
          aria-label="Mở mục lục luận giải"
          className="grid size-8 place-items-center rounded-full border border-[var(--bm-border-gold)] bg-[rgba(31,12,78,0.9)] text-base font-black text-[var(--bm-gold-bright)] shadow-[var(--bm-shadow-purple)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-[rgba(49,20,108,0.95)]"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          ☰
        </button>
        <button
          aria-label="Lên đầu trang"
          className="grid size-8 place-items-center rounded-full border border-[var(--bm-border-gold)] bg-[rgba(31,12,78,0.9)] text-base font-black text-[var(--bm-gold-bright)] shadow-[var(--bm-shadow-purple)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-[rgba(49,20,108,0.95)]"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          type="button"
        >
          ↑
        </button>
      </div>
    </div>
  );
}
