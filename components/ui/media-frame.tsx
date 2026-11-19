import Image from "next/image";
import { cn } from "@/lib/cn";
import type { ProductImage } from "@/lib/types";

/**
 * Responsive media frame with a fixed aspect ratio (pass it via className,
 * e.g. "aspect-[4/5]"). Renders an optimized next/image when a photo is
 * available, otherwise a quiet branded placeholder. The frame reserves space
 * in both cases, so nothing shifts while loading.
 *
 * Loading: lazy by default. `preload` is reserved for the homepage hero.
 * There is deliberately no "eager" option: React 19 emits a preload hint for
 * every server-rendered <img> that is not lazy, so eager would mean preload.
 *
 * Cropping: `image.position` sets the default object-position; pass
 * responsive `object-[…]` utilities via `imageClassName` to override it per
 * breakpoint. Set `decorative` when surrounding text already names the subject.
 */
export function MediaFrame({
  image,
  alt,
  sizes,
  label,
  preload = false,
  decorative = false,
  zoomOnHover = false,
  imageClassName,
  className,
}: {
  image?: ProductImage;
  /** Accessible description used for the placeholder when there is no image. */
  alt: string;
  sizes: string;
  label?: string;
  preload?: boolean;
  decorative?: boolean;
  zoomOnHover?: boolean;
  imageClassName?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-sunken", className)}>
      {image ? (
        <Image
          src={image.src}
          alt={decorative ? "" : image.alt}
          fill
          sizes={sizes}
          preload={preload}
          style={
            image.position && !imageClassName
              ? { objectPosition: image.position }
              : undefined
          }
          className={cn(
            "object-cover",
            imageClassName,
            zoomOnHover &&
              "transition-transform duration-700 ease-standard group-hover:scale-[1.03]",
          )}
        />
      ) : (
        <div
          {...(decorative ? { "aria-hidden": true } : { role: "img", "aria-label": alt })}
          className="absolute inset-0 flex items-center justify-center bg-tile"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 32 32"
            className="size-8 text-foreground/15 sm:size-10"
          >
            <rect width="32" height="32" rx="4" fill="currentColor" />
            <path d="M10 7h13v4h-9v4h7v4h-7v6h-4z" className="fill-surface" />
          </svg>
          {label && (
            <span className="absolute bottom-3 left-3 text-sm font-medium text-muted">
              {label}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
