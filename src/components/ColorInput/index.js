import React, { useMemo, useRef } from "react";
import { SColumn, STextAreaDisplay } from "../App/App.style";
import {
  getDifferenceColor,
  highlightRegex,
  matchColors,
  matchRegex,
} from "../../utilities/color-utils";
import { browserColorsByName } from "../../browserColorsList";
import Color from "../../models/color";

const ColorInput = ({ setColors, colorInput, onTextChange }) => {
  const highlightRef = useRef();
  const textRef = useRef();

  const colorHighlight = useMemo(() => {
    const parsedColors = matchColors(colorInput.toLowerCase());

    const colorNames = parsedColors.map(({ name }) => name).filter((x) => x);
    const colorSplit = colorInput
      .split(highlightRegex(colorNames))
      .filter((x) => x);

    const colors = [];
    const colorDisplayedInput = colorSplit.map((text, idx) => {
      const lowCaseText = text.toLowerCase();
      const colorMatch =
        browserColorsByName[lowCaseText] || matchRegex.test(lowCaseText)
          ? lowCaseText
          : false;

      if (colorMatch) {
        const findColor = new Color(colorMatch, idx);
        const textColor = getDifferenceColor(findColor);
        colors.push(findColor);

        return (
          <span
            key={idx}
            id={idx}
            style={{
              color: textColor,
              backgroundColor: text,
            }}
          >
            {text}
          </span>
        );
      }
      return text;
    });

    setColors(colors);
    return <div>{colorDisplayedInput}</div>;
  }, [setColors, colorInput]);

  const updateScroll = (event) => {
    highlightRef.current.scrollTop = event.target.scrollTop;
  };

  return (
    <SColumn column fullWidth>
      <STextAreaDisplay>
        <div ref={highlightRef} className="color-highlight-layer">
          {colorHighlight}
        </div>
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
