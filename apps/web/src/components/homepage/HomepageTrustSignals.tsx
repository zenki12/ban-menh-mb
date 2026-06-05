import { Card } from "../ui";
import { HOMEPAGE_TRUST } from "./HomepageData";

export function HomepageTrustSignals() {
  return (
    <>
          <section className="hub-trust-grid hub-section">
            {HOMEPAGE_TRUST.map(([icon, title, text]) => (
              <Card as="article" key={title} padding="lg" variant="glass">
                <div className="hub-trust-icon">{icon}</div>
                <h3 className="mt-5 text-center text-lg font-black text-[var(--bm-text-main)]">{title}</h3>
                <p className="mt-3 text-center text-sm leading-relaxed text-[var(--bm-text-soft)]">{text}</p>
              </Card>
            ))}
          </section>

          <p className="hub-footer-note">
            Các hệ biểu tượng chỉ gợi mở xu hướng, không quyết định toàn bộ cuộc đời. Điều quan trọng nhất
            vẫn là cách bạn sống, lựa chọn, rèn luyện và gieo thiện lành mỗi ngày.
            <br />
            <strong className="text-[var(--bm-gold-bright)]">Đức năng thắng số.</strong>
          </p>
    </>
  );
}
