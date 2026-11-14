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
        "inline-flex items-center rounded-sm bg-surface px-2 py-1 font-mono text-eyebrow uppercase text-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
