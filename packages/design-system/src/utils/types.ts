import type { HTMLAttributes } from "react";

/** Spacing steps from the token scale (multiples of 4px). */
export type SpaceToken = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;

/** Control sizes shared by buttons and inputs. */
export type ControlSize = "sm" | "md" | "lg";

/** Semantic tones used by badges, alerts, and status text. */
export type StatusTone = "neutral" | "info" | "success" | "warning" | "danger";

/** Props shared by polymorphic box-like primitives. */
export interface BoxProps extends HTMLAttributes<HTMLElement> {
  /** Element to render. Defaults differ per component. */
  as?: "div" | "section" | "article" | "aside" | "header" | "footer" | "main" | "nav" | "ul" | "ol" | "li" | "span" | "p" | "figure";
}

export function spaceVar(step: SpaceToken | undefined): string | undefined {
  return step === undefined ? undefined : `var(--eui-space-${step})`;
}
