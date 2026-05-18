import { PageShell } from "../../../components/layout";
import { Card } from "../../../components/ui";

export default function TermsPage() {
  return (
    <PageShell
      title="Điều khoản sử dụng"
      subtitle="Quy định khi dùng dịch vụ Bản Mệnh V2"
      showBack
      backHref="/"
      backLabel="Dashboard"
      containerWidth="narrow"
    >
      <div className="space-y-10">
        <section>
          <h2>Bản chất nội dung</h2>
          <p className="mt-4 text-[var(--bm-text-soft)]">
            Nội dung trên Bản Mệnh V2 mang tính tham khảo và tự chiêm nghiệm,
            không thay thế tư vấn chuyên môn về y tế, pháp lý, tài chính hoặc
            tâm lý.
          </p>
        </section>

        <section>
          <h2>Quyền tác giả</h2>
          <p className="mt-4 text-[var(--bm-text-soft)]">
            Kho tri thức, cấu trúc luận giải, nội dung biên tập và giao diện
            thuộc Bản Mệnh V2 hoặc các bên cấp quyền tương ứng. Không sao chép,
            tái phân phối hoặc trích xuất hàng loạt khi chưa được cho phép.
          </p>
        </section>

        <section>
          <h2>Thanh toán và hoàn tiền</h2>
          <p className="mt-4 text-[var(--bm-text-soft)]">
            Chi tiết về giá, quyền truy cập, thời hạn sử dụng, hỗ trợ kỹ thuật
            và điều kiện hoàn tiền sẽ được trình bày rõ trước khi thanh toán
            thật mở.
          </p>
        </section>

        <section>
          <h2>Hành vi không được phép</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--bm-text-soft)]">
            <li>Spam, phá hệ thống hoặc cố tình làm gián đoạn dịch vụ.</li>
            <li>Chia sẻ tài khoản theo cách né tránh quyền truy cập.</li>
            <li>Scrape, tải hàng loạt hoặc public KB và nội dung private.</li>
            <li>Lợi dụng voucher, payment hoặc entitlement ngoài mục đích hợp lệ.</li>
          </ul>
        </section>

        <section>
          <h2>Thay đổi điều khoản</h2>
          <p className="mt-4 text-[var(--bm-text-soft)]">
            Bản Mệnh V2 có thể cập nhật điều khoản để phù hợp với sản phẩm,
            pháp lý và vận hành. Thay đổi quan trọng sẽ được thông báo qua trang
            điều khoản này.
          </p>
        </section>

        <section>
          <h2>Liên hệ</h2>
          <p className="mt-4 text-[var(--bm-text-soft)]">
            Nếu cần hỗ trợ hoặc có câu hỏi về điều khoản, vui lòng truy cập{" "}
            <a
              className="font-bold text-[var(--bm-primary-soft)] hover:text-[var(--bm-text-main)]"
              href="/support"
            >
              trang Trợ giúp
            </a>
            .
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
