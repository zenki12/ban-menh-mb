"use client";

import { Button } from "../Button";

type ErrorStateProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
};

export function ErrorState({
  title = "Có lỗi xảy ra",
  description = "Vui lòng thử lại sau ít phút.",
  onRetry,
  retryLabel = "Thử lại",
}: ErrorStateProps) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center px-6 py-10 text-center">
      <svg
        aria-hidden="true"
        className="size-12 text-[var(--bm-danger-soft)]"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 8v5m0 4h.01M10.3 4.7 2.9 18a2 2 0 0 0 1.7 3h14.8a2 2 0 0 0 1.7-3L13.7 4.7a2 2 0 0 0-3.4 0Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
      <h3 className="mt-4">{title}</h3>
      <p className="mt-3 text-[var(--bm-text-soft)]">{description}</p>
      {onRetry ? (
        <Button className="mt-6" onClick={onRetry} variant="secondary">
          {retryLabel}
        </Button>
      ) : null}
    </div>
  );
}
