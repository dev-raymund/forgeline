import Link from "next/link";
import { Tag } from "@/components/ui/tag";
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
          className="transition-colors group-hover:border-foreground"
        />
        {/* Clipped to the bottom edge, like the tags on the board. */}
        {product.isDemo && (
          <div className="absolute -bottom-[1.0625rem] left-3">
            <Tag>Demo</Tag>
          </div>
        )}
      </div>
      <h3 className="mt-7 text-[1.0625rem] font-bold leading-snug">
        <Link
          href={`/products/${product.slug}`}
          className="underline-offset-4 after:absolute after:inset-0 after:content-[''] group-hover:underline"
        >
          {product.name}
        </Link>
      </h3>
      <p className="mt-0.5 text-[0.9375rem] text-muted">{collectionName}</p>
      <ProductPrice price={product.price} className="text-[0.9375rem]" />
    </article>
  );
}
