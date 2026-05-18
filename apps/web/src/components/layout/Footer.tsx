const footerColumns = [
  {
    title: "Modules",
    links: [
      { href: "/than-so-hoc", label: "Thần số học" },
      { href: "/tarot", label: "Tarot" },
      { href: "/tarot", label: "Daily Message" },
    ],
  },
  {
    title: "Hỗ trợ",
    links: [
      { href: "/support", label: "Trợ giúp" },
      { href: "/legal/terms", label: "Điều khoản" },
      { href: "/legal/privacy", label: "Bảo mật" },
    ],
  },
  {
    title: "Liên hệ",
    links: [
      { href: "mailto:support@banmenh.online", label: "Email hỗ trợ" },
      { href: "/support", label: "Telegram hỗ trợ" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--bm-border-subtle)] bg-[image:var(--bm-gradient-footer)] text-[var(--bm-text-soft)]">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <a
            className="text-gradient-purple rounded-md text-2xl font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bm-primary-soft)]"
            href="/"
          >
            Bản Mệnh
          </a>
          <p className="mt-4 max-w-sm text-[var(--bm-text-muted)]">
            Không gian luận giải huyền học được xây dựng mới, rõ module và dễ kiểm soát.
          </p>
          <small className="mt-5 block">© 2026 Bản Mệnh V2.</small>
        </div>

        {footerColumns.map((column) => (
          <div key={column.title}>
            <h4>{column.title}</h4>
            <ul className="mt-4 space-y-3">
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

      <div className="border-t border-[var(--bm-border-subtle)] px-5 py-5 text-center sm:px-8">
        <small>
          Bản Mệnh V2 chỉ cung cấp luận giải tham khảo, không thay thế tư vấn y tế,
          pháp lý hoặc tài chính chuyên nghiệp.
        </small>
      </div>
    </footer>
  );
}
