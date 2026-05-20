"use client";

import {
  formatPriceVnd,
  getProductsByModule,
  type Product,
} from "@banmenh/shared";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PageShell } from "../../components/layout";
import { Button, Card } from "../../components/ui";
import { fetchWithAuth } from "../../lib/api/client";
import { useAuth } from "../../lib/auth";

const TIER_LABELS: Record<Product["tier"], string> = {
  single_report: "Báo cáo lẻ",
  session: "Phiên",
  bundle: "Combo",
  subscription: "Định kỳ",
};

const MODULE_GROUPS: ReadonlyArray<{
  module: Product["module"];
  title: string;
  description: string;
}> = [
  {
    module: "numerology",
    title: "Thần số học",
    description: "Báo cáo cá nhân hóa từ tên và ngày sinh.",
  },
  {
    module: "tarot",
    title: "Tarot",
    description: "Phiên rút bài soi chiếu câu hỏi cụ thể.",
  },
  {
    module: "bundle",
    title: "Combo tiết kiệm",
    description: "Gói gộp Thần số học và Tarot với giá ưu đãi.",
  },
];

const faqs = [
  {
    question: "Sau khi mua sẽ nhận gì?",
    answer:
      "Mỗi gói liệt kê quyền lợi rõ ngay trên thẻ giá. Quyền truy cập được kích hoạt sau khi backend xác nhận thanh toán.",
  },
  {
    question: "Có dùng voucher không?",
    answer:
      "Voucher sẽ được hỗ trợ trong phiên bản tiếp theo. Hiện tại chưa áp dụng.",
  },
  {
    question: "Chính sách hoàn tiền?",
    answer:
      "Hỗ trợ hoàn tiền khi có lỗi kỹ thuật khiến bạn không thể truy cập nội dung đã mua. Liên hệ qua trang Hỗ trợ.",
  },
];

type CreateResponse = {
  orderId: string;
  amount: number;
  qrCode: string;
  checkoutUrl?: string;
  expiresAt: string;
};

function ProductCard({
  product,
  onSelect,
  isLoading,
}: {
  product: Product;
  onSelect: (product: Product) => void;
  isLoading: boolean;
}) {
  return (
    <Card as="article" interactive padding="lg" variant="glass">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-2xl">{product.name}</h3>
        <span className="rounded-full border border-[var(--bm-border-subtle)] bg-[var(--bm-bg-glass)] px-3 py-1 text-xs font-bold text-[var(--bm-gold-bright)]">
          {TIER_LABELS[product.tier]}
        </span>
      </div>
      <p className="mt-5 text-3xl font-bold text-[var(--bm-text-main)]">
        {formatPriceVnd(product.priceVnd)}
      </p>
      <p className="mt-4 text-[var(--bm-text-soft)]">{product.description}</p>
      <ul className="mt-5 space-y-2 text-sm text-[var(--bm-text-soft)]">
        {product.features.map((feature) => (
          <li className="flex items-start gap-2" key={feature}>
            <span aria-hidden className="text-[var(--bm-gold-bright)]">✦</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        className="mt-8"
        disabled={isLoading}
        fullWidth
        loading={isLoading}
        onClick={() => onSelect(product)}
        variant="primary"
      >
        {isLoading ? "Đang xử lý..." : "Chọn gói"}
      </Button>
    </Card>
  );
}

export default function PricingPage() {
  const router = useRouter();
  const { user, signInWithGoogle } = useAuth();
  const [loadingCode, setLoadingCode] = useState<string | null>(null);

  async function handleSelectPlan(product: Product) {
    if (!user) {
      await signInWithGoogle();
      return;
    }
    const productCode = product.code;
    setLoadingCode(productCode);
    try {
      const data = await fetchWithAuth<CreateResponse>("/api/payment/create", {
        method: "POST",
        body: JSON.stringify({ productCode }),
      });
      const checkoutExpiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();
      sessionStorage.setItem(
        "banmenh-payment-pending",
        JSON.stringify({
          orderId: data.orderId,
          qrCode: data.qrCode,
          checkoutUrl: data.checkoutUrl,
          amount: data.amount,
          productName: product.name,
          expiresAt: checkoutExpiresAt,
        }),
      );
      router.push(`/payment/checkout?orderId=${encodeURIComponent(data.orderId)}`);
    } catch (err) {
      console.error("[pricing] payment create failed:", err);
      alert("Có lỗi khi tạo đơn hàng. Vui lòng thử lại.");
    } finally {
      setLoadingCode(null);
    }
  }

  return (
    <PageShell
      title="Bảng giá"
      subtitle="Chọn gói phù hợp với hành trình của bạn"
      showBack
      backHref="/"
      backLabel="Dashboard"
      containerWidth="default"
    >
      {MODULE_GROUPS.map((group) => {
        const products = getProductsByModule(group.module);
        if (products.length === 0) return null;
        const gridClass = products.length >= 2 ? "grid gap-5 md:grid-cols-2" : "grid gap-5";
        return (
          <section className="mt-10 first:mt-0" key={group.module}>
            <div className="max-w-2xl">
              <h2>{group.title}</h2>
              <p className="mt-3 text-[var(--bm-text-soft)]">{group.description}</p>
            </div>
            <div className={`mt-6 ${gridClass}`}>
              {products.map((product) => (
                <ProductCard
                  isLoading={loadingCode === product.code}
                  key={product.code}
                  onSelect={handleSelectPlan}
                  product={product}
                />
              ))}
            </div>
          </section>
        );
      })}

      <section className="mt-14">
        <div className="max-w-2xl">
          <h2>Câu hỏi thường gặp</h2>
        </div>
        <div className="mt-8 grid gap-4">
          {faqs.map((faq) => (
            <Card as="article" key={faq.question} padding="md" variant="default">
              <h4>{faq.question}</h4>
              <p className="mt-3 text-[var(--bm-text-soft)]">{faq.answer}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <Card as="section" padding="lg" variant="panel">
          <h2>Lưu ý thương mại</h2>
          <p className="mt-4 text-[var(--bm-text-soft)]">
            Giá, quyền truy cập và điều kiện hỗ trợ sẽ được trình bày rõ trước khi thanh toán.
            Với sản phẩm luận giải mở khóa ngay, yêu cầu hỗ trợ hoặc hoàn tiền sẽ được xem xét
            theo lỗi kỹ thuật truy cập nội dung.
          </p>
        </Card>
      </section>
    </PageShell>
  );
}
