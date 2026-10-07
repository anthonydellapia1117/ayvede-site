import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cx } from "../../utils/cx";
import type { ControlSize } from "../../utils/types";
import type { ButtonVariant } from "./Button";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Accessible name. Required: the icon alone is not a label. */
  label: string;
  /** The icon to show (an Icon or any SVG). */
  icon: ReactNode;
  variant?: ButtonVariant;
  size?: ControlSize;
}

/** Square, icon-only button with a mandatory accessible name. */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { label, icon, variant = "ghost", size = "md", className, type, ...rest },
  ref,
) {
  return (
    <button ref={ref} type={type ?? "button"} aria-label={label} title={label} className={cx("eui-button eui-icon-button", className)} data-variant={variant} data-size={size} {...rest}>
      {icon}
    </button>
  );
});
