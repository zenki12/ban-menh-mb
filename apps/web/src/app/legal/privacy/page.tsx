import { PageShell } from "../../../components/layout";
import { Card } from "../../../components/ui";

export default function PrivacyPage() {
  return (
    <PageShell
      title="Chính sách bảo mật"
      subtitle="Cách Bản Mệnh V2 thu thập, sử dụng và bảo vệ dữ liệu"
      showBack
      backHref="/"
      backLabel="Dashboard"
      containerWidth="narrow"
    >
      <div className="space-y-10">
        <section>
          <h2>Dữ liệu thu thập</h2>
          <p className="mt-4 text-[var(--bm-text-soft)]">
            Bản Mệnh V2 có thể thu thập họ tên, ngày sinh, email, câu hỏi Tarot
            và thông tin giao dịch khi bạn tra cứu, tạo báo cáo hoặc thanh toán.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--bm-text-soft)]">
            <li>Thông tin tài khoản như email hoặc tên hiển thị.</li>
            <li>Dữ liệu nhập để phục vụ luận giải như họ tên và ngày sinh.</li>
            <li>Lịch sử báo cáo, quyền truy cập và giao dịch liên quan.</li>
          </ul>
        </section>

        <section>
          <h2>Cách sử dụng</h2>
          <p className="mt-4 text-[var(--bm-text-soft)]">
            Dữ liệu được dùng để phục vụ tra cứu, tạo báo cáo, xử lý thanh toán,
            kiểm tra quyền truy cập, hỗ trợ người dùng và bảo trì hệ thống.
          </p>
        </section>

        <section>
          <h2>Bên thứ ba</h2>
          <p className="mt-4 text-[var(--bm-text-soft)]">
            Một số dịch vụ hạ tầng có thể được dùng theo cấu hình placeholder,
            gồm Firebase cho xác thực, PayOS cho thanh toán và Cloudflare cho hạ
            tầng lưu trữ hoặc vận hành. Trang này không chứa key, token hoặc
            thông tin tài khoản thật.
          </p>
        </section>

        <section>
          <h2>Quyền của người dùng</h2>
          <p className="mt-4 text-[var(--bm-text-soft)]">
            Bạn có thể yêu cầu xem, chỉnh sửa hoặc xóa dữ liệu cá nhân liên quan
            đến tài khoản của mình bằng cách liên hệ kênh hỗ trợ. Một số dữ liệu
            giao dịch có thể cần được giữ lại để đối soát và vận hành hợp lệ.
          </p>
        </section>

        <section>
          <h2>Cập nhật</h2>
          <p className="mt-4 text-[var(--bm-text-soft)]">
            Ngày cập nhật placeholder: 2026-05-18. Nội dung sẽ được rà soát pháp
            lý trước khi mở thanh toán thật.
          </p>
        </section>

        <Card as="section" variant="panel" padding="lg">
          <p className="text-sm text-[var(--bm-text-muted)]">
            Nội dung skeleton, sẽ được rà soát pháp lý/biên tập trước khi vận
            hành thật.
          </p>
        </Card>
      </div>
    </PageShell>
  );
}
