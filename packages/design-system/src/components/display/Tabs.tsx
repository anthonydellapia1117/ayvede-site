import { createContext, useCallback, useContext, useId, useMemo, useRef, useState, type HTMLAttributes, type KeyboardEvent, type ReactNode } from "react";
import { cx } from "../../utils/cx";

interface TabsContextValue {
  value: string;
  setValue: (v: string) => void;
  baseId: string;
}
const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs(component: string): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error(`${component} must be used inside <Tabs>`);
  return ctx;
}

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Controlled selected tab value. */
  value?: string;
  /** Initial tab for uncontrolled use. */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
}

/**
 * Accessible tabs: roving focus, arrow keys, Home and End. Compose with
 * TabList, Tab, and TabPanel. Values are strings you choose.
 */
export function Tabs({ value, defaultValue, onValueChange, className, children, ...rest }: TabsProps) {
  const [inner, setInner] = useState(defaultValue ?? "");
  const current = value ?? inner;
  const baseId = useId();
  const setValue = useCallback(
    (v: string) => {
      if (value === undefined) setInner(v);
      onValueChange?.(v);
    },
    [value, onValueChange],
  );
  const ctx = useMemo(() => ({ value: current, setValue, baseId }), [current, setValue, baseId]);
  return (
    <TabsContext.Provider value={ctx}>
      <div className={cx("eui-tabs", className)} {...rest}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export interface TabListProps extends HTMLAttributes<HTMLDivElement> {
  /** Accessible name for the set of tabs. Required. */
  label: string;
  children: ReactNode;
}

/** The row of Tab triggers. */
export function TabList({ label, className, children, ...rest }: TabListProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const { setValue } = useTabs("TabList");
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const tabs = Array.from(listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)') ?? []);
    if (!tabs.length) return;
    const idx = tabs.findIndex((t) => t === document.activeElement);
    let next = -1;
    if (e.key === "ArrowRight") next = (idx + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (idx - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    if (next < 0) return;
    e.preventDefault();
    const target = tabs[next];
    if (!target) return;
    target.focus();
    const v = target.dataset.value;
    if (v !== undefined) setValue(v);
  };
  return (
    <div ref={listRef} role="tablist" aria-label={label} className={cx("eui-tablist", className)} onKeyDown={onKeyDown} {...rest}>
      {children}
    </div>
  );
}

export interface TabProps extends HTMLAttributes<HTMLButtonElement> {
  /** Matches the TabPanel with the same value. */
  value: string;
  disabled?: boolean;
  children: ReactNode;
}

/** A tab trigger. */
export function Tab({ value, disabled, className, children, ...rest }: TabProps) {
  const ctx = useTabs("Tab");
  const selected = ctx.value === value;
  return (
    <button
      type="button"
      role="tab"
      id={`${ctx.baseId}-tab-${value}`}
      aria-selected={selected}
      aria-controls={`${ctx.baseId}-panel-${value}`}
      tabIndex={selected ? 0 : -1}
      data-value={value}
      disabled={disabled}
      className={cx("eui-tab", className)}
      onClick={() => ctx.setValue(value)}
      {...rest}
    >
      {children}
    </button>
  );
}

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  /** Keep the panel mounted when inactive (hidden) instead of unmounting. Default false. */
  keepMounted?: boolean;
  children: ReactNode;
}

/** Content for one tab. Only the selected panel renders unless keepMounted is set. */
export function TabPanel({ value, keepMounted = false, className, children, ...rest }: TabPanelProps) {
  const ctx = useTabs("TabPanel");
  const selected = ctx.value === value;
  if (!selected && !keepMounted) return null;
  return (
    <div role="tabpanel" id={`${ctx.baseId}-panel-${value}`} aria-labelledby={`${ctx.baseId}-tab-${value}`} tabIndex={0} hidden={!selected} className={cx("eui-tabpanel", className)} {...rest}>
      {children}
    </div>
  );
}
