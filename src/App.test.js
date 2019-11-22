import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import Color from "./models/color";

const BLACK = "#000000";
const RED = "#ff0000";
const GREEN = "#00ff00";

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

  describe("parse colors", () => {
    it("parses colors", () => {
      instance.setState({ colorInput: `${BLACK} ${RED}` });
      component.update();

      instance.parseColors();
      component.update();
      expect(instance.state.colors.length).toBe(2);
    });

    it("parses nothing if no matches", () => {
      instance.setState({ colorInput: `asdf` });
      component.update();

      instance.parseColors();
      component.update();
      expect(instance.state.colors.length).toBe(0);
    });

    it("does not add duplicate entries", () => {
      instance.setState({ colorInput: `${BLACK} ${BLACK}` });
      component.update();

      instance.parseColors();
      component.update();
      expect(instance.state.colors.length).toBe(1);
    });

    it("does not add duplicate existing colors", () => {
      instance.setState({ colors: [new Color(BLACK)], colorInput: BLACK });
      component.update();

      instance.parseColors();
      component.update();
      expect(instance.state.colors.length).toBe(1);
    });
  });
});
