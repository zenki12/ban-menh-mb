"use client";

import { useState } from "react";

const modules = [
  {
    label: "Thần số học",
    mark: "Đang mở",
    title: "Báo cáo Thần Số Học",
    text: "Khởi đầu hành trình khám phá bản thân với 33 chỉ số cốt lõi và các chu kỳ vận số.",
  },
  {
    label: "Tarot",
    mark: "Sắp ra mắt",
    title: "Rút bài Tarot",
    statusLine: "Sắp ra mắt.",
    text: "Đặt câu hỏi, chọn lĩnh vực quan tâm và khám phá thông điệp từ các lá bài Tarot.",
  },
  {
    label: "Tử vi",
    mark: "Quý 2/2027",
    title: "Lá số tử vi",
    text: "Khám phá 12 cung, chính tinh, phụ tinh và các chu kỳ vận hạn qua giao diện trực quan, giúp việc luận giải trở nên dễ hiểu và thực tiễn hơn.",
  },
  {
    label: "Ma trận",
    mark: "Quý 3/2027",
    title: "Ma trận định mệnh",
    text: "Khám phá 22 năng lượng cốt lõi, sứ mệnh linh hồn và những bài học quan trọng được thiết kế riêng cho hành trình cuộc đời của bạn.",
  },
  {
    label: "Bản đồ sao",
    mark: "Quý 3/2027",
    title: "Bản đồ sao",
    text: "Khám phá vị trí các hành tinh, 12 cung hoàng đạo và 12 nhà chiêm tinh để hiểu rõ tính cách, tiềm năng và định hướng phát triển của bản thân.",
  },
  {
    label: "Bát tự",
    mark: "2028",
    title: "Bát tự",
    text: "Khám phá tứ trụ Năm, Tháng, Ngày, Giờ sinh cùng sự vận động của ngũ hành để hiểu rõ bản mệnh, vận trình và tiềm năng phát triển của bản thân.",
  },
];

function NumerologyMock() {
  return (
    <>
      <div className="mock-line">
        <span>Nguyễn Văn A</span>
        <strong>Số chủ đạo 3</strong>
      </div>
      <div className="chip-row">
        {["Đường Đời 3", "Sứ mệnh 4", "Linh hồn 2", "Năm cá nhân 4"].map((chip) => (
          <span className="mystic-chip" key={chip}>
            {chip}
          </span>
        ))}
      </div>
      <p className="rounded-xl border border-[var(--bm-border-gold)] bg-[rgba(251,191,36,0.08)] p-4 leading-relaxed text-[var(--bm-text-soft)]">
        Số Đường Đời 3 - Người Truyền Cảm Hứng. Bạn học cách biến cảm xúc, ngôn ngữ và ý tưởng thành giá trị cho người
        khác.
      </p>
      <div className="numerology-preview-grid">
        <div>
          <strong>Chân dung cốt lõi</strong>
          <span>Đọc rõ tính cách, nội lực, điểm mạnh và bài học dễ lặp lại.</span>
        </div>
        <div>
          <strong>Chu kỳ vận số</strong>
          <span>Nhìn chủ đề năm, tháng và dòng chảy dài hạn để chọn đúng trọng tâm.</span>
        </div>
        <div>
          <strong>Gợi ý hành động</strong>
          <span>Biến luận giải thành định hướng thực tế cho công việc, tình cảm và phát triển bản thân.</span>
        </div>
      </div>
      <div className="module-insight module-insight-live">
        ✨ Một báo cáo không chỉ cho bạn biết “con số của mình là gì”, mà còn giúp bạn hiểu nên dùng năng lượng đó như
        thế nào trong từng giai đoạn.
      </div>
      <a className="mystic-btn mystic-btn-primary mt-4" href="/than-so-hoc">
        Bắt đầu khám phá →
      </a>
    </>
  );
}

