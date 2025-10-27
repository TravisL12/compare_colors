import { first, last } from "lodash";
import { copyText } from "../../utilities/color-utils";
import { SButton, SFlex } from "../App/App.style";
import {
  SDisplayedColorDetails,
  SColor,
  SSelectedColor,
} from "./ColorGrid.style";
import type { SelectedColorProps } from "../../types";
import { useMemo } from "react";

const SelectedColor = ({
  displayedColor,
  colorCollection,
  setDisplayedColor,
}: SelectedColorProps) => {
  const ids = colorCollection.map((color) => color?.id ?? null);
  const idIndex = ids.findIndex((id) => id === displayedColor?.id);

  const prevMatches = useMemo(
    () =>
      colorCollection
        .filter((c) => displayedColor?.id && c.id < displayedColor.id)
        .sort((a, b) => b.id - a.id),
    [colorCollection, displayedColor]
  );

  const nextMatches = useMemo(
    () =>
      colorCollection.filter(
        (c) => displayedColor?.id && c.id > displayedColor.id
      ),
    [colorCollection, displayedColor]
  );

  return (
    <SSelectedColor gap={4}>
      <SColor
        color={displayedColor ? displayedColor?.hexString : "transparent"}
      >
        <span>{displayedColor && displayedColor?.name}</span>
      </SColor>
      <div style={{ flex: 1 }}>
        <strong>{!displayedColor ? "Nothing Selected" : "Selection"}</strong>
        <SFlex fullWidth justify="space-between" wrap>
          {displayedColor && (
            <>
              <SDisplayedColorDetails>
                <li>
                  <span>Hex:</span>
                  <span onClick={copyText}>{displayedColor?.hexString}</span>
                </li>
                <li>
                  <span>RGB:</span>
                  <span onClick={copyText}>{displayedColor?.rgbString}</span>
                </li>
                <li>
                  <span>HSL:</span>
                  <span onClick={copyText}>{displayedColor?.hslString}</span>
                </li>
              </SDisplayedColorDetails>
              <SDisplayedColorDetails>
                {ids.length > 1 && (
                  <>
                    <li>
                      <span>Match:</span>
                      <span>
                        {idIndex + 1} of {ids.length}
                      </span>
                    </li>
                    <li>
                      <SFlex gap={10}>
                        <SButton
                          onClick={() => {
                            const previous = first(prevMatches)
                              ? first(prevMatches)
                              : last(nextMatches);
                            setDisplayedColor(previous);
                          }}
                        >
                          Previous
                        </SButton>
                        <SButton
                          onClick={() => {
                            const next = first(nextMatches)
                              ? first(nextMatches)
                              : last(prevMatches);
                            setDisplayedColor(next);
                          }}
                        >
                          Next
                        </SButton>
                      </SFlex>
                    </li>
                  </>
                )}
              </SDisplayedColorDetails>
            </>
          )}
        </SFlex>
      </div>
    </SSelectedColor>
  );
};

export default SelectedColor;
