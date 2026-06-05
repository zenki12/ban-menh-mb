"use client";

import { useAuth } from "../../lib/auth";
import { Button, Card } from "../ui";

export function NumerologyAuthNotice() {
  const { user, loading, signInWithGoogle } = useAuth();

  if (loading || user) return null;

  return (
    <Card as="section" className="mt-6 border-[var(--bm-border-gold)]" variant="glass" padding="md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--bm-gold-bright)]">
            Cần đăng nhập
          </p>
          <h3 className="mt-2 text-xl">Đăng nhập trước khi luận giải Thần số học</h3>
          <p className="mt-2 text-sm leading-6 text-[var(--bm-text-soft)]">
            Bản báo cáo sẽ được gắn với tài khoản của bạn để có thể xem lại, mở khóa và lưu quyền truy cập sau thanh toán.
          </p>
        </div>
        <Button className="shrink-0" onClick={signInWithGoogle}>
          Đăng nhập Google
        </Button>
      </div>
    </Card>
  );
}
