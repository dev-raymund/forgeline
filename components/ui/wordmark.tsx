import { cn } from "@/lib/cn";

/**
 * Typographic FORGELINE wordmark. The source text is "Forgeline" so screen
 * readers pronounce it as a word; the uppercase treatment is visual only.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-sans font-bold uppercase leading-none tracking-brand",
        className,
      )}
    >
      Forgeline
    </span>
  );
}
