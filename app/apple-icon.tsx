import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon: the FORGELINE "F" monogram, matching app/icon.svg. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <svg width="180" height="180" viewBox="0 0 32 32">
        <rect width="32" height="32" fill="#111111" />
        <path
          fill="#ffffff"
          d="M9.5 7h13v4.5H14v3.5h7.5v4.5H14V25H9.5z"
        />
      </svg>
    ),
    size,
  );
}
