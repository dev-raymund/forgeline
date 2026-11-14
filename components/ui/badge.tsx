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
        "inline-flex items-center rounded-sm border border-line px-2 py-0.5 font-mono text-eyebrow uppercase text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
