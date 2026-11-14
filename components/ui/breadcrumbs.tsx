import Link from "next/link";
import { Fragment } from "react";
import { cn } from "@/lib/cn";

export interface Crumb {
  readonly label: string;
  /** Omit for the current page. */
  readonly href?: string;
}

/**
 * `tone="board"` keeps every part charcoal, because muted text does not have
 * enough contrast on the stone board.
 */
export function Breadcrumbs({
  items,
  tone = "page",
}: {
  items: readonly Crumb[];
  tone?: "page" | "board";
}) {
  const onBoard = tone === "board";
  return (
    <nav aria-label="Breadcrumb">
      <ol
        className={cn(
          "flex flex-wrap items-center gap-x-2 gap-y-1 text-sm",
          onBoard ? "text-foreground" : "text-muted",
        )}
      >
        {items.map((item, index) => (
          <Fragment key={`${item.label}-${index}`}>
            {index > 0 && (
              <li aria-hidden="true" className={onBoard ? "opacity-60" : "text-outline"}>
                /
              </li>
            )}
            <li>
              {item.href ? (
                <Link
                  href={item.href}
                  className={cn(
                    "underline-offset-4 hover:underline",
                    !onBoard && "transition-colors hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="font-semibold text-foreground">
                  {item.label}
                </span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
