import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cx } from "../../utils/cx";
import type { ControlSize } from "../../utils/types";
import { Spinner } from "../content/Spinner";

export type ButtonVariant = "primary" | "secondary" | "contrast" | "ghost" | "danger";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** "primary" for the one main action; "secondary" (outlined) for the rest; "contrast" (solid ink) when primary is already used nearby; "ghost" for toolbars; "danger" for destructive confirms. Default "secondary". */
  variant?: ButtonVariant;
  size?: ControlSize;
  /** Icon before the label. */
  iconStart?: ReactNode;
  /** Icon after the label. */
  iconEnd?: ReactNode;
  /** Shows a spinner, keeps the width, and blocks clicks. */
  loading?: boolean;
  fullWidth?: boolean;
  /** Render as a link. The button styling is kept; a few button-only attributes are dropped. */
  href?: string;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  rel?: string;
}

/**
 * The action control. Use one primary per view. Text labels are required;
 * use IconButton for icon-only actions.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "secondary", size = "md", iconStart, iconEnd, loading = false, fullWidth = false, href, target, rel, className, children, disabled, type, ...rest },
  ref,
) {
  const shared = {
    className: cx("eui-button", className),
    "data-variant": variant,
    "data-size": size,
    "data-loading": loading ? "true" : undefined,
    "data-full-width": fullWidth ? "true" : undefined,
    "aria-busy": loading || undefined,
  };
  const content = (
    <>
      {iconStart}
      <span>{children}</span>
      {iconEnd}
      {loading && (
        <span className="eui-button-spinner">
          <Spinner size="sm" label="" />
        </span>
      )}
    </>
  );
  if (href) {
    const { onClick, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a ref={ref as never} href={disabled ? undefined : href} target={target} rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)} aria-disabled={disabled || undefined} onClick={disabled ? (e) => e.preventDefault() : onClick} {...shared} {...anchorRest}>
        {content}
      </a>
    );
  }
  return (
    <button ref={ref} type={type ?? "button"} disabled={disabled || loading} {...shared} {...rest}>
      {content}
    </button>
  );
});
