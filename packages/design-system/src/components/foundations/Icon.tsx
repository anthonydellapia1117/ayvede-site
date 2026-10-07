import type { ReactNode, SVGAttributes } from "react";
import { cx } from "../../utils/cx";

/** Built-in glyphs. All are 24x24 stroke icons drawn in currentColor. */
export type IconName =
  | "check"
  | "checkCircle"
  | "x"
  | "xCircle"
  | "info"
  | "warning"
  | "chevronDown"
  | "chevronRight"
  | "chevronLeft"
  | "arrowRight"
  | "arrowUpRight"
  | "arrowUp"
  | "arrowDown"
  | "minus"
  | "plus"
  | "search"
  | "menu"
  | "external"
  | "circle"
  | "clock"
  | "document"
  | "inbox";

const paths: Record<IconName, ReactNode> = {
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  checkCircle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.5l2.5 2.5 4.5-5" />
    </>
  ),
  x: <path d="M6 6l12 12M18 6L6 18" />,
  xCircle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 9l6 6M15 9l-6 6" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </>
  ),
  warning: (
    <>
      <path d="M12 4l9 16H3z" />
      <path d="M12 10v4M12 17h.01" />
    </>
  ),
  chevronDown: <path d="M6 9l6 6 6-6" />,
  chevronRight: <path d="M9 6l6 6-6 6" />,
  chevronLeft: <path d="M15 6l-6 6 6 6" />,
  arrowRight: <path d="M4 12h16M13 5l7 7-7 7" />,
  arrowUpRight: <path d="M7 17L17 7M8 7h9v9" />,
  arrowUp: <path d="M12 20V4M5 11l7-7 7 7" />,
  arrowDown: <path d="M12 4v16M5 13l7 7 7-7" />,
  minus: <path d="M5 12h14" />,
  plus: <path d="M12 5v14M5 12h14" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M20 20l-4.3-4.3" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  external: <path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h5" />,
  circle: <circle cx="12" cy="12" r="4.5" fill="currentColor" stroke="none" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  document: (
    <>
      <path d="M7 3h7l5 5v13H7z" />
      <path d="M14 3v5h5M10 13h6M10 17h6" />
    </>
  ),
  inbox: (
    <>
      <path d="M4 13l2.5-8h11L20 13v6H4z" />
      <path d="M4 13h5l1.5 2h3L15 13h5" />
    </>
  ),
};

export interface IconProps extends Omit<SVGAttributes<SVGSVGElement>, "children"> {
  /** A built-in glyph. Omit to supply your own SVG paths as children. */
  name?: IconName;
  size?: "sm" | "md" | "lg";
  tone?: "secondary" | "tertiary" | "success" | "warning" | "danger" | "info" | "accent";
  /** Accessible name. When omitted the icon is decorative (aria-hidden). */
  label?: string;
  /** Custom paths for the 24x24 viewBox when `name` is omitted. */
  children?: ReactNode;
}

/**
 * Inline stroke icon. Decorative by default; pass `label` when the icon
 * carries meaning on its own (for example, an icon-only status).
 */
export function Icon({ name, size = "md", tone, label, className, children, ...rest }: IconProps) {
  const a11y = label ? { role: "img", "aria-label": label } : { "aria-hidden": true as const, focusable: "false" as const };
  return (
    <svg viewBox="0 0 24 24" className={cx("eui-icon", className)} data-size={size} data-tone={tone} {...a11y} {...rest}>
      {name ? paths[name] : children}
    </svg>
  );
}

export const iconNames = Object.keys(paths) as IconName[];
