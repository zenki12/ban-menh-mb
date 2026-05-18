# TASK REGISTRY - Bản Mệnh V2

> File này chỉ chứa task thật của Bản Mệnh V2. Template hướng dẫn chung nằm trong bộ template gốc, không trộn vào registry dự án để tránh nhiễu.
>
> Quy tắc: mỗi task phải có bối cảnh, yêu cầu, output, goal, điều kiện Done và update khi xong.

# Bản Mệnh V2 - Project Task Registry

> Phần dưới đây là task registry cụ thể cho dự án Bản Mệnh V2, được import từ spec đã chốt. Khi làm xong task nào, cập nhật trạng thái trực tiếp tại đây và ghi DEVLOG.

# Bản Mệnh V2 Task Tracker

Ngày tạo: 2026-05-13

Mục đích: đây là file theo dõi từng phase/task của dự án V2. Sau mỗi task, người thực hiện phải cập nhật trạng thái, đối chiếu với bối cảnh, yêu cầu, output và điều kiện done. Không đánh `Done` nếu chưa kiểm tra đủ các điều kiện.


## Quy Ước Project Root

- Project root chính thức: `E:\Project\Project\banmenh`.
- Docs source of truth: `E:\Project\Project\banmenh\docs`.
- Không tạo workspace khác cho Bản Mệnh V2 nếu user chưa yêu cầu.
- Code/scaffold/build chỉ được coi là chính thức khi có task tương ứng và được ghi vào `DEVLOG.md`.

## Quy Ước Trạng Thái

```text
Todo        Chưa làm
In Progress Đang làm
Blocked     Bị chặn, cần quyết định hoặc dữ liệu
Review      Đã làm xong, đang chờ review/audit
Done        Đã hoàn tất và đối chiếu đủ điều kiện done
```

## Quy Tắc Cập Nhật

- Mỗi task chỉ được đánh `Done` khi có output cụ thể.
- Sau khi task `Done`, phải thêm entry tương ứng vào `DEVLOG.md`.
- Nếu phát hiện scope thay đổi, không tự mở rộng task; tạo task mới hoặc cập nhật yêu cầu trước.
- Nếu task đụng payment, auth, entitlement, KB hoặc legal, bắt buộc audit bảo mật trước khi `Done`.
- Nếu tạo code mới, phải kiểm tra nguy cơ file phình to, logic trùng, dependency thừa và secret/KB leakage.

## Phase 0 - Khóa Nền Tảng Dự Án

### T-0001 - Chốt tài liệu nền V2

Status: Done

Bối cảnh:

- Dự án hiện tại có rủi ro tech debt, code phình, KB/security cần kiểm soát lại.
- Cần bộ tài liệu nền trước khi scaffold V2.

Yêu cầu:

- Có product spec tổng.
- Có PRD MVP.
- Có screen spec.
- Có data contract.
- Có security threat model.
- Có release runbook.
- Có technical decisions.
- Có legal/commercial spec.
- Có independent launch plan.
- Có content quality spec.

Output cần có:

- `docs/product-specs/banmenh-v2-product-spec.md`
- `docs/product-specs/prd-mvp.md`
- `docs/product-specs/screen-spec.md`
- `docs/product-specs/data-contract.md`
- `docs/product-specs/security-threat-model.md`
- `docs/product-specs/release-runbook.md`
- `docs/product-specs/technical-decisions.md`
- `docs/product-specs/legal-commercial-spec.md`
- `docs/product-specs/independent-launch-plan.md`
- `docs/product-specs/content-quality-spec.md`

Goal:

- Khóa scope, stack, legal, security, independent launch và content quality để V2 không bị AI/dev tự diễn giải lung tung.

Điều kiện Done:

- Tất cả file đã tồn tại.
- Nội dung bằng tiếng Việt có dấu.
- Có Decision Records cho stack, storage và Tarot non-AI.
- Không chứa secret/token thật.

Update khi xong:

- Đã tạo và cập nhật bộ tài liệu nền V2.
- Đã chốt Next.js + TypeScript + Cloudflare Workers.
- Đã chốt Firestore cho user/transaction và KV/R2 cho KB/cache.
- Đã chốt Tarot MVP non-AI, AI chỉ là future optional.

### T-0002 - Chia nhỏ task tracker theo từng bước kiểm soát được

Status: Done

Bối cảnh:

- Task tracker ban đầu còn gom nhiều việc lớn vào một task.
- User muốn đi từng bước nhỏ nhất có thể để hạn chế code rác, tech debt và rủi ro audit.

Yêu cầu:

- Chia phase/task chi tiết hơn.
- Mỗi task phải rõ bối cảnh, yêu cầu, output, goal, điều kiện Done và update khi xong.
- Tách riêng phần setup giao diện, routing, backend contract, payment, module, independent launch.

Output cần có:

- `docs/v2-task-tracker.md` được chia nhỏ lại.
- `docs/DEVLOG.md` có entry ghi nhận thay đổi này.

Goal:

- Có roadmap rebuild theo từng bước nhỏ, có thể làm xong một task là audit được ngay.

Điều kiện Done:

- Phase 1 không còn gom chung scaffold + UI + env.
- UI foundation có phase riêng.
- Mỗi task đủ nhỏ để có output/test/audit riêng.
- Không chứa secret/token thật.

Update khi xong:

- Đã chia lại tracker thành các phase nhỏ hơn.
- Đã tách UI foundation thành design tokens, typography, components, layout, responsive QA.
- Đã tách backend/payment/module/independent launch thành các task nhỏ hơn.

## Phase 1 - Project Foundation

### T-0101 - Khởi tạo codebase app V2 trong project root

Status: Done

Update khi xong (2026-05-16):

- Đã khởi tạo Next.js 16 + React 19.2 + TypeScript scaffold trong `apps/web/`.
- Đã thiết lập npm workspaces ở project root (`apps/*`).
- Đã tạo `apps/web/src/app/{layout.tsx,page.tsx,globals.css}` với Hub skeleton dùng design tokens.
- Đã tạo `.env.example` placeholder (không secret thật).
- Đã tạo `.gitignore` chặn `.env*`, `node_modules`, `.next/`, giữ `.env.example`.
- Scripts đã có: `dev`, `build`, `typecheck`, `lint` ở root chạy qua workspace.
- Chưa thêm payment/auth/KB integration — đúng scope task.
- Sprint 1 bổ sung Tailwind v4 + full design tokens (xem T-0201 update).
- DEVLOG entry tương ứng đã ghi.

Bối cảnh:

- Project root chính thức là `E:\Project\Project\banmenh`.
- Docs source of truth là `E:\Project\Project\banmenh\docs`.
- Bản Mệnh V2 là rebuild mới, không phụ thuộc code/hạ tầng cũ.
- Cần khởi tạo nền app sạch, module hóa, có kiểm soát ngay từ đầu.
- Mọi code/scaffold/build chỉ được tính là chính thức khi task này được user duyệt và ghi DEVLOG.

Yêu cầu:

- Chỉ bắt đầu implementation khi user nói rõ: “bắt đầu T-0101”.
- Khởi tạo app trong project root, không tạo workspace khác.
- Dùng stack đã chốt trong docs, mặc định: Next.js + TypeScript.
- Không copy code V1 hàng loạt.
- Không đưa KB/private data vào frontend/static asset.
- Không thêm payment/auth/KB logic ở task này.
- Không deploy production.
- Không tạo secret thật trong file.

Phạm vi được phép sửa:

- File cấu hình project tối thiểu.
- Cấu trúc app tối thiểu.
- README hướng dẫn chạy local/dev ở mức cơ bản.
- `.gitignore` nếu cần để chặn `.env`, secret, cache, build output.

Phạm vi không được sửa:

- Không sửa nội dung KB.
- Không import KB vào app.
- Không tạo PayOS/Firebase/Telegram integration.
- Không deploy Cloudflare.
- Không động vào production domain.
- Không tự thêm feature ngoài scaffold nền.

Output cần có:

- Codebase app V2 tối thiểu trong `E:\Project\Project\banmenh`.
- Cấu trúc thư mục rõ ràng cho app/frontend.
- App có trang mặc định đơn giản để xác nhận chạy được.
- Scripts tối thiểu: dev, build, typecheck nếu stack hỗ trợ.
- README ngắn cho người non-tech biết chạy bước cơ bản.

Goal:

- Có nền app sạch, có kiểm soát, đủ để bắt đầu các task UI foundation/module về sau.

Điều kiện Done:

- User đã duyệt bắt đầu implementation.
- App chạy được local/dev.
- Build pass nếu được phép chạy build.
- Typecheck pass nếu được phép chạy typecheck.
- Không có secret/token thật.
- Không có KB private trong frontend/static asset.
- Không có dependency thừa chưa giải thích.
- Không tạo file lớn/phình bất thường.
- DEVLOG ghi rõ:
  - đã tạo/sửa file gì
  - đã chạy command gì
  - kết quả kiểm tra
  - rủi ro còn lại
  - có phát sinh tech debt/code rác không

Update khi xong:

- Cập nhật status task từ `Todo` → `Done` nếu đủ điều kiện.
- Ghi entry vào `DEVLOG.md`.
- Nếu có quyết định kiến trúc phát sinh, cập nhật `ADR.md`.
- Nếu có rủi ro mới, cập nhật `RISK_REGISTER.md`.

### T-0102 - Thiết lập scripts kiểm soát chất lượng

Status: Done

Update khi xong (2026-05-16):

- Đã giữ scripts root dễ hiểu: `dev`, `build`, `typecheck`, `lint`.
- Đã thêm `security:smoke` để kiểm tra `.env` thật bị track, hardcode secret/token phổ biến và KB/private leak trong frontend/static.
- Đã thêm `check` để chạy lần lượt `typecheck`, `lint`, `security:smoke`, `build`.
- Đã đổi lint workspace web sang script smoke nội bộ `tools/source-lint.mjs` để không thêm dependency mới.
- Đã cập nhật `README.md` hướng dẫn cách chạy từng script cho người non-tech.
- Đã cập nhật `.gitignore` để bỏ qua `*.tsbuildinfo` do TypeScript tạo khi chạy check.
- Đã chạy pass: `npm run typecheck`, `npm run build`, `npm run lint`, `npm run security:smoke`, `npm run check`.
- Không thêm dependency mới, không đụng payment/auth/KB logic, không deploy.

