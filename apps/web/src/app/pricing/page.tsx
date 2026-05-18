import { PageShell } from "../../components/layout";
import { Button, Card } from "../../components/ui";
import {
  formatPriceVnd,
  PRODUCTS,
} from "../../../../../packages/shared/src/pricing";

const faqs = [
  {
    question: "Khi nào thanh toán được mở?",
    answer:
      "Luồng thanh toán sẽ được triển khai trong các task payment riêng, sau khi contract và webhook được khóa rõ.",
  },
  {
    question: "Giá hiện tại đã là chính thức chưa?",
    answer:
      "Đây là bảng giá skeleton để kiểm tra layout và product code; T-0401 sẽ mở rộng contract pricing đầy đủ.",
  },
  {
    question: "Có dùng voucher ở bước này không?",
    answer:
      "Chưa. Voucher thuộc payment scope riêng và cần được kiểm soát ở backend trước khi mở cho người dùng.",
  },
  {
    question: "Sau khi mua sẽ nhận gì?",
    answer:
      "Mỗi gói sẽ mô tả rõ quyền truy cập trước khi thanh toán thật được bật.",
  },
];

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
      <section>
        <div className="grid gap-5 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <Card
              as="article"
              interactive
              key={product.code}
              padding="lg"
              variant="glass"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-2xl">{product.name}</h2>
                <span className="rounded-full border border-[var(--bm-border-subtle)] bg-[var(--bm-bg-glass)] px-3 py-1 text-xs font-bold text-[var(--bm-gold-bright)]">
                  {product.tier}
                </span>
              </div>
              <p className="mt-5 text-3xl font-bold text-[var(--bm-text-main)]">
                {formatPriceVnd(product.priceVnd)}
              </p>
              <p className="mt-4 text-[var(--bm-text-soft)]">
                {product.description}
              </p>
              <Button className="mt-8" disabled fullWidth variant="primary">
                Chọn gói (sắp mở thanh toán)
              </Button>
            </Card>
          ))}
        </div>
      </section>

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
