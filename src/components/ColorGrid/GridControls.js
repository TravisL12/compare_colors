import React from "react";
import styled from "styled-components";
import { startCase } from "lodash";

import { SORT_OFF, SORT_CHROMATIC, SORT_DELTA } from "../../constants";
import { getDifferenceColor, copyText } from "../../utilities/color-utils";
import { borderRadius, SButton, SFlex, SOptions } from "../App/App.style";
import {
  SGridControl,
  SColorInputOptions,
  SDisplayedColor,
  SDisplayedColorDetails,
  SColor,
  SBtnContainer,
} from "./ColorGrid.style";

const COMPARE_COLORS = ["red", "orange", "yellow", "lime", "blue", "violet"];

const SCompareColor = styled.div`
  cursor: pointer;
  background: ${(props) => props.color};
  height: 30px;
  width: 50px;
  border-radius: ${borderRadius};
  &:hover {
    border: 1px solid ${(props) => getDifferenceColor(props.color)};
  }
`;

function GridControls({
  compareColor,
  showInfo,
  sortMethod,
  toggle,
  updateCompareColor,
  displayedColor,
  removeDisplayedColor,
}) {
  return (
    <SGridControl>
      <SColorInputOptions
        justify="space-between"
        color={compareColor.hexString}
      >
        <SFlex column>
          <p>Sort Colors</p>
          <div style={{ position: "relative" }}>
            <input
              type="color"
              id="compare-color-type"
              onChange={updateCompareColor}
              value={compareColor.hexString}
            />
            <label htmlFor="compare-color-type" />
          </div>
          <input
            type="text"
            id="compare-color-text"
            onChange={updateCompareColor}
            value={compareColor.name || compareColor.hexColor}
            placeholder="#000000 (Default)"
          />
        </SFlex>
        <div>
          <p>Quick compare</p>
          <SFlex gap={10}>
            {COMPARE_COLORS.map((color) => (
              <SCompareColor
                key={color}
                onClick={() => updateCompareColor({ target: { value: color } })}
                color={color}
              />
            ))}
          </SFlex>
        </div>
      </SColorInputOptions>

      <SOptions>
        <div>
          <input
            type="radio"
            id="compare-off"
            name="sortOption"
            checked={sortMethod === "off"}
            onChange={toggle.sort}
            value={SORT_OFF}
          />
          <label htmlFor="compare-off">Sort Off</label>

          <input
            type="radio"
            id="compare-distanceChromatic"
            name="sortOption"
            checked={sortMethod === "distanceChromatic"}
            onChange={toggle.sort}
            value={SORT_CHROMATIC}
          />
          <label htmlFor="compare-distanceChromatic">Chromatic Sort</label>

          <input
            type="radio"
            id="compare-distanceDelta"
            name="sortOption"
            checked={sortMethod === "distanceDelta"}
            onChange={toggle.sort}
            value={SORT_DELTA}
          />
          <label htmlFor="compare-distanceDelta">DeltaE Sort</label>
        </div>
      </SOptions>

      <SDisplayedColor justify="center" gap={10}>
        {!displayedColor ? (
          "Select a color"
        ) : (
          <>
            <SColor color={displayedColor.hexString} />
            <div style={{ flex: 1 }}>
              <SDisplayedColorDetails>
                <li>
                  {displayedColor.name ? (
                    startCase(displayedColor.name)
                  ) : (
                    <span>&nbsp;</span>
                  )}
                </li>
                <li>
                  <span>Hex:</span>
                  <span onClick={copyText}>{displayedColor.hexString}</span>
                </li>
                <li>
                  <span>RGB:</span>
                  <span onClick={copyText}>{displayedColor.rgbString}</span>
                </li>
                <li>
                  <span>HSL:</span>
                  <span onClick={copyText}>{displayedColor.hslString}</span>
                </li>
              </SDisplayedColorDetails>
            </div>
            {removeDisplayedColor && (
              <SBtnContainer>
                <SButton onClick={removeDisplayedColor}>Close</SButton>
              </SBtnContainer>
            )}
          </>
        )}
      </SDisplayedColor>

      <SOptions>
        <SButton className={showInfo ? "on" : "off"} onClick={toggle.info}>
          {showInfo ? "Details On" : "Details Off"}
        </SButton>
      </SOptions>
    </SGridControl>
  );
}

export default GridControls;