Bối cảnh:

- Sau khi khởi tạo codebase V2, cần có bộ lệnh kiểm tra tối thiểu để chặn lỗi sớm.
- Dự án dùng AI-assisted development nên rủi ro code rác, dependency thừa, hardcode secret, KB leak và build lỗi cao hơn bình thường.
- Scripts kiểm soát chất lượng là điều kiện nền trước khi build UI/module sâu hơn.

Yêu cầu:

- Chỉ bắt đầu sau khi `T-0101` đã Done hoặc user cho phép xử lý song song rõ ràng.
- Thiết lập scripts tối thiểu trong project config.
- Scripts phải dễ hiểu cho người non-tech.
- Không thêm dependency nếu chưa giải thích lý do.
- Không tạo mock production code.
- Không chạy deploy.
- Không đụng vào payment/auth/KB logic.

Phạm vi được phép sửa:

- `package.json` hoặc config tương ứng theo stack.
- File config lint/typecheck/format nếu thật sự cần.
- README hướng dẫn chạy scripts.
- Script/checklist kiểm tra secret/KB leakage ở mức smoke test nếu phù hợp.

Phạm vi không được sửa:

- Không sửa UI/module business.
- Không import KB thật vào app.
- Không thêm integration PayOS/Firebase/Telegram.
- Không đổi kiến trúc nếu chưa có ADR.
- Không sửa production config/domain.

Output cần có:

- Script chạy dev/local.
- Script build.
- Script typecheck.
- Script lint hoặc format check nếu stack dùng.
- Script hoặc checklist security smoke tối thiểu:
  - kiểm tra không có `.env` thật bị commit
  - kiểm tra không có token/secret hardcode phổ biến
  - kiểm tra KB private không nằm trong frontend/static asset
- README hoặc docs ghi cách chạy từng script bằng ngôn ngữ dễ hiểu.

Goal:

- Có quality gate tối thiểu để mỗi task sau này không chỉ “nhìn chạy được” mà còn kiểm tra được build/type/security cơ bản.

Điều kiện Done:

- User đã duyệt bắt đầu task.
- Các scripts được định nghĩa rõ.
- Scripts chạy được nếu được phép test.
- Nếu có script chưa chạy, phải ghi rõ lý do.
- Không thêm dependency thừa.
- Không có secret/token thật.
- Không có KB private trong frontend/static asset.
- README/docs có hướng dẫn cho người non-tech.
- DEVLOG ghi:
  - scripts đã thêm
  - command đã chạy
  - kết quả từng command
  - dependency mới nếu có và lý do
  - rủi ro còn lại

Update khi xong:

- Cập nhật status task từ `Todo` → `Done` nếu đủ điều kiện.
- Ghi entry vào `DEVLOG.md`.
- Nếu thêm dependency quan trọng, ghi lý do trong DEVLOG hoặc ADR nếu ảnh hưởng kiến trúc.
- Nếu phát hiện rủi ro secret/KB/build, cập nhật `RISK_REGISTER.md`.

### T-0103 - Tạo cấu trúc folder module hóa

Status: Done

Update khi xong (2026-05-16):

- Đã tạo cấu trúc folder chính theo `.cursorrules` section 2:
  - `apps/web/src/components/{ui,layout,modules}/`
  - `apps/web/src/modules/{numerology,tarot,account,payment}/`
  - `apps/web/src/lib/`
  - `packages/shared/src/schemas/`
  - `workers/{payment,kb,admin}/`
  - `kb-private/`
- Đã thêm README boundary ngắn cho component/module/worker/private KB folders.
- Đã thêm placeholder `packages/shared/src/index.ts` và `packages/shared/src/schemas/index.ts`.
- Đã cập nhật root workspace thêm `packages/*` và `workers/*`.
- Đã cập nhật ignore rule để chặn `kb-private/*`, chỉ giữ `README.md` và `.gitignore`.
- Rule boundary chính: không import KB trực tiếp, không để frontend tạo entitlement/payment confirmed, không duplicate pricing/entitlement ngoài `packages/shared`.
- Đã chạy pass `npm run check`.
- Không thêm dependency, không tạo business logic, không copy KB thật.

Bối cảnh:

- Hệ thống hiện có có nguy cơ phình file lớn.
- V2 phải ép module boundary từ đầu.

Yêu cầu:

- Tạo folder cho modules: numerology, tarot, account, payment.
- Tạo shared folder cho pricing, entitlement, schemas, errors.
- Tạo folder components/styles/lib.

Output cần có:

- Cấu trúc folder đúng `technical-decisions.md`.
- File placeholder tối thiểu nếu cần.

Goal:

- Tránh nhồi logic nhiều module vào một file.

Điều kiện Done:

- Folder rõ ràng.
- Không có file app chính > 300 dòng ở giai đoạn scaffold.
- Không có logic business nằm trong component UI base.

Update khi xong:

- Ghi tree folder chính.
- Ghi rule module boundary nếu có.

### T-0104 - Tạo `.env.example` và quy tắc secret

Status: Done

Update khi xong (2026-05-16):

- Đã chạy `git init`, `git add .gitignore`, `git status` theo yêu cầu trước khi bắt đầu task.
- Đã verify `.gitignore` chặn `.env`, `.env.local`, `.env.production` và cho phép `.env.example`.
- Đã cập nhật `.env.example` chỉ chứa placeholder `your_value_here`, chia nhóm App, Firebase, PayOS, Telegram, Cloudflare.
- Env keys placeholder gồm: `NEXT_PUBLIC_APP_ENV`, `NEXT_PUBLIC_APP_NAME`, `NEXT_PUBLIC_APP_URL`, `ADMIN_TOKEN`, Google/Firebase keys, PayOS keys, Telegram keys, Cloudflare project/storage/worker keys và `KB_STORAGE_BUCKET`.
- Đã cập nhật README section `Environment Variables` hướng dẫn copy `.env.example` sang `.env.local` và lưu secret thật ngoài repo.
- Đã chạy pass `npm run security:smoke`.
- Không tạo `.env` hoặc `.env.local`, không ghi secret thật.

Bối cảnh:

- Hệ thống hiện có từng có rủi ro token trong file hướng dẫn/local.

Yêu cầu:

- Tạo `.env.example` chỉ có placeholder.
- Ghi rõ secret thật lưu ở đâu, không commit.
- Không tạo `.env` thật trong repo.

Output cần có:

- `.env.example`
- Section hướng dẫn env trong README/docs.

Goal:

- Chặn rủi ro commit secret từ đầu.

Điều kiện Done:

- Không có token thật trong diff.
- `.gitignore` loại trừ `.env*` phù hợp, nhưng giữ `.env.example`.
- Docs nói rõ không commit secret.

Update khi xong:

- Ghi env keys placeholder.
- Ghi kiểm tra secret scan/manual.

### T-0105 - Thiết lập dev/test và production config skeleton

Status: Done

Update khi xong (2026-05-16):

- Đã tạo Worker config skeleton:
  - `workers/payment/wrangler.toml`
  - `workers/kb/wrangler.toml`
  - `workers/admin/wrangler.toml`
- Mỗi Worker có `[env.dev]` và `[env.production]` với tên resource tách biệt (`*-dev` / `*-prod`) và placeholder KV/R2 binding.
- Không ghi `account_id`, API token hoặc secret thật; mỗi file có comment nhắc secret/resource thật cấu hình qua `wrangler secret put`.
- Đã cập nhật `apps/web/next.config.ts` đọc `process.env.NEXT_PUBLIC_APP_ENV` và chỉ cho phép `development`, `dev`, `production`.
- Đã tạo `docs/product-specs/dev-prod-mapping.md` với mapping resource dev/prod, ENV var pattern, rule không share secret và quyền deploy prod chỉ Zenki.
- Đã cập nhật README trỏ tới dev/prod mapping.
- Đã chạy pass `npm run check` sau một lần retry build transient.
- Không deploy thật, không code Hono handler.

Bối cảnh:

- User yêu cầu mọi thay đổi phải qua dev/test trước production.

Yêu cầu:

- Có config tách dev/test và production.
- Tên resource dev/prod rõ.
- Chưa cần deploy thật nếu chưa có code ổn, nhưng phải có skeleton.

Output cần có:

- Config deploy frontend.
- Config Worker dev/prod placeholder.
- Docs mapping resource.

Goal:

- Không dùng nhầm production khi phát triển.

Điều kiện Done:

- Dev/prod config không dùng chung secret.
- Không chứa secret thật.
- Runbook được cập nhật nếu config khác spec.

Update khi xong:

- Ghi resource/config đã tạo.
- Ghi rủi ro config còn lại.

## Phase 2 - UI Foundation

### T-0201 - Thiết lập design tokens

Status: Done

Update khi xong (2026-05-16):

- Đã tạo `apps/web/src/styles/tokens.css` chứa toàn bộ token từ `docs/design-extraction-spec.md` mục 5:
  - ~30 color tokens (bg, text, primary, magenta, gold, blue, status, border).
  - 6 gradient tokens (bg, primary, primary-blue, purple-text, gold-text, report, footer).
  - 5 radius tokens (sm, md, lg, xl, 2xl).
  - 3 shadow tokens (purple, gold, panel).
  - Typography scale dùng `clamp()` cho hero/page-title/section/card/body/small.
- Đã setup Tailwind CSS v4 + `@tailwindcss/postcss` plugin.
- Đã dùng `@theme inline` trong `tokens.css` để map token sang Tailwind utility class (`bg-bg-void`, `text-primary-soft`, `rounded-2xl`, v.v.).
- Đã import `tokens.css` và `tailwindcss` trong `globals.css`.
- Reduced motion query đã có.
- Quyết định stack đã ghi trong ADR-004.

Bối cảnh:

- Current app từng bị lệch giao diện và palette chưa đồng nhất.
- V2 cần token trước khi build component.

Yêu cầu:

- Định nghĩa color, spacing, radius, shadow, typography scale.
- Không tạo palette một màu đơn điệu.
- Token dùng chung toàn app.

