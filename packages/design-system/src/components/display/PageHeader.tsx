import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";
import { Heading } from "../foundations/Heading";
import { Text } from "../foundations/Text";

export interface PageHeaderProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  /** Short label above the title (a section name, a document type). */
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** Primary and secondary actions, right-aligned on wide screens. */
  actions?: ReactNode;
  /** Breadcrumbs rendered above the title. */
  breadcrumbs?: ReactNode;
  /** Metadata row under the description (badges, dates, owners). */
  meta?: ReactNode;
  /** Display size for the title. Default "1". */
  size?: "display" | "1" | "2";
}

/** The top of a page: where the reader is, what it is, and what to do. Renders the page's h1. */
export function PageHeader({ eyebrow, title, description, actions, breadcrumbs, meta, size = "1", className, ...rest }: PageHeaderProps) {
  return (
    <header className={cx("eui-page-header", className)} {...rest}>
      {breadcrumbs}
      <div className="eui-page-header-row">
        <div className="eui-page-header-text">
          {eyebrow && (
            <Text as="span" variant="eyebrow">
              {eyebrow}
            </Text>
          )}
          <Heading level={1} size={size}>
            {title}
          </Heading>
          {description && (
            <Text variant="lead" balance>
              {description}
            </Text>
          )}
        </div>
        {actions && <div className="eui-page-header-actions">{actions}</div>}
      </div>
      {meta && <div className="eui-page-header-meta">{meta}</div>}
    </header>
  );
}
