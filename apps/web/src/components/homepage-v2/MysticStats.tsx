"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  {
    value: 50,
    suffix: "+",
    label: "Chỉ số phân tích",
    text: "Giải mã tính cách, tiềm năng và vận trình từ nhiều chiều dữ liệu.",
  },
  {
    value: 1_000_000,
    suffix: "+",
    label: "Tổ hợp luận giải",
    text: "Tạo nên những góc nhìn cá nhân hóa dành riêng cho mỗi người.",
  },
  {
    value: 6,
    suffix: "",
    label: "Lăng kính vũ trụ",
    text: "Hợp nhất sáu trường phái huyền học trong một trải nghiệm thống nhất.",
  },
];

function formatNumber(value: number) {
  return new Intl.NumberFormat("vi-VN").format(value);
}

export function MysticStats() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    const duration = 1300;
    const startedAt = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [hasStarted]);

  return (
    <section className="mystic-section" ref={sectionRef}>
      <div className="mystic-container">
        <div className="section-head">
          <p className="section-kicker">Tổng quan</p>
          <h2>Một hệ sinh thái huyền học toàn diện</h2>
          <p>
            Nơi các trường phái cổ xưa được kết nối trong một nền tảng thống nhất để mang đến những góc nhìn sâu sắc và
            cá nhân hóa.
          </p>
        </div>
        <div className="stats-grid">
          {stats.map((item) => {
            const current = hasStarted ? Math.round(item.value * progress) : 0;
            return (
              <article className="mystic-card hover-lift" key={item.label}>
                <span className="metric">
                  {formatNumber(current)}
                  {item.suffix}
                </span>
                <h3>{item.label}</h3>
                <p>{item.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
