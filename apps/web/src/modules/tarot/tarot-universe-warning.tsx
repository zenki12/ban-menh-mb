import { Button } from "../../components/ui";
import { ModalShell } from "./tarot-ui";

export function TarotUniverseWarning({
  onBack,
  onContinue,
}: {
  onBack: () => void;
  onContinue: () => void;
}) {
  return (
    <ModalShell
      closeText=""
      label="Vũ Trụ Đã Lên Tiếng"
      onClose={onBack}
      panelClassName="tarot-universe-warning"
    >
      <div className="tarot-universe-warning__icon" aria-hidden="true">
        <svg fill="none" viewBox="0 0 64 64">
          <path d="M44.5 49.2A25 25 0 0 1 27.2 3.7a25 25 0 1 0 17.3 45.5Z" fill="currentColor" />
        </svg>
      </div>
      <p className="tarot-universe-warning__eyebrow">LỜI NHẮC TỪ VŨ TRỤ</p>
      <h2>Vũ Trụ Đã Lên Tiếng</h2>
      <p>
        Bạn đã trải bài chủ đề này hôm nay. Năng lượng tâm linh thường mang ý nghĩa sâu sắc nhất ở lần đầu tiên —
        việc hỏi lại có thể làm mờ đi thông điệp ban đầu.
      </p>
      <p className="tarot-universe-warning__question">Bạn có muốn tiếp tục dù vậy?</p>
      <div className="tarot-universe-warning__actions">
        <Button onClick={onBack} variant="secondary">Quay Lại</Button>
        <Button onClick={onContinue}>Tiếp Tục</Button>
      </div>
    </ModalShell>
  );
}
