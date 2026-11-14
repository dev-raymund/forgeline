import Link from "next/link";
import { CartLink } from "@/components/cart/cart-link";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Wordmark } from "@/components/ui/wordmark";
import { getCollections } from "@/lib/catalog";
import { companyLinks } from "@/lib/site";
import { MobileNav, type CollectionNavItem } from "./mobile-nav";

const navLink = "font-medium underline-offset-4 hover:underline";

/**
 * The header is the top strip of the board. Its height is a multiple of the
 * 28px dot grid (56px, then 84px) so a board section directly below it, such
 * as the homepage hero, continues the pattern without a seam.
 */
export async function Header() {
  const collections = await getCollections();
  const items: CollectionNavItem[] = collections.map((collection) => ({
    href: `/collections/${collection.slug}`,
    label: collection.name,
    summary: collection.summary,
    image: collection.image,
  }));

  return (
    <header className="sticky top-0 z-40 bg-board">
      <Container className="relative flex h-14 items-center gap-3 sm:gap-6 lg:h-21 lg:gap-10">
        <Link
          href="/"
          aria-label="Forgeline home"
          className="-my-2 shrink-0 py-2 text-[1.0625rem] min-[360px]:text-[1.1875rem] lg:text-[1.4375rem]"
        >
          <Wordmark />
        </Link>

        <nav aria-label="Collections" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={navLink}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/about" className={navLink}>
                About
              </Link>
            </li>
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:gap-4">
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
    </header>
  );
}
