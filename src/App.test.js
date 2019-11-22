import React from "react";
import { shallow } from "enzyme";
import App from "./App";

const BLACK = "#000000";

describe("CompareColors App", () => {
  it("renders primary component", () => {
    const component = shallow(<App />);
    expect(component).toHaveLength(1);
  });

  it("resets colors state", () => {
    const component = shallow(<App />);
    const instance = component.instance();
    instance.resetColorDisplay();
    component.update();
    expect(instance.state.colors.length).toBe(0);
  });

  it("removes color", () => {
    const component = shallow(<App />);
    const instance = component.instance();

    instance.setState({ colors: [{ hexColor: BLACK }] });
    component.update();

    instance.removeColor(BLACK);
    component.update();
    expect(instance.state.colors.length).toBe(0);
  });

  it("resets color input", () => {
    const component = shallow(<App />);
    const instance = component.instance();

    instance.setState({ colorInput: BLACK });
    component.update();
    expect(instance.state.colorInput).toBe(BLACK);

    instance.resetInputDisplay();
    component.update();
    expect(instance.state.colors.length).toBe(0);
  });

  it("updates text area", () => {
    const component = shallow(<App />);
    const instance = component.instance();

    instance.updateTextArea({ target: { value: "new text" } });
    component.update();
    expect(instance.state.colorInput).toBe("new text");
  });
});
