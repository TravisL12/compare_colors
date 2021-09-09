import React from "react";
import { SDisplayedColor } from "../../styles/App.style";
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
