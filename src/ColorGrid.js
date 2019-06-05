import React, { Component } from "react";
import Color from "./Color";
import { createColor, distance } from "./color-utils";

class ColorGrid extends Component {
  state = {
    compareColor: "000000",
    areColorsSorted: false
  };

  updateCompareColor = event => {
    const { hexColor } = createColor(event.target.value);
    if (hexColor.length === 6) {
      this.setState({ compareColor: hexColor });
    } else if (event.target.value.length === 0) {
      this.setState({ compareColor: "000000" });
    }
  };

  toggleSorting = event => {
    // target value is passed as a string
    this.setState({ areColorsSorted: event.currentTarget.value === "true" });
  };

  render() {
    const { areColorsSorted, compareColor } = this.state;
    const { colors, removeColor } = this.props;
    const sortedColors = areColorsSorted
      ? colors.slice().sort((a, b) => {
          return (
            distance(a.rgbColor, compareColor) -
            distance(b.rgbColor, compareColor)
          );
        })
      : colors;

    return (
      <div className="compare-grid-container">
        <div className="compare-container">
          <div className="compare-input">
            <Color showTitle={false} color={createColor(compareColor)} />
            <input
              type="text"
              id="compare-color"
              onChange={this.updateCompareColor}
              placeholder="#000000 (Default)"
            />
          </div>
          <div className="compare-controls">
            <p>Sort by closest match?</p>
            <div className="controls">
              <input
                type="radio"
                id="compare-on"
                name="sortOption"
                checked={areColorsSorted}
                onChange={this.toggleSorting}
                value={true}
              />
              <label htmlFor="compare-on">On</label>

              <input
                type="radio"
                id="compare-off"
                name="sortOption"
                checked={!areColorsSorted}
                onChange={this.toggleSorting}
                value={false}
              />
              <label htmlFor="compare-off">Off</label>
            </div>
          </div>
        </div>
        <div className="color-grid">
          {sortedColors.map((color, idx) => {
            return <Color color={color} remove={removeColor} key={idx} />;
          })}
        </div>
      </div>
    );
  }
}

export default ColorGrid;
