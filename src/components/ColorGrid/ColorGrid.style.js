import styled from "styled-components";
import { getDifferenceColor } from "../../utilities/color-utils";
import {
  boldBorder,
  black,
  borderRadius,
  lightgray,
  rowHeight,
  SFlex,
} from "../App/App.style";

export const SColorGridDisplay = styled.div`
  ${boldBorder}
  display: grid;
  grid-template-columns: ${(props) =>
    props.showInfo
      ? "repeat(auto-fill, minmax(150px, 1fr));"
      : `repeat(auto-fill, minmax(${rowHeight}, 1fr));`}
  grid-template-rows: repeat(auto-fill, ${rowHeight});
  grid-column-gap: 3px;
  grid-row-gap: 5px;
  box-sizing: border-box;
  background: ${lightgray};
  padding: 10px;
  width: 100%;
  flex: 1;
  overflow: auto;
`;

export const SComparisonPanel = styled(SFlex)`
  ${boldBorder}
  position: relative;
  background: white;

  hr {
    margin: 1px 0;
    width: 100%;
    border: none;
    box-shadow: 0 0 0px 0.5px ${black};
  }
`;

const PANEL_HEIGHT = 200;
export const SSelectedColor = styled(SFlex)`
  width: 100%;
  height: ${PANEL_HEIGHT / 2}px;
`;

export const SColorInputOptions = styled(SFlex)`
  input[type="text"] {
    width: 60px;
    text-align: center;
  }
`;

export const SColorItem = styled.div`
  display: flex;
  position: relative;
  box-sizing: border-box;
  font-weight: ${(props) => (props.isSelected ? "bold" : "inherit")};

  .square {
    height: ${rowHeight};
    width: ${rowHeight};
    border-radius: 2px;
    border: 1px solid ${black};
    cursor: pointer;

    &:hover {
      &:after {
        background: none;
      }
    }
  }

  .names {
    background: ${(props) => (props.isSelected ? lightgray : "inherit")};
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
`;

export const SDisplayedColorDetails = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
  height: 100%;
  justify-content: center;

  li {
    display: flex;

    span:first-child {
      width: 50px;
    }
    span:nth-child(2) {
      cursor: pointer;
      transition: 0.1s linear background-color;
    }
  }
`;

export const SColor = styled.div`
  position: relative;
  background: ${(props) => props.color};
  height: 100%;
  width: 25%;
  max-width: 150px;

  span {
    position: absolute;
    top: 0;
    right: 1px;
    width: 75%;
    text-align: right;
    font-size: 14px;
    color: ${(props) => getDifferenceColor(props.color)};
  }
`;

export const SBtnContainer = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
`;

export const SLabelColor = styled.div`
  position: relative;
  height: 100%;
  width: 25%;
  max-width: 150px;

  .color-text-input {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 75%;

    input[type="text"] {
      background: transparent;
      width: 100%;
      color: ${(props) => getDifferenceColor(props.color)};
      border: none;
      text-align: right;
    }

    input[type="text"]:focus {
      background: rgba(255, 255, 255, 0.75);
      color: black;
    }
  }

  input[type="color"] {
    position: absolute;
    visibility: hidden;
    bottom: 0;
  }

  input[type="color"] + label {
    background: ${(props) => props.color};

    display: block;
    height: 100%;
    width: 100%;
    z-index: 1;
    cursor: crosshair;
  }
`;

export const SCompareColor = styled.div`
  cursor: pointer;
  background: ${(props) => props.color};
  height: 30px;
  width: 50px;
  border-radius: ${borderRadius};
  &:hover {
    border: 1px solid ${(props) => getDifferenceColor(props.color)};
  }
`;
