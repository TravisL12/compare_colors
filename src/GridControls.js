import React from "react";
import Color from "./Color";
import { createColor } from "./color-utils";

function GridControls({
  areColorsSorted,
  compareColor,
  showInfo,
  sortMethod,
  toggleInfo,
  toggleSorting,
  toggleSortMethod,
  updateCompareColor
}) {
  return (
    <div className="options-container">
      <div className="options compare-color-option">
        <p>Comparison</p>

        <Color showTitle={false} color={createColor(compareColor)} />
        <input
          type="text"
          id="compare-color"
          onChange={updateCompareColor}
          placeholder="#000000 (Default)"
        />
      </div>

      <div className="options sort-info-options">
        <p>Options</p>

        <button
          className={areColorsSorted ? "on" : "off"}
          onClick={toggleSorting}
        >
          Sort {areColorsSorted ? "on" : "off"}
        </button>

        <button className={showInfo ? "on" : "off"} onClick={toggleInfo}>
          Info {showInfo ? "on" : "off"}
        </button>
      </div>

      <div className="options distance-options">
        <p>Sorting Method?</p>

        <input
          type="radio"
          id="compare-on"
          name="sortOption"
          checked={sortMethod === "distanceChromatic"}
          onChange={toggleSortMethod}
          value={"distanceChromatic"}
          disabled={!areColorsSorted}
        />
        <label htmlFor="compare-on">Chromatic</label>

        <input
          type="radio"
          id="compare-off"
          name="sortOption"
          checked={sortMethod === "distanceDelta"}
          onChange={toggleSortMethod}
          value={"distanceDelta"}
          disabled={!areColorsSorted}
        />
        <label htmlFor="compare-off">DeltaE</label>
      </div>
    </div>
  );
}

export default GridControls;
