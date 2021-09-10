import Color from "../models/color";
import { browserColorsByName } from "../browserColorsList";
import { hexAlpha } from "./hexadecimal-utils";
import { distanceChromatic } from "./distance-utils";
import { black, white } from "../components/App/App.style";
const COPY_FADE_DELAY = 500;
const rgbRe = `rgb\\(\\s*\\d{1,3}\\s*,\\s*\\d{1,3}\\s*,\\s*\\d{1,3}\\s*\\)`;
const hexRe = `#\\"?[a-f0-9]{6}\\"?`; // hex regex https://stackoverflow.com/questions/41258980/split-string-on-hex-colour
const hslRe = `hsl\\(\\s*\\d{1,3}\\s*,\\s*\\d{1,3}%\\s*,\\s*\\d{1,3}%\\s*\\)`;
export const highlightRegex = (nameVals) =>
  new RegExp(`(${rgbRe}|${hexRe}|${hslRe}|${nameVals.join("|")})`, "gi");

export const matchRegex = new RegExp(`(${rgbRe}|${hexRe}|${hslRe})`, "gi");

/**
 * matchColors - Parse rgb(X, X, X) or #123456 (hex) patterns
 * @param {string} colorInput
 * @return {array} array of matched values
 */
export function matchColors(colorInput) {
  const browserColors = Object.keys(browserColorsByName)
    .filter((color) => {
      return colorInput.match(color);
    })
    .map((name) => ({ name, color: browserColorsByName[name] }));

  const regexMatches = (colorInput.match(matchRegex) || []).map((color) => ({
    color,
  }));
  return regexMatches.concat(browserColors);
}

export function copyText(event) {
  const { target } = event;
  const { textContent } = target;
  const color = new Color(textContent);

  // Briefly have the element that was clicked glow with its color
  // to confirm the string has been copied
  target.style.backgroundColor = `#${hexAlpha(color, 0.9)}`;
  setTimeout(() => {
    target.style.backgroundColor = null;
  }, COPY_FADE_DELAY);

  // Can only copy text from an HTMLInputElement
  // Create an input, add the text to copy and remove input element
  const inputEl = document.createElement("input");
  inputEl.value = textContent;
  document.body.appendChild(inputEl);
  inputEl.select();
  document.execCommand("copy");
  document.body.removeChild(inputEl);
}

export function getDifferenceColor(color) {
  const colorObj = typeof color === "object" ? color : new Color(color);
  const dist = colorObj ? distanceChromatic(colorObj) : 0;
  return dist > 300 ? black : white;
}
