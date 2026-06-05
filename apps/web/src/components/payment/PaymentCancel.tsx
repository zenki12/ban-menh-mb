"use client";

import { PageShell } from "../layout";
import { Button, Card } from "../ui";

type PaymentCancelProps = {
  retryUrl: string;
  homeUrl?: string;
};

export function PaymentCancel({ retryUrl, homeUrl = "/" }: PaymentCancelProps) {
  return (
    <PageShell title="Thanh toán" showBack={false} containerWidth="narrow">
      <Card padding="lg" variant="glass">
        <div className="mx-auto flex max-w-lg flex-col items-center gap-5 text-center">
          <span
            aria-hidden
            className="flex size-16 items-center justify-center rounded-full border border-[rgba(247,201,72,0.35)] bg-[rgba(247,201,72,0.1)] text-4xl text-[var(--bm-gold-bright)]"
          >
            i
          </span>
          <div>
            <h2>Đã hủy thanh toán</h2>
            <p className="mt-3 text-[var(--bm-text-soft)]">
              Đơn hàng chưa được thanh toán. Bạn có thể tạo lại đơn mới khi đã sẵn sàng.
            </p>
          </div>
          <div className="grid w-full gap-3 sm:grid-cols-2">
            <Button href={retryUrl} fullWidth variant="primary">
              Thử thanh toán lại
            </Button>
            <Button href={homeUrl} fullWidth variant="secondary">
              Về trang chủ
            </Button>
          </div>
        </div>
      </Card>
    </PageShell>
  );
}
