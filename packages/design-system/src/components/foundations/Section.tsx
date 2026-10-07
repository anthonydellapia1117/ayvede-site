import { forwardRef } from "react";
import { cx } from "../../utils/cx";
import type { BoxProps } from "../../utils/types";

export interface SectionProps extends BoxProps {
  /** Vertical rhythm. Default "md". */
  spacing?: "sm" | "md" | "lg";
  /** Background band. "inverse" flips text roles for a dark summary band. Default "canvas". */
  tone?: "canvas" | "surface" | "subtle" | "inverse";
  /** Top hairline to separate from the previous band. */
  bordered?: boolean;
}

/** A full-width page band. Pair with Container for width control. */
export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { as = "section", spacing = "md", tone = "canvas", bordered, className, children, ...rest },
  ref,
) {
  const Tag = as as "section";
  return (
    <Tag ref={ref as never} className={cx("eui-section", className)} data-spacing={spacing} data-tone={tone} data-bordered={bordered ? "true" : undefined} {...rest}>
      {children}
    </Tag>
  );
});
