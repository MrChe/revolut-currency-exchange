import React from "react";
import renderer from "react-test-renderer";
import { Button } from "../Button";

describe("Button Component", () => {
  it("Button snapshot", () => {
    const tree = renderer.create(<Button> Hello</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
