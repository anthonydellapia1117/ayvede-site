#!/usr/bin/env node
// Bundles preview/index.tsx into a self-contained preview/dist/index.html
// (React inlined, stylesheet inlined, fonts copied alongside). No network needed.
import { build } from "esbuild";
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");
const OUT = join(ROOT, "preview", "dist");
const styles = join(ROOT, "dist", "styles.css");
if (!existsSync(styles)) {
  console.error("dist/styles.css missing. Run `npm run build` first.");
  process.exit(1);
}
mkdirSync(OUT, { recursive: true });

const result = await build({
  entryPoints: [join(ROOT, "preview", "index.tsx")],
  bundle: true,
  write: false,
  format: "iife",
  platform: "browser",
  target: ["es2020"],
  jsx: "automatic",
  minify: true,
  define: { "process.env.NODE_ENV": '"production"' },
  logLevel: "warning",
});
const js = result.outputFiles[0].text;
if (js.toLowerCase().includes("</script")) throw new Error("bundle contains </script>");
const css = readFileSync(styles, "utf8");
const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>executive-ui preview</title>
<style>html,body{margin:0;padding:0}</style>
<style>${css}</style>
</head>
<body>
<div id="root"></div>
<script>${js}</script>
</body>
</html>
`;
writeFileSync(join(OUT, "index.html"), html);
cpSync(join(ROOT, "dist", "fonts"), join(OUT, "fonts"), { recursive: true });
console.log(`preview: wrote preview/dist/index.html (${(Buffer.byteLength(html) / 1024).toFixed(0)} KB) + fonts/`);
