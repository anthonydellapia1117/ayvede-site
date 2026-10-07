import { createContext, useContext, useId, type ReactNode } from "react";
import { cx } from "../../utils/cx";
import { Icon } from "../foundations/Icon";

export interface FieldContextValue {
  /** id the control must use so the label points at it. */
  id: string;
  /** Space-separated ids of description and error for aria-describedby. */
  describedBy?: string;
  invalid: boolean;
  required: boolean;
  disabled: boolean;
}

const FieldContext = createContext<FieldContextValue | null>(null);

/** Read the enclosing Field's ids and state. Returns null outside a Field. */
export function useFieldContext(): FieldContextValue | null {
  return useContext(FieldContext);
}

export interface FieldProps {
  /** Visible label text. Required for accessibility. */
  label: ReactNode;
  /** Help text shown under the label. */
  description?: ReactNode;
  /** Validation message. When set, the control is marked invalid and the message is announced. */
  error?: ReactNode;
  required?: boolean;
  /** Show "(optional)" next to the label. Use this or `required`, not both. */
  showOptional?: boolean;
  disabled?: boolean;
  /** Override the generated control id. */
  id?: string;
  className?: string;
  /** A single control: TextInput, Textarea, or Select. It picks up id, describedby, and invalid automatically. */
  children: ReactNode;
}

/**
 * Wraps a form control with a label, optional description, and validation
 * message, wiring every id and aria attribute for you.
 *
 * @example
 * <Field label="Work email" description="We never share it." error={errors.email}>
 *   <TextInput type="email" />
 * </Field>
 */
export function Field({ label, description, error, required = false, showOptional = false, disabled = false, id, className, children }: FieldProps) {
  const auto = useId();
  const controlId = id ?? `eui-field-${auto}`;
  const descriptionId = description ? `${controlId}-description` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;
  const value: FieldContextValue = { id: controlId, describedBy, invalid: Boolean(error), required, disabled };
  return (
    <FieldContext.Provider value={value}>
      <div className={cx("eui-field", className)} data-disabled={disabled ? "true" : undefined} data-invalid={error ? "true" : undefined}>
        <label className="eui-field-label" htmlFor={controlId}>
          <span>{label}</span>
          {required && (
            <span className="eui-field-required" aria-hidden="true">
              *
            </span>
          )}
          {showOptional && !required && <span className="eui-field-optional">(optional)</span>}
        </label>
        {description && (
          <div id={descriptionId} className="eui-field-description">
            {description}
          </div>
        )}
        {children}
        {error && (
          <div id={errorId} className="eui-field-error" role="alert">
            <Icon name="warning" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </FieldContext.Provider>
  );
}
