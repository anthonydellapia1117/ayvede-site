import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";
import type { StatusTone } from "../../utils/types";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: StatusTone;
  /** "subtle" tinted fill (default), "outline" border only, "solid" for the strongest emphasis (neutral and info only). */
  variant?: "subtle" | "outline" | "solid";
  size?: "sm" | "md";
  /** Leading icon. */
  icon?: ReactNode;
}

/** Short categorical label: a status, a type, a count. Never a button. */
export function Badge({ tone = "neutral", variant = "subtle", size = "md", icon, className, children, ...rest }: BadgeProps) {
  return (
    <span className={cx("eui-badge", className)} data-tone={tone} data-variant={variant} data-size={size} {...rest}>
      {icon}
      {children}
    </span>
  );
}
