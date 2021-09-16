import styled from "styled-components";
import { hexAlpha } from "../../utilities/hexadecimal-utils";
export const black = "#444444";
export const gray = "#ececec";
export const lightgray = "#f9f9f9";
export const white = "#ffffff";
export const logoGreen = "#003c08";
export const rowHeight = "50px";
export const borderRadius = "5px";

export const boldBorder = `
  border: 4px solid ${black};
  border-radius: ${borderRadius};
  box-shadow: inset 0px 0px 15px 2px rgba(0, 0, 0, 0.2);
`;

const textLayer = `
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  font-size: 14px;
  overflow-y: scroll;
  white-space: pre-wrap;
  word-wrap: break-word;
  padding: 15px;
  background-color: ${white};
  width: 100%;
  ${boldBorder}
`;

export const H1 = styled.h1`
  margin-bottom: 5px;
`;

export const H2 = styled.h2`
  margin-bottom: 5px;
`;

export const SLogo = styled(H1)`
  margin: 0;
  font-size: 72px;
  color: ${logoGreen};
`;

export const SFlex = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  gap: ${(props) => (props.gap ? `${props.gap}px` : 0)};
  justify-content: ${(props) => (props.justify ? props.justify : "flex-start")};
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
  align-items: ${(props) =>
    props.alignItems ? props.alignItems : "flex-start"};
`;

export const SOptions = styled(SFlex)`
  justify-content: space-between;
`;

export const SButton = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  text-decoration: underline;
  cursor: pointer;
  color: ${black};
  font-size: 14px;
`;

export const SRadioButton = styled.div`
  input[type="radio"] {
    display: none;
  }

  input[type="radio"] + label {
    text-decoration: none;
    cursor: pointer;
    color: ${black};
    font-size: 14px;
  }

  input[type="radio"]:checked + label {
    text-decoration: underline;
  }
`;

export const SColumn = styled(SFlex)`
  position: relative;
  gap: 10px;
  max-width: 1400px;
  height: 100%;
  border-radius: ${borderRadius};
`;

export const SApp = styled(SFlex)`
  padding: 0 20px 20px;
  height: 100vh;
  color: ${black};
  background: ${gray};

  p {
    font-size: 18px;
  }
`;

const boxSize = 3;
export const SHighlightedColorText = styled.span`
  position: relative;
  z-index: ${(props) => (props.isSelected ? 10 : "inherit")};
  border-radius: ${(props) => (props.isSelected ? "5px" : 0)};
  box-shadow: ${(props) =>
    props.isSelected
      ? `0 0 0px ${boxSize}px ${props.colorMatch}, 0 0 0 ${boxSize + 1}px black`
      : "none"};
`;

export const SColorHighlightLayer = styled.div`
  ${textLayer}
  z-index: 1;

  ${(props) =>
    props.highlightOffset
      ? `&::before {
          content: '';
          position: absolute;
          background-color: #${hexAlpha(props.color, 0.6)};
          top: ${props.highlightOffset}px;
          width: 100%;
          height: 15px;
          z-index: 2;
        }`
      : ""}
`;

export const STextAreaDisplay = styled.div`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  flex: 1;
  overflow: scroll;

  .color-textarea {
    ${textLayer}
    color: transparent;
    z-index: 2;
    caret-color: ${black};
    background: transparent;
  }

  textarea {
    resize: none;
  }
`;
