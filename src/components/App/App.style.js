import styled from "styled-components";

export const black = "#444444";
export const gray = "rgb(212, 212, 212)";
export const lightgray = "#ececec";
export const white = "#ffffff";
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
  font-size: 18px;
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

export const SFlex = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  gap: ${(props) => (props.gap ? `${props.gap}px` : 0)};
  justify-content: ${(props) => (props.justify ? props.justify : "flex-start")};
  align-items: ${(props) =>
    props.alignItems ? props.alignItems : "flex-start"};
`;

export const SOptions = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SButton = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  text-decoration: underline;
  cursor: pointer;
  color: ${black};
`;

export const SColumn = styled(SFlex)`
  position: relative;
  flex-direction: column;
  gap: 10px;
  max-width: 1400px;
  width: 100%;
  height: 100%;
  background: ${gray};
  border-radius: ${borderRadius};
  padding: 10px;
`;

export const SApp = styled.div`
  display: flex;
  padding: 10px;
  gap: 10px;
  height: 100vh;
  color: ${black};
`;

export const STextAreaDisplay = styled.div`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  flex: 1;
  overflow: scroll;
  margin-top: 5px;

  .color-highlight-layer {
    ${textLayer}
    z-index: 1;
  }

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
