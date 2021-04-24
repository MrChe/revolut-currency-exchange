import React from "react";
// import { observer } from "mobx-react-lite";
import cn from "classnames";
import styles from "./Account.module.scss";
// import { useStore } from "../../models/connect";
import { AccountModel } from "../../models/AccountModel";

interface IAccountProps {
  // type: "from" | "to";
  view: "preview" | "exchange";
  currency: string;
  currencyName: string;
  balance: string;
}

export const Account = (props: IAccountProps): JSX.Element => {
  const { currency, currencyName, balance } = props;
  return (
    <div
      className={cn({
        [styles.Account]: true,
        [styles.View_Preview]: props.view === "preview",
        [styles.View_Exchange]: props.view === "exchange",
      })}
    >
      <div className={styles.CurrencyInformation}>
        <div className={styles.Wrapper}>
          {props.view === "exchange" ? (
            <div>
              <p className={styles.CurrencyTitle}>
                {
                  // activeAccount.currency
                  currency
                }
              </p>
              <p className={styles.CurrencyText}>
                You have: {balance}
                {/*{ExchangeModel.formatCurrency(*/}
                {/*  activeAccount.balance,*/}
                {/*  activeAccount.currency,*/}
                {/*)}*/}
              </p>
            </div>
          ) : (
            <div>
              <p className={styles.CurrencyTitle}>
                {balance}
                {/*{ExchangeModel.formatCurrency(*/}
                {/*  activeAccount.balance,*/}
                {/*  activeAccount.currency,*/}
                {/*)}*/}
              </p>
              <p>
                {
                  currencyName
                  // currencyNames[activeAccount.currency]
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
