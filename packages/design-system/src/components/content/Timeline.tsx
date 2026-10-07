import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";
import { Badge } from "../display/Badge";
import { Text } from "../foundations/Text";

export type StageStatus = "complete" | "current" | "upcoming";

export interface TimelineStage {
  title: ReactNode;
  description?: ReactNode;
  /** Shown as a small label next to the title (a quarter, a date, a duration). */
  meta?: ReactNode;
  status?: StageStatus;
}

export interface TimelineProps extends HTMLAttributes<HTMLOListElement> {
  stages: TimelineStage[];
  /** Horizontal lays stages side by side from 768px up and stacks below. Default "vertical". */
  orientation?: "vertical" | "horizontal";
  /** Show a status badge. Default true. */
  showStatus?: boolean;
  statusLabels?: Partial<Record<StageStatus, string>>;
}

const defaultLabels: Record<StageStatus, string> = { complete: "Complete", current: "In progress", upcoming: "Upcoming" };

/** Staged roadmap or history. Status is shown as text and marker shape, never color alone. */
export function Timeline({ stages, orientation = "vertical", showStatus = true, statusLabels, className, ...rest }: TimelineProps) {
  const labels = { ...defaultLabels, ...statusLabels };
  return (
    <ol className={cx("eui-timeline", className)} data-orientation={orientation} {...rest}>
      {stages.map((s, i) => {
        const status = s.status ?? "upcoming";
        return (
          <li key={i} className="eui-timeline-stage" data-status={status} aria-current={status === "current" ? "step" : undefined}>
            <span className="eui-timeline-marker" aria-hidden="true" />
            <div className="eui-timeline-body">
              <div className="eui-timeline-title">
                <span>{s.title}</span>
                {s.meta && (
                  <Text as="span" variant="meta" numeric>
                    {s.meta}
                  </Text>
                )}
                {showStatus && (
                  <Badge size="sm" tone={status === "complete" ? "success" : status === "current" ? "info" : "neutral"} variant={status === "upcoming" ? "outline" : "subtle"}>
                    {labels[status]}
                  </Badge>
                )}
              </div>
              {s.description && (
                <Text variant="compact" tone="secondary">
                  {s.description}
                </Text>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
