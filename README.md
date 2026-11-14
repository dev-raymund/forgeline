# FORGELINE

**Built for Everyday.** Everyday essentials. Better chosen.

FORGELINE is a single-business international storefront for curated everyday essentials, organized into five collections: **Gear**, **Home**, **Tech**, **Active** and **Tools**.

> **Status: Phase 1 (storefront foundation).** All products are demo content. There are no final prices, no checkout, no payments and no customer accounts yet.

- Production domain: https://forgeline.live (not yet connected)
- Current deployment: https://forgeline-sigma.vercel.app

## Stack

- Next.js 16 (App Router, Turbopack, Cache Components, Partial Prefetching)
- React 19 and TypeScript (strict)
- Tailwind CSS 4, with design tokens in `app/globals.css`
- Geist Sans and Geist Mono via `next/font`

There are no additional runtime dependencies.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script              | Purpose                                               |
| ------------------- | ----------------------------------------------------- |
| `npm run dev`       | Start the development server                          |
| `npm run build`     | Production build (prerenders every catalog route)     |
| `npm run start`     | Serve the production build                            |
| `npm run lint`      | ESLint                                                |
| `npm run typecheck` | Generate route types, then run `tsc --noEmit`         |

Run `lint`, `typecheck` and `build` before every commit.

To regenerate `app/favicon.ico` after changing the monogram, run `node scripts/generate-favicon.mjs`. It has no dependencies, and its geometry must stay in sync with `app/icon.svg` and `app/apple-icon.tsx`.

## Project structure

```
app/
  layout.tsx              Root layout: fonts, metadata, viewport
  globals.css             Design tokens and base styles
  favicon.ico, icon.svg, apple-icon.tsx  Favicons and home-screen icon
  opengraph-image.tsx     Site-wide 1200×630 sharing image (built at build time)
  sitemap.ts, robots.ts   Sitemap and crawl rules
  not-found.tsx, error.tsx  Branded 404 and error pages
  (storefront)/           Routes that share the header and footer
    page.tsx              Home
    shop/                 All products
    collections/          Collection index and [slug] template
    products/[slug]/      Product detail template
    cart/                 Client-side cart prototype
    about/, contact/
components/
  layout/                 Header, mobile navigation, footer, page frame
  product/                Product card, grid, media, price, details, add to cart
  collection/             Collection grid
  cart/                   Cart link and cart view (Client Components)
  ui/                     Primitives: button, container, breadcrumbs, badge, …
lib/
  types.ts                Product, Collection, Variant and Money types
  catalog.ts              The only entry point for catalog data
  data/demo-catalog.ts    Demo products (imported only by catalog.ts)
  money.ts, format.ts     Integer money arithmetic and formatting
  cart.ts                 Client cart store (localStorage)
  site.ts, metadata.ts    Brand configuration and page metadata helper
assets/fonts/             Geist TTFs for the sharing image only (SIL OFL)
scripts/                  generate-favicon.mjs
```

## Conventions

- **Data access.** Pages and components read products only through `lib/catalog.ts`. Replacing the demo data with a real backend should only require changes there.
- **Money.** Amounts are integers in minor units (for example cents) with an explicit ISO 4217 currency. Use `lib/money.ts` for arithmetic and `formatMoney` for display. Never use floating-point prices.
- **Demo content.** Demo products set `isDemo: true` and are labelled in the UI. They carry no prices, supplier details, reviews, inventory or shipping claims.
- **Server first.** Components are Server Components by default. Client Components are limited to the mobile menu, add to cart, the cart link, the cart view and the error page.
- **Caching.** Catalog routes are prerendered with `generateStaticParams`, and product and collection pages set `ensureStatic = "navigation"`. Catalog reads do not use `"use cache"` because the data is in memory. Add caching in `lib/catalog.ts` when a remote source arrives (see the comment there). Keep cookie- or request-dependent code out of cached scopes.
- **Static output.** Every page is fully static, with no scheduled regeneration. The footer year is inlined at build time from `next.config.ts` (`FORGELINE_BUILD_YEAR`), so it updates on the next deploy.
- **SEO.** Pages use `pageMetadata()` from `lib/metadata.ts` for the canonical URL, Open Graph tags, sharing image and robots directives. Never set `robots` directly in page metadata. Indexing is controlled by one switch; see [Search engine indexing](#search-engine-indexing).
- **Styling.** Use the tokens in `app/globals.css` (`text-muted`, `border-line`, `max-w-content`, `px-gutter`, `py-section`, …). The default Tailwind palette is disabled. The site is light-only.

## Search engine indexing

Indexing is **off by default**. It is controlled by the server-side environment variable `INDEXING_ENABLED` and the logic in `lib/seo.ts`. Indexing is enabled only when **all** of these are true:

1. `VERCEL_ENV` is `production` (set by Vercel).
2. The canonical domain (`site.url` in `lib/site.ts`) and Vercel's production domain (`VERCEL_PROJECT_PRODUCTION_URL`, set by Vercel) are both `forgeline.live`.
3. `INDEXING_ENABLED` is exactly `true`. If it is missing, or set to anything else (`TRUE`, `1`, `yes`), indexing stays off.

| | Preview / local build | Production, indexing off | Production, indexing on |
| --- | --- | --- | --- |
| `robots.txt` | `Disallow: /` | `Allow: /`, no sitemap | `Allow: /` and `Sitemap:` |
| `sitemap.xml` | Empty | Empty | Real pages, collections and products only |
| Page `<meta name="robots">` | `noindex, nofollow` | `noindex, nofollow` | `index, follow` |
| `X-Robots-Tag` header | `noindex, nofollow` | `noindex, nofollow` | Not sent |

Notes:

- **Demo products are never indexed.** They are always excluded from the sitemap and are `noindex` even when indexing is on. The same applies to collections that only contain demo products. `/cart` is always `noindex`.
- **Production with indexing off still allows crawling.** This lets search engines read the `noindex` directives; a `robots.txt` block would hide them. Preview deployments stay fully blocked.
- **Pages cannot loosen the switch.** `pageMetadata()` derives `robots` from it, and while indexing is off every response also carries an `X-Robots-Tag` header, which page metadata cannot override.
- **Values are read at build time.** Pages, `robots.txt` and `sitemap.xml` are prerendered, so any change needs a redeploy.

### Enabling indexing at launch

1. Replace the demo catalog with real, published products (`isDemo: false`).
2. In Vercel, go to **Project → Settings → Domains** and add `forgeline.live` as the production domain. `VERCEL_PROJECT_PRODUCTION_URL` must resolve to `forgeline.live`; `www` should redirect to it.
3. In Vercel, go to **Project → Settings → Environment Variables** and add `INDEXING_ENABLED` = `true` for the **Production** environment only.
4. Redeploy production. The variable is read at build time.
5. Verify on `https://forgeline.live`:
   - `/robots.txt` shows `Allow: /` and a `Sitemap:` line.
   - `/sitemap.xml` lists real URLs and no demo products.
   - The page source contains `<meta name="robots" content="index, follow">`.
   - `curl -I https://forgeline.live/` returns no `X-Robots-Tag` header.
6. Submit `https://forgeline.live/sitemap.xml` in Google Search Console.

To turn indexing off again, remove the variable (or set it to anything other than `true`) and redeploy.

## Deployment

The site deploys on Vercel. Every pushed branch gets a Preview Deployment, and `main` deploys to production.
