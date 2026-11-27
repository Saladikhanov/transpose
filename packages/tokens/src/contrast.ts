/** Parses a `#rrggbb` color into its red, green and blue channels (0–255). */
export function parseHex(hex: string): [number, number, number] {
  const match = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex);
  if (!match) throw new Error(`Invalid color "${hex}". Use #rrggbb.`);
  const [, r, g, b] = match;
  return [Number.parseInt(r ?? '', 16), Number.parseInt(g ?? '', 16), Number.parseInt(b ?? '', 16)];
}

/** Returns the WCAG 2.x relative luminance of a `#rrggbb` color (0 = black, 1 = white). */
export function relativeLuminance(hex: string): number {
  const [r, g, b] = parseHex(hex).map((channel) => {
    const c = channel / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  }) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Returns the WCAG 2.x contrast ratio between two `#rrggbb` colors, from 1 to 21. */
export function contrastRatio(foreground: string, background: string): number {
  const a = relativeLuminance(foreground);
  const b = relativeLuminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}
