import type { MetadataRoute } from "next";
import { getCollections, getProducts } from "@/lib/catalog";
import { site } from "@/lib/site";

/** Public, indexable pages. /cart is excluded because it is noindex. */
const staticPaths = ["/", "/shop", "/collections", "/about", "/contact"];

/**
 * Lists every public route and every published catalog entry. lastModified
 * is omitted because the catalog has no real modification dates yet.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [collections, products] = await Promise.all([
    getCollections(),
    getProducts(),
  ]);

  const paths = [
    ...staticPaths,
    ...collections.map((collection) => `/collections/${collection.slug}`),
    ...products.map((product) => `/products/${product.slug}`),
  ];

  return paths.map((path) => ({ url: new URL(path, site.url).toString() }));
}
