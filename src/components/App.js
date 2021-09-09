import React, { useCallback, useEffect, useState } from "react";
import ColorGrid from "./ColorGrid";
import Color from "../models/color";
import { matchColors } from "../utilities/color-utils";
import { uniqBy } from "lodash";
import { SApp } from "../styles/App.style";
import ColorInput from "./ColorInput";

const App = () => {
  const [colorInput, setColorInput] = useState("");
  const [colors, setColors] = useState([]);

  useEffect(() => {
    parseColors();
  }, [colorInput]);

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

  return (
    <SApp>
      <ColorInput
        colors={colors}
        colorInput={colorInput}
        setColorInput={setColorInput}
        setColors={setColors}
      />
      <ColorGrid colors={uniqBy(colors, (x) => x.rgbString)} />
    </SApp>
  );
};

export default App;
