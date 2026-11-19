import Link from "next/link";
import { CartLink } from "@/components/cart/cart-link";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Wordmark } from "@/components/ui/wordmark";
import { getCollections } from "@/lib/catalog";
import { companyLinks } from "@/lib/site";
import { HeaderShell } from "./header-shell";
import { MobileNav, type CollectionNavItem } from "./mobile-nav";

const quietLink =
  "text-[0.9375rem] font-medium text-muted transition-colors hover:text-foreground";

export async function Header() {
  const collections = await getCollections();
  const items: CollectionNavItem[] = collections.map((collection) => ({
    href: `/collections/${collection.slug}`,
    label: collection.name,
    summary: collection.summary,
    image: collection.image,
  }));

  return (
    <HeaderShell>
      <Container className="relative flex h-16 items-center gap-4 lg:gap-8">
        <Link
          href="/"
          aria-label="Forgeline home"
          className="-my-2 shrink-0 py-2 text-[0.9375rem]"
        >
          <Wordmark />
        </Link>

        <nav aria-label="Collections" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={quietLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-3">
          <Link href="/about" className={`hidden lg:block ${quietLink}`}>
            About
          </Link>
          {/* Visibility lives on a wrapper: the button's own display class would win. */}
          <span className="hidden sm:block">
            <ButtonLink href="/shop" size="sm">
              Shop all
            </ButtonLink>
          </span>
          <CartLink />
          <MobileNav items={items} companyLinks={companyLinks} />
        </div>
      </Container>
    </HeaderShell>
  );
}
