import type React from "react";
import { Button, Card } from "../../components/ui";
import { getCardMessage, type DrawnCard, type Spread } from "./tarot-data";

export function RitualPulse() {
  return (
    <div className="relative grid size-64 place-items-center">
      <span className="tarot-ripple absolute left-1/2 top-1/2 size-64 rounded-full border border-[rgba(251,191,36,0.28)]" />
      <span
        className="tarot-ripple absolute left-1/2 top-1/2 size-52 rounded-full border border-[rgba(167,139,250,0.22)]"
        style={{ animationDelay: "0.55s" }}
      />
      <span
        className="tarot-ripple absolute left-1/2 top-1/2 size-40 rounded-full border border-[rgba(251,191,36,0.18)]"
        style={{ animationDelay: "1.1s" }}
      />
      <div className="tarot-heartbeat grid size-36 place-items-center rounded-full border border-[var(--bm-border-gold)] bg-[rgba(251,191,36,0.12)] text-6xl text-[var(--bm-gold-bright)] shadow-[0_0_60px_rgba(251,191,36,0.28)]">
        ✦
      </div>
    </div>
  );
}

export function ThemeOption({
  active,
  hint,
  label,
  onClick,
}: {
  active: boolean;
  hint: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-2xl border p-4 text-left transition",
        active
          ? "border-[var(--bm-border-gold)] bg-[rgba(251,191,36,0.11)] shadow-[0_0_28px_rgba(251,191,36,0.12)]"
          : "border-[var(--bm-border-subtle)] bg-[rgba(255,255,255,0.035)] hover:border-[var(--bm-border-purple)]",
      ].join(" ")}
    >
      <div className="font-black text-[var(--bm-text-main)]">{label}</div>
      <p className="mt-2 text-sm leading-6 text-[var(--bm-text-muted)]">{hint}</p>
    </button>
  );
}

export function SpreadOption({
  active,
  hint,
  label,
  value,
  onClick,
}: {
  active: boolean;
  hint: string;
  label: string;
  value: Spread;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-2xl border p-4 text-left transition",
        active
          ? "border-[var(--bm-border-gold)] bg-[rgba(251,191,36,0.11)]"
          : "border-[var(--bm-border-subtle)] bg-[rgba(255,255,255,0.035)] hover:border-[var(--bm-border-purple)]",
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-black text-[var(--bm-text-main)]">{label}</span>
        <span className="rounded-full border border-[var(--bm-border-gold)] px-3 py-1 text-xs font-black text-[var(--bm-gold-bright)]">
          {value}
        </span>
      </div>
      <p className="mt-2 text-sm leading-6 text-[var(--bm-text-muted)]">{hint}</p>
    </button>
  );
}

export function DeckBack({
  index,
  selected,
  disabled,
  onClick,
}: {
  index: number;
  selected: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  const rotate = (index % 13) - 6;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || selected}
      className={[
        "tarot-card-back group relative h-40 rounded-2xl border transition duration-500 sm:h-48",
        selected
          ? "pointer-events-none -translate-y-3 border-[var(--bm-border-gold)] opacity-35"
          : "border-[var(--bm-border-purple)] bg-[rgba(35,20,70,0.88)] hover:-translate-y-4 hover:border-[var(--bm-border-gold)] hover:shadow-[0_0_42px_rgba(251,191,36,0.22)]",
      ].join(" ")}
      style={{ transform: selected ? undefined : `rotate(${rotate}deg)` }}
      aria-label={`Chọn lá bài ${index + 1}`}
    >
      <span className="absolute inset-3 rounded-xl border border-[rgba(251,191,36,0.25)]" />
      <span className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[rgba(251,191,36,0.35)] text-3xl text-[var(--bm-gold-bright)]">
        ✦
      </span>
      <span className="absolute bottom-4 left-0 right-0 text-center text-xs font-black uppercase tracking-[0.2em] text-[var(--bm-text-muted)]">
        Tarot
      </span>
    </button>
  );
}

