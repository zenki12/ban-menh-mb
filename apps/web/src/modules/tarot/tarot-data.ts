export type Phase =
  | "landing"
  | "fieldSelect"
  | "nicheSelect"
  | "question"
  | "spreadSelect"
  | "ritualLoading"
  | "deckDraw"
  | "spreadReveal"
  | "consciousnessCheck"
  | "finalReading";

export type Spread = 1 | 3 | 5 | 7 | 10 | 12;
export type ThemeKey = "love" | "career" | "finance" | "health" | "self" | "general";
export type Orientation = "upright" | "reversed";

export type DeckCard = {
  id: number;
  nameVi: string;
  nameEn: string;
  archetype: string;
  keywords: string[];
  upright: string;
  reversed: string;
  advice: string;
};

export type DrawnCard = DeckCard & {
  orientation: Orientation;
  position: string;
};

export type ReadingSession = {
  theme: ThemeKey;
  themeLabel: string;
  spread: Spread;
  question: string;
  cards: DrawnCard[];
};

export type ReadingSection = {
  title: string;
  body: string;
};

type ThemeOption = {
  key: ThemeKey;
  label: string;
  hint: string;
};

type SpreadOption = {
  value: Spread;
  label: string;
  hint: string;
};

type StageCopy = {
  badge: string;
  title: string;
  subtitle: string;
  lead: string;
  bullets: string[];
  sidebarTitle: string;
  sidebarBody: string;
  metrics: string[];
};

export const LANDING_COPY = {
  badge: "TAROT · NGHI THỨC MỞ BÀI",
  title: ["Đặt câu hỏi.", "Chọn lá bài.", "Mở thông điệp."],
  subtitle:
    "Luồng Tarot được thiết kế như một nghi thức ngắn: chọn chủ đề, đặt câu hỏi, rút bài và chỉ xem luận giải sau khi toàn bộ lá đã được mở.",
  bullets: [
    "Chọn lĩnh vực và niche trước khi đặt câu hỏi.",
    "Tự tay rút từng lá từ bộ 78 lá.",
    "Bản cuối có đủ slot để nối KB Tarot thật.",
  ],
  facts: ["1 / 3 / 5 / 7 / 10 / 12 lá", "Thông điệp mỗi ngày", "Lưu lịch sử sau khi có tài khoản"],
} as const;

export const THEME_OPTIONS: ThemeOption[] = [
  { key: "love", label: "Tình yêu", hint: "Quan hệ, cảm xúc và cách hai người kết nối." },
  { key: "career", label: "Sự nghiệp", hint: "Công việc, định hướng và cơ hội phát triển." },
  { key: "finance", label: "Tài chính", hint: "Dòng tiền, quyết định chi tiêu và đầu tư." },
  { key: "health", label: "Sức khỏe", hint: "Nhịp sống, năng lượng và nhu cầu cân bằng." },
  { key: "self", label: "Bản thân", hint: "Bài học cá nhân, tiềm năng và hướng đi." },
  { key: "general", label: "Tổng quan", hint: "Một góc nhìn rộng khi bạn chưa muốn đóng khung câu hỏi." },
];

export const SPREAD_OPTIONS: SpreadOption[] = [
  { value: 1, label: "1 lá", hint: "Thông điệp trọng tâm cho hiện tại." },
  { value: 3, label: "3 lá", hint: "Quá khứ, hiện tại và xu hướng tiếp theo." },
  { value: 5, label: "5 lá", hint: "Bối cảnh, trở ngại, nguồn lực, lời khuyên và kết quả gần." },
  { value: 7, label: "7 lá", hint: "Một lớp đọc sâu hơn cho câu hỏi có nhiều tầng." },
  { value: 10, label: "10 lá", hint: "Khung đọc rộng theo cấu trúc Celtic Cross." },
  { value: 12, label: "12 lá", hint: "Dòng chảy 12 tháng hoặc 12 mặt của một chủ đề." },
];

export const SAMPLE_QUESTIONS = [
  "Tôi nên nhìn mối quan hệ hiện tại như thế nào?",
  "Điều gì đang chặn dòng công việc của tôi?",
  "Tôi cần tập trung vào điều gì trong giai đoạn này?",
  "Bài học chính của tình huống hiện tại là gì?",
];

