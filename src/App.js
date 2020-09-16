import React, { Component } from "react";
import ColorGrid from "./ColorGrid";
import "./styles/application.scss";
import Color from "./models/color";
import { matchColors, matchRegex } from "./color-utils";
import { test, smallTest } from "./testData";
import { distanceDelta } from "./distance-utils";
import ContentEditable from "react-contenteditable";
import { browserColorsNameKey } from "./browserColorsList";

class App extends Component {
  state = {
    colorInput: "",
    colors: [],
  };

  updateTextArea = ({ target: { value: colorInput } }) => {
    this.setState({ colorInput });
  };

  resetInputDisplay = () => {
    this.setState({ colorInput: "" });
  };

  resetColorDisplay = () => {
    this.setState({ colors: [] });
  };

  testColors = () => {
    this.setState({ colorInput: smallTest }, this.parseColors);
  };

  parseColors = () => {
    const { colorInput, colors } = this.state;
    const matchedColors = matchColors(colorInput).map(
      (color) => new Color(color)
    );

    if (matchedColors.length === 0) return;

    // sanitize the HTML to not duplicate values
    const inputEl = document.createElement("div");
    inputEl.innerHTML = colorInput;
    const strippedInput = inputEl.textContent;

    const colorVals = matchedColors
      .map(({ hexString, rgbString, hslString, name }) => {
        const collection = [hexString, rgbString, hslString];
        if (name) collection.push(name);
        return collection;
      })
      .flat();

    const re = new RegExp(`(${colorVals.join("|")})`, "gi");
    const colorSplit = strippedInput.split(re).filter((val) => val);

    const colorDisplayedInput = colorSplit
      .map((str, idx) => {
        const colorMatch = browserColorsNameKey[str] || matchRegex.test(str);
        if (colorMatch) {
          const dist = distanceDelta(new Color(str));
          const textColor = dist > 70 ? "black" : "white";
          return `<span
          class="tagged-color"
          id="${idx}"
          style="color: ${textColor}; background-color: ${str};"
        >${str}</span>`;
        }

        return str;
      })
      .join("");

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

    this.setState({
      colors: [...colors, ...newColors],
      colorInput: colorDisplayedInput,
    });
  };

  removeColor = (hexColor) => {
    const { colors: prevColors } = this.state;

    const colors = prevColors.filter((color) => {
      return color.hexColor !== hexColor;
    });

    this.setState({ colors });
  };

  render() {
    const { colors, colorInput } = this.state;

    return (
      <div className="app-container">
        <div className="col color-input-container">
          <div className="options-container">
            <div className="title">
              <p>Enter/Paste colors (hex or rgb)</p>
              <button onClick={this.testColors}>Test Data</button>
            </div>

            <div>
              <button className="action-btn" onClick={this.parseColors}>
                Parse Colors
              </button>
              <button className="action-btn" onClick={this.resetInputDisplay}>
                Reset Text
              </button>
            </div>
          </div>
          <ContentEditable
            className="display color-textarea"
            onChange={this.updateTextArea}
            html={colorInput}
          />
        </div>
        <ColorGrid
          removeColor={this.removeColor}
          colors={colors}
          resetColorDisplay={this.resetColorDisplay}
        />
      </div>
    );
  }
}

export default App;
