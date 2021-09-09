import React, { useEffect, useRef, useState } from "react";
import ColorGrid from "./ColorGrid";
import Color from "../models/color";
import {
  highlightRegex,
  matchColors,
  matchRegex,
} from "../utilities/color-utils";
import { test } from "../testData";
import { browserColorsByName } from "../browserColorsList";
import { uniqBy } from "lodash";
import { distanceChromatic } from "../utilities/distance-utils";
import {
  H1,
  SApp,
  SColumn,
  SFlex,
  STextAreaDisplay,
} from "../styles/App.style";

const App = () => {
  const highlightRef = useRef();
  const textRef = useRef();

  const [colorInput, setColorInput] = useState("");
  const [colorHighlight, setColorHighlight] = useState(null);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    parseColors();
  }, [colorInput]);

  const updateTextArea = ({ target: { value } }) => {
    setColorInput(value);
  };

  const resetColorDisplay = () => {
    setColorInput("");
    setColorHighlight(null);
    setColors([]);
  };

  const testColors = () => {
    setColorInput(test);
  };

  const parseColors = () => {
    const parsedColors = matchColors(colorInput.toLowerCase());
    const matchedColors = parsedColors.map(
      ({ color, name }, id) => new Color(name || color, id)
    );
    if (matchedColors.length === 0) {
      setColors([]);
      setColorHighlight(colorInput);
      return;
    }
    const uniqColors = uniqBy(matchedColors, (x) => x.rgbString);
    const colorHighlight = buildHighlight(parsedColors, matchedColors);

    setColors(uniqColors);
    setColorHighlight(colorHighlight);
  };

  const buildHighlight = (parsedColors, matchedColors) => {
    const colorVals = parsedColors.map(({ name }) => name).filter((x) => x);
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
        const findColor = matchedColors.find((color) => {
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
  };

  const updateScroll = (event) => {
    highlightRef.current.scrollTop = event.target.scrollTop;
  };

  return (
    <SApp>
      <SColumn>
        <SFlex>
          <div>
            <H1>ChromaExtract</H1>
            <p>
              Enter or Paste colors (hex or rgb) below and they will be parsed
              and displayed
            </p>
          </div>
          <SFlex column>
            <button onClick={testColors}>Test Data</button>
            <button onClick={resetColorDisplay}>Reset Colors</button>
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
      <ColorGrid colors={colors} />
    </SApp>
  );
};

export default App;
