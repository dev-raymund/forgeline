import Link from "next/link";
import { HungPhoto } from "@/components/ui/hung-photo";
import { Tag } from "@/components/ui/tag";
import { getCollections, getProductCounts } from "@/lib/catalog";
import { formatCount } from "@/lib/format";

/**
 * The five collections as photos hung on the board, each with its tag and a
 * one-line summary. Render it inside a `bg-board` section: the summary text
 * is charcoal because muted text does not pass contrast on the board.
 */
export async function CollectionGrid() {
  const [collections, counts] = await Promise.all([
    getCollections(),
    getProductCounts(),
  ]);

  return (
    <ul
      role="list"
      className="grid grid-cols-2 gap-x-3.5 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-5"
    >
      {collections.map((collection) => (
        <li key={collection.slug}>
          <Link href={`/collections/${collection.slug}`} className="group block">
            <HungPhoto
              image={collection.image}
              alt=""
              decorative
              sizes="(min-width: 64rem) 20vw, (min-width: 48rem) 33vw, 50vw"
              className="aspect-[4/5]"
              tag={
                <Tag>
                  {collection.name}
                  <span className="font-normal max-[359px]:hidden">
                    {formatCount(counts[collection.slug], "item")}
                  </span>
                </Tag>
              }
            />
            <p className="mt-7 text-[0.9375rem] leading-snug underline-offset-4 group-hover:underline">
              {collection.summary}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