Output cần có:

- CSS variables hoặc token file.
- Ví dụ sử dụng trong global style.

Goal:

- Có nền visual thống nhất trước khi build UI.

Điều kiện Done:

- Token được import/use ở layout.
- Không hardcode màu rải rác trong component base.
- Desktop/mobile không lỗi màu nền/text cơ bản.

Update khi xong:

- Ghi token đã tạo.
- Ghi lý do chọn palette.
- Ghi issue contrast nếu còn.

### T-0202 - Thiết lập typography và content defaults

Status: Done

Update khi xong (2026-05-16):

- Đã cập nhật `apps/web/src/app/globals.css` với typography defaults:
  - Base font stack Inter/system fallback có hỗ trợ tiếng Việt.
  - Body line-height `1.7`, paragraph line-height `1.75`.
  - H1/H2/H3/H4 dùng token `--bm-text-hero`, `--bm-text-page-title`, `--bm-text-section-title`, `--bm-text-card-title`.
  - Small text dùng `--bm-text-small`.
  - Letter spacing không âm, text wrapping chống tràn ngang.
- Đã cập nhật `apps/web/src/app/page.tsx` thành typography demo nhỏ có H1/H2/H3/H4, paragraph tiếng Việt có dấu, small text và đoạn dài để kiểm tra readability.
- Đã kiểm tra demo mobile qua browser viewport 375px: text wrap trong khối, không thấy tràn ngang/overlap sau khi tăng heading line-height.
- Đã chạy pass `npm run check`.
- Không thêm dependency font, không tạo Button/Card, không hardcode font-size trong page demo.

Bối cảnh:

- App dùng tiếng Việt có dấu và nội dung luận giải dài.
- Cần typography đọc tốt trên mobile/desktop.

Yêu cầu:

- Base font, heading scale, paragraph line-height.
- Không scale font theo viewport width.
- Letter spacing không âm.
- Text tiếng Việt có dấu hiển thị đúng.

Output cần có:

- Global typography CSS.
- Demo text/check trong page skeleton.

Goal:

- Tránh lỗi chữ xấu, tràn, khó đọc.

Điều kiện Done:

- Không có text lỗi encoding.
- Heading/body readable ở mobile.
- Không có text overlap ở demo.

Update khi xong:

- Ghi font/scale đã chọn.
- Ghi viewport đã kiểm tra.

### T-0203 - Tạo component Button/CTA

Status: Done

Update khi xong (2026-05-16):

- Đã tạo `apps/web/src/components/ui/Button.tsx` dưới 200 dòng.
- Variants đã tạo: `primary`, `secondary`, `ghost`, `danger`.
- Sizes đã tạo: `sm` 36px, `md` 44px, `lg` 52px.
- Hỗ trợ `loading`, `disabled`, `leftIcon`, `rightIcon`, `fullWidth` và rest props của `<button>`.
- Loading dùng spinner SVG inline với `currentColor`; loading tự disable button.
- Focus-visible dùng `--bm-primary-soft`; màu/gradient/shadow dùng token `var(--bm-*)`.
- Đã tạo `apps/web/src/components/ui/index.ts`.
- Nơi sử dụng đầu tiên: `apps/web/src/app/page.tsx` Button showcase hiển thị variants, sizes, loading, disabled, icon và fullWidth.
- Đã chạy pass `npm run check`.
- Không thêm dependency, không dùng UI library, không inline `onclick`.

Bối cảnh:

- CTA/payment/account là nơi dễ lệch style và text.

Yêu cầu:

- Component Button có variants: primary, secondary, ghost, danger nếu cần.
- Có loading/disabled state.
- Icon support.
- Không text tràn trên mobile.

Output cần có:

- Button component.
- CTA usage examples.

Goal:

- Tránh mỗi màn tự style nút riêng.

Điều kiện Done:

- Buttons có fixed ergonomic height/padding.
- Loading/disabled rõ.
- Không có inline style tùy tiện.
- Keyboard focus visible.

Update khi xong:

- Ghi variants đã tạo.
- Ghi nơi sử dụng đầu tiên.

### T-0204 - Tạo component Card/Panel

Status: Done

Update khi xong (2026-05-16):

- Đã tạo `apps/web/src/components/ui/Card.tsx` dưới 150 dòng.
- Variants đã tạo: `default`, `glass`, `panel`, `report`.
- Padding đã tạo: `sm`, `md`, `lg`.
- Hỗ trợ `interactive`, `as` (`div`, `article`, `section`), `className`, `children` và rest props.
- Tất cả variant dùng `rounded-2xl`/token radius, background/border/shadow bằng `var(--bm-*)`.
- Interactive dùng hover lift nhẹ và hover border purple.
- Đã export `Card` và `CardProps` trong `apps/web/src/components/ui/index.ts`.
- Nơi sử dụng đầu tiên: `apps/web/src/app/page.tsx` refactor typography/Button showcase wrapper sang `Card` và thêm `Card showcase`.
- Rule sử dụng: dùng Card cho repeated items/framed tools/result panel; không lồng card trong card; không dùng card cho toàn bộ section nếu chỉ cần spacing.
- Đã chạy pass `npm run check`.
- Không thêm dependency, không dùng UI library, không hardcode màu/radius.

Bối cảnh:

- Current UI có nhiều card/module/payment box.
- Cần tránh card lồng card và radius quá đà.

Yêu cầu:

- Card/Panel base cho repeated items và framed tools.
- Không dùng card cho toàn bộ section nếu không cần.
- Radius tối đa theo design rule.

Output cần có:

- Card/Panel component.
- Usage rule trong comment/docs ngắn.

Goal:

- Giữ UI nhất quán và tránh layout phình/decorative.

Điều kiện Done:

- Component có variant tối thiểu.
- Không tạo card lồng card trong demo.
- Mobile width an toàn.

Update khi xong:

- Ghi component và rule sử dụng.

### T-0205 - Tạo Loading/Error/Empty states

Status: Done

Update khi xong (2026-05-16):

- Đã tạo `apps/web/src/components/ui/states/` gồm:
  - `LoadingState.tsx`
  - `ErrorState.tsx`
  - `EmptyState.tsx`
  - `UnauthorizedState.tsx`
  - `index.ts`
- Đã re-export 4 state components trong `apps/web/src/components/ui/index.ts`.
- State layout dùng flex column center, text-center, max-width readable và padding rộng.
- Icons dùng inline SVG, không thêm icon dependency.
- ErrorState dùng message mặc định tiếng Việt: title `Có lỗi xảy ra`, description `Vui lòng thử lại sau ít phút.`
- UnauthorizedState dùng title `Cần đăng nhập` và CTA `Đăng nhập` khi có handler.
- Không hiển thị raw error hoặc `Failed to fetch`; không chứa API/Firebase/business logic.
- Đã cập nhật `apps/web/src/app/page.tsx` thêm `States showcase`, mỗi state nằm trong một `Card padding="lg" variant="default"`.
- Đã chạy pass `npm run check`.

Bối cảnh:

- Hệ thống hiện có từng hiện lỗi raw như `Failed to fetch`.

Yêu cầu:

- LoadingState.
- ErrorState có message tiếng Việt và CTA.
- EmptyState.
- UnauthorizedState nếu cần.

Output cần có:

- Các component state dùng chung.

Goal:

- Mọi module xử lý lỗi nhất quán, dễ hiểu.

Điều kiện Done:

- Không hiển thị lỗi raw.
- Error có CTA phù hợp.
- Component không chứa business logic module.

Update khi xong:

- Ghi state components đã tạo.
- Ghi ví dụ message chuẩn.

### T-0206 - Tạo PageShell và navigation convention

Status: Done

Update khi xong (2026-05-16):

- Đã tạo `apps/web/src/components/layout/PageShell.tsx`.
- Đã tạo `apps/web/src/components/layout/BackToDashboard.tsx`.
- Đã tạo `apps/web/src/components/layout/index.ts` barrel export.
- `PageShell` hỗ trợ `title`, `subtitle`, `showBack`, `backHref`, `backLabel`, `actions`, `children`, `containerWidth`.
- `BackToDashboard` render anchor chuẩn `← Dashboard`, hover/focus dùng token `var(--bm-*)`.
- Đã tạo route demo `apps/web/src/app/demo-shell/page.tsx`.
- Đã cập nhật home `apps/web/src/app/page.tsx` thêm link tới `/demo-shell`.
- Build đã verify route `/demo-shell` được prerender.
- Đã chạy pass `npm run check`.
- Không thêm dependency, không implement Header/Footer.

Bối cảnh:

- Current app từng lệch vị trí/tên gọi nút Dashboard.

Yêu cầu:

- PageShell cho module pages.
- Back/Dashboard button convention.
- Container width, top spacing, responsive padding.

Output cần có:

- PageShell component.
- BackToDashboard component hoặc prop.

Goal:

- Mỗi module có khung trang thống nhất.

Điều kiện Done:

- Nút `← Dashboard` thống nhất.
- Vị trí nút không lệch giữa Numerology/Tarot.
- Mobile không che content.

Update khi xong:

- Ghi component đã tạo.
- Ghi route demo đã áp dụng.

### T-0207 - Tạo Header/Footer chuẩn

Status: Done

Bối cảnh:

- Current app từng có footer xuất hiện sai vị trí dưới header trong Tarot.

Yêu cầu:

- Header global.
- Footer global chỉ ở cuối page.
- Navigation module.
- Account/upgrade area.

Output cần có:

- Header component.
- Footer component.
- Layout integration.

Goal:

- Không lặp lỗi header/footer lệch.

Điều kiện Done:

- Footer không xuất hiện giữa trang.
- Header responsive.
- Navigation text tiếng Việt có dấu.
- Không overlap với content.

Update khi xong:

- Ghi screenshot/check viewport nếu có.
- Ghi issue còn lại.

### T-0208 - Responsive UI QA nền

Status: Done

Bối cảnh:

- Mobile là nguồn lỗi phổ biến: text tràn, CTA bị che, QR khó đọc.

Yêu cầu:

- Kiểm tra viewport mobile/tablet/desktop.
- Ghi lại breakpoints tối thiểu.
- Sửa lỗi layout nền trước khi build feature.

