import type { MetadataRoute } from "next";
import { getCollections, getProducts } from "@/lib/catalog";
import { indexablePaths, isIndexingEnabled } from "@/lib/seo";
import { site } from "@/lib/site";

/**
 * Empty while indexing is disabled, so no URLs (including demo products) are
 * published. When enabled, lists static pages, collections with real
 * products and real published products; demo products are always excluded.
 * lastModified is omitted because the catalog has no real dates yet.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!isIndexingEnabled()) return [];

  const [collections, products] = await Promise.all([
    getCollections(),
    getProducts(),
  ]);

  return indexablePaths(collections, products).map((path) => ({
    url: new URL(path, site.url).toString(),
  }));
}
