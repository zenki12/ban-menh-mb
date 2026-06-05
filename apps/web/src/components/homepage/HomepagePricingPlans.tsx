import { Button } from "../ui";
import { HOMEPAGE_PLANS } from "./HomepageData";

export function HomepagePricingPlans() {
  return (
          <section className="hub-section">
            <div className="hub-kicker">Lộ trình</div>
            <h2 className="hub-section-title">Chọn lộ trình giải mã bản mệnh</h2>
            <p className="hub-footer-note !mt-6">
              Đầu tư một lần - Thấu hiểu trọn đời. Không AI, không chi phí duy trì hằng tháng.
            </p>
            <div className="hub-pricing-grid">
              {HOMEPAGE_PLANS.map((plan) => (
                <div className="hub-plan" data-variant={plan.variant} key={plan.name}>
                  {plan.variant === "ultra" ? <div className="hub-best">Tiết kiệm nhất</div> : null}
                  <div className="hub-plan-name">{plan.name}</div>
                  <div className="hub-plan-price">{plan.price}</div>
                  <div className="hub-plan-subtitle">{plan.subtitle}</div>
                  <ul>
                    {plan.items.map((item, index) => (
                      <li key={item}>{index === plan.items.length - 1 && plan.variant === "free" ? "🔒" : "✓"} {item}</li>
                    ))}
                  </ul>
                  <Button className="mt-7" fullWidth variant={plan.variant === "ultra" ? "primary" : "secondary"}>
                    {plan.cta}
                  </Button>
                </div>
              ))}
            </div>
          </section>
  );
}
