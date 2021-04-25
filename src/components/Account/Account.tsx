import React from "react";
import cn from "classnames";
import styles from "./Account.module.scss";

interface IAccountProps {
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
              <p className={styles.CurrencyTitle}>{currency}</p>
              <p className={styles.CurrencyText}>You have: {balance}</p>
            </div>
          ) : (
            <div>
              <p className={styles.CurrencyTitle}>{balance}</p>
              <p>{currencyName}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
