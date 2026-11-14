import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";
import { getCollection, getProduct, getRelatedProducts } from "@/lib/catalog";
import { AddToCart } from "./add-to-cart";
import { ProductGrid } from "./product-grid";
import { ProductMedia } from "./product-media";
import { ProductPrice } from "./product-price";

/**
 * Product detail content. Reads the URL param inside the page's Suspense
 * boundary so the surrounding route stays in the shared App Shell.
 */
export async function ProductDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const [collection, related] = await Promise.all([
    getCollection(product.category),
    getRelatedProducts(product, 4),
  ]);
  const collectionName = collection?.name ?? "";
  const [primaryImage, ...extraImages] = product.images;

  return (
    <>
      <div className="pt-6 md:pt-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            { label: collectionName, href: `/collections/${product.category}` },
            { label: product.name },
          ]}
        />
      </div>

      <article className="grid gap-8 pb-section pt-5 md:pt-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <div className="relative">
            <ProductMedia
              image={primaryImage}
              name={product.name}
              sizes="(min-width: 90rem) 780px, (min-width: 64rem) 55vw, 100vw"
              preload={Boolean(primaryImage)}
              className="rounded-sm"
            />
            {product.isDemo && (
              <Badge className="absolute left-3 top-3">Demo product</Badge>
            )}
          </div>
          {extraImages.length > 0 && (
            <ul role="list" className="mt-3 grid grid-cols-2 gap-3">
              {extraImages.map((image) => (
                <li key={image.src}>
                  <ProductMedia
                    image={image}
                    name={product.name}
                    sizes="(min-width: 64rem) 28vw, 50vw"
                    className="rounded-sm"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <Link
              href={`/collections/${product.category}`}
              className="inline-flex items-center gap-2.5 font-mono text-eyebrow uppercase text-muted transition-colors hover:text-foreground"
            >
              <span aria-hidden="true" className="size-1.5 bg-accent" />
              {collectionName}
            </Link>
            <h1 className="mt-4 text-title font-bold uppercase md:text-[2.5rem] md:leading-[1.02]">
              {product.name}
            </h1>
            <ProductPrice price={product.price} className="mt-3 text-lg" />
            <p className="mt-6 text-base text-muted">
              {product.shortDescription}
            </p>

            <div className="mt-8 border-t border-line pt-8">
              <AddToCart
                productId={product.id}
                variants={product.variants ?? []}
              />
            </div>

            <section
              aria-labelledby="product-details"
              className="mt-10 border-t border-line pt-8"
            >
              <h2
                id="product-details"
                className="font-mono text-eyebrow uppercase text-foreground"
              >
                Details
              </h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted">
                {product.description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>

            {(Boolean(product.specifications?.length) || product.sku) && (
              <section
                aria-labelledby="product-specifications"
                className="mt-8 border-t border-line pt-8"
              >
                <h2
                  id="product-specifications"
                  className="font-mono text-eyebrow uppercase text-foreground"
                >
                  Specifications
                </h2>
                <dl className="mt-3 divide-y divide-line text-sm">
                  {product.specifications?.map((spec) => (
                    <div
                      key={spec.label}
                      className="grid grid-cols-3 gap-4 py-3"
                    >
                      <dt className="text-muted">{spec.label}</dt>
                      <dd className="col-span-2">{spec.value}</dd>
                    </div>
                  ))}
                  {product.sku && (
                    <div className="grid grid-cols-3 gap-4 py-3">
                      <dt className="text-muted">SKU</dt>
                      <dd className="col-span-2 font-mono text-xs leading-5">
                        {product.sku}
                      </dd>
                    </div>
                  )}
                </dl>
              </section>
            )}

            {product.isDemo && (
              <p className="mt-8 rounded-sm border-l-2 border-accent bg-surface p-4 text-xs leading-relaxed text-muted">
                This is a demo product. Its details are illustrative and will
                be confirmed, or replaced, once sourcing and pricing are
                complete. It cannot be purchased yet.
              </p>
            )}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section
          aria-labelledby="related-products"
          className="border-t border-line py-section"
        >
          <SectionHeading
            id="related-products"
            title={`More from ${collectionName}`}
            action={{
              href: `/collections/${product.category}`,
              label: `View ${collectionName}`,
            }}
          />
          <ProductGrid products={related} />
        </section>
      )}
    </>
  );
}
