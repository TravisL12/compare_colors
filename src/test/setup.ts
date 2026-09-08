import "@testing-library/jest-dom/vitest";

// jsdom implements neither of these, and both are called during normal renders.
Element.prototype.scrollIntoView = vi.fn();

Object.assign(navigator, {
  clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
});
