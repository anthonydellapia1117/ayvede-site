import { forwardRef, useId, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cx } from "../../utils/cx";

export interface SwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  /** Controlled on/off state. */
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  /** Visible label. Required. */
  label: ReactNode;
  description?: ReactNode;
  size?: "sm" | "md";
}

/**
 * An on/off control that applies immediately (unlike a checkbox in a form).
 * Implemented as a button with role="switch".
 */
export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  { checked, onCheckedChange, label, description, size = "md", className, id, disabled, ...rest },
  ref,
) {
  const auto = useId();
  const btnId = id ?? `eui-switch-${auto}`;
  const labelId = `${btnId}-label`;
  const descId = description ? `${btnId}-description` : undefined;
  return (
    <div className={cx("eui-switch", className)} data-size={size} data-disabled={disabled ? "true" : undefined}>
      <button
        ref={ref}
        id={btnId}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={labelId}
        aria-describedby={descId}
        className="eui-switch-track"
        disabled={disabled}
        onClick={() => onCheckedChange(!checked)}
        {...rest}
      />
      <label id={labelId} htmlFor={btnId} className="eui-switch-label">
        {label}
      </label>
      {description && (
        <span id={descId} className="eui-switch-description">
          {description}
        </span>
      )}
    </div>
  );
});
