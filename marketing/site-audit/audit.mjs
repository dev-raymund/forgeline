#!/usr/bin/env node
// Forgeline site-audit — automated website "teardown" for outreach.
// Usage: node audit.mjs <url>
// Point it at a prospect's site; it produces a markdown report + desktop/mobile
// screenshots with the "3 quick wins" you can read straight into a teardown video.

import { chromium, devices } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

// ---------- args ----------
const rawUrl = process.argv[2];
if (!rawUrl) {
  console.error("Usage: node audit.mjs <url>\n  e.g. node audit.mjs example.com");
  process.exit(1);
}
// Normalize: allow bare "example.com"
const url = /^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`;
let hostname;
try {
  hostname = new URL(url).hostname;
} catch {
  console.error(`Not a valid URL: ${rawUrl}`);
  process.exit(1);
}

const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
const outDir = path.join("reports", `${hostname}-${stamp}`);

// ---------- helpers ----------
const findings = []; // { severity: 'high'|'med'|'low', title, detail }
const add = (severity, title, detail) => findings.push({ severity, title, detail });
const sevRank = { high: 0, med: 1, low: 2 };
const sevIcon = { high: "🔴", med: "🟠", low: "🟡" };

async function main() {
  await mkdir(outDir, { recursive: true });
  const browser = await chromium.launch();

  // ---------- DESKTOP PASS ----------
  const desktop = await browser.newContext({
    viewport: { width: 1366, height: 900 },
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
      "(KHTML, like Gecko) Chrome/125.0 Safari/537.36 ForgelineSiteAudit/1.0",
  });
  const page = await desktop.newPage();

  const failedResources = [];
  const consoleErrors = [];
  page.on("response", (res) => {
    const s = res.status();
    if (s >= 400) failedResources.push({ url: res.url(), status: s });
  });
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => consoleErrors.push(String(err)));

  const t0 = Date.now();
  let loadOk = true;
  let httpStatus = null;
  try {
    const resp = await page.goto(url, { waitUntil: "load", timeout: 45000 });
    httpStatus = resp ? resp.status() : null;
  } catch (err) {
    loadOk = false;
    add("high", "Page failed to load", `Could not load the page: ${err.message}`);
  }
  const loadMs = Date.now() - t0;

  if (loadOk) {
    // Navigation timing from the browser itself
    const timing = await page.evaluate(() => {
      const nav = performance.getEntriesByType("navigation")[0];
      if (!nav) return null;
      return {
        ttfb: Math.round(nav.responseStart),
        domContentLoaded: Math.round(nav.domContentLoadedEventEnd),
        load: Math.round(nav.loadEventEnd),
      };
    });

    // Page metadata + on-page signals
    const meta = await page.evaluate(() => {
      const q = (sel) => document.querySelector(sel);
      const desc = q('meta[name="description"]');
      return {
        title: document.title || "",
        description: desc ? desc.getAttribute("content") || "" : null,
        hasViewport: !!q('meta[name="viewport"]'),
        h1Count: document.querySelectorAll("h1").length,
        hasFavicon: !!q('link[rel~="icon"]'),
        lang: document.documentElement.getAttribute("lang") || null,
        imgCount: document.images.length,
        brokenImages: Array.from(document.images)
          .filter((img) => img.complete && img.naturalWidth === 0)
          .map((img) => img.currentSrc || img.src),
      };
    });

    // ---- Screenshots ----
    await page.screenshot({
      path: path.join(outDir, "desktop.png"),
      fullPage: true,
    });

    // ---- Findings: performance ----
    const secs = (loadMs / 1000).toFixed(1);
    if (loadMs > 4000) {
      add("high", `Slow load — ${secs}s`, `Full load took ~${secs}s. Anything over ~4s bleeds visitors before your offer is even on screen. Aim for under 2.5s.`);
    } else if (loadMs > 2500) {
      add("med", `Load could be faster — ${secs}s`, `Full load took ~${secs}s. Trimming images/scripts to get under 2.5s tightens conversion.`);
    }
    if (timing && timing.ttfb > 800) {
      add("med", `Slow server response (TTFB ${timing.ttfb}ms)`, `Time-to-first-byte is ${timing.ttfb}ms — a slow host or backend. Under 500ms is healthy.`);
    }

    // ---- Findings: HTTPS ----
    if (new URL(page.url()).protocol !== "https:") {
      add("high", "Not served over HTTPS", "The site isn't on HTTPS — browsers flag it as 'Not secure', which kills trust and hurts SEO.");
    }

    // ---- Findings: SEO / meta ----
    if (!meta.title) {
      add("high", "Missing page title", "No <title> — this is the clickable headline in Google results. A blank title tanks search visibility.");
    } else if (meta.title.length > 65) {
      add("low", "Title tag is long", `Title is ${meta.title.length} chars; Google truncates around 60. Tighten it.`);
    }
    if (meta.description === null) {
      add("med", "No meta description", "There's no meta description — Google shows a random snippet instead of your pitch. Add a 1–2 sentence summary.");
    } else if (meta.description.trim().length < 50) {
      add("low", "Thin meta description", `Meta description is only ${meta.description.trim().length} chars. 120–160 is the sweet spot.`);
    }
    if (meta.h1Count === 0) {
      add("med", "No H1 heading", "No <h1> on the page — search engines and screen readers use it to understand the page's main topic.");
    } else if (meta.h1Count > 1) {
      add("low", `Multiple H1s (${meta.h1Count})`, "More than one <h1> muddies the page's main message. Use exactly one.");
    }
    if (!meta.hasFavicon) {
      add("low", "No favicon", "No favicon — the little browser-tab icon. Small thing, but its absence reads as unfinished.");
    }
    if (!meta.lang) {
      add("low", "No lang attribute", "The <html> tag has no lang attribute — a minor accessibility/SEO miss.");
    }

    // ---- Findings: mobile viewport meta ----
    if (!meta.hasViewport) {
      add("high", "Not mobile-optimized (no viewport tag)", "There's no responsive viewport meta tag, so the site won't scale on phones — where most of your visitors are. This is usually the single most visible problem.");
    }

    // ---- Findings: broken images / resources ----
    if (meta.brokenImages.length) {
      add("high", `${meta.brokenImages.length} broken image(s)`, "Images that failed to render:\n" + meta.brokenImages.slice(0, 8).map((s) => `  - ${s}`).join("\n"));
    }
    if (failedResources.length) {
      const uniq = [...new Map(failedResources.map((r) => [r.url, r])).values()];
      add("med", `${uniq.length} failed request(s)`, "Resources returning errors (broken assets/links):\n" + uniq.slice(0, 8).map((r) => `  - [${r.status}] ${r.url}`).join("\n"));
    }
    if (consoleErrors.length) {
      const uniq = [...new Set(consoleErrors)];
      add("low", `${uniq.length} JavaScript console error(s)`, "The page throws JS errors — often a sign of a half-broken feature:\n" + uniq.slice(0, 5).map((e) => `  - ${e.slice(0, 160)}`).join("\n"));
    }

    // ---------- MOBILE PASS ----------
    const mobileCtx = await browser.newContext({ ...devices["iPhone 13"] });
    const mPage = await mobileCtx.newPage();
    try {
      await mPage.goto(url, { waitUntil: "load", timeout: 45000 });
      const overflow = await mPage.evaluate(() => {
        const docW = document.documentElement.scrollWidth;
        const winW = window.innerWidth;
        return { docW, winW, overflow: docW - winW };
      });
      await mPage.screenshot({ path: path.join(outDir, "mobile.png"), fullPage: true });
      if (overflow.overflow > 8) {
        add("high", "Horizontal scroll on mobile", `On a phone the content is ${overflow.overflow}px wider than the screen, forcing sideways scrolling — a classic 'not built for mobile' tell.`);
      }
    } catch (err) {
      add("med", "Mobile render check failed", `Couldn't complete the mobile pass: ${err.message}`);
    }
    await mobileCtx.close();

    // ---- write report ----
    await writeReport({ url, httpStatus, loadMs, timing, meta });
  } else {
    await writeReport({ url, httpStatus, loadMs, timing: null, meta: null });
  }

  await desktop.close();
  await browser.close();

  // ---- console summary ----
  findings.sort((a, b) => sevRank[a.severity] - sevRank[b.severity]);
  console.log(`\n📋 Audit complete for ${url}`);
  console.log(`   Report: ${path.join(outDir, "report.md")}`);
  console.log(`   Screenshots: desktop.png, mobile.png in the same folder\n`);
  if (findings.length === 0) {
    console.log("   ✅ No obvious issues found — this one's in good shape.");
  } else {
    console.log("   Top things to mention in the teardown:");
    findings.slice(0, 5).forEach((f) => console.log(`   ${sevIcon[f.severity]} ${f.title}`));
  }
  console.log("");
}

