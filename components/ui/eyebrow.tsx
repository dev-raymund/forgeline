import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Small uppercase label used above headings. */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-mono text-eyebrow uppercase text-muted",
        className,
      )}
    >
      {children}
    </p>
  );
}
