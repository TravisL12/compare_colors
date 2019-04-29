import React from "react";

function Color(props) {
  const style = {
    backgroundColor: `#${props.color.hexColor}`
  };

  return (
    <div className="color-container">
      <div className={`square`} style={style} />
      <div className="names">
        <p>#{props.color.hexColor}</p>
        <p>rgb({props.color.rgbColor.join(",")})</p>
      </div>
    </div>
  );
}

export default Color;
