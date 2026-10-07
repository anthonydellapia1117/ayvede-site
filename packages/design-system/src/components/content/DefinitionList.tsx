import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";

export interface DefinitionItem {
  term: ReactNode;
  description: ReactNode;
}

export interface DefinitionListProps extends HTMLAttributes<HTMLDListElement> {
  items: DefinitionItem[];
  /** "stacked" term over description; "inline" two columns with rules; "grid" compact facts side by side. Default "stacked". */
  layout?: "stacked" | "inline" | "grid";
}

/** Term and description pairs: facts about a document, a system, a decision. */
export function DefinitionList({ items, layout = "stacked", className, ...rest }: DefinitionListProps) {
  return (
    <dl className={cx("eui-dl", className)} data-layout={layout} {...rest}>
      {items.map((item, i) => (
        <div key={i}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </div>
      ))}
    </dl>
  );
}
