import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../models/connect";

import styles from "./Exchage.module.scss";

export const Exchange = observer(function Exchange(): JSX.Element {
  const { ExchangeModel } = useStore();

  const [topInputValue, setTopInputValue] = useState<string | number | null>(
    null,
  );
  const [bottomInputValue, setBottomInputValue] = useState<
    string | number | null
  >(null);

  useEffect(() => {
    if (!ExchangeModel.rateData) {
      ExchangeModel.getLatestRates();
    }
  }, [ExchangeModel.rateData]);

  const handleChangeTopSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    ExchangeModel.setCurrencyData({
      ...ExchangeModel.currencyData,
      top: event.target.value,
    });
    setBottomInputValue(
      ExchangeModel.convertCurrency(topInputValue ? topInputValue : 0, {
        from: ExchangeModel.currencyData?.bottom || "",
        to: ExchangeModel.currencyData?.top || "",
      }),
    );
  };

  const handleChangeBottomSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    ExchangeModel.setCurrencyData({
      ...ExchangeModel.currencyData,
      bottom: event.target.value,
    });
    setTopInputValue(
      ExchangeModel.convertCurrency(bottomInputValue ? bottomInputValue : 0, {
        from: ExchangeModel.currencyData?.bottom || "",
        to: ExchangeModel.currencyData?.top || "",
      }),
    );
  };

  const handleTopChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const regExp = /^[0-9\b\.]+$/;

    // if value is not blank, then test the regex

    if (value === "" || regExp.test(value)) {
      setTopInputValue(value ? value : "");
      setBottomInputValue(
        ExchangeModel.convertCurrency(value ? value : 0, {
          from: ExchangeModel.currencyData?.top || "",
          to: ExchangeModel.currencyData?.bottom || "",
        }),
      );
    }
  };
  const handleBottomChangeValue = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    const regExp = /^[0-9\b\.]+$/;

    // if value is not blank, then test the regex

    if (value === "" || regExp.test(value)) {
      setBottomInputValue(value ? value : "");
      setTopInputValue(
        ExchangeModel.convertCurrency(value ? value : 0, {
          from: ExchangeModel.currencyData?.bottom || "",
          to: ExchangeModel.currencyData?.top || "",
        }),
      );
    }
  };

  console.log("topInputValue", topInputValue);
  console.log("bottomInputValue", bottomInputValue);
  return (
    <div className={styles.ExchangePage}>
      {ExchangeModel.rateData && ExchangeModel.currencyData && (
        <div className={styles.wrapper}>
          <div>
            <select
              name="top_currency"
              id="top_currency"
              onChange={handleChangeTopSelect}
              value={ExchangeModel.currencyData.top}
            >
              {Object.keys(ExchangeModel.rateData.rates).map((key: string) => {
                if (key !== ExchangeModel.currencyData?.bottom) {
                  return (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  );
                }
              })}
            </select>
            <label htmlFor="top">{`TOP: ${ExchangeModel.currencyData.top}`}</label>
            <input
              type="text"
              id="top"
              onChange={handleTopChangeValue}
              value={topInputValue ? topInputValue : ""}
            />
          </div>
          <div>
            <select
              name="bottom_currency"
              id="bottom_currency"
              onChange={handleChangeBottomSelect}
              value={ExchangeModel.currencyData.bottom}
            >
              {Object.keys(ExchangeModel.rateData.rates).map((key: string) => {
                if (key !== ExchangeModel.currencyData?.top) {
                  return (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  );
                }
              })}
            </select>
            <label htmlFor="bottom">
              {`BOTTOM: ${ExchangeModel.currencyData?.bottom}`}
            </label>
            <input
              type="text"
              id="bottom"
              onChange={handleBottomChangeValue}
              value={bottomInputValue ? bottomInputValue : ""}
            />
          </div>
        </div>
      )}
    </div>
  );
});
