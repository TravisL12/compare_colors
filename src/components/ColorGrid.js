import React, { useState } from "react";
import Color from "../models/color";
import ColorItem from "./ColorItem";
import GridControls from "./GridControls";
import { distanceDelta, distanceChromatic } from "../utilities/distance-utils";
import { browserColorsByName } from "../browserColorsList";
import { SORT_OFF } from "../constants";
import styled from "styled-components";
import { SColumn } from "../styles/App.style";

const SColorGridDisplay = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-template-rows: repeat(auto-fill, 40px);
  grid-column-gap: 3px;
  grid-row-gap: 5px;
  box-sizing: border-box;
  background: white;
  padding: 10px;
  width: 100%;
  border: 1px solid;
  flex: 1;
  overflow: auto;

  &.hideInfo {
    grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
  }
`;

function ColorGrid({ colors, resetColorDisplay }) {
  const [compareColor, setCompareColor] = useState(new Color("000000"));
  const [showInfo, setShowInfo] = useState(true);
  const [sortMethod, setSortMethod] = useState(SORT_OFF);
  const areColorsSorted = sortMethod !== SORT_OFF;

  const sortTypes = {
    distanceDelta,
    distanceChromatic,
  };

  const updateCompareColor = ({ target: { value } }) => {
    const browserColor = browserColorsByName[value.toLowerCase()];
    const color = browserColor ? browserColor : value;
    setCompareColor(new Color(color));
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
      <SColorGridDisplay>
        {sortedColors.map((color, idx) => {
          return <ColorItem color={color} showInfo={showInfo} key={idx} />;
        })}
      </SColorGridDisplay>
    </SColumn>
  );
}

export default ColorGrid;
