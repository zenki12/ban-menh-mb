# Bản Mệnh V2 Design Extraction Spec

Ngày cập nhật: 2026-05-16

## 1. Mục tiêu

Giữ lại cảm giác giao diện của Bản Mệnh/V1 nhưng rebuild thành design system mới cho Bản Mệnh V2. File này chỉ mô tả visual language, không mô tả business logic, workflow, API, payment, voucher, route cũ hoặc state cũ.

## 2. Source files đã rà soát

| Priority | File | Vai trò |
|---:|---|---|
| P0 | `E:\huyen hoc AI\test\demo-premium-ui.html` | Premium mystical visual, hero galaxy, glass card, module grid, pricing |
| P0 | `E:\huyen hoc AI\test\numerology_core\style.css` | Visual language thực tế: dashboard, form, paywall, report, footer |
| P1 | `E:\huyen hoc AI\test\demo-design-system.html` | Pattern theo hướng shadcn/Tailwind: button, badge, card, input |
| P1 | `E:\huyen hoc AI\test\Antigravity\khamphabanthan\style.css` | Hero, report layout, mandala summary, chart/card treatment |

## 3. Không được extract

- Không copy JS route/view switching cũ.
- Không copy payment/voucher/auth/admin logic cũ.
- Không copy API endpoint, localStorage key, Firebase/Worker cũ.
- Không copy toàn bộ CSS nguyên khối vào V2.
- Không đưa KB/raw private content vào frontend/public/static.
- Không giữ nội dung text bị lỗi encoding từ demo cũ.

## 4. Visual Direction

Bản Mệnh V2 dùng phong cách `premium mystical SaaS`: tối, sâu, có chiều không gian, nhưng phải rõ chữ và đủ sạch để thương mại hóa.

Từ khóa visual:

- Deep space.
- Galaxy / star field.
- Glass panels.
- Purple-violet primary.
- Gold/yellow accent cho premium/important.
- Blue-indigo cho report/analysis.
- Green cho success/unlock.
- Red chỉ dùng cho error/destructive.
- Motion nhẹ, không làm rối hoặc che chữ.

## 5. Design Tokens V2

### 5.1 Color Tokens

```css
:root {
  --bm-bg-void: #020617;
  --bm-bg-deep: #0a0514;
  --bm-bg-indigo: #1e1b4b;
  --bm-bg-panel: rgba(20, 15, 35, 0.72);
  --bm-bg-glass: rgba(255, 255, 255, 0.04);
  --bm-bg-glass-strong: rgba(255, 255, 255, 0.07);

  --bm-text-main: #f8fafc;
  --bm-text-soft: #e2e8f0;
  --bm-text-muted: #94a3b8;
  --bm-text-faint: rgba(255, 255, 255, 0.5);

  --bm-primary: #7c3aed;
  --bm-primary-hover: #6d28d9;
  --bm-primary-soft: #a78bfa;
  --bm-primary-dark: #4f46e5;

  --bm-magenta: #c026d3;
  --bm-magenta-hover: #a21caf;

  --bm-gold: #fbbf24;
  --bm-gold-bright: #fde047;
  --bm-gold-dark: #ca8a04;

  --bm-blue: #3b82f6;
  --bm-blue-deep: #1e3a8a;
  --bm-cyan: #7dd3fc;

  --bm-success: #059669;
  --bm-success-soft: #34d399;
  --bm-warning: #f59e0b;
  --bm-danger: #ef4444;
  --bm-danger-soft: #fca5a5;

  --bm-border-subtle: rgba(255, 255, 255, 0.10);
  --bm-border-strong: rgba(255, 255, 255, 0.15);
  --bm-border-purple: rgba(167, 139, 250, 0.45);
  --bm-border-gold: rgba(251, 191, 36, 0.35);
}
```

### 5.2 Gradient Tokens

