import React from "react";
import { hot } from "react-hot-loader/root";
import { MobxProvider } from "./models/connect";
import { ApplicationRouter } from "./router/router";
import { configure } from "mobx";

import styles from "./App.module.scss";

// https://mobx.js.org/configuration.html#configuration-
configure({
  enforceActions: "always",
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: false,
});

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
