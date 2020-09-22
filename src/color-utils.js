import Color from "./models/color";
import { browserColorsNameKey } from "./browserColorsList";

export const matchRegex = new RegExp(
  /(rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)|#([0-9]|[a-f]){6})/,
  "gi"
);

const groupColors = (text) => {
  let idx = 0;
  let count = 0;
  const BREAK_LOOP = 5000;
  const groups = [];
  const re = new RegExp(
    /(?<= const | var | let )([^\s=]+)\s?=\s?["']?(rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)|#([0-9]|[a-f]){6})["']?/,
    "i"
  );

  while (count < BREAK_LOOP && idx >= 0) {
    const match = text.slice(idx).match(re);
    if (match && match.index) {
      groups.push({ name: match[1], color: match[2] });
      idx = match.index + idx;
    } else {
      idx = -1;
    }
    count++;
  }
  return groups;
};

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
function dec2hex(rgbColor) {
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

/**
 *
 * @param {string} hex 6 character hex string w/o # ex: 'FF09A4'
 */
export function hex2dec(hex) {
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
export function hexAlpha(color, percent = 0.5) {
  const percentHex = `0${Number(100 * percent).toString(16)}`.slice(-2);
  return `${color.hexColor}${percentHex}`;
}

/**
 * matchColors - Parse rgb(X, X, X) or #123456 (hex) patterns
 * @param {string} colorInput
 * @return {array} array of matched values
 */
export function matchColors(colorInput) {
  const groups = groupColors(colorInput);
  const groupedColors = groups.map(({ color }) => color);

  const browserColors = Object.keys(browserColorsNameKey)
    .filter((color) => {
      return colorInput.match(color);
    })
    .map((name) => ({ name, color: browserColorsNameKey[name] }))
    .filter(({ color }) => !groupedColors.includes(color));

  const regexMatches = (
    (colorInput.match(matchRegex) || []).map((color) => ({ color })) || []
  ).filter(({ color }) => !groupedColors.includes(color));

  return regexMatches.concat(browserColors).concat(groups);
}

export function format2hex(color) {
  const hex = isColorRgb(color) ? dec2hex(color) : color;
  return hex.replace(/['#]/gi, "").toUpperCase();
}

export function copyText(event) {
  const { target } = event;
  const { textContent } = target;
  const color = new Color(textContent);

  // Briefly have the element that was clicked glow with its color
  // to confirm the string has been copied
  target.style.backgroundColor = `#${hexAlpha(color, 0.75)}`;
  setTimeout(() => {
    target.style.backgroundColor = null;
  }, 250);

  // Can only copy text from an HTMLInputElement
  // Create an input, add the text to copy and remove input element
  const inputEl = document.createElement("input");
  inputEl.value = textContent;
  document.body.appendChild(inputEl);
  inputEl.select();
  document.execCommand("copy");
  document.body.removeChild(inputEl);
}
