import styled from "styled-components";
import { getDifferenceColor } from "../../utilities/color-utils";
import { hexAlpha } from "../../utilities/hexadecimal-utils";
import type { HighlightBand } from "../../utilities/scroll-selection";

export const black = "#444444";
export const gray = "#ececec";
export const lightgray = "#f9f9f9";
export const selectedgray = "#d5d5d5";
export const white = "#ffffff";
export const logoGreen = "#003c08";
export const rowHeight = "65px";
export const borderRadius = "5px";

/** Single breakpoint: below this the two panes stack instead of sitting side by side. */
export const MOBILE = "900px";

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
  line-height: 1.45;
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
  margin-bottom: 0;
`;

export const SLogo = styled(H1)`
  margin: 0;
  font-size: 56px;
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: ${logoGreen};

  @media (max-width: ${MOBILE}) {
    font-size: 34px;
  }
`;

export const STagline = styled.p`
  && {
    font-size: 15px;
    max-width: 60ch;
    margin-top: 4px;
    color: ${black};
  }

  @media (max-width: ${MOBILE}) {
    && {
      font-size: 14px;
    }
  }
`;

export const SFlex = styled.div<{
  column?: boolean;
  gap?: number;
  justify?: string;
  fullWidth?: boolean;
  $wrap?: boolean;
  alignItems?: string;
}>`
  display: flex;
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  gap: ${(props) => (props.gap ? `${props.gap}px` : 0)};
  justify-content: ${(props) => (props.justify ? props.justify : "flex-start")};
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
  flex-wrap: ${(props) => (props.$wrap ? "wrap" : "nowrap")};
  align-items: ${(props) =>
    props.alignItems ? props.alignItems : "flex-start"};
`;

export const SHeader = styled.header`
  display: flex;
  width: 100%;
  gap: 20px;
  padding: 16px 0 4px;
  justify-content: space-between;
  align-items: flex-end;

  @media (max-width: ${MOBILE}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

export const SOptions = styled(SFlex)`
  justify-content: space-between;
`;

export const SButton = styled.button`
  background: transparent;
  border: none;
  padding: 4px 2px;
  text-decoration: underline;
  cursor: pointer;
  color: ${black};
  font-size: 14px;
  border-radius: 3px;

  &:hover {
    color: ${logoGreen};
  }

  &:focus-visible {
    outline: 2px solid ${logoGreen};
    outline-offset: 2px;
  }
`;

export const SRadioButton = styled.div`
  input[type="radio"] {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  input[type="radio"] + label {
    display: inline-block;
    text-decoration: none;
    cursor: pointer;
    font-size: 14px;
    padding: 4px 8px;
    border-radius: 4px;
    color: ${logoGreen};
    background: white;
    border: 1px solid ${logoGreen};
  }

  input[type="radio"]:checked + label {
    font-weight: 600;
    color: white;
    background: ${logoGreen};
  }

  input[type="radio"]:focus-visible + label {
    outline: 2px solid ${logoGreen};
    outline-offset: 2px;
  }
`;

export const SColumn = styled(SFlex)`
  position: relative;
  gap: 10px;
  min-width: 0;
  flex: 1;
  height: 100%;
  border-radius: ${borderRadius};

  @media (max-width: ${MOBILE}) {
    height: auto;
    min-height: 60vh;
  }
`;

export const SApp = styled(SFlex)`
  padding: 0 20px 20px;
  min-height: 100vh;
  height: 100vh;
  color: ${black};
  background: ${gray};

  p {
    font-size: 18px;
  }

  .workspace {
    overflow: auto;
    flex: 1;
    min-height: 0;
  }

  @media (max-width: ${MOBILE}) {
    height: auto;
    padding: 0 12px 16px;

    .workspace {
      flex-direction: column;
      overflow: visible;
    }
  }
`;

const boxSize = 3;
export const SHighlightedColorText = styled.span<{
  isSelected: boolean;
  colorMatch: string;
}>`
  position: relative;
  border-radius: ${(props) => (props.isSelected ? "5px" : 0)};
  z-index: ${(props) => (props.isSelected ? 10 : "inherit")};
  box-shadow: ${(props) =>
    props.isSelected
      ? `0 0 0px ${boxSize}px ${props.colorMatch}, 0 0 0 ${
          boxSize + 1
        }px ${getDifferenceColor(props.colorMatch)}`
      : "none"};
`;

export const SColorHighlightLayer = styled.div<{
  highlightBand: HighlightBand | null;
}>`
  ${textLayer}
  z-index: 1;
  /* Purely decorative, and it sits under the textarea that owns every click.
     Belt and braces so a stacking-context change can never steal a click. */
  pointer-events: none;

  ${(props) =>
    props.highlightBand
      ? `&::before {
          content: '';
          position: absolute;
          background-color: #${hexAlpha("gray", 0.2)};
          top: ${props.highlightBand.top}px;
          left: 0;
          width: 100%;
          height: ${props.highlightBand.height}px;
          z-index: 2;
        }`
      : ""}
`;

export const STextAreaDisplay = styled.div`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  flex: 1;
  min-height: 320px;
  overflow: hidden;

  .color-textarea {
    ${textLayer}
    color: transparent;
    z-index: 2;
    caret-color: ${black};
    background: transparent;
    font-family: inherit;
  }

  textarea {
    resize: none;
  }

  textarea::placeholder {
    color: #8a8a8a;
  }

  textarea:focus-visible {
    outline: 2px solid ${logoGreen};
    outline-offset: 2px;
  }
`;
