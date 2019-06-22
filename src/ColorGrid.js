import React, { useState } from "react";
import Color from "./models/color";
import ColorItem from "./ColorItem";
import GridControls from "./GridControls";
import { distanceDelta, distanceChromatic } from "./distance-utils";

function ColorGrid({ colors, removeColor }) {
  const [compareColor, setCompareColor] = useState(new Color("000000"));
  const [areColorsSorted, setAreColorsSorted] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [sortMethod, setSortMethod] = useState("distanceChromatic");

  const sortTypes = {
    distanceDelta,
    distanceChromatic
  };

  const updateCompareColor = ({ target: { value } }) => {
    setCompareColor(new Color(value));
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
            sortTypes[sortMethod](a, compareColor) -
            sortTypes[sortMethod](b, compareColor)
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
            <ColorItem
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
