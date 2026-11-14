import { cn } from "@/lib/cn";

/**
 * FORGELINE wordmark: extra-wide, extra-bold Archivo. The source text is
 * "Forgeline" so screen readers pronounce it as a word; uppercase is visual
 * only. It inherits its color, so it works on the board, white and charcoal.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-sans font-extrabold font-wider uppercase leading-none tracking-[0.02em]",
        className,
      )}
    >
      Forgeline
    </span>
  );
}