// TODO(T-TAROT-KB): Replace with runtime fetch from KB worker when Tarot KB is ready.
export const DAILY_MESSAGE = {
  title: "Thông điệp mỗi ngày",
  card: "Ngôi Sao",
  body:
    "Hôm nay, hãy giữ một khoảng lặng ngắn trước khi quyết định. Lá bài nhắc bạn nhìn lại điều đang nuôi dưỡng niềm tin thay vì phản ứng quá nhanh.",
};

export const MINI_MODALS = {
  daily: {
    title: "Thông điệp mỗi ngày",
    body:
      "Mỗi ngày có thể mở bằng một lá bài ngắn để quan sát nhịp tâm thế, điều cần lưu ý và một hành động nhỏ nên giữ trong ngày.",
  },
  history: {
    title: "Lịch sử trải bài",
    body:
      "Khu vực này sẽ lưu các phiên trải bài đã mở khóa, giúp bạn đọc lại thông điệp theo từng giai đoạn.",
  },
  dictionary: {
    title: "Từ điển Tarot",
    body:
      "Từ điển tổng hợp ý nghĩa lá bài, chiều xuôi, chiều ngược, từ khóa và cách đọc theo từng lĩnh vực.",
  },
  topics: {
    title: "Chủ đề phổ biến",
    body:
      "Các chủ đề được quan tâm nhiều nhất sẽ được gom lại để người dùng chọn nhanh câu hỏi phù hợp.",
  },
} as const;

const MAJOR_NAMES = [
  ["Kẻ Khờ", "The Fool", "Khởi đầu"],
  ["Pháp Sư", "The Magician", "Hành động"],
  ["Nữ Tư Tế", "The High Priestess", "Trực giác"],
  ["Hoàng Hậu", "The Empress", "Nuôi dưỡng"],
  ["Hoàng Đế", "The Emperor", "Cấu trúc"],
  ["Giáo Hoàng", "The Hierophant", "Niềm tin"],
  ["Những Người Yêu", "The Lovers", "Lựa chọn"],
  ["Chiến Xa", "The Chariot", "Tiến lên"],
  ["Sức Mạnh", "Strength", "Nội lực"],
  ["Ẩn Sĩ", "The Hermit", "Chiêm nghiệm"],
  ["Bánh Xe Vận Mệnh", "Wheel of Fortune", "Chu kỳ"],
  ["Công Lý", "Justice", "Cân bằng"],
  ["Người Treo Ngược", "The Hanged Man", "Đổi góc nhìn"],
  ["Cái Chết", "Death", "Kết thúc"],
  ["Tiết Độ", "Temperance", "Điều hòa"],
  ["Ác Quỷ", "The Devil", "Ràng buộc"],
  ["Tòa Tháp", "The Tower", "Phá vỡ"],
  ["Ngôi Sao", "The Star", "Hy vọng"],
  ["Mặt Trăng", "The Moon", "Mơ hồ"],
  ["Mặt Trời", "The Sun", "Rõ ràng"],
  ["Phán Xét", "Judgement", "Thức tỉnh"],
  ["Thế Giới", "The World", "Hoàn tất"],
] as const;

const SUITS = [
  { vi: "Gậy", en: "Wands", focus: "động lực và hành động", keyword: "hành động" },
  { vi: "Cốc", en: "Cups", focus: "cảm xúc và kết nối", keyword: "cảm xúc" },
  { vi: "Kiếm", en: "Swords", focus: "suy nghĩ và quyết định", keyword: "tư duy" },
  { vi: "Đồng", en: "Pentacles", focus: "vật chất và nền tảng", keyword: "thực tế" },
] as const;

const RANKS = [
  ["Át", "Ace", "mầm khởi đầu"],
  ["Hai", "Two", "sự cân bằng"],
  ["Ba", "Three", "mở rộng"],
  ["Bốn", "Four", "ổn định"],
  ["Năm", "Five", "thử thách"],
  ["Sáu", "Six", "hài hòa"],
  ["Bảy", "Seven", "kiểm tra"],
  ["Tám", "Eight", "nhịp đều"],
  ["Chín", "Nine", "thu hoạch"],
  ["Mười", "Ten", "hoàn vòng"],
  ["Tiểu Đồng", "Page", "tín hiệu mới"],
  ["Kỵ Sĩ", "Knight", "động lực tiến lên"],
  ["Hoàng Hậu", "Queen", "khả năng tích hợp"],
  ["Vua", "King", "quyền chủ động"],
] as const;

