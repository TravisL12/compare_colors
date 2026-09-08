import Color from "../models/color";
import { browserColorsByName } from "../browserColorsList.ts";
import { hexAlpha } from "./hexadecimal-utils";
import { black, white } from "../components/App/App.style";

const COPY_FADE_DELAY = 500;

const rgbRe = `rgba?\\(\\s*\\d{1,3}\\s*,\\s*\\d{1,3}\\s*,\\s*\\d{1,3}(?:\\s*,\\s*(?:0(?:\\.\\d+)?|1(?:\\.0+)?))?\\s*\\)`;
// hex regex https://stackoverflow.com/questions/41258980/split-string-on-hex-colour
const hexRe = `#"?(?:[a-f0-9]{8}|[a-f0-9]{6}|[a-f0-9]{4}|[a-f0-9]{3})(?![a-f0-9])"?`;
const hslRe = `hsla?\\s*\\(\\s*\\d{1,3}\\s*(?:,|\\s)\\s*\\d{1,3}%\\s*(?:,|\\s)\\s*\\d{1,3}%\\s*(?:(?:,|\\/)\\s*[\\d.]{1,4}%?)?\\s*\\)`;

const combinedRe = `${rgbRe}|${hexRe}|${hslRe}`;

const browserColorNames = Object.keys(browserColorsByName);

/**
 * Builds the splitter used to slice raw text into colour and non-colour runs.
 *
 * Longer names are listed first so that alternation never settles for a prefix
 * (`green` where `greenyellow` was meant). A fresh instance is returned on every
 * call: these are `/g` regexes, and sharing one across calls would leak
 * `lastIndex` between them.
 */
export const highlightRegex = (nameVals: string[]) => {
  const names = [...nameVals]
    .sort((a, b) => b.length - a.length)
    .map((name) => `\\b${name}\\b`)
    .join("|");

  return new RegExp(`(${combinedRe}${names ? `|${names}` : ""})`, "gi");
};

/**
 * Non-global on purpose. `.test()` on a `/g` regex advances `lastIndex`, so a
 * shared global instance returns alternating results for the same input.
 */
const matchRegex = new RegExp(`^(?:${combinedRe})$`, "i");

export function isColorValue(text: string): boolean {
  return matchRegex.test(text.trim());
}

export function matchColors(
  colorInput: string
): { color: string; name?: string }[] {
  const lowered = colorInput.toLowerCase();

  const browserColors = browserColorNames
    .filter((name) => new RegExp(`\\b${name}\\b`).test(lowered))
    .map((name) => ({ name, color: browserColorsByName[name] }));

  const allValues = new RegExp(combinedRe, "gi");
  const regexMatches = (colorInput.match(allValues) || []).map((color) => ({
    color,
  }));

  return regexMatches.concat(browserColors);
}

/** Anything React hands a click or key handler on an element. */
type CopyEvent = { currentTarget: EventTarget & HTMLElement };

export async function copyText(event: CopyEvent) {
  const { currentTarget } = event;
  const { textContent, style } = currentTarget as HTMLElement;
  const text = textContent?.trim() || "";
  if (!text) return;

  // Briefly have the element that was clicked glow with its color
  // to confirm the string has been copied
  const color = new Color(text);
  style.backgroundColor =
    color.alpha < 1 ? color.hexString : `#${hexAlpha(color, 0.9)}`;
  setTimeout(() => {
    style.backgroundColor = "";
  }, COPY_FADE_DELAY);

  await writeToClipboard(text);
}

async function writeToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // Safari and non-secure contexts fall back to a throwaway input element,
    // since execCommand can only copy from a focused, selectable field.
    const inputEl = document.createElement("input");
    inputEl.value = text;
    inputEl.setAttribute("aria-hidden", "true");
    inputEl.style.position = "fixed";
    inputEl.style.opacity = "0";
    document.body.appendChild(inputEl);
    inputEl.select();
    document.execCommand("copy");
    document.body.removeChild(inputEl);
  }
}

/**
 * Picks the legible text colour to lay over `color`, using WCAG relative
 * luminance rather than raw RGB distance so that mid-tone hues (a saturated
 * yellow vs. a saturated blue) resolve correctly.
 */
export function getDifferenceColor(color: Color | string) {
  const colorObj = typeof color === "object" ? color : new Color(color);
  return relativeLuminance(colorObj) > 0.45 ? black : white;
}

function relativeLuminance({ red, green, blue }: Color) {
  const [r, g, b] = [red, green, blue].map((channel) => {
    const value = (channel || 0) / 255;
    return value <= 0.03928
      ? value / 12.92
      : Math.pow((value + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
