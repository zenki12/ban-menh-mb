export function MysticStyles() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
.mystic-page {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  color: var(--bm-text-main);
  background:
    radial-gradient(circle at 18% 8%, rgba(124,58,237,0.12), transparent 30rem),
    radial-gradient(circle at 82% 18%, rgba(37,99,235,0.10), transparent 32rem),
    radial-gradient(circle at 50% 86%, rgba(251,191,36,0.045), transparent 34rem);
}
.mystic-page * { box-sizing: border-box; }
.mystic-page::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  opacity: 0.36;
  background-image:
    radial-gradient(circle at 7% 18%, rgba(255,255,255,0.88) 0 1px, transparent 1.5px),
    radial-gradient(circle at 13% 62%, rgba(253,224,71,0.78) 0 1.2px, transparent 1.8px),
    radial-gradient(circle at 91% 22%, rgba(125,211,252,0.82) 0 1.1px, transparent 1.7px),
    radial-gradient(circle at 86% 72%, rgba(167,139,250,0.76) 0 1.2px, transparent 1.8px);
  background-position: 0 0, 24px 84px, 0 0, -42px 38px;
  background-size: 118px 118px, 154px 154px, 126px 126px, 168px 168px;
  -webkit-mask-image: linear-gradient(90deg, #000 0 24%, transparent 42% 58%, #000 76% 100%);
  mask-image: linear-gradient(90deg, #000 0 24%, transparent 42% 58%, #000 76% 100%);
  animation: mystic-star-drift 38s linear infinite;
}
.mystic-page::after {
  content: "";
  position: fixed;
  inset: -10%;
  pointer-events: none;
  z-index: 0;
  opacity: 0.10;
  background:
    conic-gradient(from 40deg at 48% 24%, transparent, rgba(124,58,237,0.28), transparent, rgba(251,191,36,0.12), transparent),
    radial-gradient(circle at 70% 40%, rgba(34,211,238,0.12), transparent 20rem);
  filter: blur(34px);
  animation: mystic-nebula 28s ease-in-out infinite alternate;
}
.mystic-page > * { position: relative; z-index: 1; }
@keyframes mystic-star-drift { from { transform: translate3d(0,0,0); } to { transform: translate3d(-120px,90px,0); } }
@keyframes mystic-nebula { from { transform: rotate(-4deg) scale(1); } to { transform: rotate(5deg) scale(1.08); } }
@media (prefers-reduced-motion: reduce) {
  .mystic-page::before, .mystic-page::after { animation: none; }
}
.mystic-container { width: min(1120px, 100%); margin: 0 auto; }
.mystic-section { position: relative; padding: 5rem 1.25rem; }
.mystic-hero { min-height: auto; display: flex; align-items: center; padding: 2.25rem 1.25rem 3rem; position: relative; }
.mystic-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: stretch; }
.numerology-entry-grid { grid-template-columns: minmax(0, 0.88fr) minmax(460px, 1.12fr); gap: 2.4rem; }
.mystic-hero-left { display: flex; flex-direction: column; justify-content: center; }
.mystic-pill {
  display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: min(100%, 39rem); border: 1px solid var(--bm-border-gold); border-radius: 999px;
  color: var(--bm-gold-bright); background: rgba(251, 191, 36, 0.1); padding: 0.6rem 1.1rem; text-align: center; font-size: 0.82rem; font-weight: 800;
}
.mystic-hero h1 { max-width: 560px; margin: 1.2rem 0 0.9rem; font-size: clamp(2.1rem, 4.4vw, 3.9rem); line-height: 1.05; color: white; letter-spacing: -0.01em; font-weight: 900; }
.mystic-gradient { position: relative; display: inline-block; background: linear-gradient(120deg, var(--bm-gold-bright), var(--bm-gold), var(--bm-primary-soft), var(--bm-gold-bright)); background-size: 260% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: title-aura 12s ease-in-out infinite; }
.mystic-gradient::after { content: ""; position: absolute; left: 0.05em; right: 0.05em; bottom: 0.04em; height: 0.08em; border-radius: 999px; background: linear-gradient(90deg, rgba(251, 191, 36, 0), rgba(253, 224, 71, 0.7), rgba(167, 139, 250, 0.55), rgba(251, 191, 36, 0)); opacity: 0.58; filter: blur(1px); animation: title-underline 12s ease-in-out infinite; }
.mystic-subtitle { max-width: 520px; color: var(--bm-text-soft); font-size: 0.98rem; line-height: 1.75; font-style: italic; }
.mystic-actions { display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 2rem; }
.mystic-btn {
  min-height: 3.25rem; display: inline-flex; align-items: center; justify-content: center; padding: 0 1.3rem; border-radius: var(--bm-radius-lg);
  border: 0; font: inherit; font-weight: 800; text-decoration: none; cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}
