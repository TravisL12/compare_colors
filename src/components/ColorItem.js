import React from "react";
import { copyText } from "../utilities/color-utils";
import { browserColorsByHex } from "../browserColorsList";

function ColorItem({ color, showInfo }) {
  const { hexColor, rgbColor, id, hue, saturation, lightness } = color;

  const squareStyle = {
    color: `#${hexColor}`,
    background: `#${hexColor}`,
  };

  const browserColorName = color.name || browserColorsByHex[`#${hexColor}`];
  return (
    <div className="color-container">
      <div className={`square`} style={squareStyle} />
      {showInfo && (
        <div className="names">
          <p onClick={copyText}>#{hexColor}</p>
          <p onClick={copyText}>rgb({rgbColor.join(",")})</p>
          <p onClick={copyText}>
            hsl({[hue, `${saturation}%`, `${lightness}%`].join(",")})
          </p>
          {browserColorName && <p onClick={copyText}>{browserColorName}</p>}
        </div>
      )}
    </div>
  );
}

export default ColorItem;
