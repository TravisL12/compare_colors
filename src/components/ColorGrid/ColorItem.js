import React from "react";
import { SColorItem } from "./ColorGrid.style";

function ColorItem({ color, showInfo, setDisplayedColor, isSelected }) {
  const { hexColor, initialColor } = color;

  const squareStyle = {
    color: `#${hexColor}`,
    background: `#${hexColor}`,
  };

  return (
    <SColorItem isSelected={isSelected}>
      <div
        className="square"
        style={squareStyle}
        onClick={() => setDisplayedColor(color)}
      />
      {showInfo && (
        <div className="names">
          <p>{initialColor}</p>
        </div>
      )}
    </SColorItem>
  );
}

export default ColorItem;
