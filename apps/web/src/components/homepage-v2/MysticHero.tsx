"use client";

import type { CSSProperties } from "react";
import { useState } from "react";

type OrbitModule = {
  label: string;
  src: string;
  alt: string;
  href?: string;
};

const orbitModules: OrbitModule[] = [
  { label: "Thần số", src: "/icons/modules/module-numerology.png", alt: "Thần số học", href: "/than-so-hoc" },
  { label: "Tarot", src: "/icons/modules/module-tarot.png", alt: "Tarot", href: "/tarot" },
  { label: "Tử vi", src: "/icons/modules/module-tuvi.png", alt: "Tử vi" },
  { label: "Ma trận", src: "/icons/modules/module-matrix.png", alt: "Ma trận định mệnh" },
  { label: "Bản đồ sao", src: "/icons/modules/module-astro.png", alt: "Bản đồ sao" },
  { label: "Bát tự", src: "/icons/modules/module-batu.png", alt: "Bát tự" },
];

export function MysticHero() {
  const [noticeModule, setNoticeModule] = useState<string | null>(null);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  return (
    <section className="mystic-hero">
      <div className="mystic-container mystic-hero-grid">
        <div className="mystic-hero-left">
          <div className="mystic-pill">✦ Thuật toán chuẩn xác · Tri thức chuyên gia · Luận giải độc bản</div>
          <h1>
            Khám phá bản thân qua <span className="mystic-gradient">lăng kính vũ trụ</span>
          </h1>
          <p className="mystic-subtitle">
            Bước vào hành trình thấu hiểu chính mình thông qua sự giao thoa của Thần số học, Tarot, Tử vi, Bản đồ sao,
            Ma trận định mệnh và Bát tự. Mỗi luận giải được xây dựng trên nền tảng tri thức huyền học đa chiều, kết hợp
            giữa thuật toán phân tích và nguồn tư liệu chuyên sâu được tuyển chọn, biên tập cẩn trọng nhằm mang đến góc
            nhìn sâu sắc về tính cách, tiềm năng, các mối quan hệ và định hướng tương lai.
          </p>
          <div className="mystic-actions">
            <button className="mystic-btn mystic-btn-primary" type="button" onClick={() => setIsPickerOpen(true)}>
              ✦ Bắt đầu miễn phí →
            </button>
            <a className="mystic-btn mystic-btn-secondary" href="#roadmap">
              Xem 6 hệ thống
            </a>
          </div>
          <div className="mystic-trust">
            <span>✓ Không tạo luận giải tự động theo từng lượt</span>
            <span>✓ Tri thức cổ điển</span>
            <span>✓ Vĩnh viễn</span>
          </div>
        </div>

        <div className="cosmic-window">
          <div className="cosmic-titlebar">
            <span className="cosmic-dot dot-rose" />
            <span className="cosmic-dot dot-gold" />
            <span className="cosmic-dot dot-violet" />
            <span className="ml-3 text-xs text-[var(--bm-text-muted)]">Báo cáo Bản Mệnh</span>
          </div>
          <div className="cosmic-body">
            <div className="orbit-stage" aria-label="Sáu hệ thống Bản Mệnh">
              <div className="orbit-map">
                <div className="orbit-ring" />
                {orbitModules.map((mod, index) => (
                  <div
                    className="orbit-node"
                    key={mod.label}
                    style={
                      {
                        "--angle": `${index * 60}deg`,
                        "--counter-angle": `${index * -60}deg`,
                      } as CSSProperties
                    }
                  >
                    <div className="orbit-node-inner">
                      {mod.href ? (
                        <a className="orbit-action" href={mod.href} aria-label={`Mở hệ thống ${mod.label}`}>
                          <img className="orbit-logo" src={mod.src} alt={mod.alt} />
                          <span className="orbit-label">{mod.label}</span>
                        </a>
                      ) : (
                        <button
                          className="orbit-action"
                          type="button"
                          aria-label={`Xem trạng thái hệ thống ${mod.label}`}
                          onClick={() => setNoticeModule(mod.label)}
                        >
                          <img className="orbit-logo" src={mod.src} alt={mod.alt} />
                          <span className="orbit-label">{mod.label}</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="sigil" aria-hidden="true">
                <svg className="sigil-mark" viewBox="0 0 64 64" focusable="false">
                  <path
                    d="M32 52C19.5 41.2 12 34.2 12 24.7 12 18.1 16.8 13 23 13c3.7 0 7.1 1.8 9 4.7C33.9 14.8 37.3 13 41 13c6.2 0 11 5.1 11 11.7 0 9.5-7.5 16.5-20 27.3Z"
                    fill="currentColor"
                  />
                  <path
                    d="M32 44.4C22.9 36.2 18.4 31.5 18.4 25.3c0-3.6 2.6-6.5 6.2-6.5 3.5 0 5.7 2.6 7.4 5.5 1.7-2.9 3.9-5.5 7.4-5.5 3.6 0 6.2 2.9 6.2 6.5 0 6.2-4.5 10.9-13.6 19.1Z"
                    fill="rgba(20, 15, 35, 0.34)"
                  />
                </svg>
              </div>
            </div>
            <p className="orbit-note">
              Chọn một hệ thống trong vòng tròn phía trên để bắt đầu tra cứu.
            </p>
          </div>
        </div>
      </div>
      {isPickerOpen ? (
        <div className="module-modal-backdrop" role="presentation" onClick={() => setIsPickerOpen(false)}>
          <div
            aria-modal="true"
            className="module-picker-modal cosmic-window"
            role="dialog"
            aria-labelledby="module-picker-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cosmic-titlebar">
              <span className="cosmic-dot dot-rose" />
              <span className="cosmic-dot dot-gold" />
              <span className="cosmic-dot dot-violet" />
              <span className="ml-3 text-xs text-[var(--bm-text-muted)]">Báo cáo Bản Mệnh</span>
              <button className="module-modal-close module-picker-close" type="button" onClick={() => setIsPickerOpen(false)}>
                ×
              </button>
            </div>
            <div className="module-picker-body">
              <p className="section-kicker">Chọn hệ thống</p>
              <h2 id="module-picker-title">Bạn muốn bắt đầu từ hệ thống nào?</h2>
              <p className="module-picker-copy">
                Thần số học đang mở để bạn nhập thông tin và nhận báo cáo. Các hệ thống còn lại sẽ ra mắt theo lộ trình.
              </p>
              <div className="module-picker-grid">
                {orbitModules.map((mod) =>
                  mod.href ? (
                    <a className="module-picker-item module-picker-live" href={mod.href} key={mod.label}>
                      <img src={mod.src} alt={mod.alt} />
                      <span>{mod.label}</span>
                      <strong>Bắt đầu</strong>
                    </a>
                  ) : (
                    <button
                      className="module-picker-item"
                      key={mod.label}
                      type="button"
                      onClick={() => {
                        setIsPickerOpen(false);
                        setNoticeModule(mod.label);
                      }}
                    >
                      <img src={mod.src} alt={mod.alt} />
                      <span>{mod.label}</span>
                      <strong>Sắp ra mắt</strong>
                    </button>
                  ),
                )}
              </div>
              <a className="module-picker-roadmap roadmap-link" href="#roadmap" onClick={() => setIsPickerOpen(false)}>
                Xem lộ trình bên dưới
              </a>
            </div>
          </div>
        </div>
      ) : null}
      {noticeModule ? (
        <div className="module-modal-backdrop" role="presentation" onClick={() => setNoticeModule(null)}>
          <div
            aria-modal="true"
            className="module-modal"
            role="dialog"
            aria-labelledby="module-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="module-modal-close" type="button" onClick={() => setNoticeModule(null)}>
              ×
            </button>
            <p className="section-kicker">Sắp ra mắt</p>
            <h2 id="module-modal-title">{noticeModule}</h2>
            <p>
              Tính năng đang được phát triển và dự kiến sẽ được phát hành trong các phiên bản sắp tới. Vui lòng tham
              khảo{" "}
              <a className="roadmap-link" href="#roadmap" onClick={() => setNoticeModule(null)}>
                lộ trình
              </a>{" "}
              bên dưới để biết thêm chi tiết.
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
