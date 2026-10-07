import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";
import { Heading, type HeadingLevel } from "../foundations/Heading";
import { Text } from "../foundations/Text";

export interface KeyTakeawaysProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  /** Default "Key takeaways". */
  title?: ReactNode;
  titleLevel?: HeadingLevel;
  /** Three to five short, complete sentences. */
  items: ReactNode[];
  /** The single decision or recommendation, shown as a labeled bottom line. */
  bottomLine?: ReactNode;
  bottomLineLabel?: string;
  tone?: "surface" | "subtle" | "inverse";
}

/** The executive summary block: numbered takeaways and one bottom line. Place it first. */
export function KeyTakeaways({ title = "Key takeaways", titleLevel = 2, items, bottomLine, bottomLineLabel = "Bottom line", tone = "surface", className, ...rest }: KeyTakeawaysProps) {
  return (
    <aside className={cx("eui-takeaways", className)} data-tone={tone} {...rest}>
      <Heading level={titleLevel} size="4">
        {title}
      </Heading>
      <ol className="eui-takeaways-list">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ol>
      {bottomLine && (
        <div className="eui-takeaways-bottom-line">
          <Text as="span" variant="eyebrow">
            {bottomLineLabel}
          </Text>
          <Text as="span" weight="medium">
            {bottomLine}
          </Text>
        </div>
      )}
    </aside>
  );
}
