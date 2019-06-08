import React, { useState } from "react";
import Color from "./Color";
import { createColor, distance } from "./color-utils";

function ColorGrid({ colors, removeColor }) {
  const [compareColor, setCompareColor] = useState("000000");
  const [areColorsSorted, setAreColorsSorted] = useState(false);

  const updateCompareColor = ({ target: { value } }) => {
    const { hexColor } = createColor(value);
    if (hexColor.length === 6) {
      setCompareColor(hexColor);
    } else if (value.length === 0) {
      setCompareColor("000000");
    }
  };

  // target value is passed as a string
  const toggleSorting = ({ currentTarget: { value } }) => {
    setAreColorsSorted(value === "true");
  };

  const sortedColors = areColorsSorted
    ? colors.slice().sort((a, b) => {
        return (
          distance(a.rgbColor, compareColor) -
          distance(b.rgbColor, compareColor)
        );
      })
    : colors;

  return (
    <div className="compare-grid-container">
      <div className="compare-container">
        <div className="compare-input">
          <Color showTitle={false} color={createColor(compareColor)} />
          <input
            type="text"
            id="compare-color"
            onChange={updateCompareColor}
            placeholder="#000000 (Default)"
          />
        </div>
        <div className="compare-controls">
          <p>Sort by closest match?</p>
          <div className="controls">
            <input
              type="radio"
              id="compare-on"
              name="sortOption"
              checked={areColorsSorted}
              onChange={toggleSorting}
              value={true}
            />
            <label htmlFor="compare-on">On</label>

            <input
              type="radio"
              id="compare-off"
              name="sortOption"
              checked={!areColorsSorted}
              onChange={toggleSorting}
              value={false}
            />
            <label htmlFor="compare-off">Off</label>
          </div>
        </div>
      </div>
      <div className="color-grid">
        {sortedColors.map((color, idx) => {
          return <Color color={color} remove={removeColor} key={idx} />;
        })}
      </div>
    </div>
  );
}

export default ColorGrid;
