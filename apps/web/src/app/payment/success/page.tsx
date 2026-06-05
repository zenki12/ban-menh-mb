"use client";

import { Suspense } from "react";
import { PaymentSuccess } from "../../../components/payment/PaymentSuccess";
import { LoadingState } from "../../../components/ui";

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<LoadingState message="Đang tải kết quả thanh toán..." />}>
      <PaymentSuccess module="numerology" />
    </Suspense>
  );
}
