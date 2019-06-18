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
    <div className="compare-container">
      <div className="compare-input">
        <Color showTitle={false} color={createColor(compareColor)} />
        <input
          type="text"
          id="compare-color"
          onChange={updateCompareColor}
          placeholder="#000000 (Default)"
        />
      </div>

      <div className="compare-controls">
        <button
          className={areColorsSorted ? "on" : "off"}
          onClick={toggleSorting}
        >
          Sort {areColorsSorted ? "on" : "off"}
        </button>
        <button className={showInfo ? "on" : "off"} onClick={toggleInfo}>
          Info {showInfo ? "on" : "off"}
        </button>

        <p>Sorting Method?</p>

        <div className="controls">
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
    </div>
  );
}

export default GridControls;
