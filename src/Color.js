import React from "react";

function Color(props) {
  const color = cleanColor();
  const style = { backgroundColor: `#${color}` };

  console.log(hex2dec(), color);

  function cleanColor() {
    return props.color.replace(/['#]/gi, "");
  }

  function hex2dec() {
    const split = [color.slice(0, 2), color.slice(2, 4), color.slice(4, 6)];
    return split.map(c => {
      return parseInt(c, 16);
    });
  }

  //   function distance(target) {
  //     const tDec = this.hex2dec(target);
  //     const cDec = this.hex2dec(color);
  //     const red = Math.pow(tDec[0] - cDec[0], 2);
  //     const green = Math.pow(tDec[1] - cDec[1], 2);
  //     const blue = Math.pow(tDec[2] - cDec[2], 2);

  //     return Math.sqrt(red + green + blue);
  //   }

  return (
    <div className="color-container">
      <div className={`square square-${props.id}`} style={style} />
      <p>#{color}</p>
    </div>
  );
}

export default Color;
