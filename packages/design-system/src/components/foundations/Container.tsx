import { forwardRef } from "react";
import { cx } from "../../utils/cx";
import type { BoxProps } from "../../utils/types";

export interface ContainerProps extends BoxProps {
  /** "reading" (42rem) for prose, "content" (72rem) for pages, "wide" (90rem) for data-dense views, "full" for no cap. Default "content". */
  size?: "reading" | "content" | "wide" | "full";
  /** Responsive side gutters. Default true. */
  gutter?: boolean;
}

/** Centers content at a named maximum width with responsive gutters. */
export const Container = forwardRef<HTMLElement, ContainerProps>(function Container(
  { as = "div", size = "content", gutter = true, className, children, ...rest },
  ref,
) {
  const Tag = as as "div";
  return (
    <Tag ref={ref as never} className={cx("eui-container", className)} data-size={size} data-gutter={gutter ? "true" : "false"} {...rest}>
      {children}
    </Tag>
  );
});
