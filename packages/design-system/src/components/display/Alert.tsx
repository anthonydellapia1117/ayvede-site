import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";
import { Icon, type IconName } from "../foundations/Icon";
import { IconButton } from "../controls/IconButton";

export type AlertTone = "info" | "success" | "warning" | "danger";

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  tone?: AlertTone;
  title?: ReactNode;
  /** Actions rendered under the message (usually small Buttons). */
  actions?: ReactNode;
  /** When provided, shows a close button. */
  onDismiss?: () => void;
  dismissLabel?: string;
  children?: ReactNode;
}

const glyph: Record<AlertTone, IconName> = { info: "info", success: "checkCircle", warning: "warning", danger: "xCircle" };

/**
 * Inline message tied to the content around it. Warning and danger alerts
 * are announced assertively; info and success politely.
 */
export function Alert({ tone = "info", title, actions, onDismiss, dismissLabel = "Dismiss", className, children, ...rest }: AlertProps) {
  const role = tone === "danger" || tone === "warning" ? "alert" : "status";
  return (
    <div role={role} className={cx("eui-alert", className)} data-tone={tone} {...rest}>
      <Icon name={glyph[tone]} />
      <div className="eui-alert-content">
        {title && <div className="eui-alert-title">{title}</div>}
        {children && <div>{children}</div>}
        {actions && <div className="eui-alert-actions">{actions}</div>}
      </div>
      {onDismiss ? <IconButton className="eui-alert-dismiss" size="sm" label={dismissLabel} icon={<Icon name="x" />} onClick={onDismiss} /> : <span />}
    </div>
  );
}
