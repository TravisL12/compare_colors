import {
  useEffect,
  useMemo,
  useRef,
  type Dispatch,
  type SetStateAction,
} from "react";
import {
  SColumn,
  STextAreaDisplay,
  SHighlightedColorText,
  SColorHighlightLayer,
} from "../App/App.style";
import {
  getDifferenceColor,
  highlightRegex,
  matchColors,
  matchRegex,
} from "../../utilities/color-utils";
import { browserColorsByName } from "../../browserColorsList.ts";
import Color from "../../models/color";

type ColorInputProps = {
  colors: Color[];
  setColors: Dispatch<SetStateAction<Color[]>>;
  setDisplayedColor: Dispatch<SetStateAction<Color | null>>;
  colorInput: string;
  onTextChange: (target) => void;
  displayedColor: Color | null;
};

const wordRegex =
  /#(?:[0-9a-fA-F]{3,8})\b|\b(?:rgb|hsl)a?\([^\)]*\)|\b[a-zA-Z]+\b/g;

const findBoundary = (idx: number, text: string) => {
  let match;

  while ((match = wordRegex.exec(text)) !== null) {
    if (match.index <= idx && idx < match.index + match[0].length) {
      console.log(match[0], "match[0]");
      return match[0];
    }
  }
  return -1;
};

let highlightScrollTimeout: number;
const ColorInput = ({
  colors,
  setColors,
  setDisplayedColor,
  colorInput,
  onTextChange,
  displayedColor,
}: ColorInputProps) => {
  const highlightRef = useRef<HTMLElement | undefined>(undefined);
  const textRef = useRef<HTMLTextAreaElement | undefined>(undefined);

  const displayedColorElement = useMemo(() => {
    if (displayedColor) {
      return document.getElementById(`color-highlight-${displayedColor.id}`);
    }
    return null;
  }, [displayedColor]);

  useEffect(() => {
    if (displayedColorElement) {
      displayedColorElement.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  }, [displayedColorElement]);

  const colorHighlight = useMemo(() => {
    const parsedColors = matchColors(colorInput.toLowerCase());

    const colorNames = parsedColors.map(({ name }) => name).filter((x) => x);
    const colorSplit = colorInput
      .split(highlightRegex(colorNames))
      .filter((x) => x);
    const matchedColors: Color[] = [];
    const colorDisplayedInput = colorSplit.map((colorText, idx) => {
      const id = `${idx + 1}`;
      const lowCaseText = colorText.toLowerCase();
      const colorMatch =
        browserColorsByName[lowCaseText] || matchRegex.test(lowCaseText)
          ? lowCaseText
          : false;

      if (colorMatch) {
        const color = new Color(colorMatch, id);
        const invertColor = getDifferenceColor(color);
        matchedColors.push(color);

        const isSelected = displayedColor && displayedColor.id === id;

        return (
          <SHighlightedColorText
            key={id}
            id={`color-highlight-${id}`}
            isSelected={isSelected}
            colorMatch={colorMatch}
            style={{
              color: invertColor,
              backgroundColor: colorText,
            }}
          >
            {colorText}
          </SHighlightedColorText>
        );
      }
      return colorText;
    });

    setColors(matchedColors);
    return colorDisplayedInput;
  }, [setColors, colorInput, displayedColor]);

  const updateScroll = (event) => {
    if (textRef.current && highlightRef.current) {
      highlightRef.current.scrollTop = event.target.scrollTop;
    }
  };

  const updatedHighlightScroll = () => {
    clearTimeout(highlightScrollTimeout);
    highlightScrollTimeout = setTimeout(() => {
      if (textRef.current && highlightRef.current) {
        textRef.current.scrollTop = highlightRef.current.scrollTop;
      }
    }, 50);
  };

  const checkSelection = (event) => {
    const clickedColor = findBoundary(
      event.currentTarget.selectionStart,
      colorInput
    );

    if (clickedColor === -1) {
      return;
    }

    const findColorObject = colors.find(
      (color) => color.initialColor.toLowerCase() === clickedColor.toLowerCase()
    );
    if (findColorObject) {
      setDisplayedColor(findColorObject);
    }
  };

  return (
    <SColumn column fullWidth>
      <STextAreaDisplay>
        <SColorHighlightLayer
          ref={highlightRef}
          onScroll={updatedHighlightScroll}
          highlightOffset={
            displayedColorElement ? displayedColorElement.offsetTop : false
          }
        >
          {colorHighlight}
        </SColorHighlightLayer>
        <textarea
          ref={textRef}
          onScroll={updateScroll}
          className="color-textarea"
          onChange={onTextChange}
          onClick={checkSelection}
          value={colorInput}
          spellCheck="false"
        />
      </STextAreaDisplay>
    </SColumn>
  );
};

export default ColorInput;
