import Color from "../models/color";
import { hsl2rgb, hslDec2array, isColorHsl } from "./hsl-utils";
import { dec2hex, isColorRgb } from "./rgb-utils";

export function hex2dec(hex: string): number[] {
  const split = [
    hex.slice(0, 2),
    hex.slice(2, 4),
    hex.slice(4, 6),
    hex.slice(6),
  ];

  return split.map((c, idx) => {
    return idx === 3 && c ? hexAlphaToFloat(c) : parseInt(c, 16);
  });
}

export function hexAlphaToFloat(hex: string): number {
  return Number((parseInt(hex, 16) / 255).toFixed(1));
}

export function floatToHexAlpha(decimal: number) {
  return `0${Number(Math.round(255 * decimal)).toString(16)}`.slice(-2);
}

export function hexAlpha(color: Color | string, decimal = 0.5): string {
  const colorObj = typeof color === "object" ? color : new Color(color);
  const percentHex = floatToHexAlpha(decimal);
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
