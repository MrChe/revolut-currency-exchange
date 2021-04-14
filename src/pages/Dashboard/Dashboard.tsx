import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";
// import { useStore } from "../../models/

import styles from "./Dashboard.module.scss";

export const Dashboard = observer(function Dashboard(): JSX.Element {
  const history = useHistory();

  return (
    <div className={styles.Dashboard}>
      <h1>Account</h1>

      <button onClick={() => history.push("/exchange")}>Exchange</button>
    </div>
  );
});
