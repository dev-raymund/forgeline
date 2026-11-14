import Link from "next/link";
import type { ReactNode } from "react";

export function SectionHeading({
  id,
  title,
  eyebrow,
  action,
}: {
  id?: string;
  title: ReactNode;
  eyebrow?: ReactNode;
  action?: { href: string; label: string };
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-6 md:mb-10">
      <div>
        {eyebrow && (
          <p className="mb-3 font-mono text-eyebrow uppercase text-muted">
            {eyebrow}
          </p>
        )}
        <h2 id={id} className="text-2xl font-semibold tracking-tight md:text-3xl">
          {title}
        </h2>
      </div>
      {action && (
        <Link
          href={action.href}
          className="shrink-0 text-sm font-medium underline-offset-4 hover:underline"
        >
          {action.label}
          <span aria-hidden="true"> →</span>
        </Link>
      )}
    </div>
  );
}
