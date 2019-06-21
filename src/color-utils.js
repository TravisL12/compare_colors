import { rgb2lab, deltaE } from "./deltaDistance";
import Color from "./models/color";

const matchRegex = new RegExp(
  /(rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)|#([0-9]|[a-f]){6})/,
  "gi"
);

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
    .map(num => parseInt(num, 10));
}

/**
 *
 * @param {array | string}
 * array of ints ex: [210, 190, 5];
 * string ex: 'rgb(210, 190, 5)'
 */
function dec2hex(rgbColor) {
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
  const colorObj = new Color(color, id);

  return {
    id: colorObj.id,
    rgbColor: colorObj.rgbColor,
    hexColor: colorObj.hexColor,
    hslColor: colorObj.hslColor
  };
}

/**
 * Based on calculation from:
 * https://en.wikipedia.org/wiki/Color_difference
 * @param {string} compare 6 character hex string w/o # ex: 'FF09A4'
 * @param {string} target 6 character hex string w/o # ex: 'FF09A4'
 * @return {float} returns distance between compare and target hex values
 */
export function distanceDelta(compare, target = "000000") {
  const labA = rgb2lab(hex2dec(target));
  const labB = rgb2lab(compare);
  return deltaE(labA, labB);
}

/**
 *
 * @param {string} compare 6 character hex string w/o # ex: 'FF09A4'
 * @param {string} target 6 character hex string w/o # ex: 'FF09A4'
 * @return {float} returns distance between compare and target hex values
 */
export function distanceChromatic(compare = [0, 0, 0], target = "000000") {
  const cDec = compare;
  const tDec = hex2dec(target);

  const red = Math.pow(tDec[0] - cDec[0], 2);
  const green = Math.pow(tDec[1] - cDec[1], 2);
  const blue = Math.pow(tDec[2] - cDec[2], 2);

  return Math.sqrt(red + green + blue);
}

/**
 * Convert hex or decimal string to a hexadecimal alpha
 * @param {string} color
 * @param {float} percent opacity percentage
 */
export function hexAlpha(color, percent = 0.5) {
  const percentHex = `0${Number(100 * percent).toString(16)}`.slice(-2);
  return `${format2hex(color)}${percentHex}`;
}

/**
 * matchColors - Parse rgb(X, X, X) or #123456 (hex) patterns
 * @param {string} colorInput
 * @return {array} array of matched values
 */
export function matchColors(colorInput) {
  return colorInput.match(matchRegex);
}

export function format2hex(color) {
  const hex = isColorRgb(color) ? dec2hex(color) : color;
  return hex.replace(/['#]/gi, "").toUpperCase();
}
