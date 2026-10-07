import { forwardRef, type CSSProperties } from "react";
import { cx } from "../../utils/cx";
import { spaceVar, type BoxProps, type SpaceToken } from "../../utils/types";

export interface GridProps extends BoxProps {
  /** Fixed column count (collapses to 2 under 1024px and 1 under 640px) or "auto" to fit as many `min`-wide columns as possible. Default "auto". */
  columns?: "auto" | 1 | 2 | 3 | 4 | 6 | 12;
  /** Minimum column width when columns="auto". Default "16rem". */
  min?: string;
  /** Gap in spacing steps. Default 6 (1.5rem). */
  gap?: SpaceToken;
}

/** Responsive grid for cards, metrics, and feature lists. */
export const Grid = forwardRef<HTMLElement, GridProps>(function Grid(
  { as = "div", columns = "auto", min, gap = 6, className, style, children, ...rest },
  ref,
) {
  const Tag = as as "div";
  const css = { ...style, "--eui-grid-gap": spaceVar(gap), "--eui-grid-min": min } as CSSProperties;
  return (
    <Tag ref={ref as never} className={cx("eui-grid", className)} style={css} data-columns={String(columns)} {...rest}>
      {children}
    </Tag>
  );
});
