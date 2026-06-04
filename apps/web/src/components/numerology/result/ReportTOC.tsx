"use client";

import { useEffect, useState } from "react";
import type { Phase } from "@banmenh/shared";

type ReportTOCProps = {
  phases: Phase[];
};

export function ReportTOC({ phases }: ReportTOCProps) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observers = new Map<string, IntersectionObserver>();
    for (const { id } of phases.flatMap((phase) => phase.sections)) {
      const el = document.getElementById(id);
      if (!el) continue;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) setActive(id);
        },
        { rootMargin: "-30% 0px -60% 0px" },
      );
      observer.observe(el);
      observers.set(id, observer);
    }

    return () => observers.forEach((observer) => observer.disconnect());
  }, [phases]);

  return (
    <nav aria-label="Mục lục báo cáo" className="bm-toc">
      {phases.map((phase) => (
        <div className="bm-toc-phase" key={phase.letter}>
          <div className={`bm-toc-phase-label bm-toc-phase-${phase.letter}`}>PHẦN {phase.letter}</div>
          {phase.sections.map((section) => (
            <a
              className={`bm-toc-item ${active === section.id ? "bm-toc-item-active" : ""}`}
              href={`#${section.id}`}
              key={section.id}
            >
              <span className="bm-toc-num">{section.number}</span>
              <span className="bm-toc-title">{section.title}</span>
            </a>
          ))}
        </div>
      ))}
    </nav>
  );
}
