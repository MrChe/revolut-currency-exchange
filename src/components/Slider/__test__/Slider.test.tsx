import React from "react";
import renderer from "react-test-renderer";
import { Slider } from "../Slider";
import { TestWrapper } from "../../../../tests/testWrapper";
import { rootModel } from "../../../models/RootModel";
import { ratesData } from "../../../../tests/mockData";

describe("Slider Component", () => {
  const ExchangeModel = rootModel.ExchangeModel;
  beforeAll(() => {
    ExchangeModel.setRatesData(ratesData);
    ExchangeModel.setAccounts(ratesData);
    ExchangeModel.setActiveAccountFrom(ExchangeModel.accounts[0].id);
    ExchangeModel.setActiveAccountTo(ExchangeModel.accounts[1].id);
  });
  it("Slider for dashboard snapshot", () => {
    const handleSlideChange = jest.fn();
    const onInitSwiper = jest.fn();
    const tree = renderer
      .create(
        <TestWrapper>
          <Slider
            history={{
              key: "dashboard",
            }}
            data={ExchangeModel.accountsAsArray}
            id={"dashboard_slider"}
            onSlideChange={handleSlideChange}
            onSwiper={onInitSwiper}
            view={"preview"}
          />
        </TestWrapper>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
