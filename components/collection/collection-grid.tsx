import Link from "next/link";
import { Arrow } from "@/components/ui/button";
import { MediaFrame } from "@/components/ui/media-frame";
import { getCollections, getProductCounts } from "@/lib/catalog";
import { cn } from "@/lib/cn";
import { formatCount } from "@/lib/format";

/**
 * Responsive layout for the five collections. Images stay 4:5 everywhere
 * (matching the photography); wide slots switch the card to a side-by-side
 * layout instead of cropping the image:
 * - mobile: 2 columns; card 5 spans both columns, side by side
 * - tablet: 3 cards in a row, then cards 4 and 5 side by side
 * - desktop: 5 equal portrait cards
 */
const MOBILE_ROW = "max-md:grid max-md:grid-cols-2 max-md:items-center max-md:gap-4";
const TABLET_ROW = "md:max-lg:grid md:max-lg:grid-cols-2 md:max-lg:items-center md:max-lg:gap-5";

const layout = [
  { item: "md:col-span-2", row: "", sizes: "(min-width: 64rem) 20vw, (min-width: 48rem) 33vw, 50vw" },
  { item: "md:col-span-2", row: "", sizes: "(min-width: 64rem) 20vw, (min-width: 48rem) 33vw, 50vw" },
  { item: "md:col-span-2", row: "", sizes: "(min-width: 64rem) 20vw, (min-width: 48rem) 33vw, 50vw" },
  { item: "md:col-span-3", row: TABLET_ROW, sizes: "(min-width: 64rem) 20vw, (min-width: 48rem) 25vw, 50vw" },
  { item: "col-span-2 md:col-span-3", row: cn(MOBILE_ROW, TABLET_ROW), sizes: "(min-width: 64rem) 20vw, (min-width: 48rem) 25vw, 50vw" },
] as const;

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
        const sideBySide = slot.row !== "";
        return (
          <li key={collection.slug} className={cn("lg:col-span-1", slot.item)}>
            <Link
              href={`/collections/${collection.slug}`}
              className={cn("group block", slot.row)}
            >
              <div className="relative">
                <MediaFrame
                  image={collection.image}
                  alt=""
                  decorative
                  sizes={slot.sizes}
                  zoomOnHover
                  className="aspect-[4/5] rounded-lg"
                />
                <span className="absolute left-3 top-3 rounded-full bg-foreground px-2.5 py-1 font-mono text-xs font-medium text-cream">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div
                className={cn(
                  "mt-3.5",
                  sideBySide &&
                    (index === 4 ? "max-md:mt-0 md:max-lg:mt-0" : "md:max-lg:mt-0"),
                )}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <Heading className="text-xl font-medium tracking-tight sm:text-2xl">
                    {collection.name}
                  </Heading>
                  <span className="text-sm font-medium text-muted">
                    {formatCount(counts[collection.slug], "item")}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-muted">{collection.summary}</p>
                <span className="mt-3 inline-flex items-center gap-2 border-b border-foreground pb-0.5 text-sm font-semibold">
                  Discover
                  <Arrow className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:text-accent-ink" />
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
