import Image from "next/image";
import { cn } from "@/lib/cn";
import type { ProductImage } from "@/lib/types";

/**
 * Responsive media frame with a fixed aspect ratio (pass it via className,
 * e.g. "aspect-[4/5]"). Renders an optimized next/image when a photo is
 * available, otherwise a quiet branded placeholder. The frame reserves space
 * in both cases, so nothing shifts while loading.
 *
 * Images lazy-load by default; pass `preload` only for the single
 * above-the-fold image that is likely to be the LCP element.
 * Set `decorative` when surrounding text already names the subject.
 */
export function MediaFrame({
  image,
  alt,
  sizes,
  label,
  preload = false,
  decorative = false,
  zoomOnHover = false,
  position = "center",
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
  /** CSS object-position for responsive cropping. */
  position?: string;
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
          style={{ objectPosition: position }}
          className={cn(
            "object-cover",
            zoomOnHover &&
              "transition-transform duration-700 ease-[var(--ease-standard)] group-hover:scale-[1.03]",
          )}
        />
      ) : (
        <div
          {...(decorative ? { "aria-hidden": true } : { role: "img", "aria-label": alt })}
          className="absolute inset-0 flex items-center justify-center bg-[repeating-linear-gradient(135deg,transparent_0_14px,rgb(167_166_157/0.12)_14px_15px)]"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 32 32"
            className="size-8 text-stone/70 sm:size-10"
          >
            <rect width="32" height="32" rx="4" fill="currentColor" />
            <path d="M10 7h13v4h-9v4h7v4h-7v6h-4z" className="fill-sunken" />
          </svg>
          {label && (
            <span className="absolute bottom-3 left-3 font-mono text-eyebrow uppercase text-muted">
              {label}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
