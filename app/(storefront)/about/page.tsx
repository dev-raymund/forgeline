import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HungPhoto } from "@/components/ui/hung-photo";
import { getCollections } from "@/lib/catalog";
import { brandImage } from "@/lib/media";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About",
  description:
    "FORGELINE is an independent store for curated everyday essentials across home, work, travel and an active lifestyle.",
  path: "/about",
});

function AboutSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby={id}
      className="grid gap-6 border-t border-line py-section first:border-t-0 md:grid-cols-12 md:gap-12"
    >
      <h2 id={id} className="text-title font-extrabold font-wide md:col-span-5">
        {title}
      </h2>
      <div className="md:col-span-7">{children}</div>
    </section>
  );
}

export default async function AboutPage() {
  const collections = await getCollections();

  return (
    <>
      <section aria-labelledby="about-title" className="bg-board">
        <Container className="grid items-center gap-9 pb-14 pt-6 md:grid-cols-12 md:gap-10 lg:pb-21 lg:pt-9">
          <div className="md:col-span-6">
            <h1 id="about-title" className="text-display font-extrabold font-wide">
              {site.tagline}
            </h1>
            <p className="mt-5 max-w-[40ch] text-lg lg:text-xl">
              {site.name} is a single, independent store for everyday
              essentials. {site.message}
            </p>
          </div>
          <HungPhoto
            image={brandImage}
            alt="A calm corner of a sunlit loft"
            sizes="(min-width: 90rem) 660px, (min-width: 48rem) 48vw, 100vw"
            className="aspect-[4/3] md:col-span-6"
          />
        </Container>
      </section>

      <Container className="pb-section">
        <AboutSection id="about-what" title="What we do">
          <div className="space-y-5 text-lg text-muted">
            <p>
              We bring together practical products for the routines that fill
              an ordinary day: carrying what you need, running a home, working
              at a desk, staying active and fixing things when they break.
            </p>
            <p>
              Rather than stocking everything, we keep the range focused and
              choose each item for how useful it is, how clearly it can be
              described and how well it fits alongside everything else.
            </p>
          </div>
        </AboutSection>

        <AboutSection id="about-collections" title="Five collections">
          <dl className="divide-y divide-line border-y border-line">
            {collections.map((collection) => (
              <div key={collection.slug} className="grid grid-cols-3 gap-4 py-4">
                <dt className="font-bold">{collection.name}</dt>
                <dd className="col-span-2 text-muted">{collection.summary}</dd>
              </div>
            ))}
          </dl>
        </AboutSection>

        <AboutSection id="about-status" title="Where we are now">
          <p className="text-lg text-muted">
            {site.name} is preparing for launch. The products currently on the
            site are demo content while sourcing and pricing are finalized, and
            ordering is not yet available.
          </p>
          <ButtonLink href="/shop" variant="secondary" className="mt-7">
            Preview the shop
          </ButtonLink>
        </AboutSection>
      </Container>
    </>
  );
}
