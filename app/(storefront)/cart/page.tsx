import { CartView } from "@/components/cart/cart-view";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { getCartCatalog } from "@/lib/catalog";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Cart",
  description: "Review the items in your FORGELINE cart.",
  path: "/cart",
  noIndex: true,
});

export default async function CartPage() {
  const catalog = await getCartCatalog();

  return (
    <Container className="pb-section">
      <PageHeader eyebrow="Cart" title="Your cart" />
      <CartView catalog={catalog} />
    </Container>
  );
}
