"use client";

import {
  tarotComboLookupResponseSchema,
  type TarotMatchedCombo,
} from "@banmenh/shared";
import { useEffect, useState } from "react";
import { Card } from "../../components/ui";
import { fetchWithAuth } from "../../lib/api/client";
import type { ReadingSession } from "./tarot-data";
import { tarotCardImageSrc } from "./tarot-kb";

function comboRank(size: number): string {
  if (size >= 4) return "Đại Định Mệnh";
  if (size === 3) return "Định Mệnh";
  return "Năng Lượng Cộng Hưởng";
}

function splitTitle(title: string): { vi: string; en: string } {
  const match = title.match(/^(.+?)\s*\(([^()]*)\)\s*$/);
  return match ? { vi: match[1], en: match[2] } : { vi: title, en: "Destiny Resonance" };
}

function DestinySigil() {
  return (
    <svg aria-hidden="true" className="tarot-combo-sigil" viewBox="0 0 120 120">
      <circle cx="60" cy="60" fill="none" r="52" stroke="currentColor" strokeDasharray="4 5" />
      <circle cx="60" cy="60" fill="none" r="39" stroke="currentColor" />
      <path d="M60 15 99 83H21L60 15Zm0 90L21 37h78L60 105Z" fill="none" stroke="currentColor" />
      <circle cx="60" cy="60" fill="currentColor" r="4" />
      <circle cx="60" cy="21" fill="currentColor" r="2.5" />
      <circle cx="94" cy="80" fill="currentColor" r="2.5" />
      <circle cx="26" cy="80" fill="currentColor" r="2.5" />
    </svg>
  );
}

function ComboCard({ combo, testMode }: { combo: TarotMatchedCombo; testMode: boolean }) {
  const title = splitTitle(combo.title);
  return (
    <Card as="article" className="tarot-destiny-combo" padding="lg" variant="glass">
      <div className="tarot-combo-heading">
        <DestinySigil />
        <div>
          <p className="tarot-combo-eyebrow">Cộng Hưởng Định Mệnh</p>
          <p className="tarot-combo-rank">{comboRank(combo.size)}</p>
          <h3>{title.vi}</h3>
          <p className="tarot-combo-title-en">{title.en}</p>
          {testMode ? <span className="tarot-combo-test-badge">Chế độ kiểm thử</span> : null}
        </div>
      </div>

      <div aria-label="Các lá bài tạo nên cộng hưởng" className="tarot-combo-cards">
        {combo.cards.map((card, index) => (
          <div className="tarot-combo-card-group" key={`${combo.id}-${card.id}-${index}`}>
            {index > 0 ? <span aria-hidden="true" className="tarot-combo-plus">+</span> : null}
            <figure className="tarot-combo-card">
              <img
                alt={`${card.nameVi}, ${card.orientation === "upright" ? "Xuôi" : "Ngược"}`}
                className={card.orientation === "reversed" ? "is-reversed" : ""}
                loading="lazy"
                src={tarotCardImageSrc(card)}
              />
              <figcaption>
                <strong>{card.nameVi}</strong>
                <span>{card.orientation === "upright" ? "☯ Xuôi" : "↻ Ngược"}</span>
              </figcaption>
            </figure>
          </div>
        ))}
      </div>

      <div className="tarot-combo-reading">
        <span aria-hidden="true">✦</span>
        <p>{combo.text}</p>
      </div>
    </Card>
  );
}

export function TarotDestinyCombos({
  nicheKey,
  profileName,
  session,
}: {
  nicheKey: string;
  profileName: string;
  session: ReadingSession;
}) {
  const [combos, setCombos] = useState<TarotMatchedCombo[]>([]);
  const [testMode, setTestMode] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    void fetchWithAuth("/api/tarot/combo", {
      method: "POST",
      body: JSON.stringify({
        nicheKey,
        cards: session.cards.map((card) => ({
          id: card.id,
          nameEn: card.nameEn,
          nameVi: card.nameVi,
          orientation: card.orientation,
        })),
        testModeRequested: profileName.trim().toLowerCase() === "turniodev",
      }),
      signal: controller.signal,
    }).then((payload) => {
      const parsed = tarotComboLookupResponseSchema.safeParse(payload);
      if (parsed.success) {
        setCombos(parsed.data.combos);
        setTestMode(parsed.data.testMode);
      }
    }).catch(() => {
      // Cộng hưởng là nội dung bổ trợ; lỗi tra cứu không chặn bài luận giải chính.
    });
    return () => controller.abort();
  }, [nicheKey, profileName, session]);

  if (combos.length === 0) return null;
  return (
    <section aria-label="Cộng hưởng định mệnh" className="tarot-combo-list">
      {combos.map((combo) => <ComboCard combo={combo} key={combo.id} testMode={testMode} />)}
    </section>
  );
}
