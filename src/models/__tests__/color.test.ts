import { describe, expect, it } from "vitest";
import Color from "../color";

describe("Color", () => {
  it("keeps red, green and blue on their own channels", () => {
    // Regression: r/g/b were destructured in the wrong order, so `green` held
    // the blue value and vice versa.
    const color = new Color("#336699");
    expect(color.red).toBe(0x33);
    expect(color.green).toBe(0x66);
    expect(color.blue).toBe(0x99);
    expect(color.rgbString).toBe("rgb(51,102,153)");
  });

  it("derives HSL from hex rather than reporting zeroes", () => {
    // Regression: hex input was run through the HSL string parser, which always
    // produced NaN and rendered every colour as hsl(0 0% 0%).
    expect(new Color("#FF0000").hslString).toBe("hsl(0 100% 50%)");
    expect(new Color("#00FF00").hslString).toBe("hsl(120 100% 50%)");
    expect(new Color("#0000FF").hslString).toBe("hsl(240 100% 50%)");
    expect(new Color("#808080").hslString).toBe("hsl(0 0% 50%)");
  });

  it("derives HSL for rgb() and named input too", () => {
    expect(new Color("rgb(255,0,0)").hslString).toBe("hsl(0 100% 50%)");
    expect(new Color("dodgerblue").hslString).toBe("hsl(210 100% 56%)");
  });

  it("preserves the author's own HSL values", () => {
    const color = new Color("hsl(200, 50%, 50%)");
    expect(color.hue).toBe(200);
    expect(color.saturation).toBe(50);
    expect(color.lightness).toBe(50);
  });

  it("expands shorthand hex", () => {
    expect(new Color("#0f0").hexString).toBe("#00FF00");
    expect(new Color("#0f0").red).toBe(0);
    expect(new Color("#0f0").green).toBe(255);
  });

  it("resolves CSS colour names in either case", () => {
    expect(new Color("DodgerBlue").hexString).toBe("#1E90FF");
    expect(new Color("dodgerblue").name).toBe("dodgerblue");
  });

  it("names a colour that matches a known hex", () => {
    expect(new Color("#1E90FF").name).toBe("dodgerblue");
  });

  it("treats a colour without alpha as fully opaque", () => {
    const color = new Color("#FF0000");
    expect(color.alpha).toBe(1);
    expect(color.rgbString).not.toContain("rgba");
    expect(color.hslString).not.toContain("/");
  });

  it("reads 8 digit hex alpha", () => {
    const color = new Color("#FF000080");
    expect(color.alpha).toBeCloseTo(0.5, 1);
    expect(color.rgbString).toContain("rgba");
  });

  it("reads percentage and decimal HSL alpha", () => {
    expect(new Color("hsl(0 0% 0% / 40%)").alpha).toBeCloseTo(0.4);
    expect(new Color("hsl(0 0% 0% / 0.4)").alpha).toBeCloseTo(0.4);
  });

  it("defaults to black", () => {
    expect(new Color().hexString).toBe("#000000");
  });
});
