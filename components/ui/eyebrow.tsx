import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Small sentence-case label used beside or above headings, with an accent dot. */
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
        "flex items-center gap-2.5 text-[0.9375rem] font-medium text-muted",
        className,
      )}
    >
      {marker && <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-accent" />}
      {children}
    </p>
  );
}
