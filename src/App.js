import React, { Component } from "react";
import ColorGrid from "./ColorGrid";
import "./application.scss";

/** TEST COLORS
#353B4B
ff001E
rgb(0, 0, 200)
#3A3A48 0fa912
rgb( 200 , 150 , 2 ) rgb(1,2,3)
#232836
#454E5F
#ffffff
#050505
#e1e1e1
#444444
#999999
 */

class App extends Component {
  constructor() {
    super();
    this.state = {
      colorInput: "",
      colors: []
    };
  }

  updateTextArea = event => {
    this.setState({ colorInput: event.target.value });
  };

  parseColors = () => {
    if (this.state.colorInput) {
      const re = new RegExp(
        /(rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)|#?([0-9]|[a-f]){6})/,
        "gi"
      );
      const colors = this.state.colorInput.match(re);
      if (colors) {
        this.setState({ colors });
      }
    }
  };

  resetDisplay = () => {
    this.setState({
      colorInput: "",
      colors: []
    });
  };

  render() {
    return (
      <div className="app-container">
        <div className="col color-entry">
          <div className="title">
            <p>Enter/Paste colors (hex or rgb)</p>
            <button onClick={this.resetDisplay}>Reset</button>
          </div>
          <div className="display text-area">
            <textarea
              className="color-textarea"
              rows="20"
              onChange={this.updateTextArea}
              value={this.state.colorInput}
            />
            <button onClick={this.parseColors}>Convert</button>
          </div>
        </div>
        <div className="col color-types">
          <div className="title">
            <p>Results</p>
          </div>
          <div className="display results-display">
            <ColorGrid colors={this.state.colors} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
