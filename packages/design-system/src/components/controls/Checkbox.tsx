import { forwardRef, useEffect, useId, useImperativeHandle, useRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cx } from "../../utils/cx";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Visible label. Required. */
  label: ReactNode;
  /** Secondary line under the label. */
  description?: ReactNode;
  /** Partially selected state (for example, a "select all" with mixed children). */
  indeterminate?: boolean;
  invalid?: boolean;
}

/** A labeled checkbox. The box and its label text are both clickable. */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, description, indeterminate = false, invalid, className, id, disabled, ...rest },
  ref,
) {
  const auto = useId();
  const inputId = id ?? `eui-checkbox-${auto}`;
  const descId = description ? `${inputId}-description` : undefined;
  const inner = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => inner.current as HTMLInputElement);
  useEffect(() => {
    if (inner.current) inner.current.indeterminate = indeterminate;
  }, [indeterminate]);
  return (
    <div className={cx("eui-choice", className)} data-disabled={disabled ? "true" : undefined}>
      <input ref={inner} id={inputId} type="checkbox" className="eui-choice-control" disabled={disabled} aria-invalid={invalid ? "true" : undefined} aria-describedby={descId} {...rest} />
      <label className="eui-choice-label" htmlFor={inputId}>
        {label}
      </label>
      {description && (
        <span id={descId} className="eui-choice-description">
          {description}
        </span>
      )}
    </div>
  );
});
