import { startCase } from "lodash";
import React from "react";
import styled from "styled-components";
import { copyText } from "../../utilities/color-utils";
import { SDisplayedColor, SDisplayedColorDetails } from "./ColorGrid.style";

const SColor = styled.div`
  background: ${(props) => props.color};
  height: 100%;
  width: 25%;
  border-radius: inherit;
`;

const SRemoveBtn = styled.button`
  position: absolute;
  bottom: 5px;
  right: 5px;
  background: transparent;
  border: none;
  padding: 0;
  text-decoration: underline;
  cursor: pointer;
`;

function DisplayedColor({ displayedColor, removeDisplayedColor }) {
  if (!displayedColor) {
    return (
      <SDisplayedColor justify="center" alignItems="center" noColor>
        Select a color
      </SDisplayedColor>
    );
  }

  return (
    <SDisplayedColor justify="center" gap={10}>
      <SColor color={displayedColor.hexString} />
      <div style={{ flex: 1 }}>
        <SDisplayedColorDetails>
          <li>
            {displayedColor.name ? (
              startCase(displayedColor.name)
            ) : (
              <span>&nbsp;</span>
            )}
          </li>
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
      </div>
      <SRemoveBtn onClick={removeDisplayedColor}>Close</SRemoveBtn>
    </SDisplayedColor>
  );
}

export default DisplayedColor;
