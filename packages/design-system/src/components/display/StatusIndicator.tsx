import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";
import { Icon, type IconName } from "../foundations/Icon";

export type StatusKind = "success" | "warning" | "danger" | "info" | "neutral" | "pending";

export interface StatusIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
  status: StatusKind;
  /** Visible text. Required so the status never relies on color alone. */
  label: ReactNode;
  size?: "sm" | "md";
}

const glyph: Record<StatusKind, IconName> = {
  success: "checkCircle",
  warning: "warning",
  danger: "xCircle",
  info: "info",
  neutral: "circle",
  pending: "clock",
};

/** Icon plus label for a state. The glyph differs per status, so color is reinforcement, not the signal. */
export function StatusIndicator({ status, label, size = "md", className, ...rest }: StatusIndicatorProps) {
  return (
    <span className={cx("eui-status", className)} data-status={status} data-size={size} {...rest}>
      <Icon name={glyph[status]} />
      <span>{label}</span>
    </span>
  );
}
