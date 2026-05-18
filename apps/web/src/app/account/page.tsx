import { PageShell } from "../../components/layout";
import { Card, EmptyState, UnauthorizedState } from "../../components/ui";

type AccountPageProps = {
  searchParams: Promise<{
    preview?: string;
  }>;
};

function LoggedInPreview() {
  return (
    <>
      <section>
        <div className="max-w-2xl">
          <h2>Thông tin tài khoản</h2>
          <p className="mt-4 text-[var(--bm-text-soft)]">
            Đây là dữ liệu placeholder để kiểm tra bố cục trước khi Firebase Auth
            được triển khai.
          </p>
        </div>

        <Card as="section" className="mt-6" variant="glass" padding="lg">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3>Người dùng demo</h3>
              <p className="mt-3 text-[var(--bm-text-soft)]">
                demo@banmenh.online
              </p>
            </div>
            <span className="w-fit rounded-full border border-[var(--bm-border-gold)] bg-[var(--bm-bg-glass)] px-3 py-1 text-xs font-bold text-[var(--bm-gold-bright)]">
              Chế độ xem trước
            </span>
          </div>
        </Card>
      </section>

      <section className="mt-14">
        <div className="max-w-2xl">
          <h2>Báo cáo đã mua</h2>
          <p className="mt-4 text-[var(--bm-text-soft)]">
            Danh sách này sẽ đọc từ dữ liệu giao dịch khi account/payment được
            mở ở các task sau.
          </p>
        </div>

        <Card as="section" className="mt-6" variant="default" padding="md">
          <EmptyState
            title="Chưa có báo cáo"
            description="Khi bạn hoàn tất thanh toán, báo cáo sẽ xuất hiện tại đây."
          />
        </Card>
      </section>

      <section className="mt-14">
        <div className="max-w-2xl">
          <h2>Quyền truy cập</h2>
          <p className="mt-4 text-[var(--bm-text-soft)]">
            Entitlement thật sẽ được nối sau khi auth và payment backend hoàn
            chỉnh.
          </p>
        </div>

        <Card as="section" className="mt-6" variant="default" padding="md">
          <EmptyState
            title="Chưa có quyền truy cập"
            description="Các gói đã mua sẽ hiển thị trạng thái và thời hạn tại đây."
          />
        </Card>
      </section>

      <p className="mt-10 max-w-3xl text-sm text-[var(--bm-text-muted)]">
        Bản Mệnh V2 chỉ lưu dữ liệu cần thiết để phục vụ tra cứu và thanh toán.
        Chi tiết xem trang Bảo mật.
      </p>
    </>
  );
}

export default async function AccountPage({ searchParams }: AccountPageProps) {
  const params = await searchParams;
  const isLoggedInPreview = params.preview === "loggedin";

  return (
    <PageShell
      title="Tài khoản"
      subtitle="Quản lý báo cáo và quyền truy cập của bạn"
      showBack
      backHref="/"
      backLabel="Dashboard"
      containerWidth="default"
    >
      {isLoggedInPreview ? (
        <LoggedInPreview />
      ) : (
        <Card as="section" variant="glass" padding="lg">
          <UnauthorizedState description="Đăng nhập sẽ được mở ở T-0405." />
        </Card>
      )}
    </PageShell>
  );
}
