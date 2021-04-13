import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../../models/connect";

import styles from "./Dashboard.module.scss";

export const Dashboard = observer(function Dashboard(): JSX.Element {
  const history = useHistory();
  const { ExchangeModel } = useStore();
  useEffect(() => {
    if (!ExchangeModel.rateData) {
      ExchangeModel.getLatestRates();
    }
  }, [ExchangeModel.rateData]);
  return (
    <div className={styles.Dashboard}>
      Account
      <button onClick={() => history.push("/exchange")}>Exchange</button>
    </div>
  );
});
