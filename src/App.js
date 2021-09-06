import React, { Component } from "react";
import ColorGrid from "./ColorGrid";
import "./styles/application.scss";
import Color from "./models/color";
import { matchColors, matchRegex } from "./color-utils";
import { test } from "./testData";
import { browserColorsNameKey } from "./browserColorsList";

class App extends Component {
  highlightRef = React.createRef();
  textRef = React.createRef();

  state = {
    colorInput: "",
    colorHighlight: null,
    colors: [],
  };

  updateTextArea = ({ target: { value: colorInput } }) => {
    this.setState({ colorInput }, this.parseColors);
  };

  resetColorDisplay = () => {
    this.setState({ colorInput: "", colorHighlight: null, colors: [] });
  };

  testColors = () => {
    this.setState({ colorInput: test }, this.parseColors);
  };

  parseColors = () => {
    const { colorInput } = this.state;
    const matchedColors = matchColors(colorInput).map(
      ({ color, name }, id) => new Color(color, name, id)
    );

    if (matchedColors.length === 0) {
      this.setState({ colors: [], colorHighlight: null });
      return;
    }

    const colorHighlight = this.buildHighlight(matchedColors);
    this.setState({
      colors: matchedColors,
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

    const colorDisplayedInput = colorSplit.map((text, idx) => {
      const colorMatch = browserColorsNameKey[text] || matchRegex.test(text);
      if (colorMatch) {
        const findColor = colors.find((color) => {
          const { hexString, rgbString, hslString, name } = color;
          return [hexString, rgbString, hslString, name].includes(colorMatch);
        });
        const id = findColor && findColor.id ? findColor.id : idx;
        return (
          <span
            className="tagged-color"
            key={idx}
            id={id}
            style={{
              color: text,
              backgroundColor: text,
              borderRadius: "2px",
            }}
          >
            {text}
          </span>
        );
      }

      return text;
    });

    return <div>{colorDisplayedInput}</div>;
  };

  updateScroll = (event) => {
    this.highlightRef.current.scrollTop = event.target.scrollTop;
  };

  render() {
    const { colors, colorInput, colorHighlight } = this.state;

    return (
      <div className="app-container">
        <div className="col color-input-container">
          <div className="options-container">
            <p className="title">
              Enter or Paste colors (hex or rgb) below and they will be parsed
              and displayed
            </p>
            <div className="options-reset-buttons">
              <button onClick={this.testColors}>Test Data</button>
              <button onClick={this.resetColorDisplay}>Reset Colors</button>
            </div>
          </div>
          <div className="display text-area">
            <div ref={this.highlightRef} className="color-highlight-layer">
              {colorHighlight}
            </div>
            <textarea
              ref={this.textRef}
              onScroll={this.updateScroll}
              className="color-textarea"
              onChange={this.updateTextArea}
              value={colorInput}
              spellCheck="false"
            />
          </div>
        </div>
        <ColorGrid removeColor={this.removeColor} colors={colors} />
      </div>
    );
  }
}

export default App;
