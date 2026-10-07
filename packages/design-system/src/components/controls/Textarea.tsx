import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cx } from "../../utils/cx";
import { useFieldContext } from "./Field";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
  /** Allow the user to resize vertically. Default "vertical". */
  resize?: "vertical" | "none";
}

/** Multi-line text input. Wrap in Field for a label and messages. */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { invalid, resize = "vertical", rows = 4, className, id, required, disabled, ...rest },
  ref,
) {
  const field = useFieldContext();
  const describedBy = [rest["aria-describedby"], field?.describedBy].filter(Boolean).join(" ") || undefined;
  return (
    <textarea
      ref={ref}
      id={id ?? field?.id}
      rows={rows}
      className={cx("eui-textarea", className)}
      data-resize={resize}
      aria-invalid={invalid ?? field?.invalid ? "true" : undefined}
      aria-describedby={describedBy}
      required={required ?? field?.required}
      disabled={disabled ?? field?.disabled}
      {...rest}
    />
  );
});
