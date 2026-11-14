import Link from "next/link";
import type { ReactNode } from "react";
import { Arrow } from "./button";
import { Eyebrow } from "./eyebrow";

export function SectionHeading({
  id,
  title,
  eyebrow,
  description,
  action,
}: {
  id?: string;
  title: ReactNode;
  eyebrow?: ReactNode;
  description?: ReactNode;
  action?: { href: string; label: string };
}) {
  return (
    <div className="mb-8 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
        <h2 id={id} className="text-headline font-bold uppercase">
          {title}
        </h2>
        {description && (
          <p className="mt-4 max-w-prose text-base text-muted">{description}</p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className="group inline-flex shrink-0 items-center gap-2 self-start border-b border-foreground pb-1 text-xs font-semibold uppercase tracking-label md:self-auto"
        >
          {action.label}
          <Arrow className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
