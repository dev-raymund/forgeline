import { getCollections } from "@/lib/catalog";
import { cn } from "@/lib/cn";
import type { Product } from "@/lib/types";
import { ProductCard } from "./product-card";

export async function ProductGrid({
  products,
  className,
}: {
  products: readonly Product[];
  className?: string;
}) {
  if (products.length === 0) {
    return (
      <p className="rounded-sm border border-line bg-surface px-6 py-12 text-center text-sm text-muted">
        No products are available here yet.
      </p>
    );
  }

  const collections = await getCollections();
  const names = new Map(collections.map((c) => [c.slug, c.name]));

  return (
    <ul
      role="list"
      className={cn(
        "grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-y-12",
        className,
      )}
    >
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard
            product={product}
            collectionName={names.get(product.category) ?? ""}
          />
        </li>
      ))}
    </ul>
  );
}
