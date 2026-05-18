import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type ButtonSharedProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
};

type ButtonAsButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonSharedProps & {
    href?: undefined;
  };

type ButtonAsAnchorProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> &
  ButtonSharedProps & {
    href: string;
  };

export type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps;

const baseClasses = [
  "inline-flex items-center justify-center gap-2 rounded-lg font-bold",
  "transition-[transform,box-shadow,background,border-color,color] duration-200",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bm-primary-soft)]",
  "focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bm-bg-void)]",
  "active:translate-y-0 disabled:opacity-50",
  "disabled:cursor-not-allowed disabled:shadow-none",
  "whitespace-nowrap select-none",
].join(" ");

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    "bg-[image:var(--bm-gradient-primary)] text-[var(--bm-text-main)]",
    "shadow-[var(--bm-shadow-purple)] hover:-translate-y-0.5 hover:shadow-[var(--bm-shadow-purple)]",
  ].join(" "),
  secondary: [
    "border border-[var(--bm-border-subtle)] bg-[var(--bm-bg-glass)] text-[var(--bm-text-main)]",
    "hover:-translate-y-0.5 hover:border-[var(--bm-border-purple)] hover:bg-[var(--bm-bg-glass-strong)]",
  ].join(" "),
  ghost: [
    "text-[var(--bm-primary-soft)] hover:bg-[var(--bm-bg-glass)] hover:text-[var(--bm-text-main)]",
  ].join(" "),
  danger: [
    "bg-[var(--bm-danger)] text-[var(--bm-text-main)]",
    "hover:-translate-y-0.5 hover:shadow-[var(--bm-shadow-panel)]",
  ].join(" "),
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-9 px-3 text-sm",
  md: "min-h-11 px-5 text-base",
  lg: "min-h-[52px] px-6 text-base",
};

function Spinner() {
  return (
    <svg
      aria-hidden="true"
      className="size-4 animate-spin"
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
  );
}

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className,
  children,
  href,
  type,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const buttonType = (type ?? "button") as ButtonHTMLAttributes<HTMLButtonElement>["type"];
  const classes = joinClasses(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && "w-full",
    isDisabled && "pointer-events-none opacity-50 shadow-none",
    className,
  );
  const content = (
    <>
      {loading ? <Spinner /> : leftIcon}
      <span>{children}</span>
      {!loading && rightIcon}
    </>
  );

  if (href) {
    const { tabIndex, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;

    return (
      <a
        {...anchorRest}
        className={classes}
        href={isDisabled ? undefined : href}
        aria-busy={loading || undefined}
        aria-disabled={isDisabled ? "true" : undefined}
        tabIndex={isDisabled ? -1 : tabIndex}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      type={buttonType}
      className={classes}
      disabled={isDisabled}
      aria-busy={loading || undefined}
    >
      {content}
    </button>
  );
}
