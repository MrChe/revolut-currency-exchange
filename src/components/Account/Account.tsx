import React from "react";
import { observer } from "mobx-react-lite";
import { AccountModel } from "../../models/AccountModel";

import styles from "./Account.module.scss";

interface IAccountProps {
  account: AccountModel;
}

export const Account = observer(function Account(
  props: IAccountProps,
): JSX.Element {
  const { account } = props;
  return (
    <div className={styles.Account}>
      <div>{account.currency}</div>
      <div>{account.balance}</div>
    </div>
  );
});
