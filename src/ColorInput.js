import React from "react";
import ContentEditable from "react-contenteditable";

function ColorInput({
  colorInput,
  updateTextArea,
  testColors,
  parseColors,
  resetInputDisplay,
  resetColorDisplay
}) {
  return (
    <div className="col color-entry">
      <div className="title">
        <p>Enter/Paste colors (hex or rgb)</p>
        <button onClick={testColors}>Test Data</button>
      </div>
      <button className="action-btn" onClick={parseColors}>
        Parse Colors
      </button>
      <button className="action-btn" onClick={resetInputDisplay}>
        Reset Text
      </button>
      <button className="action-btn" onClick={resetColorDisplay}>
        Reset Colors
      </button>
      <div className="display text-area">
        <ContentEditable
          className="color-textarea"
          onChange={updateTextArea}
          html={colorInput}
        />
      </div>
    </div>
  );
}

export default ColorInput;
