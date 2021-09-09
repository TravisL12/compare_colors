import React, { useRef, useMemo } from "react";
import { test } from "../testData";
import { H1, SColumn, SFlex, STextAreaDisplay } from "../styles/App.style";
import { highlightRegex, matchRegex } from "../utilities/color-utils";
import { browserColorsByName } from "../browserColorsList";
import { distanceChromatic } from "../utilities/distance-utils";

const ColorInput = ({ colors, colorInput, setColorInput, setColors }) => {
  const highlightRef = useRef();
  const textRef = useRef();

  const updateTextArea = ({ target: { value } }) => {
    setColorInput(value);
  };

  const testColors = () => {
    setColorInput(test);
  };

  const resetColorDisplay = () => {
    setColorInput("");
    setColors([]);
  };

  const updateScroll = (event) => {
    highlightRef.current.scrollTop = event.target.scrollTop;
  };

  const colorHighlight = useMemo(() => {
    const colorVals = colors.map(({ name }) => name).filter((x) => x);
    const colorSplit = colorInput
      .split(highlightRegex(colorVals))
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
            className="tagged-color"
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
      <SFlex>
        <div>
          <H1>ChromaExtract</H1>
          <p>
            Enter or Paste colors (hex or rgb) below and they will be parsed and
            displayed
          </p>
        </div>
        <SFlex column>
          <button onClick={testColors}>Test</button>
          <button onClick={resetColorDisplay}>Reset</button>
        </SFlex>
      </SFlex>
      <STextAreaDisplay>
        <div ref={highlightRef} className="color-highlight-layer">
          {colorHighlight}
        </div>
        <textarea
          ref={textRef}
          onScroll={updateScroll}
          className="color-textarea"
          onChange={updateTextArea}
          value={colorInput}
          spellCheck="false"
        />
      </STextAreaDisplay>
    </SColumn>
  );
};

export default ColorInput;
