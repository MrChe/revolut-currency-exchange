import React from "react";
import renderer from "react-test-renderer";
import { Account } from "../Account";
import { TestWrapper } from "../../../../tests/testWrapper";

describe("Test Account Component", () => {
  it("Account From Preview snapshot", () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <Account type={"from"} view={"preview"} />
        </TestWrapper>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Account From Exchange snapshot", () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <Account type={"from"} view={"exchange"} />
        </TestWrapper>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Account To Exchange snapshot", () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <Account type={"to"} view={"exchange"} />
        </TestWrapper>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
