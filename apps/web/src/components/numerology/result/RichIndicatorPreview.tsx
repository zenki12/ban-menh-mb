import type { IndicatorResult } from "@banmenh/shared";

import { Card } from "../../ui";
import { readString, truncateText } from "./utils";

type FieldDef = {
  key: string;
  icon: string;
  label: string;
  maxChars?: number;
};

type Props = {
  label: string;
  title: string;
  indicator: IndicatorResult;
  numberOverride?: number;
  introField?: string[];
  introMaxChars?: number;
  shownFields: FieldDef[];
  positiveTraitsKey?: string;
  lockedAspects: string[];
};

function readStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string" && item.trim().length > 0) : [];
}

export function RichIndicatorPreview({
  label,
  title,
  indicator,
  numberOverride,
  introField = ["description", "meaning", "theme"],
  introMaxChars = 300,
  shownFields,
  positiveTraitsKey,
  lockedAspects,
}: Props) {
  const data = (indicator.data ?? {}) as Record<string, unknown>;
  const displayNum = numberOverride ?? indicator.number;
  const kbTitle = readString(data, ["title", "name"]);
  const intro = readString(data, introField);
  const traits = positiveTraitsKey ? readStringArray(data[positiveTraitsKey]) : [];
  const fieldsWithData = shownFields
    .map((field) => ({ ...field, value: readString(data, [field.key]) }))
    .filter((field): field is FieldDef & { value: string } => Boolean(field.value));

  return (
    <Card as="article" variant="glass" padding="lg">
      <p className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--bm-primary-soft)]">
        {label}
      </p>

      <h3 className="mt-3">
        {title} {displayNum}
        {kbTitle ? (
          <>
            <br />
            <span className="text-base font-medium italic text-[var(--bm-text-soft)]">"{kbTitle}"</span>
          </>
        ) : null}
      </h3>

      {intro ? <p className="mt-4 text-[var(--bm-text-soft)]">{truncateText(intro, introMaxChars)}</p> : null}

      {traits.length > 0 ? (
        <div className="mt-5">
          <p className="mb-2 text-sm font-bold text-[var(--bm-gold-bright)]">✓ Điểm mạnh nổi bật</p>
          <div className="flex flex-wrap gap-2">
            {traits.slice(0, 6).map((trait) => (
              <span className="bm-trait-chip" key={trait}>
                {trait}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {fieldsWithData.length > 0 ? (
        <div className="mt-5 space-y-3">
          {fieldsWithData.map((field, index) => (
            <div className="bm-preview-field" key={field.key}>
              <p className="text-sm font-bold text-[var(--bm-gold-bright)]">
                {field.icon} {field.label}
                <span className="ml-2 text-xs font-normal text-[var(--bm-text-muted)]">
                  (xem {index + 1}/{shownFields.length + lockedAspects.length} khía cạnh)
                </span>
              </p>
              <p className="mt-1 text-sm text-[var(--bm-text-soft)]">
                {truncateText(field.value, field.maxChars ?? 100)}
              </p>
            </div>
          ))}
        </div>
      ) : null}

      {lockedAspects.length > 0 ? (
        <div className="bm-locked-aspects">
          <hr className="my-4 border-[var(--bm-border-subtle)]" />
          <p className="text-sm font-bold text-[var(--bm-text-main)]">
            🔒 {lockedAspects.length} khía cạnh khác chưa mở khóa:
          </p>
          <ul className="mt-2 space-y-1">
            {lockedAspects.map((aspect) => (
              <li className="bm-locked-aspect-item" key={aspect}>
                <span className="text-[var(--bm-text-muted)]">•</span> {aspect}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Card>
  );
}
