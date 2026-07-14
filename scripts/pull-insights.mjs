#!/usr/bin/env node
/**
 * pull-insights.mjs — turn exported "AI, Properly" newsletter Docs into the
 * bundled Insights data module the Ayvede site bakes in at build time.
 *
 * Input:  docs-raw/*.md — one file per Google Doc, exported text verbatim.
 *         File name = the Doc's name ("YYYYMMDD - Title.md").
 *         Optional first line: <!-- doc_id: ... --> (stable id from Drive).
 *         (The Drive fetch itself is done read-only via the Google Drive
 *         connector — see the /ayvede-insights-refresh command. This script
 *         never talks to Drive and never modifies anything in Drive.)
 *
 * Output: site-build/insights-data.js  (const INSIGHTS_DATA = [...])
 *         site-build/last-pull-report.json — what was pulled/flagged
 *
 * No images. Cards render an on-brand geometric motif generated client-side
 * from the slug (see the site's CardMotif component). The Doc's PHOTO
 * DIRECTION field is parsed only so it can't bleed into the body, then
 * discarded. No image sourcing, no network calls, no API key — a weekly run
 * never touches photos and never errors on a missing key.
 *
 * Idempotent: the data module is regenerated wholesale from docs-raw on every
 * run — new Docs appear, edited Docs update, nothing duplicates.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const RAW = path.join(ROOT, "docs-raw");
const BUILD = path.join(ROOT, "site-build");
const OUT = path.join(BUILD, "insights-data.js");
const REPORT = path.join(BUILD, "last-pull-report.json");

const CATEGORIES = ["Data Governance", "ERP", "Legal", "Healthcare", "Finance", "General AI News"];
// PHOTO DIRECTION stays in the label set so its block is treated as a field
// boundary (never merged into the body), even though it is discarded.
const LABELS = ["TITLE", "TEASER", "CATEGORY", "PHOTO DIRECTION", "DATE", "ARTICLE"];

function extractFields(text) {
  const re = new RegExp("^(" + LABELS.join("|") + "):", "gm");
  let marks = [];
  let m;
  while ((m = re.exec(text))) marks.push({ label: m[1], start: m.index, contentStart: m.index + m[0].length });
  // Fields must appear before the body. Any label-shaped line at or after the
  // first ARTICLE mark is article CONTENT, never a field or a field boundary —
  // otherwise an embedded "DATE: ..." sentence would truncate the body or
  // hijack a missing field. First occurrence wins for pre-ARTICLE duplicates.
  const art = marks.find((mk) => mk.label === "ARTICLE");
  const seen = new Set();
  marks = marks.filter((mk) => {
    if (art && mk.start > art.start) return false;
    if (seen.has(mk.label)) return false;
    seen.add(mk.label);
    return true;
  });
  const fields = {};
  marks.forEach((mk, i) => {
    const end = mk.label === "ARTICLE" ? text.length : i + 1 < marks.length ? marks[i + 1].start : text.length;
    fields[mk.label] = text.slice(mk.contentStart, end).trim();
  });
  return fields;
}

/** Strict calendar validation — "2026-99-41" must not pass. */
function validDate(s) {
  const m = s && s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  const [y, mo, d] = [+m[1], +m[2], +m[3]];
  const dt = new Date(Date.UTC(y, mo - 1, d));
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === mo - 1 && dt.getUTCDate() === d ? s : null;
}

const slugify = (t) =>
  t.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

