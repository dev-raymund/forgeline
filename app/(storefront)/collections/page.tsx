import { CollectionGrid } from "@/components/collection/collection-grid";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Collections",
  description:
    "Explore FORGELINE's five collections: Gear, Home, Tech, Active and Tools.",
  path: "/collections",
});

export default function CollectionsPage() {
  return (
    <Container className="pb-section">
      <PageHeader
        eyebrow="Collections"
        title="Five collections, one standard"
        description="Every collection follows the same idea: practical essentials, chosen with care, for the way you actually live."
      />
      <div className="pt-8 md:pt-12">
        <CollectionGrid headingLevel="h2" />
      </div>
    </Container>
  );
}
