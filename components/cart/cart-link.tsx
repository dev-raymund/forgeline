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
      className="inline-flex h-11 items-center gap-2 rounded-sm px-2 text-xs font-semibold uppercase tracking-label"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="size-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M3.5 6.5h13l-1 10.5h-11z" />
        <path d="M7 6.5V5a3 3 0 0 1 6 0v1.5" />
      </svg>
      <span className="hidden sm:inline">Cart</span>
      {/* Space is always reserved so the count appearing never shifts layout. */}
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 font-mono text-[0.6875rem] tabular-nums",
          showCount ? "bg-accent text-foreground" : "invisible",
        )}
      >
        {showCount ? count : 0}
      </span>
    </Link>
  );
}
