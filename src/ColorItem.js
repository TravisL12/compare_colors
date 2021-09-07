import React from "react";
import { shape, array, string, func } from "prop-types";
import { copyText } from "./color-utils";
import { browserColorsHexKey } from "./browserColorsList";
function ColorItem({ color, showInfo }) {
  const { hexColor, rgbColor } = color;

  const squareStyle = {
    color: `#${hexColor}`,
    background: `#${hexColor}`,
  };
  const browserColorName = color.name || browserColorsHexKey[`#${hexColor}`];
  return (
    <div className="color-container">
      <div className={`square`} style={squareStyle} />
      {showInfo && (
        <div className="names">
          <p onClick={copyText}>#{hexColor}</p>
          <p onClick={copyText}>rgb({rgbColor.join(",")})</p>
          {browserColorName && <p onClick={copyText}>{browserColorName}</p>}
        </div>
      )}
    </div>
  );
}

ColorItem.propTypes = {
  color: shape({
    hexColor: string.isRequired,
    rgbColor: array.isRequired,
  }).isRequired,
  remove: func,
};

ColorItem.defaultProps = {
  remove: undefined,
};

export default ColorItem;