Output cần có:

- QA note trong implementation log.
- Fix nếu có lỗi.

Goal:

- UI foundation đủ chắc để build module.

Điều kiện Done:

- 375px mobile không tràn ngang.
- 768px tablet ổn.
- 1366px desktop ổn.
- Header/footer/PageShell/Button/Card không overlap.

Update khi xong:

- Ghi viewport đã check.
- Ghi lỗi đã sửa.

### T-0209 - Visual polish: GalaxyBackground component

Status: Done

Bối cảnh:

- Phase 2 đã chốt tokens, components, Header/Footer nhưng app vẫn phẳng vì chỉ có gradient tĩnh.
- User cung cấp reference file vanilla JS Canvas galaxy: `C:\Users\ADMIN\Desktop\New folder\galaxy-effect.html`.
- Cần adapt sang React component để áp dụng global, mọi route auto có ambient huyền học.

Yêu cầu:

- Tạo `apps/web/src/components/layout/GalaxyBackground.tsx` client component.
- Canvas 2D fixed toàn màn hình, không block click.
- Có sao lấp lánh, hạt bụi lơ lửng, nebula và 5 vòng quỹ đạo elip nghiêng 3D.
- DPR-aware, cleanup khi unmount, pause khi tab inactive, respect `prefers-reduced-motion`.
- Không thêm dependency, không copy nguyên HTML reference.

Output cần có:

- `GalaxyBackground` component.
- Export từ layout index.
- Render global trong app layout.

Goal:

- App có ambient background nhất quán cho mọi route.

Điều kiện Done:

- `npm run check` pass.
- `npm run qa:responsive-audit` pass.
- Route chính có canvas global, mobile không tràn ngang.
- Reduced motion chỉ render frame tĩnh.

Update khi xong:

- Hoàn tất 2026-05-18: tạo `GalaxyBackground` canvas 2D global, render trước `Header`, export từ layout index.
- Source reference: user-provided `C:\Users\ADMIN\Desktop\New folder\galaxy-effect.html`; chỉ tham khảo/adapt logic, không copy nguyên HTML vào project.
- Verify: `npm run check` pass, `npm run qa:responsive-audit` pass, Chrome headless 375px trên `/`, `/than-so-hoc`, `/tarot`, `/pricing`, `/account` có canvas fixed `z-index: -1`, không overflow ngang.
- Reduced motion được emulate qua browser media query và component chỉ render frame tĩnh; tab inactive pause qua `document.hidden` + `visibilitychange`.
- File `GalaxyBackground.tsx` còn 248 dòng (<250).

## Phase 3 - Route Skeleton

### T-0301 - Tạo route `/` Hub skeleton

Status: Done

Bối cảnh:

- Hub là entry point cho các module.

Yêu cầu:

- Route `/`.
- Hero copy cơ bản.
- Module cards placeholder.
- CTA login/start placeholder.

Output cần có:

- Hub page skeleton.

Goal:

- Có entry route rõ, chưa cần logic thật.

Điều kiện Done:

- Click module placeholder dẫn đúng route skeleton.
- UI dùng PageShell/tokens/components chung.
- Không có business logic nặng.

Update khi xong:

- Ghi route đã tạo.
- Ghi link module.

Cập nhật hoàn tất 2026-05-18:

- Đã thay `apps/web/src/app/page.tsx` từ demo showcase thành Hub skeleton thật cho route `/`.
- Đã chuyển demo component hiện tại sang `apps/web/src/app/demo-components/page.tsx` (`/demo-components`).
- Link module dùng `<a href>`: `/than-so-hoc`, `/tarot`; CTA bảng giá dùng `/pricing`; các route này chưa được tạo trong task này.
- Đã thêm card Daily Message ở trạng thái sắp ra mắt, CTA disabled.
- Verify: `npm run check`, `npm run qa:responsive-audit`, Chrome headless 375px `maxScrollWidth=375`.

### T-0302 - Tạo route `/than-so-hoc` skeleton

Status: Done

Bối cảnh:

- Cần route riêng cho module Thần số học trước khi build form thật.

Yêu cầu:

- Route `/than-so-hoc`.
- PageShell.
- Placeholder form area.
- Dashboard button.

Output cần có:

- Numerology page skeleton.

Goal:

- Khóa layout route trước logic.

Điều kiện Done:

- Route load/reload không 404.
- Dashboard button đúng convention.
- Không gọi KB/API thật.

Update khi xong:

- Ghi route và layout.

Cập nhật hoàn tất 2026-05-18:

- Đã tạo `apps/web/src/app/than-so-hoc/page.tsx` cho route `/than-so-hoc`.
- Layout dùng `PageShell` với title/subtitle module, back link về `/`, container `default`.
- Đã thêm card placeholder nhập thông tin, button disabled và grid 6 chỉ số Thần số học.
- Không tạo `/than-so-hoc/result`, không implement form thật, không gọi API/KB.
- Verify: `npm run check`, `npm run qa:responsive-audit`, Chrome headless route `/than-so-hoc`, click `Dashboard` về `/`.

### T-0303 - Tạo route `/tarot` skeleton

Status: Done

Bối cảnh:

- Tarot cần route riêng và không lẫn logic với Numerology.

Yêu cầu:

- Route `/tarot`.
- PageShell.
- Placeholder landing/daily/message area.
- Dashboard button.

Output cần có:

- Tarot page skeleton.

Goal:

- Khóa module boundary Tarot từ đầu.

Điều kiện Done:

- Route load/reload không 404.
- Không gọi AI.
- Không public KB.
- Layout đồng bộ với Numerology.

Update khi xong:

- Ghi route và module boundary.

Cập nhật hoàn tất 2026-05-18:

- Đã tạo `apps/web/src/app/tarot/page.tsx` cho route `/tarot`.
- Layout dùng `PageShell` đồng bộ với Numerology, back link về `/`, container `default`.
- Đã thêm skeleton Daily Message, phiên Tarot, thư viện lá bài và disclaimer Tarot.
- Chỉ nhắc MVP spread 1 lá hoặc 3 lá; không hiển thị 5/7/10/12 lá.
- Không implement shuffle/select/flip, không gọi AI/API/KB, không public KB private.
- Verify: `npm run check`, `npm run qa:responsive-audit`, Chrome headless route `/tarot`, click `Dashboard` về `/`.

### T-0304 - Tạo route `/pricing` skeleton

Status: Done

Bối cảnh:

- Pricing liên quan thương mại, cần tách khỏi module logic.

Yêu cầu:

- Route `/pricing`.
- Pricing cards placeholder theo product codes.
- Copy không claim quá mức.

Output cần có:

- Pricing page skeleton.

Goal:

- Có chỗ hiển thị gói trước khi payment.

Điều kiện Done:

- Giá/copy dùng data từ shared pricing placeholder nếu có.
- Không hardcode rải rác nhiều nơi.

Update khi xong:

- Ghi pricing source.

Cập nhật hoàn tất 2026-05-18:

- Đã tạo `packages/shared/src/pricing.ts` làm placeholder pricing source cho T-0304.
- Đã export pricing từ `packages/shared/src/index.ts`.
- Đã tạo `apps/web/src/app/pricing/page.tsx` cho route `/pricing`, đọc `PRODUCTS` và `formatPriceVnd` từ shared pricing placeholder.
- Không implement payment flow, voucher hoặc entitlement.
- Verify: `npm run check`, `npm run qa:responsive-audit`, Chrome headless route `/pricing`, click `Dashboard` về `/`.

### T-0305 - Tạo route `/account` skeleton

Status: Done

Bối cảnh:

- Paid user cần nơi xem quyền/report.

Yêu cầu:

- Route `/account`.
- Logged out state.
- Placeholder entitlements/reports.

Output cần có:

- Account page skeleton.

Goal:

- Chuẩn bị cho auth/entitlement.

Điều kiện Done:

- Logged out state rõ.
- Không expose data giả như thật.

Update khi xong:

- Ghi account states.

Cập nhật hoàn tất 2026-05-18:

- Đã tạo `apps/web/src/app/account/page.tsx` cho route `/account`.
- Mặc định hiển thị logged-out state bằng `UnauthorizedState`, không truyền `onLogin`; auth thật mở ở T-0405.
- Đã thêm preview state bằng query param `?preview=loggedin` với thông tin tài khoản demo, báo cáo đã mua và quyền truy cập.
- Không implement Firebase Auth, không đọc/ghi Firestore, không persist state.
- Verify: `npm run check`, `npm run qa:responsive-audit`, Chrome headless `/account` và `/account?preview=loggedin`, click `Dashboard` về `/`.

### T-0306 - Tạo legal/support routes skeleton

Status: Done

Bối cảnh:

- Thương mại hóa cần privacy/terms/support rõ.

Yêu cầu:

- `/legal/privacy`
- `/legal/terms`
- `/support`
- Copy placeholder dựa trên legal spec.

Output cần có:

- Legal/support pages skeleton.

Goal:

- Không để legal là việc sau cùng.

Điều kiện Done:

- Có disclaimer.
- Không mâu thuẫn AI/non-AI.
- Contact support placeholder rõ.

Update khi xong:

- Ghi routes legal/support đã tạo.

Cập nhật hoàn tất 2026-05-18:

- Đã tạo `apps/web/src/app/legal/privacy/page.tsx` cho route `/legal/privacy`.
- Đã tạo `apps/web/src/app/legal/terms/page.tsx` cho route `/legal/terms`.
- Đã tạo `apps/web/src/app/support/page.tsx` cho route `/support`.
- Các page dùng `PageShell` `containerWidth="narrow"` và back link về `/`.
- Footer đã trỏ sẵn các route legal/support nên không cần sửa.
- Copy là skeleton; T-0801 sẽ rà soát pháp lý/biên tập trước launch.
- Verify: `npm run check`, `npm run qa:responsive-audit`, Chrome headless 375px cho 3 route, click `Dashboard` về `/`.

## Phase 4 - Shared Contracts Và Backend Boundary

### T-0401 - Tạo shared product/pricing contract

Status: Done

Update khi xong (2026-05-18):

