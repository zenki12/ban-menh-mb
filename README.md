# Bản Mệnh V2

Bản Mệnh V2 là rebuild mới hoàn toàn. Project này chỉ dùng tài liệu trong `docs/` và các input đã được phê duyệt.

## Quy tắc

- Không copy code/hạ tầng/payment/API cũ.
- Không đưa KB/private data vào frontend/static asset.
- Không commit secret thật.
- Làm theo `docs/TASK_REGISTRY.md`, cập nhật `docs/DEVLOG.md` sau mỗi task.

## Lệnh cơ bản

```powershell
npm.cmd install
npm.cmd run dev
npm.cmd run build
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run security:smoke
npm.cmd run check
```

- `npm.cmd run dev`: chạy app local để kiểm tra giao diện trong lúc phát triển.
- `npm.cmd run build`: build app như môi trường production preview, dùng để bắt lỗi build sớm.
- `npm.cmd run typecheck`: kiểm tra TypeScript, không tạo file build.
- `npm.cmd run lint`: kiểm tra nhanh các rule source cơ bản của dự án như file quá dài, inline `onclick`, inline script lớn và lỗi raw `Failed to fetch`.
- `npm.cmd run security:smoke`: kiểm tra smoke tối thiểu để tránh commit `.env` thật, hardcode secret/token phổ biến, hoặc đưa KB/private data vào frontend/static asset.
- `npm.cmd run check`: chạy lần lượt typecheck, lint, security smoke và build trước khi kết thúc task.

## Environment Variables

`.env.example` là file mẫu, chỉ có placeholder. Không điền secret thật vào file này.

Để chạy local, tạo file riêng trên máy:

```powershell
Copy-Item .env.example .env.local
```

Sau đó điền giá trị thật vào `.env.local` từ 1Password/Bitwarden hoặc kênh secret được duyệt. Không commit `.env`, `.env.local` hoặc bất kỳ file `.env.*` nào ngoài `.env.example`.

Các nhóm biến hiện có:

- App: URL, tên app, môi trường, admin token placeholder.
- Firebase/Google: OAuth và service account placeholder.
- PayOS: client ID, API key, checksum key placeholder.
- Telegram: bot token và chat ID placeholder.
- Cloudflare: account, project, worker, R2/KV và KB storage placeholder.

## Dev/Prod Config

Dev/Test và Production dùng resource, secret và payment config riêng. Không share secret giữa hai môi trường, và chỉ Zenki được duyệt/thực hiện production deploy.

Xem mapping chi tiết tại `docs/product-specs/dev-prod-mapping.md`.
