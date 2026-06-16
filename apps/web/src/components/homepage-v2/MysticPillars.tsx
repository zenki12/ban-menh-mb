const pillars = [
  {
    iconType: "lens",
    title: "Hợp nhất nhiều lăng kính huyền học",
    text: "Thần số học, Tarot, Tử vi, Bản đồ sao, Ma trận định mệnh và Bát tự được kết nối trong một nền tảng thống nhất. Mỗi hệ thống mang đến một góc nhìn khác nhau, giúp việc khám phá bản thân trở nên đa chiều và phong phú hơn.",
  },
  {
    iconType: "codex",
    title: "Tri thức được biên tập và hệ thống hóa",
    text: "Các luận giải được xây dựng từ kho tư liệu huyền học được chọn lọc và tổ chức có cấu trúc. Nội dung được biên soạn từ hệ thống tri thức đã được xây dựng sẵn, thay vì tạo sinh tự động bằng trí tuệ nhân tạo theo từng yêu cầu, giúp mỗi báo cáo duy trì tính liên kết, chiều sâu và nhất quán.",
  },
  {
    iconType: "infinity",
    title: "Sở hữu vĩnh viễn",
    text: "Mọi báo cáo đã mở khóa được lưu trữ trong tài khoản để bạn có thể xem lại bất cứ lúc nào. Khi trải nghiệm sống thay đổi, cùng một luận giải có thể mang đến những góc nhìn và ý nghĩa khác nhau.",
  },
] as const;

function PillarIcon({ type }: { type: (typeof pillars)[number]["iconType"] }) {
  if (type === "lens") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M32 8 39 25l17 7-17 7-7 17-7-17-17-7 17-7Z" />
        <circle cx="32" cy="32" r="18" />
        <path d="M32 18v28M18 32h28" />
      </svg>
    );
  }

  if (type === "codex") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M16 12h21a9 9 0 0 1 9 9v31H24a8 8 0 0 0-8 8Z" />
        <path d="M16 12v40a8 8 0 0 1 8-8h22" />
        <path d="M24 23h14M24 31h16M24 39h10" />
        <path d="M46 18l6-4v28l-6 4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M16 32c0-7 4.5-12 10.5-12C36 20 37 44 47.5 44 53.5 44 58 39 58 32S53.5 20 47.5 20C38 20 27 44 16.5 44 10.5 44 6 39 6 32s4.5-12 10.5-12C27 20 28 44 38 44" />
      <path d="M32 10v8M32 46v8M10 32H2M62 32h-8" />
    </svg>
  );
}

export function MysticPillars() {
  return (
    <>
      <div className="divider" />
      <section className="mystic-section">
        <div className="mystic-container">
          <div className="section-head">
            <p className="section-kicker">Nền tảng</p>
            <h2>Ba nguyên tắc tạo nên chiều sâu của mỗi luận giải</h2>
          </div>
          <div className="pillars-grid">
            {pillars.map((pillar) => (
              <article className="mystic-card hover-lift" key={pillar.title}>
                <div className="pillar-icon">
                  <PillarIcon type={pillar.iconType} />
                </div>
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <div className="divider" />
    </>
  );
}
