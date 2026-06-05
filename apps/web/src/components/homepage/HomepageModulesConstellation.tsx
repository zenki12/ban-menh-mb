import { HOMEPAGE_UNLOCK_DETAILS } from "./HomepageData";

export function HomepageModulesConstellation() {
  return (
          <section className="hub-section">
            <h2 className="text-center text-2xl font-black text-[var(--bm-text-main)]">
              Chi tiết các module bạn có thể mở khóa
            </h2>
            <p className="hub-footer-note !mt-4">
              Mỗi module là một lăng kính riêng biệt, vận hành bởi thuật toán độc quyền và tri thức được biên tập.
            </p>
            <div className="hub-constellation">
              <div className="hub-core">BẢN<br />MỆNH</div>
              {HOMEPAGE_UNLOCK_DETAILS.map(([icon, title, text]) => (
                <div className="hub-node" key={title}>
                  <div className="flex items-center gap-3">
                    <div className="hub-detail-icon">
                      <img alt="" aria-hidden="true" className="hub-detail-logo" src={icon} />
                    </div>
                    <h3 className="text-sm font-bold text-[var(--bm-text-main)]">{title}</h3>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-[var(--bm-text-muted)]">{text}</p>
                </div>
              ))}
            </div>
          </section>
  );
}
