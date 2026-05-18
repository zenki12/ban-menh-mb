import type { ComponentPropsWithoutRef, ReactNode } from "react";

type CardVariant = "default" | "glass" | "panel" | "report";
type CardPadding = "sm" | "md" | "lg";
type CardElement = "div" | "article" | "section";

type NativeCardProps<T extends CardElement> = Omit<
  ComponentPropsWithoutRef<T>,
  "as" | "children" | "className"
>;

export type CardProps<T extends CardElement = "div"> = NativeCardProps<T> & {
  variant?: CardVariant;
  padding?: CardPadding;
  interactive?: boolean;
  as?: T;
  className?: string;
  children?: ReactNode;
};

const baseClasses = [
  "rounded-2xl border transition-[transform,box-shadow,border-color,background] duration-200",
  "overflow-hidden",
].join(" ");

const variantClasses: Record<CardVariant, string> = {
  default: "border-[var(--bm-border-subtle)] bg-[var(--bm-bg-glass)]",
  glass: [
    "border-[var(--bm-border-subtle)] bg-[var(--bm-bg-glass-strong)]",
    "backdrop-blur-md",
  ].join(" "),
  panel: [
    "border-[var(--bm-border-subtle)] bg-[var(--bm-bg-panel)]",
    "shadow-[var(--bm-shadow-panel)]",
  ].join(" "),
  report: [
    "border-[var(--bm-border-strong)] bg-[image:var(--bm-gradient-report)]",
    "shadow-[var(--bm-shadow-panel)]",
  ].join(" "),
};

const paddingClasses: Record<CardPadding, string> = {
  sm: "p-4",
  md: "p-6",
  lg: "p-6 sm:p-8",
};

const interactiveClasses = [
  "cursor-pointer hover:-translate-y-0.5",
  "hover:border-[var(--bm-border-purple)] hover:shadow-[var(--bm-shadow-purple)]",
].join(" ");

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export function Card<T extends CardElement = "div">({
  variant = "default",
  padding = "md",
  interactive = false,
  as,
  className,
  children,
  ...rest
}: CardProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={joinClasses(
        baseClasses,
        variantClasses[variant],
        paddingClasses[padding],
        interactive && interactiveClasses,
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
