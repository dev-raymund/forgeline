import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { socialImage } from "@/lib/metadata";
import { site } from "@/lib/site";

/**
 * Site-wide social sharing image (1200x630), generated once at build time.
 * Fonts are local static Geist files (SIL OFL, see assets/fonts/OFL.txt).
 */
export const alt = socialImage.alt;
export const size = { width: socialImage.width, height: socialImage.height };
export const contentType = "image/png";

const fontDir = join(process.cwd(), "assets/fonts");
const [geistRegular, geistBold] = await Promise.all([
  readFile(join(fontDir, "Geist-Regular.ttf")),
  readFile(join(fontDir, "Geist-Bold.ttf")),
]);

const collections = ["Gear", "Home", "Tech", "Active", "Tools"];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#111111",
          color: "#ffffff",
          fontFamily: "Geist",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontSize: 40,
              fontWeight: 700,
              letterSpacing: 8,
              textTransform: "uppercase",
            }}
          >
            Forgeline
          </div>
          <div
            style={{
              fontSize: 20,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#9a9a9a",
            }}
          >
            Everyday essentials
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 116,
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: -4.5,
            }}
          >
            {site.tagline}
          </div>
          <div style={{ marginTop: 28, fontSize: 38, color: "#b5b5b5" }}>
            {site.message}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 28,
            borderTop: "1px solid #333333",
            fontSize: 24,
            color: "#9a9a9a",
          }}
        >
          <div style={{ display: "flex", gap: 28 }}>
            {collections.map((name) => (
              <div key={name}>{name}</div>
            ))}
          </div>
          <div>{new URL(site.url).host}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: geistRegular, style: "normal", weight: 400 },
        { name: "Geist", data: geistBold, style: "normal", weight: 700 },
      ],
    },
  );
}
