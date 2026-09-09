/** Where the selected colour sits inside the highlight layer, in pixels. */
export type HighlightBand = { top: number; height: number };

/**
 * Scrolls the *textarea* - never the highlight layer - so that the two stay in
 * lockstep: the textarea's `onScroll` mirrors its position onto the layer on
 * every animation frame, whereas scrolling the layer directly leaves the
 * textarea (which is what actually resolves a click to a caret offset) pointing
 * at different text than the one the reader can see.
 *
 * Nothing moves when the colour is already on screen. Re-centring a swatch the
 * reader is looking at slides the text out from under the cursor, so their next
 * click lands on whatever scrolled into that spot.
 */
export function scrollSelectionIntoView(
  textArea: HTMLTextAreaElement | null,
  element: HTMLElement
) {
  if (!textArea) return;

  const { offsetTop, offsetHeight } = element;
  const { scrollTop, clientHeight, scrollHeight } = textArea;

  const isVisible =
    offsetTop >= scrollTop && offsetTop + offsetHeight <= scrollTop + clientHeight;
  if (isVisible) return;

  const centered = offsetTop + offsetHeight / 2 - clientHeight / 2;
  const top = Math.max(0, Math.min(centered, scrollHeight - clientHeight));

  textArea.scrollTo({ top, behavior: "smooth" });
}
