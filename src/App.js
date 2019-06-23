import React, { Component } from "react";
import ColorGrid from "./ColorGrid";
import ColorInput from "./ColorInput";
import "./styles/application.scss";
import Color from "./models/color";
import { matchColors } from "./color-utils";
import { distanceDelta } from "./distance-utils";
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
    const { colorInput, colors } = this.state;

    if (!colorInput) {
      return;
    }

    const matchedColors = matchColors(colorInput);

    if (!matchedColors) {
      return;
    }

    const colorMatchedInput = matchedColors.reduce((str, color, idx) => {
      const dist = distanceDelta(new Color(color));
      const textColor = dist > 70 ? "black" : "white";

      return str.replace(
        color,
        `<span class="tagged-color" id=${idx +
          1} style="color: ${textColor}; background-color: $&">$&</span>`
      );
    }, colorInput);

    const existingHex = colors.map(({ hexColor }) => hexColor);
    const filteredColors = matchedColors.reduce((results, color) => {
      const { hexColor } = new Color(color);

      // No duplicates!
      if (!existingHex.includes(hexColor) && !results.includes(hexColor)) {
        results.push(hexColor);
      }

      return results;
    }, []);

    const newColors = filteredColors.map((color, idx) => {
      const id = colors.length + idx + 1;
      return new Color(color, id);
    });

    this.setState({
      colors: [...colors, ...newColors],
      colorMatchedInput
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
    const { colors } = this.state;
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
        <ColorInput
          colorInput={colorInput}
          updateTextArea={this.updateTextArea}
          testColors={this.testColors}
          parseColors={this.parseColors}
          resetInputDisplay={this.resetInputDisplay}
          resetColorDisplay={this.resetColorDisplay}
        />
        <ColorGrid removeColor={this.removeColor} colors={colors} />
      </div>
    );
  }
}

export default App;
