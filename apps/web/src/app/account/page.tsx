"use client";

import { PageShell } from "../../components/layout";
import { Button, Card, EmptyState, LoadingState, UnauthorizedState } from "../../components/ui";
import { useAuth } from "../../lib/auth";

export default function AccountPage() {
  const { user, loading, isAnonymous, signInWithGoogle, linkAnonymousToGoogle } = useAuth();

  if (loading) {
    return (
      <PageShell title="Tài khoản" showBack backHref="/" backLabel="Dashboard">
        <LoadingState message="Đang tải tài khoản..." />
      </PageShell>
    );
  }

  if (!user) {
    return (
      <PageShell title="Tài khoản" showBack backHref="/" backLabel="Dashboard">
        <Card as="section" padding="lg" variant="glass">
          <UnauthorizedState
            description="Đăng nhập để xem báo cáo và quyền truy cập của bạn."
            onLogin={signInWithGoogle}
          />
        </Card>
      </PageShell>
    );
  }

  if (isAnonymous) {
    return (
      <PageShell
        title="Tài khoản"
        subtitle="Tài khoản khách"
        showBack
        backHref="/"
        backLabel="Dashboard"
      >
        <Card as="section" padding="lg" variant="glass">
          <h3>Tài khoản tạm thời</h3>
          <p className="mt-4 text-[var(--bm-text-soft)]">
            Đây là tài khoản tạm. Liên kết Google để giữ dữ liệu khi đổi thiết bị hoặc trình duyệt.
          </p>
          <Button className="mt-6" onClick={linkAnonymousToGoogle} variant="primary">
            Liên kết Google
          </Button>
        </Card>
      </PageShell>
    );
  }

  return (
    <PageShell
      title="Tài khoản"
      subtitle="Quản lý báo cáo và quyền truy cập của bạn"
      showBack
      backHref="/"
      backLabel="Dashboard"
      containerWidth="default"
    >
      <section>
        <h2>Thông tin tài khoản</h2>
        <Card as="div" className="mt-6" padding="lg" variant="glass">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="font-bold text-[var(--bm-text-main)]">
                {user.displayName ?? "Người dùng"}
              </p>
              {user.email ? (
                <p className="mt-1 text-sm text-[var(--bm-text-soft)]">{user.email}</p>
              ) : null}
            </div>
            <span className="w-fit rounded-full border border-[var(--bm-border-subtle)] bg-[var(--bm-bg-glass)] px-3 py-1 text-xs font-bold text-[var(--bm-gold-bright)]">
              {user.provider === "google" ? "Google" : "Khách"}
            </span>
          </div>
        </Card>
      </section>

      <section className="mt-14">
        <h2>Báo cáo đã mua</h2>
        <Card as="div" className="mt-6" padding="md" variant="default">
          <EmptyState
            title="Chưa có báo cáo"
            description="Khi bạn hoàn tất thanh toán, báo cáo sẽ xuất hiện tại đây."
          />
        </Card>
      </section>

      <section className="mt-14">
        <h2>Quyền truy cập</h2>
        <Card as="div" className="mt-6" padding="md" variant="default">
          <EmptyState
            title="Chưa có quyền truy cập"
            description="Các gói đã mua sẽ hiển thị trạng thái và thời hạn tại đây."
          />
        </Card>
      </section>

      <p className="mt-10 max-w-3xl text-sm text-[var(--bm-text-muted)]">
        Bản Mệnh V2 chỉ lưu dữ liệu cần thiết để phục vụ tra cứu và thanh toán.
        Chi tiết xem trang{" "}
        <a className="underline hover:text-[var(--bm-text-soft)]" href="/legal/privacy">
          Bảo mật
        </a>
        .
      </p>
    </PageShell>
  );
}
