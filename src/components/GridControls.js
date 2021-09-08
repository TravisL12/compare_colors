import React from "react";
import { SORT_OFF, SORT_CHROMATIC, SORT_DELTA } from "../constants";

function GridControls({
  areColorsSorted,
  compareColor,
  showInfo,
  sortMethod,
  toggle,
  updateCompareColor,
  resetColorDisplay,
}) {
  return (
    <div className="options-container">
      <div className="options compare-color-options">
        <p>Comparison</p>

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

      <div className="options sort-info-options">
        <p>Details</p>

        <button className={showInfo ? "on" : "off"} onClick={toggle.info}>
          {showInfo ? "On" : "Off"}
        </button>
      </div>

      <div className="options distance-options">
        <p>Sorting</p>

        <input
          type="radio"
          id="compare-off"
          name="sortOption"
          checked={sortMethod === "off"}
          onChange={toggle.sort}
          value={SORT_OFF}
          disabled={!areColorsSorted}
        />
        <label htmlFor="compare-off">Off</label>

        <input
          type="radio"
          id="compare-distanceChromatic"
          name="sortOption"
          checked={sortMethod === "distanceChromatic"}
          onChange={toggle.sort}
          value={SORT_CHROMATIC}
        />
        <label htmlFor="compare-distanceChromatic">Chromatic</label>

        <input
          type="radio"
          id="compare-distanceDelta"
          name="sortOption"
          checked={sortMethod === "distanceDelta"}
          onChange={toggle.sort}
          value={SORT_DELTA}
        />
        <label htmlFor="compare-distanceDelta">DeltaE</label>
      </div>
    </div>
  );
}

export default GridControls;
