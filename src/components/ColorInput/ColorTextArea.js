import React, { useRef } from "react";
import { SFlex, STextAreaDisplay } from "../App/App.style";

const ColorTextArea = ({ colorHighlight, onTextChange, colorInput }) => {
  const highlightRef = useRef();
  const textRef = useRef();

  const updateScroll = (event) => {
    highlightRef.current.scrollTop = event.target.scrollTop;
  };

  return (
    <SFlex column fullWidth style={{ flex: 1, overflow: "auto" }}>
      <STextAreaDisplay>
        <div ref={highlightRef} className="color-highlight-layer">
          {colorHighlight}
        </div>
        <textarea
          ref={textRef}
          onScroll={updateScroll}
          className="color-textarea"
          onChange={onTextChange}
          value={colorInput}
          spellCheck="false"
        />
      </STextAreaDisplay>
    </SFlex>
  );
};

export default ColorTextArea;
