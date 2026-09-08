import { useMemo, useState, type ChangeEvent } from "react";
import ColorGrid from "../ColorGrid";
import { SApp, SLogo, SFlex, SButton, STagline, SHeader } from "./App.style";
import ColorInput from "../ColorInput";
import { demoText, paletteSample } from "../../testData";
import {
  colorsFromSegments,
  parseColorText,
} from "../../utilities/parse-color-text";
import type Color from "../../models/color";

const App = () => {
  const [colorInput, setColorInput] = useState(demoText);
  const [displayedColor, setDisplayedColor] = useState<Color | null>(null);

  // Parsing lives here so both panes read the same result, and so no child
  // has to write state back up during render to share it.
  const segments = useMemo(() => parseColorText(colorInput), [colorInput]);
  const colors = useMemo(() => colorsFromSegments(segments), [segments]);

  const updateTextArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setColorInput(event.target.value);
  };

  const showSample = () => setColorInput(paletteSample);
  const showInstructions = () => setColorInput(demoText);
  const resetColorDisplay = () => {
    setColorInput("");
    setDisplayedColor(null);
  };

  return (
    <SApp column gap={10}>
      <SHeader>
        <SFlex column>
          <SLogo>ColorSnippet</SLogo>
          <STagline>
            Paste anything. Every colour in it becomes a swatch you can compare,
            sort and copy.
          </STagline>
        </SFlex>
        <SFlex alignItems="center" gap={16} $wrap>
          <SButton onClick={showInstructions}>How it works</SButton>
          <SButton onClick={showSample}>Sample palette</SButton>
          <SButton onClick={resetColorDisplay}>Clear</SButton>
        </SFlex>
      </SHeader>

      <SFlex fullWidth gap={20} className="workspace">
        <ColorInput
          segments={segments}
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
