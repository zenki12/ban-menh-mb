import {
  formatPriceVnd,
  getProductsByModule,
  type Product,
} from "@banmenh/shared";
import { PageShell } from "../../components/layout";
import { Button, Card } from "../../components/ui";

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
    question: "Khi nào thanh toán được mở?",
    answer:
      "Luồng thanh toán sẽ được triển khai trong các task payment riêng, sau khi contract và webhook được khóa rõ.",
  },
  {
    question: "Giá có được cập nhật ở một nơi duy nhất không?",
    answer:
      "Có. Toàn bộ giá và mô tả gói đến từ shared contract, không hardcode rải rác trong frontend.",
  },
  {
    question: "Có dùng voucher ở bước này không?",
    answer:
      "Chưa. Voucher thuộc payment scope riêng và cần được kiểm soát ở backend trước khi mở cho người dùng.",
  },
  {
    question: "Sau khi mua sẽ nhận gì?",
    answer:
      "Mỗi gói liệt kê quyền lợi rõ ngay trên thẻ giá. Quyền truy cập chỉ được kích hoạt sau khi backend xác nhận thanh toán.",
  },
];

function ProductCard({ product }: { product: Product }) {
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
            <span aria-hidden className="text-[var(--bm-gold-bright)]">
              ✦
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button className="mt-8" disabled fullWidth variant="primary">
        Chọn gói (sắp mở thanh toán)
      </Button>
    </Card>
  );
}

export default function PricingPage() {
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
        const gridClass =
          products.length >= 2
            ? "grid gap-5 md:grid-cols-2"
            : "grid gap-5";
        return (
          <section className="mt-10 first:mt-0" key={group.module}>
            <div className="max-w-2xl">
              <h2>{group.title}</h2>
              <p className="mt-3 text-[var(--bm-text-soft)]">
                {group.description}
              </p>
            </div>
            <div className={`mt-6 ${gridClass}`}>
              {products.map((product) => (
                <ProductCard key={product.code} product={product} />
              ))}
            </div>
          </section>
        );
      })}

      <section className="mt-14">
        <div className="max-w-2xl">
          <h2>Câu hỏi thường gặp</h2>
          <p className="mt-4 text-[var(--bm-text-soft)]">
            Các thông tin dưới đây là placeholder để chuẩn bị cho payment flow,
            chưa kích hoạt giao dịch thật.
          </p>
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
            Giá, quyền truy cập và điều kiện hỗ trợ sẽ được trình bày rõ trước
            khi thanh toán thật được bật. Với sản phẩm luận giải mở khóa ngay,
            yêu cầu hỗ trợ hoặc hoàn tiền sẽ được xem xét theo lỗi kỹ thuật truy
            cập nội dung, không dựa trên việc phần diễn giải có giống kỳ vọng cá
            nhân hay không.
          </p>
        </Card>
      </section>
    </PageShell>
  );
}
