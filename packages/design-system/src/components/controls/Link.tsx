import { forwardRef, type AnchorHTMLAttributes } from "react";
import { cx } from "../../utils/cx";
import { Icon } from "../foundations/Icon";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Opens in a new tab with a trailing icon and safe rel. */
  external?: boolean;
  /** "default" accent color; "subtle" secondary text; "inherit" the surrounding color. */
  tone?: "default" | "subtle" | "inherit";
  /** Underline always (in prose) or only on hover (in navigation). Default "always". */
  underline?: "always" | "hover";
  /** Standalone call-to-action link: medium weight, with an arrow. */
  standalone?: boolean;
}

/** Inline text link. Prefer Button for actions and Link for navigation. */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { external = false, tone = "default", underline = "always", standalone = false, className, children, ...rest },
  ref,
) {
  const ext = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <a ref={ref} className={cx("eui-link", className)} data-tone={tone} data-underline={underline} data-standalone={standalone ? "true" : undefined} {...ext} {...rest}>
      {children}
      {standalone && !external && <Icon name="arrowRight" />}
      {external && (
        <>
          <span className="eui-sr-only"> (opens in a new tab)</span>
          <Icon name="external" />
        </>
      )}
    </a>
  );
});
