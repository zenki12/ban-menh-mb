"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { PaymentSetup } from "../../../components/payment/PaymentSetup";
import { LoadingState } from "../../../components/ui";

function PaymentSetupRouteContent() {
  const searchParams = useSearchParams();
  return <PaymentSetup productCode={searchParams.get("productCode") ?? ""} />;
}

export default function PaymentSetupPage() {
  return (
    <Suspense fallback={<LoadingState message="Đang tải thông tin thanh toán..." />}>
      <PaymentSetupRouteContent />
    </Suspense>
  );
}
