import React, { Component } from "react";
import Color from "./Color";
import "./application.scss";

/** TEST COLORS
#353B4B
#ff001E
rgb(0,0,200);
#3A3A48
#0fa912
rgb(200,150,2);
#232836
#454E5F
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
    this.setState({ colors: this.state.colorInput.split("\n") });
  };

  resetDisplay = () => {
    this.setState = {
      colorInput: "",
      colors: []
    };
  };

  render() {
    return (
      <div className="container">
        <div className="col color-entry">
          <div className="title">
            <p>Enter/Paste colors</p>
            <button onClick={this.resetDisplay}>Reset</button>
          </div>
          <div className="display text-area">
            <textarea
              className="color-textarea"
              rows="20"
              onChange={this.updateTextArea}
            />
            <button onClick={this.parseColors}>Convert</button>
          </div>
        </div>
        <div className="col color-types">
          <div className="title">
            <p>Results</p>
          </div>
          <div className="display results-display">
            <div className="all">
              {this.state.colors.map((color, idx) => {
                return <Color color={color} key={idx} />;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
