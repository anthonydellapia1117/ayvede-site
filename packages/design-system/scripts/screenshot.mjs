#!/usr/bin/env node
// Visual + accessibility check of the built preview.
//   node scripts/screenshot.mjs            -> screenshots/*.png and screenshots/axe-*.json
// Requires playwright (any install: local devDependency, or a global install).
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { execSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");
const DIST = join(ROOT, "preview", "dist");
const OUT = join(ROOT, "screenshots");
const require = createRequire(import.meta.url);

function loadPlaywright() {
  const candidates = ["playwright", "playwright-core"];
  try {
    candidates.push(join(execSync("npm root -g", { encoding: "utf8" }).trim(), "playwright"));
  } catch {}
  for (const c of candidates) {
    try {
      return require(c);
    } catch {}
  }
  throw new Error("playwright not found. `npm i -D playwright` (and `npx playwright install chromium`) or install it globally.");
}

if (!existsSync(join(DIST, "index.html"))) {
  console.error("preview/dist/index.html missing. Run `npm run build && npm run build:preview` first.");
  process.exit(1);
}
mkdirSync(OUT, { recursive: true });

const types = { ".html": "text/html", ".woff2": "font/woff2", ".css": "text/css", ".js": "text/javascript", ".json": "application/json" };
const server = createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");
  const path = join(DIST, url.pathname === "/" ? "index.html" : url.pathname);
  if (!path.startsWith(DIST) || !existsSync(path)) {
    res.writeHead(404);
    res.end();
    return;
  }
  res.writeHead(200, { "content-type": types[extname(path)] ?? "application/octet-stream" });
  res.end(readFileSync(path));
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;

const { chromium } = loadPlaywright();
const browser = await chromium.launch();
const widths = [320, 768, 1280, 1680];
const themes = ["light", "dark"];
const axeSource = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
const summary = [];
let totalViolations = 0;

for (const theme of themes) {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    await page.goto(`${base}/?theme=${theme}`, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    const file = join(OUT, `${theme}-${width}.png`);
    await page.screenshot({ path: file, fullPage: true });
    const line = { theme, width, overflowPx: overflow, pageErrors: errors.length, file };
    if (width === 1280 || width === 320) {
      // Per-section crops at desktop and phone width for review.
      for (const id of await page.$$eval("section[id]", (els) => els.map((e) => e.id))) {
        const el = await page.$(`#${id}`);
        if (el) await el.screenshot({ path: join(OUT, `${theme}-${width}-section-${id}.png`) });
      }
    }
    if (width === 1280) {
      // axe-core on the full page.
      await page.addScriptTag({ content: axeSource });
      const results = await page.evaluate(async () => {
        const r = await window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"] } });
        return { violations: r.violations.map((v) => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.map((n) => n.target.join(" ")).slice(0, 8), count: v.nodes.length })), passes: r.passes.length, incomplete: r.incomplete.map((v) => ({ id: v.id, count: v.nodes.length })) };
      });
      writeFileSync(join(OUT, `axe-${theme}.json`), JSON.stringify(results, null, 2));
      line.axeViolations = results.violations.length;
      line.axePasses = results.passes;
      totalViolations += results.violations.length;
      for (const v of results.violations) console.log(`  axe ${theme}: [${v.impact}] ${v.id} x${v.count} - ${v.help}\n      ${v.nodes.join("\n      ")}`);
    }
    summary.push(line);
    console.log(`${theme} @${width}px: overflow ${overflow}px, page errors ${errors.length}${line.axeViolations !== undefined ? `, axe violations ${line.axeViolations} (passes ${line.axePasses})` : ""}`);
    await page.close();
  }
}
await browser.close();
server.close();
writeFileSync(join(OUT, "summary.json"), JSON.stringify(summary, null, 2));
const bad = summary.filter((s) => s.overflowPx > 0 || s.pageErrors > 0);
if (bad.length || totalViolations) {
  console.error(`FAIL: ${bad.length} viewport(s) with overflow/errors, ${totalViolations} axe violation(s)`);
  process.exit(1);
}
console.log("OK: no horizontal overflow, no page errors, no axe violations");
