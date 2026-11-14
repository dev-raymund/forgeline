/**
 * Catalog data access. Every page and component reads products and
 * collections through these functions; nothing else imports the data source.
 *
 * Caching: the current source is a static in-memory module, so every read
 * resolves during prerendering and pages are emitted as static HTML. There is
 * no I/O to cache yet, so these functions intentionally do not use
 * `"use cache"`. When a remote catalog replaces the demo data, add
 * `"use cache"` with `cacheLife(...)` and `cacheTag(...)` inside these
 * functions so pages stay in the static shell and can be revalidated on
 * demand.
 */
import { demoCollections, demoProducts } from "./data/demo-catalog";
import type {
  CartCatalogEntry,
  Collection,
  CollectionSlug,
  Product,
} from "./types";

const collectionSlugs = new Set<string>(demoCollections.map((c) => c.slug));

export function isCollectionSlug(value: string): value is CollectionSlug {
  return collectionSlugs.has(value);
}

function isPublished(product: Product): boolean {
  return product.status === "published";
}

export async function getCollections(): Promise<readonly Collection[]> {
  return demoCollections;
}

export async function getCollection(
  slug: string,
): Promise<Collection | undefined> {
  return demoCollections.find((collection) => collection.slug === slug);
}

interface ProductQuery {
  readonly category?: CollectionSlug;
  readonly limit?: number;
}

export async function getProducts({
  category,
  limit,
}: ProductQuery = {}): Promise<readonly Product[]> {
  const products = demoProducts.filter(
    (product) =>
      isPublished(product) && (!category || product.category === category),
  );
  return limit === undefined ? products : products.slice(0, limit);
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  return demoProducts.find(
    (product) => product.slug === slug && isPublished(product),
  );
}

/** Published product counts keyed by collection. */
export async function getProductCounts(): Promise<
  Readonly<Record<CollectionSlug, number>>
> {
  const counts: Record<CollectionSlug, number> = {
    gear: 0,
    home: 0,
    tech: 0,
    active: 0,
    tools: 0,
  };
  for (const product of await getProducts()) counts[product.category] += 1;
  return counts;
}

/** A mix of products across collections, taken in round-robin order. */
export async function getFeaturedProducts(
  limit: number,
): Promise<readonly Product[]> {
  const groups = await Promise.all(
    demoCollections.map((collection) =>
      getProducts({ category: collection.slug }),
    ),
  );
  const featured: Product[] = [];
  for (let index = 0; featured.length < limit; index += 1) {
    const round = groups
      .map((group) => group[index])
      .filter((product): product is Product => product !== undefined);
    if (round.length === 0) break;
    featured.push(...round);
  }
  return featured.slice(0, limit);
}

export async function getRelatedProducts(
  product: Product,
  limit: number,
): Promise<readonly Product[]> {
  const sameCollection = await getProducts({ category: product.category });
  return sameCollection.filter((item) => item.id !== product.id).slice(0, limit);
}

export async function getProductSlugs(): Promise<readonly string[]> {
  return (await getProducts()).map((product) => product.slug);
}

/** Minimal product data for the client-side cart prototype. */
export async function getCartCatalog(): Promise<readonly CartCatalogEntry[]> {
  const [products, collections] = await Promise.all([
    getProducts(),
    getCollections(),
  ]);
  const names = new Map(collections.map((c) => [c.slug, c.name]));
  return products.map((product) => ({
    id: product.id,
    slug: product.slug,
    name: product.name,
    collectionName: names.get(product.category) ?? "",
    image: product.images[0],
    price: product.price,
    variants: (product.variants ?? []).map(({ id, name, price }) => ({
      id,
      name,
      price,
    })),
  }));
}