function majorCard([nameVi, nameEn, archetype]: (typeof MAJOR_NAMES)[number], id: number): DeckCard {
  return {
    id,
    nameVi,
    nameEn,
    archetype,
    keywords: [archetype, "quan sát", "chuyển hướng"],
    upright: `${nameVi} mở ra lớp nghĩa về ${archetype.toLowerCase()}. Lá này nhắc bạn nhìn rõ điều đang xuất hiện và chọn phản ứng có ý thức hơn.`,
    reversed: `${nameVi} ở chiều ngược cho thấy năng lượng ${archetype.toLowerCase()} đang bị giữ lại, lệch nhịp hoặc chưa được dùng đúng chỗ.`,
    advice: `Hãy gọi tên phần ${archetype.toLowerCase()} trong tình huống và chọn một bước nhỏ để đưa nó về trạng thái rõ ràng hơn.`,
  };
}

function minorCard(suit: (typeof SUITS)[number], rank: (typeof RANKS)[number], id: number): DeckCard {
  const [rankVi, rankEn, archetype] = rank;
  const nameVi = `${rankVi} ${suit.vi}`;
  const nameEn = `${rankEn} of ${suit.en}`;
  return {
    id,
    nameVi,
    nameEn,
    archetype: `${archetype} trong ${suit.focus}`,
    keywords: [archetype, suit.keyword, "điều chỉnh"],
    upright: `${nameVi} cho thấy ${archetype} đang vận hành trong tầng ${suit.focus}. Đây là dấu hiệu cần nhìn vào hành động cụ thể thay vì chỉ đoán cảm giác.`,
    reversed: `${nameVi} ở chiều ngược cho thấy ${suit.focus} có thể đang bị chậm, bị kéo lệch hoặc chưa được đặt vào đúng vị trí.`,
    advice: `Hãy chọn một việc nhỏ liên quan đến ${suit.focus} và làm nó rõ hơn trong 24 giờ tới.`,
  };
}

export const DECK: DeckCard[] = [
  ...MAJOR_NAMES.map((card, index) => majorCard(card, index)),
  ...SUITS.flatMap((suit, suitIndex) => RANKS.map((rank, rankIndex) => minorCard(suit, rank, 22 + suitIndex * 14 + rankIndex))),
];

export const POSITION_LABELS: Record<Spread, string[]> = {
  1: ["Thông điệp trọng tâm"],
  3: ["Quá khứ", "Hiện tại", "Xu hướng"],
  5: ["Bối cảnh", "Trở ngại", "Nguồn lực", "Lời khuyên", "Kết quả gần"],
  7: ["Nền tảng", "Điều nổi lên", "Thử thách", "Nguồn lực", "Điều cần buông", "Hành động", "Thông điệp"],
  10: ["Trung tâm", "Thử thách", "Gốc rễ", "Quá khứ gần", "Điều cản trở", "Tương lai gần", "Bản thân", "Môi trường", "Hy vọng", "Kết luận"],
  12: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
};

