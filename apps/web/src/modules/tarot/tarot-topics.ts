import type { ThemeKey } from "./tarot-data";

export type TarotTopic = {
  key: ThemeKey;
  icon: string;
  label: string;
  subtitle: string;
  lead: string;
  niches: Array<{ label: string; hint: string; kbKey: string }>;
};

export const TOPICS: TarotTopic[] = [
  {
    key: "love", icon: "❤", label: "Tình yêu", subtitle: "Quan hệ & cảm xúc",
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
    key: "career", icon: "▲", label: "Sự nghiệp", subtitle: "Công việc & định hướng",
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
    key: "finance", icon: "◆", label: "Tài chính", subtitle: "Tiền bạc & đầu tư",
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
    key: "health", icon: "✦", label: "Sức khỏe", subtitle: "Thể chất & tinh thần",
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
    key: "self", icon: "✧", label: "Bản thân", subtitle: "Học tập & phát triển",
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

export const ALL_TOPICS: TarotTopic[] = [
  ...TOPICS,
  {
    key: "general", icon: "···", label: "Xem Thêm", subtitle: "Tất cả chủ đề",
    lead: "Tổng hợp tất cả niche từ 5 lĩnh vực. Chọn nếu bạn đã có chủ đề cụ thể trong đầu.",
    niches: TOPICS.flatMap((topic) => topic.niches),
  },
];
