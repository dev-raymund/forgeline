import Link from "next/link";
import { Arrow, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { MediaFrame } from "@/components/ui/media-frame";
import type { Collection } from "@/lib/types";
import { heroImage } from "@/lib/media";

/**
 * Editorial hero: oversized headline with copy and actions, then a wide
 * lifestyle photograph. The image is the LCP element, so it is preloaded.
 */
export function Hero({ collections }: { collections: readonly Collection[] }) {
  return (
    <section aria-labelledby="hero-title" className="border-b border-line">
      <Container className="pb-6 pt-8 md:pb-10 md:pt-12 lg:pt-14">
        <div className="grid gap-7 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-8">
            <Eyebrow className="mb-5 md:mb-7">Premium urban utility</Eyebrow>
            <h1 id="hero-title" className="text-display font-bold uppercase">
              Better finds.
              <br />
              Everyday use<span className="text-accent">.</span>
            </h1>
          </div>
          <div className="lg:col-span-4 lg:pb-2">
            <p className="max-w-md text-base text-muted md:text-lg">
              Practical essentials for your home, work, travel and everything
              in between.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <ButtonLink href="/shop" variant="accent" size="lg">
                Shop now
                <Arrow />
              </ButtonLink>
              <ButtonLink href="/about" variant="secondary" size="lg">
                Discover Forgeline
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>

      <Container className="pb-8 md:pb-12">
        <div className="relative">
          <MediaFrame
            image={heroImage}
            alt="Everyday essentials arranged in a sunlit urban interior"
            sizes="(min-width: 90rem) 1344px, 100vw"
            preload
            position="center 60%"
            className="aspect-[4/5] rounded-sm sm:aspect-[16/10] lg:aspect-[21/9]"
          />
          <nav
            aria-label="Shop by collection"
            className="absolute inset-x-3 bottom-3 sm:inset-x-auto sm:left-4 sm:bottom-4 lg:left-6 lg:bottom-6"
          >
            <ul className="flex flex-wrap gap-1.5">
              {collections.map((collection) => (
                <li key={collection.slug}>
                  <Link
                    href={`/collections/${collection.slug}`}
                    className="group inline-flex h-9 items-center gap-1.5 rounded-sm bg-background/92 px-3 text-[0.6875rem] font-semibold uppercase tracking-label backdrop-blur-sm transition-colors hover:bg-foreground hover:text-background"
                  >
                    {collection.name}
                    <Arrow className="size-3 opacity-60 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </section>
  );
}
