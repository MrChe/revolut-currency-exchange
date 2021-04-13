import React from "react";
import { hot } from "react-hot-loader/root";
import { MobxProvider } from "./models/connect";
import { ApplicationRouter } from "./router/router";

import styles from "./App.module.scss";

const App = (): JSX.Element => {
  return (
    <div className={styles.App}>
      <MobxProvider>
        <ApplicationRouter />
      </MobxProvider>
    </div>
  );
};

export default hot(App);
