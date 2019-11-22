import React, { Component } from "react";
import ColorGrid from "./ColorGrid";
import ColorInput from "./ColorInput";
import "./styles/application.scss";
import Color from "./models/color";
import { matchColors } from "./color-utils";
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

    const existingHex = colors.map(({ hexColor }) => hexColor);
    const filteredColors = matchedColors.reduce((results, color) => {
      const { hexColor } = new Color(color);

      // No duplicates!
      if (!existingHex.includes(hexColor) && !results.includes(hexColor)) {
        results.push(hexColor);
      }

      return results;
    }, []);

    const newColors = filteredColors.map(color => new Color(color));

    this.setState({
      colors: [...colors, ...newColors]
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

  removeColor = hexColor => {
    const { colors: prevColors } = this.state;

    const colors = prevColors.filter(color => {
      return color.hexColor !== hexColor;
    });

    this.setState({ colors });
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
        />
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
