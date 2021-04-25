import React from "react";
import renderer from "react-test-renderer";
import Exchange from "../Exchange";
import { rootModel } from "../../../models/RootModel";
import { ratesData } from "../../../../tests/mockData";
import { TestWrapper } from "../../../../tests/testWrapper";

describe("Exchange Page", () => {
  const ExchangeModel = rootModel.ExchangeModel;
  beforeAll(() => {
    ExchangeModel.setRatesData(ratesData);
    ExchangeModel.setAccounts(ratesData);
    ExchangeModel.setActiveAccountFrom(ExchangeModel.accounts[0].id);
    ExchangeModel.setActiveAccountTo(ExchangeModel.accounts[1].id);
    ExchangeModel.updateInputFromValue(10);
    ExchangeModel.updateInputToValue(2);
  });
  it("Exchange snapshot", () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <Exchange />
        </TestWrapper>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
