import React from "react";

function ColorInput({
  colorInput,
  updateTextArea,
  testColors,
  parseColors,
  resetInputDisplay
}) {
  return (
    <div className="col color-input-container">
      <div className="options-container">
        <div className="title">
          <p>Enter/Paste colors (hex or rgb)</p>
          <button onClick={testColors}>Test Data</button>
        </div>

        <div>
          <button className="action-btn" onClick={parseColors}>
            Parse Colors
          </button>
          <button className="action-btn" onClick={resetInputDisplay}>
            Reset Text
          </button>
        </div>
      </div>
      <div className="display text-area">
        <textarea
          className="color-textarea"
          onChange={updateTextArea}
          value={colorInput}
        ></textarea>
      </div>
    </div>
  );
}

export default ColorInput;
