import React, { useRef } from "react";
import { STextAreaDisplay } from "../../styles/App.style";

const ColorTextArea = ({ colorHighlight, onTextChange, colorInput }) => {
  const highlightRef = useRef();
  const textRef = useRef();

  const updateScroll = (event) => {
    highlightRef.current.scrollTop = event.target.scrollTop;
  };

  return (
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
  );
};

export default ColorTextArea;
