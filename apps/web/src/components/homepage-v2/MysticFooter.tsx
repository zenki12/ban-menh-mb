const modules = ["Thần số học", "Tarot", "Tử vi", "Ma trận", "Bản đồ sao", "Bát tự"];
const resources: { label: string; href: string }[] = [
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Liên hệ", href: "mailto:hello@banmenh.com" },
  { label: "Bảo mật", href: "#" },
  { label: "Điều khoản", href: "#" },
];

export function MysticFooter() {
  return (
    <footer className="mystic-footer">
      <div className="mystic-container">
        <div className="footer-grid">
          <div>
            <h3 className="m-0 text-xl font-black text-white">Bản Mệnh V2</h3>
            <p className="mt-3 max-w-md leading-relaxed text-[var(--bm-text-muted)]">
              Một hub huyền học hiện đại, giữ tinh thần cosmic purple/gold của Bản Mệnh và mở rộng dần qua 6 module.
            </p>
          </div>
          <div>
            <strong className="text-white">Modules</strong>
            <div className="footer-list">
              {modules.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <div>
            <strong className="text-white">Resources</strong>
            <div className="footer-list">
              {resources.map((item) => (
                <a href={item.href} key={item.label}>
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-bottom">© 2026 Bản Mệnh V2. Made with love in Vietnam.</div>
      </div>
    </footer>
  );
}
