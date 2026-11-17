# FORGELINE roadmap

Single-business international store for curated everyday essentials.
Stack: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Vercel.

**Last updated:** 2026-11-14
**Working branch:** `phase-1/storefront-foundation` (the latest commit is in the session log and `git log`). A visual redesign is parked on `design/shadow-board`.

## Status at a glance

| Phase | Scope | Status |
| --- | --- | --- |
| Foundation (done) | Storefront pages, client cart, typed demo catalog, SEO and indexing switch, visual redesign | Done |
| A | Finish the visual storefront (editorial photography) | Done |
| Design pass | "The Shadow Board" redesign | Parked on `design/shadow-board` at the owner's request; not merged |
| B | Business decisions: market, supplier, products, margins | In progress: items 1–3 delivered; supplier inquiries sent 2026-11-17; TeemDrop has replied twice in part, and its contracting company is still unconfirmed; CJdropshipping and HyperSKU pending |
| C | Real catalog | Not started (needs B) |
| D | Commerce backend (hosted checkout, orders, webhooks, email) | Not started (needs B, C) |
| E | Policies and trust pages | Not started (needs B, D) |
| F | Launch readiness and launch sequence | Not started (needs C–E) |
| G | After launch operations | Not started |

## Repository and deployment facts (verified 2026-11-14)

- `main` is at `79b6d85`: the merge of PR #1, which contains only the first Phase 1 commit (`bacfd99`). It predates the robots, noindex and `INDEXING_ENABLED` safeguards.
- The production deployment (`forgeline-sigma.vercel.app`) is behind Vercel Authentication, so it is not publicly reachable or crawlable.
- Indexing is off by design (`lib/seo.ts`). It must stay off until the launch step in Phase F.
- `public/images/` holds all editorial images: the hero, five collections and the brand section. Product images remain placeholders until Phase C.

---

## Phase A: Finish the visual storefront

Status: **Done.**

- [x] Confirm the seven image files are in `~/Downloads`
- [x] Inspect each at full size with 2× zooms of risky regions
  - Pass: Hero, Home, Tech, Active, Tools
  - **Reject Gear:** an off-palette navy jacket that also reads as apparel, plus a small stitched label on the backpack front
  - **Reject Brand:** the leather patch carries an embossed emblem that reads as a logo
  - Accepted caveats: three objects resemble well-known product designs, with no branding visible (Tools multitool, Home kettle, Tech earbud case). The sources are lower resolution than ideal (hero 1456×720, collections 928×1152) and were exported at native size with no upscaling
- [x] Crop to ratio and convert to WebP (sharp, quality 80–82, metadata stripped)
  - [x] `public/images/hero/forgeline-hero.webp` (1440×720, 60 KB)
  - [x] `public/images/collections/{home,tech,active,tools}.webp` (920×1150, 58–103 KB)
  - [x] `public/images/collections/gear.webp` (616×770, 72 KB): no regenerated version arrived, so the owner approved a 4:5 crop of the original that removes the navy jacket, with the stitched label retouched out
  - [x] `public/images/brand/forgeline-editorial.webp` (1192×894, 46 KB): the owner approved a version with the logo-like leather patch retouched out using tone-matched canvas texture
- [x] Wire into the slots with descriptive alt text and focal points (`position`). Slots now follow the image ratios: hero 2:1 on desktop, 16:10 on tablet, 4:3 on phones; collection cards 4:5 everywhere; brand 4:3
- [x] Only the homepage hero is preloaded (verified: exactly one image preload site-wide)
- [x] Product images remain honest placeholders
- [x] Screenshots at 1440, 768, 390 and 320 px: no overflow, no broken images, no console errors
- [x] lint, typecheck, build; committed and pushed to the feature branch
- [x] Add Gear and Brand (retouched and cropped versions, approved by the owner), re-verify and re-screenshot
- Optional later: replace any editorial image with a higher-resolution or real photograph by swapping the file and its dimensions. No layout changes are needed

## Phase B: Business decisions (owner decides; agent prepares material)

Status: **In progress.** Plan approved 2026-11-15. Materials are stored in a private folder outside this public repository (`~/projects/forgeline-business/`). This roadmap records status only, never costs, terms or margins.

Delivery order (each reviewed by the owner before the next starts):

1. [x] Market comparison (US, UK, AU): delivered for review
2. [x] Payment feasibility for a Philippines-based business: delivered for review
3. [x] Supplier comparison, inquiry template, sample-inspection checklist: delivered for review
4. [ ] Product candidates (20–30) with compliance flags and a shortlist rubric
5. [ ] Margin model (per product, per market)
6. [x] Decision log created (all decisions open)
7. [ ] Supplier outreach (owner asked the agent to run it, 2026-11-17): official contact addresses confirmed; all three inquiry emails sent on 2026-11-17 (two by the owner, one by the agent through Gmail). Waiting for replies; follow-up due 2026-11-20 if there are none. Accounts, sample orders and anything that spends money still need owner approval.

Original scope:

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
| 2026-11-14 | Phase A: editorial images | 5 of 7 images inspected, exported and wired in; Gear and Brand rejected and awaiting replacements (`88d1aba`) |
| 2026-11-14 | Phase A: completion | Gear (crop plus retouch) and Brand (retouch) approved and wired in; all editorial slots filled; Phase A done (`e531d94`) |
| 2026-11-15 | Phase B: items 1–2 | Market comparison and payment feasibility delivered privately for owner review; decision log created |
| 2026-11-15 | Design pass | Three directions mocked up; "The Shadow Board" built on `design/shadow-board` (`0fdef7d`), then parked by the owner |
| 2026-11-15 | Phase B: item 3 | Supplier comparison (TeemDrop, CJdropshipping, HyperSKU; Zendrop and Spocket excluded), inquiry email and sample checklist delivered privately |
| 2026-11-17 | Phase B: supplier outreach | Official contact addresses confirmed on each supplier's site; three final emails and a contact log prepared privately. Not sent: the Gmail and Google Drive connectors had expired sessions |
| 2026-11-17 | Phase B: supplier outreach | The connector still failed after reconnecting, so the agent opened prefilled Gmail compose windows and the owner sent two inquiries (CJdropshipping, HyperSKU) |
| 2026-11-17 | Phase B: supplier outreach | Once Gmail was back, the agent found the TeemDrop inquiry had never gone out and sent it. Private workspace synced to the owner's Google Drive |
| 2026-11-17 | Phase B: supplier outreach | TeemDrop replied in part, with several details left for an account agent; recorded privately. A follow-up with the open points was sent with the owner's approval; registration waits until the contracting company is confirmed |
| 2026-11-17 | Phase B: supplier outreach | TeemDrop's second reply answered more points but not the contracting company. The agent found TeemDrop's own documents name two different companies, checked the UK one on Companies House, and, with the owner's approval, sent the screenshots TeemDrop asked for. Registration stays on hold; recorded privately and synced to Drive |
