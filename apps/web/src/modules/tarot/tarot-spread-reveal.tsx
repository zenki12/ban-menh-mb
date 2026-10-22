"use client";

import { useEffect, useState } from "react";
import { Button } from "../../components/ui";
import { getCardMessage, type ReadingSession } from "./tarot-data";
import { TarotReadingCardDetail } from "./tarot-reading-card-detail";
import { SelectedSlot } from "./tarot-ui";

type SpreadRevealViewProps = {
  flippedIndexes: number[];
  nicheKey: string;
  nicheLabel: string;
  onAnalysis: () => void;
  onFlip: (index: number) => void;
  profileDob: string;
  profileName: string;
  readyForAnalysis: boolean;
  session: ReadingSession;
};

const arrowLeft = (
  <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 24 24" width="18">
    <path d="m15 18-6-6 6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
  </svg>
);

const arrowRight = (
  <svg aria-hidden="true" fill="none" height="18" viewBox="0 0 24 24" width="18">
    <path d="m9 18 6-6-6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
  </svg>
);

export function SpreadRevealView({
  flippedIndexes,
  nicheKey,
  nicheLabel,
  onAnalysis,
  onFlip,
  profileDob,
  profileName,
  readyForAnalysis,
  session,
}: SpreadRevealViewProps) {
  const [pendingDetailIndex, setPendingDetailIndex] = useState<number | null>(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const revealedIndexes = session.cards
    .map((_, index) => index)
    .filter((index) => flippedIndexes.includes(index));
  const remainingCount = Math.max(0, session.cards.length - revealedIndexes.length);
  const selectedRevealedPosition = selectedCardIndex === null ? -1 : revealedIndexes.indexOf(selectedCardIndex);
  const previousIndex = selectedRevealedPosition > 0 ? revealedIndexes[selectedRevealedPosition - 1] : null;
  const nextIndex = selectedRevealedPosition >= 0 && selectedRevealedPosition < revealedIndexes.length - 1
    ? revealedIndexes[selectedRevealedPosition + 1]
    : null;
  const nextUnflippedIndex = session.cards.findIndex((_, index) => !flippedIndexes.includes(index));

  useEffect(() => {
    if (pendingDetailIndex === null) return undefined;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => {
      setSelectedCardIndex(pendingDetailIndex);
      setPendingDetailIndex(null);
    }, reducedMotion ? 0 : 620);
    return () => window.clearTimeout(timer);
  }, [pendingDetailIndex]);

  function handleFlip(index: number) {
    if (flippedIndexes.includes(index)) {
      setSelectedCardIndex(index);
      return;
    }
    onFlip(index);
    setPendingDetailIndex(index);
  }

  function closeAndFocusNextCard() {
    setSelectedCardIndex(null);
    if (nextUnflippedIndex < 0) return;
    window.requestAnimationFrame(() => {
      document.getElementById(`tarot-reveal-card-${nextUnflippedIndex}`)?.focus();
    });
  }

  return (
    <section className="tarot-stage tarot-stage--reveal tarot-fade-up">
      <div className="tarot-stage-shell tarot-stage-shell--wide">
        <div className="tarot-stage-reading-header">
          <p>{session.themeLabel} · {session.question}</p>
          <h2>Lật từng lá để mở thông điệp</h2>
          <span>Đọc xong mới sang bước kết nối tâm thức và tổng hợp luận giải.</span>
        </div>

        <div className={`tarot-reveal-grid tarot-reveal-grid--${session.cards.length}`}>
          {session.cards.map((card, index) => (
            <SelectedSlot
              card={card}
              flipped={flippedIndexes.includes(index)}
              index={index}
              key={`${card.id}-${index}`}
              onFlip={() => handleFlip(index)}
            />
          ))}
        </div>

        {readyForAnalysis ? (
          <div className="tarot-center-action">
            <Button onClick={onAnalysis} size="lg">Tiếp tục kết nối tâm thức</Button>
          </div>
        ) : null}
      </div>

      {selectedCardIndex !== null && session.cards[selectedCardIndex] ? (
        <TarotReadingCardDetail
          card={session.cards[selectedCardIndex]}
          dob={profileDob}
          fallbackAspectMeaning={getCardMessage(session.cards[selectedCardIndex])}
          footer={(
            <div className="tarot-reading-detail-progress">
              <p aria-live="polite" role="status">
                {remainingCount > 0
                  ? <>Bạn còn <strong>{remainingCount} lá chưa lật</strong> — đóng để lật tiếp.</>
                  : <><strong>Đã mở toàn bộ các lá</strong> — bắt đầu kết nối tâm thức.</>}
              </p>

              {revealedIndexes.length > 1 ? (
                <div aria-label="Điều hướng giữa các lá đã lật" className="tarot-reading-detail-carousel">
                  <Button
                    disabled={previousIndex === null}
                    leftIcon={arrowLeft}
                    onClick={() => previousIndex !== null && setSelectedCardIndex(previousIndex)}
                    size="sm"
                    variant="secondary"
                  >
                    Trước
                  </Button>
                  <span>{selectedRevealedPosition + 1} / {revealedIndexes.length} lá đã mở</span>
                  <Button
                    disabled={nextIndex === null}
                    onClick={() => nextIndex !== null && setSelectedCardIndex(nextIndex)}
                    rightIcon={arrowRight}
                    size="sm"
                    variant="secondary"
                  >
                    Sau
                  </Button>
                </div>
              ) : null}

              {remainingCount > 0 ? (
                <Button fullWidth onClick={closeAndFocusNextCard} rightIcon={arrowRight} size="lg">
                  Lật lá tiếp theo
                </Button>
              ) : (
                <Button fullWidth onClick={onAnalysis} rightIcon={arrowRight} size="lg">
                  Tiếp tục kết nối tâm thức
                </Button>
              )}
            </div>
          )}
          name={profileName}
          nicheKey={nicheKey}
          nicheLabel={nicheLabel}
          onClose={() => setSelectedCardIndex(null)}
        />
      ) : null}
    </section>
  );
}
