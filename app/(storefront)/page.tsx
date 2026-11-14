import type { Metadata } from "next";
import { BrandStatement } from "@/components/home/brand-statement";
import { Hero } from "@/components/home/hero";
import { Values } from "@/components/home/values";
import { ProductGrid } from "@/components/product/product-grid";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  getCollections,
  getFeaturedProducts,
  getProductCounts,
} from "@/lib/catalog";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [collections, counts, featured] = await Promise.all([
    getCollections(),
    getProductCounts(),
    getFeaturedProducts(4),
  ]);

  return (
    <>
      <Hero collections={collections} counts={counts} />

      <section aria-labelledby="featured-title">
        <Container className="py-section">
          <SectionHeading
            id="featured-title"
            title="Selected essentials"
            description="Demo products. Each outline is filled with a real photo once a sample has been inspected, and prices are confirmed as sourcing completes."
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
