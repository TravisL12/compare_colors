import Color from "../models/color";
import { browserColorsByName } from "../browserColorsList.ts";
import { highlightRegex, isColorValue, matchColors } from "./color-utils";

export type ColorSegment = {
  /** The raw text exactly as the author typed it. */
  text: string;
  /** Its character offset in the original input. */
  start: number;
  /** Parsed colour, or null when this run is ordinary prose. */
  color: Color | null;
};

/**
 * Slices raw text into an ordered run of segments, parsing every colour value
 * it finds. Segments keep their original offsets so a click in the textarea can
 * be resolved to the exact occurrence that was clicked, not merely the first
 * one that happens to share the same value.
 */
export function parseColorText(colorInput: string): ColorSegment[] {
  if (!colorInput) return [];

  const colorNames = matchColors(colorInput.toLowerCase())
    .map(({ name }) => name)
    .filter((name): name is string => Boolean(name));

  const pieces = colorInput.split(highlightRegex(colorNames));

  let offset = 0;
  let colorId = 0;
  const segments: ColorSegment[] = [];

  for (const text of pieces) {
    if (!text) continue;

    const start = offset;
    offset += text.length;

    const lowered = text.toLowerCase();
    const isColor = Boolean(browserColorsByName[lowered]) || isColorValue(lowered);

    segments.push({
      text,
      start,
      color: isColor ? new Color(lowered, ++colorId) : null,
    });
  }

  return segments;
}

export function colorsFromSegments(segments: ColorSegment[]): Color[] {
  return segments.reduce<Color[]>((acc, { color }) => {
    if (color) acc.push(color);
    return acc;
  }, []);
}

/** Resolves a caret offset in the textarea to the colour segment it sits in. */
export function colorAtOffset(
  segments: ColorSegment[],
  offset: number
): Color | null {
  const hit = segments.find(
    ({ start, text, color }) =>
      color && offset >= start && offset <= start + text.length
  );

  return hit?.color ?? null;
}
