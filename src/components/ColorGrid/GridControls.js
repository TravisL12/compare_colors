import React from "react";
import { SORT_OFF, SORT_CHROMATIC, SORT_DELTA } from "../../constants";
import { SButton, SFlex, SOptions } from "../App/App.style";
import { SGridControl, SColorInputOptions } from "./ColorGrid.style";

const COMPARE_COLORS = ["red", "orange", "yellow", "lime", "blue", "violet"];

const CompareColor = ({ color, updateCompareColor }) => {
  return (
    <div
      onClick={() => updateCompareColor({ target: { value: color } })}
      style={{ background: color, height: "50px", width: "50px" }}
    />
  );
};

function GridControls({
  compareColor,
  showInfo,
  sortMethod,
  toggle,
  updateCompareColor,
}) {
  return (
    <SGridControl>
      <p>Sort Colors</p>
      <SColorInputOptions>
        <div>
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
        </div>
        <SFlex>
          {COMPARE_COLORS.map((color) => (
            <CompareColor
              idx={color}
              color={color}
              updateCompareColor={updateCompareColor}
            />
          ))}
        </SFlex>
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
