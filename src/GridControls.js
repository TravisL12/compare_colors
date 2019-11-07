import React from "react";
import ColorItem from "./ColorItem";

function GridControls({
  areColorsSorted,
  compareColor,
  showInfo,
  sortMethod,
  toggleInfo,
  toggleSorting,
  toggleSortMethod,
  updateCompareColor,
  resetColorDisplay
}) {
  return (
    <div className="options-container">
      <div className="options compare-color-options">
        <p>Comparison</p>

        <ColorItem showTitle={false} color={compareColor} />

        <div className="color-inputs">
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
            value={compareColor.hexString}
            placeholder="#000000 (Default)"
          />
        </div>
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

      <div className="options">
        <button className="action-btn" onClick={resetColorDisplay}>
          Reset Colors
        </button>
      </div>
    </div>
  );
}

export default GridControls;
