"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/lib/cart";
import type { ProductVariant } from "@/lib/types";

export function AddToCart({
  productId,
  variants,
}: {
  productId: string;
  variants: readonly Pick<ProductVariant, "id" | "name" | "options">[];
}) {
  const groupName = useId();
  const [variantId, setVariantId] = useState<string | null>(
    variants[0]?.id ?? null,
  );
  const [added, setAdded] = useState(false);

  const selected = variants.find((variant) => variant.id === variantId);
  const optionLabel =
    variants.length > 0 ? Object.keys(variants[0].options).join(" / ") : "";

  return (
    <div className="space-y-6">
      {variants.length > 0 && (
        <fieldset>
          <legend className="text-sm font-medium">
            {optionLabel || "Option"}
            {selected && (
              <span className="font-normal text-muted">: {selected.name}</span>
            )}
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {variants.map((variant) => (
              <label key={variant.id} className="cursor-pointer">
                <input
                  type="radio"
                  name={groupName}
                  value={variant.id}
                  checked={variant.id === variantId}
                  onChange={() => {
                    setVariantId(variant.id);
                    setAdded(false);
                  }}
                  className="peer sr-only"
                />
                <span className="inline-flex h-10 min-w-12 items-center justify-center rounded-full border border-line-strong px-4 text-sm transition-colors hover:border-foreground peer-checked:border-foreground peer-checked:bg-foreground peer-checked:text-cream peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-foreground">
                  {variant.name}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div>
        <Button
          variant="accent"
          size="lg"
          className="w-full sm:w-auto sm:min-w-64"
          onClick={() => {
            addToCart(productId, variantId);
            setAdded(true);
          }}
        >
          Add to cart
        </Button>
        <p role="status" className="mt-3 min-h-5 text-sm text-muted">
          {added && (
            <>
              Added to your cart.{" "}
              <Link
                href="/cart"
                className="font-medium text-foreground underline underline-offset-4"
              >
                View cart
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