```css
--bm-gradient-bg:
  radial-gradient(ellipse 80% 80% at 50% -20%, rgba(120, 40, 200, 0.35), transparent),
  radial-gradient(ellipse 60% 60% at 80% 80%, rgba(30, 80, 200, 0.20), transparent),
  radial-gradient(ellipse 40% 40% at 20% 60%, rgba(200, 80, 120, 0.15), transparent),
  #020617;

--bm-gradient-primary: linear-gradient(135deg, #a21caf 0%, #7c3aed 100%);
--bm-gradient-primary-blue: linear-gradient(135deg, #7c3aed, #4f46e5);
--bm-gradient-purple-text: linear-gradient(135deg, #a78bfa, #60a5fa, #f472b6);
--bm-gradient-gold-text: linear-gradient(135deg, #fbbf24, #f59e0b, #fde68a);
--bm-gradient-report: linear-gradient(135deg, #0a0f2e 0%, #1a2460 100%);
--bm-gradient-footer: linear-gradient(135deg, #0a0f2e 0%, #0f172a 100%);
```

### 5.3 Typography

| Role | Font | Rule |
|---|---|---|
| UI/body | Inter, system-ui, sans-serif | Default toàn app |
| Hero/brand accent | Playfair Display hoặc Lora | Chỉ dùng cho hero, tagline, mystical accent |
| Report body | Inter | Ưu tiên dễ đọc, không lạm dụng serif |
| Number/metric | Inter 700/800/900 | Rõ, chắc, không negative letter spacing |

Typography scale đề xuất:

| Token | Desktop | Mobile | Dùng cho |
|---|---:|---:|---|
| `--text-hero` | 64-72px | 44-52px | Hero H1 |
| `--text-page-title` | 40-48px | 30-36px | Page title |
| `--text-section-title` | 28-32px | 24-28px | Section heading |
| `--text-card-title` | 20-24px | 18-22px | Card/module title |
| `--text-body` | 16px | 16px | Body |
| `--text-small` | 13-14px | 13-14px | Meta, badge, hint |

Không scale font bằng viewport width. Không dùng letter-spacing âm.

### 5.4 Radius, Border, Shadow

| Token | Value | Dùng cho |
|---|---:|---|
| `--radius-sm` | 6px | Input nhỏ, tag |
| `--radius-md` | 8px | Button, compact card |
| `--radius-lg` | 12px | Form panel, CTA block |
| `--radius-xl` | 16px | Report/card lớn |
| `--radius-2xl` | 18-20px | Hero/pricing/module cards |
| `--shadow-purple` | `0 20px 60px rgba(139, 92, 246, 0.25)` | Hover card |
| `--shadow-gold` | `0 0 20px rgba(251, 191, 36, 0.3)` | Premium badge |
| `--shadow-panel` | `0 20px 60px rgba(0, 0, 0, 0.4)` | Modal/report panel |

## 6. Layout System

### 6.1 App Shell

- Header sticky/fixed, cao 64px.
- Header nền `rgba(10, 5, 20, 0.88-0.92)` + blur 10-20px.
- Content container chuẩn: `max-width: 1120-1200px`, padding ngang 24px desktop, 16px mobile.
- Các page/module nên dùng route độc lập, nhưng visual shell đồng nhất.

### 6.2 Hero

- Hero đầu trang dùng full viewport hoặc gần full viewport.
- Nội dung chính phải ở giữa viewport theo cả trục ngang và trục dọc.
- Không để khoảng trống phía trên quá lớn.
- H1 dùng chữ trắng + gradient tím cho keyword chính.
- Supporting copy tối đa 2 dòng desktop, 3 dòng mobile.
- CTA chính nổi rõ, CTA phụ dạng glass/outline.
- Hero có thể dùng galaxy canvas/star field nhưng content phải nằm trên layer riêng với z-index rõ.

### 6.3 Section Snap / Centered Sections

Nếu build landing/dashboard dạng từng “tab nội dung” khi scroll:

