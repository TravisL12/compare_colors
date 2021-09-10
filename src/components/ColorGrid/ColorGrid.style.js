import styled from "styled-components";
import {
  black,
  boldBorder,
  borderRadius,
  lightgray,
  rowHeight,
  SFlex,
} from "../App/App.style";

export const SColorGridDisplay = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.showInfo
      ? "repeat(auto-fill, minmax(150px, 1fr));"
      : `repeat(auto-fill, minmax(${rowHeight}, 1fr));`}
  grid-template-rows: repeat(auto-fill, ${rowHeight});
  grid-column-gap: 3px;
  grid-row-gap: 5px;
  box-sizing: border-box;
  background: white;
  padding: 10px;
  width: 100%;
  flex: 1;
  overflow: auto;
  ${boldBorder}
`;

export const SGridControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const SColorInputOptions = styled(SFlex)`
  input[type="color"] {
    position: absolute;
    visibility: hidden;
    bottom: 0;
  }

  input[type="color"] + label {
    background: ${(props) => props.color};
    display: block;
    height: ${rowHeight};
    width: ${rowHeight};
    border-radius: ${borderRadius};
    z-index: 1;
  }

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

export const SDisplayedColor = styled(SFlex)`
  position: relative;
  background: white;
  width: 100%;
  height: 150px;
  border-top-left-radius: ${(props) => (props.noColor ? 0 : "15px")};
  border-bottom-left-radius: ${(props) => (props.noColor ? 0 : "15px")};
`;

export const SDisplayedColorDetails = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 10px 0;

  li {
    display: flex;
    gap: 20px;

    span:first-child {
      width: 40px;
    }
    span:nth-child(2) {
      cursor: pointer;
      transition: 0.1s linear background-color;
    }
  }
`;

export const SColor = styled.div`
  background: ${(props) => props.color};
  height: 100%;
  width: 25%;
  border-radius: inherit;
`;

export const SBtnContainer = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
`;
