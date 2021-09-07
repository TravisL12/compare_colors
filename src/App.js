import React, { useEffect, useRef, useState } from "react";
import ColorGrid from "./ColorGrid";
import "./styles/application.scss";
import Color from "./models/color";
import { matchColors, matchRegex } from "./color-utils";
import { test } from "./testData";
import { browserColorsNameKey } from "./browserColorsList";
import { uniqBy } from "lodash";
import { distanceDelta } from "./distance-utils";

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
    const matchedColors = matchColors(colorInput.toLowerCase()).map(
      ({ color, name }, id) => new Color(color, name, id)
    );

    if (matchedColors.length === 0) {
      setColors([]);
      setColorHighlight(colorInput);
      return;
    }

    const uniqColors = uniqBy(matchedColors, (x) => x.rgbString);
    const colorHighlight = buildHighlight(matchedColors);

    setColors(uniqColors);
    setColorHighlight(colorHighlight);
  };

  const buildHighlight = (matchedColors) => {
    const colorVals = matchedColors
      .map(({ hexString, rgbString, hslString, name }) => {
        const collection = [hexString, rgbString, hslString];
        if (name) collection.push(name);
        return collection;
      })
      .flat();

    const re = new RegExp(`(${colorVals.join("|")})`, "gi");
    const colorSplit = colorInput.split(re).filter((val) => val);
    const colorDisplayedInput = colorSplit.map((text, idx) => {
      const lowCaseText = text.toLowerCase();
      const colorMatch =
        browserColorsNameKey[lowCaseText] || matchRegex.test(lowCaseText)
          ? lowCaseText
          : false;
      if (colorMatch) {
        const findColor = matchedColors.find((color) => {
          const { hexString, rgbString, hslString, name } = color;
          return [hexString, rgbString, hslString, name]
            .map((x) => (x ? x.toLowerCase() : x))
            .includes(colorMatch.trim().toLowerCase());
        });
        const dist = findColor ? distanceDelta(findColor) : 0;
        const textColor = dist > 70 ? "black" : "white";
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
    <div className="app-container">
      <div className="col color-input-container">
        <div className="options-container">
          <p className="title">
            Enter or Paste colors (hex or rgb) below and they will be parsed and
            displayed
          </p>
          <div className="options-reset-buttons">
            <button onClick={testColors}>Test Data</button>
            <button onClick={resetColorDisplay}>Reset Colors</button>
          </div>
        </div>
        <div className="display text-area">
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
        </div>
      </div>
      <ColorGrid colors={colors} />
    </div>
  );
};

export default App;
