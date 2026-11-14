import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Crawling is allowed only for a Vercel production build whose production
 * domain is the canonical domain (forgeline.live). Preview deployments, local
 * builds and production on the temporary *.vercel.app domain are blocked, so
 * indexing starts automatically once the custom domain is connected and the
 * site is redeployed. Both variables are Vercel system environment variables
 * and are read once at build time.
 */
const isIndexable =
  process.env.VERCEL_ENV === "production" &&
  process.env.VERCEL_PROJECT_PRODUCTION_URL === new URL(site.url).host;

export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    // /cart stays crawlable so crawlers can see its noindex directive.
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", site.url).toString(),
  };
}
