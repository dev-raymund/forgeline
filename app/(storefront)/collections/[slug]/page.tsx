import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProductGrid } from "@/components/product/product-grid";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ProductGridSkeleton, Skeleton } from "@/components/ui/skeleton";
import {
  getCollection,
  getCollections,
  getProducts,
  isCollectionSlug,
} from "@/lib/catalog";
import { formatCount } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";

/**
 * Collection pages must be fully static. This also makes the first request
 * for an unknown slug wait for the finished render, so notFound() returns a
 * real 404 status instead of streaming a fallback shell with a 200.
 */
export const ensureStatic = "navigation";

export async function generateStaticParams() {
  const collections = await getCollections();
  return collections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/collections/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const collection = await getCollection(slug);
  if (!collection) return {};
  return pageMetadata({
    title: collection.name,
    description: `${collection.summary} ${collection.description}`,
    path: `/collections/${collection.slug}`,
  });
}

export default function CollectionPage({
  params,
}: PageProps<"/collections/[slug]">) {
  return (
    <Container className="pb-section">
      <Suspense fallback={<CollectionSkeleton />}>
        <CollectionContent params={params} />
      </Suspense>
    </Container>
  );
}

async function CollectionContent({
  params,
}: Pick<PageProps<"/collections/[slug]">, "params">) {
  const { slug } = await params;
  if (!isCollectionSlug(slug)) notFound();

  const [collection, products, collections] = await Promise.all([
    getCollection(slug),
    getProducts({ category: slug }),
    getCollections(),
  ]);
  if (!collection) notFound();
  const others = collections.filter((c) => c.slug !== collection.slug);

  return (
    <>
      <div className="pt-6 md:pt-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Collections", href: "/collections" },
            { label: collection.name },
          ]}
        />
      </div>
      <PageHeader
        className="pt-8 md:pt-10"
        eyebrow={collection.summary}
        title={collection.name}
        description={collection.description}
      />
      <h2 className="py-6 text-sm font-normal text-muted">
        {formatCount(products.length, "product")}
      </h2>
      <ProductGrid products={products} />

      <nav
        aria-labelledby="other-collections"
        className="mt-section border-t border-line pt-10"
      >
        <h2
          id="other-collections"
          className="font-mono text-eyebrow uppercase text-muted"
        >
          Other collections
        </h2>
        <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
          {others.map((other) => (
            <li key={other.slug}>
              <Link
                href={`/collections/${other.slug}`}
                className="text-lg font-medium tracking-tight underline-offset-4 hover:underline"
              >
                {other.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

function CollectionSkeleton() {
  return (
    <div>
      <Skeleton className="mt-6 h-4 w-48 md:mt-8" />
      <div className="space-y-4 border-b border-line pb-10 pt-8 md:pb-14 md:pt-10">
        <Skeleton className="h-3 w-40" />
        <Skeleton className="h-12 w-56" />
        <Skeleton className="h-5 w-full max-w-prose" />
      </div>
      <div className="py-6">
        <Skeleton className="h-4 w-24" />
      </div>
      <ProductGridSkeleton />
    </div>
  );
}
