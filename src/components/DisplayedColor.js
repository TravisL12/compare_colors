import React from "react";
import { SDisplayedColor } from "../styles/App.style";

function DisplayedColor({ displayedColor }) {
  return (
    <SDisplayedColor>
      {displayedColor ? displayedColor.hexString : "Select a color"}
    </SDisplayedColor>
  );
}

export default DisplayedColor;
