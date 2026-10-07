import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { cx } from "../../utils/cx";
import { themeAttribute, type ThemeName } from "../../tokens/generated";

/** A theme request: an explicit theme, or follow the operating system. */
export type ThemeMode = ThemeName | "system";

export interface ThemeContextValue {
  /** The requested mode (may be "system"). */
  mode: ThemeMode;
  /** The theme actually applied ("light" or "dark"). */
  theme: ThemeName;
  /** Change the requested mode. */
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function systemTheme(): ThemeName {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export interface ThemeProviderProps {
  /** Initial mode. "system" follows prefers-color-scheme and updates live. Default "light". */
  mode?: ThemeMode;
  /** Called whenever the mode changes via setMode. */
  onModeChange?: (mode: ThemeMode) => void;
  /** Mirror the resolved theme onto <html data-theme> so portals and host styles match. Default false. */
  applyToDocument?: boolean;
  /** Stretch the root to at least the viewport height and paint the canvas color. Default false. */
  fillViewport?: boolean;
  className?: string;
  children?: ReactNode;
}

/**
 * Root of every executive-ui tree. Applies the font stack, canvas color, and
 * theme tokens to its subtree via a `data-theme` attribute. Nest a second
 * ThemeProvider to flip one region (for example, a dark summary band).
 */
export function ThemeProvider({ mode = "light", onModeChange, applyToDocument = false, fillViewport = false, className, children }: ThemeProviderProps) {
  const [requested, setRequested] = useState<ThemeMode>(mode);
  const [system, setSystem] = useState<ThemeName>(() => systemTheme());

  useEffect(() => setRequested(mode), [mode]);

  useEffect(() => {
    if (requested !== "system" || typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setSystem(mq.matches ? "dark" : "light");
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [requested]);

  const theme: ThemeName = requested === "system" ? system : requested;

  useEffect(() => {
    if (!applyToDocument || typeof document === "undefined") return;
    document.documentElement.setAttribute(themeAttribute, theme);
  }, [applyToDocument, theme]);

  const setMode = useCallback(
    (next: ThemeMode) => {
      setRequested(next);
      onModeChange?.(next);
    },
    [onModeChange],
  );

  const value = useMemo<ThemeContextValue>(() => ({ mode: requested, theme, setMode }), [requested, theme, setMode]);
  const attrs = { [themeAttribute]: theme } as Record<string, string>;

  return (
    <ThemeContext.Provider value={value}>
      <div className={cx("eui-root", className)} {...attrs} data-fill={fillViewport ? "viewport" : undefined}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

/** Read the active theme and switch modes. Must be used inside ThemeProvider. */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
