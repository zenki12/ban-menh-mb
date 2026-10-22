"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Button } from "../../components/ui";
import { DECK, type ReadingSession } from "./tarot-data";
import { TAROT_CARD_BACK_SRC } from "./tarot-kb";

type RitualPhase = "idle" | "shuffling" | "fanned";

type FanCardStyle = CSSProperties & {
  "--fan-angle": string;
  "--fan-delay": string;
  "--fan-x": string;
  "--fan-y": string;
};

const sparkleIcon = (
  <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 24 24" width="18">
    <path d="M12 2l1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7L12 2Z" stroke="currentColor" strokeLinejoin="round" />
  </svg>
);

function fanCardStyle(index: number): FanCardStyle {
  const midpoint = (DECK.length - 1) / 2;
  const offset = index - midpoint;
  const normalized = Math.abs(offset) / midpoint;
  return {
    "--fan-angle": `${offset * 0.62}deg`,
    "--fan-delay": `${index * 8}ms`,
    "--fan-x": `${offset * 11.2}px`,
    "--fan-y": `${Math.pow(normalized, 2) * 54}px`,
    zIndex: index + 1,
  };
}

function CardBackImage({ className }: { className: string }) {
  return (
    <img
      alt=""
      className={className}
      decoding="async"
      height={1536}
      src={TAROT_CARD_BACK_SRC}
      width={1024}
    />
  );
}

export function TarotDeckRitual({
  onChoose,
  selectedIndexes,
  session,
}: {
  onChoose: (deckIndex: number) => void;
  selectedIndexes: number[];
  session: ReadingSession;
}) {
  const [phase, setPhase] = useState<RitualPhase>("idle");
  const timerRef = useRef<number | null>(null);
  const firstCardRef = useRef<HTMLButtonElement>(null);
  const selectedSet = new Set(selectedIndexes);

  useEffect(() => () => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    if (phase !== "fanned") return;
    const frame = window.requestAnimationFrame(() => firstCardRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [phase]);

  function beginShuffle() {
    if (phase !== "idle") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("fanned");
      return;
    }
    setPhase("shuffling");
    timerRef.current = window.setTimeout(() => setPhase("fanned"), 1_350);
  }

  const status = phase === "idle"
    ? "Bộ bài đang chờ bạn xào."
    : phase === "shuffling"
      ? "Đang xào và kết nối năng lượng của bộ bài."
      : `Bộ bài đã xòe. Bạn đã chọn ${selectedIndexes.length} trên ${session.cards.length} lá.`;

  return (
    <div className={`tarot-deck-ritual is-${phase}`}>
      <p aria-live="polite" className="tarot-deck-ritual-status">{status}</p>

      {phase === "idle" ? (
        <div className="tarot-deck-idle">
          <button aria-label="Xào bộ bài Tarot" className="tarot-deck-stack" onClick={beginShuffle} type="button">
            {Array.from({ length: 7 }, (_, index) => (
              <span className="tarot-deck-stack-layer" key={index} style={{ "--stack-depth": index } as CSSProperties} />
            ))}
            <CardBackImage className="tarot-deck-stack-image" />
            <span className="tarot-deck-stack-aura" />
          </button>
          <Button onClick={beginShuffle} rightIcon={sparkleIcon} size="lg">Xào Bài</Button>
          <span>Chạm vào cỗ bài hoặc nút bên trên để bắt đầu nghi thức.</span>
        </div>
      ) : null}

      {phase === "shuffling" ? (
        <div aria-hidden="true" className="tarot-shuffle-stage">
          <div className="tarot-shuffle-aura" />
          <div className="tarot-shuffle-packet is-left"><CardBackImage className="tarot-shuffle-image" /></div>
          <div className="tarot-shuffle-packet is-right"><CardBackImage className="tarot-shuffle-image" /></div>
        </div>
      ) : null}

      {phase === "fanned" ? (
        <>
          <div aria-label="Bộ bài Tarot đã xòe" className="tarot-card-fan" role="group">
            {DECK.map((card, index) => {
              const selectedOrder = selectedIndexes.indexOf(index);
              const selected = selectedSet.has(index);
              const unavailable = selectedIndexes.length >= session.cards.length && !selected;
              return (
                <button
                  aria-label={selected ? `Lá bài ${index + 1} đã được chọn ở vị trí ${selectedOrder + 1}` : `Chọn lá bài ${index + 1}`}
                  aria-pressed={selected}
                  className={`tarot-fan-card${selected ? " is-drawn" : ""}`}
                  disabled={selected || unavailable}
                  key={card.id}
                  onClick={() => onChoose(index)}
                  ref={index === 0 ? firstCardRef : undefined}
                  style={fanCardStyle(index)}
                  type="button"
                >
                  <CardBackImage className="tarot-fan-card-image" />
                </button>
              );
            })}
          </div>
          <p className="tarot-card-fan-hint">
            <span className="tarot-card-fan-hint-desktop">Di chuyển qua từng lá và chọn bằng trực giác.</span>
            <span className="tarot-card-fan-hint-mobile">Vuốt ngang để khám phá · Chạm để chọn lá.</span>
          </p>
        </>
      ) : null}

      <div aria-label="Khay bài đã chọn" className="tarot-drawn-tray">
        {session.cards.map((card, index) => {
          const filled = selectedIndexes[index] !== undefined;
          return (
            <div className={`tarot-drawn-slot${filled ? " is-filled" : ""}`} key={`${card.id}-${index}`}>
              {filled ? <CardBackImage className="tarot-drawn-slot-image" /> : <span aria-hidden="true" className="tarot-drawn-slot-placeholder" />}
              <span><strong>{card.position}</strong><small>{filled ? `Lá ${index + 1} đã chọn` : "Đang chờ"}</small></span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
