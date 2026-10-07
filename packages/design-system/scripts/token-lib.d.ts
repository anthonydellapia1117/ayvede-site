export const TOKENS_PATH: string;
export function loadTokens(path?: string): any;
export function flatten(obj: Record<string, unknown>, prefix?: string[]): Array<[string[], string]>;
export function varName(prefix: string, segments: string[]): string;
export function resolveRef(value: string, primitives: Record<string, unknown>): { value: string; ref: string[] | null };
export function resolveTheme(tokens: any, theme: string): Record<string, string>;
