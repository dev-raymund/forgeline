import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function PageHeader({
  title,
  description,
  children,
  className,
}: {
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("border-b border-line pb-8 pt-8 md:pb-10 md:pt-12", className)}>
      <h1 className="text-headline font-extrabold font-wide">{title}</h1>
      {description && (
        <p className="mt-4 max-w-prose text-base text-muted md:text-lg">
          {description}
        </p>
      )}
      {children}
    </header>
  );
}
