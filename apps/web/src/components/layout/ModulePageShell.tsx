import type { ReactNode } from "react";

export function ModulePageShell({ children }: { children: ReactNode }) {
  return (
    <div className="module-page-shell">
      {children}
    </div>
  );
}