export const STAGE_COPY: Record<Exclude<Phase, "landing">, StageCopy> = {
  fieldSelect: stage("II", "Chọn lĩnh vực", "Vũ trụ cần biết bạn muốn khám phá điều gì trước tiên", "Bản đồ Tarot rõ hơn khi câu hỏi được đặt vào đúng lớp đời sống.", ["6 chủ đề lớn", "Niche nhỏ ở bước sau", "Sẵn slot KB chủ đề"]),
  nicheSelect: stage("II", "Lĩnh vực chi tiết", "Thu hẹp ngữ cảnh để thông điệp sắc nét hơn", "Một niche cụ thể giúp câu hỏi bớt chung chung và giúp phần luận giải đi thẳng vào trọng tâm.", ["Niche cụ thể", "Tìm kiếm nhanh", "Câu hỏi sát hơn"]),
  question: stage("III", "Câu hỏi của bạn", "Hãy đặt câu hỏi với tất cả sự thành tâm", "Câu hỏi càng rõ, phần đọc càng ít mơ hồ. Bạn có thể chọn gợi ý hoặc tự nhập.", ["Gợi ý", "Tự nhập", "Giới hạn 200 ký tự"]),
  spreadSelect: stage("IV", "Chọn kiểu trải bài", "Mỗi kiểu trải bài mang một chiều sâu khác nhau", "Số lá quyết định độ rộng của bản đọc: từ thông điệp nhanh đến cấu trúc nhiều tầng.", ["1 lá", "3 lá", "Mở rộng sau"]),
  ritualLoading: stage("V", "Nghi thức mở bài", "Giữ nhịp thở trước khi lá bài lên tiếng", "Đây là khoảnh khắc chuyển từ câu hỏi sang trải nghiệm rút bài.", ["Tập trung", "Lắng nghe", "Chuẩn bị deck"]),
  deckDraw: stage("VI", "Rút bài", "Chọn từ bộ 78 lá", "Người dùng tự chọn lá để giữ cảm giác nghi thức và quyền tham gia vào lượt đọc.", ["78 lá", "Rút tuần tự", "Có tray chọn"]),
  spreadReveal: stage("VII", "Lật lá", "Mỗi lá đã chọn sẽ mở nghĩa riêng", "Bước này giúp người dùng đọc từng lá trước khi xem phần tổng hợp cuối.", ["Flip từng lá", "Vị trí riêng", "Sẵn card asset"]),
  consciousnessCheck: stage("VIII", "Kết nối tâm thức", "Ba xác nhận trước khi đọc kết quả", "Các câu hỏi ngắn giúp phần luận giải bám sát trạng thái hiện tại của người hỏi.", ["3 xác nhận", "Có/Không", "Tăng ngữ cảnh"]),
  finalReading: stage("IX", "Luận giải cuối cùng", "Bản tổng hợp sau cùng đã sẵn chỗ cho KB", "Kết quả chia thành các khối riêng để sau này thay bằng nội dung KB thật.", ["Tổng quan", "Mạch chính", "Hành động"]),
};

function stage(badge: string, title: string, subtitle: string, body: string, metrics: string[]): StageCopy {
  return {
    badge,
    title,
    subtitle,
    lead: body,
    bullets: metrics,
    sidebarTitle: "Vai trò của bước này",
    sidebarBody: body,
    metrics,
  };
}

export function getThemeLabel(theme: ThemeKey) {
  return THEME_OPTIONS.find((item) => item.key === theme)?.label ?? "Tổng quan";
}

export function drawCards(spread: Spread) {
  const labels = POSITION_LABELS[spread];
  const pool = [...DECK].sort(() => Math.random() - 0.5);
  return labels.map((position, index) => {
    const card = pool[index % pool.length];
    return {
      ...card,
      orientation: Math.random() > 0.26 ? "upright" : "reversed",
      position,
    } satisfies DrawnCard;
  });
}

export function getCardMessage(card: DrawnCard) {
  return card.orientation === "upright" ? card.upright : card.reversed;
}

export function buildReadingSections(session: ReadingSession): ReadingSection[] {
  const first = session.cards[0];
  const middle = session.cards[Math.floor(session.cards.length / 2)];
  const last = session.cards[session.cards.length - 1];
  return [
    {
      title: "Tổng quan",
      body: `Phiên trải ${session.spread} lá cho chủ đề ${session.themeLabel.toLowerCase()} mở bằng ${first?.nameVi ?? "lá đầu tiên"} và khép bằng ${last?.nameVi ?? "lá cuối"}. Đây là khung đọc để quan sát mạch chính của câu hỏi: ${session.question}`,
    },
    {
      title: "Mạch chính",
      body: `Lá trung tâm là ${middle?.nameVi ?? "lá trung tâm"}. Trong bản thật, khối này sẽ nhận nội dung KB theo lá, vị trí, chiều lá, lĩnh vực và câu hỏi của người dùng.`,
    },
    {
      title: "Điểm cần chú ý",
      body: "Các lá được đọc cùng nhau để tìm điểm đang lặp lại: nơi năng lượng bị dồn lại, nơi cần rõ ràng hơn và nơi nên tạm dừng trước khi quyết định.",
    },
    {
      title: "Hành động tiếp theo",
      body: "Hãy chọn một bước nhỏ có thể làm trong 24 giờ tới. Tarot ở đây không ép kết luận, mà giúp bạn nhìn rõ điều cần quan sát và điều có thể thử nghiệm.",
    },
  ];
}

export function buildReadingSummary(session: ReadingSession) {
  return buildReadingSections(session)
    .map((section) => `${section.title}: ${section.body}`)
    .join("\n\n");
}
