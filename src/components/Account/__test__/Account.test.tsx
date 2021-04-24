import React, { Fragment } from "react";
import renderer from "react-test-renderer";
import { rootModel } from "../../../models/RootModel";
import { Account } from "../Account";
import { TestWrapper } from "../../../../tests/testWrapper";
import { ratesData } from "../../../../tests/mockData";
import { formatCurrency, currencyNames } from "../../../utils/helpers";

describe("Test Account Component", () => {
  const ExchangeModel = rootModel.ExchangeModel;
  beforeAll(() => {
    ExchangeModel.setRatesData(ratesData);
    ExchangeModel.setAccounts(ratesData);
    ExchangeModel.setActiveAccountFrom(ExchangeModel.accounts[0].id);
    ExchangeModel.setActiveAccountTo(ExchangeModel.accounts[1].id);
  });

  it("Account type Preview snapshot", () => {
    const tree = renderer
      .create(
        <TestWrapper>
          {ExchangeModel.activeAccountFrom ? (
            <Account
              balance={formatCurrency(
                ExchangeModel.activeAccountFrom?.balance,
                ExchangeModel.activeAccountFrom?.currency,
              )}
              view={"preview"}
              currency={ExchangeModel.activeAccountFrom?.currency}
              currencyName={
                currencyNames[ExchangeModel.activeAccountFrom?.currency] || ""
              }
            />
          ) : (
            <Fragment />
          )}
        </TestWrapper>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Account type Exchange snapshot", () => {
    const tree = renderer
      .create(
        <TestWrapper>
          {ExchangeModel.activeAccountFrom ? (
            <Account
              balance={formatCurrency(
                ExchangeModel.activeAccountFrom?.balance,
                ExchangeModel.activeAccountFrom?.currency,
              )}
              view={"exchange"}
              currency={ExchangeModel.activeAccountFrom?.currency}
              currencyName={
                currencyNames[ExchangeModel.activeAccountFrom?.currency] || ""
              }
            />
          ) : (
            <Fragment />
          )}
        </TestWrapper>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
