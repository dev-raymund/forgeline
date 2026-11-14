import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "light" | "secondary" | "accent";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  // Charcoal: the default action on white or on the board.
  primary: "bg-foreground text-on-inverse hover:bg-foreground/88",
  // White: the second action on the board.
  light: "bg-white text-foreground hover:bg-cream",
  // Outline: the second action on white.
  secondary:
    "border-[1.5px] border-foreground text-foreground hover:bg-foreground hover:text-on-inverse",
  // Burnt orange with charcoal text (4.7:1). Reserved for adding to the cart.
  accent: "bg-accent text-foreground hover:bg-accent/88",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-[0.9375rem]",
  md: "h-11 px-5 text-base",
  lg: "h-13 px-7 text-lg",
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
