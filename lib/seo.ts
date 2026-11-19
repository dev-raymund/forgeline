/**
 * Search engine indexing switch.
 *
 * Indexing is enabled only when ALL of these are true:
 *   1. VERCEL_ENV is "production".
 *   2. The canonical domain (site.url) and Vercel's production domain
 *      (VERCEL_PROJECT_PRODUCTION_URL) are both forgeline.live.
 *   3. INDEXING_ENABLED is exactly "true". Missing or any other value
 *      (including "TRUE" or "1") keeps indexing disabled.
 *
 * Pages, robots.txt and sitemap.xml are prerendered, so these values are read
 * at build time: change them in Vercel and redeploy. See README, "Search
 * engine indexing".
 *
 * next.config.ts imports this file, so keep it free of path aliases and of
 * runtime imports from React or Next.js.
 */
import type { Metadata } from "next";
import { site } from "./site";
import type { Collection, Product } from "./types";

export const PRODUCTION_HOST = "forgeline.live";

type Env = Readonly<Record<string, string | undefined>>;

/** True for Vercel production deployments only (not previews or local builds). */
export function isProductionDeployment(env: Env = process.env): boolean {
  return env.VERCEL_ENV === "production";
}

export function isIndexingEnabled(env: Env = process.env): boolean {
  return (
    isProductionDeployment(env) &&
    new URL(site.url).host === PRODUCTION_HOST &&
    env.VERCEL_PROJECT_PRODUCTION_URL === PRODUCTION_HOST &&
    env.INDEXING_ENABLED === "true"
  );
}

/**
 * Page-level robots directives. While indexing is disabled every page is
 * "noindex, nofollow" regardless of what the page asks for, so child pages
 * cannot loosen the global restriction. When enabled, a page may still opt
 * out with `noIndex`.
 */
export function robotsDirectives(
  { noIndex = false }: { noIndex?: boolean } = {},
  env: Env = process.env,
): NonNullable<Metadata["robots"]> {
  if (!isIndexingEnabled(env)) return { index: false, follow: false };
  return noIndex ? { index: false, follow: true } : { index: true, follow: true };
}

/** Public pages that are always real (not catalog-driven). /cart is excluded. */
export const STATIC_INDEXABLE_PATHS = [
  "/",
  "/shop",
  "/collections",
  "/about",
  "/contact",
] as const;

/** A product may be listed for search engines only if it is real and published. */
export function isIndexableProduct(product: Product): boolean {
  return product.status === "published" && !product.isDemo;
}

/**
 * Paths for the sitemap when indexing is enabled: static pages, collections
 * that contain at least one real product, and real published products.
 * Demo products are always excluded.
 */
export function indexablePaths(
  collections: readonly Collection[],
  products: readonly Product[],
): string[] {
  const realProducts = products.filter(isIndexableProduct);
  const stocked = new Set(realProducts.map((product) => product.category));
  return [
    ...STATIC_INDEXABLE_PATHS,
    ...collections
      .filter((collection) => stocked.has(collection.slug))
      .map((collection) => `/collections/${collection.slug}`),
    ...realProducts.map((product) => `/products/${product.slug}`),
  ];
}
