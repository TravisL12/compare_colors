import styled from "styled-components";

const black = "#444444";
const gray = "rgb(212, 212, 212)";
const white = "#ffffff";
const appPadding = "20px";
const rowHeight = "50px";

const textLayer = `
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  font-size: 11px;
  overflow-y: scroll;
  white-space: pre-wrap;
  word-wrap: break-word;
  padding: 6px;
  background-color: ${white};
  width: 100%;
`;

export const SFlex = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  gap: ${(props) => (props.gap ? `${props.gap}px` : 0)};
  justify-content: ${(props) => (props.justify ? props.justify : "flex-start")};
  align-items: ${(props) =>
    props.alignItems ? props.alignItems : "flex-start"};
`;

export const SApp = styled.div`
  display: flex;
  padding: ${appPadding};
  gap: 10px;
  height: 100vh;
`;

export const SColumn = styled(SFlex)`
  position: relative;
  flex-direction: column;
  gap: 10px;
  max-width: 1400px;
  width: 100%;
  height: 100%;
  background: ${gray};
  border-radius: 4px;
  padding: 10px;
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

export const SOptions = styled.div`
  display: flex;
  justify-content: space-between;
`;

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
  border: 1px solid ${black};
  flex: 1;
  overflow: auto;


`;

export const SGridControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const SColorInputOptions = styled.div`
  input[type="color"] {
    height: ${rowHeight};
    width: ${rowHeight};
    padding: 0;
    margin: 0;
    background: transparent;
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

export const SDisplayedColor = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  border: 1px solid ${black};
`;
