#!/usr/bin/env node
/**
 * Generates app/favicon.ico: the FORGELINE "F" monogram at 16, 32 and 48 px,
 * stored as PNG images inside an ICO container. No dependencies.
 *
 * The geometry matches app/icon.svg and app/apple-icon.tsx and is snapped to
 * whole pixels at each size so the small icons stay crisp.
 *
 * Usage: node scripts/generate-favicon.mjs
 */
import { Buffer } from "node:buffer";
import { writeFileSync } from "node:fs";
import { crc32, deflateSync } from "node:zlib";

const INK = [0x11, 0x11, 0x11];
const WHITE = [0xff, 0xff, 0xff];
const SAMPLES = 8; // Supersampling per axis, for anti-aliased corners.

/** Pixel-snapped geometry per size: corner radius and the F's rectangles. */
const SIZES = {
  16: { radius: 2, rects: [[5, 3, 7, 13], [5, 3, 12, 5], [5, 7, 11, 9]] },
  32: { radius: 4, rects: [[10, 7, 14, 25], [10, 7, 23, 11], [10, 15, 21, 19]] },
  48: { radius: 6, rects: [[15, 11, 21, 37], [15, 11, 35, 17], [15, 23, 32, 29]] },
};

function insideRoundedSquare(x, y, size, r) {
  if (x < 0 || y < 0 || x > size || y > size) return false;
  const cx = x < r ? r : x > size - r ? size - r : x;
  const cy = y < r ? r : y > size - r ? size - r : y;
  return (x - cx) ** 2 + (y - cy) ** 2 <= r * r;
}

function insideMonogram(x, y, rects) {
  return rects.some(([x0, y0, x1, y1]) => x >= x0 && x < x1 && y >= y0 && y < y1);
}

function renderRgba(size) {
  const { radius, rects } = SIZES[size];
  const pixels = Buffer.alloc(size * size * 4);
  const total = SAMPLES * SAMPLES;
  for (let py = 0; py < size; py += 1) {
    for (let px = 0; px < size; px += 1) {
      let background = 0;
      let mark = 0;
      for (let sy = 0; sy < SAMPLES; sy += 1) {
        for (let sx = 0; sx < SAMPLES; sx += 1) {
          const x = px + (sx + 0.5) / SAMPLES;
          const y = py + (sy + 0.5) / SAMPLES;
          if (!insideRoundedSquare(x, y, size, radius)) continue;
          background += 1;
          if (insideMonogram(x, y, rects)) mark += 1;
        }
      }
      const offset = (py * size + px) * 4;
      if (background === 0) continue; // Fully transparent.
      const t = mark / background; // Share of white within the covered area.
      for (let c = 0; c < 3; c += 1) {
        pixels[offset + c] = Math.round(INK[c] + (WHITE[c] - INK[c]) * t);
      }
      pixels[offset + 3] = Math.round((background / total) * 255);
    }
  }
  return pixels;
}

function pngChunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "latin1"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([length, body, crc]);
}

function encodePng(size, rgba) {
  const header = Buffer.alloc(13);
  header.writeUInt32BE(size, 0);
  header.writeUInt32BE(size, 4);
  header[8] = 8; // Bit depth.
  header[9] = 6; // Color type: RGBA.
  const rows = [];
  for (let y = 0; y < size; y += 1) {
    rows.push(Buffer.from([0]), rgba.subarray(y * size * 4, (y + 1) * size * 4));
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    pngChunk("IHDR", header),
    pngChunk("IDAT", deflateSync(Buffer.concat(rows), { level: 9 })),
    pngChunk("IEND", Buffer.alloc(0)),
  ]);
}

function encodeIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved.
  header.writeUInt16LE(1, 2); // Type: icon.
  header.writeUInt16LE(images.length, 4);
  let offset = 6 + images.length * 16;
  const entries = images.map(({ size, png }) => {
    const entry = Buffer.alloc(16);
    entry[0] = size; // Width.
    entry[1] = size; // Height.
    entry.writeUInt16LE(1, 4); // Color planes.
    entry.writeUInt16LE(32, 6); // Bits per pixel.
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += png.length;
    return entry;
  });
  return Buffer.concat([header, ...entries, ...images.map(({ png }) => png)]);
}

const images = Object.keys(SIZES)
  .map(Number)
  .map((size) => ({ size, png: encodePng(size, renderRgba(size)) }));
const output = new URL("../app/favicon.ico", import.meta.url);
writeFileSync(output, encodeIco(images));
console.log(`Wrote ${output.pathname} (${images.map((i) => `${i.size}px`).join(", ")})`);
