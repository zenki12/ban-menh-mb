"use client";

import { usePathname } from "next/navigation";

const footerColumns = [
  {
    title: "Hệ thống",
    links: [
      { href: "/than-so-hoc", label: "Thần số học" },
      { href: "/tarot", label: "Tarot" },
      { href: "/#roadmap", label: "Tử vi" },
      { href: "/#roadmap", label: "Ma trận" },
      { href: "/#roadmap", label: "Bản đồ sao" },
      { href: "/#roadmap", label: "Bát tự" },
    ],
  },
  {
    title: "Thông tin",
    links: [
      { href: "/#loi-ich", label: "Lợi ích" },
      { href: "/#hanh-trinh", label: "Hành trình" },
      { href: "/#faq", label: "Câu hỏi thường gặp" },
      { href: "/support", label: "Liên hệ" },
      { href: "/legal/privacy", label: "Bảo mật" },
      { href: "/legal/terms", label: "Điều khoản" },
    ],
  },
];

export function Footer() {
  const pathname = usePathname();
  const isModulePage = pathname.startsWith("/than-so-hoc") || pathname.startsWith("/tarot");

  if (isModulePage) {
    return (
      <footer className="border-t border-[var(--bm-border-subtle)] bg-[rgba(10,5,20,0.72)] text-[var(--bm-text-soft)]">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <a className="text-gradient-purple rounded-md text-xl font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bm-primary-soft)]" href="/">
              Bản Mệnh
            </a>
            <p className="mt-1 text-sm text-[var(--bm-text-faint)]">
              © 2026 Bản Mệnh. Luận giải để tham khảo, chiêm nghiệm và định hướng.
            </p>
          </div>
          <nav aria-label="Liên kết chân trang" className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <a className="text-[var(--bm-text-muted)] hover:text-[var(--bm-primary-soft)]" href="/support">
              Liên hệ
            </a>
            <a className="text-[var(--bm-text-muted)] hover:text-[var(--bm-primary-soft)]" href="/legal/privacy">
              Bảo mật
            </a>
            <a className="text-[var(--bm-text-muted)] hover:text-[var(--bm-primary-soft)]" href="/legal/terms">
              Điều khoản
            </a>
          </nav>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-[var(--bm-border-subtle)] bg-[image:var(--bm-gradient-footer)] text-[var(--bm-text-soft)]">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-7 sm:px-8 lg:grid-cols-[1.35fr_0.8fr_0.9fr]">
        <div>
          <a className="text-gradient-purple rounded-md text-2xl font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bm-primary-soft)]" href="/">
            Bản Mệnh
          </a>
          <p className="mt-3 max-w-md leading-7 text-[var(--bm-text-muted)]">
            Không gian luận giải huyền học dành cho những ai muốn hiểu bản thân rõ hơn qua nhiều lớp dữ liệu: Thần số học,
            Tarot, Tử vi, Ma trận, Bản đồ sao và Bát tự. Bản Mệnh giữ tinh thần tím vàng đặc trưng, trình bày nội dung
            theo cách dễ theo dõi và mở rộng dần từng hệ thống theo lộ trình.
          </p>
          <small className="mt-5 block text-[var(--bm-text-faint)]">© 2026 Bản Mệnh. Luận giải để tham khảo, chiêm nghiệm và định hướng.</small>
        </div>

        {footerColumns.map((column) => (
          <div key={column.title}>
            <h4 className="text-lg font-black text-white">{column.title}</h4>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={`${column.title}-${link.label}`}>
                  <a
                    className="text-[var(--bm-text-muted)] transition-colors duration-200 hover:text-[var(--bm-primary-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bm-primary-soft)]"
                    href={link.href}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

    </footer>
  );
}
