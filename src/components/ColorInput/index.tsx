import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type Dispatch,
  type KeyboardEvent,
  type MouseEvent,
  type SetStateAction,
  type UIEvent,
} from "react";
import {
  SColumn,
  STextAreaDisplay,
  SHighlightedColorText,
  SColorHighlightLayer,
} from "../App/App.style";
import { getDifferenceColor } from "../../utilities/color-utils";
import { colorAtOffset, type ColorSegment } from "../../utilities/parse-color-text";
import type Color from "../../models/color";
import {
  scrollSelectionIntoView,
  type HighlightBand,
} from "../../utilities/scroll-selection";

type ColorInputProps = {
  segments: ColorSegment[];
  setDisplayedColor: Dispatch<SetStateAction<Color | null>>;
  colorInput: string;
  onTextChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  displayedColor: Color | null;
};

const ColorInput = ({
  segments,
  setDisplayedColor,
  colorInput,
  onTextChange,
  displayedColor,
}: ColorInputProps) => {
  const highlightRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [highlightBand, setHighlightBand] = useState<HighlightBand | null>(null);
  // The first colour is auto-selected on load; scrolling to it would yank the
  // reader past the intro text before they have read it.
  const lastScrolledTo = useRef<string | null>(null);

  // Runs after the highlight layer has rendered, so the element for the newly
  // selected colour is guaranteed to exist before we measure or scroll to it.
  // `segments` is rebuilt on every keystroke, so the band is re-measured each
  // time, but scrolling is gated on the selection genuinely moving - otherwise
  // typing would keep dragging the textarea back to the selected colour.
  useEffect(() => {
    if (!displayedColor) {
      setHighlightBand(null);
      lastScrolledTo.current = null;
      return;
    }

    const element = document.getElementById(
      `color-highlight-${displayedColor.id}`
    );
    if (!element) {
      setHighlightBand(null);
      return;
    }

    setHighlightBand({ top: element.offsetTop, height: element.offsetHeight });

    const target = `${displayedColor.id}:${displayedColor.hexString}`;
    const isFirstSelection = lastScrolledTo.current === null;
    const hasMoved = target !== lastScrolledTo.current;
    lastScrolledTo.current = target;

    if (!isFirstSelection && hasMoved) {
      scrollSelectionIntoView(textRef.current, element);
    }
  }, [displayedColor, segments]);

  const colorHighlight = useMemo(
    () =>
      segments.map(({ text, color }) => {
        if (!color) return text;

        return (
          <SHighlightedColorText
            key={color.id}
            id={`color-highlight-${color.id}`}
            isSelected={displayedColor?.id === color.id}
            colorMatch={color.hexString}
            style={{
              color: getDifferenceColor(color),
              backgroundColor: color.hexString,
            }}
          >
            {text}
          </SHighlightedColorText>
        );
      }),
    [segments, displayedColor]
  );

  const updateScroll = (event: UIEvent<HTMLTextAreaElement>) => {
    if (highlightRef.current) {
      highlightRef.current.scrollTop = event.currentTarget.scrollTop;
    }
  };

  const checkSelection = (
    event:
      | MouseEvent<HTMLTextAreaElement>
      | KeyboardEvent<HTMLTextAreaElement>
  ) => {
    const caret = event.currentTarget.selectionStart;
    if (caret === null) return;

    const clicked = colorAtOffset(segments, caret);
    if (clicked) setDisplayedColor(clicked);
  };

  return (
    <SColumn column fullWidth>
      <STextAreaDisplay>
        <SColorHighlightLayer
          ref={highlightRef}
          highlightBand={highlightBand}
          aria-hidden="true"
        >
          {colorHighlight}
        </SColorHighlightLayer>
        <textarea
          ref={textRef}
          onScroll={updateScroll}
          className="color-textarea"
          onChange={onTextChange}
          onClick={checkSelection}
          onKeyUp={checkSelection}
          value={colorInput}
          spellCheck="false"
          aria-label="Paste text containing colour values"
          placeholder="Paste any text containing colours - hex, rgb(), hsl() or CSS colour names."
        />
      </STextAreaDisplay>
    </SColumn>
  );
};

export default ColorInput;
