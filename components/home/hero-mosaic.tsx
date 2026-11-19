import Image from "next/image";
import type { ProductImage } from "@/lib/types";

/**
 * The hero photograph cut into staggered rounded tiles, after the portrait
 * mosaic on the owner's portfolio. Every tile renders the same source with
 * the same `sizes`, so the browser downloads one file; each tile shows its
 * slice by offsetting a full-size copy inside an overflow-hidden frame.
 * Tiles are positioned in percentages of a 2:1 box (see TILES).
 */
const TILES = [
  { x: 0, y: 9, w: 24, h: 82 },
  { x: 25.5, y: 0, w: 24, h: 58 },
  { x: 25.5, y: 61, w: 24, h: 39 },
  { x: 51, y: 13, w: 24, h: 87 },
  { x: 76.5, y: 0, w: 23.5, h: 44 },
  { x: 76.5, y: 47, w: 23.5, h: 45 },
] as const;

export function HeroMosaic({
  image,
  sizes,
  preload = false,
}: {
  image: ProductImage;
  sizes: string;
  preload?: boolean;
}) {
  return (
    <div role="img" aria-label={image.alt} className="relative aspect-[2/1]">
      {TILES.map((tile, index) => (
        <div
          key={index}
          data-tile
          className="absolute overflow-hidden rounded-lg bg-tile shadow-[0_24px_48px_-28px_rgb(16_18_28/0.38)]"
          style={{
            left: `${tile.x}%`,
            top: `${tile.y}%`,
            width: `${tile.w}%`,
            height: `${tile.h}%`,
          }}
        >
          <div
            className="absolute"
            style={{
              left: `${(-tile.x / tile.w) * 100}%`,
              top: `${(-tile.y / tile.h) * 100}%`,
              width: `${(100 / tile.w) * 100}%`,
              height: `${(100 / tile.h) * 100}%`,
            }}
          >
            <Image
              src={image.src}
              alt=""
              fill
              sizes={sizes}
              preload={preload && index === 0}
              className="object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
