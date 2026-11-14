import type { Metadata } from "next";
import { site } from "./site";

interface PageMetadataInput {
  readonly title: string;
  readonly description: string;
  /** Path relative to `metadataBase`, for example "/shop". */
  readonly path: string;
  readonly noIndex?: boolean;
}

/**
 * Builds page metadata with a canonical URL and a complete Open Graph block.
 * Next.js merges `openGraph` shallowly, so each page supplies every field.
 */
export function pageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: site.locale,
      url: path,
      title: `${title} — ${site.name}`,
      description,
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}