- Dùng `min-height: 100svh` cho section chính.
- Dùng `display:flex; align-items:center; justify-content:center`.
- Dùng `scroll-snap-type: y proximity`, không dùng mandatory nếu nội dung dài.
- Tắt hoặc giảm snap trên mobile nếu gây khó đọc.
- Mỗi section phải có top/bottom safe padding để không bị header che.

## 7. Component Specs

### 7.1 Background Galaxy

Rebuild mới bằng CSS/canvas riêng:

- Base: `#020617` hoặc `#0a0514`.
- Radial gradient tím ở top/center, xanh ở right/bottom, hồng nhẹ ở left.
- Star field có 2-3 layer opacity khác nhau.
- Particle/canvas đặt `position:absolute/fixed; inset:0; z-index:0; pointer-events:none`.
- Content đặt `position:relative; z-index:1`.
- Không dùng orb/bokeh quá dày. Nếu dùng, opacity thấp và không che chữ.

Performance:

- Giới hạn khoảng 80-140 stars desktop, ít hơn trên mobile.
- Có `prefers-reduced-motion: reduce`.
- Canvas phải pause/giảm FPS khi tab hidden nếu có animation nặng.

### 7.2 Glass Card

Base:

```css
.bm-glass {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.10);
  backdrop-filter: blur(20px);
  border-radius: 16px;
}
```

Hover:

- Border chuyển sang `rgba(139, 92, 246, 0.5)`.
- Dịch lên tối đa 4-6px.
- Shadow tím nhẹ.
- Không scale quá 1.02 để tránh layout shift.

### 7.3 Button

Primary:

- Gradient tím/magenta.
- Text trắng, font-weight 700.
- Radius 10-12px.
- Height tối thiểu 44px, CTA lớn 56-64px.
- Icon trái nếu command rõ.

Secondary:

- Glass/outline.
- Border trắng 10-15%.
- Hover border tím.

Success/Unlock:

- Green `#059669` hoặc gradient xanh lá.
- Chỉ dùng cho unlock/payment success.

Danger/Error:

- Red chỉ dùng destructive hoặc error state.

### 7.4 Input/Form

- Nền input: `rgba(0,0,0,0.45-0.55)`.
- Border: `rgba(255,255,255,0.18-0.22)`.
- Focus border tím/magenta hoặc ring tím.
- Radius 8-10px.
- Height tối thiểu 48-56px.
- DOB dùng 3 controls rõ: ngày/tháng/năm.
- Gender/option dùng segmented pill, active state tím.
- Hint dùng tím nhạt `#a78bfa`, không đỏ nếu không phải lỗi.

### 7.5 Module Card

Module cards là card chính của dashboard:

- Grid: 3 cột desktop, 2 cột tablet, 1 cột mobile.
- Card height ổn định, tránh nhảy layout khi hover.
- Icon/module image ở trên trái hoặc trên giữa tùy context, nhưng phải đồng bộ cùng một hệ.
- Status badge ở góc phải: `LIVE`, `Q2`, `Coming`, `2027`.
- Progress line mảnh ở đáy card nếu cần.
- Active module: border tím + glow nhẹ.
- Locked/coming soon: opacity giảm nhưng vẫn đọc được.

### 7.6 Pricing / Payment Card

- Pricing card dùng glass panel.
- Gói nổi bật dùng `glass-strong`, border tím hoặc vàng, badge shimmer.
- Giá dùng font 28-36px, màu tím/vàng.
- Voucher/payment form dùng input tối + button cùng hệ.
- QR/payment status phải có state rõ: creating, active countdown, paid, expired, failed.

### 7.7 Report / Result Page

Report page có 2 lớp:

- Web reading: tối, galaxy, glass, CTA block.
- PDF/report printable: nền sáng, typography nghiêm túc, không galaxy/header app.

Web report:

