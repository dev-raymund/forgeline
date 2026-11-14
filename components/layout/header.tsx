import Link from "next/link";
import { CartLink } from "@/components/cart/cart-link";
import { Container } from "@/components/ui/container";
import { Wordmark } from "@/components/ui/wordmark";
import { getCollections } from "@/lib/catalog";
import { companyLinks, type NavLink } from "@/lib/site";
import { MobileNav } from "./mobile-nav";

const navLinkClass =
  "text-sm text-muted transition-colors hover:text-foreground";

export async function Header() {
  const collections = await getCollections();
  const collectionLinks: NavLink[] = collections.map((collection) => ({
    href: `/collections/${collection.slug}`,
    label: collection.name,
  }));

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background">
      <Container className="relative flex h-16 items-center gap-6">
        <Link
          href="/"
          aria-label="Forgeline home"
          className="-my-2 py-2 text-base"
        >
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden md:ml-8 md:block lg:ml-14">
          <ul className="flex items-center gap-6 lg:gap-8">
            <li>
              <Link
                href="/shop"
                className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
              >
                Shop
              </Link>
            </li>
            {collectionLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={navLinkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/about" className={navLinkClass}>
                About
              </Link>
            </li>
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <CartLink />
          <MobileNav
            collectionLinks={collectionLinks}
            companyLinks={companyLinks}
          />
        </div>
      </Container>
    </header>
  );
}
