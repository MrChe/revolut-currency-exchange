import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Slider } from "../../components/Slider/Slider";
import { Icon } from "../../components/icons/icons";
import { useStore } from "../../models/connect";

import styles from "./Dashboard.module.scss";

export const Dashboard = observer(function Dashboard(): JSX.Element {
  const history = useHistory();
  const { DashboardModel } = useStore();

  useEffect(() => {
    if (DashboardModel.accounts.length === 0) {
      DashboardModel.getLatestRates();
    }
  }, [DashboardModel.accounts.length]);

  return DashboardModel.accounts.length !== 0 ? (
    <div className={styles.Dashboard}>
      <h1>Dashboard</h1>
      <div className={styles.Preview}>
        <Slider data={DashboardModel.accountsAsArray} id={"dashboard_slider"} />
      </div>
      <div className={styles.Controls}>
        <button onClick={() => history.push("/exchange")}>
          <Icon.Exchange />
        </button>
      </div>
      <div className={styles.History}>History</div>
    </div>
  ) : (
    <div>Loading</div>
  );
});
