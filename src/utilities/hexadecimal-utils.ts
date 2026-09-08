import Color from "../models/color";
import { hsl2rgb, hslDec2array, isColorHsl } from "./hsl-utils";
import { dec2hex, isColorRgb } from "./rgb-utils";

/**
 * Splits a 6 or 8 digit hex string into [red, green, blue] channel values,
 * with a trailing 0-1 alpha only when the source carried one.
 */
export function hex2dec(hex: string): number[] {
  const channels = [
    parseInt(hex.slice(0, 2), 16),
    parseInt(hex.slice(2, 4), 16),
    parseInt(hex.slice(4, 6), 16),
  ];

  const alpha = hex.slice(6, 8);
  return alpha ? [...channels, hexAlphaToFloat(alpha)] : channels;
}

export function hexAlphaToFloat(hex: string): number {
  return Number((parseInt(hex, 16) / 255).toFixed(2));
}

export function floatToHexAlpha(decimal: number) {
  return `0${Number(Math.round(255 * decimal)).toString(16)}`.slice(-2);
}

export function hexAlpha(color: Color | string, decimal = 0.5): string {
  const colorObj = typeof color === "object" ? color : new Color(color);
  const percentHex = floatToHexAlpha(decimal);
  return `${colorObj.hexColor.slice(0, 6)}${percentHex}`;
}

/**
 * Normalises any supported colour notation to a bare uppercase hex string
 * (no leading `#`), expanding 3 and 4 digit shorthand along the way.
 */
export function format2hex(color: string): string {
  const hex = isColorRgb(color)
    ? dec2hex(color)
    : isColorHsl(color)
    ? dec2hex(hsl2rgb(hslDec2array(color)))
    : color;

  return expandShorthandHex(hex.replace(/['"#]/g, "").toUpperCase());
}

/** `#abc` -> `AABBCC`, `#abcd` -> `AABBCCDD` */
function expandShorthandHex(hex: string): string {
  if (hex.length !== 3 && hex.length !== 4) return hex;
  return hex
    .split("")
    .map((char) => char + char)
    .join("");
}