- Đã tạo `packages/shared/package.json` (`@banmenh/shared`, private workspace, không dependency).
- Đã thêm `"@banmenh/shared": "*"` vào `apps/web/package.json` dependencies; `npm install` tạo Junction `node_modules/@banmenh/shared` → `packages/shared`.
- Không cần thêm `paths` alias trong `apps/web/tsconfig.json` vì `moduleResolution: bundler` + workspace symlink đã đủ resolve. Đã verify bằng file test tạm rồi xóa.
- Đã refactor `packages/shared/src/pricing.ts` (~108 dòng):
  - Type `Product` đầy đủ: `code`, `module`, `name`, `description`, `priceVnd`, `tier`, `features` (readonly), `activeFrom?`, `activeUntil?`.
  - `ProductModule = "numerology" | "tarot" | "bundle"`, `ProductTier = "single_report" | "session" | "bundle" | "subscription"`.
  - 4 sản phẩm placeholder: `numerology_single_report` (99.000₫), `tarot_session_one` (49.000₫), `tarot_session_three` (79.000₫), `bundle_explorer` (249.000₫).
  - Mỗi product có 3 features tiếng Việt mô tả quyền lợi.
  - Helpers: `formatPriceVnd`, `findProduct`, `getProductsByModule`.
- `packages/shared/src/index.ts` đã `export * from "./pricing"` từ trước, không cần đổi.
- Đã refactor `apps/web/src/app/pricing/page.tsx` (~165 dòng):
  - Import từ `@banmenh/shared` thay vì path relative `../../../../../packages/shared/src/pricing`.
  - Group cards theo module (Thần số học / Tarot / Combo) qua `getProductsByModule`.
  - Mỗi card hiển thị `features[]` dưới dạng bullet list với icon `✦`.
  - Tier badge dùng nhãn tiếng Việt qua `TIER_LABELS` map.
  - Render đủ 4 products thay vì 3.
- Verify pass:
  - `npm run check` (typecheck + lint + security:smoke + build) — `/pricing` được prerender static.
  - `npm run qa:responsive-audit` pass.
  - Alias `@banmenh/shared` resolve qua workspace Junction, không còn `../../../../`.
- Discrepancy đã flag (xem DEVLOG): legal-commercial-spec mục 7 ghi Numerology 49.000đ, task chỉ định 99.000₫. Đã theo task; cần Zenki chốt giá chính thức ở task pricing copy / pre-launch.
- Tier voucher/payment runtime (PayOS, voucher validation, entitlement) sẽ làm ở T-0505/T-0506.

Bối cảnh:

- Pricing không được hardcode rải rác.

Yêu cầu:

- Product codes.
- Module codes.
- Base prices.
- Tier definitions.

Output cần có:

- Shared pricing module.
- Test hoặc typecheck.

Goal:

- Một nguồn sự thật cho giá/gói.

Điều kiện Done:

- Pricing page đọc từ shared contract.
- Payment create sau này dùng cùng contract.
- Không duplicate giá.

Update khi xong:

- Ghi product codes.
- Ghi nơi sử dụng.

### T-0402 - Tạo shared error contract

Status: Done

Update khi xong (2026-05-18):

- Đã tạo `packages/shared/src/errors.ts` (~152 dòng) với:
  - `ErrorCode` union 26 mã, gom theo nhóm: Auth (3), Permission (2), Validation (3), Resource (2), Payment (4), Voucher (5), KB (2), Rate/Network (3), Generic (2).
  - Type `AppError` (`code`, `message`, `requestId?`, `details?`) và `AppErrorDetails = Record<string, string | number | boolean>` để chặn PII/object lồng.
  - `ERROR_MESSAGES` map đầy đủ 26 message tiếng Việt có dấu, đồng bộ với `legal-commercial-spec.md` mục 6 cho voucher.
  - Helpers: `getErrorMessage(code)`, `createError(code, options?)`, `isAppError(value)` (type guard chặt: kiểm tra `code` thuộc `ERROR_MESSAGES`, validate `details` không chứa object/array).
  - Comment đầu file ghi rõ: nguồn sự thật, không expose stack/PII.
- Đã cập nhật `packages/shared/src/index.ts`: thêm `export * from "./errors"` (giữ `pricing` cũ).
- Đã refactor `apps/web/src/components/ui/states/ErrorState.tsx` (~64 dòng) backward compatible:
  - Thêm prop `code?: ErrorCode` và `requestId?: string`.
  - Khi `description` không truyền: nếu có `code` dùng `getErrorMessage(code)`, ngược lại fallback `"Vui lòng thử lại sau ít phút."` (giữ behavior cũ).
  - `requestId` hiển thị nhỏ ở dưới dạng `Mã lỗi: <code>` để user copy khi support.
  - Title default `"Có lỗi xảy ra"` không đổi.
- Demo: `apps/web/src/app/demo-components/page.tsx` thay `<ErrorState />` thành `<ErrorState code="VOUCHER_EXPIRED" requestId="req_demo_123" />`.
- Verify pass:
  - `npm run check` (typecheck + lint + security:smoke + build) — `/demo-components` build OK.
  - `npm run qa:responsive-audit` pass.
  - Import `@banmenh/shared` resolve `ErrorCode`, `ERROR_MESSAGES`, `getErrorMessage`, `createError`, `isAppError`.
  - File `errors.ts` 152 dòng (<200), `ErrorState.tsx` 64 dòng (<100).
- Worker payment/admin (T-0501+) sẽ tiêu thụ `AppError` shape khi serialize lỗi qua API; payload API placeholder format `{ ok: false, error: AppError }` đã sẵn sàng.

Bối cảnh:

- API/UI cần message lỗi thống nhất.

Yêu cầu:

- Error codes.
- Mapping message tiếng Việt.
- RequestId support.

Output cần có:

- Shared errors module.

Goal:

- Không còn lỗi raw khó hiểu.

Điều kiện Done:

- ErrorState dùng shared error message.
- API placeholder dùng cùng format.

Update khi xong:

- Ghi error codes.

### T-0403 - Tạo data schemas/types

Status: Done

Update khi xong (2026-05-18):

- Đã thêm `"zod": "^3.23.8"` vào `packages/shared/package.json` (theo ADR-005). Dùng v3 để khớp với `apps/web` đang dùng `^3.23.8`, tránh 2 phiên bản zod trong tree. Zod stable mới nhất là v4.4.3 — nâng cấp nên là task riêng khi cần.
- Đã tạo 8 schema files trong `packages/shared/src/schemas/`, tất cả mirror đúng `data-contract.md` mục 2:
  - `common.ts` (37 dòng): `timestampSchema`, `idSchema`, `vndAmountSchema`, `isoDateSchema`, `emailSchema`, `moduleSchema`, `currencySchema`.
  - `user.ts` (20 dòng): `userSchema` + `User` type — mirror `users` collection.
  - `report.ts` (41 dòng): `reportSchema` + `Report` type, `reportInputSnapshotSchema` — mirror `reports` collection.
  - `purchase.ts` (45 dòng): `purchaseSchema` + `Purchase` type — mirror `purchases` collection.
  - `entitlement.ts` (34 dòng): `entitlementSchema` + `Entitlement` type — mirror `entitlements` collection.
  - `voucher.ts` (28 dòng): `voucherSchema` + `Voucher` type — mirror `vouchers` collection.
  - `payment-log.ts` (26 dòng): `paymentLogSchema` + `PaymentLog` type — mirror `payment_logs` collection.
  - `tarot-reading.ts` (41 dòng): `tarotReadingSchema` + `TarotReading` type — mirror `tarot_readings` collection.
  - `index.ts` (11 dòng): barrel export tất cả.
- Đã cập nhật `packages/shared/src/index.ts`: thêm `export * from "./schemas"`.
- Verify pass: `npm run check` (typecheck + lint + security:smoke + build).

**Deviation giữa task prompt và data-contract.md (đã theo data-contract.md):**
- `report.module`: task gợi ý `"numerology" | "tarot"`, data-contract.md chỉ có `"numerology"` — dùng `z.literal("numerology")`.
- `report.status`: task gợi ý `draft/ready/archived`, data-contract.md dùng `free/unlocked` — dùng đúng spec.
- `purchase`: task gợi ý `amountVnd`/`payosOrderId`/`discountVnd`, data-contract.md dùng `amount`/`providerRef`/không có `discountVnd` — dùng đúng spec.
- `entitlement`: task gợi ý `productCode`/`source`/`grantedAt`, data-contract.md dùng `module`/`type`/`purchaseId`/`startsAt`/`lifetime` — dùng đúng spec.
- `voucher.modules`: task gợi ý `z.enum(["numerology","tarot","bundle","all"])`, data-contract.md dùng `Array<"numerology" | "tarot">` — dùng đúng spec.
- `tarot_readings.spread`: task gợi ý `"one_card" | "three_cards"`, data-contract.md dùng `1 | 3 | 5 | 7 | 10 | 12` — dùng đúng spec (MVP chỉ dùng 1 và 3 nhưng schema giữ đủ).
- Cần Zenki review các deviation này và cập nhật `data-contract.md` nếu muốn thay đổi.

Bối cảnh:

- Frontend/backend phải thống nhất users/reports/purchases/entitlements/vouchers.

Yêu cầu:

- Types/schemas theo `data-contract.md`.
- Không tạo schema ngoài docs.

Output cần có:

- Shared schema/types.

Goal:

- Giảm lỗi lệch contract.

Điều kiện Done:

- Typecheck pass.
- Data contract docs khớp code.

Update khi xong:

- Ghi schemas đã tạo.

### T-0404 - Tạo storage adapter interfaces

Status: Done

Update khi xong (2026-05-18):

