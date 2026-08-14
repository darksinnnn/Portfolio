/**
 * Parse a hex color string (#RRGGBB or #RGB) into [r, g, b] components.
 */
export function parseHex(hex: string): [number, number, number] {
  let h = hex.replace("#", "");
  if (h.length === 3) {
    h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  }
  const num = parseInt(h, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

/**
 * Convert [r, g, b] components back to a hex color string.
 */
export function toHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return (
    "#" +
    [clamp(r), clamp(g), clamp(b)]
      .map((c) => c.toString(16).padStart(2, "0"))
      .join("")
  );
}

/**
 * Linearly interpolate between two hex colors.
 * @param colorA - Starting hex color
 * @param colorB - Ending hex color
 * @param t - Interpolation factor (0 = colorA, 1 = colorB)
 * @returns Interpolated hex color string
 */
export function interpolateColor(colorA: string, colorB: string, t: number): string {
  const clamped = Math.max(0, Math.min(1, t));
  const [r1, g1, b1] = parseHex(colorA);
  const [r2, g2, b2] = parseHex(colorB);
  return toHex(
    r1 + (r2 - r1) * clamped,
    g1 + (g2 - g1) * clamped,
    b1 + (b2 - b1) * clamped
  );
}
