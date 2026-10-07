import type { HTMLAttributes } from "react";
import { cx } from "../../utils/cx";

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: "sm" | "md" | "lg";
  /** Announced to screen readers. Default "Loading". Pass "" when a parent already announces the state (aria-busy, a status region). */
  label?: string;
}

/** Indeterminate progress indicator. Inherits the text color. */
export function Spinner({ size = "md", label = "Loading", className, ...rest }: SpinnerProps) {
  if (!label) return <span aria-hidden="true" className={cx("eui-spinner", className)} data-size={size} {...rest} />;
  return (
    <span role="status" aria-live="polite" className={cx("eui-spinner", className)} data-size={size} {...rest}>
      <span className="eui-sr-only">{label}</span>
    </span>
  );
}
