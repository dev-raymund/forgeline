"use client";

import Link from "next/link";
import { ProductMedia } from "@/components/product/product-media";
import { ProductPrice } from "@/components/product/product-price";
import { ButtonLink } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MAX_LINE_QUANTITY,
  removeFromCart,
  setLineQuantity,
  useCartLines,
  useHydrated,
} from "@/lib/cart";
import { formatCount, formatMoney } from "@/lib/format";
import { multiplyMoney, sumMoney } from "@/lib/money";
import type { CartCatalogEntry, Money } from "@/lib/types";

export function CartView({
  catalog,
}: {
  catalog: readonly CartCatalogEntry[];
}) {
  const hydrated = useHydrated();
  const lines = useCartLines();

  if (!hydrated) {
    return (
      <div role="status" aria-label="Loading cart" className="space-y-4 py-10">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  const byId = new Map(catalog.map((entry) => [entry.id, entry]));
  const items = lines.flatMap((line) => {
    const product = byId.get(line.productId);
    if (!product) return [];
    const variant = product.variants.find((v) => v.id === line.variantId);
    const unitPrice: Money | undefined = variant?.price ?? product.price;
    return [{ line, product, variant, unitPrice }];
  });

  if (items.length === 0) {
    return (
      <div className="py-16 text-center md:py-24">
        <p className="text-lg font-medium">Your cart is empty.</p>
        <p className="mt-2 text-sm text-muted">
          Browse the collections to find something useful.
        </p>
        <ButtonLink href="/shop" className="mt-8">
          Shop all
        </ButtonLink>
      </div>
    );
  }

  const itemCount = items.reduce((total, item) => total + item.line.quantity, 0);
  const lineTotals = items.map((item) =>
    item.unitPrice ? multiplyMoney(item.unitPrice, item.line.quantity) : undefined,
  );
  const allPriced = lineTotals.every((total) => total !== undefined);
  const subtotal = allPriced
    ? sumMoney(lineTotals.filter((total): total is Money => total !== undefined))
    : undefined;

  return (
    <div className="grid gap-12 py-10 lg:grid-cols-12 lg:gap-16">
      <section aria-labelledby="cart-items" className="lg:col-span-8">
        <h2 id="cart-items" className="sr-only">
          Items in your cart
        </h2>
        <ul role="list" className="divide-y divide-line border-y border-line">
          {items.map(({ line, product, variant, unitPrice }) => {
            const label = variant ? `${product.name}, ${variant.name}` : product.name;
            return (
              <li
                key={`${line.productId}:${line.variantId ?? ""}`}
                className="flex gap-4 py-6 sm:gap-6"
              >
                <Link
                  href={`/products/${product.slug}`}
                  className="w-20 shrink-0 sm:w-28"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <ProductMedia
                    image={product.image}
                    name={product.name}
                    sizes="112px"
                  />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:justify-between">
                  <div className="min-w-0">
                    <p className="font-mono text-eyebrow uppercase text-muted">
                      {product.collectionName}
                    </p>
                    <Link
                      href={`/products/${product.slug}`}
                      className="mt-1 block text-sm font-medium underline-offset-4 hover:underline"
                    >
                      {product.name}
                    </Link>
                    {variant && (
                      <p className="mt-1 text-sm text-muted">{variant.name}</p>
                    )}
                    <ProductPrice price={unitPrice} className="mt-1 text-sm" />
                  </div>

                  <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:justify-between">
                    <div className="inline-flex h-10 items-center rounded-md border border-line-strong">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${label}`}
                        onClick={() =>
                          setLineQuantity(line.productId, line.variantId, line.quantity - 1)
                        }
                        className="h-full w-10 text-lg transition-colors hover:bg-surface"
                      >
                        −
                      </button>
                      <output
                        aria-label={`Quantity of ${label}`}
                        className="w-8 text-center text-sm tabular-nums"
                      >
                        {line.quantity}
                      </output>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${label}`}
                        disabled={line.quantity >= MAX_LINE_QUANTITY}
                        onClick={() =>
                          setLineQuantity(line.productId, line.variantId, line.quantity + 1)
                        }
                        className="h-full w-10 text-lg transition-colors hover:bg-surface disabled:text-line-strong disabled:hover:bg-transparent"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(line.productId, line.variantId)}
                      className="text-sm text-muted underline underline-offset-4 transition-colors hover:text-foreground"
                    >
                      Remove<span className="sr-only"> {label}</span>
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <aside aria-labelledby="cart-summary" className="lg:col-span-4">
        <div className="rounded-md border border-line p-6 lg:sticky lg:top-24">
          <h2 id="cart-summary" className="text-sm font-medium">
            Summary
          </h2>
          <dl className="mt-4 divide-y divide-line text-sm">
            <div className="flex justify-between py-3">
              <dt className="text-muted">Items</dt>
              <dd className="tabular-nums">{formatCount(itemCount, "item")}</dd>
            </div>
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-muted">Subtotal</dt>
              <dd className="text-right">
                {subtotal ? (
                  <span className="tabular-nums">{formatMoney(subtotal)}</span>
                ) : (
                  <span className="text-muted">Pricing coming soon</span>
                )}
              </dd>
            </div>
          </dl>
          <p className="mt-6 rounded-md bg-surface p-4 text-xs leading-relaxed text-muted">
            Checkout is not available during the preview. Your cart is saved
            in this browser only.
          </p>
        </div>
      </aside>
    </div>
  );
}
