import type { NumerologyReport } from "@banmenh/shared";

import { LockedSectionCard } from "./LockedSectionCard";
import { LOCKED_PHASES, LOCKED_SECTIONS } from "./lockedSectionConfig";
import { PhaseDivider } from "./PhaseDivider";
import { readString } from "./utils";

type Props = {
  report: NumerologyReport;
  onUnlock: () => void;
};

export function LockedSectionsGrouped({ report, onUnlock }: Props) {
  return (
    <section className="bm-locked-sections">
      {LOCKED_PHASES.map((phase) => (
        <div className="bm-locked-phase-group" key={phase.letter}>
          <PhaseDivider letter={phase.letter} title={phase.title} />
          <div className="bm-locked-grid">
            {phase.sections.map((sectionNumber) => {
              const config = LOCKED_SECTIONS.find((item) => item.sectionNumber === sectionNumber);
              if (!config) return null;

              const indicator = config.getIndicator?.(report);
              const kbTitle = indicator?.data
                ? readString(indicator.data, config.kbTitleFields ?? ["title", "theme", "name"])
                : undefined;

              return (
                <LockedSectionCard
                  hint={config.hint}
                  kbTitle={kbTitle}
                  key={config.sectionNumber}
                  number={indicator?.number}
                  onUnlock={onUnlock}
                  sectionNumber={config.sectionNumber}
                  title={config.title}
                  wordCount={config.wordCount}
                />
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
