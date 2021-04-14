import React, { useState } from "react";
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

  const handleChangeTopSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    ExchangeModel.setActiveAccounts({
      ...ExchangeModel.activeAccounts,
      top: ExchangeModel.findAccountByCurrency(event.target.value),
    });
    setBottomInputValue(
      ExchangeModel.convertCurrency(topInputValue ? topInputValue : 0, {
        from: ExchangeModel.activeAccounts?.bottom?.currency || "",
        to: ExchangeModel.activeAccounts?.top?.currency || "",
      }),
    );
  };

  const handleChangeBottomSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    ExchangeModel.setActiveAccounts({
      ...ExchangeModel.activeAccounts,
      bottom: ExchangeModel.findAccountByCurrency(event.target.value),
    });
    setTopInputValue(
      ExchangeModel.convertCurrency(bottomInputValue ? bottomInputValue : 0, {
        from: ExchangeModel.activeAccounts?.bottom?.currency || "",
        to: ExchangeModel.activeAccounts?.top?.currency || "",
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
          from: ExchangeModel.activeAccounts?.top?.currency || "",
          to: ExchangeModel.activeAccounts?.bottom?.currency || "",
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
          from: ExchangeModel.activeAccounts?.bottom?.currency || "",
          to: ExchangeModel.activeAccounts?.top?.currency || "",
        }),
      );
    }
  };

  const handleExchange = () => {
    if (topInputValue && bottomInputValue) {
      ExchangeModel.exchange(Number(topInputValue), Number(bottomInputValue));
    }
  };

  console.log("accounts", ExchangeModel?.accounts);
  console.log("activeAccounts", ExchangeModel?.activeAccounts);
  return (
    <div className={styles.ExchangePage}>
      {ExchangeModel.activeAccounts && (
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div>
              <div>
                <select
                  name="top_currency"
                  id="top_currency"
                  onChange={handleChangeTopSelect}
                  value={ExchangeModel.activeAccounts.top?.currency}
                >
                  {ExchangeModel.accounts.map((account) => {
                    if (
                      account.currency !==
                      ExchangeModel.activeAccounts?.bottom?.currency
                    ) {
                      return (
                        <option key={account.currency} value={account.currency}>
                          {account.currency}
                        </option>
                      );
                    }
                  })}
                </select>
                <label htmlFor="top">{`TOP: ${ExchangeModel.activeAccounts.top?.currency}`}</label>
                -
                <input
                  type="text"
                  id="top"
                  onChange={handleTopChangeValue}
                  value={topInputValue ? topInputValue : ""}
                />
              </div>
              <p>{`Balance: ${
                ExchangeModel.activeAccounts?.top &&
                ExchangeModel.formatCurrency(
                  ExchangeModel.activeAccounts?.top?.balance,
                  ExchangeModel.activeAccounts?.top?.currency,
                )
              }`}</p>
            </div>
            <div>
              <div>
                <select
                  name="bottom_currency"
                  id="bottom_currency"
                  onChange={handleChangeBottomSelect}
                  value={ExchangeModel.activeAccounts.bottom?.currency}
                >
                  {ExchangeModel.accounts.map((account) => {
                    if (
                      account.currency !==
                      ExchangeModel.activeAccounts?.top?.currency
                    ) {
                      return (
                        <option key={account.currency} value={account.currency}>
                          {account.currency}
                        </option>
                      );
                    }
                  })}
                </select>
                <label htmlFor="bottom">
                  {`BOTTOM: ${ExchangeModel.activeAccounts?.bottom?.currency}`}
                </label>
                +
                <input
                  type="text"
                  id="bottom"
                  onChange={handleBottomChangeValue}
                  value={bottomInputValue ? bottomInputValue : ""}
                />
              </div>
              <p>{`Balance: ${
                ExchangeModel.activeAccounts?.bottom &&
                ExchangeModel.formatCurrency(
                  ExchangeModel.activeAccounts?.bottom?.balance,
                  ExchangeModel.activeAccounts?.bottom?.currency,
                )
              }`}</p>
            </div>
          </div>
          <button
            onClick={handleExchange}
            disabled={!topInputValue && !bottomInputValue}
          >
            Ecxchange
          </button>
        </div>
      )}
    </div>
  );
});
