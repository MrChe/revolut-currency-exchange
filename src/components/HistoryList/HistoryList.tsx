import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../models/connect";
import { AccountHistory } from "../../models/AccountModel";

import styles from "./HistoryList.module.scss";

export const HistoryList = observer(function HistoryList(): JSX.Element {
  const { ExchangeModel } = useStore();

  const accountHistory = ExchangeModel.activeAccountFrom?.history;

  return accountHistory && accountHistory?.length !== 0 ? (
    <ul className={styles.HistoryList}>
      {accountHistory.map((h: AccountHistory) => {
        return (
          <li key={h.id} className={styles.HistoryListItem}>
            <div className={styles.HistoryWrapper}>
              <div className={styles.HistoryLeftPart}>
                <p className={styles.HistoryCurrencyName}>{h.name}</p>
                <p className={styles.HistoryTime}>{h.time}</p>
              </div>
              <div className={styles.HistoryRightPart}>
                <p className={styles.BigCurrency}>{h.from}</p>
                <p className={styles.SmallCurrency}>{h.to}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  ) : (
    <div></div>
  );
});
