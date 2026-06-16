import { Button, Card } from "../../components/ui";
import type { Spread, ThemeKey } from "./tarot-data";
import { SPREAD_OPTIONS, THEME_OPTIONS } from "./tarot-data";
import { RitualPulse, SpreadOption, ThemeOption } from "./tarot-ui";
import type { TarotModalKey } from "./tarot-workflow-stages";

export function LandingView({
  onBegin,
  onOpenModal,
  onStart,
  question,
  setQuestion,
  setSpread,
  setTheme,
  spread,
  theme,
}: {
  onBegin: () => void;
  onOpenModal: (modal: TarotModalKey) => void;
  onStart: () => void;
  question: string;
  setQuestion: (value: string) => void;
  setSpread: (value: Spread) => void;
  setTheme: (value: ThemeKey) => void;
  spread: Spread;
  theme: ThemeKey;
}) {
  return (
    <section className="tarot-landing tarot-fade-up">
      <div className="tarot-landing-grid">
        <div className="tarot-landing-copy">
          <div className="tarot-hero-pill">✦ Tarot · Trải bài cá nhân hóa · Chọn lá theo trực giác</div>
          <h1>
            Khám phá <span className="tarot-gradient">thông điệp Tarot</span> của bạn
          </h1>
          <p>
            Chọn lĩnh vực, đặt câu hỏi, chọn kiểu trải bài và tự tay rút từng lá. Mỗi bước được thiết kế như một nghi
            thức ngắn để bạn tập trung vào câu hỏi trước khi xem phần luận giải chi tiết.
          </p>

          <div className="tarot-landing-steps">
            {[
              "Chọn chủ đề và ngữ cảnh cần soi chiếu.",
              "Đặt câu hỏi theo gợi ý hoặc tự nhập.",
              "Rút bài, lật từng lá và nhận bản luận giải.",
            ].map((item, index) => (
              <div className="tarot-landing-step" key={item}>
                <span>{index + 1}</span>
                <strong>{item}</strong>
              </div>
            ))}
          </div>

          <div className="tarot-landing-actions">
            <Button onClick={() => onOpenModal("daily")} size="lg" variant="secondary">
              Thông điệp mỗi ngày
            </Button>
            <Button leftIcon={<span>✦</span>} onClick={onBegin} size="lg">
              Bắt đầu từng bước
            </Button>
          </div>

          <div className="tarot-landing-facts">
            <span>✓ 1 / 3 / 5 / 7 / 10 / 12 lá</span>
            <span>✓ Trải bài theo từng chủ đề</span>
            <span>✓ Lưu lịch sử trải bài</span>
          </div>
        </div>

        <Card className="tarot-landing-panel" padding="lg" variant="glass">
          <div className="tarot-landing-panel-glow" />
          <div className="tarot-landing-panel-inner">
            <div className="tarot-window-bar">
              <span />
              <span />
              <span />
              <strong>Bàn trải Tarot</strong>
            </div>

            <div className="tarot-landing-ritual">
              <RitualPulse />
              <div>
                <p className="tarot-landing-small-title">Chuẩn bị lượt trải</p>
                <h2>Chọn một điểm khởi đầu</h2>
                <p>Phần bên dưới chỉ định hướng ban đầu. Khi bấm bắt đầu, bạn vẫn sẽ đi qua đầy đủ các bước như workflow chính.</p>
              </div>
            </div>

            <div className="tarot-landing-panel-section">
              <label className="tarot-landing-label">Chủ đề quan tâm</label>
              <div className="tarot-landing-theme-grid">
                {THEME_OPTIONS.filter((item) => item.key !== "general").map((item) => (
                  <ThemeOption
                    active={item.key === theme}
                    hint={item.hint}
                    key={item.key}
                    label={item.label}
                    onClick={() => setTheme(item.key)}
                  />
                ))}
              </div>
            </div>

            <label className="tarot-landing-panel-section">
              <span className="tarot-landing-label">Câu hỏi của bạn</span>
              <textarea
                className="tarot-textarea tarot-landing-question"
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Ví dụ: Tôi nên nhìn tình huống hiện tại như thế nào?"
                value={question}
              />
            </label>

            <div className="tarot-landing-panel-section">
              <label className="tarot-landing-label">Kiểu trải bài</label>
              <div className="tarot-landing-spread-grid">
                {SPREAD_OPTIONS.slice(0, 3).map((item) => (
                  <SpreadOption
                    active={item.value === spread}
                    hint={item.hint}
                    key={item.value}
                    label={item.label}
                    onClick={() => setSpread(item.value)}
                    value={item.value}
                  />
                ))}
              </div>
            </div>

            <Button fullWidth onClick={onStart} size="lg">
              Bắt đầu trải bài
            </Button>

            <div className="tarot-landing-tools">
              {[
                ["Lịch sử", "history"],
                ["Từ điển", "dictionary"],
                ["Chủ đề", "topics"],
              ].map(([label, key]) => (
                <button key={key} onClick={() => onOpenModal(key as TarotModalKey)} type="button">
                  {label}
                </button>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
