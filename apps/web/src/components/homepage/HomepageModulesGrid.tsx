"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "../ui";
import { HOMEPAGE_MODULES } from "./HomepageData";

type HomepageModule = (typeof HOMEPAGE_MODULES)[number];

export function HomepageModulesGrid() {
  const router = useRouter();
  const [comingSoonModule, setComingSoonModule] = useState<HomepageModule | null>(null);

  function handleModuleClick(module: HomepageModule) {
    if (module.href) {
      router.push(module.href);
      return;
    }
    setComingSoonModule(module);
  }

  return (
    <>
          <section className="hub-section">
            <div className="hub-kicker">6 Module</div>
            <h2 className="hub-section-title">Hệ thống tra cứu chuyên sâu</h2>
            <div className="hub-module-grid">
              {HOMEPAGE_MODULES.map((module) => (
                <button
                  aria-label={module.href ? `Mở module ${module.title}` : `${module.title} sắp ra mắt`}
                  className="hub-module-card"
                  data-accent={module.accent}
                  key={module.title}
                  onClick={() => handleModuleClick(module)}
                  type="button"
                >
                  <div className="hub-module-top">
                    <div className="hub-module-logo-shell">
                      <img alt="" aria-hidden="true" className="hub-module-logo" src={module.icon} />
                    </div>
                    <div className="hub-module-status">{module.status}</div>
                  </div>
                  <h3>{module.title}</h3>
                  <p>{module.description}</p>
                  <div className="hub-progress">
                    <span style={{ "--w": module.progress } as CSSProperties} />
                  </div>
                </button>
              ))}
            </div>

            <div className="hub-stats">
              <div>
                <div className="hub-stat-number">50+</div>
                <div className="hub-stat-label">Chỉ số phân tích</div>
              </div>
              <div>
                <div className="hub-stat-number">1.000.000+</div>
                <div className="hub-stat-label">Tổ hợp luận giải</div>
              </div>
              <div>
                <div className="hub-stat-number">6</div>
                <div className="hub-stat-label">Lăng kính vũ trụ</div>
              </div>
            </div>
          </section>
      {comingSoonModule ? (
        <div
          className="hub-coming-soon-backdrop"
          onClick={() => setComingSoonModule(null)}
          role="presentation"
        >
          <div
            aria-modal="true"
            className="hub-coming-soon-dialog"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <div className="hub-coming-soon-icon" aria-hidden="true">✦</div>
            <h2 className="text-2xl font-black text-[var(--bm-text-main)]">Tính năng này sắp ra mắt</h2>
            <p className="mt-4 leading-relaxed text-[var(--bm-text-soft)]">
              Module <strong className="text-[var(--bm-gold-bright)]">{comingSoonModule.title}</strong> đang
              trong lộ trình phát triển. Bạn có thể trải nghiệm Thần số học hoặc Tarot trước trong lúc chờ mở khóa.
            </p>
            <Button className="mt-6" fullWidth onClick={() => setComingSoonModule(null)} variant="primary">
              Đã hiểu
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
