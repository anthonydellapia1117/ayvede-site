import { forwardRef, type HTMLAttributes } from "react";
import { cx } from "../../utils/cx";

export type TextVariant = "lead" | "body" | "compact" | "meta" | "eyebrow";
export type TextTone = "primary" | "secondary" | "tertiary" | "inverse" | "link" | "success" | "warning" | "danger";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  /** Element to render. Default "p". */
  as?: "p" | "span" | "div" | "label" | "small" | "strong" | "em" | "li" | "dt" | "dd" | "figcaption" | "caption";
  /** Type role. "lead" for intros, "compact" for dense UI, "meta" for secondary metadata, "eyebrow" for short labels above headings. */
  variant?: TextVariant;
  tone?: TextTone;
  weight?: "regular" | "medium" | "semibold";
  align?: "start" | "center" | "end";
  /** Tabular, lining figures for columns of numbers. */
  numeric?: boolean;
  /** Monospaced family for identifiers and code-like values. */
  mono?: boolean;
  /** Single line with an ellipsis. */
  truncate?: boolean;
  /** Balance short multi-line text (intros, captions). */
  balance?: boolean;
  /** Cap the line length at a comfortable reading measure (68ch). */
  measure?: boolean;
}

/** Body copy and small text. One component, one scale. */
export const Text = forwardRef<HTMLElement, TextProps>(function Text(
  { as = "p", variant = "body", tone, weight, align, numeric, mono, truncate, balance, measure, className, children, ...rest },
  ref,
) {
  const Tag = as as "p";
  return (
    <Tag
      ref={ref as never}
      className={cx("eui-text", className)}
      data-variant={variant}
      data-tone={tone}
      data-weight={weight}
      data-align={align}
      data-numeric={numeric ? "true" : undefined}
      data-mono={mono ? "true" : undefined}
      data-truncate={truncate ? "true" : undefined}
      data-balance={balance ? "true" : undefined}
      data-measure={measure ? "true" : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
});
