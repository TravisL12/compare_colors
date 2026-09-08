import styled from "styled-components";
import { getDifferenceColor } from "../../utilities/color-utils";
import {
  MOBILE,
  boldBorder,
  black,
  borderRadius,
  lightgray,
  rowHeight,
  SFlex,
  selectedgray,
} from "../App/App.style";

export const SColorGridDisplay = styled.div<{ showInfo?: boolean }>`
  ${boldBorder}
  display: grid;
  grid-template-columns: ${(props) =>
    props.showInfo
      ? "repeat(auto-fill, minmax(180px, 1fr));"
      : `repeat(auto-fill, minmax(${rowHeight}, 1fr));`}
  grid-template-rows: 35px repeat(auto-fill, ${rowHeight});
  box-sizing: border-box;
  background: ${lightgray};
  padding: 10px;
  width: 100%;
  flex: 1;
  min-height: 240px;
  overflow: auto;
  align-content: start;

  .grid-toolbar {
    grid-column: 1 / -1;
  }

  .empty-state {
    grid-column: 1 / -1;
    font-size: 15px;
    padding: 20px 4px;
    color: #6d6d6d;
  }
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
  min-height: ${PANEL_HEIGHT / 2}px;

  @media (max-width: ${MOBILE}) {
    height: auto;
  }
`;

export const SColorItem = styled.div<{
  showInfo: boolean;
  isSelected: boolean;
}>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: ${(props) => (props.showInfo ? "flex-start" : "center")};
  gap: 3px;
  box-sizing: border-box;
  padding: 5px;
  font-weight: ${(props) => (props.isSelected ? "bold" : "inherit")};
  background: ${(props) => (props.isSelected ? selectedgray : "inherit")};
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => (props.isSelected ? "gray" : "transparent")};

  .square {
    height: 50px;
    width: 50px;
    padding: 0;
    flex: 0 0 auto;
    border-radius: 2px;
    border: 1px solid ${black};
    cursor: pointer;

    &:focus-visible {
      outline: 2px solid ${black};
      outline-offset: 2px;
    }
  }

  .names {
    font-size: 12px;
    text-transform: uppercase;
    border-radius: 2px;
    z-index: 1;
    flex: 1;
    overflow: hidden;

    p {
      cursor: pointer;
      border-radius: 2px;
      padding: 0 2px;
      font-size: 11px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      // Transition delay is also affected by color-utils::copyText setTimeout fn
      transition: 0.1s linear background-color;
    }
  }
`;

export const SDisplayedColorDetails = styled.ul`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;
  height: 100%;
  justify-content: center;
  /* Wide enough that the two detail columns stack rather than squeeze. */
  min-width: 210px;

  li {
    display: flex;
    gap: 5px;

    span:first-child {
      min-width: 40px;
    }
    span:nth-child(2) {
      cursor: pointer;
      border-radius: 2px;
      padding: 0 2px;
      transition: 0.1s linear background-color;
    }

    span[role="button"]:focus-visible {
      outline: 2px solid ${black};
      outline-offset: 1px;
    }
  }
`;

export const SColor = styled.div<{ color: string }>`
  position: relative;
  background: ${(props) => props.color};
  height: 100%;
  min-height: ${PANEL_HEIGHT / 2}px;
  width: 25%;
  flex: 0 0 auto;
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

export const SColorInput = styled.div`
  width: 75%;

  input[type="text"] {
    width: 100%;
  }

  input[type="text"]:focus {
    background: rgba(255, 255, 255, 0.75);
    color: black;
  }

  input[type="text"][aria-invalid="true"] {
    border-color: #b33718;
  }
`;

export const SLabelColor = styled.div<{ color: string }>`
  position: relative;
  height: 100%;
  min-height: ${PANEL_HEIGHT / 2}px;
  width: 25%;
  flex: 0 0 auto;
  max-width: 150px;

  input[type="color"] {
    position: absolute;
    visibility: hidden;
    bottom: 0;
  }

  /* Filling the relatively-positioned wrapper keeps the swatch visible even
     when the panel is auto-height, as it is on narrow screens. */
  input[type="color"] + label {
    position: absolute;
    inset: 0;
    background: ${(props) => props.color};
    z-index: 1;
    cursor: crosshair;
  }

  input[type="color"]:focus-visible + label {
    outline: 2px solid ${black};
    outline-offset: -3px;
  }
`;

export const SCompareColor = styled.button<{ color: string }>`
  cursor: pointer;
  border: 1px solid transparent;
  padding: 0;
  background: ${(props) => props.color};
  height: 30px;
  width: 50px;
  border-radius: ${borderRadius};
  &:hover,
  &:focus-visible {
    border: 1px solid ${(props) => getDifferenceColor(props.color)};
  }
`;
