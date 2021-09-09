import { startCase } from "lodash";
import React from "react";
import styled from "styled-components";
import { copyText } from "../../utilities/color-utils";
import { SButton } from "../App/App.style";
import { SDisplayedColor, SDisplayedColorDetails } from "./ColorGrid.style";

const SColor = styled.div`
  background: ${(props) => props.color};
  height: 100%;
  width: 25%;
  border-radius: inherit;
`;

const SBtnContainer = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
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
      <SBtnContainer>
        <SButton onClick={removeDisplayedColor}>Close</SButton>
      </SBtnContainer>
    </SDisplayedColor>
  );
}

export default DisplayedColor;
