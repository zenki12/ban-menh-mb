"use client";

import { type ErrorCode, getErrorMessage } from "@banmenh/shared";
import { Button } from "../Button";

type ErrorStateProps = {
  /**
   * Mã lỗi shared contract. Khi truyền mà không có `description`,
   * component tự dùng message tiếng Việt từ `ERROR_MESSAGES`.
   */
  code?: ErrorCode;
  title?: string;
  description?: string;
  /** Hiển thị nhỏ ở dưới để user copy khi liên hệ support. */
  requestId?: string;
  onRetry?: () => void;
  retryLabel?: string;
};

export function ErrorState({
  code,
  title = "Có lỗi xảy ra",
  description,
  requestId,
  onRetry,
  retryLabel = "Thử lại",
}: ErrorStateProps) {
  const resolvedDescription =
    description ?? (code ? getErrorMessage(code) : "Vui lòng thử lại sau ít phút.");

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
      <p className="mt-3 text-[var(--bm-text-soft)]">{resolvedDescription}</p>
      {onRetry ? (
        <Button className="mt-6" onClick={onRetry} variant="secondary">
          {retryLabel}
        </Button>
      ) : null}
      {requestId ? (
        <p className="mt-5 text-xs text-[var(--bm-text-muted)]">
          Mã lỗi:{" "}
          <code className="font-mono text-[var(--bm-text-soft)]">
            {requestId}
          </code>
        </p>
      ) : null}
    </div>
  );
}
