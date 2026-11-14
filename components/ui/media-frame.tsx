import Image from "next/image";
import { cn } from "@/lib/cn";
import type { ProductImage } from "@/lib/types";

/**
 * Responsive media frame with a fixed aspect ratio (pass it via className,
 * e.g. "aspect-[4/5]"). Renders an optimized next/image when a photo is
 * available. Without one it renders a dashed outline with a short note, the
 * shadow-board way of marking something that is not there yet. The frame
 * reserves space in both cases, so nothing shifts while loading.
 *
 * Loading: lazy by default. `preload` is for a page's single LCP image.
 * There is deliberately no "eager" option: React 19 emits a preload hint for
 * every server-rendered <img> that is not lazy, so eager would mean preload.
 *
 * Cropping: `image.position` sets the default object-position; pass
 * responsive `object-[…]` utilities via `imageClassName` to override it per
 * breakpoint. Set `decorative` when surrounding text already names the subject.
 * Use `tone="board"` when the frame sits on the stone board.
 */
export function MediaFrame({
  image,
  alt,
  sizes,
  note = "Photo coming soon",
  tone = "page",
  preload = false,
  decorative = false,
  imageClassName,
  className,
}: {
  image?: ProductImage;
  /** Accessible description used for the outline when there is no image. */
  alt: string;
  sizes: string;
  /** Short text shown inside the outline when there is no image. */
  note?: string;
  tone?: "page" | "board";
  preload?: boolean;
  decorative?: boolean;
  imageClassName?: string;
  className?: string;
}) {
  if (!image) {
    return (
      <div
        {...(decorative ? { "aria-hidden": true } : { role: "img", "aria-label": alt })}
        className={cn(
          "flex items-center justify-center border-2 border-dashed p-4 text-center text-sm leading-snug",
          tone === "board"
            ? "border-foreground/60 text-foreground"
            : "border-outline text-muted",
          className,
        )}
      >
        {note}
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden bg-surface", className)}>
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
        className={cn("object-cover", imageClassName)}
      />
    </div>
  );
}
