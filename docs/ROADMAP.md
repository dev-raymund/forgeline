# FORGELINE roadmap

Single-business international store for curated everyday essentials.
Stack: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Vercel.

**Last updated:** 2026-11-14
**Working branch:** `phase-1/storefront-foundation` (the latest commit is in the session log and `git log`)

## Status at a glance

| Phase | Scope | Status |
| --- | --- | --- |
| Foundation (done) | Storefront pages, client cart, typed demo catalog, SEO and indexing switch, visual redesign | Done |
| A | Finish the visual storefront (editorial photography) | In progress: 5 of 7 images live; blocked on 2 replacements (Gear, Brand) |
| B | Business decisions: market, supplier, products, margins | Not started |
| C | Real catalog | Not started (needs B) |
| D | Commerce backend (hosted checkout, orders, webhooks, email) | Not started (needs B, C) |
| E | Policies and trust pages | Not started (needs B, D) |
| F | Launch readiness and launch sequence | Not started (needs C–E) |
| G | After launch operations | Not started |

## Repository and deployment facts (verified 2026-11-14)

- `main` is at `79b6d85`: the merge of PR #1, which contains only the first Phase 1 commit (`bacfd99`). It predates the robots, noindex and `INDEXING_ENABLED` safeguards.
- The production deployment (`forgeline-sigma.vercel.app`) is behind Vercel Authentication, so it is not publicly reachable or crawlable.
- Indexing is off by design (`lib/seo.ts`). It must stay off until the launch step in Phase F.
- `public/images/` now holds the hero and the Home, Tech, Active and Tools collection images. Gear and Brand still use placeholders.

---

## Phase A: Finish the visual storefront

Status: **In progress; blocked on the owner for two replacement images.**

- [x] Confirm the seven image files are in `~/Downloads`
- [x] Inspect each at full size with 2× zooms of risky regions
  - Pass: Hero, Home, Tech, Active, Tools
  - **Reject Gear:** an off-palette navy jacket that also reads as apparel, plus a small stitched label on the backpack front
  - **Reject Brand:** the leather patch carries an embossed emblem that reads as a logo
  - Accepted caveats: three objects resemble well-known product designs, with no branding visible (Tools multitool, Home kettle, Tech earbud case). The sources are lower resolution than ideal (hero 1456×720, collections 928×1152) and were exported at native size with no upscaling
- [x] Crop to ratio and convert to WebP (sharp, quality 80–82, metadata stripped)
  - [x] `public/images/hero/forgeline-hero.webp` (1440×720, 60 KB)
  - [x] `public/images/collections/{home,tech,active,tools}.webp` (920×1150, 58–103 KB)
  - [ ] `public/images/collections/gear.webp`: waiting on replacement
  - [ ] `public/images/brand/forgeline-editorial.webp`: waiting on replacement
- [x] Wire into the slots with descriptive alt text and focal points (`position`). Slots now follow the image ratios: hero 2:1 on desktop, 16:10 on tablet, 4:3 on phones; collection cards 4:5 everywhere; brand 4:3
- [x] Only the homepage hero is preloaded (verified: exactly one image preload site-wide)
- [x] Product images remain honest placeholders
- [x] Screenshots at 1440, 768, 390 and 320 px: no overflow, no broken images, no console errors
- [x] lint, typecheck, build; committed and pushed to the feature branch
- [ ] Add the Gear and Brand replacements once supplied (inspect, export, wire, screenshot)

## Phase B: Business decisions (owner decides; agent prepares material)

Status: **Not started.**

- [ ] Target market priority: US, UK, Australia
- [ ] Supplier selection. TeemDrop was researched but not chosen. Open questions: contracting legal entity, shipping-time discrepancies, per-destination costs, quality inspection, returns, branding and minimum order costs, fees, official API
- [ ] Order and inspect samples before any product is listed
- [ ] Product research: 20–30 candidates, narrowed to 8–12 (about 2–3 per collection)
- [ ] Margin model per product: product cost, shipping, duties, payment fees, acquisition cost, refunds, chargebacks, operating costs
- [ ] Deliverables: comparison sheets and checklists (no decisions made by the agent)

## Phase C: Real catalog

Status: **Not started.** Depends on Phase B.

- [ ] Replace the demo catalog with approved products
- [ ] Real prices in integer minor units; real variants
- [ ] Product photos (supplier-provided or self-shot), verified against each exact variant
- [ ] Remove demo flags and the preview notice only for content that is real

## Phase D: Commerce backend

Status: **Not started.** Depends on Phases B and C.

- [ ] Architecture proposal for approval before building: hosted checkout from a provider that supports a Philippines-based business and the target markets; order store; server-side price and stock validation; payment webhooks; order confirmation emails
- [ ] No custom payment processing or wallet; never handle raw card data
- [ ] Manual supplier fulfilment first; automate only once the process is proven

## Phase E: Policies and trust

Status: **Not started.** Depends on Phases B and D.

- [ ] Shipping, returns and refunds, privacy, terms and contact pages; cookie consent where required
- [ ] Drafted from what the chosen supplier and payment provider actually commit to
- [ ] Flag everything that needs review by a qualified professional (tax, duties, consumer law per market)

## Phase F: Launch readiness

Status: **Not started.**

- [ ] End-to-end test orders, including a refund
- [ ] Accessibility, performance and mobile checks
- [ ] Error monitoring and privacy-respecting analytics
- [ ] Final content pass: no placeholder copy, no demo products
- [ ] Launch sequence, each step approved by the owner: merge to `main` → confirm production domain → set `INDEXING_ENABLED=true` → redeploy → verify robots.txt and sitemap

## Phase G: After launch

Status: **Not started.**

- [ ] Order handling and customer support routine
- [ ] Returns process; supplier performance tracking
- [ ] Marketing foundations and measurement
- [ ] Catalog growth only for products that pass the same validation as the first set

---

## Approval gates (always ask first)

Merging or pushing to `main` · changing the Vercel production branch or domains · changing Hostinger DNS · enabling indexing · adding paid services or dependencies with a cost · anything that spends money.

## Session log

| Date | Session | Result |
| --- | --- | --- |
| 2026-11-14 | Foundation, cleanup, indexing switch, visual redesign | Commits `bacfd99` → `7b6869c` on the feature branch |
| 2026-11-14 | Roadmap created; repository state verified | `main` found to contain PR #1 (`bacfd99`); production behind Vercel Authentication |
| 2026-11-14 | Phase A: editorial images | 5 of 7 images inspected, exported and wired in; Gear and Brand rejected and awaiting replacements |
