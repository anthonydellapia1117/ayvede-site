import { forwardRef, type CSSProperties } from "react";
import { cx } from "../../utils/cx";
import { spaceVar, type BoxProps, type SpaceToken } from "../../utils/types";

export interface StackProps extends BoxProps {
  /** Vertical gap in spacing steps. Default 4 (1rem). */
  gap?: SpaceToken;
  align?: "start" | "center" | "end" | "stretch";
  /** Draw a hairline between children. */
  divider?: boolean;
}

/** Vertical flow with consistent spacing. Use it instead of ad hoc margins. */
export const Stack = forwardRef<HTMLElement, StackProps>(function Stack(
  { as = "div", gap = 4, align, divider, className, style, children, ...rest },
  ref,
) {
  const Tag = as as "div";
  const css = { ...style, "--eui-stack-gap": spaceVar(gap) } as CSSProperties;
  return (
    <Tag ref={ref as never} className={cx("eui-stack", className)} style={css} data-align={align} data-divider={divider ? "true" : undefined} {...rest}>
      {children}
    </Tag>
  );
});
