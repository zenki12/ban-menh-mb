import { PageShell } from "../../components/layout";
import { Button, Card } from "../../components/ui";

const numerologyMetrics = [
  {
    icon: "🌟",
    title: "Số đường đời",
    description: "Gợi ý nhịp phát triển chính từ ngày sinh.",
  },
  {
    icon: "🔮",
    title: "Số sứ mệnh",
    description: "Tóm tắt hướng thể hiện qua tên khai sinh.",
  },
  {
    icon: "💫",
    title: "Số linh hồn",
    description: "Gợi mở động lực bên trong và điều bạn coi trọng.",
  },
  {
    icon: "✨",
    title: "Số cá tính",
    description: "Cách năng lượng cá nhân thường được người khác nhận thấy.",
  },
  {
    icon: "🌙",
    title: "Năm cá nhân",
    description: "Bối cảnh chủ đề trong chu kỳ một năm hiện tại.",
  },
  {
    icon: "☀",
    title: "Tháng cá nhân",
    description: "Gợi ý nhịp ngắn hạn để quan sát và điều chỉnh.",
  },
];

export default function NumerologyPage() {
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
            Đây là khung nhập liệu nền cho module Thần số học. Form thật sẽ
            được triển khai riêng để giữ đúng phạm vi skeleton.
          </p>
        </div>

        <Card as="section" className="mt-6" variant="glass" padding="lg">
          <h3>Nhập thông tin</h3>
          <p className="mt-4 text-[var(--bm-text-soft)]">
            Form sẽ được triển khai ở T-0601.
          </p>
          <div className="mt-6 rounded-lg border border-[var(--bm-border-subtle)] bg-[var(--bm-bg-glass)] p-5 text-sm text-[var(--bm-text-muted)]">
            Khu vực này sẽ chứa họ tên, tên thường dùng, giới tính và ngày sinh
            khi bước nhập liệu được mở.
          </div>
          <Button className="mt-6" disabled variant="primary">
            Tạo báo cáo (sắp ra mắt)
          </Button>
        </Card>
      </section>

      <section className="mt-14">
        <div className="max-w-2xl">
          <h2>Các chỉ số sẽ được luận giải</h2>
          <p className="mt-4 text-[var(--bm-text-soft)]">
            Báo cáo sẽ chia thông tin thành các nhóm chỉ số rõ ràng để bạn dễ
            đọc và đối chiếu từng phần.
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
              <p className="mt-3 text-sm text-[var(--bm-text-soft)]">
                {metric.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <Card as="section" variant="panel" padding="lg">
          <h2>Lưu ý khi đọc luận giải</h2>
          <p className="mt-4 text-[var(--bm-text-soft)]">
            Thần số học trong Bản Mệnh V2 được dùng như công cụ tham khảo và tự
            quan sát. Nội dung không khẳng định tương lai chắc chắn, không thay
            thế tư vấn chuyên môn và không nên là căn cứ duy nhất cho quyết
            định quan trọng.
          </p>
        </Card>
      </section>
    </PageShell>
  );
}
