"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { buttonStyles } from "@/components/ui/button";
import { MediaFrame } from "@/components/ui/media-frame";
import type { NavLink } from "@/lib/site";
import type { ProductImage } from "@/lib/types";

const PANEL_ID = "mobile-navigation";

export interface CollectionNavItem extends NavLink {
  readonly summary: string;
  readonly image?: ProductImage;
}

export function MobileNav({
  items,
  companyLinks,
}: {
  items: readonly CollectionNavItem[];
  companyLinks: readonly NavLink[];
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    // Close when the user taps or clicks anywhere outside the menu.
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div
      ref={containerRef}
      className="lg:hidden"
      onBlur={(event) => {
        // Close when keyboard focus moves outside the menu. A null
        // relatedTarget (e.g. Safari mouse clicks) is handled by pointerdown.
        const next = event.relatedTarget;
        if (open && next && !event.currentTarget.contains(next)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={PANEL_ID}
        onClick={() => setOpen((value) => !value)}
        className="-mr-2 inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-sm px-2.5 text-sm font-semibold"
      >
        <span aria-hidden="true" className="relative block h-3 w-[18px]">
          <span
            className={`absolute left-0 block h-[1.5px] w-full bg-foreground transition-transform ${open ? "top-1.5 rotate-45" : "top-0.5"}`}
          />
          <span
            className={`absolute left-0 block h-[1.5px] w-full bg-foreground transition-transform ${open ? "top-1.5 -rotate-45" : "top-2.5"}`}
          />
        </span>
        {/* Constant accessible name; aria-expanded conveys open/closed. */}
        <span className="sr-only sm:not-sr-only">Menu</span>
      </button>

      {open && (
        <nav
          id={PANEL_ID}
          aria-label="Mobile"
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-6rem)] overflow-y-auto border-b border-line bg-background shadow-[0_32px_48px_-32px_rgb(23_23_23/0.35)]"
        >
          <div className="mx-auto max-w-content px-gutter pb-8 pt-5">
            <Link
              ref={firstLinkRef}
              href="/shop"
              onClick={close}
              className={buttonStyles({ size: "lg", className: "w-full justify-between" })}
            >
              Shop all essentials
              <span aria-hidden="true">→</span>
            </Link>

            <p className="mt-7 text-sm font-medium text-muted">
              Collections
            </p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {items.map((item, index) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className="flex items-center gap-4 rounded-md bg-surface p-2 pr-4 transition-colors hover:bg-sunken"
                  >
                    {item.image ? (
                      <MediaFrame
                        image={item.image}
                        alt=""
                        decorative
                        sizes="56px"
                        className="size-14 shrink-0 rounded-sm"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="flex size-14 shrink-0 items-center justify-center rounded-sm bg-sunken font-mono text-xs text-muted"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    )}
                    <span className="min-w-0">
                      <span className="block text-lg font-medium">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-muted">
                        {item.summary}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="mt-6 flex gap-6 border-t border-line pt-5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={close}
                    className="inline-block py-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}
    </div>
  );
}
