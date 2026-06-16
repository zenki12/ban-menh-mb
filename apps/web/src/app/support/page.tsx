import { PageShell } from "../../components/layout";
import { Card } from "../../components/ui";

const faqs = [
  {
    question: "Làm sao bắt đầu tra cứu?",
    answer:
      "Từ Dashboard, chọn Thần số học hoặc Tarot. Các form thật sẽ được mở ở các task module sau.",
  },
  {
    question: "Báo cáo có lưu được không?",
    answer:
      "Tính năng lưu báo cáo sẽ đi cùng tài khoản, payment và entitlement khi các task backend được triển khai.",
  },
  {
    question: "Khi nào có Tarot 5/7 lá?",
    answer:
      "Các trải bài 5/7 lá chưa thuộc MVP theo ADR-003; giai đoạn đầu chỉ khóa phạm vi 1 lá và 3 lá.",
  },
  {
    question: "Quên đăng nhập thì sao?",
    answer:
      "Đăng nhập thật sẽ được mở ở T-0405. Hiện tại account page chỉ có skeleton và preview state.",
  },
  {
    question: "Liên hệ kỹ thuật ở đâu?",
    answer:
      "Bạn có thể dùng email hỗ trợ hoặc Telegram placeholder bên dưới trong giai đoạn chuẩn bị.",
  },
];

export default function SupportPage() {
  return (
    <PageShell
      title="Trợ giúp"
      subtitle="Hướng dẫn nhanh và kênh liên hệ"
      showBack={false}
      containerWidth="narrow"
    >
      <section>
        <div className="max-w-2xl">
          <h2>Câu hỏi thường gặp</h2>
          <p className="mt-4 text-[var(--bm-text-soft)]">
            Các câu trả lời dưới đây là skeleton để định hình nội dung hỗ trợ
            trước khi vận hành thật.
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
        <Card as="section" variant="glass" padding="lg">
          <h2>Kênh liên hệ</h2>
          <div className="mt-6 grid gap-4 text-[var(--bm-text-soft)]">
            <p>
              Email:{" "}
              <a
                className="font-bold text-[var(--bm-primary-soft)] hover:text-[var(--bm-text-main)]"
                href="mailto:support@banmenh.online"
              >
                support@banmenh.online
              </a>
            </p>
            <p>Telegram: @banmenh_support placeholder</p>
            <p>Thời gian phản hồi: trong vòng 24h ngày làm việc.</p>
          </div>
        </Card>
      </section>

      <Card as="section" className="mt-14" variant="panel" padding="lg">
        <p className="text-sm text-[var(--bm-text-muted)]">
          Nội dung skeleton, sẽ được rà soát pháp lý/biên tập trước khi vận hành
          thật.
        </p>
      </Card>
    </PageShell>
  );
}
