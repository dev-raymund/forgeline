"use client";

import Link from "next/link";
import { useCartCount, useHydrated } from "@/lib/cart";
import { cn } from "@/lib/cn";

export function CartLink() {
  const hydrated = useHydrated();
  const count = useCartCount();
  const showCount = hydrated && count > 0;

  return (
    <Link
      href="/cart"
      aria-label={showCount ? `Cart, ${count} ${count === 1 ? "item" : "items"}` : "Cart"}
      className="inline-flex h-10 items-center gap-2 rounded-md px-2 text-sm font-medium"
    >
      Cart
      {/* Space is always reserved so the count appearing never shifts layout. */}
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[0.6875rem] tabular-nums",
          showCount ? "bg-foreground text-background" : "invisible",
        )}
      >
        {showCount ? count : 0}
      </span>
    </Link>
  );
}
