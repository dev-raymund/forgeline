import type { Metadata } from "next";
import { CollectionGrid } from "@/components/collection/collection-grid";
import { BrandStatement } from "@/components/home/brand-statement";
import { Hero } from "@/components/home/hero";
import { Values } from "@/components/home/values";
import { ProductGrid } from "@/components/product/product-grid";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getCollections, getFeaturedProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [collections, featured] = await Promise.all([
    getCollections(),
    getFeaturedProducts(8),
  ]);

  return (
    <>
      <Hero collections={collections} />

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
            description="A preview of the range. Pricing and final specifications are confirmed as sourcing completes."
            action={{ href: "/shop", label: "Shop all" }}
          />
          <ProductGrid products={featured} />
        </Container>
      </section>

      <BrandStatement />
      <Values />
    </>
  );
}
