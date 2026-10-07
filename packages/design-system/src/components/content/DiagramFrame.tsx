import { useId, type HTMLAttributes, type ReactNode } from "react";
import { cx } from "../../utils/cx";

export interface DiagramFrameProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  title: ReactNode;
  /** The takeaway in one sentence, shown under the diagram. */
  caption?: ReactNode;
  /** A full text equivalent: reading order, labels, relationships. Rendered in an expandable "Text description" and linked by aria-describedby. */
  description: ReactNode;
  /** Label for the expandable description. Default "Text description". */
  descriptionLabel?: string;
  source?: ReactNode;
  /** A figure number or type shown with the title (for example "Figure 2"). */
  figureLabel?: ReactNode;
  /** Draw the bordered canvas. Default true. */
  frame?: boolean;
  /** The diagram: inline SVG, ProcessDiagram, Timeline, or an image with alt text. */
  children: ReactNode;
}

/**
 * Wraps any visual with a title, caption, source, and an accessible text
 * description. Every meaningful diagram goes through this frame.
 */
export function DiagramFrame({ title, caption, description, descriptionLabel = "Text description", source, figureLabel, frame = true, className, children, ...rest }: DiagramFrameProps) {
  const id = useId();
  const titleId = `eui-fig-title-${id}`;
  const descId = `eui-fig-desc-${id}`;
  return (
    <figure className={cx("eui-figure", className)} data-frame={frame ? "true" : "false"} aria-labelledby={titleId} aria-describedby={descId} {...rest}>
      <div className="eui-figure-head">
        <div className="eui-figure-title" id={titleId}>
          {figureLabel && <span style={{ color: "var(--eui-color-text-tertiary)", fontWeight: 500 }}>{figureLabel} · </span>}
          {title}
        </div>
      </div>
      <div className="eui-figure-canvas">{children}</div>
      <figcaption>
        {caption && <div className="eui-figure-caption">{caption}</div>}
        {source && <div className="eui-figure-source">Source: {source}</div>}
        <details className="eui-figure-details" style={caption || source ? { marginTop: "var(--eui-space-2)" } : undefined}>
          <summary>{descriptionLabel}</summary>
          <div id={descId}>{description}</div>
        </details>
      </figcaption>
    </figure>
  );
}
