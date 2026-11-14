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
      <p className="rounded-md border border-line px-6 py-12 text-center text-sm text-muted">
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
        "grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4 lg:gap-y-14",
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
