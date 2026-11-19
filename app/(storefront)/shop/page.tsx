import Link from "next/link";
import { ProductGrid } from "@/components/product/product-grid";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { getCollections, getProducts } from "@/lib/catalog";
import { formatCount } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Shop all",
  description:
    "Browse every FORGELINE essential across Gear, Home, Tech, Active and Tools.",
  path: "/shop",
});

const pillClass =
  "inline-flex h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors";

export default async function ShopPage() {
  const [products, collections] = await Promise.all([
    getProducts(),
    getCollections(),
  ]);

  return (
    <Container className="pb-section">
      <PageHeader
        eyebrow="Shop"
        title="All essentials"
        description="Everyday essentials across five collections, each chosen for how well it works day to day."
      >
        <nav aria-label="Collections" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            <li>
              <span
                aria-current="page"
                className={`${pillClass} border-foreground bg-foreground text-background`}
              >
                All
              </span>
            </li>
            {collections.map((collection) => (
              <li key={collection.slug}>
                <Link
                  href={`/collections/${collection.slug}`}
                  className={`${pillClass} border-line-strong hover:border-foreground hover:bg-foreground hover:text-background`}
                >
                  {collection.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>

      <h2 className="py-6 text-sm font-medium text-muted">
        {formatCount(products.length, "product")}
      </h2>
      <ProductGrid products={products} />
    </Container>
  );
}
