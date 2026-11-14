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
- **SEO.** Pages use `pageMetadata()` from `lib/metadata.ts` for the canonical URL, Open Graph tags and the sharing image. `sitemap.xml` lists the public pages and every published product and collection. `robots.txt` allows crawling only on a Vercel production build whose production domain is `forgeline.live`. Every other build, including production on `*.vercel.app`, returns `Disallow: /`.
- **Styling.** Use the tokens in `app/globals.css` (`text-muted`, `border-line`, `max-w-content`, `px-gutter`, `py-section`, …). The default Tailwind palette is disabled. The site is light-only.

## Deployment

The site deploys on Vercel. Every pushed branch gets a Preview Deployment, and `main` deploys to production.
