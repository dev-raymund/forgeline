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
      {/* The label stays "Menu"; aria-expanded conveys open or closed. */}
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={PANEL_ID}
        onClick={() => setOpen((value) => !value)}
        className="-mr-2 inline-flex h-11 items-center gap-2 rounded-md px-2 font-semibold"
      >
        <span aria-hidden="true" className="relative block h-3 w-[18px]">
          <span
            className={`absolute left-0 block h-[2px] w-full bg-foreground transition-transform ${open ? "top-[5px] rotate-45" : "top-0.5"}`}
          />
          <span
            className={`absolute left-0 block h-[2px] w-full bg-foreground transition-transform ${open ? "top-[5px] -rotate-45" : "top-2"}`}
          />
        </span>
        Menu
      </button>

      {open && (
        <nav
          id={PANEL_ID}
          aria-label="Mobile"
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-6rem)] overflow-y-auto border-b-2 border-foreground bg-white"
        >
          <div className="mx-auto max-w-content px-gutter pb-8 pt-5">
            <Link
              ref={firstLinkRef}
              href="/shop"
              onClick={close}
              className={buttonStyles({ size: "lg", className: "w-full" })}
            >
              Shop all essentials
            </Link>

            <p className="mt-7 text-sm font-semibold">Collections</p>
            <ul className="mt-2 grid gap-x-6 sm:grid-cols-2">
              {items.map((item) => (
                <li key={item.href} className="border-b border-line">
                  <Link
                    href={item.href}
                    onClick={close}
                    className="flex items-center gap-4 py-2.5"
                  >
                    <MediaFrame
                      image={item.image}
                      alt=""
                      decorative
                      note=""
                      sizes="56px"
                      className="size-14 shrink-0"
                    />
                    <span className="min-w-0">
                      <span className="block text-lg font-bold leading-tight">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block truncate text-sm text-muted">
                        {item.summary}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="mt-5 flex gap-6">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={close}
                    className="inline-block py-2 font-medium underline-offset-4 hover:underline"
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
