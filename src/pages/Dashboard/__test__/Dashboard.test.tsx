import React from "react";
import renderer from "react-test-renderer";
import { Dashboard } from "../Dashboard";
import { rootModel } from "../../../models/RootModel";
import { ratesData } from "../../../../tests/mockData";
import { TestWrapper } from "../../../../tests/testWrapper";

describe("Dashboard Page", () => {
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

    if (ExchangeModel.activeAccountTo) {
      ExchangeModel.updateHistoryInAccount(ExchangeModel.activeAccountTo.id, {
        name: `Exchange from ${ExchangeModel.activeAccountFrom?.currency}`,
        from: `+ ${ExchangeModel.formatCurrency(
          ExchangeModel.inputToValue,
          ExchangeModel.activeAccountTo?.currency || "",
        )}`,
        to: `- ${ExchangeModel.formatCurrency(
          ExchangeModel.inputFromValue,
          ExchangeModel.activeAccountFrom?.currency || "",
        )}`,
      });
    }
  });
  it("Dashboard snapshot", () => {
    const tree = renderer
      .create(
        <TestWrapper>
          <Dashboard />
        </TestWrapper>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
