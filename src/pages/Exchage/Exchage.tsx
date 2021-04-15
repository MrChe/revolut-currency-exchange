import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../models/connect";
import { Slider } from "../../components/Slider/Slider";
import cn from "classnames";
import { useHistory } from "react-router-dom";

import styles from "./Exchage.module.scss";

export const Exchange = observer(function Exchange(): JSX.Element {
  const { ExchangeModel } = useStore();

  const history = useHistory();

  // useEffect(() => {
  //   if (ExchangeModel.accounts.length === 0) {
  //     ExchangeModel.getLatestRates();
  //   }
  // }, [ExchangeModel.accounts]);
  //
  // const [topInputValue, setTopInputValue] = useState<string | number | null>(
  //   null,
  // );
  // const [bottomInputValue, setBottomInputValue] = useState<
  //   string | number | null
  // >(null);
  //
  // const handleChangeTopSelect = (
  //   event: React.ChangeEvent<HTMLSelectElement>,
  // ) => {
  //   ExchangeModel.setActiveAccounts({
  //     ...ExchangeModel.activeAccounts,
  //     from: ExchangeModel.findAccountByCurrency(event.target.value),
  //   });
  //   setBottomInputValue(
  //     ExchangeModel.convertCurrency(topInputValue ? topInputValue : 0, {
  //       from: ExchangeModel.activeAccounts?.to?.currency || "",
  //       to: ExchangeModel.activeAccounts?.from?.currency || "",
  //     }),
  //   );
  // };
  //
  // const handleChangeBottomSelect = (
  //   event: React.ChangeEvent<HTMLSelectElement>,
  // ) => {
  //   ExchangeModel.setActiveAccounts({
  //     ...ExchangeModel.activeAccounts,
  //     to: ExchangeModel.findAccountByCurrency(event.target.value),
  //   });
  //   setTopInputValue(
  //     ExchangeModel.convertCurrency(bottomInputValue ? bottomInputValue : 0, {
  //       from: ExchangeModel.activeAccounts?.to?.currency || "",
  //       to: ExchangeModel.activeAccounts?.from?.currency || "",
  //     }),
  //   );
  // };
  //
  // const handleTopChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = event.target.value;
  //   const regExp = /^[0-9\b\.]+$/;
  //
  //   // if value is not blank, then test the regex
  //
  //   if (value === "" || regExp.test(value)) {
  //     setTopInputValue(value ? value : "");
  //     setBottomInputValue(
  //       ExchangeModel.convertCurrency(value ? value : 0, {
  //         from: ExchangeModel.activeAccounts?.from?.currency || "",
  //         to: ExchangeModel.activeAccounts?.to?.currency || "",
  //       }),
  //     );
  //   }
  // };
  // const handleBottomChangeValue = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  // ) => {
  //   const value = event.target.value;
  //   const regExp = /^[0-9\b\.]+$/;
  //
  //   // if value is not blank, then test the regex
  //
  //   if (value === "" || regExp.test(value)) {
  //     setBottomInputValue(value ? value : "");
  //     setTopInputValue(
  //       ExchangeModel.convertCurrency(value ? value : 0, {
  //         from: ExchangeModel.activeAccounts?.to?.currency || "",
  //         to: ExchangeModel.activeAccounts?.from?.currency || "",
  //       }),
  //     );
  //   }
  // };
  //
  // const handleExchange = () => {
  //   if (topInputValue && bottomInputValue) {
  //     ExchangeModel.exchange(Number(topInputValue), Number(bottomInputValue));
  //   }
  // };
  //
  // console.log("accounts", ExchangeModel?.accounts);
  // console.log("activeAccounts", ExchangeModel?.activeAccounts);

  const data = [
    {
      id: 1,
      currency: "USD",
      balance: 100,
    },
    {
      id: 2,
      currency: "EUR",
      balance: 100,
    },
    {
      id: 3,
      currency: "GBP",
      balance: 100,
    },
    {
      id: 4,
      currency: "UAH",
      balance: 100,
    },
  ];

  const handleCancel = () => {
    history.push("/");
  };
  return (
    <div className={styles.Exchange}>
      <button onClick={handleCancel}>Cancel</button>
      <div
        className={cn({
          [styles.AccountSection]: true,
          [styles.Light]: true,
        })}
      >
        <Slider data={data} id={"from_account_slider"} />
      </div>
      <div className={styles.ExchangeControlDivider}>
        <button>Exchange</button>
      </div>
      <div
        className={cn({
          [styles.AccountSection]: true,
          [styles.Dark]: true,
        })}
      >
        <Slider data={data} id={"to_account_slider"} />
      </div>
      {/*{ExchangeModel.activeAccounts ? (*/}
      {/*  <div className={styles.container}>*/}
      {/*    <div className={styles.wrapper}>*/}
      {/*      <div>*/}
      {/*        <div>*/}
      {/*          <select*/}
      {/*            name="top_currency"*/}
      {/*            id="top_currency"*/}
      {/*            onChange={handleChangeTopSelect}*/}
      {/*            value={ExchangeModel.activeAccounts.from?.currency}*/}
      {/*          >*/}
      {/*            {ExchangeModel.accounts.map((account) => {*/}
      {/*              if (*/}
      {/*                account.currency !==*/}
      {/*                ExchangeModel.activeAccounts?.to?.currency*/}
      {/*              ) {*/}
      {/*                return (*/}
      {/*                  <option key={account.currency} value={account.currency}>*/}
      {/*                    {account.currency}*/}
      {/*                  </option>*/}
      {/*                );*/}
      {/*              }*/}
      {/*            })}*/}
      {/*          </select>*/}
      {/*          <label htmlFor="top">{`TOP: ${ExchangeModel.activeAccounts.from?.currency}`}</label>*/}
      {/*          -*/}
      {/*          <input*/}
      {/*            type="text"*/}
      {/*            id="top"*/}
      {/*            onChange={handleTopChangeValue}*/}
      {/*            value={topInputValue ? topInputValue : ""}*/}
      {/*          />*/}
      {/*        </div>*/}
      {/*        <p>{`Balance: ${*/}
      {/*          ExchangeModel.activeAccounts?.from &&*/}
      {/*          ExchangeModel.formatCurrency(*/}
      {/*            ExchangeModel.activeAccounts?.from?.balance,*/}
      {/*            ExchangeModel.activeAccounts?.from?.currency,*/}
      {/*          )*/}
      {/*        }`}</p>*/}
      {/*      </div>*/}
      {/*      <div>*/}
      {/*        <div>*/}
      {/*          <select*/}
      {/*            name="bottom_currency"*/}
      {/*            id="bottom_currency"*/}
      {/*            onChange={handleChangeBottomSelect}*/}
      {/*            value={ExchangeModel.activeAccounts.to?.currency}*/}
      {/*          >*/}
      {/*            {ExchangeModel.accounts.map((account) => {*/}
      {/*              if (*/}
      {/*                account.currency !==*/}
      {/*                ExchangeModel.activeAccounts?.from?.currency*/}
      {/*              ) {*/}
      {/*                return (*/}
      {/*                  <option key={account.currency} value={account.currency}>*/}
      {/*                    {account.currency}*/}
      {/*                  </option>*/}
      {/*                );*/}
      {/*              }*/}
      {/*            })}*/}
      {/*          </select>*/}
      {/*          <label htmlFor="bottom">*/}
      {/*            {`BOTTOM: ${ExchangeModel.activeAccounts?.to?.currency}`}*/}
      {/*          </label>*/}
      {/*          +*/}
      {/*          <input*/}
      {/*            type="text"*/}
      {/*            id="bottom"*/}
      {/*            onChange={handleBottomChangeValue}*/}
      {/*            value={bottomInputValue ? bottomInputValue : ""}*/}
      {/*          />*/}
      {/*        </div>*/}
      {/*        <div>*/}
      {/*          <p>{`Balance: ${*/}
      {/*            ExchangeModel.activeAccounts?.to &&*/}
      {/*            ExchangeModel.formatCurrency(*/}
      {/*              ExchangeModel.activeAccounts?.to?.balance,*/}
      {/*              ExchangeModel.activeAccounts?.to?.currency,*/}
      {/*            )*/}
      {/*          }`}</p>*/}
      {/*          ------*/}
      {/*          <p>*/}
      {/*            Rate:{" "}*/}
      {/*            {ExchangeModel.activeAccounts?.to &&*/}
      {/*              `${ExchangeModel.formatCurrency(*/}
      {/*                1,*/}
      {/*                ExchangeModel.activeAccounts?.to?.currency,*/}
      {/*              )} = ${*/}
      {/*                ExchangeModel.activeAccounts?.from?.currency*/}
      {/*              } ${ExchangeModel.convertCurrency(1, {*/}
      {/*                from: ExchangeModel.activeAccounts?.to?.currency || "",*/}
      {/*                to: ExchangeModel.activeAccounts?.from?.currency || "",*/}
      {/*              })}`}*/}
      {/*          </p>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <button*/}
      {/*      onClick={handleExchange}*/}
      {/*      disabled={!topInputValue && !bottomInputValue}*/}
      {/*    >*/}
      {/*      Exchange*/}
      {/*    </button>*/}
      {/*  </div>*/}
      {/*) : (*/}
      {/*  <div>Loading...</div>*/}
      {/*)}*/}
    </div>
  );
});
