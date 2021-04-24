import React from "react";
import renderer from "react-test-renderer";
import { Button } from "../Button";
import { Icon } from "../../../components/icons/icons";

describe("Button Component", () => {
  it("Button with text snapshot", () => {
    const tree = renderer.create(<Button>Hello</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Button circle with icon snapshot", () => {
    const tree = renderer
      .create(
        <Button type={"circle"}>
          <Icon.Exchange />
        </Button>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Button bg white with icon snapshot", () => {
    const tree = renderer
      .create(
        <Button type={"circle"} bg={"white"}>
          <Icon.Exchange />
        </Button>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Button bg white disabled snapshot", () => {
    const tree = renderer
      .create(
        <Button type={"circle"} bg={"white"}>
          Hello
        </Button>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
