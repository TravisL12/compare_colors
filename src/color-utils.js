import { rgb2lab, deltaE } from "./deltaDistance";

export function isColorRgb(color) {
  return /^rgb/i.test(color);
}

export function hexAlpha(color, percent = 0.5) {
  const percentHex = parseInt(percent * 100, 16);
  return `${format2hex(color)}${percentHex}`;
}

/**
 * @param {string} rgb color string => rgb(200, 150, 0)
 * @return {array} [200, 150, 0]
 */
function dec2array(rgbColorStr) {
  return rgbColorStr
    .replace(/[rgb()\s]/gi, "")
    .split(",")
    .map(num => parseInt(num, 10));
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
    .map(c => {
      const num = Number(c);
      return `0${num.toString(16)}`.slice(-2);
    })
    .join("");

  return format2hex(hex);
}

export function format2hex(color) {
  const hex = isColorRgb(color) ? dec2hex(color) : color;
  return hex.replace(/['#]/gi, "").toUpperCase();
}

/**
 *
 * @param {string} hex 6 character hex string w/o # ex: 'FF09A4'
 */
export function hex2dec(hex) {
  const split = [hex.slice(0, 2), hex.slice(2, 4), hex.slice(4, 6)];

  return split.map(c => {
    return parseInt(c, 16);
  });
}

/**
 * createColor - produce object that has RGB and hexadecimal
 * @param {string} color - rgba(200,150,0) or #ff00f0 value
 * @return {object} colorObj:
 * example:
 * {
 *    rgbColor: [200, 150, 0],
 *    hexColor: #C89600
 * }
 */
export function createColor(color, id = null) {
  let rgbColor;
  let hexColor;

  if (isColorRgb(color)) {
    rgbColor = dec2array(color);
    hexColor = dec2hex(rgbColor);
  } else {
    hexColor = format2hex(color);
    rgbColor = hex2dec(hexColor);
  }

  return { id, rgbColor, hexColor };
}

/**
 * Based on calculation from:
 * https://en.wikipedia.org/wiki/Color_difference
 * @param {string} compare 6 character hex string w/o # ex: 'FF09A4'
 * @param {string} target 6 character hex string w/o # ex: 'FF09A4'
 * @return {float} returns distance between compare and target hex values
 */
export function distance(compare, target = "000000") {
  const labA = rgb2lab(hex2dec(target));
  const labB = rgb2lab(compare);
  return deltaE(labA, labB);
}
