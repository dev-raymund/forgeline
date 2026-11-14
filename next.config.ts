import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  env: {
    // Resolved once per build and inlined, so rendering never reads the clock
    // and pages stay fully static (used for the footer copyright year).
    FORGELINE_BUILD_YEAR: String(new Date().getUTCFullYear()),
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
