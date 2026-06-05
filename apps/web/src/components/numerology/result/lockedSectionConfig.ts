import type { IndicatorResult, NumerologyReport } from "@banmenh/shared";

export type LockedIndicator = {
  number?: number | string;
  data?: unknown;
};

export type LockedSectionConfig = {
  sectionNumber: string;
  title: string;
  hint: string;
  wordCount: string;
  getIndicator?: (report: NumerologyReport) => LockedIndicator | undefined;
  kbTitleFields?: string[];
};

export type LockedPhaseConfig = {
  letter: "B" | "C" | "D";
  title: string;
  sections: string[];
};

function indicator(result: IndicatorResult | undefined): LockedIndicator | undefined {
  if (!result) return undefined;
  return { number: result.displayNumber ?? result.number, data: result.data };
}

export const LOCKED_SECTIONS: LockedSectionConfig[] = [
  {
    sectionNumber: "5",
    title: "Chỉ số Đường Đời",
    hint: "Phân tích sâu về điểm mạnh, điểm yếu, sự nghiệp, tình cảm, sức khỏe, tài chính và các bài học đi kèm.",
    wordCount: "~5.000 chữ",
    getIndicator: (report) => indicator(report.lifePath),
  },
  {
    sectionNumber: "7",
    title: "Biểu đồ Kim Tự Tháp - Đỉnh cao & Thử thách",
    hint: "4 đỉnh cao và 4 thử thách định hình các giai đoạn quan trọng trong đời.",
    wordCount: "~3.000 chữ",
  },
  {
    sectionNumber: "8",
    title: "Chỉ số Năm Cá Nhân",
    hint: "Phân tích sự nghiệp, tài chính, tình cảm, sức khỏe và gia đình theo năng lượng năm.",
    wordCount: "~2.000 chữ",
    getIndicator: (report) => indicator(report.personalYear),
  },
  {
    sectionNumber: "8.1",
    title: "Chu kỳ vận số - 3 năm tới",
    hint: "Hướng đi cụ thể cho 3 năm tiếp theo theo các khía cạnh quan trọng của cuộc sống.",
    wordCount: "~6.000 chữ",
  },
  {
    sectionNumber: "9",
    title: "Chỉ số các tháng",
    hint: "Năng lượng và hành động gợi ý cho 3 tháng kế tiếp.",
    wordCount: "~1.500 chữ",
  },
  {
    sectionNumber: "10",
    title: "Chỉ số Sứ Mệnh",
    hint: "Sứ mệnh cuộc đời, cách đóng góp và lĩnh vực bạn được thúc đẩy để hoàn thành.",
    wordCount: "~4.000 chữ",
    getIndicator: (report) => indicator(report.destiny),
  },
  {
    sectionNumber: "11",
    title: "Tương quan Đường Đời x Sứ Mệnh",
    hint: "Cách hai chỉ số chính kết hợp để tạo nên chân dung định hướng của bạn.",
    wordCount: "~1.500 chữ",
  },
  {
    sectionNumber: "12",
    title: "Thử thách Sứ Mệnh",
    hint: "Những cản trở lớn nhất trên đường hoàn thành sứ mệnh và cách hóa giải.",
    wordCount: "~3.000 chữ",
    getIndicator: (report) => indicator(report.destinyChallenge),
  },
  {
    sectionNumber: "13",
    title: "Chỉ số Linh Hồn",
    hint: "Khao khát sâu kín nhất và điều bên trong bạn thật sự muốn nuôi dưỡng.",
    wordCount: "~4.000 chữ",
    getIndicator: (report) => indicator(report.soul),
  },
  {
    sectionNumber: "14",
    title: "Tương quan Đường Đời x Linh Hồn",
    hint: "Sự kết hợp giữa con đường bên ngoài và khao khát bên trong.",
    wordCount: "~1.500 chữ",
  },
  {
    sectionNumber: "15",
    title: "Thử thách Linh Hồn",
    hint: "Các lớp thử thách nội tâm, nguồn gốc, biểu hiện trong quan hệ và cách vượt qua.",
    wordCount: "~5.500 chữ",
    getIndicator: (report) => indicator(report.soulChallenge),
  },
  {
    sectionNumber: "16",
    title: "Chỉ số Nhân Cách",
    hint: "Ấn tượng đầu tiên, mặt nạ xã hội và cách người khác cảm nhận về bạn.",
    wordCount: "~2.500 chữ",
    getIndicator: (report) => indicator(report.personality),
  },
  {
    sectionNumber: "17",
    title: "Thử thách Nhân Cách",
    hint: "Cách cải thiện cách bạn được nhìn nhận trong giao tiếp và môi trường xã hội.",
    wordCount: "~2.000 chữ",
    getIndicator: (report) => indicator(report.personalityChallenge),
  },
  {
    sectionNumber: "18",
    title: "Chỉ số Trưởng Thành",
    hint: "Con người bạn dần trở thành sau tuổi trưởng thành và cách năng lượng này mở ra.",
    wordCount: "~2.500 chữ",
    getIndicator: (report) => indicator(report.maturity),
  },
  {
    sectionNumber: "19",
    title: "Năng lực Trưởng Thành",
    hint: "Năng lực đặc biệt được kích hoạt mạnh hơn ở giai đoạn trưởng thành.",
    wordCount: "~2.000 chữ",
    getIndicator: (report) => indicator(report.maturityAbility),
  },
  {
    sectionNumber: "20",
    title: "Chỉ số Thái Độ",
    hint: "Thái độ tự nhiên của bạn khi gặp tình huống mới hoặc va chạm đời sống.",
    wordCount: "~1.500 chữ",
    getIndicator: (report) => indicator(report.attitude),
  },
  {
    sectionNumber: "21",
    title: "Chỉ số Ngày Sinh",
    hint: "Tài năng bẩm sinh và món quà tự nhiên được thể hiện qua ngày sinh.",
    wordCount: "~1.500 chữ",
    getIndicator: (report) => indicator(report.birthday),
  },
  {
    sectionNumber: "22",
    title: "Bài học Karmic",
    hint: "Các bài học sâu sắc cần được chủ động phát triển qua trải nghiệm sống.",
    wordCount: "~2.500 chữ",
  },
  {
    sectionNumber: "23",
    title: "Các chỉ số Nợ Nghiệp",
    hint: "Nợ nghiệp 13/14/16/19 nếu có, vòng lặp thường gặp và cách trả nợ.",
    wordCount: "~6.000 chữ",
  },
  {
    sectionNumber: "24",
    title: "Chỉ số Vượt Khó",
    hint: "Năng lượng được kích hoạt khi bạn chịu áp lực cực đại.",
    wordCount: "~1.500 chữ",
    getIndicator: (report) => indicator(report.tensionNumber),
  },
  {
    sectionNumber: "25",
    title: "Năng lực Nhận Thức",
    hint: "Cách bạn xử lý thông tin, quan sát vấn đề và ra quyết định.",
    wordCount: "~1.200 chữ",
    getIndicator: (report) => indicator(report.cognitiveAbility),
  },
  {
    sectionNumber: "26",
    title: "Biểu đồ Pythagoras 3x3",
    hint: "Lưới số từ ngày sinh và tên, các mũi tên sức mạnh, số thiếu và số bù.",
    wordCount: "~4.000 chữ",
  },
];

export const LOCKED_PHASES: LockedPhaseConfig[] = [
  { letter: "B", title: "PHÂN TÍCH ĐƯỜNG ĐỜI", sections: ["5", "7"] },
  {
    letter: "C",
    title: "PHÂN TÍCH SỨ MỆNH & NỘI TÂM",
    sections: ["8", "8.1", "9", "10", "11", "12", "13", "14", "15", "16", "17"],
  },
  {
    letter: "D",
    title: "PHÂN TÍCH NĂNG LỰC & BIỂU ĐỒ SỐ MỆNH",
    sections: ["18", "19", "20", "21", "22", "23", "24", "25", "26"],
  },
];
