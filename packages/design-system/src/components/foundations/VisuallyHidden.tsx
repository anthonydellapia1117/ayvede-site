import type { HTMLAttributes } from "react";
import { cx } from "../../utils/cx";

export interface VisuallyHiddenProps extends HTMLAttributes<HTMLSpanElement> {
  as?: "span" | "div";
}

/** Content for screen readers only. */
export function VisuallyHidden({ as = "span", className, children, ...rest }: VisuallyHiddenProps) {
  const Tag = as;
  return (
    <Tag className={cx("eui-sr-only", className)} {...rest}>
      {children}
    </Tag>
  );
}
