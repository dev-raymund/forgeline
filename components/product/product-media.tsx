import Image from "next/image";
import { cn } from "@/lib/cn";
import type { ProductImage } from "@/lib/types";

/**
 * Square product media frame. Renders an optimized next/image when the
 * product has photography, otherwise a labelled placeholder. The fixed aspect
 * ratio reserves space in both cases so nothing shifts while loading.
 *
 * Images lazy-load by default; pass `preload` only for the single
 * above-the-fold image that is likely to be the LCP element.
 */
export function ProductMedia({
  image,
  name,
  label,
  sizes,
  preload = false,
  className,
}: {
  image?: ProductImage;
  name: string;
  label?: string;
  sizes: string;
  preload?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-square overflow-hidden rounded-md bg-surface",
        className,
      )}
    >
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          preload={preload}
          className="object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={`${name}: product photo coming soon`}
          className="absolute inset-0 flex flex-col justify-between p-3 sm:p-4"
        >
          <span
            aria-hidden="true"
            className="font-mono text-eyebrow uppercase text-muted"
          >
            {label}
          </span>
          <span
            aria-hidden="true"
            className="self-center text-5xl font-semibold tracking-tight text-line-strong sm:text-6xl"
          >
            {name.charAt(0)}
          </span>
          <span
            aria-hidden="true"
            className="font-mono text-eyebrow uppercase text-muted"
          >
            Photo coming soon
          </span>
        </div>
      )}
    </div>
  );
}
