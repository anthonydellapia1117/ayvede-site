import { forwardRef, type SelectHTMLAttributes } from "react";
import { cx } from "../../utils/cx";
import type { ControlSize } from "../../utils/types";
import { Icon } from "../foundations/Icon";
import { useFieldContext } from "./Field";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  size?: ControlSize;
  invalid?: boolean;
  /** Options to render. You may pass <option> children instead. */
  options?: SelectOption[];
  /** Placeholder shown as a disabled first option when no value is selected. */
  placeholder?: string;
}

/**
 * Native select with system styling. Uses the platform picker, which is the
 * most accessible choice for short lists.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { size = "md", invalid, options, placeholder, className, id, required, disabled, children, value, defaultValue, ...rest },
  ref,
) {
  const field = useFieldContext();
  const describedBy = [rest["aria-describedby"], field?.describedBy].filter(Boolean).join(" ") || undefined;
  const showingPlaceholder = placeholder !== undefined && (value === "" || (value === undefined && (defaultValue === undefined || defaultValue === "")));
  return (
    <div className="eui-select-wrap">
      <select
        ref={ref}
        id={id ?? field?.id}
        className={cx("eui-select", className)}
        data-size={size}
        data-placeholder={showingPlaceholder ? "true" : undefined}
        aria-invalid={invalid ?? field?.invalid ? "true" : undefined}
        aria-describedby={describedBy}
        required={required ?? field?.required}
        disabled={disabled ?? field?.disabled}
        value={value}
        defaultValue={defaultValue ?? (placeholder !== undefined && value === undefined ? "" : undefined)}
        {...rest}
      >
        {placeholder !== undefined && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options
          ? options.map((o) => (
              <option key={o.value} value={o.value} disabled={o.disabled}>
                {o.label}
              </option>
            ))
          : children}
      </select>
      <Icon name="chevronDown" />
    </div>
  );
});
