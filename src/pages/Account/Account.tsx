import React from "react";
import { useHistory } from "react-router-dom";

import styles from "./Account.module.scss";

export const Account = (): JSX.Element => {
  const history = useHistory();
  return (
    <div className={styles.Account}>
      Account
      <button onClick={() => history.push("/exchange")}>Go TO Exchange</button>
    </div>
  );
};
