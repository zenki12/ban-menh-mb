"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function BackHomeBar() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <div className="module-page-homebar" aria-label="Điều hướng về trang chủ">
      <Link className="module-home-button" href="/">
        <span aria-hidden="true">←</span>
        <span>Trang chủ</span>
      </Link>
    </div>
  );
}
