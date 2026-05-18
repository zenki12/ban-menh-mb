import { PageShell } from "../components/layout";
import { Button, Card } from "../components/ui";

const moduleCards = [
  {
    icon: "✦",
    title: "Thần số học",
    description:
      "Khởi đầu bằng ngày sinh và tên gọi để nhận bản đọc cô đọng, dễ hiểu, có thể dùng làm điểm tự soi chiếu.",
    href: "/than-so-hoc",
    cta: "Khám phá →",
  },
  {
    icon: "🌙",
    title: "Tarot",
    description:
      "Đặt một câu hỏi rõ ràng và nhận gợi ý diễn giải theo trải bài, tập trung vào góc nhìn và lựa chọn hiện tại.",
    href: "/tarot",
    cta: "Khám phá →",
  },
];

export default function HomePage() {
  return (
    <PageShell showBack={false} containerWidth="wide">
      <section className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--bm-gold-bright)]">
            Bản Mệnh V2
          </p>
          <h1 className="mt-4 text-gradient-purple">
            Khám phá bản mệnh qua ngôn ngữ rõ ràng
          </h1>
          <p className="mt-6 max-w-2xl text-[var(--bm-text-soft)]">
            Nền tảng huyền học module hóa cho Thần số học, Tarot và các lớp
            diễn giải cá nhân. Nội dung được trình bày có kiểm soát để bạn dễ
            đọc, dễ đối chiếu và không bị cuốn vào lời hứa mơ hồ.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/than-so-hoc" variant="primary">
              Bắt đầu miễn phí
            </Button>
            <Button href="/pricing" variant="secondary">
              Xem bảng giá
            </Button>
          </div>
        </div>

        <Card as="section" variant="glass" padding="lg">
          <h2 className="text-2xl">Hướng đi hiện tại</h2>
          <p className="mt-4 text-[var(--bm-text-soft)]">
            Phase 3 mở các route skeleton trước, sau đó từng module sẽ được nối
            form, trạng thái, dữ liệu và luồng thanh toán theo task riêng.
          </p>
          <div className="mt-6 grid gap-3 text-sm text-[var(--bm-text-muted)]">
            <p>Route module: link thẳng, chưa có business logic.</p>
            <p>Route chưa tạo sẽ trả 404, đúng kỳ vọng ở skeleton này.</p>
            <p>Không import KB private, không gọi API thật.</p>
          </div>
        </Card>
      </section>

      <section className="mt-14">
        <div className="max-w-2xl">
          <h2>Chọn module để bắt đầu</h2>
          <p className="mt-4 text-[var(--bm-text-soft)]">
            Các card bên dưới là cửa vào của hub. Thần số học và Tarot sẽ được
            triển khai ở các task kế tiếp.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {moduleCards.map((module) => (
            <Card key={module.href} as="article" variant="glass" padding="lg" interactive>
              <div className="text-3xl" aria-hidden="true">
                {module.icon}
              </div>
              <h3 className="mt-5">{module.title}</h3>
              <p className="mt-4 text-[var(--bm-text-soft)]">{module.description}</p>
              <Button className="mt-6" href={module.href} size="sm" variant="ghost">
                {module.cta}
              </Button>
            </Card>
          ))}

          <Card as="article" variant="glass" padding="lg" interactive>
            <div className="flex items-center justify-between gap-4">
              <span className="text-3xl" aria-hidden="true">
                ☀
              </span>
              <span className="rounded-full border border-[var(--bm-border-subtle)] bg-[var(--bm-bg-glass)] px-3 py-1 text-xs font-bold text-[var(--bm-gold-bright)]">
                Sắp ra mắt
              </span>
            </div>
            <h3 className="mt-5">Daily Message</h3>
            <p className="mt-4 text-[var(--bm-text-soft)]">
              Một gợi ý ngắn theo ngày, dùng như lời nhắc quan sát bản thân thay
              vì kết luận thay cho bạn.
            </p>
            <Button className="mt-6" disabled variant="secondary">
              Chưa mở
            </Button>
          </Card>
        </div>
      </section>

      <section className="mt-14">
        <Card as="section" variant="panel" padding="lg">
          <h2>Tại sao chọn Bản Mệnh V2?</h2>
          <ul className="mt-6 grid gap-4 text-[var(--bm-text-soft)] md:grid-cols-2">
            <li>Kiểm soát chất lượng nội dung theo từng module và task.</li>
            <li>Tránh diễn giải AI generic, ưu tiên cấu trúc rõ và có ngữ cảnh.</li>
            <li>Bảo mật dữ liệu cá nhân, không đưa KB private vào frontend.</li>
            <li>Tách skeleton, logic và thanh toán để dễ kiểm thử từng phần.</li>
          </ul>
        </Card>
      </section>

      <p className="mt-10 max-w-3xl text-sm text-[var(--bm-text-muted)]">
        Nội dung trên Bản Mệnh V2 chỉ mang tính tham khảo và tự chiêm nghiệm,
        không thay thế tư vấn chuyên môn về y tế, pháp lý, tài chính hoặc các
        quyết định quan trọng khác.
      </p>
    </PageShell>
  );
}
