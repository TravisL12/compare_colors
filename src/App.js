import React, { Component } from "react";
import ColorGrid from "./ColorGrid";
import "./styles/application.scss";
import Color from "./models/color";
import { matchColors, matchRegex } from "./color-utils";
import { test } from "./testData";
import { distanceDelta } from "./distance-utils";
import { browserColorsNameKey } from "./browserColorsList";

class App extends Component {
  state = {
    colorInput: "",
    colorHighlight: null,
    colors: [],
  };

  updateTextArea = ({ target: { value: colorInput } }) => {
    this.setState({ colorInput }, this.parseColors);
  };

  resetInputDisplay = () => {
    this.setState({ colorInput: "" });
  };

  resetColorDisplay = () => {
    this.setState({ colors: [] });
  };

  testColors = () => {
    this.setState({ colorInput: test }, this.parseColors);
  };

  parseColors = () => {
    const { colors, colorInput } = this.state;
    const matchedColors = matchColors(colorInput).map(
      ({ color, name }) => new Color(color, name)
    );

    if (matchedColors.length === 0) {
      return;
    }

    const existingHex = colors.map(({ hexColor }) => hexColor);
    const newColors = matchedColors.reduce((results, color) => {
      const { hexColor } = color;
      const hasDuplicateEntry = results.find(
        (color) => color.hexColor === hexColor
      );

      if (!existingHex.includes(hexColor) && !hasDuplicateEntry) {
        results.push(color);
      }
      return results;
    }, []);

    const updateStateColors = [...colors, ...newColors];
    const colorHighlight = this.buildHighlight(updateStateColors);

    this.setState({
      colors: updateStateColors,
      colorHighlight,
    });
  };

  removeColor = (hexColor) => {
    const { colors: prevColors } = this.state;

    const colors = prevColors.filter((color) => {
      return color.hexColor !== hexColor;
    });

    this.setState({ colors });
  };

  buildHighlight = (colors) => {
    const { colorInput } = this.state;

    const inputEl = document.createElement("div");
    inputEl.innerHTML = colorInput;
    const strippedInput = inputEl.textContent;

    const colorVals = colors
      .map(({ hexString, rgbString, hslString, name }) => {
        const collection = [hexString, rgbString, hslString];
        if (name) collection.push(name);
        return collection;
      })
      .flat();

    const re = new RegExp(`(${colorVals.join("|")})`, "gi");
    const colorSplit = strippedInput.split(re).filter((val) => val);

    const colorDisplayedInput = colorSplit.map((str, idx) => {
      const colorMatch = browserColorsNameKey[str] || matchRegex.test(str);
      if (colorMatch) {
        const dist = distanceDelta(new Color(str));
        const textColor = dist > 70 ? "black" : "white";
        return (
          <span
            className="tagged-color"
            key={idx}
            id={idx}
            style={{ color: textColor, backgroundColor: str }}
          >
            {str}
          </span>
        );
      }

      return str;
    });

    return <div className="color-highlight-layer">{colorDisplayedInput}</div>;
  };

  render() {
    const { colors, colorInput, colorHighlight } = this.state;

    return (
      <div className="app-container">
        <div className="col color-input-container">
          <div className="options-container">
            <div>
              <div className="title">
                <p>Enter/Paste colors (hex or rgb)</p>
              </div>

              <button className="action-btn" onClick={this.parseColors}>
                Parse Colors
              </button>
            </div>
            <div className="options-reset-buttons">
              <button onClick={this.testColors}>Test Data</button>
              <button onClick={this.resetColorDisplay}>Reset Colors</button>
              <button onClick={this.resetInputDisplay}>Reset Text</button>
            </div>
          </div>
          <div className="display text-area">
            {colorHighlight}
            <textarea
              className="color-textarea"
              onChange={this.updateTextArea}
              value={colorInput}
            />
          </div>
        </div>
        <ColorGrid removeColor={this.removeColor} colors={colors} />
      </div>
    );
  }
}

export default App;
