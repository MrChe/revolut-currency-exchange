import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
// import { useStore } from "../../models/connect";

import styles from "./AccountExchange.module.scss";

export const AccountExchange = observer(function Dashboard(): JSX.Element {
  return <div className={styles.AccountExchange}>AccountExchange</div>;
});
