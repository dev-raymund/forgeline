import type { ProductImage } from "./types";

/**
 * Editorial (non-catalog) imagery. Collection photography lives with the
 * catalog data. Files are local under /public/images and optimized by
 * next/image. Both are generated editorial images, not product photos.
 */

/**
 * The bench line-up, 2:1 master (1440×720). Hung on the homepage's second
 * stretch of board (components/home/brand-statement.tsx).
 */
export const heroImage: ProductImage | undefined = {
  src: "/images/hero/forgeline-hero.webp",
  alt: "Everyday essentials on an oak bench in a sunlit loft: a charcoal canvas backpack, a grey insulated bottle, a stoneware mug, an open notebook with a pen, an earbuds case and a multitool.",
  width: 1440,
  height: 720,
};

/**
 * The loft corner, 4:3 (1192×894). Hung on the About page's board. A
 * logo-like leather patch on the bag was retouched out before export.
 */
export const brandImage: ProductImage | undefined = {
  src: "/images/brand/forgeline-editorial.webp",
  alt: "A calm corner of a sunlit loft: an oak spindle chair, a charcoal canvas messenger bag on the concrete floor and a stoneware mug on the window ledge.",
  width: 1192,
  height: 894,
};
