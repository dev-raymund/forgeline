import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon: the FORGELINE "F" monogram, matching app/icon.svg. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <svg width="180" height="180" viewBox="0 0 32 32">
        <rect width="32" height="32" fill="#111111" />
        <path fill="#ffffff" d="M10 7h13v4h-9v4h7v4h-7v6h-4z" />
      </svg>
    ),
    size,
  );
}
