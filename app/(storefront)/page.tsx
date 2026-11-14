import type { Metadata } from "next";
import { CollectionGrid } from "@/components/collection/collection-grid";
import { ProductGrid } from "@/components/product/product-grid";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { getFeaturedProducts } from "@/lib/catalog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const principles = [
  {
    title: "Chosen for use",
    body: "Each product is selected for how well it fits into daily life, not for novelty.",
  },
  {
    title: "Clear information",
    body: "Straightforward descriptions and specifications, so you know what you are choosing.",
  },
  {
    title: "Fewer, better things",
    body: "A focused range across five collections instead of endless choice.",
  },
] as const;

export default async function HomePage() {
  const featured = await getFeaturedProducts(8);

  return (
    <>
      <section aria-labelledby="hero-title" className="border-b border-line">
        <Container className="py-section">
          <Eyebrow className="mb-6 md:mb-8">{site.message}</Eyebrow>
          <h1 id="hero-title" className="max-w-4xl text-display font-semibold">
            {site.tagline}
          </h1>
          <p className="mt-6 max-w-prose text-base text-muted md:mt-8 md:text-lg">
            {site.description}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/shop" size="lg">
              Shop all essentials
            </ButtonLink>
            <ButtonLink href="/collections" size="lg" variant="secondary">
              Explore collections
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section aria-labelledby="collections-title">
        <Container className="py-section">
          <SectionHeading
            id="collections-title"
            eyebrow="Five collections"
            title="Shop by collection"
            action={{ href: "/collections", label: "All collections" }}
          />
          <CollectionGrid />
        </Container>
      </section>

      <section aria-labelledby="featured-title" className="border-t border-line">
        <Container className="py-section">
          <SectionHeading
            id="featured-title"
            eyebrow="Demo selection"
            title="Selected essentials"
            action={{ href: "/shop", label: "Shop all" }}
          />
          <ProductGrid products={featured} />
        </Container>
      </section>

      <section aria-labelledby="principles-title" className="border-t border-line bg-surface">
        <Container className="py-section">
          <h2 id="principles-title" className="sr-only">
            How FORGELINE chooses products
          </h2>
          <ol className="grid gap-10 md:grid-cols-3 md:gap-12">
            {principles.map((principle, index) => (
              <li key={principle.title}>
                <span className="font-mono text-eyebrow uppercase text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">
                  {principle.title}
                </h3>
                <p className="mt-2 max-w-sm text-sm text-muted">
                  {principle.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
