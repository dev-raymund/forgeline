"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { NavLink } from "@/lib/site";

const PANEL_ID = "mobile-navigation";

export function MobileNav({
  collectionLinks,
  companyLinks,
}: {
  collectionLinks: readonly NavLink[];
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
  const linkClass =
    "block py-3 text-lg tracking-tight transition-colors hover:text-muted";

  return (
    <div
      ref={containerRef}
      className="md:hidden"
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
        className="-mr-2 inline-flex h-10 min-w-10 items-center justify-center gap-2 rounded-md px-2 text-sm font-medium"
      >
        <span aria-hidden="true" className="relative block h-3 w-4">
          <span
            className={`absolute left-0 block h-px w-4 bg-foreground transition-transform ${open ? "top-1.5 rotate-45" : "top-0.5"}`}
          />
          <span
            className={`absolute left-0 block h-px w-4 bg-foreground transition-transform ${open ? "top-1.5 -rotate-45" : "top-2.5"}`}
          />
        </span>
        {/* Constant accessible name; aria-expanded conveys open/closed. */}
        <span className="sr-only sm:not-sr-only">Menu</span>
      </button>

      {open && (
        <nav
          id={PANEL_ID}
          aria-label="Mobile"
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-6rem)] overflow-y-auto border-b border-line bg-background"
        >
          <div className="px-gutter pb-8 pt-4">
            <Link
              ref={firstLinkRef}
              href="/shop"
              onClick={close}
              className={`${linkClass} font-medium`}
            >
              Shop all
            </Link>

            <p className="mt-6 font-mono text-eyebrow uppercase text-muted">
              Collections
            </p>
            <ul className="mt-1 border-b border-line pb-4">
              {collectionLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} onClick={close} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="mt-4">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={close}
                    className="block py-2.5 text-sm text-muted transition-colors hover:text-foreground"
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
