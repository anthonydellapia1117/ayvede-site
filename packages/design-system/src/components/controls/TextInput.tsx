import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cx } from "../../utils/cx";
import type { ControlSize } from "../../utils/types";
import { useFieldContext } from "./Field";

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: ControlSize;
  /** Mark invalid (red border, aria-invalid). Set automatically inside a Field with an error. */
  invalid?: boolean;
  /** Content pinned inside the start of the field (a currency sign, an icon). */
  startAdornment?: ReactNode;
  /** Content pinned inside the end of the field (a unit, an icon). */
  endAdornment?: ReactNode;
  /** Monospaced text for identifiers and codes. */
  mono?: boolean;
}

/** Single-line text input. Wrap in Field for a label and messages. */
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  { size = "md", invalid, startAdornment, endAdornment, mono, className, id, required, disabled, ...rest },
  ref,
) {
  const field = useFieldContext();
  const describedBy = [rest["aria-describedby"], field?.describedBy].filter(Boolean).join(" ") || undefined;
  const input = (
    <input
      ref={ref}
      id={id ?? field?.id}
      className={cx("eui-input", className)}
      data-size={size}
      data-mono={mono ? "true" : undefined}
      aria-invalid={invalid ?? field?.invalid ? "true" : undefined}
      aria-describedby={describedBy}
      required={required ?? field?.required}
      disabled={disabled ?? field?.disabled}
      {...rest}
    />
  );
  if (!startAdornment && !endAdornment) return input;
  return (
    <div className="eui-input-wrap" data-has-start={startAdornment ? "true" : undefined} data-has-end={endAdornment ? "true" : undefined}>
      {startAdornment && (
        <span className="eui-input-adornment" data-side="start" aria-hidden="true">
          {startAdornment}
        </span>
      )}
      {input}
      {endAdornment && (
        <span className="eui-input-adornment" data-side="end" aria-hidden="true">
          {endAdornment}
        </span>
      )}
    </div>
  );
});
