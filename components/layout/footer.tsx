import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Wordmark } from "@/components/ui/wordmark";
import { getCollections } from "@/lib/catalog";
import { companyLinks, site } from "@/lib/site";

/**
 * Inlined at build time from next.config.ts. Reading the clock during render
 * would require a cached scope with a revalidation period, which would make
 * every page regenerate on a schedule. The year updates on the next deploy.
 */
const copyrightYear = process.env.FORGELINE_BUILD_YEAR;

const linkClass = "text-on-inverse underline-offset-4 hover:underline";
const headingClass = "text-sm font-semibold text-on-inverse-muted";

export async function Footer() {
  const collections = await getCollections();

  return (
    <footer className="mt-auto bg-inverse text-on-inverse">
      <Container className="grid gap-12 pb-12 pt-14 md:grid-cols-12 md:gap-8 md:pb-16 md:pt-20">
        <div className="md:col-span-6 lg:col-span-8">
          <Link href="/" aria-label="Forgeline home" className="inline-block text-xl">
            <Wordmark />
          </Link>
          <p className="mt-7 text-title font-extrabold font-wide">{site.tagline}</p>
          <p className="mt-2 max-w-sm text-on-inverse-muted">
            {site.message} Curated essentials across gear, home, tech, active
            and tools.
          </p>
        </div>

        <nav aria-labelledby="footer-shop" className="md:col-span-3 lg:col-span-2">
          <h2 id="footer-shop" className={headingClass}>
            Shop
          </h2>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link href="/shop" className={`${linkClass} font-semibold`}>
                Shop all
              </Link>
            </li>
            {collections.map((collection) => (
              <li key={collection.slug}>
                <Link
                  href={`/collections/${collection.slug}`}
                  className={linkClass}
                >
                  {collection.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-company" className="md:col-span-3 lg:col-span-2">
          <h2 id="footer-company" className={headingClass}>
            Company
          </h2>
          <ul className="mt-4 space-y-2.5">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/collections" className={linkClass}>
                Collections
              </Link>
            </li>
            <li>
              <Link href="/cart" className={linkClass}>
                Cart
              </Link>
            </li>
          </ul>
        </nav>
      </Container>

      <Container className="flex flex-col gap-2 border-t border-line-inverse py-6 text-sm text-on-inverse-muted md:flex-row md:items-center md:justify-between">
        <p>
          © {copyrightYear ? `${copyrightYear} ` : ""}
          {site.name}. All rights reserved.
        </p>
        <p>Preview store. Products shown are demo content.</p>
      </Container>
    </footer>
  );
}
