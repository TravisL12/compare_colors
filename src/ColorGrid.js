import React, { useState } from "react";
import Color from "./Color";
import GridControls from "./GridControls";
import { createColor, distanceDelta, distanceChromatic } from "./color-utils";

function ColorGrid({ colors, removeColor }) {
  const [compareColor, setCompareColor] = useState("000000");
  const [areColorsSorted, setAreColorsSorted] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [sortMethod, setSortMethod] = useState("distanceChromatic");

  const sortTypes = {
    distanceDelta,
    distanceChromatic
  };

  const updateCompareColor = ({ target: { value } }) => {
    const { hexColor } = createColor(value);
    setCompareColor(hexColor);
  };

  const toggleSorting = () => {
    setAreColorsSorted(!areColorsSorted);
  };

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

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
    <div className="col color-grid-container">
      <GridControls
        toggleSorting={toggleSorting}
        toggleInfo={toggleInfo}
        toggleSortMethod={toggleSortMethod}
        updateCompareColor={updateCompareColor}
        compareColor={compareColor}
        areColorsSorted={areColorsSorted}
        showInfo={showInfo}
        sortMethod={sortMethod}
      />
      <div className="display color-grid">
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
  );
}

export default ColorGrid;
