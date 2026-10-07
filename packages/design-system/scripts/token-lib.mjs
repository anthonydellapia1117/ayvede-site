// Shared token helpers: load tokens.json, resolve {path} references, flatten
// to CSS custom property names. Used by build-tokens.mjs and the tests.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
export const TOKENS_PATH = join(HERE, "..", "src", "tokens", "tokens.json");

export function loadTokens(path = TOKENS_PATH) {
  return JSON.parse(readFileSync(path, "utf8"));
}

// Flatten a nested object into [ [pathSegments], value ] pairs (leaf strings only).
export function flatten(obj, prefix = []) {
  const out = [];
  for (const [k, v] of Object.entries(obj)) {
    if (k.startsWith("$")) continue;
    if (v && typeof v === "object") out.push(...flatten(v, [...prefix, k]));
    else out.push([[...prefix, k], String(v)]);
  }
  return out;
}

const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

// CSS custom property name for a token path, e.g. ["color","text","primary"] -> --eui-color-text-primary
export function varName(prefix, segments) {
  return `--${prefix}-${segments.map(kebab).join("-")}`;
}

// Resolve a "{color.blue.600}" reference against the primitive tree. Returns
// { value, ref } where ref is the referenced primitive path or null.
export function resolveRef(value, primitives) {
  const m = /^\{([^}]+)\}$/.exec(value.trim());
  if (!m) return { value, ref: null };
  const path = m[1].split(".");
  let cur = primitives;
  for (const seg of path) {
    cur = cur?.[seg];
    if (cur === undefined) throw new Error(`Unresolved token reference ${value}`);
  }
  if (typeof cur === "object") throw new Error(`Reference ${value} points at a group, not a value`);
  return { value: String(cur), ref: path };
}

// Build the resolved semantic map for a theme: { "color.text.primary": "#161b22", ... }
export function resolveTheme(tokens, theme) {
  const out = {};
  for (const [segs, raw] of flatten(tokens.semantic[theme])) {
    out[segs.join(".")] = resolveRef(raw, tokens.primitive).value;
  }
  return out;
}
