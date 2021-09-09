import React, { useCallback, useEffect, useState } from "react";
import ColorGrid from "./ColorGrid";
import Color from "../models/color";
import { matchColors } from "../utilities/color-utils";
import { uniqBy } from "lodash";
import { SApp, SFlex } from "../styles/App.style";
import ColorInput from "./ColorInput";
import { test } from "../testData";
import styled from "styled-components";

const TestContainer = styled.div`
  position: absolute;
  right: 10px;
  z-index: 10000;
`;

const App = () => {
  const [colorInput, setColorInput] = useState("");
  const [colors, setColors] = useState([]);

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

  const parseColors = useCallback(() => {
    const parsedColors = matchColors(colorInput.toLowerCase());

    if (parsedColors.length === 0) {
      setColors([]);
      return;
    }

    const matchedColors = parsedColors.map(
      ({ color, name }, id) => new Color(name || color, id)
    );

    if (matchedColors.length === 0) {
      setColors([]);
      return;
    }

    setColors(matchedColors);
  }, [colorInput]);

  useEffect(parseColors, [colorInput]);

  return (
    <SApp>
      <TestContainer>
        <SFlex gap={10}>
          <button onClick={testColors}>Test</button>
          <button onClick={resetColorDisplay}>Reset</button>
        </SFlex>
      </TestContainer>
      <ColorInput
        colors={colors}
        colorInput={colorInput}
        onTextChange={updateTextArea}
      />
      <ColorGrid colors={uniqBy(colors, (x) => x.rgbString)} />
    </SApp>
  );
};

export default App;
