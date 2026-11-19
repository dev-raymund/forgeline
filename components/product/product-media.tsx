import { MediaFrame } from "@/components/ui/media-frame";
import { cn } from "@/lib/cn";
import type { ProductImage } from "@/lib/types";

/**
 * Product photography in the catalog's 4:5 portrait ratio. Wraps MediaFrame
 * so every product surface (cards, detail page, cart) crops consistently.
 */
export function ProductMedia({
  image,
  name,
  label,
  sizes,
  preload = false,
  decorative = false,
  zoomOnHover = false,
  className,
}: {
  image?: ProductImage;
  name: string;
  label?: string;
  sizes: string;
  preload?: boolean;
  decorative?: boolean;
  zoomOnHover?: boolean;
  className?: string;
}) {
  return (
    <MediaFrame
      image={image}
      alt={`${name}: product photo coming soon`}
      sizes={sizes}
      label={label}
      preload={preload}
      decorative={decorative}
      zoomOnHover={zoomOnHover}
      className={cn("aspect-[4/5]", className)}
    />
  );
}
