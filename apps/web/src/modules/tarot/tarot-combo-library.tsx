"use client";

import {
  tarotComboLibraryResponseSchema,
  type TarotComboLibraryItem,
  type TarotComboLibraryResponse,
} from "@banmenh/shared";
import { useEffect, useMemo, useState } from "react";
import { fetchWithAuth } from "../../lib/api/client";
import { TarotComboDetailModal } from "./tarot-combo-detail-modal";
import { tarotCardImageSrc } from "./tarot-kb";

type ComboSize = "all" | "2" | "3" | "4" | "5";

const FILTERS: Array<{ key: ComboSize; label: string; count: number }> = [
  { key: "all", label: "Tất cả", count: 1544 },
  { key: "2", label: "Cộng Hưởng (2 lá)", count: 1195 },
  { key: "3", label: "Định Mệnh (3 lá)", count: 240 },
  { key: "4", label: "Dòng Dõi (4 lá)", count: 34 },
  { key: "5", label: "Đại Định Mệnh (5 lá)", count: 75 },
];

function comboRank(size: number): string {
  return FILTERS.find((item) => item.key === String(size))?.label.replace(/ \(.+\)$/, "") ?? "Cộng Hưởng";
}

function pageNumbers(current: number, total: number): number[] {
  const start = Math.max(1, Math.min(current - 2, total - 4));
  const end = Math.min(total, start + 4);
  return Array.from({ length: Math.max(0, end - start + 1) }, (_, index) => start + index);
}

function ComboTile({ combo, onOpen }: { combo: TarotComboLibraryItem; onOpen: () => void }) {
  return (
    <button aria-label={`Xem cộng hưởng đa chiều ${combo.title}`} className="tarot-combo-library-card" onClick={onOpen} type="button">
      <span className="tarot-combo-library-rank">{comboRank(combo.size)}</span>
      <strong>{combo.title}</strong>
      <span className="tarot-combo-library-images">
        {combo.cards.map((card, index) => (
          <span className="tarot-combo-library-image-group" key={`${combo.id}-${card.id}-${index}`}>
            {index > 0 ? <span aria-hidden="true">+</span> : null}
            <img alt="" height={112} loading="lazy" src={tarotCardImageSrc(card)} width={64} />
          </span>
        ))}
      </span>
      <span className="tarot-combo-library-equation">{combo.cards.map((card) => card.nameVi).join(" + ")}</span>
      <small>Xem cộng hưởng đa chiều</small>
    </button>
  );
}

export function TarotComboLibrary() {
  const [filter, setFilter] = useState<ComboSize>("all");
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<TarotComboLibraryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [requestKey, setRequestKey] = useState(0);
  const [selectedCombo, setSelectedCombo] = useState<TarotComboLibraryItem | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);
    const params = new URLSearchParams({ page: String(page), pageSize: "15", size: filter, q: debouncedQuery });
    void fetchWithAuth(`/api/tarot/combos?${params}`, { signal: controller.signal })
      .then((payload) => {
        const parsed = tarotComboLibraryResponseSchema.safeParse(payload);
        if (parsed.success) setData(parsed.data);
        else setError(true);
      })
      .catch(() => { if (!controller.signal.aborted) setError(true); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [debouncedQuery, filter, page, requestKey]);

  const pages = useMemo(() => pageNumbers(data?.page ?? 1, data?.totalPages ?? 0), [data]);

  if (selectedCombo) {
    return <TarotComboDetailModal combo={selectedCombo} onClose={() => setSelectedCombo(null)} />;
  }

  return (
    <section aria-labelledby="tarot-combo-library-title" className="tarot-combo-library">
      <div className="tarot-dictionary-heading">
        <div><p className="tarot-dictionary-eyebrow">Sách phép Tarot</p><h2 id="tarot-combo-library-title">Mật Mã Cộng Hưởng</h2></div>
        <p>Tra cứu 1.544 liên kết năng lượng từ 2 đến 5 lá và mở luận giải đa chiều theo từng lĩnh vực.</p>
      </div>

      <label className="tarot-dictionary-search">
        <span>Tìm theo tên combo hoặc tên lá bài</span>
        <span className="tarot-dictionary-search-field">
          <svg aria-hidden="true" fill="none" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="m16 16 4 4" /></svg>
          <input autoComplete="off" onChange={(event) => setQuery(event.target.value)} placeholder="Ví dụ: Karmic Bond hoặc The Lovers" type="search" value={query} />
        </span>
      </label>

      <div aria-label="Lọc theo số lá trong combo" className="tarot-dictionary-filters" role="group">
        {FILTERS.map((item) => (
          <button aria-pressed={filter === item.key} className={filter === item.key ? "is-active" : ""} key={item.key} onClick={() => { setFilter(item.key); setPage(1); }} type="button">
            {item.label} <span>{item.count}</span>
          </button>
        ))}
      </div>

      <p aria-live="polite" className="tarot-dictionary-result-count">
        {loading ? "Đang tải mật mã cộng hưởng…" : `Tìm thấy ${data?.total ?? 0} combo`}
      </p>

      {loading ? (
        <div aria-label="Đang tải danh sách combo" className="tarot-combo-library-grid tarot-combo-library-skeleton" role="status">
          {Array.from({ length: 6 }, (_, index) => <span key={index} />)}
        </div>
      ) : error ? (
        <div className="tarot-dictionary-empty" role="alert"><strong>Chưa thể tải thư viện cộng hưởng.</strong><span>Vui lòng kiểm tra kết nối và thử lại.</span><button onClick={() => setRequestKey((value) => value + 1)} type="button">Thử lại</button></div>
      ) : data && data.items.length > 0 ? (
        <>
          <div className="tarot-combo-library-grid">
            {data.items.map((combo) => <ComboTile combo={combo} key={combo.id} onOpen={() => setSelectedCombo(combo)} />)}
          </div>
          <nav aria-label="Phân trang mật mã cộng hưởng" className="tarot-combo-pagination">
            <button disabled={data.page <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))} type="button">Trước</button>
            <div>{pages.map((item) => <button aria-current={item === data.page ? "page" : undefined} key={item} onClick={() => setPage(item)} type="button">{item}</button>)}</div>
            <button disabled={data.page >= data.totalPages} onClick={() => setPage((value) => Math.min(data.totalPages, value + 1))} type="button">Sau</button>
            <span>Trang {data.page} / {data.totalPages}</span>
          </nav>
        </>
      ) : (
        <div className="tarot-dictionary-empty" role="status"><strong>Chưa tìm thấy mật mã phù hợp.</strong><span>Hãy thử tên lá khác hoặc chọn lại “Tất cả”.</span><button onClick={() => { setQuery(""); setFilter("all"); setPage(1); }} type="button">Xóa bộ lọc</button></div>
      )}

    </section>
  );
}
