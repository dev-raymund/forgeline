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
    <header className={cn("border-b border-line pb-8 pt-8 md:pb-12 md:pt-14", className)}>
      {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
      <h1 className="text-headline font-light">{title}</h1>
      {description && (
        <p className="mt-4 max-w-prose text-base text-muted md:mt-5 md:text-lg">
          {description}
        </p>
      )}
      {children}
    </header>
  );
}
