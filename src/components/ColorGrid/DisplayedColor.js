import React from "react";
import { SDisplayedColor } from "./ColorGrid.style";
import ColorItem from "./ColorItem";

function DisplayedColor({ displayedColor }) {
  return (
    <SDisplayedColor>
      {displayedColor ? (
        <ColorItem
          setDisplayedColor={() => {}}
          color={displayedColor}
          showInfo={true}
        />
      ) : (
        "Select a color"
      )}
    </SDisplayedColor>
  );
}

export default DisplayedColor;
