import React from "react";
import { copyText } from "../../utilities/color-utils";
import { SFlex } from "../App/App.style";
import {
  SComparisonPanel,
  SColorInputOptions,
  SDisplayedColorDetails,
  SColor,
  SLabelColor,
  SSelectedColor,
  SCompareColor,
} from "./ColorGrid.style";

const QUICK_COMPARE_COLORS = [
  "red",
  "orange",
  "yellow",
  "lime",
  "blue",
  "violet",
];

function ComparisonPanel({
  compareColor,
  updateCompareColor,
  displayedColor,
  colorCollection,
}) {
  console.log(colorCollection);
  const ids = (colorCollection || []).map((color) => (color ? color.id : null));

  return (
    <SComparisonPanel column fullWidth>
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
                {QUICK_COMPARE_COLORS.map((color) => (
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
          <strong>{!displayedColor ? "Nothing Selected" : "Selection"}</strong>
          <SFlex>
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
            <div>{ids.length > 1 && <span>IDs: {ids.length}</span>}</div>
          </SFlex>
        </div>
      </SSelectedColor>
    </SComparisonPanel>
  );
}

export default ComparisonPanel;
