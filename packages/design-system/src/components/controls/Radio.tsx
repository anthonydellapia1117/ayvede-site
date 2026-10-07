import { createContext, forwardRef, useContext, useId, type ChangeEvent, type FieldsetHTMLAttributes, type InputHTMLAttributes, type ReactNode } from "react";
import { cx } from "../../utils/cx";
import { Icon } from "../foundations/Icon";

interface RadioGroupContextValue {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  invalid?: boolean;
}
const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, "onChange"> {
  /** Group label, rendered as the legend. Required. */
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  /** Shared input name. Generated when omitted. */
  name?: string;
  /** Controlled value. */
  value?: string;
  /** Uncontrolled initial value. */
  defaultValue?: string;
  onChange?: (value: string) => void;
  orientation?: "vertical" | "horizontal";
  /** Radio children. */
  children: ReactNode;
}

/** A labeled set of mutually exclusive options. */
export function RadioGroup({ label, description, error, name, value, defaultValue, onChange, orientation = "vertical", disabled, className, children, ...rest }: RadioGroupProps) {
  const auto = useId();
  const groupName = name ?? `eui-radio-${auto}`;
  const descId = description ? `${groupName}-description` : undefined;
  const errId = error ? `${groupName}-error` : undefined;
  const describedBy = [descId, errId].filter(Boolean).join(" ") || undefined;
  const ctx: RadioGroupContextValue = { name: groupName, value, onChange, disabled, invalid: Boolean(error) };
  return (
    <RadioGroupContext.Provider value={ctx}>
      <fieldset className={cx("eui-radio-group", className)} data-orientation={orientation} disabled={disabled} aria-describedby={describedBy} aria-invalid={error ? "true" : undefined} {...rest}>
        <legend>{label}</legend>
        {description && (
          <div id={descId} className="eui-field-description" style={{ marginBottom: "var(--eui-space-3)" }}>
            {description}
          </div>
        )}
        <div className="eui-radio-group-items" role="presentation" data-default-value={defaultValue}>
          {children}
        </div>
        {error && (
          <div id={errId} className="eui-field-error" role="alert" style={{ marginTop: "var(--eui-space-2)" }}>
            <Icon name="warning" />
            <span>{error}</span>
          </div>
        )}
      </fieldset>
    </RadioGroupContext.Provider>
  );
}

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value"> {
  /** The value this option represents. */
  value: string;
  label: ReactNode;
  description?: ReactNode;
}

/** One option inside a RadioGroup. */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio({ value, label, description, className, id, disabled, onChange, ...rest }, ref) {
  const group = useContext(RadioGroupContext);
  const auto = useId();
  const inputId = id ?? `eui-radio-${auto}`;
  const descId = description ? `${inputId}-description` : undefined;
  const isDisabled = disabled ?? group?.disabled;
  const controlled = group?.value !== undefined;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    group?.onChange?.(value);
  };
  return (
    <div className={cx("eui-choice", className)} data-disabled={isDisabled ? "true" : undefined}>
      <input
        ref={ref}
        id={inputId}
        type="radio"
        className="eui-choice-control"
        name={group?.name}
        value={value}
        checked={controlled ? group?.value === value : undefined}
        onChange={handleChange}
        disabled={isDisabled}
        aria-invalid={group?.invalid ? "true" : undefined}
        aria-describedby={descId}
        {...rest}
      />
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
