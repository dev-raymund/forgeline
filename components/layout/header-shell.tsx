"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Header frame from the portfolio direction: transparent at the top of the
 * page, a blurred glass bar once scrolled, and tucked away while scrolling
 * down (it returns as soon as you scroll up). It never hides near the top,
 * or while focus is inside it, so keyboard users always see where they are.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const focused = ref.current?.contains(document.activeElement) ?? false;
      setSolid(y > 8);
      if (y <= 160 || focused || y < last - 4) setHidden(false);
      else if (y > last + 4) setHidden(true);
      last = y;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      ref={ref}
      onFocusCapture={() => setHidden(false)}
      className={cn(
        "sticky top-0 z-40 transition-[transform,background-color,border-color] duration-500",
        "before:absolute before:inset-0 before:-z-10 before:bg-background/72 before:opacity-0 before:backdrop-blur-[18px] before:transition-opacity before:duration-400 before:content-['']",
        solid ? "border-b border-line before:opacity-100" : "border-b border-transparent",
        hidden && "-translate-y-full",
      )}
    >
      {children}
    </header>
  );
}
