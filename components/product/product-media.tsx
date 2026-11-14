import { MediaFrame } from "@/components/ui/media-frame";
import { cn } from "@/lib/cn";
import type { ProductImage } from "@/lib/types";

/**
 * Product photography in the catalog's 4:5 portrait ratio. Until a product
 * has a real photo of the exact item, it shows a dashed outline of the same
 * size, so the layout does not change when photos arrive.
 */
export function ProductMedia({
  image,
  name,
  sizes,
  note = "Photo after sampling",
  preload = false,
  decorative = false,
  className,
}: {
  image?: ProductImage;
  name: string;
  sizes: string;
  note?: string;
  preload?: boolean;
  decorative?: boolean;
  className?: string;
}) {
  return (
    <MediaFrame
      image={image}
      alt={`${name}: product photo coming soon`}
      sizes={sizes}
      note={note}
      preload={preload}
      decorative={decorative}
      className={cn("aspect-[4/5]", className)}
    />
  );
}
