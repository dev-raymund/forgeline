import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HungPhoto } from "@/components/ui/hung-photo";
import { Tag } from "@/components/ui/tag";
import { formatCount } from "@/lib/format";
import type { Collection, CollectionSlug } from "@/lib/types";

/**
 * Where each collection hangs on the desktop board, as a percentage of the
 * board (a 644×616 composition on the 28px grid). Below `lg` the slots fall
 * back to a regular grid of 4:5 frames.
 */
const slots = [
  "lg:left-0 lg:top-0 lg:h-[45.45%] lg:w-[34.78%]",
  "lg:left-[39.13%] lg:top-0 lg:h-[40.91%] lg:w-[30.43%]",
  "lg:left-[73.91%] lg:top-0 lg:h-[36.36%] lg:w-[26.09%]",
  "lg:left-0 lg:top-[54.55%] lg:h-[40.91%] lg:w-[30.43%]",
  "lg:left-[34.78%] lg:top-1/2 lg:h-[45.45%] lg:w-[34.78%]",
] as const;
const emptySlot = "lg:left-[73.91%] lg:top-[45.45%] lg:h-[31.82%] lg:w-[26.09%]";
const slotBase = "relative aspect-[4/5] lg:absolute lg:aspect-auto";

/**
 * The homepage hero is the board itself: the five collections hang on it,
 * and one dashed outline is kept for products that are still being sourced.
 */
export function Hero({
  collections,
  counts,
}: {
  collections: readonly Collection[];
  counts: Readonly<Record<CollectionSlug, number>>;
}) {
  return (
    <section aria-labelledby="hero-title" className="bg-board">
      <Container className="grid gap-10 pb-16 pt-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,46%)] lg:gap-14 lg:pb-21 lg:pt-9">
        <div>
          <h1 id="hero-title" className="text-display font-extrabold font-wide">
            A place for everything you use every day.
          </h1>
          <p className="mt-5 max-w-[34ch] text-lg lg:mt-7 lg:text-xl">
            Practical essentials for your home, work, travel and everything in
            between.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-8">
            <ButtonLink href="/shop" size="lg">
              Shop now
            </ButtonLink>
            <ButtonLink href="/about" size="lg" variant="light">
              Discover Forgeline
            </ButtonLink>
          </div>
        </div>

        <ul
          role="list"
          aria-label="Collections"
          className="grid grid-cols-2 gap-x-3.5 gap-y-9 md:grid-cols-3 md:gap-x-6 lg:relative lg:block lg:aspect-[644/616]"
        >
          {collections.slice(0, slots.length).map((collection, index) => (
            <li key={collection.slug} className={`${slotBase} ${slots[index]}`}>
              <Link href={`/collections/${collection.slug}`} className="block size-full">
                <HungPhoto
                  image={collection.image}
                  alt=""
                  decorative
                  sizes="(min-width: 90rem) 230px, (min-width: 64rem) 16vw, (min-width: 48rem) 30vw, 46vw"
                  className="size-full"
                  tag={
                    <Tag>
                      {collection.name}
                      <span className="font-normal max-[359px]:hidden lg:max-xl:hidden">
                        {formatCount(counts[collection.slug], "item")}
                      </span>
                    </Tag>
                  }
                />
              </Link>
            </li>
          ))}
          <li
            className={`${slotBase} ${emptySlot} flex items-center justify-center border-2 border-dashed border-foreground/60 p-4 text-center text-sm leading-snug`}
          >
            Space kept for products still in sourcing
          </li>
        </ul>
      </Container>
    </section>
  );
}
