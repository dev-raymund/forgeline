import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "accent" | "secondary" | "inverse" | "ghost-inverse";
type Size = "sm" | "md" | "lg";

// Pill buttons in sentence case; a small lift on hover (motion is removed
// under prefers-reduced-motion by the global rule in globals.css).
const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-[transform,background-color,border-color,color] hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  // Ink pill on light surfaces.
  primary: "border border-foreground bg-foreground text-cream hover:bg-foreground/88",
  // Orange pill with white text, on a slightly deeper orange so white text
  // passes WCAG AA (4.7:1). Use for the one key action.
  accent: "border border-accent-fill bg-accent-fill text-white hover:border-accent-fill-hover hover:bg-accent-fill-hover",
  // Quiet outline pill on light surfaces.
  secondary:
    "border border-line-strong text-foreground hover:border-foreground",
  // Light pill on ink surfaces.
  inverse: "border border-on-inverse bg-on-inverse text-foreground hover:bg-white",
  // Outline on charcoal surfaces.
  "ghost-inverse":
    "border border-on-inverse/60 text-on-inverse hover:border-on-inverse hover:bg-on-inverse hover:text-foreground",
};

const sizes: Record<Size, string> = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-11 px-5 text-[0.9375rem]",
  lg: "min-h-12 px-7 text-base",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: { variant?: Variant; size?: Size; className?: string } = {}): string {
  return cn(base, variants[variant], sizes[size], className);
}

interface StyleProps {
  variant?: Variant;
  size?: Size;
}

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: ComponentPropsWithoutRef<"button"> & StyleProps) {
  return (
    <button
      type={type}
      className={buttonStyles({ variant, size, className })}
      {...props}
    />
  );
}

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Link> & StyleProps) {
  return (
    <Link className={buttonStyles({ variant, size, className })} {...props} />
  );
}

/** Small arrow glyph for buttons and text links. */
export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={cn("size-3.5 shrink-0", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M2 8h11M9 4l4 4-4 4" />
    </svg>
  );
}
