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
  let color = rgbColor;
  if (typeof rgbColor === "string") {
    color = dec2array(color as string);
  }

  const hex = (color as number[])
    .map((c, idx) => {
      const num = Number(c);
      return idx === 3
        ? floatToHexAlpha(num)
        : `0${num.toString(16)}`.slice(-2);
    })
    .join("");

  return format2hex(hex);
}
