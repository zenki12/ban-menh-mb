export type TarotComboNiche = { key: string; label: string };
export type TarotComboDomain = { key: string; label: string; niches: readonly TarotComboNiche[] };

/** Canonical 5-domain grouping used by the combo dictionary API and UI. */
export const TAROT_COMBO_DOMAINS: readonly TarotComboDomain[] = [
  {
    key: "love",
    label: "Tình Yêu",
    niches: [
      ["love", "Tình Yêu Tổng Quát"], ["ex", "Người Yêu Cũ"],
      ["current_love", "Người Yêu Hiện Tại"], ["ambiguous", "Mối Quan Hệ Mập Mờ"],
      ["crush", "Crush / Thầm Thích"], ["future_love", "Người Yêu Tương Lai"],
      ["someone", "Người Ấy"], ["marriage", "Hôn Nhân"],
      ["conflict", "Giải Quyết Xung Đột"], ["breakup", "Chia Tay & Hàn Gắn"],
      ["long_distance", "Yêu Xa"], ["jealousy", "Người Thứ Ba / Ghen Tuông"],
      ["self_love", "Yêu Bản Thân"], ["finding_love", "Tìm Kiếm Tình Yêu"],
      ["compatibility", "Mức Độ Hợp Nhau"], ["toxic_relationship", "Mối Quan Hệ Độc Hại"],
      ["soulmate", "Tri Kỷ / Soulmate"], ["reconciliation", "Gương Vỡ Lại Lành"],
      ["secret_admirer", "Người Thầm Thương"], ["friendship", "Tình Bạn / Tri Kỷ"],
      ["pregnancy", "Con Cái / Thai Kỳ"], ["gossip", "Thị Phi / Đàm Tiếu"],
      ["family", "Gia Đình"],
    ].map(([key, label]) => ({ key, label })),
  },
  {
    key: "finance",
    label: "Tài Chính",
    niches: [
      ["finance", "Tài Chính Tổng Quát"], ["investment", "Đầu Tư"],
      ["debt", "Nợ Nần / Vay Mượn"], ["savings", "Tiết Kiệm / Tích Lũy"],
      ["luck_money", "Lộc Tài / May Mắn"], ["real_estate", "Bất Động Sản"],
      ["financial_loss", "Thua Lỗ / Khó Khăn"], ["sudden_wealth", "Vận May Bất Ngờ"],
    ].map(([key, label]) => ({ key, label })),
  },
  {
    key: "health",
    label: "Sức Khỏe",
    niches: [
      ["health", "Sức Khỏe Thể Chất"], ["mental", "Sức Khỏe Tinh Thần"],
      ["energy", "Năng Lượng / Chakra"], ["diet", "Ăn Uống / Chăm Sóc"],
      ["pet", "Thú Cưng"], ["healing", "Chữa Lành"],
      ["stress", "Căng Thẳng / Âu Lo"], ["trauma", "Tổn Thương Quá Khứ"],
    ].map(([key, label]) => ({ key, label })),
  },
  {
    key: "career",
    label: "Sự Nghiệp",
    niches: [
      ["career", "Sự Nghiệp / Công Việc"], ["job_search", "Xin Việc Làm"],
      ["promotion", "Thăng Tiến"], ["business", "Kinh Doanh"],
      ["colleague", "Đồng Nghiệp / Cấp Trên"], ["career_change", "Chuyển Nghề"],
      ["freelance", "Freelance / Tự Do"], ["interview", "Phỏng Vấn"],
      ["legal", "Pháp Lý / Giấy Tờ"], ["moving", "Chuyển Chỗ / Xuất Ngoại"],
      ["burnout", "Kiệt Sức / Áp Lực"], ["startup", "Khởi Nghiệp"],
      ["workplace_politics", "Thị Phi Công Sở"], ["side_hustle", "Nghề Tay Trái"],
    ].map(([key, label]) => ({ key, label })),
  },
  {
    key: "self",
    label: "Bản Thân",
    niches: [
      ["study", "Học Tập"], ["study_abroad", "Du Học"],
      ["self", "Định Hướng Bản Thân"], ["purpose", "Sứ Mệnh / Mục Đích"],
      ["shadow_self", "Bóng Tối Nội Tâm"], ["decision", "Ra Quyết Định"],
      ["travel", "Du Lịch / Di Chuyển"], ["spiritual", "Tâm Linh"],
      ["dream", "Giải Mã Giấc Mơ"], ["past_life", "Tiền Kiếp"],
      ["karma", "Nghiệp Quả / Karma"], ["lost_item", "Tìm Đồ Thất Lạc"],
      ["exams", "Thi Cử / Kiểm Tra"], ["scholarship", "Học Bổng"],
      ["talent", "Năng Khiếu / Đam Mê"], ["spirit_guide", "Thần Hộ Mệnh"],
      ["general", "Tổng Quát"],
    ].map(([key, label]) => ({ key, label })),
  },
] as const;
