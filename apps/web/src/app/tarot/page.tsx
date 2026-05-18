import { PageShell } from "../../components/layout";
import { Button, Card } from "../../components/ui";

const tarotSteps = [
  "Chọn chủ đề: Tình cảm, Sự nghiệp, Tâm linh hoặc một hướng quan sát khác.",
  "Đặt câu hỏi cụ thể, đủ rõ để phần diễn giải bám đúng bối cảnh.",
  "Chọn trải bài phù hợp với MVP: 1 lá hoặc 3 lá.",
];

export default function TarotPage() {
  return (
    <PageShell
      title="Tarot"
      subtitle="Đặt câu hỏi rõ ràng và nhận gợi ý diễn giải theo trải bài"
      showBack
      backHref="/"
      backLabel="Dashboard"
      containerWidth="default"
    >
      <section>
        <div className="max-w-2xl">
          <h2>Daily Message</h2>
          <p className="mt-4 text-[var(--bm-text-soft)]">
            Một thông điệp ngắn theo ngày sẽ giúp người dùng khởi động nhẹ
            trước khi bước vào phiên Tarot sâu hơn.
          </p>
        </div>

        <Card as="section" className="mt-6" variant="glass" padding="lg">
          <h3>Thông điệp trong ngày</h3>
          <p className="mt-4 text-[var(--bm-text-soft)]">
            Daily Message sẽ mở như một điểm chạm nhẹ, tập trung vào quan sát
            bản thân thay vì đưa ra kết luận thay cho người dùng.
          </p>
          <p className="mt-4 text-sm text-[var(--bm-text-muted)]">
            Sẽ mở ở T-0703.
          </p>
          <Button className="mt-6" disabled variant="primary">
            Mở Daily Message
          </Button>
        </Card>
      </section>

      <section className="mt-14">
        <div className="max-w-2xl">
          <h2>Bắt đầu một phiên Tarot</h2>
          <p className="mt-4 text-[var(--bm-text-soft)]">
            Skeleton này chỉ khóa layout cho journey Tarot. Wizard, câu hỏi và
            trải bài sẽ được triển khai ở các task sau.
          </p>
        </div>

        <Card as="section" className="mt-6" variant="glass" padding="lg">
          <h3>Chuẩn bị câu hỏi</h3>
          <p className="mt-4 text-[var(--bm-text-soft)]">
            Wizard chủ đề/câu hỏi sẽ mở ở T-0704.
          </p>
          <div className="mt-6 grid gap-3">
            {tarotSteps.map((step, index) => (
              <div
                className="rounded-lg border border-[var(--bm-border-subtle)] bg-[var(--bm-bg-glass)] p-4 text-sm text-[var(--bm-text-soft)]"
                key={step}
              >
                <span className="mr-2 font-bold text-[var(--bm-primary-soft)]">
                  {index + 1}.
                </span>
                {step}
              </div>
            ))}
          </div>
          <Button className="mt-6" disabled variant="primary">
            Bắt đầu phiên Tarot (sắp ra mắt)
          </Button>
        </Card>
      </section>

      <section className="mt-14">
        <Card as="section" variant="default" padding="md">
          <h4>Thư viện lá bài</h4>
          <p className="mt-4 text-[var(--bm-text-soft)]">
            Dictionary sẽ mở ở task riêng, bao gồm ý nghĩa lá bài và các lớp
            tra cứu cơ bản.
          </p>
          <Button className="mt-6" disabled size="sm" variant="ghost">
            Xem thư viện
          </Button>
        </Card>
      </section>

      <section className="mt-14">
        <Card as="section" variant="panel" padding="lg">
          <h2>Lưu ý khi dùng Tarot</h2>
          <p className="mt-4 text-[var(--bm-text-soft)]">
            Tarot trong Bản Mệnh V2 là công cụ tự quan sát và đối thoại với bản
            thân. Nội dung không dự đoán chắc chắn, không thay thế tư vấn chuyên
            môn về y tế, pháp lý, tài chính hoặc tâm lý, và người dùng tự chịu
            trách nhiệm với quyết định của mình.
          </p>
        </Card>
      </section>
    </PageShell>
  );
}
