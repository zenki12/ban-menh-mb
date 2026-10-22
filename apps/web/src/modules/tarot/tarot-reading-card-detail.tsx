"use client";

import {
  ERROR_MESSAGES,
  isAppError,
  type TarotCardDetail,
  type TarotCardDetailResponse,
} from "@banmenh/shared";
import { useEffect, useState, type ReactNode } from "react";
import { fetchWithAuth } from "../../lib/api/client";
import { getCardMessage, type DrawnCard } from "./tarot-data";
import { tarotCardImageSrc } from "./tarot-kb";
import { ModalShell } from "./tarot-ui";

const cardDetailCache = new Map<string, TarotCardDetail>();

type TarotReadingCardDetailProps = {
  card: DrawnCard;
  dob: string;
  fallbackAspectMeaning: string;
  name: string;
  nicheKey: string;
  nicheLabel: string;
  onClose: () => void;
  footer?: ReactNode;
};

function formatDob(dob: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dob);
  return match ? `${match[3]}/${match[2]}/${match[1]}` : "Ngày sinh chưa cung cấp";
}

function localFallback(card: DrawnCard, aspectMeaning: string): TarotCardDetail {
  return {
    id: card.id,
    nameEn: card.nameEn,
    nameVi: card.nameVi,
    number: "",
    orientation: card.orientation,
    element: "",
    planet: "",
    zodiac: "",
    numerology: "",
    keywords: card.keywords,
    meaning: getCardMessage(card),
    aspectMeaning: aspectMeaning || getCardMessage(card),
  };
}

export function TarotReadingCardDetail({
  card,
  dob,
  fallbackAspectMeaning,
  name,
  nicheKey,
  nicheLabel,
  onClose,
  footer,
}: TarotReadingCardDetailProps) {
  const cacheKey = `${card.id}:${card.orientation}:${nicheKey}`;
  const [detail, setDetail] = useState<TarotCardDetail>(() => cardDetailCache.get(cacheKey) ?? localFallback(card, fallbackAspectMeaning));
  const [loading, setLoading] = useState(!cardDetailCache.has(cacheKey));
  const [error, setError] = useState<string | null>(null);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const cached = cardDetailCache.get(cacheKey);
    if (cached) {
      setDetail(cached);
      setLoading(false);
      setError(null);
      return;
    }

    let active = true;
    setDetail(localFallback(card, fallbackAspectMeaning));
    setLoading(true);
    setError(null);
    const query = new URLSearchParams({
      niche: nicheKey,
      reversed: String(card.orientation === "reversed"),
    });
    void fetchWithAuth<TarotCardDetailResponse>(`/api/tarot/card/${card.id}?${query}`)
      .then((response) => {
        if (!active) return;
        cardDetailCache.set(cacheKey, response.card);
        setDetail(response.card);
      })
      .catch((reason: unknown) => {
        if (!active) return;
        setError(isAppError(reason) ? reason.message : ERROR_MESSAGES.KB_NOT_AVAILABLE);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [cacheKey, card, fallbackAspectMeaning, nicheKey, retry]);

  const orientationLabel = card.orientation === "upright" ? "Xuôi" : "Ngược";
  const displayName = name.trim() || "Bạn";
  const displayDob = formatDob(dob);
  const numberLine = detail.number ? `${detail.nameVi} | ${detail.number} | ☯ ${orientationLabel}` : `${detail.nameVi} | ☯ ${orientationLabel}`;
  const metadata = [
    detail.planet ? `Hành tinh: ${detail.planet}` : "",
    detail.zodiac ? `Cung: ${detail.zodiac}` : "",
    detail.element ? `Nguyên tố: ${detail.element}` : "",
    detail.numerology ? `${detail.number ? `Số ${detail.number} - ` : ""}${detail.numerology}` : "",
  ].filter(Boolean);

  return (
    <ModalShell
      closeText=""
      label={`Chi tiết lá ${card.nameVi}`}
      onClose={onClose}
      panelClassName="tarot-reading-detail-shell"
    >
      <header className="tarot-reading-detail-header">
        <p aria-label={`${displayName}, ${displayDob} · ${nicheLabel}`}>
          <span>{displayName}</span>
          <span aria-hidden="true" className="tarot-reading-detail-clock">
            <svg fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="8.75" />
              <path d="M12 7.5v4.9l3.1 1.85" />
            </svg>
          </span>
          <time dateTime={dob || undefined}>{displayDob}</time>
          <span aria-hidden="true" className="tarot-reading-detail-separator">·</span>
          <span>{nicheLabel}</span>
        </p>
      </header>

      <div aria-busy={loading} className="tarot-reading-detail-layout">
        <div className="tarot-reading-detail-visual">
          <div className="tarot-reading-detail-aura" aria-hidden="true" />
          <img
            alt={`${card.nameVi}, chiều ${orientationLabel.toLowerCase()}`}
            className={card.orientation === "reversed" ? "is-reversed" : undefined}
            decoding="async"
            height={525}
            src={tarotCardImageSrc(card)}
            width={300}
          />
        </div>

        <div className="tarot-reading-detail-copy">
          <p className="tarot-reading-detail-position">{card.position}</p>
          <h2>{detail.nameEn.toLocaleUpperCase("en-US")}</h2>
          <p className="tarot-reading-detail-name">{numberLine}</p>

          {metadata.length > 0 ? (
            <div aria-label="Thông tin chiêm tinh và thần số" className="tarot-reading-detail-metadata">
              {metadata.map((item) => <span key={item}>{item}</span>)}
            </div>
          ) : loading ? (
            <div aria-label="Đang tải thông tin chiêm tinh" className="tarot-reading-detail-metadata is-loading">
              <span /><span /><span />
            </div>
          ) : null}

          {error ? (
            <div className="tarot-reading-detail-error" role="status">
              <p>{error} Phần ý nghĩa an toàn từ phiên trải bài vẫn được hiển thị bên dưới.</p>
              <button onClick={() => setRetry((value) => value + 1)} type="button">Thử tải lại</button>
            </div>
          ) : null}

          <section className="tarot-reading-detail-section">
            <h3>Ý NGHĨA</h3>
            <p>{detail.meaning}</p>
          </section>

          <section className="tarot-reading-detail-section">
            <h3>TỪ KHÓA</h3>
            <div className="tarot-reading-detail-keywords">
              {detail.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}
            </div>
          </section>

          <section className="tarot-reading-detail-section tarot-reading-detail-aspect">
            <h3>TRONG {nicheLabel.toLocaleUpperCase("vi-VN")}</h3>
            <p>{detail.aspectMeaning}</p>
          </section>
        </div>
      </div>
      {footer ? <footer className="tarot-reading-detail-footer">{footer}</footer> : null}
    </ModalShell>
  );
}