- Title block: chữ trắng rõ, không gradient tối chìm vào background.
- User name dùng vàng `#fbbf24`.
- CTA/paywall block dùng blue-deep/gold hoặc green success.
- Section header dùng gradient xanh/tím, không dùng quá nhiều màu.
- Locked content dùng blur có kiểm soát, kèm CTA cụ thể.

Printable/PDF:

- Nền `#f8fafc` hoặc trắng.
- Text `#1e293b`.
- Section header xanh `#1e3a8a`.
- Không dùng star background.

### 7.8 Footer

- Footer report/web dùng nền xanh đậm `linear-gradient(135deg, #0a0f2e, #0f172a)`.
- Grid 3 cột desktop, 1 cột mobile.
- Không để footer lẫn vào khu vực module/page content.
- Không hiển thị footer sai vị trí giữa page như lỗi từng gặp ở Tarot.

### 7.9 Toast / Alert

- Success toast: xanh lá, bottom/right hoặc top/right, 3-4 giây.
- Error alert: đỏ nhạt trên nền tối, text tiếng Việt có dấu.
- Payment alert phải nói rõ hành động tiếp theo: thử lại, quét QR mới, liên hệ hỗ trợ.

## 8. Module Icons Direction

Không dùng emoji rời rạc cho V2 production nếu đã có icon/image đẹp.

Đề xuất:

| Module | Visual |
|---|---|
| Thần số học | Mandala/số 1-2-3-4 theo icon dashboard cũ |
| Tarot | Tarot card/deck image |
| Tử vi | Moon/zodiac circle |
| Ma trận định mệnh | Geometric matrix/diamond |
| Chòm sao | Star constellation |
| Bát tự | Yin-yang/five-elements disk |
| Ultra/bundle | Group 3 icons căn giữa, spacing đều |

Rule:

- Icon trong card phải căn hàng đồng bộ.
- Nếu card có nhiều icon, dùng flex center + gap 8-10px.
- Không để icon lệch trái nếu card content căn giữa.

## 9. Motion Rules

Cho phép:

- Fade-up 0.4-0.7s.
- Hover translateY 2-6px.
- Star twinkle 2-6s.
- Mandala spin chậm 12s+.
- Shimmer badge nhẹ 3s.

Không cho phép:

- Animation gây layout shift.
- Text bị blur/ẩn do gradient/canvas.
- Auto-scroll ép người dùng.
- Motion làm mobile lag.

Reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
  }
}
```

## 10. Accessibility / Readability Rules

- Text chính phải đạt contrast tốt trên nền galaxy.
- Không dùng gradient text tối trên background tối cho heading quan trọng.
- Button text không được wrap xấu trên mobile.
- Minimum touch target: 44px.
- Form error phải có text rõ, không chỉ đổi màu.
- Không dùng chỉ màu để biểu thị trạng thái.
- Tiếng Việt phải có dấu.

## 11. Implementation Output Khi Build UI

Khi scaffold app V2, cần tạo tối thiểu:

- `apps/web/src/styles/tokens.css`
- `apps/web/src/styles/globals.css`
- `apps/web/src/components/ui/Button.tsx`
- `apps/web/src/components/ui/Card.tsx`
- `apps/web/src/components/ui/Badge.tsx`
- `apps/web/src/components/layout/AppShell.tsx`
- `apps/web/src/components/layout/GalaxyBackground.tsx`
- `apps/web/src/components/modules/ModuleCard.tsx`

Visual QA bắt buộc:

- Screenshot desktop 1440px.
- Screenshot laptop 1366px.
- Screenshot tablet/mobile 768px/390px.
- Kiểm tra header không che content.
- Kiểm tra text không chìm vào background.
- Kiểm tra canvas/star không block click.
- Kiểm tra no horizontal scroll.

## 12. Design Extraction Conclusion

T-00A2 đã đủ để bước sang implementation UI skeleton. Khi code, chỉ dùng spec này làm nguồn visual, không copy nguyên file V1/CSS cũ vào app V2.
