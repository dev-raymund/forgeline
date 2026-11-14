import Link from "next/link";
import { ProductGrid } from "@/components/product/product-grid";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Tag } from "@/components/ui/tag";
import { getCollections, getProducts } from "@/lib/catalog";
import { formatCount } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Shop all",
  description:
    "Browse every FORGELINE essential across Gear, Home, Tech, Active and Tools.",
  path: "/shop",
});

export default async function ShopPage() {
  const [products, collections] = await Promise.all([
    getProducts(),
    getCollections(),
  ]);

  return (
    <Container className="pb-section">
      <PageHeader
        title="All essentials"
        description="Everyday essentials across five collections, each chosen for how well it works day to day."
      >
        <nav aria-label="Collections" className="mt-7">
          <ul className="flex flex-wrap gap-2">
            <li>
              <span aria-current="page">
                <Tag size="md" active>
                  All
                </Tag>
              </span>
            </li>
            {collections.map((collection) => (
              <li key={collection.slug}>
                <Link
                  href={`/collections/${collection.slug}`}
                  className="group inline-block"
                >
                  <Tag size="md" className="transition-colors group-hover:bg-cream">
                    {collection.name}
                  </Tag>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>

      <h2 className="pb-7 pt-6 font-semibold">
        {formatCount(products.length, "product")}
      </h2>
      <ProductGrid products={products} />
    </Container>
  );
}
