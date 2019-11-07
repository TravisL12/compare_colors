import React from "react";
import { shape, array, string, number, bool, func } from "prop-types";
import Color from "./models/color";
import { hexAlpha } from "./color-utils";

function copyText(event) {
  const { target } = event;
  const { textContent } = target;
  const color = new Color(textContent);

  // Briefly have the element that was clicked glow with its color
  // to confirm the string has been copied
  target.style.backgroundColor = `#${hexAlpha(color, 0.75)}`;
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

function ColorItem({ color, showTitle, remove, showInfo }) {
  const { hexColor, rgbColor, id } = color;

  const squareStyle = {
    color: `#${hexColor}`,
    background: `#${hexColor}`
  };

  return (
    <div className="color-container">
      {remove && (
        <div onClick={remove} data-color-idx={id} className="delete-btn" />
      )}
      <div className={`square`} style={squareStyle} />
      {showInfo && showTitle && (
        <div className="names">
          <p onClick={copyText}>#{hexColor}</p>
          <p onClick={copyText}>rgb({rgbColor.join(",")})</p>
        </div>
      )}
    </div>
  );
}

ColorItem.propTypes = {
  color: shape({
    hexColor: string.isRequired,
    rgbColor: array.isRequired,
    id: number
  }).isRequired,
  showTitle: bool,
  remove: func
};

ColorItem.defaultProps = {
  color: { id: undefined },
  showTitle: true,
  remove: undefined
};

export default ColorItem;
