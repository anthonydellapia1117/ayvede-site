import type { HTMLAttributes } from "react";
import { cx } from "../../utils/cx";

export interface DividerProps extends HTMLAttributes<HTMLElement> {
  orientation?: "horizontal" | "vertical";
  /** Vertical margin around a horizontal divider. Default "none". */
  spacing?: "none" | "sm" | "md" | "lg";
  /** Short text set into the rule (for example, "or"). */
  label?: string;
}

/** A hairline rule. Purely visual unless given a label. */
export function Divider({ orientation = "horizontal", spacing = "none", label, className, ...rest }: DividerProps) {
  if (label) {
    return (
      <div role="separator" aria-label={label} className={cx("eui-divider-labeled", className)} data-spacing={spacing} {...rest}>
        <span aria-hidden="true">{label}</span>
      </div>
    );
  }
  return <hr aria-orientation={orientation} className={cx("eui-divider", className)} data-orientation={orientation} data-spacing={spacing} {...rest} />;
}
