import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProductGrid } from "@/components/product/product-grid";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { MediaFrame } from "@/components/ui/media-frame";
import { ProductGridSkeleton, Skeleton } from "@/components/ui/skeleton";
import {
  getCollection,
  getCollections,
  getProducts,
  isCollectionSlug,
} from "@/lib/catalog";
import { formatCount } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";
import { isIndexableProduct } from "@/lib/seo";

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
  const products = await getProducts({ category: collection.slug });
  return pageMetadata({
    title: collection.name,
    description: `${collection.summary} ${collection.description}`,
    path: `/collections/${collection.slug}`,
    // Matches the sitemap: collections with only demo products stay noindex.
    noIndex: !products.some(isIndexableProduct),
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
      <header className="grid gap-6 border-b border-line pb-8 pt-6 md:grid-cols-12 md:items-end md:gap-10 md:pb-12 md:pt-8">
        <div className="md:col-span-6 lg:col-span-5">
          <Eyebrow className="mb-4">{collection.summary}</Eyebrow>
          <h1 className="text-display font-bold uppercase">{collection.name}</h1>
          <p className="mt-5 max-w-prose text-base text-muted md:text-lg">
            {collection.description}
          </p>
        </div>
        <MediaFrame
          image={collection.image}
          alt={`${collection.name} collection`}
          sizes="(min-width: 90rem) 760px, (min-width: 48rem) 50vw, 100vw"
          preload={Boolean(collection.image)}
          className="aspect-[16/9] rounded-sm md:col-span-6 md:aspect-[4/3] lg:col-span-7 lg:aspect-[16/9]"
        />
      </header>
      <h2 className="py-6 font-mono text-eyebrow uppercase text-muted">
        {formatCount(products.length, "product")}
      </h2>
      <ProductGrid products={products} />

      <nav
        aria-labelledby="other-collections"
        className="mt-section border-t border-line pt-8"
      >
        <h2
          id="other-collections"
          className="flex items-center gap-2.5 font-mono text-eyebrow uppercase text-muted"
        >
          <span aria-hidden="true" className="size-1.5 bg-accent" />
          Other collections
        </h2>
        <ul className="mt-5 flex flex-wrap gap-2">
          {others.map((other) => (
            <li key={other.slug}>
              <Link
                href={`/collections/${other.slug}`}
                className="inline-flex h-11 items-center gap-2 rounded-sm border border-line-strong px-4 text-xs font-semibold uppercase tracking-label transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
              >
                {other.name}
                <span aria-hidden="true">→</span>
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
      <div className="grid gap-6 border-b border-line pb-8 pt-6 md:grid-cols-12 md:items-end md:gap-10 md:pb-12 md:pt-8">
        <div className="space-y-4 md:col-span-6 lg:col-span-5">
          <Skeleton className="h-3 w-40" />
          <Skeleton className="h-14 w-56" />
          <Skeleton className="h-5 w-full max-w-prose" />
        </div>
        <Skeleton className="aspect-[16/9] md:col-span-6 md:aspect-[4/3] lg:col-span-7 lg:aspect-[16/9]" />
      </div>
      <div className="py-6">
        <Skeleton className="h-4 w-24" />
      </div>
      <ProductGridSkeleton />
    </div>
  );
}
