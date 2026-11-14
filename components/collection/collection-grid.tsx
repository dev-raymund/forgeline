import Link from "next/link";
import { getCollections, getProductCounts } from "@/lib/catalog";
import { formatCount } from "@/lib/format";

export async function CollectionGrid() {
  const [collections, counts] = await Promise.all([
    getCollections(),
    getProductCounts(),
  ]);

  return (
    <ul
      role="list"
      className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4"
    >
      {collections.map((collection, index) => (
        <li key={collection.slug}>
          <Link
            href={`/collections/${collection.slug}`}
            className="group flex h-full flex-col rounded-md border border-line p-5 transition-colors hover:border-foreground md:p-6"
          >
            <span className="flex items-center justify-between font-mono text-eyebrow uppercase text-muted">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span>{formatCount(counts[collection.slug], "item")}</span>
            </span>
            <span className="mt-10 text-xl font-semibold tracking-tight lg:mt-16">
              {collection.name}
            </span>
            <span className="mt-2 text-sm text-muted">
              {collection.summary}
            </span>
            <span className="mt-6 text-sm font-medium">
              Explore
              <span
                aria-hidden="true"
                className="inline-block transition-transform group-hover:translate-x-0.5"
              >
                {" "}
                →
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
