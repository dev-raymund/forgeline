import Link from "next/link";
import type { ReactNode } from "react";
import { Arrow } from "./button";
import { Eyebrow } from "./eyebrow";
import { GhostWord } from "./ghost-word";

/**
 * Section heading in the portfolio layout: a small label in a narrow left
 * column, a light-weight headline beside it, and an optional outlined
 * "ghost" word behind both.
 */
export function SectionHeading({
  id,
  title,
  eyebrow,
  description,
  action,
  ghost,
}: {
  id?: string;
  title: ReactNode;
  eyebrow?: ReactNode;
  description?: ReactNode;
  action?: { href: string; label: string };
  ghost?: string;
}) {
  return (
    <div data-reveal className="relative mb-9 md:mb-14">
      {ghost && <GhostWord className="-top-2 md:-top-6 lg:-top-10">{ghost}</GhostWord>}
      <div className="relative z-10 grid gap-4 pt-10 md:pt-16 lg:grid-cols-[13rem_minmax(0,1fr)] lg:items-start lg:pt-24">
        {eyebrow ? <Eyebrow className="lg:pt-4">{eyebrow}</Eyebrow> : <span />}
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <h2 id={id} className="max-w-[18ch] text-headline font-light">
              {title}
            </h2>
            {description && (
              <p className="mt-4 max-w-prose text-base text-muted">{description}</p>
            )}
          </div>
          {action && (
            <Link
              href={action.href}
              className="group inline-flex shrink-0 items-center gap-2 self-start text-[0.9375rem] font-semibold md:self-auto"
            >
              {action.label}
              <Arrow className="transition-transform duration-400 group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
