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
        className="sr-only z-50 rounded-sm bg-foreground px-4 py-2 text-sm text-background focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <p className="flex items-center justify-center gap-2 bg-inverse px-gutter py-2 text-center text-[0.8125rem] font-medium text-on-inverse-muted">
        <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-accent" />
        <span className="sm:hidden">Preview store · Demo content</span>
        <span className="hidden sm:inline">
          Preview store · Products shown are demo content
        </span>
      </p>
      <Header />
      <main id="main" className="flex flex-1 flex-col">
        {children}
      </main>
      <Footer />
    </>
  );
}
