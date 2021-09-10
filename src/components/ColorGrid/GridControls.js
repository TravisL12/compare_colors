import React from "react";
import styled from "styled-components";
import { SORT_OFF, SORT_CHROMATIC, SORT_DELTA } from "../../constants";
import { getDifferenceColor } from "../../utilities/color-utils";
import { borderRadius, SButton, SFlex, SOptions } from "../App/App.style";
import { SGridControl, SColorInputOptions } from "./ColorGrid.style";

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
}) {
  return (
    <SGridControl>
      <SColorInputOptions justify="space-between">
        <SFlex column>
          <p>Sort Colors</p>
          <input
            type="color"
            id="compare-color-type"
            onChange={updateCompareColor}
            value={compareColor.hexString}
          />
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
          <SButton className={showInfo ? "on" : "off"} onClick={toggle.info}>
            {showInfo ? "Details On" : "Details Off"}
          </SButton>
        </div>

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
    </SGridControl>
  );
}

export default GridControls;
