import React from "react";
import { copyText } from "../../utilities/color-utils";
import { SColorItem } from "./ColorGrid.style";
import type Color from "../../models/color";

type ColorItemProps = {
  color: Color;
  showInfo: boolean;
  setDisplayedColor: (color: Color | null) => void;
  isSelected: boolean;
};

const ColorItem = React.forwardRef(
  ({ color, showInfo, setDisplayedColor, isSelected }: ColorItemProps, ref) => {
    const { hexString, rgbString, hslString, name, initialColor } = color;
    const squareStyle = {
      color: hexString,
      background: hexString,
    };

    const displayValues = [hexString, rgbString, hslString, name].filter(
      (str) => str && str.toLowerCase() !== initialColor.toLowerCase()
    );

    return (
      <SColorItem isSelected={isSelected} showInfo={showInfo} ref={ref}>
        <div
          className="square"
          style={squareStyle}
          onClick={() => setDisplayedColor(color)}
        />
        {showInfo && (
          <div className="names">
            <p onClick={copyText}>{initialColor}</p>
            {displayValues.map((val) => (
              <p key={val} onClick={copyText}>
                {val}
              </p>
            ))}
          </div>
        )}
      </SColorItem>
    );
  }
);

export default ColorItem;
