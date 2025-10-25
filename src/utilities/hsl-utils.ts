/**
 * @param {string} hsl color string => hsl(150, 80%, 90%)
 * @return {array} [200, 0.5, 0.3]
 */
export function hslDec2array(hslColorStr: string) {
  let [h, s, l]: (string | number | undefined)[] = hslColorStr
    .replace(/[%hsl()\s]/gi, "")
    .split(",");
  h = parseInt(h, 10) / 360;
  s = parseInt(s, 10) / 100;
  l = parseInt(l, 10) / 100;

  return [h, s, l];
}

export function isColorHsl(color: string): boolean {
  return /^hsl/i.test(color);
}

// https://stackoverflow.com/a/9493060
export function hsl2rgb(hsl: (string | number | undefined)[]) {
  const [h, s, l] = hsl;
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = function hue2rgb(p, q, t) {
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

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
