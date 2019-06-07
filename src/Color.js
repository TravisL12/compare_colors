import React from "react";

function Color(props) {
  const {
    color: { hexColor, rgbColor, id }
  } = props;

  const style = {
    backgroundColor: `#${hexColor}`,
    color: `#${hexColor}`
  };

  const showTitle = props.showTitle && (
    <div className="names">
      <p>#{hexColor}</p>
      <p>rgb({rgbColor.join(",")})</p>
    </div>
  );

  return (
    <div className="color-container">
      <div
        className={`square`}
        style={style}
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
