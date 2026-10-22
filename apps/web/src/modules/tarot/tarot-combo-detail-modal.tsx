"use client";

import {
  tarotComboLibraryDetailResponseSchema,
  type TarotComboDomainReading,
  type TarotComboLibraryDetailResponse,
  type TarotComboLibraryItem,
} from "@banmenh/shared";
import { useEffect, useRef, useState } from "react";
import { fetchWithAuth } from "../../lib/api/client";
import { tarotCardImageSrc } from "./tarot-kb";

function comboRank(size: number): string {
  if (size === 5) return "Đại Định Mệnh";
  if (size === 4) return "Dòng Dõi";
  if (size === 3) return "Định Mệnh";
  return "Cộng Hưởng";
}

function splitTitle(title: string) {
  const match = title.match(/^(.+?)\s*\(([^()]*)\)\s*$/);
  return match ? { vi: match[1], en: match[2] } : { vi: title, en: "" };
}

function ComboImages({ combo, reversed = false }: { combo: TarotComboLibraryItem; reversed?: boolean }) {
  return (
    <div className="tarot-combo-modal-images">
      {combo.cards.map((card, index) => (
        <div className="tarot-combo-modal-card-group" key={`${card.id}-${reversed}-${index}`}>
          {index > 0 ? <span aria-hidden="true">+</span> : null}
          <figure>
            <img
              alt={`${card.nameVi}, ${reversed ? "Ngược" : "Xuôi"}`}
              className={reversed ? "is-reversed" : ""}
              height={210}
              loading="lazy"
              src={tarotCardImageSrc(card)}
              width={120}
            />
            <figcaption>{card.nameVi}</figcaption>
          </figure>
        </div>
      ))}
    </div>
  );
}

function NicheAccordion({ combo, domain }: { combo: TarotComboLibraryItem; domain: TarotComboDomainReading }) {
  const [openNiche, setOpenNiche] = useState<string | null>(null);
  return (
    <div className="tarot-combo-niche-list">
      {domain.niches.map((niche) => {
        const isOpen = openNiche === niche.key;
        const panelId = `combo-niche-${domain.key}-${niche.key}`;
        return (
          <div className="tarot-combo-niche" key={niche.key}>
            <button
              aria-controls={panelId}
              aria-expanded={isOpen}
              onClick={() => setOpenNiche(isOpen ? null : niche.key)}
              type="button"
            >
              <span>{niche.label}</span>
              <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m7 10 5 5 5-5" /></svg>
            </button>
            {isOpen ? (
              <div className="tarot-combo-niche-panel" id={panelId}>
                <article className="tarot-combo-orientation-block">
                  <header><span className="is-upright">Xuôi</span><strong>Năng lượng khai mở</strong></header>
                  <ComboImages combo={combo} />
                  <p>{niche.upright}</p>
                </article>
                <article className="tarot-combo-orientation-block">
                  <header><span className="is-reversed">Ngược</span><strong>Năng lượng thử thách</strong></header>
                  <ComboImages combo={combo} reversed />
                  <p>{niche.reversed}</p>
                </article>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function DetailContent({ detail }: { detail: TarotComboLibraryDetailResponse }) {
  const [openDomain, setOpenDomain] = useState<string | null>(null);
  const title = splitTitle(detail.combo.title);
  return (
    <>
      <header className="tarot-combo-modal-header">
        <p>Mật Mã Cộng Hưởng · {comboRank(detail.combo.size)}</p>
        <h2>{title.vi}</h2>
        {title.en ? <span>{title.en}</span> : null}
        <ComboImages combo={detail.combo} />
        <strong className="tarot-combo-equation">{detail.combo.cards.map((card) => card.nameVi).join(" × ")}</strong>
      </header>

      <section aria-label="Cộng hưởng đa chiều" className="tarot-combo-domains">
        <div className="tarot-combo-domains-heading">
          <p>Cộng Hưởng Đa Chiều</p>
          <span>Chọn lĩnh vực, sau đó mở ngách bạn muốn chiêm nghiệm.</span>
        </div>
        {detail.domains.map((domain) => {
          const isOpen = openDomain === domain.key;
          const panelId = `combo-domain-${domain.key}`;
          return (
            <div className="tarot-combo-domain" key={domain.key}>
              <button
                aria-controls={panelId}
                aria-expanded={isOpen}
                onClick={() => setOpenDomain(isOpen ? null : domain.key)}
                type="button"
              >
                <span><strong>{domain.label}</strong><small>{domain.niches.length} ngách luận giải</small></span>
                <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m7 10 5 5 5-5" /></svg>
              </button>
              {isOpen ? <div id={panelId}><NicheAccordion combo={detail.combo} domain={domain} /></div> : null}
            </div>
          );
        })}
      </section>
      <p className="tarot-combo-modal-disclaimer">
        Nội dung mang tính chiêm nghiệm và định hướng tinh thần, không thay thế lời khuyên y tế, tài chính hay pháp lý.
      </p>
    </>
  );
}

export function TarotComboDetailModal({ combo, onClose }: { combo: TarotComboLibraryItem; onClose: () => void }) {
  const [detail, setDetail] = useState<TarotComboLibraryDetailResponse | null>(null);
  const [error, setError] = useState(false);
  const [requestKey, setRequestKey] = useState(0);
  const backButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => { backButtonRef.current?.focus(); }, []);

  useEffect(() => {
    const controller = new AbortController();
    setDetail(null);
    setError(false);
    void fetchWithAuth(`/api/tarot/combos/${encodeURIComponent(combo.id)}`, { signal: controller.signal })
      .then((payload) => {
        const parsed = tarotComboLibraryDetailResponseSchema.safeParse(payload);
        if (parsed.success) setDetail(parsed.data);
        else setError(true);
      })
      .catch(() => { if (!controller.signal.aborted) setError(true); });
    return () => controller.abort();
  }, [combo.id, requestKey]);

  return (
    <section aria-label={`Cộng hưởng đa chiều: ${combo.title}`} className="tarot-combo-detail-view">
      <button className="tarot-dictionary-back" onClick={onClose} ref={backButtonRef} type="button">
        <span aria-hidden="true">←</span> Trở về Mật Mã Cộng Hưởng
      </button>
      {detail ? <DetailContent detail={detail} /> : error ? (
        <div className="tarot-combo-modal-state" role="alert">
          <strong>Chưa thể mở nội dung cộng hưởng.</strong>
          <span>Vui lòng kiểm tra kết nối và thử lại.</span>
          <button onClick={() => setRequestKey((value) => value + 1)} type="button">Thử lại</button>
        </div>
      ) : (
        <div aria-label="Đang tải cộng hưởng đa chiều" className="tarot-combo-modal-loading" role="status">
          <span /><span /><span />
          <p>Đang mở mật mã cộng hưởng…</p>
        </div>
      )}
    </section>
  );
}
