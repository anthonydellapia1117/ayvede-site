import { describe, it, expect } from "vitest";
import { execFileSync } from "node:child_process";
import { loadTokens, resolveTheme } from "../scripts/token-lib.mjs";
import { contrast } from "./contrast";

const tokens = loadTokens();
const themes = tokens.meta.themes as string[];

// Every pair the system relies on. fg/bg are semantic paths; min is the WCAG 2.2 AA floor.
const TEXT_MIN = 4.5;
const UI_MIN = 3;

const readingSurfaces = ["color.background.canvas", "color.background.surface", "color.background.subtle", "color.background.raised"];
const textRoles = ["color.text.primary", "color.text.secondary", "color.text.tertiary", "color.text.link"];
const statuses = ["success", "warning", "danger", "info", "neutral"];

function pairs(): Array<{ fg: string; bg: string; min: number; why: string }> {
  const out: Array<{ fg: string; bg: string; min: number; why: string }> = [];
  for (const fg of textRoles) for (const bg of readingSurfaces) out.push({ fg, bg, min: TEXT_MIN, why: "body text on reading surfaces" });
  for (const bg of ["color.action.primary", "color.action.primaryHover", "color.action.primaryActive"]) out.push({ fg: "color.text.onAction", bg, min: TEXT_MIN, why: "primary button label" });
  for (const bg of ["color.action.secondary", "color.action.secondaryHover", "color.action.secondaryActive"]) out.push({ fg: "color.text.inverse", bg, min: TEXT_MIN, why: "secondary (solid) button label" });
  out.push({ fg: "color.text.inverse", bg: "color.background.inverse", min: TEXT_MIN, why: "inverse panel text" });
  out.push({ fg: "color.text.inverseSecondary", bg: "color.background.inverse", min: TEXT_MIN, why: "inverse panel secondary text" });
  out.push({ fg: "color.text.inverseTertiary", bg: "color.background.inverse", min: TEXT_MIN, why: "inverse panel tertiary text" });
  out.push({ fg: "color.border.inverse", bg: "color.background.inverse", min: 1.2, why: "inverse panel hairline is visible (decorative, sanity check only)" });
  out.push({ fg: "color.text.onDanger", bg: "color.status.danger", min: TEXT_MIN, why: "danger (solid) button label" });
  for (const bg of ["color.action.subtle", "color.action.subtleHover", "color.action.selected"]) out.push({ fg: "color.text.primary", bg, min: TEXT_MIN, why: "text on subtle/selected fills" });
  for (const s of statuses) {
    out.push({ fg: `color.status.${s}`, bg: `color.status.${s}Surface`, min: TEXT_MIN, why: `${s} alert text on its surface` });
    out.push({ fg: `color.status.${s}`, bg: "color.background.surface", min: TEXT_MIN, why: `${s} inline status text on surface` });
    out.push({ fg: `color.status.${s}`, bg: "color.background.canvas", min: TEXT_MIN, why: `${s} inline status text on canvas` });
    out.push({ fg: "color.text.primary", bg: `color.status.${s}Surface`, min: TEXT_MIN, why: `${s} alert body copy` });
    out.push({ fg: `color.status.${s}`, bg: `color.status.${s}Surface`, min: UI_MIN, why: `${s} status icon on its surface` });
  }
  for (const bg of ["color.background.surface", "color.background.canvas"]) {
    out.push({ fg: "color.border.strong", bg, min: UI_MIN, why: "input border (non-text contrast)" });
    out.push({ fg: "color.action.primary", bg, min: UI_MIN, why: "primary button boundary" });
    out.push({ fg: "color.focus.ring", bg, min: UI_MIN, why: "focus ring" });
    out.push({ fg: "color.action.selectedStrong", bg, min: UI_MIN, why: "selected indicator (tab underline, switch on)" });
    for (const i of [1, 2, 3, 4]) out.push({ fg: `color.data.${i}`, bg, min: UI_MIN, why: `chart series ${i}` });
  }
  return out;
}

describe("token contrast (WCAG 2.2 AA)", () => {
  for (const theme of themes) {
    const t = resolveTheme(tokens, theme) as Record<string, string>;
    describe(theme, () => {
      for (const p of pairs()) {
        it(`${p.fg} on ${p.bg} >= ${p.min}:1 (${p.why})`, () => {
          const fg = t[p.fg];
          const bg = t[p.bg];
          expect(fg, `missing ${p.fg}`).toMatch(/^#/);
          expect(bg, `missing ${p.bg}`).toMatch(/^#/);
          const ratio = contrast(fg ?? "", bg ?? "");
          expect(ratio, `${theme}: ${p.fg} (${fg}) on ${p.bg} (${bg}) = ${ratio.toFixed(2)}`).toBeGreaterThanOrEqual(p.min);
        });
      }
    });
  }
});

describe("token integrity", () => {
  it("every theme defines the same semantic roles", () => {
    const keys = themes.map((th) => Object.keys(resolveTheme(tokens, th)).sort().join("\n"));
    for (const k of keys) expect(k).toBe(keys[0] ?? "");
  });
  it("generated.ts is up to date with tokens.json", () => {
    expect(() => execFileSync("node", ["scripts/build-tokens.mjs", "--check"], { stdio: "pipe" })).not.toThrow();
  });
});
