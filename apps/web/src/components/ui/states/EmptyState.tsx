"use client";

import type { ReactNode } from "react";
import { Button } from "../Button";

type EmptyStateProps = {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: ReactNode;
};

function DefaultIcon() {
  return (
    <svg aria-hidden="true" className="size-12" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v11A2.5 2.5 0 0 1 16.5 20h-9A2.5 2.5 0 0 1 5 17.5v-11Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M8.5 9h7M8.5 12h5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function EmptyState({
  title,
  description = "Chưa có dữ liệu để hiển thị.",
  actionLabel,
  onAction,
  icon,
}: EmptyStateProps) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center px-6 py-10 text-center">
      <div className="text-[var(--bm-primary-soft)]">{icon ?? <DefaultIcon />}</div>
      <h3 className="mt-4">{title}</h3>
      <p className="mt-3 text-[var(--bm-text-soft)]">{description}</p>
      {actionLabel && onAction ? (
        <Button className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
