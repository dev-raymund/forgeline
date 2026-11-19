/**
 * Oversized outlined word drawn behind a section heading (portfolio
 * direction). Purely decorative: hidden from assistive technology and never
 * selectable. The parent must be `relative`; the page clips horizontal
 * overflow so long words can run off the edge.
 */
export function GhostWord({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      data-ghost
      // Plain string join: tailwind-merge would read `text-giant` (a custom size)
      // as a colour and drop it in favour of `text-transparent`.
      className={[
        "pointer-events-none absolute left-0 top-0 z-0 select-none whitespace-nowrap text-giant font-bold text-transparent [-webkit-text-stroke:1px_var(--color-ghost)] will-change-transform",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}
