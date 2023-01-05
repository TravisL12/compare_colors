import React, { useEffect, useMemo, useRef } from "react";
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
import { browserColorsByName } from "../../browserColorsList";
import Color from "../../models/color";

const boundaryThreshold = [" ", "\t", "\n", ",", "'", '"'];
const findBoundary = (idx, text, direction = -1) => {
  for (let i = 0; i < 10; i++) {
    const val = i * direction;
    if (boundaryThreshold.includes(text[idx + val])) {
      return direction === -1 ? idx + val + 1 : idx + val;
    }
  }
  return -1;
};

let highlightScrollTimeout;
const ColorInput = ({
  colors,
  setColors,
  colorInput,
  onTextChange,
  displayedColor,
}) => {
  const highlightRef = useRef();
  const textRef = useRef();

  const displayedColorElement = useMemo(() => {
    if (displayedColor) {
      return document.getElementById(`color-highlight-${displayedColor.id}`);
    }
    return null;
  }, [displayedColor]);

  useEffect(() => {
    if (displayedColorElement) {
      displayedColorElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [displayedColorElement]);

  const colorHighlight = useMemo(() => {
    const parsedColors = matchColors(colorInput.toLowerCase());

    const colorNames = parsedColors.map(({ name }) => name).filter((x) => x);
    const colorSplit = colorInput
      .split(highlightRegex(colorNames))
      .filter((x) => x);

    const matchedColors = [];
    const colorDisplayedInput = colorSplit.map((colorText, idx) => {
      const id = idx + 1;
      const lowCaseText = colorText.toLowerCase();
      const colorMatch =
        browserColorsByName[lowCaseText] || matchRegex.test(lowCaseText)
          ? lowCaseText
          : false;

      if (colorMatch) {
        const color = new Color(colorText, id);
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
    highlightRef.current.scrollTop = event.target.scrollTop;
  };

  const updatedHighlightScroll = () => {
    clearTimeout(highlightScrollTimeout);
    highlightScrollTimeout = setTimeout(() => {
      textRef.current.scrollTop = highlightRef.current.scrollTop;
    }, 50);
  };

  const checkSelection = (event) => {
    const start = findBoundary(event.currentTarget.selectionStart, colorInput);
    const end = findBoundary(event.currentTarget.selectionEnd, colorInput, 1);

    if (start === -1 || end === -1) {
      return;
    }

    const clickedColor = colorInput.substring(start, end).trim();
    const findColorObject = colors.find(
      (color) => color.initialColor === clickedColor
    );
    console.log(clickedColor, findColorObject);
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
