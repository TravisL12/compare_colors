import { format2hex } from "./hexadecimal-utils";

/**
 *
 * @param {string} color
 * @returns {boolean}
 */
export function isColorRgb(color) {
  return /^rgb/i.test(color);
}

/**
 * @param {string} rgb color string => rgb(200, 150, 0)
 * @return {array} [200, 150, 0]
 */
export function dec2array(rgbColorStr) {
  return rgbColorStr
    .replace(/[rgb()\s]/gi, "")
    .split(",")
    .map((num) => parseInt(num, 10));
}

/**
 *
 * @param {array | string}
 * array of ints ex: [210, 190, 5];
 * string ex: 'rgb(210, 190, 5)'
 */
export function dec2hex(rgbColor) {
  let color = rgbColor;
  if (typeof rgbColor === "string") {
    color = dec2array(color);
  }

  const hex = color
    .map((c) => {
      const num = Number(c);
      return `0${num.toString(16)}`.slice(-2);
    })
    .join("");

  return format2hex(hex);
}
