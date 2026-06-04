"use client";

import { useCallback, useEffect, useState } from "react";
import type { Phase } from "@banmenh/shared";

type FloatingReportNavProps = {
  phases: Phase[];
};

const PHASE_COLORS: Record<string, string> = {
  A: "linear-gradient(135deg, #ca8a04, #fde047)",
  B: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
  C: "linear-gradient(135deg, #7c3aed, #a78bfa)",
  D: "linear-gradient(135deg, #065f46, #10b981)",
};

export function FloatingReportNav({ phases }: FloatingReportNavProps) {
  const [tocOpen, setTocOpen] = useState(false);
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!tocOpen) return;

    const closeOnOutsideClick = (event: MouseEvent) => {
      const root = document.getElementById("bm-fab-group");
      if (root && !root.contains(event.target as Node)) setTocOpen(false);
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, [tocOpen]);

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTocOpen(false);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="bm-fab-group" id="bm-fab-group">
      {tocOpen ? (
        <div aria-label="Mục lục báo cáo" className="bm-toc-popup" role="dialog">
          <div className="bm-toc-popup-head">Mục lục</div>
          {phases.map((phase) => (
            <div key={phase.letter}>
              <button
                aria-expanded={expandedPhase === phase.letter}
                className="bm-toc-phase-btn"
                onClick={() => setExpandedPhase((value) => (value === phase.letter ? null : phase.letter))}
                type="button"
              >
                <span className="bm-toc-phase-title">
                  <span
                    className="bm-toc-phase-letter"
                    style={{ background: PHASE_COLORS[phase.letter] ?? "var(--bm-primary)" }}
                  >
                    {phase.letter}
                  </span>
                  <span>{phase.title}</span>
                </span>
                <svg
                  className={`bm-toc-chevron ${expandedPhase === phase.letter ? "bm-toc-chevron-open" : ""}`}
                  fill="none"
                  viewBox="0 0 16 16"
                >
                  <path d="M4 6l4 4 4-4" />
                </svg>
              </button>

              {expandedPhase === phase.letter ? (
                <div className="bm-toc-sections">
                  {phase.sections.map((section) => {
                    const targetId = section.id ?? section.number;
                    return (
                      <button
                        aria-label={`Mở mục ${section.number}. ${section.title}`}
                        className="bm-toc-section-btn"
                        key={targetId}
                        onClick={() => scrollToSection(targetId)}
                        type="button"
                      >
                        <span className="bm-toc-section-num">{section.number}</span>
                        <span>{section.title}</span>
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}

      <button
        aria-label="Mục lục"
        className={`bm-fab ${tocOpen ? "bm-fab-active" : ""}`}
        onClick={() => setTocOpen((value) => !value)}
        title="Mục lục"
        type="button"
      >
        <svg fill="none" viewBox="0 0 18 18">
          <line x1="2" x2="16" y1="4.5" y2="4.5" />
          <line x1="2" x2="16" y1="9" y2="9" />
          <line x1="2" x2="16" y1="13.5" y2="13.5" />
        </svg>
      </button>

      <button
        aria-label="Về đầu trang"
        className="bm-fab"
        data-visible={showScrollTop}
        onClick={scrollToTop}
        title="Về đầu trang"
        type="button"
      >
        <svg fill="none" viewBox="0 0 18 18">
          <path d="M9 14V4M4 9l5-5 5 5" />
        </svg>
      </button>
    </div>
  );
}
