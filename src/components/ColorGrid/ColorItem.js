import React from "react";
import { copyText } from "../../utilities/color-utils";
import { browserColorsByHex } from "../../browserColorsList";
import { SColorItem } from "../../styles/App.style";

function ColorItem({ color, showInfo, setDisplayedColor }) {
  const { hexColor, rgbColor, hue, saturation, lightness } = color;

  const squareStyle = {
    color: `#${hexColor}`,
    background: `#${hexColor}`,
  };

  const browserColorName = color.name || browserColorsByHex[`#${hexColor}`];

  return (
    <SColorItem>
      <div
        className={`square`}
        style={squareStyle}
        onClick={() => setDisplayedColor(color)}
      />
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
    </SColorItem>
  );
}

export default ColorItem;
