import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "accent" | "secondary" | "inverse" | "ghost-inverse";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-sm font-semibold uppercase tracking-label transition-colors disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  // Charcoal on light surfaces.
  primary: "bg-foreground text-background hover:bg-foreground/88",
  // Burnt orange with charcoal text (4.7:1). Use for the one key action.
  accent: "bg-accent text-foreground hover:bg-accent/88",
  // Outline on light surfaces.
  secondary:
    "border border-foreground text-foreground hover:bg-foreground hover:text-background",
  // Solid cream on charcoal surfaces.
  inverse: "bg-on-inverse text-foreground hover:bg-white",
  // Outline on charcoal surfaces.
  "ghost-inverse":
    "border border-on-inverse/60 text-on-inverse hover:border-on-inverse hover:bg-on-inverse hover:text-foreground",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.6875rem]",
  md: "h-11 px-5 text-xs",
  lg: "h-12 px-7 text-xs sm:h-13",
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
