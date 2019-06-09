import React, { Component } from "react";
import ColorGrid from "./ColorGrid";
import "./application.scss";
import { matchColors, createColor, format2hex } from "./color-utils";

const test = `
#353B4B
#ff001E
rgb(0, 0, 200)
#3A3A48 #0fa912
rgb( 200 , 150 , 2 )
rgb(1,2,3)
#232836
#454E5F
#ffffff
#050505
#e1e1e1
#444444
#999999
hey I have a color #d928ae inside this sentence
 `;

class App extends Component {
  state = {
    colorInput: "",
    colors: []
  };

  updateTextArea = event => {
    this.setState({ colorInput: event.target.value });
  };

  parseColors = () => {
    if (!this.state.colorInput) {
      return;
    }

    const matchedColors = matchColors(this.state.colorInput);

    if (!matchedColors) {
      return;
    }

    const existingHex = this.state.colors.map(({ hexColor }) => hexColor);
    const filteredColors = matchedColors.reduce((results, color) => {
      const hexColor = format2hex(color);

      // No duplicates!
      if (!existingHex.includes(hexColor) && !results.includes(hexColor)) {
        results.push(hexColor);
      }

      return results;
    }, []);

    const newColors = filteredColors.map((color, idx) => {
      const id = this.state.colors.length + idx + 1;
      return createColor(color, id);
    });

    this.setState({
      colorInput: "",
      colors: [...this.state.colors, ...newColors]
    });
  };

  resetDisplay = () => {
    this.setState({
      colorInput: "",
      colors: []
    });
  };

  testColors = () => {
    this.setState(
      {
        colorInput: test
      },
      this.parseColors
    );
  };

  removeColor = event => {
    const id = event.target.dataset.colorIdx - 1; // Change ID from 1-idx -> 0-idx
    const colors = this.state.colors;
    colors.splice(id, 1);

    // Remap ID's on remaining colors
    const newColors = colors.map((color, idx) => {
      color.id = idx + 1;
      return color;
    });

    this.setState({ colors: newColors });
  };

  render() {
    const { colors, colorInput } = this.state;

    return (
      <div className="app-container">
        <div className="col color-entry">
          <div className="title">
            <p>Enter/Paste colors (hex or rgb)</p>
          </div>
          <div className="display text-area">
            <textarea
              className="color-textarea"
              rows="20"
              onChange={this.updateTextArea}
              value={colorInput}
            />
            <button onClick={this.parseColors}>Convert</button>
            <button onClick={this.resetDisplay}>Reset</button>
            <button onClick={this.testColors}>Test</button>
          </div>
        </div>
        <div className="col color-types">
          <div className="title">
            <p>Results ({colors.length})</p>
          </div>
          <div className="display results-display">
            <ColorGrid removeColor={this.removeColor} colors={colors} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
