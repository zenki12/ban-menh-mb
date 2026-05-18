# Bản Mệnh V2 Independent Launch Plan

Ngày cập nhật: 2026-05-14

## 1. Quyết định phạm vi

Bản Mệnh V2 là dự án rebuild mới hoàn toàn.

Không dùng làm nền:

- Codebase đã có.
- Database/storage đã có.
- Worker/API đã có.
- Payment flow đã có.
- Firebase project đã có.

Input chính của V2:

- File thiết kế giao diện do user cung cấp.
- KB Thần số học do user cung cấp.
- KB Tarot do user cung cấp.

## 2. Nguyên tắc import KB

- KB không được commit vào frontend/public/static asset.
- KB không được nhúng vào client bundle.
- KB phải được đưa vào private storage, ưu tiên R2 cho file lớn/JSON lớn.
- Frontend chỉ nhận nội dung qua API/Worker sau khi kiểm tra quyền nếu nội dung trả phí.
- Cần smoke test sau build để xác nhận không có KB private trong artifact public.

## 3. Hạ tầng mới cho V2

Dev/Test dự kiến:

```text
Cloudflare Pages project: banmenh-v2-dev
Domain: dev.banmenh.online
Firebase/Firestore: chưa tạo
R2/KV: chưa tạo
Workers: chưa tạo
```

Production V2 sau này:

```text
Cloudflare Pages project: banmenh-v2-prod hoặc project V2 được approve
Domain: banmenh.online sau khi user approve
Firebase/Firestore: production riêng
R2/KV: production riêng
Workers: production riêng
```

## 4. Không import dữ liệu ngoài scope trong MVP

MVP không import:

- User từ nguồn ngoài scope.
- Entitlement từ nguồn ngoài scope.
- Payment history từ nguồn ngoài scope.
- Voucher từ nguồn ngoài scope.
- Report từ nguồn ngoài scope.
- KB từ nguồn ngoài scope.

Nếu sau này user muốn import bất kỳ phần nào, phải tạo project/task riêng, không đưa vào MVP mặc định.

## 5. Launch production sau này

Khi V2 đã pass dev/test:

1. Freeze scope trước launch.
2. Deploy V2 production project riêng.
3. Test production preview/private URL.
4. Chỉ khi user approve, mới gắn domain `banmenh.online` sang V2.
5. Có rollback domain rõ trước khi gắn production domain.

## 6. Checklist trước khi dùng domain production

- [ ] V2 build pass.
- [ ] Dev/Test pass.
- [ ] Payment pass đầy đủ.
- [ ] KB private không nằm trong public/static artifact.
- [ ] Firestore/security rules hoặc backend permission pass.
- [ ] Telegram/payment alert pass.
- [ ] Rollback domain rõ.
- [ ] User approve production domain switch.
