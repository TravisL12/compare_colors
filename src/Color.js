import React from "react";

function Color(props) {
  const color = cleanColor();
  const style = { backgroundColor: `#${color}` };

  console.log(distance("000000"), "Distance from Black", color);

  function cleanColor() {
    return props.color.replace(/['#]/gi, "");
  }

  function hex2dec(hexColor) {
    const split = [
      hexColor.slice(0, 2),
      hexColor.slice(2, 4),
      hexColor.slice(4, 6)
    ];

    return split.map(c => {
      return parseInt(c, 16);
    });
  }

  function distance(target) {
    const tDec = hex2dec(target);
    const cDec = hex2dec(color);
    const red = Math.pow(tDec[0] - cDec[0], 2);
    const green = Math.pow(tDec[1] - cDec[1], 2);
    const blue = Math.pow(tDec[2] - cDec[2], 2);

    return Math.sqrt(red + green + blue);
  }

  return (
    <div className="color-container">
      <div className={`square`} style={style} />
      <p className="name">#{color}</p>
      <p className="name">rgb({hex2dec(color).join(",")})</p>
    </div>
  );
}

export default Color;