export function SelectedSlot({
  card,
  flipped,
  index,
  onFlip,
}: {
  card: DrawnCard;
  flipped: boolean;
  index: number;
  onFlip: () => void;
}) {
  return (
    <article className="tarot-fade-up">
      <div className="mb-3 text-center text-xs font-black uppercase tracking-[0.18em] text-[var(--bm-text-muted)]">
        {card.position}
      </div>
      <button
        type="button"
        onClick={onFlip}
        className={[
          "relative min-h-[280px] w-full overflow-hidden rounded-3xl border p-5 text-center transition duration-700",
          flipped
            ? "border-[var(--bm-border-gold)] bg-[rgba(25,16,38,0.94)] shadow-[0_0_44px_rgba(251,191,36,0.18)]"
            : "border-[var(--bm-border-purple)] bg-[rgba(35,20,70,0.88)] hover:-translate-y-1",
        ].join(" ")}
      >
        <div className="grid min-h-[134px] place-items-center rounded-2xl border border-[var(--bm-border-subtle)] bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.16),rgba(124,58,237,0.10),transparent_70%)]">
          <div
            className={[
              "grid size-24 place-items-center rounded-2xl border text-5xl transition duration-700",
              flipped
                ? "rotate-0 border-[var(--bm-border-gold)] bg-[rgba(251,191,36,0.12)] text-[var(--bm-gold-bright)]"
                : "-rotate-6 border-[var(--bm-border-subtle)] bg-[rgba(255,255,255,0.04)] text-[var(--bm-text-muted)]",
            ].join(" ")}
          >
            {flipped ? "✦" : "?"}
          </div>
        </div>
        {flipped ? (
          <>
            <h3 className="mt-5 text-2xl font-black text-[var(--bm-text-main)]">{card.nameVi}</h3>
            <p className="mt-1 text-sm text-[var(--bm-text-muted)]">{card.nameEn}</p>
            <p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-[var(--bm-gold-bright)]">
              {card.orientation === "upright" ? "Chiều xuôi" : "Chiều ngược"}
            </p>
          </>
        ) : (
          <p className="mt-5 text-sm leading-7 text-[var(--bm-text-soft)]">
            Chạm để lật lá số {index + 1}.
          </p>
        )}
      </button>
    </article>
  );
}

export function AnalysisCard({ card }: { card: DrawnCard }) {
  return (
    <Card as="article" padding="lg" variant="glass">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--bm-text-muted)]">
            {card.position}
          </p>
          <h3 className="mt-2 text-2xl font-black text-[var(--bm-text-main)]">{card.nameVi}</h3>
          <p className="mt-1 text-sm text-[var(--bm-text-muted)]">{card.nameEn}</p>
        </div>
        <span className="rounded-full border border-[var(--bm-border-gold)] px-3 py-1 text-xs font-black text-[var(--bm-gold-bright)]">
          {card.orientation === "upright" ? "Xuôi" : "Ngược"}
        </span>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {card.keywords.map((keyword) => (
          <span
            key={keyword}
            className="rounded-full border border-[var(--bm-border-purple)] bg-[rgba(124,58,237,0.11)] px-3 py-1 text-xs font-bold text-[var(--bm-primary-soft)]"
          >
            {keyword}
          </span>
        ))}
      </div>
      <p className="mt-5 leading-8 text-[var(--bm-text-soft)]">{getCardMessage(card)}</p>
      <p className="mt-4 rounded-2xl border border-[var(--bm-border-gold)] bg-[rgba(251,191,36,0.08)] p-4 text-sm leading-7 text-[var(--bm-text-soft)]">
        <strong className="text-[var(--bm-gold-bright)]">Gợi ý:</strong> {card.advice}
      </p>
    </Card>
  );
}

export function ModalShell({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[rgba(2,6,23,0.74)] px-4 py-6 backdrop-blur-md">
      <div className="w-full max-w-3xl rounded-[2rem] border border-[var(--bm-border-purple)] bg-[rgba(13,8,28,0.96)] p-5 shadow-[0_0_80px_rgba(124,58,237,0.26)] sm:p-7">
        <div className="mb-5 flex justify-end">
          <Button onClick={onClose} size="sm" variant="secondary">
            Đóng
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}
