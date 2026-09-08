import { floatToHexAlpha, format2hex } from "./hexadecimal-utils";

export function isColorRgb(color: string): boolean {
  return /^rgba?/i.test(color);
}

export function dec2array(rgbColorStr: string): number[] {
  return rgbColorStr
    .replace(/[rgba()\s]/gi, "")
    .split(",")
    .map((num) => parseFloat(num));
}

export function dec2hex(rgbColor: string | number[]): string {
  const channels =
    typeof rgbColor === "string" ? dec2array(rgbColor) : rgbColor;

  const hex = channels
    .map((channel, idx) => {
      const num = Number(channel);
      return idx === 3
        ? floatToHexAlpha(num)
        : `0${Math.round(num).toString(16)}`.slice(-2);
    })
    .join("");

  return format2hex(hex);
}
