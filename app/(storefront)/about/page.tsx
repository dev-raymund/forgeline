import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { getCollections } from "@/lib/catalog";
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
      className="grid gap-8 border-t border-line py-section first:border-t-0 md:grid-cols-12 md:gap-12"
    >
      <h2
        id={id}
        className="text-2xl font-semibold tracking-tight md:col-span-5"
      >
        {title}
      </h2>
      <div className="md:col-span-7">{children}</div>
    </section>
  );
}

export default async function AboutPage() {
  const collections = await getCollections();

  return (
    <Container className="pb-section">
      <PageHeader
        eyebrow="About"
        title={site.tagline}
        description={`${site.name} is a single, independent store for everyday essentials. ${site.message}`}
      />

      <div>
        <AboutSection id="about-what" title="What we do">
          <div className="space-y-5 text-base text-muted">
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
                <dt className="font-medium">{collection.name}</dt>
                <dd className="col-span-2 text-muted">{collection.summary}</dd>
              </div>
            ))}
          </dl>
        </AboutSection>

        <AboutSection id="about-status" title="Where we are now">
          <p className="text-base text-muted">
            {site.name} is preparing for launch. The products currently on the
            site are demo content while sourcing and pricing are finalized, and
            ordering is not yet available.
          </p>
          <ButtonLink href="/shop" variant="secondary" className="mt-8">
            Preview the shop
          </ButtonLink>
        </AboutSection>
      </div>
    </Container>
  );
}
