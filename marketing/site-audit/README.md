# Forgeline site-audit

Automated website **teardown** tool. Point it at any URL and it produces a markdown
report with your **3 quick wins** plus desktop + mobile screenshots — the exact ammo you
need to record a free-teardown Loom in 2 minutes (see item 5 in [../TODO.md](../TODO.md)).

Free & open-source (Playwright). No API keys, no accounts. Uses your existing
Google Chrome — no big browser download.

## One-time setup

```bash
cd marketing/site-audit
npm install          # installs the Playwright library only (small, fast)
```

Requires Google Chrome installed (the tool launches it via `channel: "chrome"`).
If Chrome isn't present, it falls back to Playwright's bundled Chromium — run
`npx playwright install chromium` once to fetch that.

## Run an audit

```bash
npm run audit -- example.com
# or
node audit.mjs https://example.com
```

Output lands in `reports/<hostname>-<timestamp>/`:
- `report.md` — findings, ranked, with the top 3 called out for the video
- `desktop.png` — full-page desktop screenshot
- `mobile.png` — full-page phone screenshot (iPhone 13 viewport)

## What it checks

- **Performance** — full load time + TTFB (server response)
- **Mobile-friendliness** — responsive viewport tag + horizontal-scroll test on a phone
- **Broken things** — broken images, failed requests (dead assets/links), JS console errors
- **SEO/meta basics** — title, meta description, H1s, favicon, lang, HTTPS

## Teardown workflow

1. `node audit.mjs theirsite.com`
2. Open `report.md` → read the "3 quick wins".
3. Record a 2-min Loom: show each issue on screen, say why it costs them, name the fix.
4. Send the Loom link in your outreach. → reply → call → proposal.

> Note: run this only on sites you're auditing for legitimate outreach. It loads pages
> like a normal browser (one visit); it does not hammer or scrape at scale.
