import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProductGrid } from "@/components/product/product-grid";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { HungPhoto } from "@/components/ui/hung-photo";
import { ProductGridSkeleton, Skeleton } from "@/components/ui/skeleton";
import { Tag } from "@/components/ui/tag";
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
    <Suspense fallback={<CollectionSkeleton />}>
      <CollectionContent params={params} />
    </Suspense>
  );
}

const bandGrid =
  "grid gap-8 pb-14 pt-5 md:grid-cols-12 md:items-center md:gap-10 lg:pb-21 lg:pt-7";

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
      {/* The collection's own stretch of board, continuing from the header. */}
      <section aria-labelledby="collection-title" className="bg-board">
        <Container className={bandGrid}>
          <div className="md:col-span-7">
            <Breadcrumbs
              tone="board"
              items={[
                { label: "Home", href: "/" },
                { label: "Collections", href: "/collections" },
                { label: collection.name },
              ]}
            />
            <h1
              id="collection-title"
              className="mt-6 text-display font-extrabold font-wide lg:mt-9"
            >
              {collection.name}
            </h1>
            <p className="mt-4 max-w-[40ch] text-lg lg:text-xl">
              {collection.description}
            </p>
          </div>
          {/* 4:5 photography; phones crop to 4:3 around the image's focal point. */}
          <HungPhoto
            image={collection.image}
            alt={`${collection.name} collection`}
            sizes="(min-width: 90rem) 440px, (min-width: 64rem) 33vw, (min-width: 48rem) 40vw, 100vw"
            className="aspect-[4/3] md:col-span-5 md:aspect-[4/5] lg:col-span-4 lg:col-start-9"
            tag={<Tag>{collection.summary}</Tag>}
          />
        </Container>
      </section>

      <Container className="pb-section">
        <h2 className="pb-7 pt-8 font-semibold">
          {formatCount(products.length, "product")}
        </h2>
        <ProductGrid products={products} />

        <nav
          aria-labelledby="other-collections"
          className="mt-section border-t border-line pt-8"
        >
          <h2 id="other-collections" className="text-lg font-bold">
            Other collections
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/collections/${other.slug}`}
                  className="group inline-block"
                >
                  <Tag size="md" className="transition-colors group-hover:bg-cream">
                    {other.name}
                  </Tag>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </>
  );
}

function CollectionSkeleton() {
  const block = "rounded-sm bg-charcoal/10";
  return (
    <>
      <div className="bg-board" role="status" aria-label="Loading collection">
        <Container className={bandGrid}>
          <div className="space-y-5 md:col-span-7">
            <div className={`${block} h-4 w-48`} />
            <div className={`${block} h-16 w-64`} />
            <div className={`${block} h-6 w-full max-w-md`} />
          </div>
          <div
            className={`${block} aspect-[4/3] md:col-span-5 md:aspect-[4/5] lg:col-span-4 lg:col-start-9`}
          />
        </Container>
      </div>
      <Container className="pb-section">
        <div className="pb-7 pt-8">
          <Skeleton className="h-5 w-24" />
        </div>
        <ProductGridSkeleton />
      </Container>
    </>
  );
}
