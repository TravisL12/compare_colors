import { describe, expect, it, vi } from "vitest";
import { scrollSelectionIntoView } from "../../utilities/scroll-selection";

/** jsdom has no layout, so both elements are stubbed with explicit geometry. */
const textArea = (geometry: {
  scrollTop: number;
  clientHeight: number;
  scrollHeight: number;
}) => ({ ...geometry, scrollTo: vi.fn() }) as unknown as HTMLTextAreaElement & {
  scrollTo: ReturnType<typeof vi.fn>;
};

const span = (offsetTop: number, offsetHeight = 20) =>
  ({ offsetTop, offsetHeight }) as HTMLElement;

describe("scrollSelectionIntoView", () => {
  it("leaves the view alone when the colour is already on screen", () => {
    const area = textArea({ scrollTop: 100, clientHeight: 400, scrollHeight: 2000 });

    scrollSelectionIntoView(area, span(200));

    expect(area.scrollTo).not.toHaveBeenCalled();
  });

  it("centres a colour below the fold", () => {
    const area = textArea({ scrollTop: 0, clientHeight: 400, scrollHeight: 2000 });

    scrollSelectionIntoView(area, span(1000));

    // 1000 + 10 - 200
    expect(area.scrollTo).toHaveBeenCalledWith({ top: 810, behavior: "smooth" });
  });

  it("centres a colour above the fold", () => {
    const area = textArea({ scrollTop: 900, clientHeight: 400, scrollHeight: 2000 });

    scrollSelectionIntoView(area, span(100));

    expect(area.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });

  it("never scrolls past the end of the text", () => {
    const area = textArea({ scrollTop: 0, clientHeight: 400, scrollHeight: 1000 });

    scrollSelectionIntoView(area, span(980));

    expect(area.scrollTo).toHaveBeenCalledWith({ top: 600, behavior: "smooth" });
  });

  it("scrolls a colour that is only partly visible fully into view", () => {
    const area = textArea({ scrollTop: 0, clientHeight: 400, scrollHeight: 2000 });

    // Starts at 390 but runs to 410, so its tail is clipped.
    scrollSelectionIntoView(area, span(390));

    expect(area.scrollTo).toHaveBeenCalledWith({ top: 200, behavior: "smooth" });
  });

  it("does nothing without a textarea", () => {
    expect(() => scrollSelectionIntoView(null, span(100))).not.toThrow();
  });
});