async function writeReport({ url, httpStatus, loadMs, timing, meta }) {
  findings.sort((a, b) => sevRank[a.severity] - sevRank[b.severity]);
  const top3 = findings.slice(0, 3);
  const secs = (loadMs / 1000).toFixed(1);

  let md = `# Website teardown — ${new URL(url).hostname}\n\n`;
  md += `- **URL:** ${url}\n`;
  md += `- **Audited:** ${new Date().toLocaleString()}\n`;
  md += `- **HTTP status:** ${httpStatus ?? "n/a"}\n`;
  md += `- **Full load time:** ${secs}s\n`;
  if (timing) md += `- **TTFB / DOMContentLoaded / Load:** ${timing.ttfb}ms / ${timing.domContentLoaded}ms / ${timing.load}ms\n`;
  md += `\n![Desktop](desktop.png)\n\n`;

  md += `## 🎯 Your 3 quick wins (say these in the video)\n\n`;
  if (top3.length === 0) {
    md += `_No obvious issues found — the site is in solid shape. Lead with a compliment and pitch enhancements instead._\n\n`;
  } else {
    top3.forEach((f, i) => {
      md += `**${i + 1}. ${f.title}** ${sevIcon[f.severity]}\n\n${f.detail}\n\n`;
    });
  }

  md += `## All findings (${findings.length})\n\n`;
  if (findings.length === 0) {
    md += `_None._\n\n`;
  } else {
    findings.forEach((f) => {
      md += `### ${sevIcon[f.severity]} ${f.title}\n\n${f.detail}\n\n`;
    });
  }

  if (meta) {
    md += `## Raw signals\n\n`;
    md += `| Signal | Value |\n|---|---|\n`;
    md += `| Title | ${escapeCell(meta.title) || "—"} |\n`;
    md += `| Meta description | ${meta.description === null ? "❌ missing" : escapeCell(meta.description)} |\n`;
    md += `| Viewport tag | ${meta.hasViewport ? "✅" : "❌"} |\n`;
    md += `| H1 count | ${meta.h1Count} |\n`;
    md += `| Images | ${meta.imgCount} (${meta.brokenImages.length} broken) |\n`;
    md += `| Favicon | ${meta.hasFavicon ? "✅" : "❌"} |\n`;
    md += `| lang attr | ${meta.lang || "❌"} |\n`;
  }

  md += `\n![Mobile](mobile.png)\n`;

  await writeFile(path.join(outDir, "report.md"), md, "utf8");
}

const escapeCell = (s) => (s || "").replace(/\|/g, "\\|").replace(/\n/g, " ").slice(0, 200);

main().catch((err) => {
  console.error("Audit failed:", err);
  process.exit(1);
});
