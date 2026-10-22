"use client";

import { Button } from "../../components/ui";
import type { DailyCard } from "./tarot-data";
import { TAROT_CARD_BACK_SRC, tarotCardImageSrc } from "./tarot-kb";

export function TarotDailyCard({
  card,
  onBegin,
  onClose,
  onReveal,
  revealed,
}: {
  card: DailyCard;
  onBegin: () => void;
  onClose: () => void;
  onReveal: () => void;
  revealed: boolean;
}) {
  const orientationLabel = card.orientation === "upright" ? "Xuôi" : "Ngược";

  return (
    <section aria-labelledby="tarot-daily-title" className="tarot-daily">
      <header className="tarot-daily-heading">
        <p>Khoảnh khắc dành riêng cho hôm nay</p>
        <h2 id="tarot-daily-title">Thông điệp mỗi ngày</h2>
        <span>{revealed ? "Lá bài của bạn đã được mở" : "Hít thở chậm và chọn thời điểm bạn sẵn sàng"}</span>
      </header>

      <button
        aria-label={revealed ? `Lá ${card.nameVi}, chiều ${orientationLabel}` : "Chạm để mở thông điệp hôm nay"}
        aria-pressed={revealed}
        className={`tarot-daily-flip${revealed ? " is-revealed" : ""}`}
        disabled={revealed}
        onClick={onReveal}
        type="button"
      >
        <span className="tarot-daily-flip-inner">
          <span aria-hidden={revealed} className="tarot-daily-face tarot-daily-back">
            <img
              alt=""
              className="tarot-daily-back-image"
              decoding="async"
              height={1536}
              src={TAROT_CARD_BACK_SRC}
              width={1024}
            />
          </span>
          <span aria-hidden={!revealed} className="tarot-daily-face tarot-daily-front">
            <img
              alt=""
              className={card.orientation === "reversed" ? "is-reversed" : ""}
              decoding="async"
              height={525}
              src={tarotCardImageSrc(card)}
              width={300}
            />
          </span>
        </span>
      </button>

      {!revealed ? (
        <button className="tarot-daily-reveal-hint" onClick={onReveal} type="button">
          Chạm để mở thông điệp hôm nay
        </button>
      ) : (
        <div aria-live="polite" className="tarot-daily-revelation">
          <div className="tarot-daily-card-identity">
            <p>{orientationLabel}</p>
            <h3>{card.nameVi}</h3>
            <span>{card.nameEn}</span>
          </div>

          <div className="tarot-daily-message">
            <p>{card.body}</p>
          </div>

          <aside className="tarot-daily-advice">
            <strong>Gợi ý cho 24 giờ tới</strong>
            <p>{card.advice}</p>
          </aside>

          <div className="tarot-daily-actions">
            <Button fullWidth onClick={onBegin} size="lg">
              Trải bài sâu hơn ngay <span aria-hidden="true">✦</span>
            </Button>
            <Button fullWidth onClick={onClose} size="lg" variant="secondary">
              Đã nhận thông điệp
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
