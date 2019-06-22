import Color from "./models/color";

// Found at: https://github.com/antimatter15/rgb-lab/blob/master/color.js
export function rgb2lab(rgb) {
  let r = rgb[0] / 255;
  let g = rgb[1] / 255;
  let b = rgb[2] / 255;
  let x, y, z;

  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.0;
  z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

  x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
  y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
  z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;

  return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
}

// calculate the perceptual distance between colors in CIELAB (Delta-E 94)
// https://github.com/THEjoezack/ColorMine/blob/master/ColorMine/ColorSpaces/Comparisons/Cie94Comparison.cs

export function deltaE(labA, labB) {
  let deltaL = labA[0] - labB[0];
  let deltaA = labA[1] - labB[1];
  let deltaB = labA[2] - labB[2];

  let c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
  let c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);

  let deltaC = c1 - c2;
  let deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;

  deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);

  let sc = 1.0 + 0.045 * c1;
  let sh = 1.0 + 0.015 * c1;

  let deltaLKlsl = deltaL / 1.0;
  let deltaCkcsc = deltaC / sc;
  let deltaHkhsh = deltaH / sh;

  let i =
    deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;

  return i < 0 ? 0 : Math.sqrt(i);
}

/**
 * Based on calculation from:
 * https://en.wikipedia.org/wiki/Color_difference
 * @param {Color} compare
 * @param {Color} target
 * @return {float} returns distance between compare and target hex values
 */
export function distanceDelta(compare, target = new Color()) {
  const labA = rgb2lab(target.rgbColor);
  const labB = rgb2lab(compare.rgbColor);
  return deltaE(labA, labB);
}

/**
 *
 * @param {Color} compare
 * @param {Color} target
 * @return {float} returns distance between compare and target hex values
 */
export function distanceChromatic(compare, target = new Color()) {
  const cDec = compare.rgbColor;
  const tDec = target.rgbColor;

  const red = Math.pow(tDec[0] - cDec[0], 2);
  const green = Math.pow(tDec[1] - cDec[1], 2);
  const blue = Math.pow(tDec[2] - cDec[2], 2);

  return Math.sqrt(red + green + blue);
}