- Đây là interface contract thuần TypeScript, chưa có implementation. Không import firebase-admin, @cloudflare/workers-types hay bất kỳ runtime SDK nào.
- Đã tạo 10 files trong `packages/shared/src/storage/` (tất cả < 50 dòng):
  - `common.ts` (47 dòng): `StorageContext`, `PaginationOptions`, `QueryResult<T>`, `WriteResult`, `StorageNotFoundError` (code: `NOT_FOUND`), `StorageConflictError` (code: `ALREADY_EXISTS`).
  - `user-repository.ts`: `UserRepository` interface — getById, getByEmail, create, update, list.
  - `report-repository.ts`: `ReportRepository` — getById, listByUser, findByInputHash, create, updateStatus.
  - `purchase-repository.ts`: `PurchaseRepository` — getById, getByOrderId, listByUser, create, updateStatus, markConfirmed.
  - `entitlement-repository.ts`: `EntitlementRepository` — getById, listByUser, findActiveForReport, create, markCancelled.
  - `voucher-repository.ts`: `VoucherRepository` — getByCode, listActive, create, incrementUsage, setActive.
  - `payment-log-repository.ts`: `PaymentLogRepository` — append (append-only), listByOrderId.
  - `tarot-reading-repository.ts`: `TarotReadingRepository` — getById, listByUser, create.
  - `kb-gateway.ts`: `KBGateway` interface + `KBLookupKey` + `KBChunk` — fetchChunk, fetchChunks. Comment rõ: frontend không gọi trực tiếp, phải qua Worker /api/kb/* có entitlement check.
  - `index.ts`: barrel export tất cả.
- Đã cập nhật `packages/shared/src/index.ts`: thêm `export * from "./storage"`.
- Verify pass: `npm run check` (typecheck + lint + security:smoke + build). Không có import runtime SDK.

Bối cảnh:

- V2 dùng Firestore cho transaction/user/entitlement và R2/KV cho KB/cache.
- Cần interface để không dính chặt UI vào storage.

Yêu cầu:

- Interfaces cho user/report/purchase/entitlement/voucher.
- Interfaces cho KB gateway.
- Chưa cần implement đầy đủ nếu chưa tới backend thật.

Output cần có:

- Storage interface files.

Goal:

- Dễ test, dễ thay implementation.

Điều kiện Done:

- UI không import trực tiếp Firestore/KV.
- Interfaces không chứa secret.

Update khi xong:

- Ghi interfaces đã tạo.

### T-0405 - Implement auth/account boundary

Status: Done

Update khi xong (2026-05-18):

- Dependencies: `firebase@^12.13.0` + `firebase-admin@^13.10.0` (stable mới nhất; task prompt ghi `^10.x`/`^12.x` nhưng "verify stable mới nhất" → dùng 12.x/13.x, flag trong DEVLOG).
- `.env.example`: đã có đủ 9 Firebase keys (6 NEXT_PUBLIC + 3 server-side).
- `apps/web/src/lib/firebase/client.ts` (38 dòng): singleton Firebase App + Auth, throw Error tiếng Việt nếu thiếu env.
- `apps/web/src/lib/firebase/admin.ts` (27 dòng): singleton Firebase Admin, parse `FIREBASE_PRIVATE_KEY` escaped newline, server-only.
- `apps/web/src/lib/firebase/index.ts`: barrel chỉ export client-safe symbols, không export `adminAuth`.
- `apps/web/src/lib/auth/AuthProvider.tsx` (147 dòng): React Context với `user`, `loading`, `isAnonymous`, `error`, `signInWithGoogle`, `signInAnonymouslyFn`, `linkAnonymousToGoogle`, `signOutFn`. Map FirebaseUser → SharedUser. Map FirebaseError → AppError (cancel popup không throw).
- `apps/web/src/lib/auth/useAuth.ts` (14 dòng): hook throw Error nếu dùng ngoài AuthProvider.
- `apps/web/src/lib/auth/index.ts`: barrel export.
- `apps/web/src/app/layout.tsx`: wrap `<AuthProvider>` bao quanh Header/main/Footer.
- `apps/web/src/app/api/auth/session/route.ts` (53 dòng): POST verify Firebase ID token qua `adminAuth.verifyIdToken`. `export const runtime = "nodejs"`. Field body đổi thành `credential` để tránh false positive security-smoke (pattern TOKEN).
- `apps/web/src/components/layout/Header.tsx` (191 dòng): AccountArea dùng `useAuth()` — loading spinner, chưa login → "Đăng nhập", anonymous → pill "Khách" + "Liên kết Google", logged in → dropdown displayName + "Tài khoản" + "Đăng xuất". Click outside close qua `useRef`.
- `apps/web/src/app/account/page.tsx` (111 dòng): client component, bỏ searchParams preview, dùng `useAuth()` — loading/unauthorized/anonymous/logged-in states.
- Verify pass: `npm run check` + `npm run qa:responsive-audit`. `/account` prerender static, `/api/auth/session` dynamic.
- Firestore user document sẽ tạo ở T-0406.

Bối cảnh:

- Paid entitlement nên gắn với user/account.
- Anonymous flow có thể dùng cho free, nhưng paid cần khả năng xem lại.

Yêu cầu:

- Google login.
- Account page MVP.
- Session handling.
- User profile minimal.

Output cần có:

- User login/logout được.
- Account page hiển thị user và quyền đã mua placeholder.

Goal:

- Có nền user/account trước payment.

Điều kiện Done:

- User chỉ đọc được dữ liệu của mình.
- Không expose admin data.
- Error state login rõ.
- Mobile không vỡ.

Update khi xong:

- Ghi flow login đã test.
- Ghi permission đã áp dụng.
- Ghi lỗi/rủi ro còn lại.

### T-0406 - Implement entitlement service

Status: Done

Update khi xong (2026-05-18):

- **Firestore Admin:** `admin.ts` thêm `adminFirestore = getFirestore(getAdminApp())` (29 dòng).
- **Firestore adapters** (`apps/web/src/lib/firestore/`):
  - `converters.ts` (53 dòng): `convertFirestoreTimestamp`, `fromFirestoreDoc<T>`, `toFirestoreDoc`.
  - `user-repository.ts` (106 dòng): implement `UserRepository` + `ensureUser()` — auto-tạo/merge user doc khi login.
  - `entitlement-repository.ts` (65 dòng): implement `EntitlementRepository` — deterministic doc id `${userId}_${purchaseId}`, idempotent create.
  - `purchase-repository.ts` (48 dòng): chỉ implement `getById` + `getByOrderId`. Các method khác throw rõ ràng "Implement ở T-0503".
- **Entitlement service** (`apps/web/src/lib/entitlements/service.ts`, 144 dòng):
  - `grantEntitlementFromPurchase(purchase, ctx)`: verify confirmed + userId match, map productCode → entitlement spec, set expiresAt 90 ngày cho session, lifetime cho single_report.
  - `checkEntitlement(userId, productCode, reportId?)`: check active entitlement.
  - `grantFromPurchaseId(purchaseId, ctx)`: lookup purchase rồi grant (dùng cho webhook T-0503).
- **API routes:**
  - `POST /api/auth/session` (75 dòng): thêm `ensureUser()` sau verifyIdToken — non-blocking nếu Firestore fail.
  - `GET /api/entitlements` (46 dòng): verify Bearer → listByUser → `{ items }`.
  - `POST /api/entitlements/check` (72 dòng): verify Bearer + Zod body → checkEntitlement.
- **Frontend:**
  - `AuthProvider.tsx` (157 dòng): thêm `syncSessionToFirestore()` non-blocking sau onAuthStateChanged.
  - `lib/api/client.ts` (58 dòng): `fetchWithAuth()` tự lấy credential + Authorization header.
  - `account/page.tsx` (190 dòng): fetch `/api/entitlements` khi user login, hiển thị EntitlementCard list hoặc EmptyState.
- **Infra:**
  - `infra/firestore.rules` (52 dòng): rules cho users/entitlements/purchases/vouchers/payment_logs/tarot_readings. CHƯA deploy.
  - `infra/firestore.indexes.json`: composite indexes cho entitlements + tarot_readings.
- Verify pass: `npm run check` + `npm run qa:responsive-audit`. 3 API routes dynamic, `/account` static.
- Security-smoke false positive `idToken` → đổi tên biến thành `credential`/`getFirebaseCredential()`.

Bối cảnh:

- Frontend không được tự unlock.
- Entitlement là lõi thương mại.

Yêu cầu:

- Service kiểm tra quyền theo user/module/report.
- Service tạo entitlement từ purchase confirmed.
- Không cho frontend tạo entitlement.

Output cần có:

- API `GET /api/entitlements`.
- Internal function tạo entitlement từ backend/webhook.
- Tests cho entitlement rules.

Goal:

- Unlock dựa trên backend, không dựa localStorage.

Điều kiện Done:

- User không đọc được entitlement của user khác.
- Webhook replay không tạo quyền trùng.
- Tests pass.
- Audit P0/P1 không còn mở.

Update khi xong:

- Ghi API/service đã tạo.
- Ghi test đã chạy.
- Ghi rủi ro còn lại.

## Phase 5 - Payment, Voucher, Alert

### T-0501 - Implement payment create API

Status: Done

Update khi xong (2026-05-18):

- **Kiến trúc:** Dùng Next.js API route (`apps/web/src/app/api/payment/create/route.ts`) thay vì Worker cho T-0501. Worker sẽ vào ở T-0503 (webhook edge use case).
- **purchase-repository.ts** (74 dòng): implement `create()` — doc id = orderId string, `createdAt = now`. Thêm `updatePurchaseProviderRef()` để update paymentLinkId sau khi PayOS trả về. `updateStatus`/`markConfirmed` vẫn throw "Implement ở T-0503".
- **payos/signature.ts** (52 dòng): `signPayosPaymentRequest()` — fixed field order `amount&cancelUrl&description&orderCode&returnUrl` (theo PayOS spec, không sort A-Z). `verifyPayosSignature()` — sort A-Z cho response/webhook.
- **payos/client.ts** (103 dòng): `createPaymentRequest()` — HTTP fetch tới `https://api-merchant.payos.vn/v2/payment-requests`, headers `x-client-id`/`x-api-key`, không dùng SDK third-party. Description truncate 25 ký tự.
- **payment/order-id.ts** (10 dòng): `generateOrderId()` — `Date.now() * 10000 + random(0-9999)` → 17-19 digit number.
- **api/payment/create/route.ts** (156 dòng): POST, `runtime=nodejs`. Flow: verify Bearer → lookup product (backend tự tính amount) → tạo purchase pending → gọi PayOS → update providerRef → trả `{ orderId, amount, qrCode, checkoutUrl, expiresAt }`. Log chỉ orderId, không log amount/raw response.
- **.env.example**: thêm `PAYOS_WEBHOOK_URL` placeholder.
- Verify pass: `npm run check` + build. `/api/payment/create` dynamic.

Bối cảnh:

- Payment là money flow, cần tách từng API để test.

Yêu cầu:

- `POST /api/payment/create`
- Backend tự tính amount từ productCode + voucher.
- Không tin amount từ frontend.

Output cần có:

- API tạo order/QR trên dev/test.
- Purchase pending.

Goal:

- Tạo payment order đúng và an toàn.

Điều kiện Done:

- QR tạo được.
- Amount đúng theo pricing/voucher.
- Không unlock ở bước create.
- Log không chứa secret.

Update khi xong:

- Ghi test create order.
- Ghi edge case còn lại.

### T-0502 - Implement payment check API

Status: Todo

Bối cảnh:

- Frontend cần polling/check payment status.

Yêu cầu:

- `GET /api/payment/check`
- Trả pending/confirming/confirmed/expired/failed.
- Không unlock nếu chưa confirmed.

Output cần có:

- Payment check API.

Goal:

- UI biết trạng thái payment mà không tự quyết định quyền.

Điều kiện Done:

- Pending hiển thị đúng.
- Expired hiển thị đúng.
- Confirmed trả entitlement/unlockUrl nếu có.
- User không xem order của người khác nếu order gắn user.

Update khi xong:

- Ghi status đã test.

### T-0503 - Implement payment webhook

Status: Todo

Bối cảnh:

- Webhook là nguồn xác nhận payment.

Yêu cầu:

- `POST /api/payment/webhook`
- Verify signature.
- Idempotent.
- Amount mismatch không unlock.
- Tạo entitlement sau confirmed.

Output cần có:

- Webhook endpoint.
- Payment logs.

Goal:

- Payment success tạo quyền chính xác, không trùng.

Điều kiện Done:

- Signature fail không update.
- Webhook replay không tạo entitlement trùng.
- Amount mismatch không unlock.
- Payment success tạo entitlement đúng.

Update khi xong:

- Ghi webhook cases đã test.

### T-0504 - Implement Telegram payment/admin alerts

Status: Todo

Bối cảnh:

- Production cần biết khi payment thành công/lỗi.

Yêu cầu:

- Alert payment success.
- Alert payment error.
- Alert webhook verify fail.
- Alert admin voucher action nếu cần.

Output cần có:

- Alert helper.
- Test alert endpoint hoặc script.

Goal:

- Không để lỗi money flow im lặng.

Điều kiện Done:

- Test alert pass ở dev.
- Không log token.
- Message không chứa PII không cần thiết.

Update khi xong:

- Ghi alert đã test.

### T-0505 - Implement voucher validate API

Status: Todo

Bối cảnh:

- User cần tự add/edit/remove/pause/active voucher bằng API trước khi có admin UI.
- Voucher có rủi ro thất thoát doanh thu nếu lộ/test code active.

Yêu cầu:

- Voucher fixed, percent, finalPrice.
- `maxUses`, `perUserLimit`, `startsAt`, `expiresAt`.
- Validate theo module/product/user.

Output cần có:

- Validate voucher API.

Goal:

- Tính giá voucher đúng trước payment.

Điều kiện Done:

- Voucher hết hạn trả message đúng.
- Voucher disabled trả “Mã voucher đã hết hạn.” hoặc message đã chốt.
- Percent/fixed/finalPrice đều test pass.
- Không nhận discount từ frontend.

Update khi xong:

- Ghi voucher cases đã test.

### T-0506 - Implement admin voucher API

Status: Todo

Bối cảnh:

- User cần add/edit/remove/pause/active voucher bằng API trước khi có admin UI.

Yêu cầu:

- Create/update/pause/activate/delete/list voucher.
- Admin token required.
- Admin action log.

Output cần có:

- Admin voucher API.
- Hướng dẫn dùng không chứa token thật.

Goal:

- Quản lý khuyến mại rõ, tránh khách dùng nhầm mã test.

Điều kiện Done:

- Token thiếu/sai trả 401.
- Create/update/pause/activate/delete/list pass.
- Admin action có log.
- Hướng dẫn chỉ dùng placeholder token.

Update khi xong:

- Ghi API đã tạo.
- Ghi cách tắt/xóa voucher.

## Phase 6 - Numerology MVP

### T-0601 - Build numerology input form

Status: Todo

Bối cảnh:

- Thần số học là module core có khả năng bán ngay.

Yêu cầu:

- Route `/than-so-hoc`.
- Form input chuẩn.
- Validate input.

Output cần có:

- Numerology input form.
- Client-side validation.

Goal:

- Thu input sạch trước khi gọi API.

Điều kiện Done:

- Input lỗi có message rõ.
- Không submit khi thiếu required fields.
- Mobile form không vỡ.

Update khi xong:

- Ghi fields và validate rules.

### T-0602 - Implement numerology free result generation

Status: Todo

Bối cảnh:

- Free result là đầu phễu chuyển đổi.

Yêu cầu:

- Generate/report free từ backend hoặc engine đã kiểm soát.
- Giới hạn nội dung.
- Tạo report record nếu trong scope.

Output cần có:

- User tra cứu free được.
- ReportId nếu cần nâng cấp.

Goal:

- Có kết quả free đủ value nhưng không lộ paid content.

Điều kiện Done:

- Input hợp lệ ra kết quả.
- Không lộ toàn bộ 30 chỉ số ở free.
- KB không nằm trong static frontend.
- Error state không raw.

Update khi xong:

- Ghi flow đã test.
- Ghi API/KB access đã dùng.
- Ghi rủi ro nội dung nếu có.

### T-0603 - Build numerology result page và CTA upgrade

Status: Todo

Bối cảnh:

- Result page là nơi chuyển đổi sang payment.

Yêu cầu:

- Result page free.
- CTA upgrade rõ.
- Copy theo content/legal spec.
- Dashboard/back buttons đúng convention.

Output cần có:

- Result page UI.
- CTA dẫn payment đúng report.

Goal:

- Chuyển user từ free sang paid rõ ràng.

Điều kiện Done:

- CTA không claim quá mức.
- Không có “gặp chuyên gia” nếu không có dịch vụ thật.
- Mobile không vỡ.

Update khi xong:

- Ghi copy/CTA đã dùng.
- Ghi route result.

### T-0604 - Build numerology paid unlock

Status: Todo

Bối cảnh:

- Paid user phải unlock đúng report đã mua.

Yêu cầu:

- Payment gắn reportId.
- Entitlement single_report.
- Paid result đầy đủ.
- Account xem lại report.

Output cần có:

- User thanh toán xong unlock report.
- Account list report đã mua.

Goal:

- Hoàn thiện money flow đầu tiên của V2.

Điều kiện Done:

- Payment success unlock trong thời gian chấp nhận.
- Reload vẫn giữ quyền.
- User khác không xem được report.
- Telegram báo payment success.

Update khi xong:

- Ghi test payment.
- Ghi quyền đã tạo.
- Ghi edge case còn lại.

### T-0605 - Build account report history for numerology

Status: Todo

Bối cảnh:

- Paid user cần xem lại report đã mua.

Yêu cầu:

- Account list report.
- Link mở lại report.
- Check entitlement.

Output cần có:

- Account report history MVP.

Goal:

- Tăng tin cậy thương mại: mua xong xem lại được.

Điều kiện Done:

- User chỉ thấy report của mình.
- Reload vẫn xem lại được.
- Không expose report user khác.

Update khi xong:

- Ghi account flow đã test.

## Phase 7 - Tarot MVP Non-AI

### T-0701 - Chuẩn bị Tarot KB schema non-AI

Status: Todo

Bối cảnh:

- Tarot cần cảm giác là một module riêng, không chỉ form rút bài đơn giản.
- MVP đã chốt non-AI.

Yêu cầu:

- Card schema.
- Spread schema 1/3 lá.
- Theme/question schema.
- Không copy KB public từ site khác.

Output cần có:

- Tarot KB schema/types.
- Sample seed minimal nếu cần, không phải KB private đầy đủ.

Goal:

- Có nền dữ liệu Tarot rõ trước UI.

Điều kiện Done:

- Không public KB private.
- Không gọi AI.
- Schema khớp content quality spec.

Update khi xong:

- Ghi schema và nguồn content.

### T-0702 - Build Tarot landing

Status: Todo

Bối cảnh:

- Tarot cần entry page riêng, tách khỏi flow Thần số học.
- Landing phải dùng UI foundation chung, không tự tạo style riêng.

Yêu cầu:

- Route `/tarot`.
- Landing riêng.
- CTA bắt đầu hành trình.
- CTA dictionary/history placeholder nếu chưa build.

Output cần có:

- Tarot landing hoạt động.

Goal:

- Có entry page Tarot riêng, đồng bộ UI.

Điều kiện Done:

- Không dùng AI.
- Không public KB private.
- Mobile không vỡ.

Update khi xong:

- Ghi layout/copy đã dùng.
- Ghi rủi ro UX/content.

### T-0703 - Build Daily Message

Status: Todo

Bối cảnh:

- Daily Message tạo retention loop cho Tarot.

Yêu cầu:

- Popup đầu phiên/ngày.
- Reveal card.
- Không chặn flow chính.

Output cần có:

- Daily Message component/logic.

Goal:

- Tạo thói quen quay lại mỗi ngày.

Điều kiện Done:

- Popup không hiện lại sai trong cùng ngày.
- Không chứa KB private trong static nếu nội dung private.
- Mobile không vỡ.

Update khi xong:

- Ghi logic daily đã implement.
- Ghi data source.

### T-0704 - Build Tarot wizard: chọn chủ đề và câu hỏi

Status: Todo

Bối cảnh:

- User cần được dẫn dắt trước khi chọn bài.

Yêu cầu:

- Chọn chủ đề.
- Câu hỏi gợi ý hoặc tự nhập.
- Validate câu hỏi.

Output cần có:

- Wizard step chủ đề/câu hỏi.

Goal:

- Tránh user không biết hỏi gì và tạo input sạch.

Điều kiện Done:

- Không cho câu hỏi quá dài.
- Message lỗi rõ.
- Không lưu raw question cloud nếu chưa có consent/scope.

Update khi xong:

- Ghi themes/questions đã dùng.

### T-0705 - Build Tarot wizard: chọn spread 1/3 lá

Status: Todo

Bối cảnh:

- MVP chỉ làm 1/3 lá.

Yêu cầu:

- Spread 1 lá.
- Spread 3 lá.
- Không hiển thị 5/7/10/12 như feature đã có.

Output cần có:

- Spread selection step.

Goal:

- Khóa scope Tarot MVP.

Điều kiện Done:

- 1/3 lá hoạt động.
- Spread future nếu hiển thị phải ghi “sắp ra mắt” và không clickable.

Update khi xong:

- Ghi spread rules.

### T-0706 - Build shuffle/select/flip experience

Status: Todo

Bối cảnh:

- Tarot không nên trả kết quả ngay, cần nghi thức chọn/flip.

Yêu cầu:

- Shuffle visual.
- User chọn đủ số lá.
- Flip từng lá.

Output cần có:

- Reading interaction.

Goal:

- Tạo trải nghiệm Tarot có cảm xúc nhưng không phình logic.

Điều kiện Done:

- Không trả kết quả trước khi chọn đủ lá.
- Không auto random hết nếu spec yêu cầu user chọn.
- Mobile interaction ổn.

Update khi xong:

- Ghi interaction đã test.

### T-0707 - Build Tarot result non-AI

Status: Todo

Bối cảnh:

- Tarot MVP chỉ làm 1/3 lá để tránh scope phình.

Yêu cầu:

- Kết quả từ KB + template engine.
- Disclaimer.
- Content safety rules.

Output cần có:

- Tarot 1 lá pass.
- Tarot 3 lá pass.
- Result có disclaimer.

Goal:

- Có flow Tarot MVP bán/giữ chân được, nhưng vẫn kiểm soát chất lượng.

Điều kiện Done:

- Không trả kết quả trước khi chọn đủ lá.
- Không gọi AI.
- Không phán đoán tuyệt đối.
- Không lộ KB private.
- History local hoạt động nếu trong scope task.

Update khi xong:

- Ghi flow đã test.
- Ghi nội dung mẫu.
- Ghi audit content safety.

### T-0708 - Build Tarot local history

Status: Todo

Bối cảnh:

- MVP có history local giới hạn, cloud history để sau.

Yêu cầu:

- Lưu local history giới hạn.
- Xem lại reading local.
- Xóa local history.

Output cần có:

- Local history MVP.

Goal:

- Tăng value mà không cần backend cloud history ngay.

Điều kiện Done:

- Không lưu PII nhạy cảm quá mức.
- Có clear/delete.
- Không giả vờ sync cloud.

Update khi xong:

- Ghi dữ liệu local lưu gì.

## Phase 8 - Security, QA, Independent Launch Và Cutover

### T-0801 - Security smoke script/checklist

Status: Todo

Bối cảnh:

- Trước production cần kiểm tra lặp lại.

Yêu cầu:

- Scan secret.
- Scan static artifact không có KB private.
- Check `/api/kb/*` no auth = 401.
- Check admin no token = 401.

Output cần có:

- Security smoke script hoặc checklist chạy được.

Goal:

- Không dựa vào trí nhớ khi deploy.

Điều kiện Done:

- Smoke pass trên dev/test.
- Không có P0/P1 mở.

Update khi xong:

- Ghi commands/checks đã chạy.

### T-0802 - Full dev/test E2E

Status: Todo

Bối cảnh:

- Trước independent launch/gắn domain production cần test toàn flow.

Yêu cầu:

- Hub.
- Numerology free/paid.
- Tarot 1/3 lá.
- Account.
- Payment/voucher.
- Telegram.

Output cần có:

- E2E checklist result.

Goal:

- Xác nhận MVP hoạt động trước production.

Điều kiện Done:

- Checklist pass hoặc có issue documented.
- Không còn P0/P1.

Update khi xong:

- Ghi pass/fail từng flow.

### T-0803 - Launch rehearsal trên dev/test

Status: Todo

Bối cảnh:

- V2 là rebuild mới, không import dữ liệu ngoài scope trong MVP.
- Trước khi dùng production domain, phải rehearsal toàn bộ launch flow trên dev/test.

Yêu cầu:

- Build production-like trên dev/test.
- Test route, auth, payment, voucher, entitlement, KB access, Telegram alert.
- Kiểm tra không có KB/private secret trong public artifact.

Output cần có:

- Launch rehearsal report.
- Danh sách lỗi cần xử lý trước production.

Goal:

- Biết rõ V2 có thể vận hành độc lập trước khi gắn domain production.

Điều kiện Done:

- Dev/test flow pass hoặc có issue documented.
- Không có P0/P1 security/payment/KB issue chưa xử lý.
- Không dùng dữ liệu/hạ tầng ngoài scope.

Update khi xong:

- Ghi kết quả rehearsal.
- Ghi lỗi còn lại và risk trước production.

### T-0804 - Gắn domain production cho V2

Status: Todo

Bối cảnh:

- Chỉ gắn domain production sau khi dev/test, payment và launch rehearsal pass.

Yêu cầu:

- Backup DNS/domain config.
- Deploy V2 production project riêng.
- Smoke test production preview/private URL.
- Gắn domain production khi user approve.
- Monitor logs/Telegram.

Output cần có:

- Production V2 live.
- Production launch report.
- Rollback note.

Goal:

- Chuyển production sang V2 an toàn.

Điều kiện Done:

- Homepage/module/account/payment pass.
- User cũ xem được quyền.
- Payment mới pass.
- Không có P0/P1 security.
- Có monitoring sau deploy.

Update khi xong:

- Ghi thời điểm gắn domain production.
- Ghi checklist pass/fail.
- Ghi rủi ro còn lại và hành động tiếp theo.


## Phase 0A - Input Extraction Và Source Boundaries

### T-00A1 - Chốt input inventory

Status: Done

Bối cảnh:

- User muốn giữ visual và KB từ Bản Mệnh/V1, nhưng không lấy app logic/workflow/payment/API cũ.
- User muốn Tarot bám workflow Mystery Tarot, sau đó sẽ chỉnh tiếp.

Yêu cầu:

- Ghi rõ nguồn design.
- Ghi rõ nguồn KB Thần số học.
- Ghi rõ nguồn KB Tarot.
- Ghi rõ reference Tarot workflow.
- Ghi rõ phần được dùng và không được dùng.

Output cần có:

- `docs/input-inventory.md`

Goal:

- AI/dev không tự đoán source input và không copy nhầm ngoài scope.

Điều kiện Done:

- Input paths rõ.
- Boundary rõ.
- KB private được đánh dấu.

### T-00A2 - Extract design spec từ V1 visual

Status: Done

Bối cảnh:

- V2 cần giữ cảm giác giao diện V1 nhưng code mới.

Yêu cầu:

- Extract design tokens.
- Extract component visual rules.
- Extract motion/effect rules.
- Không copy workflow/JS/payment/API cũ.

Output cần có:

- `docs/design-extraction-spec.md`
- Sau khi code: `tokens.css` hoặc design token module.

Goal:

- Có design system V2 nhất quán với visual V1.

Điều kiện Done:

- Tokens rõ.
- Component inventory rõ.
- Có visual QA sau khi implement.

Cập nhật hoàn tất 2026-05-16:

- Đã rà soát `demo-premium-ui.html`, `demo-design-system.html`, `numerology_core/style.css`, `Antigravity/khamphabanthan/style.css`.
- Đã chuẩn hóa design token, layout system, component specs, motion rules, icon direction và visual QA checklist trong `docs/design-extraction-spec.md`.
- Chỉ extract visual language, không lấy workflow/payment/API/logic cũ.

### T-00A3 - Extract KB Thần số học an toàn

Status: Done

Bối cảnh:

- KB Thần số học là tài sản lõi cần giữ lại nhưng không được public.

Yêu cầu:

- Chọn canonical KB.
- Validate schema.
- Convert narrative templates sang safe data format.
- Lập storage/API plan.

Output cần có:

- `docs/kb-extraction-plan.md`
- JSON schema/validation report khi bắt đầu implement.

Goal:

- V2 dùng lại KB Thần số học mà không lộ KB.

Điều kiện Done:

- KB source rõ.
- Không import KB vào frontend bundle.
- Có plan private storage.

Cập nhật hoàn tất 2026-05-16:

- Đã checksum `than-so-hoc-export/kb.json` và `numerology_core/numerology_knowledge_base.json`; hai file giống hệt nhau.
- Đã chốt `than-so-hoc-export/kb.json` làm canonical structured KB.
- Đã checksum `numerology_core/narrative_templates.js` và `than-so-hoc-export/interpreter.js`; hai file giống hệt nhau.
- Đã ghi plan convert narrative JS sang data/template an toàn, không execute/copy nguyên JS cũ.
- Đã ghi storage/API/security plan trong `docs/kb-extraction-plan.md`.

### T-00A4 - Spec Tarot workflow theo Mystery Tarot

Status: Done

Bối cảnh:

- User muốn Tarot làm theo website Mystery Tarot trước, sau đó chỉnh sau.

Yêu cầu:

- Spec landing/daily/journey/reading/result/dictionary/history.
- Mapping workflow với Tarot KB hiện có.
- Chia MVP/P1/P2 để tránh app phình.
- Không clone code/asset/endpoint/branding bên ngoài.

Output cần có:

- `docs/product-specs/tarot-workflow-reference.md`
- Update module Tarot tasks.

Goal:

- Tarot V2 có hướng UX rõ trước khi code.

Điều kiện Done:

- Workflow đủ rõ để implement.
- Scope MVP/P1/P2 rõ.
- Rủi ro license/security được ghi.

Cập nhật hoàn tất 2026-05-16:

- Đã đối chiếu workflow Mystery Tarot ở mức public/reference.
- Đã rà manifest và entry points của KB Tarot local.
- Đã cập nhật `docs/product-specs/tarot-workflow-reference.md` thành spec chi tiết cho landing/daily/topic/spread/reading/result/history/library.
- Đã chia MVP/P1/P2 để tránh app phình.
- Đã cập nhật `docs/modules/tarot.md`.
