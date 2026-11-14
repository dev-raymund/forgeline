import Link from "next/link";
import type { Product } from "@/lib/types";
import { ProductMedia } from "./product-media";
import { ProductPrice } from "./product-price";

export const productGridSizes =
  "(min-width: 80rem) 300px, (min-width: 64rem) 25vw, 50vw";

export function ProductCard({
  product,
  collectionName,
}: {
  product: Product;
  collectionName: string;
}) {
  return (
    <article className="group">
      <Link href={`/products/${product.slug}`} className="block">
        <ProductMedia
          image={product.images[0]}
          name={product.name}
          label={product.isDemo ? "Demo" : collectionName}
          sizes={productGridSizes}
          className="border border-transparent transition-colors group-hover:border-line-strong"
        />
        <div className="mt-4 space-y-1">
          <p className="font-mono text-eyebrow uppercase text-muted">
            {collectionName}
          </p>
          <h3 className="text-sm font-medium underline-offset-4 group-hover:underline">
            {product.name}
          </h3>
          <ProductPrice price={product.price} className="text-sm" />
        </div>
      </Link>
    </article>
  );
}
