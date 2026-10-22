"use client";

import { useMemo, useState } from "react";
import { TarotComboLibrary } from "./tarot-combo-library";
import { DECK, type DeckCard } from "./tarot-data";
import { tarotCardImageSrc } from "./tarot-kb";

type CardGroup = "all" | "major" | "wands" | "cups" | "swords" | "pentacles";
type MeaningOrientation = "upright" | "reversed";

const FILTERS: Array<{ key: CardGroup; label: string; count: number }> = [
  { key: "all", label: "Tất cả", count: 78 },
  { key: "major", label: "Ẩn chính", count: 22 },
  { key: "wands", label: "Bộ Gậy", count: 14 },
  { key: "cups", label: "Bộ Ly", count: 14 },
  { key: "swords", label: "Bộ Kiếm", count: 14 },
  { key: "pentacles", label: "Bộ Tiền", count: 14 },
];

const GROUP_META: Record<Exclude<CardGroup, "all">, { label: string; element?: string; focus: string }> = {
  major: { label: "Ẩn chính", focus: "Những bài học, bước ngoặt và nguyên mẫu lớn" },
  wands: { label: "Bộ Gậy", element: "Lửa", focus: "Động lực, sáng tạo và hành động" },
  cups: { label: "Bộ Ly", element: "Nước", focus: "Cảm xúc, trực giác và kết nối" },
  swords: { label: "Bộ Kiếm", element: "Khí", focus: "Tư duy, giao tiếp và quyết định" },
  pentacles: { label: "Bộ Tiền", element: "Đất", focus: "Nền tảng, nguồn lực và đời sống thực tế" },
};

function cardGroup(card: DeckCard): Exclude<CardGroup, "all"> {
  if (card.id < 22) return "major";
  if (card.id < 36) return "wands";
  if (card.id < 50) return "cups";
  if (card.id < 64) return "swords";
  return "pentacles";
}

function normalizeSearch(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
}

