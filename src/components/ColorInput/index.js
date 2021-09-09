import React, { useMemo } from "react";
import { H1, SButton, SColumn, SFlex } from "../App/App.style";
import { highlightRegex, matchRegex } from "../../utilities/color-utils";
import { browserColorsByName } from "../../browserColorsList";
import { distanceChromatic } from "../../utilities/distance-utils";
import ColorTextArea from "./ColorTextArea";

const ColorInput = ({
  colors,
  colorInput,
  testColors,
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
        const dist = findColor ? distanceChromatic(findColor) : 0;
        const textColor = dist > 300 ? "black" : "white";

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
  }, [colors]);

  return (
    <SColumn>
      <SFlex style={{ width: "100%" }}>
        <div>
          <H1>ChromaExtract</H1>
          <p>
            Enter or Paste colors (hex or rgb) below and they will be parsed and
            displayed
          </p>
        </div>
        <SFlex
          alignItems="flex-end"
          justify="flex-end"
          gap={10}
          style={{ height: "100%", flex: 1 }}
        >
          <SButton onClick={testColors}>Test</SButton>
          <SButton onClick={resetColorDisplay}>Reset</SButton>
        </SFlex>
      </SFlex>
      <ColorTextArea
        colorHighlight={colorHighlight}
        onTextChange={onTextChange}
        colorInput={colorInput}
      />
    </SColumn>
  );
};

export default ColorInput;