function TarotMock() {
  return (
    <>
      <div className="tarot-row">
        {["Quá khứ", "Hiện tại", "Tương lai"].map((label, index) => (
          <div className="tarot-card" key={label}>
            <div>
              <div className="text-3xl">✦</div>
              <strong>{label}</strong>
              <p className="m-0 mt-2 text-xs text-[var(--bm-text-muted)]">{["Ngôi Sao", "Sức Mạnh", "Mặt Trời"][index]}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="tarot-feature-grid">
        <div>
          <strong>Thông điệp mỗi ngày</strong>
          <span>Một lá bài ngắn gọn để mở đầu ngày mới.</span>
        </div>
        <div>
          <strong>Trải bài linh hoạt</strong>
          <span>1 / 3 / 5 / 7 / 10 / 12 lá theo mức độ câu hỏi.</span>
        </div>
        <div>
          <strong>Lĩnh vực cụ thể</strong>
          <span>Tình yêu, công việc, tài chính, định hướng và phát triển bản thân.</span>
        </div>
      </div>
      <div className="module-insight module-insight-soon">
        ✨ Hàng nghìn tổ hợp diễn giải từ số lá, lĩnh vực, vị trí và thông điệp từng lá bài.
      </div>
    </>
  );
}

function TuViMock() {
  return (
    <>
      <div className="palace-grid">
        {["Mệnh", "Phụ mẫu", "Phúc", "Điền", "Quan", "Nô", "Di", "Tật", "Tài", "Tử", "Phu", "Huynh"].map((item) => (
          <div className={`palace ${item === "Mệnh" ? "palace-active" : ""}`} key={item}>
            {item}
          </div>
        ))}
      </div>
      <div className="tuvi-star-row">
        {["Tử Vi", "Thiên Phủ", "Thái Dương", "Vũ Khúc", "Thiên Tướng"].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div className="tuvi-cycle-row">
        {["Đại vận", "Tiểu vận", "Lưu niên"].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div className="module-insight module-insight-planned">
        ✨ Lá số sẽ kết hợp cung, sao và vận hạn để tạo bản luận giải trực quan.
      </div>
    </>
  );
}

function MatrixMock() {
  return (
    <>
      <div className="matrix-map">
        <div className="matrix-diamond">
          <span>22</span>
        </div>
        <div className="matrix-node matrix-node-core">
          <strong>Năng lượng cốt lõi</strong>
          <span>Nội lực bẩm sinh</span>
        </div>
        <div className="matrix-node matrix-node-mission">
          <strong>Sứ mệnh linh hồn</strong>
          <span>Hướng phát triển sâu</span>
        </div>
        <div className="matrix-node matrix-node-lesson">
          <strong>Bài học</strong>
          <span>Mẫu lặp cần quan sát</span>
        </div>
        <div className="matrix-node matrix-node-potential">
          <strong>Tiềm năng</strong>
          <span>Năng lực có thể mở rộng</span>
        </div>
      </div>
      <div className="matrix-chip-row">
        {["22 năng lượng", "4 trục chính", "Bản đồ cá nhân"].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div className="module-insight module-insight-planned">
        ✨ Ma trận định mệnh giúp nhìn hành trình cuộc đời qua các điểm năng lượng, từ nội lực bẩm sinh đến bài học cần phát triển.
      </div>
    </>
  );
}

function AstroMock() {
  return (
    <>
      <div className="astro-map">
        <div className="astro-chart">
          <span>☉</span>
          <strong>Bản đồ sao</strong>
        </div>
        <div className="astro-orbit astro-orbit-one" />
        <div className="astro-orbit astro-orbit-two" />
        <div className="astro-point astro-point-sun">Mặt trời</div>
        <div className="astro-point astro-point-moon">Mặt trăng</div>
        <div className="astro-point astro-point-asc">Cung mọc</div>
      </div>
      <div className="astro-feature-grid">
        <div>
          <strong>12 cung hoàng đạo</strong>
          <span>Đọc khí chất, cách phản ứng và màu sắc tính cách nổi bật.</span>
        </div>
        <div>
          <strong>12 nhà chiêm tinh</strong>
          <span>Gắn năng lượng hành tinh vào từng lĩnh vực đời sống.</span>
        </div>
        <div>
          <strong>Góc chiếu hành tinh</strong>
          <span>Nhìn các điểm hài hòa, căng thẳng và tiềm năng phát triển.</span>
        </div>
      </div>
      <div className="module-insight module-insight-planned">
        ✨ Bản đồ sao giúp kết nối thời điểm sinh với cấu trúc tính cách, mối quan hệ và định hướng phát triển cá nhân.
      </div>
    </>
  );
}

function BatTuMock() {
  return (
    <>
      <div className="batu-board">
        <div className="batu-pillar-grid">
          {[
            ["Năm", "Giáp", "Tý"],
            ["Tháng", "Bính", "Dần"],
            ["Ngày", "Mậu", "Thân"],
            ["Giờ", "Canh", "Ngọ"],
          ].map(([label, can, chi]) => (
            <div className="batu-pillar" key={label}>
              <span>{label}</span>
              <strong>{can}</strong>
              <em>{chi}</em>
            </div>
          ))}
        </div>
        <div className="batu-balance">
          {["Kim", "Mộc", "Thủy", "Hỏa", "Thổ"].map((item, index) => (
            <div className="batu-element" key={item}>
              <span>{item}</span>
              <div>
                <i style={{ width: `${[66, 42, 58, 74, 50][index]}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="batu-feature-grid">
        <div>
          <strong>Tứ trụ sinh thời</strong>
          <span>Đọc cấu trúc Năm, Tháng, Ngày, Giờ sinh theo Can Chi.</span>
        </div>
        <div>
          <strong>Cân bằng ngũ hành</strong>
          <span>Quan sát khí chất nổi trội và phần năng lượng cần bổ sung.</span>
        </div>
        <div>
          <strong>Vận trình phát triển</strong>
          <span>Nhìn các giai đoạn thuận lợi để chọn hướng đi phù hợp.</span>
        </div>
      </div>
      <div className="module-insight module-insight-planned">
        ✨ Bát tự giúp chuyển dữ liệu sinh thành một bản đồ năng lượng có cấu trúc, hỗ trợ đọc bản mệnh và xu hướng phát triển theo từng giai đoạn.
      </div>
    </>
  );
}

function ModuleMock({ active }: { active: number }) {
  const renderers = [NumerologyMock, TarotMock, TuViMock, MatrixMock, AstroMock, BatTuMock];
  const Mock = renderers[active];
  return <Mock />;
}

export function MysticModuleTabs() {
  const [active, setActive] = useState(0);
  const current = modules[active];

  return (
    <section className="mystic-section" id="roadmap">
      <div className="mystic-container">
        <div className="section-head">
          <p className="section-kicker">6 hệ thống</p>
          <h2>
            Một trung tâm huyền học, sáu <span className="mystic-gradient">cánh cửa luận giải</span>
          </h2>
          <p>(Chọn một hệ thống bên dưới để xem thông tin chi tiết và lộ trình ra mắt.)</p>
        </div>
        <div className="tabs-grid">
          <div>
            <div className="module-tabs" role="tablist" aria-label="Các hệ thống Bản Mệnh">
              {modules.map((item, index) => (
                <button
                  aria-selected={active === index}
                  className={`module-tab ${active === index ? "active" : ""}`}
                  key={item.label}
                  onClick={() => setActive(index)}
                  role="tab"
                  type="button"
                >
                  <span>{active === index ? "✦" : "•"} {item.label}</span>
                  <span
                    className={`status-badge ${
                      index === 0 ? "status-live" : index === 1 ? "status-soon" : "status-planned"
                    }`}
                  >
                    {item.mark}
                  </span>
                </button>
              ))}
            </div>
            <div className="module-copy">
              <h3>{current.title}</h3>
              {"statusLine" in current ? <em className="module-status-line">{current.statusLine}</em> : null}
              <p>{current.text}</p>
              <p className="mt-4 text-sm text-[var(--bm-gold-bright)]">
                ✨ Ưu đãi dành riêng cho những người tham gia sớm.
              </p>
            </div>
          </div>
          <div className="cosmic-window">
            <div className="cosmic-titlebar">
              <span className="cosmic-dot dot-rose" />
              <span className="cosmic-dot dot-gold" />
              <span className="cosmic-dot dot-violet" />
              <span className="ml-3 text-xs text-[var(--bm-text-muted)]">{current.title}</span>
            </div>
            <div className="cosmic-body">
              <ModuleMock active={active} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
