import type { CSSProperties, HTMLAttributes } from "react";
import { cx } from "../../utils/cx";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** CSS width. Default "100%". */
  width?: string;
  /** CSS height. Default "1em". */
  height?: string;
  /** Render this many text-like lines instead of one block. */
  lines?: number;
}

/** Placeholder shape shown while content loads. Decorative; pair with a visible loading message. */
export function Skeleton({ width = "100%", height = "1em", lines, className, style, ...rest }: SkeletonProps) {
  if (lines && lines > 1) {
    return (
      <div className={cx("eui-skeleton-lines", className)} aria-hidden="true" style={style} {...rest}>
        {Array.from({ length: lines }, (_, i) => (
          <span key={i} className="eui-skeleton" style={{ height }} />
        ))}
      </div>
    );
  }
  const css: CSSProperties = { ...style, width, height };
  return <div className={cx("eui-skeleton", className)} aria-hidden="true" style={css} {...rest} />;
}
