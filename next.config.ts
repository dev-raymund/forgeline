import type { NextConfig } from "next";
import { isIndexingEnabled } from "./lib/seo";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  env: {
    // Resolved once per build and inlined, so rendering never reads the clock
    // and pages stay fully static (used for the footer copyright year).
    FORGELINE_BUILD_YEAR: String(new Date().getUTCFullYear()),
  },
  async headers() {
    if (isIndexingEnabled()) return [];
    // Global backstop while indexing is disabled: an HTTP header that page
    // metadata cannot override. See lib/seo.ts.
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
