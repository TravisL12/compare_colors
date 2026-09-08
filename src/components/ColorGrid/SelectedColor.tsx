import { useMemo } from "react";
import { copyText } from "../../utilities/color-utils";
import { SButton, SFlex } from "../App/App.style";
import {
  SDisplayedColorDetails,
  SColor,
  SSelectedColor,
} from "./ColorGrid.style";
import type { SelectedColorProps } from "../../types";

const SelectedColor = ({
  displayedColor,
  colorCollection,
  setDisplayedColor,
}: SelectedColorProps) => {
  // Occurrences share a colour value, so order them by their numeric id -
  // string ordering would put the 10th occurrence before the 9th.
  const occurrences = useMemo(
    () => [...colorCollection].sort((a, b) => a.id - b.id),
    [colorCollection]
  );

  const currentIndex = occurrences.findIndex(
    (color) => color.id === displayedColor?.id
  );

  const step = (offset: number) => {
    if (occurrences.length === 0) return;
    const next =
      (currentIndex + offset + occurrences.length) % occurrences.length;
    setDisplayedColor(occurrences[next]);
  };

  return (
    <SSelectedColor gap={4}>
      <SColor color={displayedColor ? displayedColor.hexString : "transparent"}>
        <span>{displayedColor?.name}</span>
      </SColor>
      <div style={{ flex: 1, minWidth: 0 }}>
        <strong>{displayedColor ? "Selection" : "Nothing Selected"}</strong>
        <SFlex fullWidth justify="space-between" $wrap>
          {displayedColor && (
            <>
              <SDisplayedColorDetails>
                <CopyRow label="Hex" value={displayedColor.hexString} />
                <CopyRow label="RGB" value={displayedColor.rgbString} />
                <CopyRow label="HSL" value={displayedColor.hslString} />
              </SDisplayedColorDetails>
              {occurrences.length > 1 && (
                <SDisplayedColorDetails>
                  <li>
                    <span>Match:</span>
                    <span>{`${currentIndex + 1} of ${occurrences.length}`}</span>
                  </li>
                  <li>
                    <SFlex gap={10}>
                      <SButton onClick={() => step(-1)}>Previous</SButton>
                      <SButton onClick={() => step(1)}>Next</SButton>
                    </SFlex>
                  </li>
                </SDisplayedColorDetails>
              )}
            </>
          )}
        </SFlex>
      </div>
    </SSelectedColor>
  );
};

const CopyRow = ({ label, value }: { label: string; value: string }) => (
  <li>
    <span>{label}:</span>
    <span
      role="button"
      tabIndex={0}
      title={`Copy ${value}`}
      onClick={copyText}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          copyText(event);
        }
      }}
    >
      {value}
    </span>
  </li>
);

export default SelectedColor;
