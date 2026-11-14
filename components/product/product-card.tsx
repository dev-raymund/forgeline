import Link from "next/link";
import { Arrow } from "@/components/ui/button";
import type { Product } from "@/lib/types";
import { ProductMedia } from "./product-media";
import { ProductPrice } from "./product-price";

export const productGridSizes =
  "(min-width: 90rem) 320px, (min-width: 64rem) 25vw, (min-width: 48rem) 33vw, 50vw";

/**
 * Product card. The product name is the link and is stretched over the whole
 * card, so the card is one target with a concise accessible name.
 */
export function ProductCard({
  product,
  collectionName,
}: {
  product: Product;
  collectionName: string;
}) {
  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative">
        <ProductMedia
          image={product.images[0]}
          name={product.name}
          sizes={productGridSizes}
          decorative
          zoomOnHover
          className="rounded-sm"
        />
        {product.isDemo && (
          <span className="absolute left-2.5 top-2.5 rounded-sm bg-background/92 px-2 py-1 font-mono text-eyebrow uppercase text-foreground">
            Demo
          </span>
        )}
      </div>
      <div className="mt-3.5 flex flex-1 flex-col">
        <p className="font-mono text-eyebrow uppercase text-muted">
          {collectionName}
        </p>
        <h3 className="mt-1.5 text-[0.9375rem] font-semibold leading-snug">
          <Link
            href={`/products/${product.slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {product.name}
          </Link>
        </h3>
        <ProductPrice price={product.price} className="mt-1 text-sm" />
        <span
          aria-hidden="true"
          className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[0.6875rem] font-semibold uppercase tracking-label text-foreground"
        >
          View details
          <Arrow className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:text-accent-ink" />
        </span>
      </div>
    </article>
  );
}
