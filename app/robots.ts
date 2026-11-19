import type { MetadataRoute } from "next";
import { isIndexingEnabled, isProductionDeployment } from "@/lib/seo";
import { site } from "@/lib/site";

/**
 * - Preview, development and local builds: crawling blocked.
 * - Production with indexing disabled: crawling allowed so search engines can
 *   read the noindex directives (a robots.txt block would hide them), and no
 *   sitemap is advertised.
 * - Production with indexing enabled: crawling allowed and sitemap advertised.
 */
export default function robots(): MetadataRoute.Robots {
  if (!isProductionDeployment()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  if (!isIndexingEnabled()) {
    return { rules: { userAgent: "*", allow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", site.url).toString(),
  };
}
