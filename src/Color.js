import React from "react";

function Color(props) {
  const style = {
    backgroundColor: `#${props.color.hexColor}`,
    color: `#${props.color.hexColor}`
  };

  const showTitle = props.showTitle && (
    <div className="names">
      <p>#{props.color.hexColor}</p>
      <p>rgb({props.color.rgbColor.join(",")})</p>
    </div>
  );

  return (
    <div className="color-container">
      <div
        className={`square`}
        style={style}
        data-color-idx={props.color.id || undefined}
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
