import { CollectionGrid } from "@/components/collection/collection-grid";
import { Container } from "@/components/ui/container";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Collections",
  description:
    "Explore FORGELINE's five collections: Gear, Home, Tech, Active and Tools.",
  path: "/collections",
});

export default function CollectionsPage() {
  return (
    <section aria-labelledby="collections-title" className="flex-1 bg-board">
      <Container className="pb-section pt-6 lg:pt-9">
        <h1 id="collections-title" className="text-display font-extrabold font-wide">
          Five collections, one standard
        </h1>
        <p className="mt-5 max-w-[46ch] text-lg lg:text-xl">
          Every collection follows the same idea: practical essentials, chosen
          with care, for the way you actually live.
        </p>
        <div className="mt-10 lg:mt-14">
          <CollectionGrid />
        </div>
      </Container>
    </section>
  );
}
