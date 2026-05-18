type LoadingStateProps = {
  message?: string;
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: "size-6",
  md: "size-9",
  lg: "size-12",
};

export function LoadingState({
  message = "Đang tải...",
  size = "md",
}: LoadingStateProps) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center px-6 py-10 text-center">
      <svg
        aria-hidden="true"
        className={`${sizeClasses[size]} animate-spin text-[var(--bm-primary-soft)]`}
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-90"
          d="M22 12a10 10 0 0 1-10 10"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="4"
        />
      </svg>
      <p className="mt-4 text-[var(--bm-text-soft)]">{message}</p>
    </div>
  );
}
