import React from "react";
import { shallow } from "enzyme";
import App from "./App";

const BLACK = "#000000";

describe("CompareColors App", () => {
  let component;
  let instance;

  beforeEach(() => {
    component = shallow(<App />);
    instance = component.instance();
  });

  it("renders primary component", () => {
    expect(component).toHaveLength(1);
  });

  it("resets colors", () => {
    instance.setState({
      colors: [
        { hexColor: BLACK },
        { hexColor: "00ff00" },
        { hexColor: "ff0000" },
        { hexColor: "0000ff" }
      ]
    });
    component.update();
    expect(instance.state.colors.length).toBe(4);

    instance.resetColorDisplay();
    component.update();
    expect(instance.state.colors.length).toBe(0);
  });

  it("removes color", () => {
    instance.setState({ colors: [{ hexColor: BLACK }] });
    component.update();

    instance.removeColor(BLACK);
    component.update();
    expect(instance.state.colors.length).toBe(0);
  });

  it("resets color input", () => {
    instance.setState({ colorInput: BLACK });
    component.update();
    expect(instance.state.colorInput).toBe(BLACK);

    instance.resetInputDisplay();
    component.update();
    expect(instance.state.colors.length).toBe(0);
  });

  it("updates text area", () => {
    instance.updateTextArea({ target: { value: "new text" } });
    component.update();
    expect(instance.state.colorInput).toBe("new text");
  });
});
