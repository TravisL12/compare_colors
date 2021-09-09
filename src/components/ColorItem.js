import React from "react";
import { copyText } from "../utilities/color-utils";
import { browserColorsByHex } from "../browserColorsList";
import styled from "styled-components";

const SColorItem = styled.div`
  display: flex;
  position: relative;
  box-sizing: border-box;

  .square {
    height: 40px;
    width: 40px;
    border-radius: 2px;
    border: 1px solid black;

    &:hover {
      &:after {
        background: none;
      }
    }
  }

  .names {
    font-size: 12px;
    text-transform: uppercase;
    border-radius: 2px;
    z-index: 1;
    margin-left: 3px;
    flex: 1;
    overflow: hidden;

    p {
      cursor: pointer;
      border-radius: 2px;
      padding: 0 2px;
      font-size: 11px;
      // Transition delay is also affected by color-utils::copyText setTimeout fn
      transition: 0.1s linear background-color;
    }
  }

  &:hover {
    .delete-btn {
      opacity: 1;
    }
  }
`;

function ColorItem({ color, showInfo }) {
  const { hexColor, rgbColor, hue, saturation, lightness } = color;

  const squareStyle = {
    color: `#${hexColor}`,
    background: `#${hexColor}`,
  };

  const browserColorName = color.name || browserColorsByHex[`#${hexColor}`];

  return (
    <SColorItem>
      <div className={`square`} style={squareStyle} />
      <div className="names">
        <p onClick={copyText}>#{hexColor}</p>
        <p onClick={copyText}>rgb({rgbColor.join(",")})</p>
        <p onClick={copyText}>
          hsl({[hue, `${saturation}%`, `${lightness}%`].join(",")})
        </p>
        {browserColorName && <p onClick={copyText}>{browserColorName}</p>}
      </div>
    </SColorItem>
  );
}

export default ColorItem;
