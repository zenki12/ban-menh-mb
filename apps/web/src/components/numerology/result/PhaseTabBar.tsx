"use client";

import type { CSSProperties } from "react";

type PhaseTabBarProps = {
  phases: { letter: string; title: string }[];
};

const PHASE_COLORS: Record<string, string> = {
  A: "#ca8a04",
  B: "#1d4ed8",
  C: "#7c3aed",
  D: "#065f46",
};

export function PhaseTabBar({ phases }: PhaseTabBarProps) {
  const scrollToPhase = (letter: string) => {
    document.querySelector(`[data-phase="${letter}"]`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="bm-phase-tabs">
      {phases.map((phase) => (
        <button
          className="bm-phase-tab"
          key={phase.letter}
          onClick={() => scrollToPhase(phase.letter)}
          style={{ "--phase-color": PHASE_COLORS[phase.letter] ?? "#7c3aed" } as CSSProperties}
          type="button"
        >
          <span className="bm-phase-tab-letter">{phase.letter}</span>
          <span className="bm-phase-tab-name">{phase.title.split(" ")[0]}</span>
        </button>
      ))}
    </div>
  );
}
