import React from "react";
import { SORT_OFF, SORT_CHROMATIC, SORT_DELTA } from "../../constants";
import { copyText } from "../../utilities/color-utils";
import { H2, SButton, SFlex, SOptions, SRadioButton } from "../App/App.style";
import {
  SGridControl,
  SColorInputOptions,
  SDisplayedColor,
  SDisplayedColorDetails,
  SColor,
  SLabelColor,
  SSelectedColor,
  SCompareColor,
} from "./ColorGrid.style";

const COMPARE_COLORS = ["red", "orange", "yellow", "lime", "blue", "violet"];

function GridControls({
  compareColor,
  showInfo,
  sortMethod,
  toggle,
  updateCompareColor,
  displayedColor,
}) {
  return (
    <SGridControl>
      <SDisplayedColor column>
        <SSelectedColor gap={4}>
          <SLabelColor color={compareColor.hexString}>
            <input
              type="color"
              id="compare-color-type"
              onChange={updateCompareColor}
              value={compareColor.hexString}
            />
            <label htmlFor="compare-color-type" />
            <div className="color-text-input">
              <input
                type="text"
                id="compare-color-text"
                onChange={updateCompareColor}
                value={compareColor.name || compareColor.hexColor}
                placeholder="#000000 (Default)"
              />
            </div>
          </SLabelColor>
          <SFlex justify="space-between" style={{ flex: 1 }}>
            <SColorInputOptions
              justify="space-between"
              color={compareColor.hexString}
            >
              <div>
                <strong>Comparison</strong>
                <SFlex gap={5}>
                  {COMPARE_COLORS.map((color) => (
                    <SCompareColor
                      key={color}
                      onClick={() =>
                        updateCompareColor({ target: { value: color } })
                      }
                      color={color}
                    />
                  ))}
                </SFlex>
              </div>
            </SColorInputOptions>
          </SFlex>
        </SSelectedColor>
        <hr />
        <SSelectedColor gap={4}>
          <SColor
            color={displayedColor ? displayedColor.hexString : "transparent"}
          >
            <span>{displayedColor && displayedColor.name}</span>
          </SColor>
          <div>
            <strong>
              {!displayedColor ? "Nothing Selected" : "Selection"}
            </strong>
            {displayedColor && (
              <SDisplayedColorDetails>
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
            )}
          </div>
        </SSelectedColor>
      </SDisplayedColor>

      <SOptions column>
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
    </SGridControl>
  );
}

export default GridControls;
