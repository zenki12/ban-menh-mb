import { ModulePageShell } from "../../components/layout";

export default function ChiemSaoPage() {
  return (
    <ModulePageShell>
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <p className="text-[var(--bm-gold-bright)] text-sm font-bold uppercase tracking-widest">
          Sắp ra mắt
        </p>
        <h1 className="text-3xl font-black text-white">Chiêm sao</h1>
        <p className="text-[var(--bm-text-soft)] max-w-md">
          Module đang được phát triển và sẽ ra mắt trong roadmap.
        </p>
        <a href="/" className="text-[var(--bm-primary-soft)] underline text-sm">
          ← Về trang chủ
        </a>
      </div>
    </ModulePageShell>
  );
}
