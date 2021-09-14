import React, { useMemo } from "react";
import { SColumn } from "../App/App.style";
import {
  getDifferenceColor,
  highlightRegex,
  matchRegex,
} from "../../utilities/color-utils";
import { browserColorsByName } from "../../browserColorsList";
import ColorTextArea from "./ColorTextArea";

const ColorInput = ({
  colors,
  colorInput,
  testColors,
  instructionColors,
  resetColorDisplay,
  onTextChange,
}) => {
  const colorHighlight = useMemo(() => {
    if (!colors.length) {
      return colorInput;
    }

    const colorNames = colors.map(({ name }) => name).filter((x) => x);
    const colorSplit = colorInput
      .split(highlightRegex(colorNames))
      .filter((x) => x);

    const colorDisplayedInput = colorSplit.map((text, idx) => {
      const lowCaseText = text.toLowerCase();
      const colorMatch =
        browserColorsByName[lowCaseText] || matchRegex.test(lowCaseText)
          ? lowCaseText
          : false;

      if (colorMatch) {
        const findColor = colors.find((color) => {
          const { hexString, rgbString, hslString, name } = color;
          return [hexString, rgbString, hslString, name]
            .map((x) => (x ? x.toLowerCase() : x))
            .includes(colorMatch.trim().toLowerCase());
        });

        const textColor = getDifferenceColor(findColor);

        return (
          <span
            key={idx}
            id={findColor ? findColor.id : idx}
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

    return <div>{colorDisplayedInput}</div>;
  }, [colors, colorInput]);

  return (
    <SColumn>
      <ColorTextArea
        colorHighlight={colorHighlight}
        onTextChange={onTextChange}
        colorInput={colorInput}
      />
    </SColumn>
  );
};

export default ColorInput;
