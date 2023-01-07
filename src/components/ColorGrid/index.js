import React, { useEffect, useState, useMemo } from "react";
import Color from "../../models/color";
import ColorItem from "./ColorItem";
import ComparisonPanel from "./ComparisonPanel";
import {
  distanceDelta,
  distanceChromatic,
} from "../../utilities/distance-utils";
import { browserColorsByName } from "../../browserColorsList";
import { SORT_OFF, SORT_CHROMATIC, SORT_DELTA } from "../../constants";
import {
  SColumn,
  H2,
  SButton,
  SFlex,
  SOptions,
  SRadioButton,
} from "../App/App.style";
import { SColorGridDisplay } from "./ColorGrid.style";
import { uniqBy } from "lodash";

function ColorGrid({ colors, displayedColor, setDisplayedColor }) {
  const [compareColor, setCompareColor] = useState(new Color("000000"));
  const [showInfo, setShowInfo] = useState(true);
  const [sortMethod, setSortMethod] = useState(SORT_OFF);
  const areColorsSorted = sortMethod !== SORT_OFF;

  const itemRefs = useMemo(() => {
    return colors.reduce((acc, color) => {
      acc[color.id] = React.createRef();
      return acc;
    }, {});
  }, [colors]);

  useEffect(() => {
    if (displayedColor) {
      itemRefs[displayedColor.id]?.current?.scrollIntoView({
        block: "nearest",
      });
    }
  }, [displayedColor]);

  useEffect(() => {
    const hasNoMatches = !colors || colors.length === 0;
    const isDisplayedColorCurrent = colors && !displayedColor;

    if (hasNoMatches) {
      setDisplayedColor(null);
    } else if (isDisplayedColorCurrent) {
      setDisplayedColor(colors[0]);
    } else if (colors && displayedColor) {
      const isDisplayedInColors = colors.find(
        (color) => color.hexString === displayedColor.hexString
      );
      if (!isDisplayedInColors) setDisplayedColor(colors[0]);
    }
  }, [colors, displayedColor, setDisplayedColor]);

  const sortTypes = useMemo(
    () => ({
      distanceDelta,
      distanceChromatic,
    }),
    []
  );

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

  const colorCollection = useMemo(() => {
    return displayedColor
      ? colors.filter((c) => c.hexString === displayedColor.hexString)
      : [];
  }, [colors, displayedColor]);

  const sortedColors = useMemo(() => {
    const sorted = areColorsSorted
      ? colors
          .slice()
          .sort(
            (a, b) =>
              sortTypes[sortMethod](a, compareColor) -
              sortTypes[sortMethod](b, compareColor)
          )
      : colors;

    return uniqBy(sorted, "rgbString");
  }, [colors, areColorsSorted, sortMethod, compareColor, sortTypes]);

  return (
    <SColumn column fullWidth>
      <ComparisonPanel
        updateCompareColor={updateCompareColor}
        compareColor={compareColor}
        displayedColor={displayedColor}
        colorCollection={colorCollection}
        setDisplayedColor={setDisplayedColor}
      />
      <SOptions column fullWidth>
        <H2>Extracted Color Values</H2>
        <SFlex fullWidth justify="space-between" alignItems="center">
          <SFlex>
            <SOptions gap={10}>
              <SRadioButton>
                <input
                  type="radio"
                  id="compare-distanceChromatic"
                  name="sortOption"
                  checked={sortMethod === "distanceChromatic"}
                  onChange={toggle.sort}
                  value={SORT_CHROMATIC}
                />
                <label htmlFor="compare-distanceChromatic">
                  Chromatic Sort
                </label>
              </SRadioButton>

              <SRadioButton>
                <input
                  type="radio"
                  id="compare-distanceDelta"
                  name="sortOption"
                  checked={sortMethod === "distanceDelta"}
                  onChange={toggle.sort}
                  value={SORT_DELTA}
                />
                <label htmlFor="compare-distanceDelta">DeltaE Sort</label>
              </SRadioButton>

              <SRadioButton>
                <input
                  type="radio"
                  id="compare-off"
                  name="sortOption"
                  checked={sortMethod === "off"}
                  onChange={toggle.sort}
                  value={SORT_OFF}
                />
                <label htmlFor="compare-off">No Sorting</label>
              </SRadioButton>
            </SOptions>
          </SFlex>

          <SButton className={showInfo ? "on" : "off"} onClick={toggle.info}>
            {showInfo ? "Details On" : "Details Off"}
          </SButton>
        </SFlex>
      </SOptions>
      <SColorGridDisplay showInfo={showInfo}>
        {sortedColors.map((color, idx) => {
          const isSelected = displayedColor
            ? color.id === displayedColor.id
            : false;

          return (
            <ColorItem
              ref={itemRefs[color.id]}
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
