import React, { useState } from "react";
import Color from "../../models/color";
import ColorItem from "./ColorItem";
import GridControls from "./GridControls";
import {
  distanceDelta,
  distanceChromatic,
} from "../../utilities/distance-utils";
import { browserColorsByName } from "../../browserColorsList";
import { SORT_CHROMATIC, SORT_OFF } from "../../constants";
import { SColumn } from "../App/App.style";
import { SColorGridDisplay } from "./ColorGrid.style";
import DisplayedColor from "./DisplayedColor";

function ColorGrid({ colors, resetColorDisplay }) {
  const [compareColor, setCompareColor] = useState(new Color("000000"));
  const [showInfo, setShowInfo] = useState(true);
  const [displayedColor, setDisplayedColor] = useState(null);
  const [sortMethod, setSortMethod] = useState(SORT_OFF);
  const areColorsSorted = sortMethod !== SORT_OFF;

  const sortTypes = {
    distanceDelta,
    distanceChromatic,
  };

  const removeDisplayedColor = () => setDisplayedColor(null);

  const updateCompareColor = ({ target: { value } }) => {
    const browserColor = browserColorsByName[value.toLowerCase()];
    setCompareColor(new Color(browserColor || value));
    if (!areColorsSorted) {
      setSortMethod(SORT_CHROMATIC);
    }
  };

  const toggle = {
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

  const colorCount = sortedColors.length;

  return (
    <SColumn>
      <GridControls
        toggle={toggle}
        updateCompareColor={updateCompareColor}
        compareColor={compareColor}
        showInfo={showInfo}
        sortMethod={sortMethod}
        resetColorDisplay={resetColorDisplay}
      />
      {!!colorCount && (
        <DisplayedColor
          displayedColor={displayedColor}
          removeDisplayedColor={removeDisplayedColor}
        />
      )}
      <SColorGridDisplay showInfo={showInfo}>
        {sortedColors.map((color, idx) => {
          const isSelected = displayedColor
            ? color.id === displayedColor.id
            : false;

          return (
            <ColorItem
              isSelected={isSelected}
              setDisplayedColor={setDisplayedColor}
              color={color}
              showInfo={showInfo}
              key={idx}
            />
          );
        })}
      </SColorGridDisplay>
    </SColumn>
  );
}

export default ColorGrid;
