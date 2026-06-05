type Props = {
  sectionNumber: string;
  title: string;
  number?: number | string;
  kbTitle?: string;
  hint: string;
  wordCount?: string;
  onUnlock?: () => void;
};

export function LockedSectionCard({
  sectionNumber,
  title,
  number,
  kbTitle,
  hint,
  wordCount,
  onUnlock,
}: Props) {
  return (
    <article className="bm-locked-card">
      <header className="bm-locked-card-header">
        <span className="bm-locked-card-num">{sectionNumber}</span>
        <h3 className="bm-locked-card-title">{title}</h3>
        {number !== undefined ? <span className="bm-locked-card-badge">{number}</span> : null}
      </header>

      {kbTitle ? <p className="bm-locked-card-kbtitle">"{kbTitle}"</p> : null}

      <p className="bm-locked-card-hint">
        <span aria-hidden="true">✦</span> {hint}
      </p>

      <footer className="bm-locked-card-footer">
        <span className="bm-locked-card-meta">🔒 {wordCount ?? "Luận giải chi tiết"}</span>
        {onUnlock ? (
          <button
            aria-label={`Mở khóa ${title}`}
            className="bm-locked-card-button"
            onClick={onUnlock}
            type="button"
          >
            Mở khóa →
          </button>
        ) : null}
      </footer>
    </article>
  );
}
