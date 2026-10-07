import { forwardRef, type CSSProperties } from "react";
import { cx } from "../../utils/cx";
import { spaceVar, type BoxProps, type SpaceToken } from "../../utils/types";

export interface InlineProps extends BoxProps {
  /** Gap in spacing steps. Default 3 (0.75rem). */
  gap?: SpaceToken;
  align?: "start" | "center" | "end" | "baseline" | "stretch";
  justify?: "start" | "center" | "end" | "between";
  /** Allow wrapping onto new lines. Default true. */
  wrap?: boolean;
}

/** Horizontal row of items (buttons, badges, metadata) that wraps on narrow screens. */
export const Inline = forwardRef<HTMLElement, InlineProps>(function Inline(
  { as = "div", gap = 3, align, justify, wrap = true, className, style, children, ...rest },
  ref,
) {
  const Tag = as as "div";
  const css = { ...style, "--eui-inline-gap": spaceVar(gap) } as CSSProperties;
  return (
    <Tag ref={ref as never} className={cx("eui-inline", className)} style={css} data-align={align} data-justify={justify} data-wrap={wrap ? undefined : "false"} {...rest}>
      {children}
    </Tag>
  );
});
