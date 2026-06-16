"use client";

import { useState } from "react";

const modules: Array<{ label: string; href?: string; status?: string }> = [
  { label: "Thần số học", href: "/than-so-hoc" },
  { label: "Tarot", href: "/tarot" },
  { label: "Tử vi", status: "Tính năng Tử vi sắp ra mắt. Hãy theo dõi Bản Mệnh để nhận thông báo khi module được mở." },
  {
    label: "Ma trận",
    status: "Tính năng Ma trận định mệnh sắp ra mắt. Hãy theo dõi Bản Mệnh để cập nhật lộ trình mở module.",
  },
  {
    label: "Bản đồ sao",
    status: "Tính năng Bản đồ sao sắp ra mắt. Hãy theo dõi Bản Mệnh để nhận thông tin khi module sẵn sàng.",
  },
  { label: "Bát tự", status: "Tính năng Bát tự sắp ra mắt. Hãy theo dõi Bản Mệnh để cập nhật thời điểm mở trải nghiệm." },
];

const resources: { label: string; href: string }[] = [
  { label: "Lợi ích", href: "/#loi-ich" },
  { label: "Hành trình", href: "/#roadmap" },
  { label: "Câu hỏi thường gặp", href: "/#faq" },
  { label: "Liên hệ", href: "/support" },
  { label: "Bảo mật", href: "/legal/privacy" },
  { label: "Điều khoản", href: "/legal/terms" },
];

export function MysticFooter() {
  const [notice, setNotice] = useState<string | null>(null);

  return (
    <footer className="mystic-footer">
      <div className="mystic-container">
        <div className="footer-grid">
          <div>
            <h3 className="m-0 text-xl font-black text-white">Bản Mệnh</h3>
            <p className="mt-3 max-w-md leading-relaxed text-[var(--bm-text-muted)]">
              Không gian luận giải huyền học dành cho những ai muốn hiểu bản thân rõ hơn qua nhiều
              lớp dữ liệu: Thần số học, Tarot, Tử vi, Ma trận, Bản đồ sao và Bát tự. Bản Mệnh giữ
              tinh thần tím vàng đặc trưng, trình bày nội dung theo cách dễ theo dõi và mở rộng dần
              từng hệ thống theo lộ trình.
            </p>
          </div>
          <div>
            <strong className="text-white">Hệ thống</strong>
            <div className="footer-list">
              {modules.map((item) =>
                item.href ? (
                  <a href={item.href} key={item.label}>
                    {item.label}
                  </a>
                ) : (
                  <button
                    className="w-fit border-0 bg-transparent p-0 text-left text-[var(--bm-text-muted)] transition-colors hover:text-[var(--bm-primary-soft)]"
                    key={item.label}
                    onClick={() => setNotice(item.status ?? "Tính năng sắp ra mắt. Hãy theo dõi Bản Mệnh để cập nhật.")}
                    type="button"
                  >
                    {item.label}
                  </button>
                ),
              )}
            </div>
            {notice ? (
              <div
                className="module-modal-backdrop"
                onClick={() => setNotice(null)}
                onKeyDown={(event) => {
                  if (event.key === "Escape") setNotice(null);
                }}
                role="presentation"
              >
                <div
                  aria-modal="true"
                  className="module-modal"
                  onClick={(event) => event.stopPropagation()}
                  role="dialog"
                >
                  <button
                    aria-label="Đóng thông báo"
                    className="module-modal-close"
                    onClick={() => setNotice(null)}
                    type="button"
                  >
                    ×
                  </button>
                  <p className="section-kicker">Sắp ra mắt</p>
                  <h2>Tính năng đang được chuẩn bị</h2>
                  <p>{notice}</p>
                </div>
              </div>
            ) : null}
          </div>
          <div>
            <strong className="text-white">Thông tin</strong>
            <div className="footer-list">
              {resources.map((item) => (
                <a href={item.href} key={item.label}>
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-bottom">© 2026 Bản Mệnh. Luận giải để tham khảo, chiêm nghiệm và định hướng.</div>
      </div>
    </footer>
  );
}