function main() {
  const report = { pulledFiles: 0, cards: 0, flaggedMalformed: [], warnings: [] };
  const items = [];

  const files = existsSync(RAW) ? readdirSync(RAW).filter((f) => /\.(md|txt)$/i.test(f)) : [];
  report.pulledFiles = files.length;

  for (const f of files) {
    const rawText = readFileSync(path.join(RAW, f), "utf8");
    const idMatch = rawText.match(/^<!--\s*doc_id:\s*(\S+)\s*-->/);
    const text = rawText.replace(/^<!--[^>]*-->\s*/, "");
    const fields = extractFields(text);
    const missing = ["TITLE", "TEASER", "CATEGORY", "DATE", "ARTICLE"].filter((l) => !fields[l]);
    if (missing.length) {
      report.flaggedMalformed.push({ file: f, reason: "missing field(s): " + missing.join(", ") });
      continue;
    }
    // Authors separate a primary/secondary category with either a comma or a
    // middle-dot ("General AI News · Data Governance"); accept both.
    const cats = fields.CATEGORY.split(/[,·•‧]/).map((s) => s.trim()).filter(Boolean);
    const norm = (c) => CATEGORIES.find((k) => k.toLowerCase() === c.toLowerCase());
    const primary = norm(cats[0] || "");
    if (!primary) {
      report.flaggedMalformed.push({ file: f, reason: `primary category "${cats[0]}" not in closed set` });
      continue;
    }
    const secondary = cats[1] ? norm(cats[1]) : null;
    if (cats[1] && !secondary) report.warnings.push(`${f}: secondary category "${cats[1]}" not in closed set — dropped`);
    let date = validDate(fields.DATE.match(/\d{4}-\d{2}-\d{2}/)?.[0]);
    if (!date) {
      const fromName = f.match(/^(\d{4})(\d{2})(\d{2})/);
      if (fromName) date = validDate(`${fromName[1]}-${fromName[2]}-${fromName[3]}`);
    }
    if (!date) {
      report.flaggedMalformed.push({ file: f, reason: "no valid calendar DATE (YYYY-MM-DD) in field or filename" });
      continue;
    }
    const title = fields.TITLE.replace(/\s+/g, " ").trim();
    // Google's markdown export escapes formatting chars; unescape so the
    // in-app reader renders **bold** etc. as intended.
    const body = fields.ARTICLE.replace(/\\([*_[\]()#|.\-+])/g, "$1").trim();
    items.push({
      id: idMatch ? idMatch[1] : slugify(f.replace(/\.(md|txt)$/i, "")),
      slug: slugify(title),
      title,
      teaser: fields.TEASER.replace(/\s+/g, " ").trim(),
      category: primary,
      secondaryCategory: secondary,
      date,
      body,
    });
  }

  // Slugs must be unique — they key the reader route, the card motif seed, and
  // React keys. Duplicate titles get a stable -2/-3 suffix (numbered in
  // date-then-id order so re-runs assign the same suffixes).
  const slugCounts = new Map();
  for (const it of [...items].sort((a, b) => ((a.date + a.id) < (b.date + b.id) ? -1 : 1))) {
    const base = it.slug || "briefing";
    const n = (slugCounts.get(base) || 0) + 1;
    slugCounts.set(base, n);
    if (n > 1) {
      it.slug = `${base}-${n}`;
      report.warnings.push(`duplicate title slug "${base}" — assigned "${it.slug}"`);
    }
  }

  items.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  report.cards = items.length;

  let module_ = "// GENERATED by scripts/pull-insights.mjs — do not edit by hand.\n" +
    "// Regenerate: node scripts/pull-insights.mjs && python3 site-build/build.py html\n" +
    "const INSIGHTS_DATA = " + JSON.stringify(items, null, 2) + ";\n";
  module_ = module_.replace(/<\/script/gi, "<\\/script");
  writeFileSync(OUT, module_);
  writeFileSync(REPORT, JSON.stringify(report, null, 2));

  console.log(`docs-raw files: ${report.pulledFiles}`);
  console.log(`cards generated: ${report.cards}`);
  for (const m of report.flaggedMalformed) console.log(`  MALFORMED    ${m.file}: ${m.reason}`);
  for (const w of report.warnings) console.log(`  WARN         ${w}`);
  console.log(`wrote ${OUT}`);
}

main();
