import type { HTMLAttributes } from "react";
import { cx } from "../../utils/cx";
import { Icon } from "../foundations/Icon";

export interface BreadcrumbItem {
  label: string;
  /** Omit on the current page. */
  href?: string;
}

export interface BreadcrumbsProps extends HTMLAttributes<HTMLElement> {
  /** Ordered from the root to the current page. The last item is marked aria-current. */
  items: BreadcrumbItem[];
  /** Accessible name for the landmark. Default "Breadcrumb". */
  label?: string;
}

/** Location trail. Shows where the reader is and lets them step back up. */
export function Breadcrumbs({ items, label = "Breadcrumb", className, ...rest }: BreadcrumbsProps) {
  return (
    <nav aria-label={label} className={cx("eui-breadcrumbs", className)} {...rest}>
      <ol>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`}>
              {i > 0 && <Icon name="chevronRight" size="sm" />}
              {last || !item.href ? (
                <span aria-current={last ? "page" : undefined}>{item.label}</span>
              ) : (
                <a href={item.href}>{item.label}</a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
