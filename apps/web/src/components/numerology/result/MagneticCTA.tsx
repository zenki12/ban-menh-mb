import { Button, Card } from "../../ui";
import { UNLOCK_CTA_ID } from "./scrollToUnlock";

type MagneticCTAProps = {
  price: string;
  onClick: () => void;
};

const benefits = [
  "Năm cá nhân 2026: 12 tháng forecast chi tiết",
  "Số linh hồn, Cá tính, Thái độ — Bạn thật sự là ai?",
  "3 chu kỳ đời + 4 đỉnh kim tự tháp — Hành trình tương lai",
  "Cách hóa giải nợ nghiệp + bài học karmic",
];

const miniBenefits = [
  { icon: "💎", text: "+30 chỉ số" },
  { icon: "⏱️", text: "Vĩnh viễn" },
  { icon: "💾", text: "Lưu account" },
];

export function MagneticCTA({ price, onClick }: MagneticCTAProps) {
  return (
    <section id={UNLOCK_CTA_ID} className="mt-16 scroll-mt-8">
      <Card className="border-[var(--bm-border-purple)] shadow-[var(--bm-shadow-purple)]" variant="report" padding="lg">
        <div className="mx-auto max-w-3xl text-center">
          <h2>✨ Mở khóa báo cáo đầy đủ</h2>
          <p className="mt-4 text-[var(--bm-text-soft)]">Bạn vừa khám phá 3/33 chỉ số.</p>
          <p className="mt-2 text-[var(--bm-text-soft)]">Còn 30+ luận giải sâu đang chờ:</p>
        </div>
        <ul className="mx-auto mt-8 grid max-w-3xl gap-3">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex gap-3 font-bold text-[var(--bm-text-main)]">
              <span className="text-[var(--bm-gold-bright)]" aria-hidden="true">
                ✓
              </span>
              {benefit}
            </li>
          ))}
        </ul>
        <div className="my-8 h-px bg-[var(--bm-border-subtle)]" />
        <div className="mx-auto max-w-md text-center">
          <p className="font-bold text-[var(--bm-text-main)]">Một lần mua. Vĩnh viễn.</p>
          <p className="mt-3 bg-[image:var(--bm-gradient-gold-text)] bg-clip-text text-5xl font-bold text-transparent">
            {price}
          </p>
          <Button className="mt-6" fullWidth size="lg" onClick={onClick}>
            Mở khóa ngay — {price}
          </Button>
        </div>
        <div className="mt-8 grid gap-3 text-center text-sm text-[var(--bm-text-soft)] sm:grid-cols-3">
          {miniBenefits.map((benefit) => (
            <div key={benefit.text} className="rounded-lg border border-[var(--bm-border-subtle)] p-3">
              <span aria-hidden="true">{benefit.icon}</span> {benefit.text}
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
