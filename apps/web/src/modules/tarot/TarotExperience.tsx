"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Card } from "../../components/ui";
import { useAuth } from "../../lib/auth";
import {
  MAJOR_NAMES,
  buildReadingSections,
  getDailyCard,
  MINI_MODALS,
  SAMPLE_QUESTIONS,
  STAGE_COPY,
  drawCards,
  getThemeLabel,
  type Phase,
  type ReadingSection,
  type ReadingSession,
  type Spread,
  type ThemeKey,
} from "./tarot-data";
import { LandingView } from "./tarot-landing";
import { ModalShell } from "./tarot-ui";
import {
  ConsciousnessCheckView,
  DeckDrawView,
  FieldSelectView,
  FinalReadingView,
  NicheSelectView,
  QuestionView,
  RitualLoadingView,
  SpreadRevealView,
  SpreadSelectView,
  type TarotModalKey,
  type TarotTopic,
} from "./tarot-workflow-stages";

type QuestionMode = "suggested" | "custom";

const TOPICS: TarotTopic[] = [
  {
    key: "love",
    icon: "❤",
    label: "Tình yêu",
    subtitle: "Quan hệ & cảm xúc",
    lead: "Chủ đề này đi vào cách hai người chạm vào nhau, cách giữ nhịp cảm xúc và những nút thắt đang cần được gọi tên.",
    niches: [
      { label: "Tình Yêu Tổng Quát", hint: "Bức tranh toàn cảnh tình cảm", kbKey: "love" },
      { label: "Người Yêu Cũ", hint: "Quá khứ và những gì còn đọng lại", kbKey: "ex" },
      { label: "Người Yêu Hiện Tại", hint: "Mối quan hệ đang diễn ra", kbKey: "current_love" },
      { label: "Mối Quan Hệ Mập Mờ", hint: "Chưa rõ ràng, cần định hướng", kbKey: "ambiguous" },
      { label: "Crush / Thầm Thích", hint: "Cảm xúc chưa nói thành lời", kbKey: "crush" },
      { label: "Người Yêu Tương Lai", hint: "Tình duyên phía trước", kbKey: "future_love" },
      { label: "Người Ấy", hint: "Đọc năng lượng một người cụ thể", kbKey: "someone" },
      { label: "Hôn Nhân", hint: "Chuyện kết hôn và hôn nhân", kbKey: "marriage" },
      { label: "Giải Quyết Xung Đột", hint: "Mâu thuẫn cần tháo gỡ", kbKey: "conflict" },
      { label: "Chia Tay & Hàn Gắn", hint: "Kết thúc hoặc làm lành", kbKey: "breakup" },
      { label: "Yêu Xa", hint: "Khoảng cách và kết nối", kbKey: "long_distance" },
      { label: "Người Thứ Ba / Ghen Tuông", hint: "Tình huống phức tạp ba người", kbKey: "jealousy" },
      { label: "Yêu Bản Thân", hint: "Mối quan hệ với chính mình", kbKey: "self_love" },
      { label: "Tìm Kiếm Tình Yêu", hint: "Cơ duyên chưa gặp", kbKey: "finding_love" },
      { label: "Mức Độ Hợp Nhau", hint: "Compatibility và tương đồng", kbKey: "compatibility" },
      { label: "Mối Quan Hệ Độc Hại", hint: "Nhận diện và thoát ra", kbKey: "toxic_relationship" },
      { label: "Tri Kỷ / Soulmate", hint: "Kết nối linh hồn sâu sắc", kbKey: "soulmate" },
      { label: "Gương Vỡ Lại Lành", hint: "Cơ hội hàn gắn sau đổ vỡ", kbKey: "reconciliation" },
      { label: "Người Thầm Thương", hint: "Người yêu bí mật", kbKey: "secret_admirer" },
      { label: "Tình Bạn / Tri Kỷ", hint: "Sự thấu hiểu và kết nối bạn bè", kbKey: "friendship" },
      { label: "Con Cái / Thai Kỳ", hint: "Dòng chảy gia đình, sinh sản", kbKey: "pregnancy" },
      { label: "Thị Phi / Đàm Tiếu", hint: "Chuyện thị phi xung quanh", kbKey: "gossip" },
      { label: "Gia Đình", hint: "Cách nói chuyện và nâng đỡ nhau", kbKey: "family" },
    ],
  },
  {
    key: "career",
    icon: "▲",
    label: "Sự nghiệp",
    subtitle: "Công việc & định hướng",
    lead: "Dành cho câu chuyện nghề nghiệp, môi trường làm việc, những ngã rẽ cần cân nhắc và nhịp phát triển tiếp theo.",
    niches: [
      { label: "Sự Nghiệp / Công Việc", hint: "Bức tranh toàn cảnh công việc", kbKey: "career" },
      { label: "Xin Việc Làm", hint: "Cơ hội và lựa chọn mới", kbKey: "job_search" },
      { label: "Thăng Tiến", hint: "Khả năng được ghi nhận", kbKey: "promotion" },
      { label: "Kinh Doanh", hint: "Quyết định và rủi ro", kbKey: "business" },
      { label: "Đồng Nghiệp / Cấp Trên", hint: "Quan hệ trong công việc", kbKey: "colleague" },
      { label: "Chuyển Nghề", hint: "Ngã rẽ sự nghiệp", kbKey: "career_change" },
      { label: "Freelance / Tự Do", hint: "Làm việc độc lập", kbKey: "freelance" },
      { label: "Phỏng Vấn", hint: "Chuẩn bị và kết quả phỏng vấn", kbKey: "interview" },
      { label: "Pháp Lý / Giấy Tờ", hint: "Thủ tục, hợp đồng, giấy tờ", kbKey: "legal" },
      { label: "Chuyển Chỗ / Xuất Ngoại", hint: "Di chuyển vì công việc", kbKey: "moving" },
      { label: "Kiệt Sức / Áp Lực", hint: "Burnout và quản lý năng lượng", kbKey: "burnout" },
      { label: "Khởi Nghiệp", hint: "Bắt đầu venture mới", kbKey: "startup" },
      { label: "Thị Phi Công Sở", hint: "Chuyện nội bộ, chính trị công sở", kbKey: "workplace_politics" },
      { label: "Nghề Tay Trái", hint: "Thu nhập và đam mê song song", kbKey: "side_hustle" },
    ],
  },
  {
    key: "finance",
    icon: "◆",
    label: "Tài chính",
    subtitle: "Tiền bạc & đầu tư",
    lead: "Một lớp nhìn rõ hơn vào dòng tiền, thói quen chi tiêu, cơ hội đầu tư và những áp lực tài chính đang hiện diện.",
    niches: [
      { label: "Tài Chính Tổng Quát", hint: "Bức tranh toàn cảnh tài chính", kbKey: "finance" },
      { label: "Đầu Tư", hint: "Cơ hội và cảnh báo", kbKey: "investment" },
      { label: "Nợ Nần / Vay Mượn", hint: "Áp lực tài chính", kbKey: "debt" },
      { label: "Tiết Kiệm / Tích Lũy", hint: "Xây dựng nền tảng vật chất", kbKey: "savings" },
      { label: "Lộc Tài / May Mắn", hint: "Vận may tài chính", kbKey: "luck_money" },
      { label: "Bất Động Sản", hint: "Nhà đất, tài sản cố định", kbKey: "real_estate" },
      { label: "Thua Lỗ / Khó Khăn", hint: "Vượt qua giai đoạn khó", kbKey: "financial_loss" },
      { label: "Vận May Bất Ngờ", hint: "Cơ hội tiền bạc không ngờ tới", kbKey: "sudden_wealth" },
    ],
  },
  {
    key: "health",
    icon: "✦",
    label: "Sức khỏe",
    subtitle: "Thể chất & tinh thần",
    lead: "Không thay thế chuyên môn y tế, nhưng giúp bạn quan sát nhịp sống, mức căng thẳng và dấu hiệu cần cân bằng lại.",
    niches: [
      { label: "Sức Khỏe Thể Chất", hint: "Tình trạng cơ thể hiện tại", kbKey: "health" },
      { label: "Sức Khỏe Tinh Thần", hint: "Tâm lý và cảm xúc", kbKey: "mental" },
      { label: "Năng Lượng / Chakra", hint: "Trạng thái năng lượng", kbKey: "energy" },
      { label: "Ăn Uống / Chăm Sóc", hint: "Thói quen sức khỏe", kbKey: "diet" },
      { label: "Thú Cưng", hint: "Sức khỏe và năng lượng thú cưng", kbKey: "pet" },
      { label: "Chữa Lành", hint: "Quá trình phục hồi", kbKey: "healing" },
      { label: "Căng Thẳng / Âu Lo", hint: "Áp lực tinh thần", kbKey: "stress" },
      { label: "Tổn Thương Quá Khứ", hint: "Vết thương cần được nhìn nhận", kbKey: "trauma" },
    ],
  },
  {
    key: "self",
    icon: "✧",
    label: "Bản thân",
    subtitle: "Học tập & phát triển",
    lead: "Dành cho những câu hỏi về bản sắc, tiềm năng, bài học cá nhân và quãng đường đang mở ra phía trước.",
    niches: [
      { label: "Học Tập", hint: "Kết quả và hướng học tập", kbKey: "study" },
      { label: "Du Học", hint: "Cơ hội học ở nước ngoài", kbKey: "study_abroad" },
      { label: "Định Hướng Bản Thân", hint: "Bản sắc và tiềm năng", kbKey: "self" },
      { label: "Sứ Mệnh / Mục Đích", hint: "Lý do tồn tại sâu sắc", kbKey: "purpose" },
      { label: "Bóng Tối Nội Tâm", hint: "Phần cần đối mặt trong mình", kbKey: "shadow_self" },
      { label: "Ra Quyết Định", hint: "Lựa chọn trước ngã rẽ", kbKey: "decision" },
      { label: "Du Lịch / Di Chuyển", hint: "Chuyến đi và dịch chuyển", kbKey: "travel" },
      { label: "Tâm Linh", hint: "Kết nối tâm linh và trực giác", kbKey: "spiritual" },
      { label: "Giải Mã Giấc Mơ", hint: "Ý nghĩa giấc mơ gần đây", kbKey: "dream" },
      { label: "Tiền Kiếp", hint: "Ký ức và bài học từ kiếp trước", kbKey: "past_life" },
      { label: "Nghiệp Quả / Karma", hint: "Nhân quả tuần hoàn", kbKey: "karma" },
      { label: "Tìm Đồ Thất Lạc", hint: "Manh mối và phương hướng", kbKey: "lost_item" },
      { label: "Thi Cử / Kiểm Tra", hint: "Kết quả bài thi", kbKey: "exams" },
      { label: "Học Bổng", hint: "Cơ hội vươn xa", kbKey: "scholarship" },
      { label: "Năng Khiếu / Đam Mê", hint: "Khám phá biệt tài", kbKey: "talent" },
      { label: "Thần Hộ Mệnh", hint: "Năng lượng bảo hộ xung quanh", kbKey: "spirit_guide" },
      { label: "Tổng Quát", hint: "Không giới hạn chủ đề cụ thể", kbKey: "general" },
    ],
  },
];

