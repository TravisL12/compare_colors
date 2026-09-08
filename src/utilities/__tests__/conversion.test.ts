import { describe, expect, it } from "vitest";
import {
  format2hex,
  hex2dec,
  hexAlpha,
  floatToHexAlpha,
  hexAlphaToFloat,
} from "../hexadecimal-utils";
import { dec2array, dec2hex, isColorRgb } from "../rgb-utils";
import { hsl2rgb, hslDec2array, isColorHsl } from "../hsl-utils";
import { deltaE, distanceChromatic, rgb2lab } from "../distance-utils";
import Color from "../../models/color";

describe("hex conversion", () => {
  it("splits hex into channels", () => {
    expect(hex2dec("336699")).toEqual([51, 102, 153]);
  });

  it("omits alpha when the source had none", () => {
    expect(hex2dec("336699")).toHaveLength(3);
    expect(hex2dec("33669980")).toHaveLength(4);
  });

  it("round-trips alpha", () => {
    expect(hexAlphaToFloat(floatToHexAlpha(0.5))).toBeCloseTo(0.5, 1);
    expect(hexAlphaToFloat("ff")).toBe(1);
    expect(hexAlphaToFloat("00")).toBe(0);
  });

  it("does not stack alpha onto an already 8 digit hex", () => {
    // Regression: hexAlpha appended to the full string, producing 10 digits.
    expect(hexAlpha(new Color("#FF000080"), 0.9)).toHaveLength(8);
  });

  it("normalises every notation to bare uppercase hex", () => {
    expect(format2hex("#ff0000")).toBe("FF0000");
    expect(format2hex('#"ff0000"')).toBe("FF0000");
    expect(format2hex("rgb(255, 0, 0)")).toBe("FF0000");
    expect(format2hex("hsl(0, 100%, 50%)")).toBe("FF0000");
    expect(format2hex("#f00")).toBe("FF0000");
  });
});

describe("rgb helpers", () => {
  it("detects rgb notation", () => {
    expect(isColorRgb("rgb(1,2,3)")).toBe(true);
    expect(isColorRgb("rgba(1,2,3,0.5)")).toBe(true);
    expect(isColorRgb("#ff0000")).toBe(false);
  });

  it("parses channels", () => {
    expect(dec2array("rgb(1, 2, 3)")).toEqual([1, 2, 3]);
  });

  it("converts to hex", () => {
    expect(dec2hex([255, 0, 0])).toBe("FF0000");
    expect(dec2hex([255, 0, 0, 0.5])).toBe("FF000080");
  });
});

describe("hsl helpers", () => {
  it("detects hsl notation", () => {
    expect(isColorHsl("hsl(0,0%,0%)")).toBe(true);
    expect(isColorHsl("#ff0000")).toBe(false);
  });

  it("normalises components to 0..1", () => {
    const [h, s, l] = hslDec2array("hsl(180, 50%, 25%)");
    expect(h).toBeCloseTo(0.5);
    expect(s).toBeCloseTo(0.5);
    expect(l).toBeCloseTo(0.25);
  });

  it("reports no alpha when none was given", () => {
    expect(hslDec2array("hsl(180, 50%, 25%)")[3]).toBeUndefined();
  });

  it("converts back to rgb", () => {
    expect(hsl2rgb([0, 1, 0.5])).toEqual([255, 0, 0]);
    expect(hsl2rgb([1 / 3, 1, 0.5])).toEqual([0, 255, 0]);
  });
});

describe("perceptual distance", () => {
  it("scores an identical colour as zero", () => {
    const red = new Color("#FF0000");
    expect(distanceChromatic(red, red)).toBe(0);
    expect(deltaE(rgb2lab(red.rgbColor), rgb2lab(red.rgbColor))).toBe(0);
  });

  it("ranks a near match below a far one", () => {
    const target = new Color("#FF0000");
    const near = new Color("#FE0202");
    const far = new Color("#00FF00");
    expect(distanceChromatic(near, target)).toBeLessThan(
      distanceChromatic(far, target)
    );
    expect(
      deltaE(rgb2lab(near.rgbColor), rgb2lab(target.rgbColor))
    ).toBeLessThan(deltaE(rgb2lab(far.rgbColor), rgb2lab(target.rgbColor)));
  });
});
