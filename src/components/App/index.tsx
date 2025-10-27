import { useState } from "react";
import ColorGrid from "../ColorGrid";
import { SApp, SLogo, SOptions, SFlex, SButton } from "./App.style";
import ColorInput from "../ColorInput";
import { demoText, test } from "../../testData";
import type Color from "../../models/color";

const App = () => {
  const [colorInput, setColorInput] = useState(demoText);
  const [displayedColor, setDisplayedColor] = useState<Color | null>(null);
  const [colors, setColors] = useState<Color[]>([]);

  const updateTextArea = (event: MouseEvent) => {
    const {
      target: { value },
    } = event;
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
            <SButton onClick={testColors}>Demo Text</SButton>
            <SButton onClick={resetColorDisplay}>Reset</SButton>
          </SFlex>
        </SOptions>
      </SFlex>

      <SFlex fullWidth gap={20} style={{ overflow: "auto", flex: 1 }}>
        <ColorInput
          colors={colors}
          setColors={setColors}
          setDisplayedColor={setDisplayedColor}
          colorInput={colorInput}
          onTextChange={updateTextArea}
          displayedColor={displayedColor}
        />
        <ColorGrid
          colors={colors}
          displayedColor={displayedColor}
          setDisplayedColor={setDisplayedColor}
        />
      </SFlex>
    </SApp>
  );
};

export default App;
