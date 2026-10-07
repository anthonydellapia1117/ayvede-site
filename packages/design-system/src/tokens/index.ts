import { primitiveVars, semanticVars, tokenPrefix, type PrimitiveTokenPath, type SemanticTokenPath } from "./generated";

export { primitive, semantic, semanticVars, primitiveVars, themes, themeAttribute, tokenPrefix } from "./generated";
export type { ThemeName, SemanticTokenPath, PrimitiveTokenPath } from "./generated";

/**
 * CSS `var()` expression for a semantic token, for inline styles and CSS-in-JS.
 * @example cssVar("color.text.secondary") // "var(--eui-color-text-secondary)"
 */
export function cssVar(path: SemanticTokenPath): string {
  return `var(${semanticVars[path]})`;
}

/** CSS `var()` expression for a primitive token (spacing, radius, font sizes). */
export function primitiveVar(path: PrimitiveTokenPath): string {
  return `var(${primitiveVars[path]})`;
}

/** Spacing step to a CSS variable, e.g. space(4) -> "var(--eui-space-4)". */
export function space(step: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24): string {
  return `var(--${tokenPrefix}-space-${step})`;
}
