import React from "react";
import { hexAlpha } from "./color-utils";

function copyText(event) {
  const { target } = event;
  const { textContent } = target;
  target.style.backgroundColor = `#${hexAlpha(textContent)}`;
  setTimeout(() => {
    target.style.backgroundColor = null;
  }, 250);

  // Can only copy text from an HTMLInputElement
  // Create an input, add the text to copy and remove input element
  const inputEl = document.createElement("input");
  inputEl.value = textContent;
  document.body.appendChild(inputEl);
  inputEl.select();
  document.execCommand("copy");
  document.body.removeChild(inputEl);
}

function Color(props) {
  const {
    color: { hexColor, rgbColor, id }
  } = props;

  const squareStyle = {
    backgroundColor: `#${hexColor}`,
    color: `#${hexColor}`
  };

  const showTitle = props.showTitle && (
    <div className="names">
      <p onClick={copyText}>#{hexColor}</p>
      <p onClick={copyText}>rgb({rgbColor.join(",")})</p>
    </div>
  );

  return (
    <div className="color-container">
      <div
        className={`square`}
        style={squareStyle}
        data-color-idx={id || undefined}
        onClick={props.remove}
      />
      {showTitle}
    </div>
  );
}

Color.defaultProps = {
  showTitle: true
};

export default Color;
