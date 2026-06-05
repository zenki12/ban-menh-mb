"use client";

import { Suspense } from "react";
import { PaymentSetup } from "../../../components/payment/PaymentSetup";
import { LoadingState } from "../../../components/ui";

export default function NumerologyPaymentPage() {
  return (
    <Suspense fallback={<LoadingState message="Đang tải thông tin thanh toán..." />}>
      <PaymentSetup productCode="numerology_single_report" />
    </Suspense>
  );
}
