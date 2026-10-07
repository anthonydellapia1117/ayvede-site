import { forwardRef, type HTMLAttributes } from "react";
import { cx } from "../../utils/cx";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize = "display" | "1" | "2" | "3" | "4";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Semantic level (h1 to h6). Drives the document outline. Default 2. */
  level?: HeadingLevel;
  /** Visual size, decoupled from level. Defaults to the size matching the level. */
  size?: HeadingSize;
  /** Balance line lengths on multi-line headings. Default true. */
  balance?: boolean;
  tone?: "primary" | "secondary" | "inverse";
}

const sizeForLevel: Record<HeadingLevel, HeadingSize> = { 1: "1", 2: "2", 3: "3", 4: "4", 5: "4", 6: "4" };

/**
 * Semantic heading with a visual scale that is independent of the outline
 * level, so a page can use one h1 and still size section titles freely.
 */
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
  { level = 2, size, balance = true, tone, className, children, ...rest },
  ref,
) {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  return (
    <Tag ref={ref} className={cx("eui-heading", className)} data-size={size ?? sizeForLevel[level]} data-balance={balance ? "true" : undefined} data-tone={tone} {...rest}>
      {children}
    </Tag>
  );
});
