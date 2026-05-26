"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button, Card } from "../../../components/ui";

function ResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fullName = searchParams.get("fullName") ?? "";
  const dob = searchParams.get("dob") ?? "";

  return (
    <main className="min-h-screen px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <Card variant="glass" padding="lg">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--bm-accent)]">
            Thần số học
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-[var(--bm-text)]">
            Báo cáo đang được phân tích...
          </h1>
          <div className="mt-6 space-y-3 text-sm text-[var(--bm-text-soft)]">
            <p>
              <span className="font-medium text-[var(--bm-text)]">Họ tên:</span>{" "}
              {fullName || "Chưa có dữ liệu"}
            </p>
            <p>
              <span className="font-medium text-[var(--bm-text)]">Ngày sinh:</span>{" "}
              {dob || "Chưa có dữ liệu"}
            </p>
            <p>Tính năng đầy đủ sẽ mở ở T-0602.</p>
          </div>
          <Button className="mt-8" variant="secondary" onClick={() => router.push("/than-so-hoc")}>
            Quay lại
          </Button>
        </Card>
      </div>
    </main>
  );
}

export default function NumerologyResultPage() {
  return (
    <Suspense fallback={<main className="p-6 text-[var(--bm-text)]">Đang tải...</main>}>
      <ResultContent />
    </Suspense>
  );
}
