import React from "react";

function Color(props) {
  const isRgb = /^rgb/.test(props.color);
  const { hexColor, rgbColor } = createColor();
  const style = { backgroundColor: `#${hexColor}` };

  console.log(distance("000000"), "Distance from Black", hexColor);

  function createColor() {
    const color = {};

    if (isRgb) {
      color.rgbColor = props.color
        .replace(/[rgb()\s]/gi, "")
        .split(",")
        .map(num => parseInt(num, 10));
      color.hexColor = dec2hex(color.rgbColor);
    } else {
      color.hexColor = props.color.replace(/['#]/gi, "");
      color.rgbColor = hex2dec(color.hexColor);
    }

    return color;
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

  function hex2dec(hex) {
    const split = [hex.slice(0, 2), hex.slice(2, 4), hex.slice(4, 6)];

    return split.map(c => {
      return parseInt(c, 16);
    });
  }

  function distance(target) {
    const tDec = hex2dec(target);
    const cDec = hex2dec(hexColor);
    const red = Math.pow(tDec[0] - cDec[0], 2);
    const green = Math.pow(tDec[1] - cDec[1], 2);
    const blue = Math.pow(tDec[2] - cDec[2], 2);

    return Math.sqrt(red + green + blue);
  }

  return (
    <div className="color-container">
      <div className={`square`} style={style} />
      <div className="names">
        <p>#{hexColor}</p>
        <p>rgb({rgbColor.join(",")})</p>
      </div>
    </div>
  );
}

export default Color;
