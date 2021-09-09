import styled from "styled-components";

const black = "#444444";
const gray = "rgb(212, 212, 212)";
const darkgray = "rgb(133, 133, 133)";
const white = "#ffffff";
const bgGreen = "rgb(238, 255, 238)";
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

export const SApp = styled.div`
  display: flex;
  padding: ${appPadding};
  gap: 10px;
  height: 100vh;
`;

export const SColumn = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 1400px;
  width: 100%;
  height: 100%;
  background: ${gray};
  border-radius: 4px;
  padding: 10px;

  .title {
    display: flex;
    justify-content: space-between;
    padding-bottom: 5px;
  }

  .display {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    flex: 1;
    overflow: scroll;
    margin-top: 5px;
  }
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
    caret-color: black;
    background: transparent;
  }

  textarea {
    resize: none;
  }
`;

export const SOptions = styled.div`
  .title {
    display: flex;
    justify-content: space-between;
    padding-bottom: 5px;
  }

  .options-reset-buttons {
    display: flex;
    justify-content: center;
    gap: 2px;
    flex-direction: column;

    button {
      width: 100px;
    }
  }
`;
