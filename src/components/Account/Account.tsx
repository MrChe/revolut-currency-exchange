import React from "react";
import { observer } from "mobx-react-lite";
import cn from "classnames";
import styles from "./Account.module.scss";
import { useStore } from "../../models/connect";

interface IAccountProps {
  type: "from" | "to";
  view: "preview" | "exchange";
}

export const Account = observer(function Account(
  props: IAccountProps,
): JSX.Element {
  const { ExchangeModel } = useStore();
  const currencyNames = ExchangeModel.currencyNames;
  const accountFrom = ExchangeModel.activeAccountFrom;
  const accountTo = ExchangeModel.activeAccountTo;
  const activeAccount = props.type === "from" ? accountFrom : accountTo;

  return activeAccount ? (
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
              <p className={styles.CurrencyTitle}>{activeAccount.currency}</p>
              <p className={styles.CurrencyText}>
                You have:{" "}
                {ExchangeModel.formatCurrency(
                  activeAccount.balance,
                  activeAccount.currency,
                )}
              </p>
            </div>
          ) : (
            <div>
              <p className={styles.CurrencyTitle}>
                {ExchangeModel.formatCurrency(
                  activeAccount.balance,
                  activeAccount.currency,
                )}
              </p>
              <p>{currencyNames[activeAccount.currency]}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
});
