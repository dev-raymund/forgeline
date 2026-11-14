import { cn } from "@/lib/cn";

/**
 * FORGELINE wordmark: the "F" monogram (same geometry as the favicon) plus a
 * tracked, bold logotype. The source text is "Forgeline" so screen readers
 * pronounce it as a word; uppercase is visual only.
 *
 * `tone="light"` is for charcoal backgrounds.
 */
export function Wordmark({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className={cn(
          "size-[1.6em] shrink-0",
          tone === "dark" ? "text-charcoal" : "text-cream",
        )}
      >
        <rect width="32" height="32" rx="4" fill="currentColor" />
        <path
          d="M10 7h13v4h-9v4h7v4h-7v6h-4z"
          className={tone === "dark" ? "fill-cream" : "fill-charcoal"}
        />
      </svg>
      <span className="font-sans font-bold uppercase leading-none tracking-brand">
        Forgeline
      </span>
    </span>
  );
}
