import { useState } from "react";
import { Button, Card } from "../../components/ui";
import type { ReadingSession } from "./tarot-data";

const MAX_CONTEXT_LENGTH = 1_000;

export function NicheConsciousnessCheckView({
  additionalContext,
  onAdditionalContextChange,
  onAnswer,
  prompts,
  session,
  step,
}: {
  additionalContext: string;
  onAdditionalContextChange: (value: string) => void;
  onAnswer: (answer: boolean) => void;
  prompts: readonly [string, string, string];
  session: ReadingSession;
  step: number;
}) {
  const [showContext, setShowContext] = useState(false);

  return (
    <section className="tarot-stage tarot-stage--consciousness tarot-fade-up">
      <div className="tarot-stage-shell tarot-stage-shell--centered">
        <div className="tarot-stage-reading-header tarot-stage-reading-header--compact">
          <p>{session.themeLabel} · Kết nối tâm thức</p>
          <h2>Hãy thành thật với điều đang diễn ra</h2>
          <span>Ba câu hỏi được chọn theo đúng ngách của bạn để phần luận giải bám sát hoàn cảnh thực tế.</span>
        </div>

        <Card className="tarot-consciousness-card" padding="lg" variant="glass">
          <div className="tarot-star" aria-hidden="true">
            <svg fill="none" height="32" viewBox="0 0 32 32" width="32">
              <path d="M16 2c1.2 8.3 5.7 12.8 14 14-8.3 1.2-12.8 5.7-14 14C14.8 21.7 10.3 17.2 2 16 10.3 14.8 14.8 10.3 16 2Z" fill="currentColor" />
            </svg>
          </div>
          <h1>Kết nối tâm thức</h1>
          <p>Vũ trụ cần bạn xác nhận ba điều để thông điệp được giải mã chính xác hơn.</p>
          <p className="tarot-consciousness-progress" aria-live="polite">Câu {step + 1} / 3</p>
          <div className="tarot-consciousness-question">{prompts[step]}</div>
          <div className="tarot-consciousness-actions">
            <Button onClick={() => onAnswer(true)} variant="secondary">CÓ</Button>
            <Button onClick={() => onAnswer(false)} variant="secondary">KHÔNG</Button>
          </div>
          <button
            aria-controls="tarot-additional-context"
            aria-expanded={showContext}
            className="tarot-link-button"
            onClick={() => setShowContext((current) => !current)}
            type="button"
          >
            CHIA SẺ THÊM THÔNG TIN
          </button>
          {showContext ? (
            <div className="tarot-consciousness-context">
              <label htmlFor="tarot-additional-context">Câu chuyện bạn muốn chia sẻ thêm (không bắt buộc)</label>
              <textarea
                autoFocus
                id="tarot-additional-context"
                maxLength={MAX_CONTEXT_LENGTH}
                onChange={(event) => onAdditionalContextChange(event.target.value)}
                placeholder="Bạn có thể kể ngắn gọn điều đang khiến mình băn khoăn..."
                rows={5}
                value={additionalContext}
              />
              <span>{additionalContext.length}/{MAX_CONTEXT_LENGTH}</span>
            </div>
          ) : null}
        </Card>
      </div>
    </section>
  );
}
