import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";
import { Icon } from "../foundations/Icon";
import { Badge } from "../display/Badge";

export interface MetricChange {
  /** Formatted delta, for example "+4.2 pts" or "-12%". */
  value: ReactNode;
  direction: "up" | "down" | "flat";
  /** Whether "up" is good. Default "positive". Use "neutral" when direction carries no judgment. */
  sentiment?: "positive" | "negative" | "neutral";
  /** Context such as "vs. prior quarter". */
  label?: ReactNode;
}

export interface MetricProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  /** Already formatted. The component never computes or rounds. */
  value: ReactNode;
  unit?: ReactNode;
  change?: MetricChange;
  /** One sentence on what the number means or how it was measured. */
  context?: ReactNode;
  /** Where the number comes from. Strongly encouraged. */
  source?: ReactNode;
  /** Shows an "Illustrative" badge. Use for sample data in previews and drafts. */
  illustrative?: boolean;
  illustrativeLabel?: string;
  size?: "sm" | "md" | "lg";
}

const arrow = { up: "arrowUp", down: "arrowDown", flat: "minus" } as const;
const directionText = { up: "increased", down: "decreased", flat: "unchanged" } as const;

/**
 * One number with its meaning. Label, value, and source are the minimum for
 * an executive audience; a change without a comparison period is noise.
 */
export function Metric({ label, value, unit, change, context, source, illustrative = false, illustrativeLabel = "Illustrative", size = "md", className, ...rest }: MetricProps) {
  return (
    <div className={cx("eui-metric", className)} data-size={size} {...rest}>
      <div className="eui-metric-label">
        <span>{label}</span>
        {illustrative && (
          <Badge size="sm" tone="neutral" variant="outline">
            {illustrativeLabel}
          </Badge>
        )}
      </div>
      <div className="eui-metric-value">
        <span>
          {value}
          {unit && <span className="eui-metric-unit"> {unit}</span>}
        </span>
        {change && (
          <span className="eui-metric-change" data-direction={change.direction} data-sentiment={change.sentiment ?? "positive"}>
            <Icon name={arrow[change.direction]} />
            <span className="eui-sr-only">{directionText[change.direction]} </span>
            <span>{change.value}</span>
            {change.label && <span style={{ fontWeight: 400, color: "var(--eui-color-text-tertiary)" }}>{change.label}</span>}
          </span>
        )}
      </div>
      {context && <div className="eui-metric-context">{context}</div>}
      {source && <div className="eui-metric-source">Source: {source}</div>}
    </div>
  );
}
