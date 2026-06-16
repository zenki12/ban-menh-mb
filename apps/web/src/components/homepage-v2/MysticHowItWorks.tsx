const steps = [
  {
    iconType: "input",
    title: "Nhập thông tin cơ bản",
    text: "Họ tên và ngày sinh là đủ để bắt đầu tạo hồ sơ cá nhân hóa.",
  },
  {
    iconType: "preview",
    title: "Xem 6 module tổng quan",
    text: "Hệ thống hiển thị 6 lớp phân tích chính để bạn nắm bức tranh chung trước.",
  },
  {
    iconType: "unlock",
    title: "Mở phần luận giải đầy đủ",
    text: "Đi sâu vào từng module để xem diễn giải chi tiết và các mốc quan trọng.",
  },
] as const;

function StepIcon({ type }: { type: (typeof steps)[number]["iconType"] }) {
  if (type === "input") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M12 18h40v28H12z" />
        <path d="M20 28h24M20 36h16" />
        <circle cx="50" cy="14" r="3" />
      </svg>
    );
  }
  if (type === "preview") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M4 32C12 20 22 14 32 14s20 6 28 18c-8 12-18 18-28 18S12 44 4 32Z" />
        <circle cx="32" cy="32" r="7" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect x="14" y="28" width="36" height="26" rx="4" />
      <path d="M22 28v-8a10 10 0 0 1 20 0" />
      <circle cx="32" cy="40" r="3" />
      <path d="M32 43v6" />
    </svg>
  );
}

export function MysticHowItWorks() {
  return (
    <section className="mystic-section" id="hanh-trinh">
      <div className="mystic-container">
        <div className="section-head">
          <p className="section-kicker">HÀNH TRÌNH</p>
          <h2>Ba bước để mở bản đồ cá nhân</h2>
        </div>
        <div className="steps-grid">
          {steps.map((step) => (
            <article className="mystic-card hover-lift" key={step.title}>
              <div className="pillar-icon">
                <StepIcon type={step.iconType} />
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
