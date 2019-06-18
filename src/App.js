import React, { Component } from "react";
import ContentEditable from "react-contenteditable";
import ColorGrid from "./ColorGrid";
import "./application.scss";
import { matchColors, tagColors, createColor, format2hex } from "./color-utils";
import { test } from "./testData";

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
    const colorInput = tagColors(this.state.colorInput);

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
      colors: [...this.state.colors, ...newColors],
      colorInput
    });
  };

  resetInputDisplay = () => {
    this.setState({
      colorInput: ""
    });
  };

  resetColorDisplay = () => {
    this.setState({
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
    const id = event.currentTarget.dataset.colorIdx - 1; // Change ID from 1-idx -> 0-idx
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
            <button onClick={this.testColors}>Test Data</button>
          </div>
          <div className="display text-area">
            <ContentEditable
              className="color-textarea"
              onChange={this.updateTextArea}
              html={colorInput}
            />
            <button className="action-btn" onClick={this.parseColors}>
              Parse Colors
            </button>
            <button className="action-btn" onClick={this.resetInputDisplay}>
              Reset Text
            </button>
            <button className="action-btn" onClick={this.resetColorDisplay}>
              Reset Colors
            </button>
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
