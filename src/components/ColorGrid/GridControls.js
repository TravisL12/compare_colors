import React from "react";
import { SORT_OFF, SORT_CHROMATIC, SORT_DELTA } from "../../constants";
import { SOptions } from "../App/App.style";
import { SGridControl, SColorInputOptions } from "./ColorGrid.style";

function GridControls({
  compareColor,
  showInfo,
  sortMethod,
  toggle,
  updateCompareColor,
}) {
  return (
    <SGridControl>
      <SColorInputOptions>
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
      </SColorInputOptions>

      <SOptions>
        <div>
          <button className={showInfo ? "on" : "off"} onClick={toggle.info}>
            {showInfo ? "Details On" : "Details Off"}
          </button>
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
