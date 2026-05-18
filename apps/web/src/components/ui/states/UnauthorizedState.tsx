"use client";

import { Button } from "../Button";

type UnauthorizedStateProps = {
  onLogin?: () => void;
  description?: string;
};

export function UnauthorizedState({
  onLogin,
  description = "Vui lòng đăng nhập để tiếp tục hành trình của bạn.",
}: UnauthorizedStateProps) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center px-6 py-10 text-center">
      <svg
        aria-hidden="true"
        className="size-12 text-[var(--bm-gold)]"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M7 10V8a5 5 0 0 1 10 0v2"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
        <path
          d="M6.5 10h11A2.5 2.5 0 0 1 20 12.5v5A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-5A2.5 2.5 0 0 1 6.5 10Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
      <h3 className="mt-4">Cần đăng nhập</h3>
      <p className="mt-3 text-[var(--bm-text-soft)]">{description}</p>
      {onLogin ? (
        <Button className="mt-6" onClick={onLogin}>
          Đăng nhập
        </Button>
      ) : null}
    </div>
  );
}
