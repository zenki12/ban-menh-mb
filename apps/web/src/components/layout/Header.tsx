"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui";

type HeaderUser = {
  name: string;
};

type HeaderProps = {
  user?: HeaderUser;
};

const navLinks = [
  { href: "/than-so-hoc", label: "Thần số học" },
  { href: "/tarot", label: "Tarot" },
  { href: "/pricing", label: "Bảng giá" },
];

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <a
      className={[
        "relative rounded-md px-2 py-2 font-bold transition-colors duration-200",
        isActive ? "text-[var(--bm-primary-soft)]" : "text-[var(--bm-text-soft)]",
        "hover:text-[var(--bm-primary-soft)] focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-[var(--bm-primary-soft)]",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bm-bg-void)]",
      ].join(" ")}
      href={href}
    >
      {label}
      {isActive ? (
        <span className="absolute inset-x-2 bottom-0 h-px bg-[var(--bm-primary-soft)]" />
      ) : null}
    </a>
  );
}

function AccountArea({ user }: HeaderProps) {
  if (!user) {
    return (
      <Button size="sm" variant="ghost">
        Đăng nhập
      </Button>
    );
  }

  return (
    <button
      className={[
        "inline-flex min-h-9 items-center gap-2 rounded-lg border px-3",
        "border-[var(--bm-border-subtle)] bg-[var(--bm-bg-glass)]",
        "text-sm font-bold text-[var(--bm-text-soft)]",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-[var(--bm-primary-soft)] focus-visible:ring-offset-2",
        "focus-visible:ring-offset-[var(--bm-bg-void)]",
      ].join(" ")}
      type="button"
    >
      <span>{user.name}</span>
      <span aria-hidden="true">⌄</span>
    </button>
  );
}

export function Header({ user }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--bm-border-subtle)] bg-[var(--bm-bg-panel)] backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <a
          className="text-gradient-purple rounded-md text-xl font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bm-primary-soft)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bm-bg-void)]"
          href="/"
        >
          Bản Mệnh
        </a>

        <nav aria-label="Điều hướng chính" className="hidden items-center gap-5 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <AccountArea user={user} />
        </div>

        <button
          aria-expanded={isOpen}
          aria-label="Mở menu"
          className="inline-flex size-11 items-center justify-center rounded-lg border border-[var(--bm-border-subtle)] bg-[var(--bm-bg-glass)] text-[var(--bm-text-main)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bm-primary-soft)] md:hidden"
          onClick={() => setIsOpen((current) => !current)}
          type="button"
        >
          <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
          </svg>
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-[var(--bm-border-subtle)] bg-[var(--bm-bg-panel)] px-5 py-4 md:hidden">
          <nav aria-label="Điều hướng mobile" className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
            <div className="pt-3">
              <AccountArea user={user} />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
