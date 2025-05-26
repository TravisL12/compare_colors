import Color from "../models/color";
import { hsl2rgb, hslDec2array, isColorHsl } from "./hsl-utils";
import { dec2hex, isColorRgb } from "./rgb-utils";

/**
 *
 * @param {string} hex 6 character hex string w/o # ex: 'FF09A4'
 */
export function hex2dec(hex: string): number[] {
  const split = [hex.slice(0, 2), hex.slice(2, 4), hex.slice(4, 6)];

  return split.map((c) => {
    return parseInt(c, 16);
  });
}

/**
 * Convert hex or decimal string to a hexadecimal alpha
 * @param {string} color
 * @param {float} percent opacity percentage
 */
export function hexAlpha(color: string, percent = 0.5) {
  const colorObj = typeof color === "object" ? color : new Color(color);
  const percentHex = `0${Number(Math.round(255 * percent)).toString(16)}`.slice(
    -2
  );
  return `${colorObj.hexColor}${percentHex}`;
}

export function format2hex(color: string): string {
  const hex = isColorRgb(color)
    ? dec2hex(color)
    : isColorHsl(color)
    ? dec2hex(hsl2rgb(hslDec2array(color)))
    : color;
  return hex.replace(/['#]/gi, "").toUpperCase();
}
