import Link from "next/link";
import { Arrow } from "@/components/ui/button";
import { MediaFrame } from "@/components/ui/media-frame";
import { getCollections, getProductCounts } from "@/lib/catalog";
import { cn } from "@/lib/cn";
import { formatCount } from "@/lib/format";

/**
 * Responsive editorial layout for the five collections:
 * - mobile: two columns, the fifth card spans the full width
 * - tablet: two wide cards over three tall cards
 * - desktop: five equal portrait cards
 */
const layout = [
  { card: "md:col-span-3", media: "aspect-[4/5] md:aspect-[4/3] lg:aspect-[3/4]" },
  { card: "md:col-span-3", media: "aspect-[4/5] md:aspect-[4/3] lg:aspect-[3/4]" },
  { card: "md:col-span-2", media: "aspect-[4/5] lg:aspect-[3/4]" },
  { card: "md:col-span-2", media: "aspect-[4/5] lg:aspect-[3/4]" },
  { card: "col-span-2 md:col-span-2", media: "aspect-[16/9] md:aspect-[4/5] lg:aspect-[3/4]" },
] as const;

const sizes = [
  "(min-width: 64rem) 20vw, (min-width: 48rem) 50vw, 50vw",
  "(min-width: 64rem) 20vw, (min-width: 48rem) 50vw, 50vw",
  "(min-width: 64rem) 20vw, (min-width: 48rem) 33vw, 50vw",
  "(min-width: 64rem) 20vw, (min-width: 48rem) 33vw, 50vw",
  "(min-width: 64rem) 20vw, (min-width: 48rem) 33vw, 100vw",
];

export async function CollectionGrid({
  headingLevel = "h3",
}: {
  headingLevel?: "h2" | "h3";
}) {
  const [collections, counts] = await Promise.all([
    getCollections(),
    getProductCounts(),
  ]);
  const Heading = headingLevel;

  return (
    <ul
      role="list"
      className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 md:grid-cols-6 md:gap-y-10 lg:grid-cols-5"
    >
      {collections.map((collection, index) => {
        const slot = layout[index % layout.length];
        return (
          <li key={collection.slug} className={cn("lg:col-span-1", slot.card)}>
            <Link
              href={`/collections/${collection.slug}`}
              className="group block"
            >
              <div className="relative">
                <MediaFrame
                  image={collection.image}
                  alt=""
                  decorative
                  sizes={sizes[index % sizes.length]}
                  zoomOnHover
                  className={cn("rounded-sm", slot.media)}
                />
                <span className="absolute left-2.5 top-2.5 rounded-sm bg-background/92 px-2 py-1 font-mono text-eyebrow text-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-3.5 flex items-baseline justify-between gap-3">
                <Heading className="text-lg font-bold uppercase tracking-tight sm:text-xl">
                  {collection.name}
                </Heading>
                <span className="font-mono text-eyebrow uppercase text-muted">
                  {formatCount(counts[collection.slug], "item")}
                </span>
              </div>
              <p className="mt-1.5 text-sm text-muted">{collection.summary}</p>
              <span className="mt-3 inline-flex items-center gap-2 border-b border-foreground pb-0.5 text-[0.6875rem] font-semibold uppercase tracking-label">
                Discover
                <Arrow className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:text-accent-ink" />
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
