import type { ReactNode } from "react";
import { MediaFrame } from "@/components/ui/media-frame";
import { cn } from "@/lib/cn";
import type { ProductImage } from "@/lib/types";

/**
 * A photo hung on the board: a white frame with an optional tag clipped to
 * its bottom edge. Give it a size or an aspect ratio through className.
 * Leave room below it (about 1.25rem) for the tag.
 */
export function HungPhoto({
  image,
  alt,
  sizes,
  tag,
  decorative = false,
  preload = false,
  imageClassName,
  className,
}: {
  image?: ProductImage;
  alt: string;
  sizes: string;
  tag?: ReactNode;
  decorative?: boolean;
  preload?: boolean;
  imageClassName?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative bg-white p-1.5", className)}>
      <MediaFrame
        image={image}
        alt={alt}
        sizes={sizes}
        tone="board"
        decorative={decorative}
        preload={preload}
        imageClassName={imageClassName}
        className="size-full"
      />
      {tag && <div className="absolute -bottom-[1.0625rem] left-3.5">{tag}</div>}
    </div>
  );
}
