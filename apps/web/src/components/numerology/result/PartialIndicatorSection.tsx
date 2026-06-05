import type { IndicatorResult } from "@banmenh/shared";
import { Card } from "../../ui";
import type { NarrativeIndicator } from "./FreeIndicatorSection";
import { scrollToUnlockCTA } from "./scrollToUnlock";

type PartialIndicatorSectionProps = {
  indicator: NarrativeIndicator;
  title: string;
  hint: string;
  themeBullets: string[];
};

function asRecord(data: unknown): Record<string, unknown> {
  return data && typeof data === "object" ? (data as Record<string, unknown>) : {};
}

function readTitle(data: Record<string, unknown>, fallback: string) {
  const value = data.title ?? data.theme;
  return typeof value === "string" && value.trim() ? value : fallback;
}

function readPreview(data: Record<string, unknown>, narrative?: string | null) {
  if (narrative) {
    return narrative.split(/<\/p>/i).filter(Boolean).slice(0, 2).map((item) => `${item}</p>`).join("");
  }
  const fields = ["description", "meaning", "theme", "lesson"];
  return fields
    .map((field) => data[field])
    .filter((value): value is string => typeof value === "string" && value.trim().length > 0)
    .slice(0, 2);
}

function chips(indicator: IndicatorResult) {
  return [indicator.isMaster ? "Master" : "", indicator.karmicDebt ? `Nợ nghiệp ${indicator.karmicDebt}` : ""].filter(Boolean);
}

export function PartialIndicatorSection({
  indicator,
  title,
  hint,
  themeBullets,
}: PartialIndicatorSectionProps) {
  const data = asRecord(indicator.data);
  const preview = readPreview(data, indicator.narrative);
  const visibleThemeBullets = themeBullets.filter((item) => item.trim()).slice(0, 3);

  return (
    <Card as="article" className="border-[var(--bm-border-purple)]" variant="glass" padding="lg">
      <div className="grid gap-7 lg:grid-cols-[160px_1fr]">
        <div className="flex flex-col items-center">
          <div className="flex size-28 items-center justify-center rounded-full border border-[var(--bm-border-purple)] bg-[image:var(--bm-gradient-primary-blue)] shadow-[var(--bm-shadow-purple)]">
            <span className="text-5xl font-bold text-[var(--bm-text-main)]">{indicator.number}</span>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {chips(indicator).map((chip) => (
              <span key={chip} className="rounded-full border border-[var(--bm-border-purple)] px-3 py-1 text-xs font-bold text-[var(--bm-primary-soft)]">
                {chip}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--bm-primary-soft)]">{title}</p>
          <h2 className="mt-3 text-gradient-purple">{readTitle(data, title)}</h2>
          <p className="mt-3 italic text-[var(--bm-text-soft)]">{hint}</p>
          {visibleThemeBullets.length > 0 ? (
            <div className="mt-6 rounded-xl border border-[var(--bm-border-subtle)] bg-[var(--bm-bg-glass)] p-4">
              <h4 className="text-base">Chủ đề chính:</h4>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--bm-text-soft)]">
                {visibleThemeBullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {Array.isArray(preview) ? (
            <div className="mt-6 space-y-3">{preview.map((item) => <p key={item}>{item}</p>)}</div>
          ) : (
            <div className="nar-container mt-6" dangerouslySetInnerHTML={{ __html: preview }} />
          )}
          <button
            type="button"
            onClick={scrollToUnlockCTA}
            className="mt-6 w-full cursor-pointer rounded-xl border border-[var(--bm-border-purple)] bg-[rgba(2,6,23,0.45)] p-4 text-center text-sm font-bold text-[var(--bm-primary-soft)] transition hover:-translate-y-0.5 hover:shadow-[var(--bm-shadow-purple)]"
          >
            🔒 Xem chi tiết đầy đủ — Mở khóa
          </button>
        </div>
      </div>
    </Card>
  );
}