.mystic-btn:hover { transform: translateY(-2px); }
.mystic-btn-primary { color: #1f1300; background: linear-gradient(135deg, var(--bm-gold-bright), var(--bm-gold)); box-shadow: var(--bm-shadow-gold); }
.mystic-btn-secondary { color: var(--bm-primary-soft); border: 1px solid var(--bm-border-purple); background: rgba(124, 58, 237, 0.12); }
.mystic-trust { display: flex; flex-wrap: wrap; gap: 0.8rem 1rem; margin-top: 1.35rem; color: var(--bm-text-muted); font-size: 0.92rem; }
.cosmic-window { display: flex; flex-direction: column; background: rgba(20, 15, 35, 0.82); border: 1px solid var(--bm-border-purple); border-radius: 14px; overflow: hidden; box-shadow: var(--bm-shadow-purple); }
.cosmic-titlebar { display: flex; align-items: center; gap: 0.45rem; padding: 0.85rem 1rem; border-bottom: 1px solid var(--bm-border-subtle); background: rgba(10, 5, 20, 0.76); }
.cosmic-dot { width: 0.68rem; height: 0.68rem; border-radius: 50%; }
.dot-rose { background: #f472b6; } .dot-gold { background: var(--bm-gold); } .dot-violet { background: var(--bm-primary-soft); }
.cosmic-body { flex: 1; display: flex; flex-direction: column; gap: 0.85rem; padding: 1.2rem 1.4rem 1.35rem; }
.orbit-stage { position: relative; min-height: 370px; display: grid; place-items: center; overflow: visible; border-radius: 1rem; background: radial-gradient(circle at 50% 52%, rgba(251, 191, 36, 0.1), rgba(124, 58, 237, 0.1) 44%, transparent 72%); }
.orbit-map { position: absolute; width: 21.8rem; height: 21.8rem; left: 50%; top: 52%; margin-left: -10.9rem; margin-top: -10.9rem; animation: slow-spin 34s linear infinite; }
.sigil { position: relative; z-index: 2; width: 7.4rem; height: 7.4rem; border: 1px solid var(--bm-border-gold); border-radius: 50%; display: grid; place-items: center; color: var(--bm-gold-bright); font-size: 3.4rem; background: radial-gradient(circle, rgba(253, 224, 71, 0.18), rgba(124, 58, 237, 0.2) 48%, rgba(20, 15, 35, 0.72) 72%); box-shadow: inset 0 0 42px rgba(251, 191, 36, 0.18), 0 0 34px rgba(251, 191, 36, 0.2); animation: sigil-heartbeat 4.8s ease-in-out infinite; }
.sigil::before, .sigil::after { content: ""; position: absolute; inset: 0; border-radius: 50%; border: 1px solid rgba(253, 224, 71, 0.42); pointer-events: none; opacity: 0; }
.sigil::before { animation: sigil-ripple 4.8s ease-out infinite; }
.sigil::after { border-color: rgba(167, 139, 250, 0.46); animation: sigil-ripple 4.8s ease-out infinite 0.55s; }
.sigil-mark { position: relative; z-index: 1; width: 3.8rem; height: 3.8rem; display: block; filter: drop-shadow(0 0 16px rgba(253, 224, 71, 0.65)); animation: sigil-heart-color 4.8s ease-in-out infinite; }
.orbit-ring { position: absolute; inset: 0; border: 1px dashed rgba(251, 191, 36, 0.28); border-radius: 50%; }
.orbit-node { position: absolute; left: 50%; top: 50%; transform: rotate(var(--angle)) translate(10.9rem); transform-origin: 0 0; }
.orbit-node-inner { display: flex; flex-direction: column; align-items: center; justify-content: flex-start; gap: 0.28rem; width: 7rem; margin-left: -3.5rem; margin-top: -2.7rem; text-align: center; color: var(--bm-text-soft); font-size: 0.72rem; transform: rotate(var(--counter-angle)); animation: reverse-spin 34s linear infinite; }
.orbit-action { appearance: none; border: 0; padding: 0; margin: 0; background: transparent; color: inherit; display: flex; flex-direction: column; align-items: center; gap: 0.35rem; text-decoration: none; cursor: pointer; font: inherit; }
.orbit-action:hover .orbit-logo, .orbit-action:focus-visible .orbit-logo { box-shadow: 0 0 26px rgba(253, 224, 71, 0.5); transform: translateY(-2px) scale(1.04); }
.orbit-action:focus-visible { outline: 2px solid var(--bm-gold-bright); outline-offset: 4px; border-radius: var(--bm-radius-lg); }
.orbit-logo { width: 3.75rem; height: 3.75rem; border-radius: 999px; object-fit: cover; border: 1px solid var(--bm-border-gold); background: rgba(13, 8, 29, 0.9); box-shadow: 0 0 18px rgba(124, 58, 237, 0.32); }
.orbit-label { display: block; min-width: max-content; color: white; font-size: 0.74rem; font-weight: 800; line-height: 1.15; text-align: center; white-space: nowrap; text-shadow: 0 1px 8px rgba(0, 0, 0, 0.65); }
.orbit-note { margin: 2.2rem 0 0; border: 1px solid var(--bm-border-gold); border-left: 3px solid var(--bm-gold-bright); border-radius: var(--bm-radius-lg); background: rgba(251, 191, 36, 0.08); padding: 0.78rem 1rem; color: var(--bm-text-soft); font-size: 0.96rem; line-height: 1.55; box-shadow: 0 0 18px rgba(251, 191, 36, 0.08); }
.roadmap-link { color: var(--bm-gold-bright); font-weight: 900; text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 3px; }
.module-modal-backdrop { position: fixed; inset: 0; z-index: 60; display: grid; place-items: center; padding: 1rem; background: rgba(2, 6, 23, 0.58); backdrop-filter: blur(10px); }
.module-modal { position: relative; width: min(31rem, 100%); border: 1px solid var(--bm-border-gold); border-radius: var(--bm-radius-xl); background: linear-gradient(135deg, rgba(20, 15, 35, 0.96), rgba(30, 27, 75, 0.96)); box-shadow: var(--bm-shadow-purple), var(--bm-shadow-gold); padding: 1.35rem 1.4rem 1.45rem; color: var(--bm-text-soft); }
.module-modal h2 { margin: 0.45rem 2rem 0.75rem 0; color: white; font-size: clamp(1.45rem, 5vw, 2.05rem); line-height: 1.15; }
.module-modal p:not(.section-kicker) { margin: 0; color: var(--bm-text-soft); font-size: 1rem; line-height: 1.75; }
.module-modal-close { position: absolute; top: 0.85rem; right: 0.85rem; display: grid; place-items: center; width: 2.25rem; height: 2.25rem; border: 1px solid var(--bm-border-subtle); border-radius: 999px; background: rgba(255, 255, 255, 0.06); color: var(--bm-text-main); font-size: 1.45rem; line-height: 1; cursor: pointer; }
.module-modal-close:hover, .module-modal-close:focus-visible { border-color: var(--bm-border-gold); color: var(--bm-gold-bright); }
.module-picker-modal { width: min(42rem, 100%); max-height: calc(100vh - 2rem); overflow: hidden; }
.module-picker-close { position: static; margin-left: auto; width: 1.9rem; height: 1.9rem; font-size: 1.2rem; }
.module-picker-body { padding: 1.25rem; }
.module-picker-body h2 { margin: 0.45rem 0 0.75rem; color: white; font-size: clamp(1.45rem, 5vw, 2.1rem); line-height: 1.16; }
.module-picker-copy { margin: 0 0 1.1rem; color: var(--bm-text-muted); line-height: 1.75; }
.module-picker-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.8rem; }
.module-picker-item { display: grid; justify-items: center; gap: 0.45rem; min-height: 9.7rem; border: 1px solid var(--bm-border-subtle); border-radius: var(--bm-radius-lg); background: rgba(255, 255, 255, 0.05); color: var(--bm-text-soft); padding: 0.9rem 0.65rem; text-align: center; text-decoration: none; cursor: pointer; font: inherit; transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease; }
.module-picker-item:hover, .module-picker-item:focus-visible { transform: translateY(-2px); border-color: var(--bm-border-gold); box-shadow: var(--bm-shadow-gold); }
.module-picker-item img { width: 3.8rem; height: 3.8rem; border-radius: 999px; object-fit: cover; border: 1px solid var(--bm-border-gold); background: rgba(13, 8, 29, 0.9); }
.module-picker-item span { color: white; font-weight: 900; }
.module-picker-item strong { color: var(--bm-primary-soft); font-size: 0.78rem; }
.module-picker-live strong { color: var(--bm-gold-bright); }
.module-picker-roadmap { display: inline-flex; margin-top: 1rem; }
.tradition-band { padding: 3rem 1.25rem; border-block: 1px solid var(--bm-border-subtle); background: rgba(10, 5, 20, 0.5); }
.tradition-row { display: grid; grid-template-columns: repeat(6, 1fr); gap: 1rem; justify-items: center; }
.tradition-item { color: var(--bm-text-muted); font-weight: 900; letter-spacing: 0.12em; font-size: 0.78rem; text-transform: uppercase; transition: color 0.2s ease; }
.tradition-item:hover { color: var(--bm-gold-bright); }
.section-head { max-width: 760px; margin: 0 auto 2.5rem; text-align: center; }
.section-kicker { color: var(--bm-gold-bright); font-size: 0.78rem; font-weight: 900; letter-spacing: 0.18em; text-transform: uppercase; }
.section-head h2 { margin: 0.75rem 0 1rem; font-size: clamp(1.7rem, 3.2vw, 2.6rem); line-height: 1.15; color: white; font-weight: 900; }
.section-head p { margin: 0; color: var(--bm-text-muted); line-height: 1.75; }
.stats-grid, .pillars-grid, .steps-grid, .benefits-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
.mystic-card, .pricing-card, .faq-item, .cta-banner { border: 1px solid var(--bm-border-subtle); border-radius: var(--bm-radius-xl); background: var(--bm-bg-panel); backdrop-filter: blur(16px); }
.mystic-card { padding: 1.5rem; }
.benefit-card { position: relative; overflow: hidden; min-height: 15.5rem; }
.benefit-card::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 18% 18%, rgba(251, 191, 36, 0.14), transparent 8rem),
    radial-gradient(circle at 84% 18%, rgba(167, 139, 250, 0.12), transparent 9rem);
  opacity: 0.72;
}
.benefit-card > * { position: relative; z-index: 1; }
.benefit-icon {
  border: 1px solid var(--bm-border-gold);
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.16), rgba(124, 58, 237, 0.16));
  box-shadow: 0 0 18px rgba(251, 191, 36, 0.12);
  font-weight: 900;
}
.hover-lift { transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease; }
.hover-lift:hover { transform: translateY(-4px); border-color: var(--bm-border-gold); box-shadow: var(--bm-shadow-gold); }
.metric { display: block; margin-bottom: 0.4rem; font-size: clamp(1.8rem, 3vw, 2.4rem); line-height: 1; font-weight: 900; color: var(--bm-gold-bright); font-variant-numeric: tabular-nums; }
.pillar-icon { display: grid; place-items: center; width: 3.3rem; height: 3.3rem; border-radius: 1rem; margin-bottom: 1rem; background: rgba(251, 191, 36, 0.1); color: var(--bm-gold-bright); font-size: 1.45rem; }
.pillar-icon svg { width: 2rem; height: 2rem; fill: none; stroke: currentColor; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; filter: drop-shadow(0 0 10px rgba(253, 224, 71, 0.28)); }
.mystic-card h3 { margin: 0 0 0.75rem; color: white; font-size: 1.18rem; }
.mystic-card p { margin: 0; color: var(--bm-text-muted); line-height: 1.75; }
.divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.45), rgba(167, 139, 250, 0.5), transparent); }
.tabs-grid { display: grid; grid-template-columns: minmax(0, 0.85fr) minmax(380px, 1.15fr); gap: 2rem; align-items: start; }
.tabs-grid .cosmic-window { min-height: 520px; }
.tabs-grid .cosmic-body { min-height: 460px; }
.module-tabs { display: grid; gap: 0.75rem; }
.module-tab { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 1rem; border: 1px solid var(--bm-border-subtle); border-radius: var(--bm-radius-lg); background: rgba(255, 255, 255, 0.04); color: var(--bm-text-soft); padding: 0.85rem 1rem; cursor: pointer; text-align: left; transition: transform 0.2s ease, border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease; }
.module-tab:hover, .module-tab:focus-visible { transform: translateY(-2px); border-color: var(--bm-border-gold); background: rgba(251, 191, 36, 0.08); box-shadow: 0 0 20px rgba(251, 191, 36, 0.1); }
.module-tab.active { border-color: var(--bm-border-gold); background: rgba(251, 191, 36, 0.1); color: white; }
.module-tab span:first-child { display: inline-flex; align-items: center; gap: 0.55rem; font-weight: 800; }
.status-badge { display: inline-flex; align-items: center; gap: 0.35rem; border: 1px solid var(--bm-border-purple); border-radius: 999px; padding: 0.25rem 0.55rem; color: var(--bm-primary-soft); font-size: 0.7rem; font-weight: 900; white-space: nowrap; }
.status-badge::before { content: ""; width: 0.48rem; height: 0.48rem; border-radius: 999px; background: currentColor; box-shadow: 0 0 10px currentColor; }
.status-live { color: #22c55e; border-color: rgba(34, 197, 94, 0.55); background: rgba(34, 197, 94, 0.08); }
.status-soon { color: #f59e0b; border-color: rgba(245, 158, 11, 0.55); background: rgba(245, 158, 11, 0.08); }
.status-planned { color: var(--bm-primary-soft); border-color: var(--bm-border-purple); background: rgba(124, 58, 237, 0.1); }
.module-copy { margin-top: 1rem; padding: 1.1rem; border-radius: var(--bm-radius-lg); border: 1px solid var(--bm-border-subtle); background: rgba(255, 255, 255, 0.04); }
.module-copy h3 { margin: 0 0 0.6rem; color: white; }
.module-status-line { display: block; margin: -0.15rem 0 0.65rem; color: var(--bm-gold-bright); font-size: 0.95rem; }
.module-copy p { margin: 0; color: var(--bm-text-muted); line-height: 1.75; }
.mock-grid { display: grid; gap: 0.8rem; }
.mock-line { display: flex; justify-content: space-between; gap: 1rem; padding: 0.7rem 0; border-bottom: 1px solid var(--bm-border-subtle); color: var(--bm-text-soft); }
.mock-line strong { color: white; }
.numerology-preview-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.65rem; margin-top: 0.82rem; }
.numerology-preview-grid div { border: 1px solid var(--bm-border-subtle); border-radius: var(--bm-radius-lg); background: rgba(255, 255, 255, 0.04); padding: 0.72rem; }
.numerology-preview-grid strong { display: block; color: var(--bm-gold-bright); font-size: 0.86rem; margin-bottom: 0.4rem; }
.numerology-preview-grid span { display: block; color: var(--bm-text-muted); font-size: 0.78rem; line-height: 1.55; }
.numerology-insight { margin-top: 0.75rem; border-left: 3px solid var(--bm-primary-soft); border-radius: var(--bm-radius-lg); background: rgba(124, 58, 237, 0.1); padding: 0.72rem 0.9rem; color: var(--bm-text-soft); font-size: 0.88rem; line-height: 1.58; }
.module-insight { margin-top: 0.82rem; border-left: 3px solid currentColor; border-radius: var(--bm-radius-lg); padding: 0.78rem 0.95rem; color: var(--bm-text-soft); font-size: 0.9rem; line-height: 1.65; }
.module-insight-live { border-color: rgba(34, 197, 94, 0.72); background: rgba(34, 197, 94, 0.09); box-shadow: inset 3px 0 0 rgba(34, 197, 94, 0.72), 0 0 18px rgba(34, 197, 94, 0.08); }
.module-insight-soon { border-color: rgba(245, 158, 11, 0.76); background: rgba(245, 158, 11, 0.09); box-shadow: inset 3px 0 0 rgba(245, 158, 11, 0.76), 0 0 18px rgba(245, 158, 11, 0.08); }
.module-insight-planned { border-color: rgba(167, 139, 250, 0.72); background: rgba(124, 58, 237, 0.1); box-shadow: inset 3px 0 0 rgba(167, 139, 250, 0.72), 0 0 18px rgba(124, 58, 237, 0.08); }
.chip-row { display: flex; flex-wrap: wrap; gap: 0.55rem; margin: 0.8rem 0; }
.mystic-chip { border: 1px solid var(--bm-border-gold); border-radius: 999px; padding: 0.45rem 0.65rem; color: var(--bm-gold-bright); background: rgba(251, 191, 36, 0.08); font-size: 0.82rem; }
.tarot-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; }
.tarot-card { min-height: 150px; display: grid; place-items: center; border: 1px solid var(--bm-border-purple); border-radius: 0.85rem; background: linear-gradient(160deg, rgba(124, 58, 237, 0.24), rgba(251, 191, 36, 0.08)); color: var(--bm-gold-bright); text-align: center; }
.tarot-feature-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.7rem; margin-top: 1rem; }
.tarot-feature-grid div { border: 1px solid var(--bm-border-subtle); border-radius: var(--bm-radius-lg); background: rgba(124, 58, 237, 0.1); padding: 0.78rem; }
.tarot-feature-grid strong { display: block; color: var(--bm-gold-bright); font-size: 0.84rem; margin-bottom: 0.38rem; }
.tarot-feature-grid span { display: block; color: var(--bm-text-muted); font-size: 0.78rem; line-height: 1.55; }
.tarot-combo-note { margin-top: 0.85rem; border-left: 3px solid var(--bm-gold-bright); border-radius: var(--bm-radius-lg); background: rgba(251, 191, 36, 0.08); padding: 0.82rem 0.95rem; color: var(--bm-text-soft); font-size: 0.9rem; line-height: 1.65; }
.palace-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; }
.palace, .pillar-cell { border: 1px solid var(--bm-border-subtle); border-radius: 0.65rem; padding: 0.8rem 0.4rem; text-align: center; color: var(--bm-text-soft); background: rgba(255, 255, 255, 0.04); }
.palace-active { border-color: var(--bm-border-gold); color: var(--bm-gold-bright); background: rgba(251, 191, 36, 0.1); box-shadow: 0 0 18px rgba(251, 191, 36, 0.12); font-weight: 900; }
.tuvi-star-row { display: flex; flex-wrap: wrap; gap: 0.55rem; margin-top: 0.9rem; }
.tuvi-star-row span { border: 1px solid var(--bm-border-gold); border-radius: 999px; background: rgba(251, 191, 36, 0.08); color: var(--bm-gold-bright); padding: 0.42rem 0.62rem; font-size: 0.78rem; font-weight: 800; }
.tuvi-cycle-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.55rem; margin-top: 0.8rem; }
.tuvi-cycle-row span { border: 1px solid var(--bm-border-purple); border-radius: var(--bm-radius-lg); background: rgba(124, 58, 237, 0.1); color: var(--bm-text-soft); padding: 0.65rem 0.5rem; text-align: center; font-size: 0.84rem; font-weight: 800; }
.tuvi-note { margin-top: 0.8rem; border-left: 3px solid var(--bm-gold-bright); border-radius: var(--bm-radius-lg); background: rgba(251, 191, 36, 0.08); padding: 0.75rem 0.9rem; color: var(--bm-text-soft); font-size: 0.9rem; line-height: 1.6; }
.matrix-map { position: relative; min-height: 275px; display: grid; place-items: center; border-radius: var(--bm-radius-xl); background: radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.12), rgba(124, 58, 237, 0.1) 34%, transparent 70%); }
.matrix-map::before, .matrix-map::after { content: ""; position: absolute; border: 1px solid rgba(167, 139, 250, 0.18); border-radius: 999px; pointer-events: none; }
.matrix-map::before { width: 72%; height: 72%; }
.matrix-map::after { width: 46%; height: 46%; border-color: rgba(251, 191, 36, 0.18); }
.matrix-diamond { position: relative; z-index: 2; width: 8.6rem; aspect-ratio: 1; margin: 0 auto; display: grid; place-items: center; background: conic-gradient(from 45deg, transparent 0 12%, rgba(251, 191, 36, 0.28) 12% 38%, transparent 38% 62%, rgba(124, 58, 237, 0.24) 62% 88%, transparent 88%); transform: rotate(45deg); border: 1px solid var(--bm-border-gold); border-radius: 1.1rem; box-shadow: 0 0 28px rgba(251, 191, 36, 0.16); }
.matrix-diamond span { transform: rotate(-45deg); color: white; font-size: 2.2rem; font-weight: 900; }
.matrix-node { position: absolute; z-index: 3; width: 10.4rem; border: 1px solid var(--bm-border-subtle); border-radius: var(--bm-radius-lg); background: rgba(20, 15, 35, 0.78); padding: 0.7rem 0.78rem; box-shadow: 0 0 18px rgba(124, 58, 237, 0.12); }
.matrix-node strong { display: block; color: var(--bm-gold-bright); font-size: 0.82rem; margin-bottom: 0.28rem; }
.matrix-node span { display: block; color: var(--bm-text-muted); font-size: 0.75rem; line-height: 1.45; }
.matrix-node-core { left: 0; top: 1rem; }
.matrix-node-mission { right: 0; top: 1rem; }
.matrix-node-lesson { left: 0; bottom: 1rem; }
.matrix-node-potential { right: 0; bottom: 1rem; }
.matrix-chip-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.55rem; margin-top: 0.85rem; }
.matrix-chip-row span { border: 1px solid var(--bm-border-gold); border-radius: 999px; background: rgba(251, 191, 36, 0.08); color: var(--bm-gold-bright); padding: 0.42rem 0.62rem; font-size: 0.78rem; font-weight: 800; }
.matrix-note { margin-top: 0.82rem; border-left: 3px solid var(--bm-primary-soft); border-radius: var(--bm-radius-lg); background: rgba(124, 58, 237, 0.1); padding: 0.78rem 0.95rem; color: var(--bm-text-soft); font-size: 0.9rem; line-height: 1.65; }
.astro-map { position: relative; min-height: 270px; display: grid; place-items: center; border-radius: var(--bm-radius-xl); background: radial-gradient(circle at 50% 50%, rgba(96, 165, 250, 0.12), rgba(124, 58, 237, 0.11) 40%, transparent 74%); overflow: hidden; }
.astro-map::before { content: ""; position: absolute; width: 78%; height: 78%; border-radius: 50%; background: repeating-conic-gradient(rgba(251, 191, 36, 0.18) 0 1deg, transparent 1deg 30deg); opacity: 0.36; animation: astro-spin 42s linear infinite; }
.astro-chart { position: relative; z-index: 3; width: 9.4rem; aspect-ratio: 1; border-radius: 50%; border: 1px solid var(--bm-border-gold); background: radial-gradient(circle, rgba(251, 191, 36, 0.2), rgba(124, 58, 237, 0.22) 58%, rgba(20, 15, 35, 0.72)); display: grid; place-items: center; color: var(--bm-gold-bright); text-align: center; box-shadow: 0 0 30px rgba(96, 165, 250, 0.18); overflow: hidden; }
.astro-chart::before { content: ""; position: absolute; inset: 0; border-radius: 50%; background: repeating-conic-gradient(rgba(251, 191, 36, 0.22) 0 1deg, transparent 1deg 30deg); animation: astro-spin 28s linear infinite; }
.astro-chart span { position: relative; z-index: 1; display: block; font-size: 2rem; line-height: 1; }
.astro-chart strong { position: relative; z-index: 1; display: block; margin-top: -1.8rem; color: white; font-size: 0.84rem; }
.astro-orbit { position: absolute; border: 1px solid rgba(167, 139, 250, 0.2); border-radius: 50%; pointer-events: none; }
.astro-orbit-one { width: 72%; height: 72%; animation: astro-spin 34s linear infinite; }
.astro-orbit-two { width: 48%; height: 48%; border-color: rgba(251, 191, 36, 0.2); animation: astro-spin-reverse 26s linear infinite; }
.astro-point { position: absolute; z-index: 4; border: 1px solid var(--bm-border-subtle); border-radius: 999px; background: rgba(20, 15, 35, 0.82); color: var(--bm-text-soft); padding: 0.45rem 0.65rem; font-size: 0.78rem; font-weight: 800; box-shadow: 0 0 18px rgba(124, 58, 237, 0.12); animation: astro-float 7s ease-in-out infinite; }
.astro-point-sun { top: 1.1rem; left: 10%; color: var(--bm-gold-bright); border-color: var(--bm-border-gold); }
.astro-point-moon { right: 8%; top: 37%; animation-delay: -2.2s; }
.astro-point-asc { left: 13%; bottom: 1.25rem; animation-delay: -4.4s; }
.astro-feature-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.7rem; margin-top: 0.85rem; }
.astro-feature-grid div { border: 1px solid var(--bm-border-subtle); border-radius: var(--bm-radius-lg); background: rgba(96, 165, 250, 0.07); padding: 0.78rem; }
.astro-feature-grid strong { display: block; color: var(--bm-gold-bright); font-size: 0.82rem; margin-bottom: 0.38rem; }
.astro-feature-grid span { display: block; color: var(--bm-text-muted); font-size: 0.76rem; line-height: 1.55; }
.astro-note { margin-top: 0.82rem; border-left: 3px solid #60a5fa; border-radius: var(--bm-radius-lg); background: rgba(96, 165, 250, 0.09); padding: 0.78rem 0.95rem; color: var(--bm-text-soft); font-size: 0.9rem; line-height: 1.65; }
.batu-board { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 0.85rem; align-items: stretch; }
.batu-pillar-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.55rem; }
.batu-pillar { min-height: 8.5rem; display: grid; align-content: center; gap: 0.35rem; border: 1px solid var(--bm-border-gold); border-radius: var(--bm-radius-lg); background: linear-gradient(180deg, rgba(251, 191, 36, 0.12), rgba(124, 58, 237, 0.1)); text-align: center; box-shadow: 0 0 18px rgba(251, 191, 36, 0.08); }
.batu-pillar span { color: var(--bm-text-muted); font-size: 0.76rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; }
.batu-pillar strong { color: var(--bm-gold-bright); font-size: 1.18rem; }
.batu-pillar em { color: white; font-size: 0.95rem; font-style: normal; font-weight: 800; }
.batu-balance { display: grid; gap: 0.48rem; border: 1px solid var(--bm-border-subtle); border-radius: var(--bm-radius-lg); background: rgba(255, 255, 255, 0.04); padding: 0.85rem; }
.batu-element { display: grid; grid-template-columns: 2.6rem 1fr; gap: 0.55rem; align-items: center; }
.batu-element span { color: var(--bm-text-soft); font-size: 0.78rem; font-weight: 800; }
.batu-element div { height: 0.52rem; border-radius: 999px; background: rgba(255, 255, 255, 0.1); overflow: hidden; }
.batu-element i { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, var(--bm-primary), var(--bm-gold-bright)); box-shadow: 0 0 12px rgba(251, 191, 36, 0.18); }
.batu-feature-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.7rem; margin-top: 0.85rem; }
.batu-feature-grid div { border: 1px solid var(--bm-border-subtle); border-radius: var(--bm-radius-lg); background: rgba(251, 191, 36, 0.06); padding: 0.78rem; }
.batu-feature-grid strong { display: block; color: var(--bm-gold-bright); font-size: 0.82rem; margin-bottom: 0.38rem; }
.batu-feature-grid span { display: block; color: var(--bm-text-muted); font-size: 0.76rem; line-height: 1.55; }
.batu-note { margin-top: 0.82rem; border-left: 3px solid var(--bm-gold-bright); border-radius: var(--bm-radius-lg); background: rgba(251, 191, 36, 0.08); padding: 0.78rem 0.95rem; color: var(--bm-text-soft); font-size: 0.9rem; line-height: 1.65; }
.unlock-packages-toggle {
  position: relative;
  overflow: hidden;
  width: min(860px, 100%);
  min-height: 4rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border: 1px solid var(--bm-border-gold);
  border-radius: var(--bm-radius-xl);
  background:
    radial-gradient(circle at 8% 50%, rgba(253, 224, 71, 0.2), transparent 13rem),
    linear-gradient(135deg, rgba(251, 191, 36, 0.16), rgba(124, 58, 237, 0.2), rgba(20, 15, 35, 0.78));
  color: var(--bm-gold-bright);
  padding: 0.95rem 1.25rem;
  font: inherit;
  font-size: 0.9rem;
  font-weight: 900;
  letter-spacing: 0.16em;
  text-align: left;
  cursor: pointer;
  box-shadow: 0 0 24px rgba(251, 191, 36, 0.12), inset 0 0 24px rgba(251, 191, 36, 0.05);
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}
.unlock-packages-toggle::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(100deg, transparent, rgba(253, 224, 71, 0.16), transparent);
  transform: translateX(-120%);
  animation: unlock-sheen 7s ease-in-out infinite;
}
.unlock-packages-toggle:hover,
.unlock-packages-toggle:focus-visible {
  transform: translateY(-2px);
  border-color: var(--bm-gold-bright);
  box-shadow: var(--bm-shadow-gold);
}
.unlock-packages-title, .unlock-packages-meta { position: relative; z-index: 1; display: inline-flex; align-items: center; gap: 0.65rem; }
.unlock-packages-title { text-transform: uppercase; }
.unlock-packages-spark {
  display: grid;
  place-items: center;
  width: 2.2rem;
  height: 2.2rem;
  border: 1px solid var(--bm-border-gold);
  border-radius: 999px;
  background: rgba(251, 191, 36, 0.12);
  color: white;
  font-size: 1rem;
  box-shadow: 0 0 18px rgba(253, 224, 71, 0.2);
}
.unlock-packages-meta {
  color: var(--bm-text-soft);
  font-size: 0.76rem;
  letter-spacing: 0;
  text-transform: none;
}
.unlock-packages-chevron {
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  flex: 0 0 auto;
  border: 1px solid var(--bm-border-gold);
  border-radius: 999px;
  background: rgba(251, 191, 36, 0.1);
  color: white;
  line-height: 1;
  transition: transform 0.22s ease;
}
.unlock-packages-chevron.open { transform: rotate(180deg); }
.unlock-packages-panel { margin-top: 1rem; }
.pricing-card { max-width: 860px; margin: 0 auto; padding: 2rem; display: grid; grid-template-columns: 1fr auto; gap: 2rem; align-items: center; }
.pricing-card h2 { margin: 0.6rem 0 0.55rem; color: white; font-size: clamp(1.8rem, 3vw, 2.5rem); line-height: 1.15; font-weight: 900; }
.pricing-copy { margin: 0; color: var(--bm-text-soft); line-height: 1.75; }
.price { color: var(--bm-gold-bright); font-size: 3rem; font-weight: 900; }
.feature-list { display: grid; gap: 0.7rem; margin: 1.1rem 0 0; padding: 0; list-style: none; color: var(--bm-text-soft); }
.early-note { margin: 1rem 0 0; color: var(--bm-text-soft); line-height: 1.65; }
.pricing-action { display: grid; justify-items: start; gap: 0.8rem; min-width: 15rem; }
.pricing-action p { margin: 0; color: var(--bm-text-soft); }
.step-number { width: 2.4rem; height: 2.4rem; display: grid; place-items: center; border-radius: 0.8rem; color: #1f1300; background: var(--bm-gold-bright); font-weight: 900; margin-bottom: 1rem; }
.faq-list { max-width: 860px; margin: 0 auto; display: grid; gap: 0.8rem; }
.faq-button { width: 100%; border: 0; border-radius: inherit; background: transparent; color: white; display: flex; justify-content: space-between; gap: 1rem; padding: 1.15rem 1.25rem; text-align: left; cursor: pointer; font-weight: 800; transition: background-color 0.2s ease, color 0.2s ease; }
.faq-button:hover, .faq-button:focus-visible { background: rgba(251, 191, 36, 0.07); color: var(--bm-gold-bright); }
.faq-icon { color: var(--bm-gold-bright); transition: transform 0.2s ease; }
.faq-icon.open { transform: rotate(180deg); }
.faq-answer { padding: 0 1.25rem 1.2rem; color: var(--bm-text-muted); line-height: 1.75; }
.cta-banner { padding: clamp(2rem, 5vw, 4rem); text-align: center; background: linear-gradient(135deg, rgba(251, 191, 36, 0.18), rgba(124, 58, 237, 0.24), rgba(192, 38, 211, 0.14)); }
.cta-banner h2 { margin: 0 0 1rem; font-size: clamp(1.9rem, 3.6vw, 3rem); color: white; font-weight: 900; }
.mystic-footer { padding: 3rem 1.25rem 2rem; border-top: 1px solid var(--bm-border-subtle); background: rgba(10, 5, 20, 0.78); }
.footer-grid { display: grid; grid-template-columns: 1.25fr 1fr 1fr; gap: 2rem; }
.footer-list { display: grid; gap: 0.65rem; margin-top: 1rem; }
.footer-list a, .footer-list span { color: var(--bm-text-muted); text-decoration: none; }
.footer-bottom { margin-top: 2rem; padding-top: 1.25rem; border-top: 1px solid var(--bm-border-subtle); color: var(--bm-text-faint); font-size: 0.88rem; }
@keyframes slow-spin { to { transform: rotate(360deg); } }
@keyframes reverse-spin { to { transform: rotate(calc(var(--counter-angle) - 360deg)); } }
@keyframes sigil-heartbeat { 0%, 100% { transform: scale(1); border-color: var(--bm-border-gold); box-shadow: inset 0 0 42px rgba(251, 191, 36, 0.18), 0 0 30px rgba(251, 191, 36, 0.18); } 10% { transform: scale(1.12); border-color: rgba(253, 224, 71, 0.72); box-shadow: inset 0 0 62px rgba(253, 224, 71, 0.28), 0 0 64px rgba(253, 224, 71, 0.38); } 20% { transform: scale(0.98); } 30% { transform: scale(1.075); border-color: rgba(167, 139, 250, 0.72); box-shadow: inset 0 0 58px rgba(167, 139, 250, 0.28), 0 0 56px rgba(167, 139, 250, 0.34); } 44% { transform: scale(1); } }
@keyframes sigil-ripple { 0% { opacity: 0; transform: scale(0.72); } 10% { opacity: 0.78; } 42% { opacity: 0; transform: scale(2.25); } 100% { opacity: 0; transform: scale(2.25); } }
@keyframes sigil-heart-color { 0%, 100% { color: var(--bm-gold-bright); filter: drop-shadow(0 0 16px rgba(253, 224, 71, 0.65)); } 10% { color: #fff7ad; filter: drop-shadow(0 0 26px rgba(253, 224, 71, 0.88)); } 30% { color: var(--bm-primary-soft); filter: drop-shadow(0 0 24px rgba(167, 139, 250, 0.85)); } 44% { color: var(--bm-gold-bright); } }
@keyframes title-aura { 0%, 100% { background-position: 0% 50%; filter: drop-shadow(0 0 0 rgba(253, 224, 71, 0)); } 50% { background-position: 100% 50%; filter: drop-shadow(0 0 18px rgba(253, 224, 71, 0.18)); } }
@keyframes title-underline { 0%, 100% { opacity: 0.42; transform: scaleX(0.82); } 50% { opacity: 0.8; transform: scaleX(1); } }
@keyframes astro-spin { to { transform: rotate(360deg); } }
@keyframes astro-spin-reverse { to { transform: rotate(-360deg); } }
@keyframes astro-float { 0%, 100% { transform: translate3d(0, 0, 0); } 50% { transform: translate3d(0, -6px, 0); } }
@keyframes unlock-sheen { 0%, 72%, 100% { transform: translateX(-120%); } 86% { transform: translateX(120%); } }
@media (prefers-reduced-motion: reduce) { .orbit-map, .orbit-node-inner, .sigil, .sigil::before, .sigil::after, .sigil-mark, .mystic-gradient, .mystic-gradient::after, .astro-map::before, .astro-chart::before, .astro-orbit, .astro-point, .unlock-packages-toggle::before { animation: none; } }
@media (max-width: 900px) {
  .mystic-hero-grid, .tabs-grid, .pricing-card, .footer-grid { grid-template-columns: 1fr; }
  .stats-grid, .pillars-grid, .steps-grid, .benefits-grid { grid-template-columns: 1fr; }
  .tradition-row { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 560px) {
  .mystic-section { padding: 3.5rem 1rem; }
  .mystic-hero { min-height: auto; padding: 2.25rem 1rem 2.5rem; }
  .mystic-hero h1 { font-size: clamp(1.9rem, 8vw, 2.6rem); }
  .mystic-actions { flex-direction: column; }
  .mystic-btn { width: 100%; }
  .unlock-packages-toggle { align-items: flex-start; flex-direction: column; }
  .unlock-packages-meta { width: 100%; justify-content: space-between; }
  .module-tabs { display: flex; overflow-x: auto; padding-bottom: 0.35rem; scroll-snap-type: x mandatory; }
  .module-tab { min-width: 13rem; scroll-snap-align: start; }
  .tradition-row, .tarot-row, .palace-grid { grid-template-columns: 1fr 1fr; }
  .orbit-stage { min-height: 318px; }
  .orbit-map { width: 16.8rem; height: 16.8rem; top: 52%; margin-left: -8.4rem; margin-top: -8.4rem; }
  .orbit-node { transform: rotate(var(--angle)) translate(8.4rem); }
  .orbit-node-inner { width: 5.9rem; margin-left: -2.95rem; margin-top: -2.4rem; }
  .orbit-logo { width: 3.05rem; height: 3.05rem; }
  .orbit-label { font-size: 0.68rem; }
  .orbit-note { margin-top: 1.5rem; }
  .module-modal-backdrop { align-items: end; padding: 1rem; }
  .module-modal { max-height: calc(100vh - 2rem); overflow-y: auto; padding: 1.2rem 1.1rem 1.25rem; }
  .module-picker-modal { max-height: calc(100vh - 2rem); }
  .module-picker-body { padding: 1rem; overflow-y: auto; }
  .module-picker-grid { grid-template-columns: repeat(2, 1fr); gap: 0.7rem; }
  .module-picker-item { min-height: 8.4rem; padding: 0.75rem 0.5rem; }
  .module-picker-item img { width: 3.2rem; height: 3.2rem; }
  .numerology-preview-grid { grid-template-columns: 1fr; }
  .tarot-feature-grid { grid-template-columns: 1fr; }
  .matrix-map { min-height: auto; align-items: stretch; gap: 0.7rem; }
  .matrix-map::before, .matrix-map::after { display: none; }
  .matrix-diamond { width: 7.6rem; margin-bottom: 0.2rem; }
  .matrix-node { position: static; width: 100%; }
  .matrix-node-core { order: 1; }
  .matrix-node-mission { order: 2; }
  .matrix-node-lesson { order: 3; }
  .matrix-node-potential { order: 4; }
  .astro-map { min-height: 235px; }
  .astro-feature-grid { grid-template-columns: 1fr; }
  .astro-point { font-size: 0.72rem; padding: 0.38rem 0.5rem; }
  .batu-board { grid-template-columns: 1fr; }
  .batu-pillar-grid { grid-template-columns: repeat(2, 1fr); }
  .batu-pillar { min-height: 6.7rem; }
  .batu-feature-grid { grid-template-columns: 1fr; }
}
        `,
      }}
    />
  );
}
