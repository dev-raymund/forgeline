import type { ReactNode } from "react";
import { Footer } from "./footer";
import { Header } from "./header";

/**
 * Shared page frame: skip link, preview notice, header, main region, footer.
 * Used by the storefront layout and by the root not-found page, which renders
 * outside route groups.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-white px-4 py-2 font-semibold text-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <p className="bg-inverse px-gutter py-2 text-center text-sm text-on-inverse">
        Preview store. Products shown are demo content.
      </p>
      <Header />
      <main id="main" className="flex flex-1 flex-col">
        {children}
      </main>
      <Footer />
    </>
  );
}