const ALL_TOPICS: TarotTopic[] = [
  ...TOPICS,
  {
    key: "general",
    icon: "···",
    label: "Xem Thêm",
    subtitle: "Tất cả chủ đề",
    lead: "Tổng hợp tất cả niche từ 5 lĩnh vực. Chọn nếu bạn đã có chủ đề cụ thể trong đầu.",
    niches: TOPICS.flatMap((t) => t.niches),
  },
];

const DEFAULT_QUESTION = "Tôi nên nhìn tình huống hiện tại như thế nào?";
const STAGE_SEQUENCE: Exclude<Phase, "landing">[] = [
  "fieldSelect",
  "nicheSelect",
  "question",
  "spreadSelect",
  "ritualLoading",
  "deckDraw",
  "spreadReveal",
  "consciousnessCheck",
  "finalReading",
];

export function TarotExperience() {
  const { user } = useAuth();
  const [phase, setPhase] = useState<Phase>("landing");
  const [modal, setModal] = useState<TarotModalKey>(null);
  const [theme, setTheme] = useState<ThemeKey>("love");
  const [niche, setNiche] = useState("Tổng quan");
  const [nicheQuery, setNicheQuery] = useState("");
  const [question, setQuestion] = useState("");
  const [questionMode, setQuestionMode] = useState<QuestionMode>("suggested");
  const [spread, setSpread] = useState<Spread>(3);
  const [session, setSession] = useState<ReadingSession | null>(null);
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [flippedIndexes, setFlippedIndexes] = useState<number[]>([]);
  const [consciousnessStep, setConsciousnessStep] = useState(0);

  const todayStr = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const dailyCard = useMemo(() => getDailyCard(todayStr), [todayStr]);
  const topic = useMemo(() => ALL_TOPICS.find((item) => item.key === theme) ?? ALL_TOPICS[0], [theme]);
  const readingSections = useMemo<ReadingSection[]>(() => (session ? buildReadingSections(session) : []), [session]);
  const filteredNiches = useMemo(() => {
    const haystack = nicheQuery.trim().toLowerCase();
    if (!haystack) return topic.niches;
    return topic.niches.filter((item) => `${item.label} ${item.hint}`.toLowerCase().includes(haystack));
  }, [nicheQuery, topic.niches]);
  const readyForAnalysis = Boolean(session && flippedIndexes.length >= session.cards.length);
  const stageIndex = phase === "landing" ? -1 : STAGE_SEQUENCE.indexOf(phase);
  const stage = phase === "landing" ? null : STAGE_COPY[phase];
  const displayName = user?.displayName?.trim() || "Bạn";
  const usesStageShell =
    phase === "fieldSelect" || phase === "nicheSelect" || phase === "question" || phase === "spreadSelect";

  useEffect(() => {
    if (phase !== "ritualLoading") return undefined;
    const timer = window.setTimeout(() => setPhase("deckDraw"), 1800);
    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    const seen = window.localStorage.getItem("tarot_daily_seen");
    if (seen !== todayStr) {
      setModal("daily");
    }
  }, [todayStr]);

  function finalizeSession() {
    const cleanQuestion = question.trim() || DEFAULT_QUESTION;
    setSession({ theme, themeLabel: getThemeLabel(theme), spread, question: cleanQuestion, cards: drawCards(spread) });
    setSelectedIndexes([]);
    setFlippedIndexes([]);
    setConsciousnessStep(0);
    setPhase("ritualLoading");
  }

  function chooseDeckCard(deckIndex: number) {
    if (!session || selectedIndexes.includes(deckIndex) || selectedIndexes.length >= session.cards.length) return;
    const next = [...selectedIndexes, deckIndex];
    setSelectedIndexes(next);
    if (next.length >= session.cards.length) window.setTimeout(() => setPhase("spreadReveal"), 520);
  }

  function reset() {
    setPhase("landing");
    setSession(null);
    setSelectedIndexes([]);
    setFlippedIndexes([]);
    setConsciousnessStep(0);
    setNiche("Tổng quan");
    setNicheQuery("");
  }

  function handleCloseModal() {
    if (modal === "daily") {
      window.localStorage.setItem("tarot_daily_seen", todayStr);
    }
    setModal(null);
  }

  return (
    <div className="relative overflow-hidden pb-12">
      {phase === "landing" ? (
        <LandingView
          onBegin={() => setPhase("fieldSelect")}
          onOpenModal={setModal}
          onQuickStart={() => setPhase("nicheSelect")}
          setTheme={setTheme}
          theme={theme}
        />
      ) : null}

      {usesStageShell ? (
        <StageShell
          onHome={reset}
          phase={phase}
          stageIndex={stageIndex}
          stage={stage}
          themeLabel={session?.themeLabel ?? getThemeLabel(theme)}
          niche={niche}
          question={session?.question ?? question}
          spread={session?.spread ?? spread}
          topHint={topic.lead}
          userName={displayName}
        >
          {phase === "fieldSelect" ? (
            <FieldSelectView activeTheme={theme} onAdvance={(nextTheme) => {
              setTheme(nextTheme);
              setNiche("Tổng quan");
              setPhase("nicheSelect");
            }} onSkip={() => setPhase("question")} topics={ALL_TOPICS} />
          ) : null}
          {phase === "nicheSelect" ? (
            <NicheSelectView
              query={nicheQuery}
              setQuery={setNicheQuery}
              niches={filteredNiches}
              onChoose={(value) => {
                setNiche(value);
                setQuestion(SAMPLE_QUESTIONS[0]);
                setPhase("question");
              }}
              topic={topic}
            />
          ) : null}
          {phase === "question" ? (
            <QuestionView
              onBack={() => setPhase("nicheSelect")}
              onContinue={() => setPhase("spreadSelect")}
              onSkip={() => {
                setQuestion(DEFAULT_QUESTION);
                setPhase("spreadSelect");
              }}
              onSelectQuestion={setQuestion}
              question={question}
              questionMode={questionMode}
              setQuestionMode={setQuestionMode}
              setQuestion={setQuestion}
            />
          ) : null}
          {phase === "spreadSelect" ? (
            <SpreadSelectView onBack={() => setPhase("question")} onContinue={finalizeSession} spread={spread} setSpread={setSpread} />
          ) : null}
        </StageShell>
      ) : null}

      {phase === "ritualLoading" && session ? <RitualLoadingView session={session} /> : null}
      {phase === "deckDraw" && session ? <DeckDrawView onChoose={chooseDeckCard} selectedIndexes={selectedIndexes} session={session} /> : null}
      {phase === "spreadReveal" && session ? (
        <SpreadRevealView
          flippedIndexes={flippedIndexes}
          onAnalysis={() => setPhase("consciousnessCheck")}
          onFlip={(index) => {
            if (!flippedIndexes.includes(index)) setFlippedIndexes((current) => [...current, index]);
          }}
          readyForAnalysis={readyForAnalysis}
          session={session}
        />
      ) : null}
      {phase === "consciousnessCheck" && session ? (
        <ConsciousnessCheckView
          onAnswer={(_answer) => {
            if (consciousnessStep >= 2) setPhase("finalReading");
            else setConsciousnessStep((current) => current + 1);
          }}
          session={session}
          step={consciousnessStep}
        />
      ) : null}
      {phase === "finalReading" && session ? <FinalReadingView onReset={reset} readingSections={readingSections} session={session} /> : null}

      {modal ? (
        <ModalShell onClose={handleCloseModal}>
          <h2 className="mb-4 text-2xl font-black text-[var(--bm-text-main)]">
            {MINI_MODALS[modal].title}
          </h2>
          {modal === "daily" && (
            <div className="tarot-modal-daily">
              <p className="tarot-modal-card-name">{dailyCard.card}</p>
              <p className="mt-3 leading-relaxed text-[var(--bm-text-soft)]">{dailyCard.body}</p>
            </div>
          )}
          {modal === "history" && (
            <div className="tarot-modal-empty">
              <p className="text-[var(--bm-text-muted)]">Chưa có phiên trải bài nào được lưu.</p>
              <p className="mt-2 text-sm text-[var(--bm-text-muted)]">
                Hoàn thành một lượt trải bài để xem lại lịch sử.
              </p>
            </div>
          )}
          {modal === "dictionary" && (
            <div className="tarot-modal-dictionary">
              <p className="mb-3 text-sm text-[var(--bm-text-muted)]">22 lá Ẩn chính (Major Arcana)</p>
              <div className="tarot-modal-card-grid">
                {MAJOR_NAMES.map(([vi, , keyword]) => (
                  <div className="tarot-modal-card-item" key={vi}>
                    <strong className="text-[var(--bm-text-main)]">{vi}</strong>
                    <span className="text-sm text-[var(--bm-text-muted)]">{keyword}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {modal === "topics" && (
            <div className="tarot-modal-topics">
              {TOPICS.map((topic) => (
                <div className="tarot-modal-topic-item" key={topic.key}>
                  <span className="tarot-modal-topic-icon">{topic.icon}</span>
                  <div>
                    <strong className="text-[var(--bm-text-main)]">{topic.label}</strong>
                    <p className="text-sm text-[var(--bm-text-muted)]">{topic.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ModalShell>
      ) : null}
    </div>
  );
}

function StageShell({
  children,
  onHome,
  phase,
  stage,
  stageIndex,
  themeLabel,
  niche,
  question,
  spread,
  topHint,
  userName,
}: {
  children: ReactNode;
  onHome: () => void;
  phase: Exclude<Phase, "landing">;
  stage: (typeof STAGE_COPY)[Exclude<Phase, "landing">] | null;
  stageIndex: number;
  themeLabel: string;
  niche: string;
  question: string;
  spread: Spread;
  topHint: string;
  userName: string;
}) {
  return (
    <section className="tarot-stage">
      <div className="tarot-stage-shell tarot-fade-up">
        <div className="tarot-stage-topbar">
          <button className="tarot-home-button" onClick={onHome} type="button">← Tarot</button>
          <div className="tarot-stage-tabs" aria-hidden="true">
            {STAGE_SEQUENCE.map((item, index) => (
              <span className={index === stageIndex ? "active" : index < stageIndex ? "done" : ""} key={item} />
            ))}
          </div>
        </div>

        <div className="tarot-stage-body">
          <div className="tarot-stage-heading">
            <div className="tarot-stage-badge">{stage?.badge ?? "I"}</div>
            <h1 className="tarot-stage-title">{stage?.title ?? "Hành trình Tarot"}</h1>
            <p className="tarot-stage-subtitle">{stage?.subtitle ?? "Mỗi bước là một lớp đi sâu hơn vào câu hỏi."}</p>
          </div>

          {(themeLabel || niche) && (
            <div className="tarot-stage-context">
              {themeLabel && <span>{themeLabel}</span>}
              {niche && <span>{niche}</span>}
              {question && <span className="tarot-stage-context-question">{question}</span>}
            </div>
          )}

          <main className="tarot-stage-main">{children}</main>
        </div>
      </div>
    </section>
  );
}
