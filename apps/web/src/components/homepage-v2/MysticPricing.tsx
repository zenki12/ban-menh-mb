const features = [
  "33 chỉ số phân tích chuyên sâu",
  "50.000+ chữ luận giải cá nhân hóa",
  "Truy cập vĩnh viễn không gia hạn",
  "Năm cá nhân, tháng cá nhân và chu kỳ vận số",
  "Bảo mật thanh toán PayOS",
];

export function MysticPricing() {
  return (
    <section className="mystic-section" id="pricing">
      <div className="mystic-container">
        <div className="section-head">
          <p className="section-kicker">Số chủ đạo mở khóa đầu tiên</p>
          <h2>Báo cáo Thần Số Học</h2>
        </div>
        <article className="pricing-card hover-lift">
          <div>
            <h3 className="m-0 text-2xl font-black text-white">Báo cáo Thần Số Học cá nhân</h3>
            <p className="mt-3 leading-relaxed text-[var(--bm-text-muted)]">
              Module đầu tiên trong hệ sinh thái Bản Mệnh, mở khóa đầy đủ phần luận giải hiện có.
            </p>
            <ul className="feature-list">
              {features.map((feature) => (
                <li key={feature}>✦ {feature}</li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-[var(--bm-gold-bright)]">
              💫 All-access bundle 6 module Ultra sẽ ra mắt cùng Tarot. Early adopter sẽ có giá ưu đãi đặc biệt.
            </p>
          </div>
          <div>
            <div className="price">99.000đ</div>
            <p className="mt-1 text-sm text-[var(--bm-text-muted)]">Vĩnh viễn</p>
            <a className="mystic-btn mystic-btn-primary mt-5" href="/than-so-hoc">
              Khám phá toàn bộ chỉ số →
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
