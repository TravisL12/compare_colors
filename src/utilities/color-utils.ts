import Color from "../models/color";
import { browserColorsByName } from "../browserColorsList.ts";
import { hexAlpha } from "./hexadecimal-utils";
import { distanceChromatic } from "./distance-utils";
import { black, white } from "../components/App/App.style";
import type { MouseEvent } from "react";
const COPY_FADE_DELAY = 500;
const rgbRe = `rgba?\\(\\s*\\d{1,3}\\s*,\\s*\\d{1,3}\\s*,\\s*\\d{1,3}(?:\\s*,\\s*(?:0(?:\\.\\d+)?|1(?:\\.0+)?))?\\s*\\)`;
const hexRe = `#\\"?[a-f0-9]{6,8}\\"?`; // hex regex https://stackoverflow.com/questions/41258980/split-string-on-hex-colour
const hslRe = `hsl\\(\\s*\\d{1,3}\\s*,\\s*\\d{1,3}%\\s*,\\s*\\d{1,3}%\\s*\\)`;

const combinedRe = `${rgbRe}|${hexRe}|${hslRe}`;
export const highlightRegex = (nameVals: string[]) =>
  new RegExp(`(${combinedRe}|\\b${nameVals.join("\\b|\\b")})`, "gi");

export const matchRegex = new RegExp(`(${combinedRe})`, "gi");

export function matchColors(colorInput: string): { color: string }[] {
  const browserColors = Object.keys(browserColorsByName)
    .filter((color) => colorInput.match(color))
    .map((name) => ({ name, color: browserColorsByName[name] }));

  const regexMatches = (colorInput.match(matchRegex) || []).map((color) => ({
    color,
  }));
  return regexMatches.concat(browserColors);
}

export function copyText(event: MouseEvent) {
  const { target } = event;
  const { textContent, style } = target as HTMLElement;
  const color = new Color(textContent as string);

  // Briefly have the element that was clicked glow with its color
  // to confirm the string has been copied
  style.backgroundColor = color.alpha
    ? color.hexString
    : `#${hexAlpha(color, 0.9)}`;
  setTimeout(() => {
    style.backgroundColor = "";
  }, COPY_FADE_DELAY);

  // Can only copy text from an HTMLInputElement
  // Create an input, add the text to copy and remove input element
  const inputEl = document.createElement("input");
  inputEl.value = textContent || "";
  document.body.appendChild(inputEl);
  inputEl.select();
  document.execCommand("copy");
  document.body.removeChild(inputEl);
}

export function getDifferenceColor(color: Color | string) {
  const colorObj = typeof color === "object" ? color : new Color(color);
  const dist = colorObj ? distanceChromatic(colorObj) : 0;
  return dist > 300 ? black : white;
}
