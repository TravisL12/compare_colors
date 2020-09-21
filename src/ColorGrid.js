import React, { useState } from 'react';
import Color from './models/color';
import ColorItem from './ColorItem';
import GridControls from './GridControls';
import { distanceDelta, distanceChromatic } from './distance-utils';
import { browserColorsNameKey } from './browserColorsList';

function ColorGrid({ colors, removeColor, resetColorDisplay }) {
  const [compareColor, setCompareColor] = useState(new Color('000000'));
  const [areColorsSorted, setAreColorsSorted] = useState(true);
  const [showInfo, setShowInfo] = useState(true);
  const [sortMethod, setSortMethod] = useState('distanceChromatic');

  const sortTypes = {
    distanceDelta,
    distanceChromatic,
  };

  const updateCompareColor = ({ target: { value } }) => {
    const browserColor = browserColorsNameKey[value.toLowerCase()];
    const color = browserColor ? browserColor : value;
    setCompareColor(new Color(color));
  };

  const toggle = {
    sorting: () => setAreColorsSorted(!areColorsSorted),
    info: () => setShowInfo(!showInfo),
    sort: ({ currentTarget: { value } }) => {
      setSortMethod(value);
    },
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
        toggle={toggle}
        updateCompareColor={updateCompareColor}
        compareColor={compareColor}
        areColorsSorted={areColorsSorted}
        showInfo={showInfo}
        sortMethod={sortMethod}
        resetColorDisplay={resetColorDisplay}
      />
      <div className={`display color-grid ${!showInfo ? 'hideInfo' : ''}`}>
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
