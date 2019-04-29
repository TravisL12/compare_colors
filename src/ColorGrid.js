import React from "react";
import Color from "./Color";

function ColorGrid(props) {
  function createColor(color) {
    const isRgb = /^rgb/.test(color);
    const colorObj = {};

    if (isRgb) {
      colorObj.rgbColor = color
        .replace(/[rgb()\s]/gi, "")
        .split(",")
        .map(num => parseInt(num, 10));
      colorObj.hexColor = dec2hex(colorObj.rgbColor);
    } else {
      colorObj.hexColor = color.replace(/['#]/gi, "");
      colorObj.rgbColor = hex2dec(colorObj.hexColor);
    }

    return colorObj;
  }

  /**
   *
   * @param {array} array of ints ex: [210, 190, 5];
   */
  function dec2hex(rgbColor) {
    return rgbColor
      .map(c => {
        const num = Number(c);
        return `0${num.toString(16)}`.slice(-2);
      })
      .join("");
  }

  /**
   *
   * @param {string} hex 6 character hex string w/o # ex: 'FF09A4'
   */
  function hex2dec(hex) {
    const split = [hex.slice(0, 2), hex.slice(2, 4), hex.slice(4, 6)];

    return split.map(c => {
      return parseInt(c, 16);
    });
  }

  /**
   *
   * @param {string} target 6 character hex string w/o # ex: 'FF09A4'
   */
  function distance(target, compare) {
    const tDec = hex2dec(target);
    const red = Math.pow(tDec[0] - compare[0], 2);
    const green = Math.pow(tDec[1] - compare[1], 2);
    const blue = Math.pow(tDec[2] - compare[2], 2);

    return Math.sqrt(red + green + blue);
  }

  return (
    <div className="all">
      {props.colors.map((color, idx) => {
        return <Color color={createColor(color)} key={idx} />;
      })}
    </div>
  );
}

export default ColorGrid;
