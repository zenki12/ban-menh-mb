const benefits = [
  {
    icon: "✦",
    title: "Hiểu rõ bản thân",
    text: "Nhận diện cách bạn vận hành qua tính cách, động lực, điểm mạnh và những mẫu hành vi dễ lặp lại trong đời sống.",
  },
  {
    icon: "◐",
    title: "Nhìn rõ từng giai đoạn",
    text: "Theo dõi các chủ đề nổi bật theo năm, tháng và chu kỳ cá nhân để có thêm góc nhìn trước những lựa chọn quan trọng.",
  },
  {
    icon: "✧",
    title: "Phát triển tiềm năng",
    text: "Biết phần năng lực nào nên bồi đắp, điểm nào cần tiết chế và cách chuyển hiểu biết thành hành động thực tế hơn.",
  },
  {
    icon: "◆",
    title: "Vững vàng nội lực",
    text: "Tạo nền tảng tự tin từ việc hiểu mình, thay vì bị kéo hoàn toàn bởi áp lực bên ngoài hoặc cảm xúc nhất thời.",
  },
  {
    icon: "☍",
    title: "Cải thiện kết nối",
    text: "Có thêm góc nhìn về nhu cầu cảm xúc, cách giao tiếp và những khác biệt dễ tạo va chạm trong các mối quan hệ.",
  },
  {
    icon: "☉",
    title: "Cân bằng cuộc sống",
    text: "Quan sát sự liên hệ giữa công việc, tài chính, gia đình, phát triển cá nhân và nhu cầu nghỉ ngơi dài hạn.",
  },
] as const;

export function MysticBenefits() {
  return (
    <section className="mystic-section" id="loi-ich">
      <div className="mystic-container">
        <div className="section-head">
          <p className="section-kicker">Lợi ích</p>
          <h2>
            Tự tin hơn khi nhìn mình qua nhiều <span className="mystic-gradient">lớp luận giải</span>
          </h2>
          <p>
            Bản Mệnh không hứa thay bạn quyết định tương lai. Hệ thống giúp bạn đọc lại dữ liệu cá nhân
            theo cách có cấu trúc, dễ hiểu và có thể ứng dụng vào đời sống.
          </p>
        </div>
        <div className="benefits-grid">
          {benefits.map((benefit) => (
            <article className="mystic-card benefit-card hover-lift" key={benefit.title}>
              <div className="pillar-icon benefit-icon" aria-hidden="true">
                {benefit.icon}
              </div>
              <h3>{benefit.title}</h3>
              <p>{benefit.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
