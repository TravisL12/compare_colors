import { describe, expect, it } from "vitest";
import {
  colorAtOffset,
  colorsFromSegments,
  parseColorText,
} from "../parse-color-text";

describe("parseColorText", () => {
  it("reassembles into the original input", () => {
    const input = "a #ff0000 b rgb(1,2,3) c dodgerblue d";
    const segments = parseColorText(input);
    expect(segments.map((s) => s.text).join("")).toBe(input);
  });

  it("records accurate offsets", () => {
    const input = "start #ff0000 end";
    const segments = parseColorText(input);
    segments.forEach(({ text, start }) =>
      expect(input.slice(start, start + text.length)).toBe(text)
    );
  });

  it("finds every colour, including adjacent ones", () => {
    // Regression: a shared stateful regex dropped the second of two
    // back-to-back colour tokens.
    const colors = colorsFromSegments(parseColorText("rgb(1,2,3)#ff0000"));
    expect(colors).toHaveLength(2);
  });

  it("numbers occurrences sequentially from one", () => {
    const colors = colorsFromSegments(
      parseColorText("#ff0000 #00ff00 #ff0000")
    );
    expect(colors.map((c) => c.id)).toEqual([1, 2, 3]);
  });

  it("handles empty input", () => {
    expect(parseColorText("")).toEqual([]);
  });

  it("finds no colours in plain prose", () => {
    expect(colorsFromSegments(parseColorText("just some words"))).toHaveLength(
      0
    );
  });
});

describe("colorAtOffset", () => {
  const input = "red green blue orange";
  const segments = parseColorText(input);

  it("resolves a caret position to the colour under it", () => {
    expect(colorAtOffset(segments, 1)?.initialColor).toBe("red");
    expect(colorAtOffset(segments, 6)?.initialColor).toBe("green");
    expect(colorAtOffset(segments, 16)?.initialColor).toBe("orange");
  });

  it("gives the same answer regardless of lookup order", () => {
    // Regression: the old regex-scanning lookup kept a stale lastIndex, so
    // clicking an earlier colour after a later one silently failed once.
    expect(colorAtOffset(segments, 16)?.initialColor).toBe("orange");
    expect(colorAtOffset(segments, 1)?.initialColor).toBe("red");
    expect(colorAtOffset(segments, 1)?.initialColor).toBe("red");
  });

  it("distinguishes repeated occurrences of the same value", () => {
    // Regression: lookup matched on value, so clicking the second #ff0000
    // always selected the first one.
    const repeated = parseColorText("#ff0000 and #ff0000");
    const first = colorAtOffset(repeated, 1);
    const second = colorAtOffset(repeated, 13);
    expect(first?.id).toBe(1);
    expect(second?.id).toBe(2);
  });

  it("returns null for prose", () => {
    expect(colorAtOffset(parseColorText("nothing here"), 3)).toBeNull();
  });
});
