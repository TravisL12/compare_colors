import React from 'react';
import { shape, array, string, func } from 'prop-types';
import { copyText } from './color-utils';
import { browserColorsHexKey } from './browserColorsList';
function ColorItem({ color, remove, showInfo }) {
  const { hexColor, rgbColor } = color;

  const squareStyle = {
    color: `#${hexColor}`,
    background: `#${hexColor}`,
  };
  const browserColorName = browserColorsHexKey[`#${hexColor}`];
  return (
    <div className="color-container">
      {remove && (
        <div onClick={() => remove(hexColor)} className="delete-btn" />
      )}
      <div className={`square`} style={squareStyle} />
      {showInfo && (
        <div className="names">
          <p onClick={copyText}>#{hexColor}</p>
          <p onClick={copyText}>rgb({rgbColor.join(',')})</p>
          {browserColorName && <p>{browserColorName}</p>}
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
