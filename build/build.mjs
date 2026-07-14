#!/usr/bin/env node
// Build the single self-contained Ayvede artifact from src/ayvede-v2.jsx.
//
// This is the proven method, ported verbatim from the original site-build/build.py:
//   - splice the untouched source body (imports dropped, export keyword dropped,
//     in-component <style>{CSS}</style> dropped; CSS moves verbatim to <head>)
//   - prepend inline lucide icon components (build/header.jsx) and the generated
//     insights data module (build/insights-data.js)
//   - transpile JSX with esbuild 0.24.2 (pinned; a different esbuild version can
//     change output bytes and break sha256 parity with the live bundle)
//   - emit dist/app-embed.js (CSS self-injecting variant used by the Wix
//     custom-embed deployment) and dist/index.html (local preview artifact)
//
// Usage:  npm run build
// Every structural assumption is asserted so silent source drift fails loudly.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const SRC = join(ROOT, "src", "ayvede-v2.jsx");
const SCRATCH = join(HERE, ".scratch");
const DIST = join(ROOT, "dist");
const ESBUILD = join(ROOT, "node_modules", ".bin", "esbuild");

function assert(cond, msg) {
  if (!cond) {
    console.error("ASSERTION FAILED: " + msg);
    process.exit(1);
  }
}

const src = readFileSync(SRC, "utf8");
const lines = src.split(/(?<=\n)/);

assert(lines[0].startsWith('import React, { useState, useEffect } from "react";'), lines[0]);
assert(lines[1].startsWith("import {"), lines[1]);
assert(lines[4].startsWith('} from "lucide-react";'), lines[4]);

let body = lines.slice(5).join("");
assert(body.split("export default function AyvedeSite()").length - 1 === 1, "exactly one default export");
body = body.replace("export default function AyvedeSite()", "function AyvedeSite()");

assert(body.split("<style>{CSS}</style>").length - 1 === 1, "exactly one <style>{CSS}</style>");
body = body.split(/(?<=\n)/).filter((l) => !l.includes("<style>{CSS}</style>")).join("");

const header = readFileSync(join(HERE, "header.jsx"), "utf8");
const insights = readFileSync(join(HERE, "insights-data.js"), "utf8");
const bootstrap = '\nReactDOM.createRoot(document.getElementById("root")).render(React.createElement(AyvedeSite));\n';

mkdirSync(SCRATCH, { recursive: true });
mkdirSync(DIST, { recursive: true });

const appJsx = join(SCRATCH, "app.jsx");
writeFileSync(appJsx, header + "\n" + insights + "\n" + body + bootstrap);
console.log("app.jsx written to build/.scratch/");

// Exact CLI invocation from the proven method. Do not add flags.
execFileSync(ESBUILD, [appJsx, "--loader:.jsx=jsx", "--outfile=" + join(SCRATCH, "app.js"), "--charset=utf8"], { stdio: "inherit" });

// CSS extracted byte-for-byte from the template literal
const cssStart = src.indexOf("const CSS = `") + "const CSS = `".length;
const css = src.slice(cssStart, src.indexOf("`;", cssStart));
assert(css.startsWith("\n@import"), "CSS extraction anchor");

const js = readFileSync(join(SCRATCH, "app.js"), "utf8");
assert(!js.toLowerCase().includes("</script"), "transpiled JS contains </script>");

// app-embed.js: the Wix deployment variant; injects the CSS const itself
const render = 'ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(AyvedeSite));';
assert(js.split(render).length - 1 === 1, "exactly one render call");
const inject = '(function(){var st=document.createElement("style");st.textContent=CSS;document.head.appendChild(st);})();\n';
const embed = js.replace(render, inject + render);
writeFileSync(join(DIST, "app-embed.js"), embed);

const html =
  "<!DOCTYPE html>\n" +
  '<html lang="en">\n' +
  "<head>\n" +
  '<meta charset="utf-8">\n' +
  '<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
  "<title>Ayvede — The AI Source of Truth for High-Trust Firms</title>\n" +
  '<link rel="preconnect" href="https://fonts.googleapis.com">\n' +
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
  '<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">\n' +
  "<style>html,body{margin:0;padding:0;background:#0b1120}</style>\n" +
  "<style>" + css + "</style>\n" +
  "</head>\n" +
  "<body>\n" +
  '<div id="root"></div>\n' +
  '<script src="https://unpkg.com/react@18.3.1/umd/react.production.min.js" crossorigin></script>\n' +
  '<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js" crossorigin></script>\n' +
  "<script>\n" + js + "</script>\n" +
  "</body>\n" +
  "</html>\n";
writeFileSync(join(DIST, "index.html"), html);

const sha = createHash("sha256").update(readFileSync(join(DIST, "app-embed.js"))).digest("hex");
console.log("dist/app-embed.js: " + Buffer.byteLength(embed, "utf8") + " bytes");
console.log("dist/index.html:   " + Buffer.byteLength(html, "utf8") + " bytes");
console.log("sha256(app-embed.js) = " + sha);
console.log("Compare against the CHANGELOG entry for the version you expect to have built.");
