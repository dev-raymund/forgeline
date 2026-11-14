import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./eyebrow";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("border-b border-line pb-10 pt-10 md:pb-14 md:pt-16", className)}>
      {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
      <h1 className="text-headline font-semibold">{title}</h1>
      {description && (
        <p className="mt-5 max-w-prose text-base text-muted md:text-lg">
          {description}
        </p>
      )}
      {children}
    </header>
  );
}
