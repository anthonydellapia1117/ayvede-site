import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";
import { Heading, type HeadingLevel, type HeadingSize } from "../foundations/Heading";
import { Text } from "../foundations/Text";

export interface SectionHeadingProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Short label above the title. */
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** Outline level of the title. Default 2. */
  level?: HeadingLevel;
  size?: HeadingSize;
  align?: "start" | "center";
  /** A link or button aligned with the title (for example, "View all"). */
  action?: ReactNode;
  /** id for the heading, so a Section can reference it with aria-labelledby. */
  headingId?: string;
}

/** Opens a page section: eyebrow, title, one-paragraph framing, optional action. */
export function SectionHeading({ eyebrow, title, description, level = 2, size, align = "start", action, headingId, className, ...rest }: SectionHeadingProps) {
  return (
    <div className={cx("eui-section-heading", className)} data-align={align} {...rest}>
      <div className="eui-section-heading-text">
        {eyebrow && (
          <Text as="span" variant="eyebrow">
            {eyebrow}
          </Text>
        )}
        <Heading level={level} size={size} id={headingId}>
          {title}
        </Heading>
        {description && (
          <Text variant="lead" balance>
            {description}
          </Text>
        )}
      </div>
      {action && <div className="eui-section-heading-action">{action}</div>}
    </div>
  );
}