export function TarotDictionary() {
  const [activeTab, setActiveTab] = useState<"cards" | "combos">("cards");
  const [filter, setFilter] = useState<CardGroup>("all");
  const [query, setQuery] = useState("");
  const [selectedCard, setSelectedCard] = useState<DeckCard | null>(null);
  const [orientation, setOrientation] = useState<MeaningOrientation>("upright");

  const filteredCards = useMemo(() => {
    const normalizedQuery = normalizeSearch(query);
    return DECK.filter((card) => {
      const matchesGroup = filter === "all" || cardGroup(card) === filter;
      const searchableName = normalizeSearch(`${card.nameVi} ${card.nameEn}`);
      return matchesGroup && (!normalizedQuery || searchableName.includes(normalizedQuery));
    });
  }, [filter, query]);

  function openCard(card: DeckCard) {
    setSelectedCard(card);
    setOrientation("upright");
  }

  if (selectedCard) {
    const group = GROUP_META[cardGroup(selectedCard)];
    return (
      <section aria-labelledby="tarot-card-detail-title" className="tarot-dictionary-detail">
        <button className="tarot-dictionary-back" onClick={() => setSelectedCard(null)} type="button">
          <span aria-hidden="true">←</span> Trở về danh sách 78 lá
        </button>

        <div className="tarot-dictionary-detail-layout">
          <div className="tarot-dictionary-detail-visual">
            <div className="tarot-dictionary-detail-frame">
              <img
                alt={`Lá ${selectedCard.nameVi} - ${selectedCard.nameEn}`}
                decoding="async"
                height={525}
                src={tarotCardImageSrc(selectedCard)}
                width={300}
              />
            </div>
            <div className="tarot-dictionary-energy" aria-label="Thông tin năng lượng">
              <span>{group.label}</span>
              {group.element ? <span>Nguyên tố {group.element}</span> : null}
            </div>
          </div>

          <div className="tarot-dictionary-detail-copy">
            <p className="tarot-dictionary-eyebrow">{group.focus}</p>
            <h3 id="tarot-card-detail-title">{selectedCard.nameVi}</h3>
            <p className="tarot-dictionary-name-en">{selectedCard.nameEn}</p>
            <div className="tarot-dictionary-keywords" aria-label="Từ khóa chính">
              {selectedCard.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}
            </div>

            <div aria-label="Chọn chiều lá bài" className="tarot-dictionary-orientation" role="group">
              <button
                aria-pressed={orientation === "upright"}
                className={orientation === "upright" ? "is-active" : ""}
                onClick={() => setOrientation("upright")}
                type="button"
              >
                Ý nghĩa Xuôi
              </button>
              <button
                aria-pressed={orientation === "reversed"}
                className={orientation === "reversed" ? "is-active" : ""}
                onClick={() => setOrientation("reversed")}
                type="button"
              >
                Ý nghĩa Ngược
              </button>
            </div>

            <div className="tarot-dictionary-meaning" aria-live="polite">
              <p>{orientation === "upright" ? selectedCard.upright : selectedCard.reversed}</p>
            </div>

            <aside className="tarot-dictionary-advice">
              <p className="tarot-dictionary-advice-label">Lời khuyên hành động</p>
              <p>{selectedCard.advice}</p>
            </aside>
          </div>
        </div>
      </section>
    );
  }

  const tabs = (
    <div aria-label="Chọn nội dung Từ điển Tarot" className="tarot-dictionary-tabs" role="tablist">
      <button aria-controls="tarot-cards-panel" aria-selected={activeTab === "cards"} id="tarot-cards-tab" onClick={() => setActiveTab("cards")} role="tab" type="button">78 Lá Bài</button>
      <button aria-controls="tarot-combos-panel" aria-selected={activeTab === "combos"} id="tarot-combos-tab" onClick={() => setActiveTab("combos")} role="tab" type="button">Mật Mã Cộng Hưởng</button>
    </div>
  );

  if (activeTab === "combos") {
    return <div className="tarot-dictionary-shell">{tabs}<div aria-labelledby="tarot-combos-tab" id="tarot-combos-panel" role="tabpanel"><TarotComboLibrary /></div></div>;
  }

  return (
    <div className="tarot-dictionary-shell">
      {tabs}
      <section aria-labelledby="tarot-cards-tab" className="tarot-dictionary" id="tarot-cards-panel" role="tabpanel">
      <div className="tarot-dictionary-heading">
        <div>
          <p className="tarot-dictionary-eyebrow">Sách phép Tarot</p>
          <h2 id="tarot-dictionary-title">Từ điển 78 lá bài</h2>
        </div>
        <p>Tra cứu tên, từ khóa và hai chiều ý nghĩa của từng lá trong bộ bài.</p>
      </div>

      <label className="tarot-dictionary-search">
        <span>Tìm theo tên lá bài</span>
        <span className="tarot-dictionary-search-field">
          <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7" />
            <path d="m16 16 4 4" />
          </svg>
          <input
            autoComplete="off"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ví dụ: Kẻ Khờ hoặc The Fool"
            type="search"
            value={query}
          />
        </span>
      </label>

      <div aria-label="Lọc theo nhóm bài" className="tarot-dictionary-filters" role="group">
        {FILTERS.map((item) => (
          <button
            aria-pressed={filter === item.key}
            className={filter === item.key ? "is-active" : ""}
            key={item.key}
            onClick={() => setFilter(item.key)}
            type="button"
          >
            {item.label} <span>{item.count}</span>
          </button>
        ))}
      </div>

      <p aria-live="polite" className="tarot-dictionary-result-count">
        Hiển thị {filteredCards.length} lá bài
      </p>

      {filteredCards.length > 0 ? (
        <div className="tarot-dictionary-grid">
          {filteredCards.map((card) => (
            <button
              aria-label={`Xem chi tiết ${card.nameVi} - ${card.nameEn}`}
              className="tarot-dictionary-card"
              key={card.id}
              onClick={() => openCard(card)}
              type="button"
            >
              <span className="tarot-dictionary-card-image">
                <img
                  alt=""
                  decoding="async"
                  height={350}
                  loading="lazy"
                  src={tarotCardImageSrc(card)}
                  width={200}
                />
              </span>
              <span className="tarot-dictionary-card-copy">
                <strong>{card.nameVi}</strong>
                <span>{card.nameEn}</span>
                <small>{card.keywords.slice(0, 2).join(" · ")}</small>
              </span>
            </button>
          ))}
        </div>
      ) : (
        <div className="tarot-dictionary-empty" role="status">
          <strong>Chưa tìm thấy lá bài phù hợp.</strong>
          <span>Hãy thử tên khác hoặc chọn lại “Tất cả”.</span>
          <button onClick={() => { setQuery(""); setFilter("all"); }} type="button">Xóa bộ lọc</button>
        </div>
      )}
      </section>
    </div>
  );
}
