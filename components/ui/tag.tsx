import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * A label tag with an eyelet, like the tags that hang on a shadow board.
 * Used to name photos on the board, as collection filters and as small
 * status labels. `active` fills the eyelet with the accent color.
 *
 * `size="md"` is for tags that are links or buttons (44px tall target).
 */
export function Tag({
  children,
  size = "sm",
  active = false,
  className,
}: {
  children: ReactNode;
  size?: "sm" | "md";
  active?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "relative inline-flex items-center gap-2 whitespace-nowrap border-[1.5px] border-foreground bg-white font-semibold font-narrow leading-tight text-foreground",
        size === "sm"
          ? "py-[0.3125rem] pl-[1.6875rem] pr-3 text-[0.9375rem]"
          : "min-h-11 py-2 pl-8 pr-4 text-base",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-1/2 size-2 -translate-y-1/2 rounded-full border-[1.5px] border-foreground",
          size === "sm" ? "left-[0.5625rem]" : "left-3",
          active ? "bg-accent" : "bg-stone",
        )}
      />
      {children}
    </span>
  );
}
