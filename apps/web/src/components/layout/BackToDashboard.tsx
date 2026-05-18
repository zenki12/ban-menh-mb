type BackToDashboardProps = {
  href?: string;
  label?: string;
};

export function BackToDashboard({
  href = "/",
  label = "Dashboard",
}: BackToDashboardProps) {
  return (
    <a
      className={[
        "inline-flex min-h-11 items-center gap-2 rounded-lg px-3 font-bold",
        "text-[var(--bm-text-muted)] transition-colors duration-200",
        "hover:text-[var(--bm-primary-soft)]",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-[var(--bm-primary-soft)] focus-visible:ring-offset-2",
        "focus-visible:ring-offset-[var(--bm-bg-void)]",
      ].join(" ")}
      href={href}
    >
      <span aria-hidden="true">←</span>
      <span>{label}</span>
    </a>
  );
}
