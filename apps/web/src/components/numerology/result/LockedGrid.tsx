import { Card } from "../../ui";
import { scrollToUnlockCTA } from "./scrollToUnlock";

export type LockedItem = { title: string };
export type LockedGroup = { label: string; icon: string; items: LockedItem[] };

type LockedGridProps = {
  groups: LockedGroup[];
};

export function LockedGrid({ groups }: LockedGridProps) {
  return (
    <section className="mt-16">
      <div className="max-w-2xl">
        <h2>🔒 30+ chỉ số khác đang chờ bạn</h2>
        <p className="mt-4 text-[var(--bm-text-soft)]">Mở khóa để xem toàn bộ luận giải.</p>
      </div>
      <div className="mt-8 space-y-10">
        {groups.map((group) => (
          <div key={group.label}>
            <h3 className="flex items-center gap-2 text-xl">
              <span aria-hidden="true">{group.icon}</span>
              {group.label}
              <span className="text-sm font-normal text-[var(--bm-text-muted)]">({group.items.length})</span>
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {group.items.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={scrollToUnlockCTA}
                  className="cursor-pointer text-left"
                  aria-label={`Mở khóa ${item.title}`}
                >
                  <Card
                    as="article"
                    className="h-full opacity-60 transition hover:-translate-y-0.5 hover:opacity-90"
                    variant="default"
                    padding="sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="text-sm sm:text-base">{item.title}</h4>
                      <span aria-hidden="true" className="text-sm">
                        🔒
                      </span>
                    </div>
                  </Card>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
