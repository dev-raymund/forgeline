/**
 * Core commerce types for the FORGELINE storefront.
 *
 * These describe the shape of catalog data independently of where it comes
 * from, so the demo catalog can later be replaced by a real backend without
 * changing the pages that consume it.
 */

/** ISO 4217 currency codes the storefront is prepared to display. */
export type CurrencyCode =
  | "USD"
  | "EUR"
  | "GBP"
  | "CAD"
  | "AUD"
  | "NZD"
  | "SGD"
  | "JPY";

/**
 * A monetary value stored as an integer number of minor units
 * (for example cents for USD, or yen for JPY) with an explicit currency.
 *
 * Never store or compute money as a floating-point major-unit value.
 * Use the helpers in `lib/money.ts` to create and combine values.
 */
export interface Money {
  readonly amount: number;
  readonly currency: CurrencyCode;
}

export type CollectionSlug = "gear" | "home" | "tech" | "active" | "tools";

export interface Collection {
  readonly slug: CollectionSlug;
  readonly name: string;
  /** One-line summary used on cards and navigation. */
  readonly summary: string;
  /** Longer introduction used on the collection page. */
  readonly description: string;
  /** Category photography for collection cards and headers. */
  readonly image?: ProductImage;
}

export interface ProductImage {
  /** Local path under /public or an allow-listed remote URL. */
  readonly src: string;
  readonly alt: string;
  /** Intrinsic dimensions, used to reserve space and prevent layout shift. */
  readonly width: number;
  readonly height: number;
}

export interface ProductVariant {
  readonly id: string;
  /** Display label, for example "Charcoal" or "750 ml". */
  readonly name: string;
  /** Option values keyed by option name, for example { Color: "Charcoal" }. */
  readonly options: Readonly<Record<string, string>>;
  readonly sku?: string;
  /** Overrides the product price when present. */
  readonly price?: Money;
}

export interface ProductSpecification {
  readonly label: string;
  readonly value: string;
}

export type PublicationStatus = "draft" | "published" | "archived";

export interface Product {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly shortDescription: string;
  /** Full description as plain-text paragraphs. */
  readonly description: readonly string[];
  readonly category: CollectionSlug;
  readonly images: readonly ProductImage[];
  readonly sku?: string;
  /** Omitted until pricing research is complete. */
  readonly price?: Money;
  readonly variants?: readonly ProductVariant[];
  readonly specifications?: readonly ProductSpecification[];
  readonly status: PublicationStatus;
  /** True for placeholder catalog entries used before sourcing is complete. */
  readonly isDemo: boolean;
}

/** Minimal product data the client-side cart needs to render its lines. */
export interface CartCatalogEntry {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly collectionName: string;
  readonly image?: ProductImage;
  readonly price?: Money;
  readonly variants: readonly Pick<ProductVariant, "id" | "name" | "price">[];
}
