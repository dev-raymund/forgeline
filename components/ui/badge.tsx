import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-foreground px-2.5 py-1 text-xs font-bold text-cream",
        className,
      )}
    >
      {children}
    </span>
  );
}
