import type { HTMLAttributes } from "react";

export interface VisuallyHiddenProps extends HTMLAttributes<HTMLSpanElement> {
  as?: "span" | "div";
}

/** Content for screen readers only. */
export function VisuallyHidden({ as = "span", children, ...rest }: VisuallyHiddenProps) {
  const Tag = as;
  return (
    <Tag className="eui-sr-only" {...rest}>
      {children}
    </Tag>
  );
}
