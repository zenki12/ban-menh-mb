import type { IndicatorResult } from "@banmenh/shared";
import { Card } from "../../ui";
import { ASPECT_CONFIG, readAspectText } from "./aspects";
import { stripHtml } from "./utils";

export type NarrativeIndicator = IndicatorResult & { narrative?: string | null };

type FreeIndicatorSectionProps = {
  indicator: NarrativeIndicator;
  title: string;
  hint: string;
};

function numberLabel(indicator: IndicatorResult) {
  const chips: string[] = [];
  if (indicator.isMaster) chips.push("Master");
  if (indicator.karmicDebt) chips.push(`Nợ nghiệp ${indicator.karmicDebt}`);
  return chips;
}

function asRecord(data: unknown): Record<string, unknown> {
  return data && typeof data === "object" ? (data as Record<string, unknown>) : {};
}

function readTitle(data: Record<string, unknown>, fallback: string) {
  const title = data.title;
  return typeof title === "string" && title.trim() ? title : fallback;
}

function readDescription(data: Record<string, unknown>) {
  for (const key of ["summary", "overview", "description", "meaning", "dynamic", "lesson", "mission", "growth_path"]) {
    const value = data[key];
    if (typeof value === "string" && value.trim().length > 20) return value;
  }
  return "";
}

function readNarrativeOverview(narrative?: string | null) {
  if (!narrative) return "";
  return narrative
    .split(/<\/p>/i)
    .map((item) => stripHtml(`${item}</p>`))
    .find((item) => item.length > 80) ?? "";
}

function readStringArray(data: Record<string, unknown>, key: string): string[] {
  const value = data[key];
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === "string");
  return [];
}

function readFamous(data: Record<string, unknown>) {
  const famous = data.famous;
  if (Array.isArray(famous)) return famous.filter((item): item is string => typeof item === "string");
  if (typeof famous === "string") return famous.split(",").map((item) => item.trim()).filter(Boolean);
  return [];
}

function readKeywords(data: Record<string, unknown>) {
  return readStringArray(data, "keywords");
}

export function FreeIndicatorSection({ indicator, title, hint }: FreeIndicatorSectionProps) {
  const data = asRecord(indicator.data);
  const displayNumber = indicator.displayNumber ?? indicator.number;
  const description = readDescription(data) || readNarrativeOverview(indicator.narrative);
  const aspects = ASPECT_CONFIG
    .map((aspect) => ({ ...aspect, text: readAspectText(data, aspect.fields) }))
    .filter((aspect) => aspect.text);
  const chips = numberLabel(indicator);
  const famous = readFamous(data);
  const positiveTraits = readStringArray(data, "positive_traits");
  const negativeTraits = readStringArray(data, "negative_traits");
  const keywords = readKeywords(data);

  return (
    <Card
      as="article"
      className="border-[var(--bm-border-gold)] shadow-[var(--bm-shadow-gold)]"
      variant="glass"
      padding="lg"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(180px,0.3fr)_1fr] lg:items-start">
        <div className="flex flex-col items-center">
          <div className="flex size-32 items-center justify-center rounded-full border border-[var(--bm-border-gold)] bg-[image:var(--bm-gradient-gold-text)] shadow-[var(--bm-shadow-gold)] sm:size-40">
            <span className="text-6xl font-bold text-[var(--bm-bg-void)] sm:text-7xl">
              {displayNumber}
            </span>
          </div>
          {chips.length > 0 ? (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-[var(--bm-border-gold)] px-3 py-1 text-xs font-bold text-[var(--bm-gold-bright)]"
                >
                  {chip}
                </span>
              ))}
            </div>
          ) : null}
          {keywords.length > 0 ? (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {keywords.map((kw) => (
                <span
                  key={kw}
                  className="rounded-full border border-[var(--bm-border-subtle)] bg-[var(--bm-bg-glass)] px-2 py-0.5 text-xs text-[var(--bm-text-soft)]"
                >
                  {kw}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--bm-primary-soft)]">
            {title}
          </p>
          <h2 className="mt-3 text-gradient-purple">{readTitle(data, title)}</h2>
          <p className="mt-3 italic text-[var(--bm-text-soft)]">{hint}</p>
          {description ? (
            <div className="mt-5 rounded-xl border border-[var(--bm-border-subtle)] bg-[rgba(2,6,23,0.35)] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--bm-gold-bright)]">
                Tổng quát
              </p>
              <p className="mt-2 text-[var(--bm-text-main)]">{description}</p>
            </div>
          ) : null}
          <div className="my-6 h-px bg-[var(--bm-border-subtle)]" />
          {indicator.narrative ? (
            <div className="nar-container" dangerouslySetInnerHTML={{ __html: indicator.narrative }} />
          ) : null}
          {aspects.length > 0 ? (
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {aspects.map((aspect) => (
                <Card key={aspect.title} as="section" variant="default" padding="md">
                  <div className="text-2xl" aria-hidden="true">
                    {aspect.icon}
                  </div>
                  <h4 className="mt-3 text-base font-bold">{aspect.title}</h4>
                  <p className="mt-2 text-sm">{aspect.text}</p>
                </Card>
              ))}
            </div>
          ) : null}
          {positiveTraits.length > 0 || negativeTraits.length > 0 ? (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {positiveTraits.length > 0 ? (
                <div>
                  <p className="text-sm font-bold text-[var(--bm-text-main)]">Điểm mạnh nổi bật</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {positiveTraits.map((trait) => (
                      <span
                        key={trait}
                        className="rounded-full border border-[var(--bm-border-gold)] bg-[var(--bm-bg-glass)] px-3 py-1 text-sm text-[var(--bm-gold-bright)]"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
              {negativeTraits.length > 0 ? (
                <div>
                  <p className="text-sm font-bold text-[var(--bm-text-main)]">Cần lưu ý</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {negativeTraits.map((trait) => (
                      <span
                        key={trait}
                        className="rounded-full border border-[var(--bm-border-subtle)] bg-[var(--bm-bg-glass)] px-3 py-1 text-sm text-[var(--bm-text-soft)]"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
          {famous.length > 0 ? (
            <div className="mt-6">
              <p className="text-sm font-bold text-[var(--bm-text-main)]">Người nổi tiếng cùng số</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {famous.map((name) => (
                  <span key={name} className="rounded-full bg-[var(--bm-bg-glass)] px-3 py-1 text-sm">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
