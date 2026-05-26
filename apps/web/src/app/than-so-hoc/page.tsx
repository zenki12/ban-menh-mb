import { getProductsByModule } from "@banmenh/shared";
import { PageShell } from "../../components/layout";
import { InputForm } from "../../components/numerology/InputForm";
import { Card, ProductCard } from "../../components/ui";

const numerologyMetrics = [
  {
    icon: "1",
    title: "Số đường đời",
    description: "Gợi ý nhịp phát triển chính từ ngày sinh.",
  },
  {
    icon: "2",
    title: "Số sứ mệnh",
    description: "Tóm tắt hướng thể hiện qua tên khai sinh.",
  },
  {
    icon: "3",
    title: "Số linh hồn",
    description: "Gợi mở động lực bên trong và điều bạn coi trọng.",
  },
  {
    icon: "4",
    title: "Số cá tính",
    description: "Cách năng lượng cá nhân thường được người khác nhận thấy.",
  },
  {
    icon: "5",
    title: "Năm cá nhân",
    description: "Bối cảnh chủ đạo trong chu kỳ một năm hiện tại.",
  },
  {
    icon: "6",
    title: "Tháng cá nhân",
    description: "Gợi ý ngắn hạn để quan sát và điều chỉnh.",
  },
];

export default function NumerologyPage() {
  const products = getProductsByModule("numerology");

  return (
    <PageShell
      title="Thần số học"
      subtitle="Khám phá ý nghĩa con số trong ngày sinh và tên gọi của bạn"
      showBack
      backHref="/"
      backLabel="Dashboard"
      containerWidth="default"
    >
      <section>
        <div className="max-w-2xl">
          <h2>Bắt đầu tra cứu</h2>
          <p className="mt-4 text-[var(--bm-text-soft)]">
            Nhập thông tin cơ bản để tạo bản phân tích Thần số học cá nhân hóa.
          </p>
        </div>
        <InputForm />
      </section>

      <section className="mt-14">
        <div className="max-w-2xl">
          <h2>Các chỉ số sẽ được luận giải</h2>
          <p className="mt-4 text-[var(--bm-text-soft)]">
            Báo cáo chia thông tin thành các nhóm chỉ số rõ ràng để bạn dễ đọc và đối chiếu.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {numerologyMetrics.map((metric) => (
            <Card key={metric.title} as="article" variant="default" padding="sm">
              <div className="flex items-center gap-3">
                <span className="text-2xl" aria-hidden="true">
                  {metric.icon}
                </span>
                <h3 className="text-lg">{metric.title}</h3>
              </div>
              <p className="mt-3 text-sm text-[var(--bm-text-soft)]">{metric.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <div className="max-w-2xl">
          <h2>Sở hữu báo cáo của bạn</h2>
          <p className="mt-4 text-[var(--bm-text-soft)]">
            Mua một lần, mở khóa vĩnh viễn báo cáo Thần số học đầy đủ trong tài khoản.
          </p>
        </div>
        <div className="mt-8 grid gap-5">
          {products.map((product) => (
            <ProductCard key={product.code} product={product} />
          ))}
        </div>
      </section>

      <section className="mt-14">
        <Card as="section" variant="panel" padding="lg">
          <h2>Lưu ý khi đọc luận giải</h2>
          <p className="mt-4 text-[var(--bm-text-soft)]">
            Thần số học trong Bản Mệnh V2 được dùng như công cụ tham khảo và tự quan sát.
            Nội dung không khẳng định tương lai chắc chắn, không thay thế tư vấn chuyên môn
            và không nên là căn cứ duy nhất cho quyết định quan trọng.
          </p>
        </Card>
      </section>
    </PageShell>
  );
}
