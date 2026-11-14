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

const linkClass = "text-sm text-muted transition-colors hover:text-foreground";

export async function Footer() {
  const collections = await getCollections();

  return (
    <footer className="mt-auto border-t border-line">
      <Container className="grid gap-12 py-14 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Link href="/" aria-label="Forgeline home" className="text-lg">
            <Wordmark />
          </Link>
          <p className="mt-5 text-sm font-medium">{site.tagline}</p>
          <p className="mt-1 text-sm text-muted">{site.message}</p>
        </div>

        <nav aria-labelledby="footer-shop" className="md:col-span-3">
          <h2
            id="footer-shop"
            className="font-mono text-eyebrow uppercase text-muted"
          >
            Shop
          </h2>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link href="/shop" className={linkClass}>
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

        <nav aria-labelledby="footer-company" className="md:col-span-2">
          <h2
            id="footer-company"
            className="font-mono text-eyebrow uppercase text-muted"
          >
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
              <Link href="/cart" className={linkClass}>
                Cart
              </Link>
            </li>
          </ul>
        </nav>
      </Container>

      <Container className="flex flex-col gap-2 border-t border-line py-6 text-xs text-muted md:flex-row md:justify-between">
        <p>
          © {copyrightYear ? `${copyrightYear} ` : ""}
          {site.name}. All rights reserved.
        </p>
        <p>Preview store: products shown are demo content.</p>
      </Container>
    </footer>
  );
}
