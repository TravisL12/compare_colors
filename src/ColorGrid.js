import React, { useState } from "react";
import Color from "./Color";
import { createColor, distanceDelta, distanceChromatic } from "./color-utils";

function ColorGrid({ colors, removeColor }) {
  const [compareColor, setCompareColor] = useState("000000");
  const [areColorsSorted, setAreColorsSorted] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [sortMethod, setSortMethod] = useState("distanceChromatic");

  const updateCompareColor = ({ target: { value } }) => {
    const { hexColor } = createColor(value);
    if (hexColor.length === 6) {
      setCompareColor(hexColor);
    } else if (value.length === 0) {
      setCompareColor("000000");
    }
  };

  const sortTypes = {
    distanceDelta,
    distanceChromatic
  };

  // target value is passed as a string
  const toggleSorting = () => {
    setAreColorsSorted(!areColorsSorted);
  };

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  // target value is passed as a string
  const toggleSortMethod = ({ currentTarget: { value } }) => {
    setSortMethod(value);
  };

  const sortedColors = areColorsSorted
    ? colors
        .slice()
        .sort(
          (a, b) =>
            sortTypes[sortMethod](a.rgbColor, compareColor) -
            sortTypes[sortMethod](b.rgbColor, compareColor)
        )
    : colors;

  return (
    <div className="col color-types">
      <div className="title">
        <p>Results ({colors.length})</p>
      </div>
      <div className="display results-display">
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
              <button onClick={toggleSorting}>
                Sorting {areColorsSorted ? "On" : "Off"}
              </button>
              <button onClick={toggleInfo}>
                {showInfo ? "Hide" : "Show"} info
              </button>
              <p>Sorting Method?</p>
              <div className="controls">
                <input
                  type="radio"
                  id="compare-on"
                  name="sortOption"
                  checked={sortMethod === "distanceChromatic"}
                  onChange={toggleSortMethod}
                  value={"distanceChromatic"}
                />
                <label htmlFor="compare-on">Chromatic</label>

                <input
                  type="radio"
                  id="compare-off"
                  name="sortOption"
                  checked={sortMethod === "distanceDelta"}
                  onChange={toggleSortMethod}
                  value={"distanceDelta"}
                />
                <label htmlFor="compare-off">DeltaE</label>
              </div>
            </div>
          </div>
          <div className="color-grid">
            {sortedColors.map((color, idx) => {
              return (
                <Color
                  color={color}
                  showInfo={showInfo}
                  remove={removeColor}
                  key={idx}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ColorGrid;
