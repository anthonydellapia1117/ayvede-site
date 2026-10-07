import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";
import { Icon } from "../foundations/Icon";

export interface ProcessStep {
  label: ReactNode;
  description?: ReactNode;
  /** Outline the step to draw attention (the step under discussion). */
  emphasis?: boolean;
}

export interface ProcessDiagramProps extends HTMLAttributes<HTMLOListElement> {
  steps: ProcessStep[];
  /** Horizontal flows left to right from 768px up; vertical always stacks. Default "horizontal". */
  direction?: "horizontal" | "vertical";
}

/** Numbered steps with arrows. Semantic ordered list, so it reads correctly without the visuals. */
export function ProcessDiagram({ steps, direction = "horizontal", className, ...rest }: ProcessDiagramProps) {
  return (
    <ol className={cx("eui-process", className)} data-direction={direction} {...rest}>
      {steps.map((s, i) => (
        <li key={i} className="eui-process-step" data-emphasis={s.emphasis ? "true" : undefined}>
          <span className="eui-process-number" aria-hidden="true" />
          <div className="eui-process-text">
            <div className="eui-process-label">{s.label}</div>
            {s.description && <div className="eui-process-description">{s.description}</div>}
          </div>
          <Icon className="eui-process-arrow" name="arrowRight" />
        </li>
      ))}
    </ol>
  );
}
