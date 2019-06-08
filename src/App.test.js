import React from "react";
import { shallow } from "enzyme";
import App from "./App";

it("renders App comoponent", () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toHaveLength(1);
});
