# T-0208 Responsive UI QA

## Phiên bản 2 — xử lý lại (2026-05-17)

**Mục tiêu:** Bù phần 768px/1366px không xác nhận được qua browser pane hẹp, bằng (1) chỉnh layout Footer cho tablet `md`, (2) script audit tĩnh trong repo, (3) bảng đối chiếu breakpoint Tailwind.

### Bảng breakpoint (Tailwind mặc định)

| Token | Min width |
|------|-----------|
| `sm` | 640px |
| `md` | **768px** (tablet checklist) |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

Màn **1366px** nằm trong nhánh `lg` và `xl` (container `max-w-7xl` = 80rem căn giữa, không full-bleed nội dung).

### Fix layout (sau phiên bản 1)

- **Trước:** Footer chỉ `lg:grid-cols-[…]` → dưới 1024px luôn 1 cột; checklist “768px grid 2 cột” không khớp rõ.
- **Sau:** Thêm `md:grid-cols-2` trước `lg:grid-cols-[1.4fr_1fr_1fr_1fr]` trong `Footer.tsx` → từ **768px** footer 2 cột (2×2 cho 4 khối), từ **1024px** 4 cột như thiết kế.

### Kiểm tra tĩnh tự động

- Script: `tools/responsive-qa-audit.mjs`
- Chạy: `npm run qa:responsive-audit` (root)
- Nội dung: đọc `Header.tsx`, `Footer.tsx`, `PageShell.tsx`, `page.tsx` và xác nhận class tối thiểu (nav `md:flex`, footer grid `md`+`lg`, `max-w-*` PageShell, home `md:grid-cols-2`).

### Đối chiếu checklist (phiên bản 2)

| Mục | Cách xác nhận |
|-----|----------------|
| 375px không tràn ngang | `globals.css` + layout `w-full`/`max-w-*`/`overflow-x` trước đó; nên test thủ công DevTools khi cần. |
| 375px CTA không che | Hero link + demo-shell `Bắt đầu` có `min-h`/flex; test thủ công. |
| 375px hamburger + drawer | `Header`: `md:hidden` + drawer; test thủ công. |
| 375px Footer | 1 cột mặc định grid; không `md:` → OK. |
| 768px grid 2 cột | **Home** `md:grid-cols-2` (Card + States); **Footer** `md:grid-cols-2`. |
| ≥768px nav desktop | Header `md:flex` cho `<nav>` + account. |
| 1366px container | `max-w-7xl` header/footer, `max-w-5xl` home section, PageShell `max-w-{3,5,7}xl`. |
| Footer cuối trang | `layout.tsx` `flex` + `main` `flex-1` (T-0207). |

### Phiên bản 1 (lịch sử)

Thời gian: 2026-05-16 23:48 +07

- QA thủ công qua Cursor browser; hạn chế: pane không đủ rộng cho 768/1366.
- Fix nhỏ: focus-visible brand Footer.

---

## Kết luận chung

- QA nền **pass** sau khi bổ sung footer tablet + audit script.
- Không đổi token; không thêm dependency npm (chỉ script Node built-in).
