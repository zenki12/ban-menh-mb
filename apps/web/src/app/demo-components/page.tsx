import {
  Button,
  Card,
  EmptyState,
  ErrorState,
  LoadingState,
  UnauthorizedState,
} from "../../components/ui";

export default function HomePage() {
  return (
    <div className="min-h-screen text-[var(--bm-text-main)]">
      <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-5 py-16 sm:px-8">
        <div className="max-w-3xl space-y-6">
          <small className="block">Typography demo · Bản Mệnh V2</small>
          <h1 className="text-gradient-purple">Khám phá bản mệnh qua ngôn ngữ rõ ràng</h1>
          <p>
            Đây là đoạn body dùng để kiểm tra tiếng Việt có dấu: ăắằẳẵặ,
            âấầẩẫậ, đ, ơớờởỡợ. Nội dung cần đọc tốt trên mobile và desktop.
          </p>
          <a
            className="inline-flex min-h-11 items-center rounded-lg text-[var(--bm-primary-soft)] transition-colors duration-200 hover:text-[var(--bm-text-main)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bm-primary-soft)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bm-bg-void)]"
            href="/demo-shell"
          >
            Xem demo PageShell →
          </a>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <Card as="article" padding="lg">
            <h2>Tiêu đề trang cho hành trình cá nhân</h2>
            <p className="mt-5">
              Bản Mệnh V2 dùng typography ưu tiên sự dễ đọc, nhịp thở giữa các
              dòng và độ tương phản ổn định trên nền tối. Một đoạn văn dài cần
              giữ được cảm giác nhẹ nhàng, không dính chữ, không tràn ngang và
              không khiến người đọc phải nheo mắt khi xem trên màn hình nhỏ.
            </p>
            <p className="mt-4">
              Khi nội dung luận giải dài hơn, line-height phải đủ rộng để từng
              câu có khoảng nghỉ tự nhiên. Các ký tự tiếng Việt như “ngẫm nghĩ”,
              “chữa lành”, “đường đời”, “ước vọng” và “trưởng thành” phải hiển
              thị rõ ràng, không lỗi encoding và không bị overlap.
            </p>
          </Card>

          <Card as="section" variant="glass">
            <h3>Tiêu đề section</h3>
            <p className="mt-4">
              Section heading dùng token riêng, nhỏ hơn page title nhưng vẫn đủ
              nổi bật để chia nội dung.
            </p>
            <div className="mt-6 border-t border-[var(--bm-border-subtle)] pt-6">
              <h4>Tiêu đề card</h4>
              <p className="mt-3">
                Card title dùng scale gọn, phù hợp cho module preview và khối
                thông tin ngắn.
              </p>
              <small className="mt-4 block">
                Small text dành cho hint, meta, badge hoặc ghi chú phụ.
              </small>
            </div>
          </Card>
        </div>

        <Card as="section" className="mt-12" padding="lg">
          <div className="max-w-2xl">
            <h2>Button showcase</h2>
            <p className="mt-4">
              Các CTA dùng chung cho payment, account và module entry. Demo này
              kiểm tra variant, size, loading, disabled, icon và full width.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button variant="primary">Primary CTA</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost action</Button>
            <Button variant="danger">Danger</Button>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button size="sm" variant="secondary">Small</Button>
            <Button size="md" variant="secondary">Medium</Button>
            <Button size="lg" variant="primary">Large CTA</Button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Button loading>Đang xử lý</Button>
            <Button disabled variant="secondary">Đã tắt</Button>
            <Button
              leftIcon={<span aria-hidden="true">✦</span>}
              rightIcon={<span aria-hidden="true">→</span>}
              variant="primary"
            >
              Có icon
            </Button>
            <Button fullWidth variant="secondary">
              Full width mobile-safe
            </Button>
          </div>
        </Card>

        <section className="mt-12">
          <div className="max-w-2xl">
            <h2>Card showcase</h2>
            <p className="mt-4">
              Các panel dùng chung cho module, framed tools và result view. Demo
              chỉ dùng card ngang hàng, không lồng card trong card.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Card variant="default" padding="sm">
              <h4>Default · padding sm</h4>
              <p className="mt-3">Dùng cho item lặp lại cần nền kính nhẹ.</p>
            </Card>
            <Card variant="glass" padding="md" interactive>
              <h4>Glass · interactive</h4>
              <p className="mt-3">Hover lift nhẹ, border tím, không scale quá đà.</p>
            </Card>
            <Card variant="panel" padding="lg">
              <h4>Panel · padding lg</h4>
              <p className="mt-3">Phù hợp framed tools, form hoặc khối thao tác.</p>
            </Card>
            <Card variant="report" padding="md">
              <h4>Report · result panel</h4>
              <p className="mt-3">Dành cho kết quả Numerology hoặc Tarot sau này.</p>
            </Card>
          </div>
        </section>

        <section className="mt-12">
          <div className="max-w-2xl">
            <h2>States showcase</h2>
            <p className="mt-4">
              Các trạng thái dùng chung cho loading, lỗi, dữ liệu trống và yêu
              cầu đăng nhập. Message luôn rõ ràng bằng tiếng Việt.
            </p>
          </div>

          <div className="mt-8 grid gap-4 xl:grid-cols-4 md:grid-cols-2">
            <Card padding="lg" variant="default">
              <LoadingState message="Đang tải luận giải..." />
            </Card>
            <Card padding="lg" variant="default">
              <ErrorState />
            </Card>
            <Card padding="lg" variant="default">
              <EmptyState
                title="Chưa có báo cáo"
                description="Khi bạn tạo báo cáo đầu tiên, kết quả sẽ xuất hiện tại đây."
              />
            </Card>
            <Card padding="lg" variant="default">
              <UnauthorizedState description="Đăng nhập để xem lại các báo cáo đã lưu." />
            </Card>
          </div>
        </section>
      </section>
    </div>
  );
}
