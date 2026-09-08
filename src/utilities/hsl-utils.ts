/**
 * Parses an HSL/HSLA string into normalised [hue, saturation, lightness, alpha]
 * values, where every component is in the 0..1 range. Alpha is `undefined` when
 * the source string did not specify one.
 */
export function hslDec2array(
  hslColorStr: string
): [number, number, number, number | undefined] {
  const [h, s, l, alpha] = hslColorStr
    .replace(/[%hsla()]/gi, " ")
    .trim()
    .split(/[,\s/]+/g);

  return [
    parseInt(h, 10) / 360,
    parseInt(s, 10) / 100,
    parseInt(l, 10) / 100,
    parseAlpha(alpha, hslColorStr),
  ];
}

/**
 * CSS allows alpha as either a 0-1 number (`/ 0.5`) or a percentage (`/ 50%`).
 * The stripped token loses its `%`, so check the raw string to tell them apart.
 */
function parseAlpha(token: string | undefined, source: string) {
  if (!token) return undefined;

  const value = parseFloat(token);
  if (Number.isNaN(value)) return undefined;

  const isPercentage = /\/\s*[\d.]+\s*%/.test(source);
  return isPercentage ? value / 100 : value;
}

export function isColorHsl(color: string): boolean {
  return /^hsl/i.test(color);
}

// https://stackoverflow.com/a/9493060
export function hsl2rgb(hsl: (number | undefined)[]) {
  const [h = 0, s = 0, l = 0, alpha] = hsl;
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  const rgb = [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  return alpha === undefined ? rgb : [...rgb, alpha];
}
