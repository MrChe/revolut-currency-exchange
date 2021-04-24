import React from "react";
import renderer from "react-test-renderer";
import { HistoryList } from "../HistoryList";
import { rootModel } from "../../../models/RootModel";
import { ratesData } from "../../../../tests/mockData";
import { TestWrapper } from "../../../../tests/testWrapper";

describe("HistoryList Component", () => {
  const ExchangeModel = rootModel.ExchangeModel;
  beforeAll(() => {
    ExchangeModel.setRatesData(ratesData);
    ExchangeModel.setAccounts(ratesData);
    ExchangeModel.setActiveAccountFrom(ExchangeModel.accounts[0].id);
    ExchangeModel.setActiveAccountTo(ExchangeModel.accounts[1].id);
    if (ExchangeModel.activeAccountFrom) {
      ExchangeModel.updateHistoryInAccount(
        ExchangeModel.activeAccountFrom?.id,
        {
          name: `Exchange to ${ExchangeModel.activeAccountTo?.currency}`,
          from: `- ${ExchangeModel.formatCurrency(
            ExchangeModel.inputFromValue,
            ExchangeModel.activeAccountFrom?.currency || "",
          )}`,
          to: `+ ${ExchangeModel.formatCurrency(
            ExchangeModel.inputToValue,
            ExchangeModel.activeAccountTo?.currency || "",
          )}`,
        },
      );
    }
  });
  it("HistoryList snapshot", () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <HistoryList />
        </TestWrapper>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
