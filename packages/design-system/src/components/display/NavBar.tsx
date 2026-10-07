import { useId, useState, type HTMLAttributes, type ReactNode } from "react";
import { cx } from "../../utils/cx";
import { Container } from "../foundations/Container";
import { Icon } from "../foundations/Icon";
import { IconButton } from "../controls/IconButton";

export interface NavLink {
  label: string;
  href: string;
  /** Marks the current page. */
  current?: boolean;
}

export interface NavBarProps extends HTMLAttributes<HTMLElement> {
  /** Brand slot: text or a logo. Rendered as a link to `brandHref`. */
  brand: ReactNode;
  brandHref?: string;
  links?: NavLink[];
  /** Right-aligned actions (a Button, a theme switch). */
  actions?: ReactNode;
  /** Keep the bar pinned to the top while scrolling. */
  sticky?: boolean;
  /** Accessible name for the nav landmark. Default "Main". */
  label?: string;
  /** Width of the inner container. Default "content". */
  width?: "content" | "wide" | "full";
  menuLabel?: string;
}

/**
 * Top navigation. Links collapse into a disclosure menu below 1024px.
 * Supply the current page with `current: true` on its link.
 */
export function NavBar({ brand, brandHref = "/", links = [], actions, sticky = false, label = "Main", width = "content", menuLabel = "Menu", className, ...rest }: NavBarProps) {
  const [open, setOpen] = useState(false);
  const menuId = `eui-nav-menu-${useId()}`;
  return (
    <header className={cx("eui-navbar", className)} data-sticky={sticky ? "true" : undefined} {...rest}>
      <Container size={width}>
        <nav aria-label={label}>
          <div className="eui-navbar-inner">
            <a className="eui-navbar-brand" href={brandHref}>
              {brand}
            </a>
            {links.length > 0 && (
              <ul className="eui-navbar-links">
                {links.map((l) => (
                  <li key={l.href + l.label}>
                    <a className="eui-navbar-link" href={l.href} aria-current={l.current ? "page" : undefined}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {actions && (
              <div className="eui-navbar-actions" data-collapse={links.length > 0 ? "true" : undefined}>
                {actions}
              </div>
            )}
            {links.length > 0 && (
              <IconButton className="eui-navbar-toggle" label={open ? `Close ${menuLabel.toLowerCase()}` : menuLabel} icon={<Icon name={open ? "x" : "menu"} />} aria-expanded={open} aria-controls={menuId} onClick={() => setOpen((o) => !o)} />
            )}
          </div>
          {links.length > 0 && (
            <div id={menuId} className="eui-navbar-menu" data-open={open ? "true" : "false"} hidden={!open}>
              <ul>
                {links.map((l) => (
                  <li key={l.href + l.label}>
                    <a className="eui-navbar-link" href={l.href} aria-current={l.current ? "page" : undefined}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              {actions && <div className="eui-navbar-menu-actions">{actions}</div>}
            </div>
          )}
        </nav>
      </Container>
    </header>
  );
}
