import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductDetails } from "@/components/product/product-details";
import { Container } from "@/components/ui/container";
import { ProductDetailSkeleton } from "@/components/ui/skeleton";
import { getProduct, getProductSlugs } from "@/lib/catalog";
import { pageMetadata } from "@/lib/metadata";
import { isIndexableProduct } from "@/lib/seo";

/**
 * Product pages must be fully static. This also makes the first request for
 * an unknown slug wait for the finished render, so notFound() returns a real
 * 404 status instead of streaming a fallback shell with a 200.
 */
export const ensureStatic = "navigation";

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};
  return pageMetadata({
    title: product.name,
    description: product.shortDescription,
    path: `/products/${product.slug}`,
    // Demo products are never indexed, even after indexing is enabled.
    noIndex: !isIndexableProduct(product),
  });
}

export default function ProductPage({ params }: PageProps<"/products/[slug]">) {
  return (
    <Container>
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetails params={params} />
      </Suspense>
    </Container>
  );
}
