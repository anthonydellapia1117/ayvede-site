import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";
import { Icon, type IconName } from "../foundations/Icon";
import { Spinner } from "./Spinner";

export type StateKind = "empty" | "loading" | "error" | "success";

export interface StatePanelProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  kind: StateKind;
  title: ReactNode;
  description?: ReactNode;
  /** Buttons or links that resolve the state (retry, create, go back). */
  actions?: ReactNode;
  /** Override the default glyph. Ignored for "loading". */
  icon?: IconName;
  /** Draw the dashed/solid frame. Default true. */
  frame?: boolean;
}

const glyph: Record<StateKind, IconName> = { empty: "inbox", loading: "clock", error: "xCircle", success: "checkCircle" };

/**
 * Empty, loading, error, and success states for a region. Error announces
 * via role="alert"; loading sets aria-busy so readers know content is coming.
 */
export function StatePanel({ kind, title, description, actions, icon, frame = true, className, ...rest }: StatePanelProps) {
  const role = kind === "error" ? "alert" : kind === "success" || kind === "loading" ? "status" : undefined;
  return (
    <div role={role} aria-busy={kind === "loading" || undefined} className={cx("eui-state", className)} data-kind={kind} data-frame={frame ? "true" : "false"} {...rest}>
      {kind === "loading" ? <Spinner size="lg" label="" /> : <Icon name={icon ?? glyph[kind]} />}
      <div className="eui-state-title">{title}</div>
      {description && <div className="eui-state-description">{description}</div>}
      {actions && <div className="eui-state-actions">{actions}</div>}
    </div>
  );
}
