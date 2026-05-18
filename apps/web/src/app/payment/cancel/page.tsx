"use client";

import { PageShell } from "../../../components/layout";
import { Button, Card } from "../../../components/ui";

export default function PaymentCancelPage() {
  return (
    <PageShell title="Đã hủy thanh toán" showBack={false} containerWidth="narrow">
      <Card padding="lg" variant="glass">
        <div className="flex flex-col items-center gap-4 text-center">
          <span aria-hidden className="text-4xl">✕</span>
          <h2>Bạn đã hủy giao dịch</h2>
          <p className="text-[var(--bm-text-soft)]">
            Đơn hàng chưa được thanh toán. Bạn có thể thử lại bất kỳ lúc nào.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Button onClick={() => { window.location.href = "/pricing"; }} variant="primary">
              Quay lại bảng giá
            </Button>
            <Button onClick={() => { window.location.href = "/"; }} variant="ghost">
              Về trang chủ
            </Button>
          </div>
        </div>
      </Card>
    </PageShell>
  );
}
