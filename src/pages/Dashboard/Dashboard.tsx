import React from "react";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Slider } from "../../components/Slider/Slider";

import styles from "./Dashboard.module.scss";

export const Dashboard = observer(function Dashboard(): JSX.Element {
  const history = useHistory();
  const data = [
    {
      id: 1,
      currency: "USD",
    },
    {
      id: 2,
      currency: "EUR",
    },
    {
      id: 3,
      currency: "GBP",
    },
    {
      id: 4,
      currency: "UAH",
    },
  ];
  return (
    <div className={styles.Dashboard}>
      <h1>Account</h1>
      <Slider data={data} />
      <button onClick={() => history.push("/exchange")}>Exchange</button>
    </div>
  );
});
