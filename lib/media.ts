import type { ProductImage } from "./types";

/**
 * Editorial (non-catalog) imagery. Collection photography lives with the
 * catalog data; these are the brand images used on the homepage. Files are
 * local under /public/images and optimized by next/image.
 */

/** Homepage hero, 2:1 master (1440×720). Generated editorial image. */
export const heroImage: ProductImage | undefined = {
  src: "/images/hero/forgeline-hero.webp",
  alt: "Everyday essentials on an oak bench in a sunlit loft: a charcoal canvas backpack, a grey insulated bottle, a stoneware mug, an open notebook with a pen, an earbuds case and a multitool.",
  width: 1440,
  height: 720,
};

/**
 * Brand section image, 4:3. Unset until an approved replacement is supplied
 * (the first version was rejected: a leather patch read as a logo).
 * Target file: /images/brand/forgeline-editorial.webp
 */
export const brandImage: ProductImage | undefined = undefined;
