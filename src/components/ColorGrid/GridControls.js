import React from "react";
import { SORT_OFF, SORT_CHROMATIC, SORT_DELTA } from "../../constants";
import { copyText } from "../../utilities/color-utils";
import { SButton, SFlex, SOptions } from "../App/App.style";
import {
  SGridControl,
  SColorInputOptions,
  SDisplayedColor,
  SDisplayedColorDetails,
  SColor,
  SBtnContainer,
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
  removeDisplayedColor,
}) {
  return (
    <SGridControl>
      <SDisplayedColor column>
        <SFlex style={{ width: "100%", height: "50%" }}>
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
          <SFlex column>
            <SColorInputOptions
              justify="space-between"
              color={compareColor.hexString}
            >
              <div>
                <p>Quick compare</p>
                <SFlex gap={10}>
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
                <label htmlFor="compare-distanceChromatic">
                  Chromatic Sort
                </label>

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
          </SFlex>
        </SFlex>

        <SSelectedColor gap={10}>
          <SColor
            color={displayedColor ? displayedColor.hexString : "transparent"}
          >
            <span>{displayedColor && displayedColor.name}</span>
          </SColor>
          {!displayedColor ? (
            <SFlex
              justify="center"
              alignItems="center"
              style={{ height: "100%" }}
            >
              No comparison color selected
            </SFlex>
          ) : (
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

          {displayedColor && (
            <SBtnContainer>
              <SButton onClick={removeDisplayedColor}>Close</SButton>
            </SBtnContainer>
          )}
        </SSelectedColor>
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
