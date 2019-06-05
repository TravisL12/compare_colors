import { rgb2lab, deltaE } from "./deltaDistance";

/**
 * @param {string} rgb color string => rgb(200, 150, 0)
 * @return {array} [200, 150, 0]
 */
function dec2arrayValue(rgbColorStr) {
  return rgbColorStr
    .replace(/[rgb()\s]/gi, "")
    .split(",")
    .map(num => parseInt(num, 10));
}

/**
 *
 * @param {array} array of ints ex: [210, 190, 5];
 */
function dec2hex(rgbColor) {
  return rgbColor
    .map(c => {
      const num = Number(c);
      return `0${num.toString(16)}`.slice(-2);
    })
    .join("");
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
export function createColor(color) {
  const isRgb = /^rgb/.test(color);
  const colorObj = {};

  if (isRgb) {
    colorObj.rgbColor = dec2arrayValue(color);
    colorObj.hexColor = dec2hex(colorObj.rgbColor);
  } else {
    colorObj.hexColor = color.replace(/['#]/gi, "");
    colorObj.rgbColor = hex2dec(colorObj.hexColor);
  }

  return colorObj;
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
