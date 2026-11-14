"use client";

import Link from "next/link";
import { useCartCount, useHydrated } from "@/lib/cart";

export function CartLink() {
  const hydrated = useHydrated();
  const count = useCartCount();
  const showCount = hydrated && count > 0;

  return (
    <Link
      href="/cart"
      aria-label={showCount ? `Cart, ${count} ${count === 1 ? "item" : "items"}` : "Cart"}
      className="relative inline-flex h-11 items-center rounded-md px-2 font-semibold"
    >
      Cart
      {/* Positioned out of the flow, so the count appearing never shifts layout. */}
      {showCount && (
        <span
          aria-hidden="true"
          className="absolute -right-1.5 top-1 inline-flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-accent px-1 text-[0.6875rem] font-bold tabular-nums leading-none text-foreground"
        >
          {count}
        </span>
      )}
    </Link>
  );
}
