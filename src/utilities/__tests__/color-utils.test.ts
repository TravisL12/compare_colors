import { describe, expect, it, vi } from "vitest";
import {
  getDifferenceColor,
  highlightRegex,
  isColorValue,
  matchColors,
  copyText,
} from "../color-utils";
import { black, white } from "../../components/App/App.style";

describe("isColorValue", () => {
  it("returns the same answer however many times it is called", () => {
    // Regression: the shared /g regex advanced lastIndex between calls, so
    // repeated checks alternated true/false.
    for (let i = 0; i < 6; i++) {
      expect(isColorValue("#ff0000")).toBe(true);
    }
  });

  it("accepts every supported notation", () => {
    const valid = [
      "#fff",
      "#ffff", // #RGBA shorthand
      "#ff0000",
      "#ff000080",
      "rgb(1, 2, 3)",
      "rgba(1, 2, 3, 0.5)",
      "hsl(200, 50%, 50%)",
      "hsl(150 29% 80% / 40%)",
    ];
    valid.forEach((value) => expect(isColorValue(value)).toBe(true));
  });

  it("rejects things that merely look colourish", () => {
    ["#ff", "#12", "#12345", "rgb(1,2)", "hello", "#ggg"].forEach((value) =>
      expect(isColorValue(value)).toBe(false)
    );
  });
});

describe("matchColors", () => {
  it("only matches colour names on word boundaries", () => {
    // Regression: unanchored substring matching found "red" in "credit".
    const names = matchColors("the credit card is tantalizing").map(
      (m) => m.name
    );
    expect(names).not.toContain("red");
    expect(names).not.toContain("tan");
  });

  it("still finds real colour names", () => {
    const names = matchColors("border: 1px solid dodgerblue").map((m) => m.name);
    expect(names).toContain("dodgerblue");
  });

  it("finds colour values", () => {
    const colors = matchColors("#ff0000 and rgb(1,2,3)").map((m) => m.color);
    expect(colors).toContain("#ff0000");
    expect(colors).toContain("rgb(1,2,3)");
  });
});

describe("highlightRegex", () => {
  it("returns a fresh regex each call so lastIndex never leaks", () => {
    const a = highlightRegex(["red"]);
    const b = highlightRegex(["red"]);
    expect(a).not.toBe(b);
    expect(a.lastIndex).toBe(0);
  });

  it("prefers the longest name so prefixes do not win", () => {
    const parts = "greenyellow".split(highlightRegex(["green", "greenyellow"]));
    expect(parts.filter(Boolean)).toEqual(["greenyellow"]);
  });

  it("does not match a name buried inside a longer word", () => {
    const parts = "credited".split(highlightRegex(["red"])).filter(Boolean);
    expect(parts).toEqual(["credited"]);
  });
});

describe("getDifferenceColor", () => {
  it("puts dark text on light backgrounds and light text on dark", () => {
    expect(getDifferenceColor("#FFFFFF")).toBe(black);
    expect(getDifferenceColor("#FFFF00")).toBe(black);
    expect(getDifferenceColor("#000000")).toBe(white);
    expect(getDifferenceColor("#0000FF")).toBe(white);
  });
});

describe("copyText", () => {
  it("writes the element's text to the clipboard", async () => {
    const element = document.createElement("p");
    element.textContent = "#FF0000";
    document.body.appendChild(element);

    await copyText({ currentTarget: element });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("#FF0000");
    document.body.removeChild(element);
  });

  it("ignores an empty element", async () => {
    vi.mocked(navigator.clipboard.writeText).mockClear();
    const element = document.createElement("p");
    await copyText({ currentTarget: element });
    expect(navigator.clipboard.writeText).not.toHaveBeenCalled();
  });
});
