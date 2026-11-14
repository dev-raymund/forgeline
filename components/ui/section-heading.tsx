import Link from "next/link";
import type { ReactNode } from "react";

export function SectionHeading({
  id,
  title,
  description,
  action,
}: {
  id?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: { href: string; label: string };
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <h2 id={id} className="text-headline font-extrabold font-wide">
          {title}
        </h2>
        {description && (
          <p className="mt-3 max-w-prose text-base text-muted">{description}</p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className="shrink-0 self-start font-semibold underline underline-offset-4 hover:decoration-2 md:self-auto"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
