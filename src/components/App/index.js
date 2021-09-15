import React, { useState } from "react";
import ColorGrid from "../ColorGrid";
import { uniqBy } from "lodash";
import { SApp, SLogo, SOptions, SFlex, SButton } from "./App.style";
import ColorInput from "../ColorInput";
import { demoText, test } from "../../testData";

const App = () => {
  const [colorInput, setColorInput] = useState(demoText);
  const [colors, setColors] = useState([]);

  const updateTextArea = ({ target: { value } }) => {
    setColorInput(value);
  };

  const testColors = () => {
    setColorInput(test);
  };

  const instructionColors = () => {
    setColorInput(demoText);
  };

  const resetColorDisplay = () => {
    setColorInput("");
    setColors([]);
  };

  return (
    <SApp column gap={10}>
      <SFlex column>
        <SLogo>ChromaExtract</SLogo>
        <SOptions column fullWidth>
          <SFlex
            alignItems="flex-end"
            justify="flex-end"
            gap={10}
            style={{ height: "100%", flex: 1 }}
          >
            <SButton onClick={instructionColors}>Instructions</SButton>
            <SButton onClick={testColors}>Large Test</SButton>
            <SButton onClick={resetColorDisplay}>Reset</SButton>
          </SFlex>
        </SOptions>
      </SFlex>

      <SFlex fullWidth gap={20} style={{ overflow: "auto", flex: 1 }}>
        <ColorInput
          setColors={setColors}
          colorInput={colorInput}
          onTextChange={updateTextArea}
        />
        <ColorGrid colors={uniqBy(colors, (x) => x.rgbString)} />
      </SFlex>
    </SApp>
  );
};

export default App;
