import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Small uppercase mono label used above headings, with an accent marker. */
export function Eyebrow({
  children,
  className,
  marker = true,
}: {
  children: ReactNode;
  className?: string;
  marker?: boolean;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-2.5 font-mono text-eyebrow uppercase text-muted",
        className,
      )}
    >
      {marker && <span aria-hidden="true" className="size-1.5 shrink-0 bg-accent" />}
      {children}
    </p>
  );
}
