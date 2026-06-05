"use client";

import { PaymentCancel } from "../../../components/payment/PaymentCancel";

export default function PaymentCancelPage() {
  return <PaymentCancel retryUrl="/payment/setup" />;
}
