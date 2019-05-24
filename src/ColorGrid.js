import React, { Component } from "react";
import Color from "./Color";
import { rgb2lab, deltaE } from "./deltaDistance";

class ColorGrid extends Component {
  state = {
    compareColor: "000000"
  };

  /**
   * createColor - produce object that has RGB and hexadecimal
   * @param {string} color - rgba(200,150,0) or #ff00f0 value
   * @return {object} colorObj:
   * example:
   * {
   *    rgbColor: [200, 150, 0],
   *    hexColor: #C89600
   * }
   */
  createColor = color => {
    const isRgb = /^rgb/.test(color);
    const colorObj = {};

    if (isRgb) {
      colorObj.rgbColor = this.dec2arrayValue(color);
      colorObj.hexColor = this.dec2hex(colorObj.rgbColor);
    } else {
      colorObj.hexColor = color.replace(/['#]/gi, "");
      colorObj.rgbColor = this.hex2dec(colorObj.hexColor);
    }

    return colorObj;
  };

  /**
   * @param {string} rgb color string => rgb(200, 150, 0)
   * @return {array} [200, 150, 0]
   */
  dec2arrayValue = rgbColorStr => {
    return rgbColorStr
      .replace(/[rgb()\s]/gi, "")
      .split(",")
      .map(num => parseInt(num, 10));
  };

  /**
   *
   * @param {array} array of ints ex: [210, 190, 5];
   */
  dec2hex = rgbColor => {
    return rgbColor
      .map(c => {
        const num = Number(c);
        return `0${num.toString(16)}`.slice(-2);
      })
      .join("");
  };

  /**
   *
   * @param {string} hex 6 character hex string w/o # ex: 'FF09A4'
   */
  hex2dec = hex => {
    const split = [hex.slice(0, 2), hex.slice(2, 4), hex.slice(4, 6)];

    return split.map(c => {
      return parseInt(c, 16);
    });
  };

  /**
   * Based on calculation from:
   * https://en.wikipedia.org/wiki/Color_difference
   * @param {string} compare 6 character hex string w/o # ex: 'FF09A4'
   * @param {string} target 6 character hex string w/o # ex: 'FF09A4'
   * @return {float} returns distance between compare and target hex values
   */
  distance = (compare, target = this.state.compareColor) => {
    const labA = rgb2lab(this.hex2dec(target));
    const labB = rgb2lab(compare);
    return deltaE(labA, labB);
  };

  updateCompareColor = event => {
    const { hexColor } = this.createColor(event.target.value);
    if (hexColor.length === 6) {
      this.setState({ compareColor: hexColor });
    } else if (event.target.value.length === 0) {
      this.setState({ compareColor: "000000" });
    }
  };

  render() {
    const sortedColors = this.props.colors
      .map(color => {
        return this.createColor(color);
      })
      .sort((a, b) => {
        return this.distance(a.rgbColor) - this.distance(b.rgbColor);
      });

    return (
      <div className="all">
        <div className="compare-container">
          <div className="compare-input">
            <input
              type="text"
              id="compare-color"
              onChange={this.updateCompareColor}
              placeholder="Comparison Color"
            />
          </div>
          <Color
            showTitle={false}
            color={this.createColor(this.state.compareColor)}
          />
        </div>
        <div className="color-grid">
          {sortedColors.map((color, idx) => {
            return <Color color={color} key={idx} />;
          })}
        </div>
      </div>
    );
  }
}

export default ColorGrid;
