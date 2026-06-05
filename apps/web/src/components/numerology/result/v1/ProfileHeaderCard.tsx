import { Card } from "../../../ui";

type ProfileHeaderCardProps = {
  name: string;
  dob: string;
  lifePathNumber: number;
  chips8: Array<{ label: string; num: number }>;
};

function formatDOB(dob: string) {
  const [year, month, day] = dob.split("-");
  return day && month && year ? `${day}/${month}/${year}` : dob;
}

export function ProfileHeaderCard({ name, dob, lifePathNumber, chips8 }: ProfileHeaderCardProps) {
  return (
    <Card as="article" className="profile-card-v1" variant="glass" padding="lg">
      <div className="profile-avatar-v1">
        <span>{lifePathNumber}</span>
        <small>Chủ Đạo</small>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm uppercase tracking-[0.24em] text-[var(--bm-gold-bright)]">
          Báo Cáo Thần Số Học
        </p>
        <h2 className="mt-2 text-3xl font-bold text-gradient-purple md:text-5xl">{name}</h2>
        <p className="mt-2 text-[var(--bm-text-soft)]">Ngày sinh: {formatDOB(dob)}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {chips8.map((chip) => (
            <div className="pn-item" key={chip.label}>
              <span className="pn-label">{chip.label}</span>
              <span className="pn-val">{chip.num}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
