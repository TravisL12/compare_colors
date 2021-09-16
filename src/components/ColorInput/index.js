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

const ColorInput = ({
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

    const colors = [];
    const colorDisplayedInput = colorSplit.map((text, idx) => {
      const id = idx + 1;
      const lowCaseText = text.toLowerCase();
      const colorMatch =
        browserColorsByName[lowCaseText] || matchRegex.test(lowCaseText)
          ? lowCaseText
          : false;

      if (colorMatch) {
        const color = new Color(colorMatch, id);
        const invertColor = getDifferenceColor(color);
        colors.push(color);

        const isSelected = displayedColor && displayedColor.id === id;

        return (
          <SHighlightedColorText
            key={id}
            id={`color-highlight-${id}`}
            isSelected={isSelected}
            colorMatch={colorMatch}
            style={{
              color: invertColor,
              backgroundColor: text,
            }}
          >
            {text}
          </SHighlightedColorText>
        );
      }
      return text;
    });

    setColors(colors);
    return colorDisplayedInput;
  }, [setColors, colorInput, displayedColor]);

  const updateScroll = (event) => {
    highlightRef.current.scrollTop = event.target.scrollTop;
  };

  return (
    <SColumn column fullWidth>
      <STextAreaDisplay>
        <SColorHighlightLayer
          ref={highlightRef}
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
          value={colorInput}
          spellCheck="false"
        />
      </STextAreaDisplay>
    </SColumn>
  );
};

export default ColorInput;
