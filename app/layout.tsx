import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { robotsDirectives } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

// One variable family for the whole site. The width axis ("wdth") drives the
// wide headlines and narrow tag labels; see the font-* utilities in globals.css.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  // Global indexing switch (lib/seo.ts): "noindex, nofollow" unless enabled.
  robots: robotsDirectives(),
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: "/",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
  // No twitter title/description here: child pages would inherit them.
  // X falls back to each page's og:title, og:description and og:image.
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  // Matches the charcoal notice bar at the top of every page.
  themeColor: "#171717",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
