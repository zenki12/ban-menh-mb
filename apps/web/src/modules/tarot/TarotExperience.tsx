"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Card } from "../../components/ui";
import { useAuth } from "../../lib/auth";
import {
  buildReadingSections,
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
      { label: "Yêu bản thân", hint: "Nhìn lại giá trị của chính mình" },
      { label: "Tình bạn / tri kỷ", hint: "Sự thấu hiểu và kết nối" },
      { label: "Gia đình", hint: "Cách nói chuyện và nâng đỡ nhau" },
      { label: "Con cái / thai kỳ", hint: "Dòng chảy gia đình" },
      { label: "Quan hệ độc hại", hint: "Điểm bế tắc cần tháo gỡ" },
      { label: "Tri kỷ / soulmate", hint: "Kết nối linh hồn" },
    ],
  },
  {
    key: "career",
    icon: "▲",
    label: "Sự nghiệp",
    subtitle: "Công việc & định hướng",
    lead: "Dành cho câu chuyện nghề nghiệp, môi trường làm việc, những ngã rẽ cần cân nhắc và nhịp phát triển tiếp theo.",
    niches: [
      { label: "Tìm việc", hint: "Cơ hội và lựa chọn mới" },
      { label: "Định hướng", hint: "Lối đi nghề nghiệp" },
      { label: "Môi trường làm việc", hint: "Điều đang diễn ra quanh bạn" },
      { label: "Thăng tiến", hint: "Khả năng được ghi nhận" },
      { label: "Kinh doanh", hint: "Quyết định và rủi ro" },
      { label: "Đồng nghiệp", hint: "Quan hệ trong công việc" },
    ],
  },
  {
    key: "finance",
    icon: "◆",
    label: "Tài chính",
    subtitle: "Tiền bạc & đầu tư",
    lead: "Một lớp nhìn rõ hơn vào dòng tiền, thói quen chi tiêu, cơ hội đầu tư và những áp lực tài chính đang hiện diện.",
    niches: [
      { label: "Dòng tiền", hint: "Thu nhập và chi tiêu" },
      { label: "Đầu tư", hint: "Cơ hội và cảnh báo" },
      { label: "Nợ / cam kết", hint: "Áp lực tài chính" },
      { label: "Mua bán", hint: "Quyết định giao dịch" },
      { label: "Cơ hội tiền bạc", hint: "Nguồn lực mới" },
      { label: "Ổn định dài hạn", hint: "Nền tảng vật chất" },
    ],
  },
  {
    key: "health",
    icon: "✦",
    label: "Sức khỏe",
    subtitle: "Thể chất & tinh thần",
    lead: "Không thay thế chuyên môn y tế, nhưng giúp bạn quan sát nhịp sống, mức căng thẳng và dấu hiệu cần cân bằng lại.",
    niches: [
      { label: "Năng lượng", hint: "Trạng thái hiện tại" },
      { label: "Cân bằng", hint: "Nhịp sống và nghỉ ngơi" },
      { label: "Căng thẳng", hint: "Áp lực tinh thần" },
      { label: "Thói quen", hint: "Điều cần điều chỉnh" },
      { label: "Hồi phục", hint: "Quay về trạng thái vững" },
      { label: "Tự chăm sóc", hint: "Lắng nghe cơ thể" },
    ],
  },
  {
    key: "self",
    icon: "✧",
    label: "Bản thân",
    subtitle: "Học tập & phát triển",
    lead: "Dành cho những câu hỏi về bản sắc, tiềm năng, bài học cá nhân và quãng đường đang mở ra phía trước.",
    niches: [
      { label: "Tiến kiếp", hint: "Bản thân và nếp nghĩ trước đây" },
      { label: "Nghiệp quả", hint: "Nhân quả tuần hoàn" },
      { label: "Đồ vật thất lạc", hint: "Mạnh mẽ và phương hướng" },
      { label: "Thi cử / kiểm tra", hint: "Kết quả bài thi" },
      { label: "Học bổng", hint: "Cơ hội vươn xa" },
      { label: "Năng khiếu / đam mê", hint: "Khám phá biệt tài" },
    ],
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

  const topic = useMemo(() => TOPICS.find((item) => item.key === theme) ?? TOPICS[0], [theme]);
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

  function startReading() {
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

  return (
    <div className="relative overflow-hidden pb-12">
      {phase === "landing" ? (
        <LandingView
          onBegin={() => setPhase("fieldSelect")}
          onOpenModal={setModal}
          onStart={() => setPhase("fieldSelect")}
          question={question}
          setQuestion={setQuestion}
          setSpread={setSpread}
          setTheme={setTheme}
          spread={spread}
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
            }} onSkip={() => setPhase("question")} topics={TOPICS} />
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
            <SpreadSelectView onBack={() => setPhase("question")} onContinue={startReading} spread={spread} setSpread={setSpread} />
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
          onAnswer={() => {
            if (consciousnessStep >= 2) setPhase("finalReading");
            else setConsciousnessStep((current) => current + 1);
          }}
          session={session}
          step={consciousnessStep}
        />
      ) : null}
      {phase === "finalReading" && session ? <FinalReadingView onReset={reset} readingSections={readingSections} session={session} /> : null}

      {modal ? (
        <ModalShell onClose={() => setModal(null)}>
          <h2 className="mb-3 text-2xl font-black text-[var(--bm-text-main)]">{MINI_MODALS[modal].title}</h2>
          <p className="text-[var(--bm-text-soft)]">{MINI_MODALS[modal].body}</p>
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
          <button className="tarot-home-button" onClick={onHome} type="button">← Trang chủ</button>
          <div className="tarot-stage-tabs" aria-hidden="true">
            {STAGE_SEQUENCE.map((item, index) => (
              <span className={index === stageIndex ? "active" : index < stageIndex ? "done" : ""} key={item} />
            ))}
          </div>
        </div>

        <div className="tarot-stage-grid">
          <aside className="tarot-stage-aside">
            <div className="tarot-stage-badge">{stage?.badge ?? "I"}</div>
            <div className="tarot-stage-kicker">{stage?.title ?? "Hành trình Tarot"}</div>
            <h1 className="tarot-stage-title">{phase === "finalReading" ? "Thông điệp cuối cùng" : stage?.title ?? "Tarot"}</h1>
            <p className="tarot-stage-subtitle">{stage?.subtitle ?? "Mỗi bước là một lớp đi sâu hơn vào câu hỏi."}</p>
            <Card className="tarot-stage-profile" padding="md" variant="glass">
              <div className="tarot-stage-profile-mark">✦</div>
              <div className="tarot-stage-profile-body">
                <strong>{userName}</strong>
                <span>Vũ trụ đang đọc: {themeLabel}</span>
                <span>Lĩnh vực hiện tại: {niche}</span>
                <span>Kiểu trải bài: {spread} lá</span>
              </div>
            </Card>
            <div className="tarot-stage-note"><p>{topHint}</p></div>
            <div className="tarot-stage-metrics">{(stage?.metrics ?? []).map((item) => <span key={item}>{item}</span>)}</div>
            <div className="tarot-stage-sidebar">
              <strong>{stage?.sidebarTitle ?? "Khung đọc"}</strong>
              <p>{stage?.sidebarBody ?? "Mỗi màn là một lớp dữ liệu riêng, sẵn sàng nối KB khi được bật."}</p>
            </div>
          </aside>

          <main className="tarot-stage-main">{children}</main>
        </div>
      </div>
    </section>
  );
}
