import React from "react";
import { hot } from "react-hot-loader/root";
import { MobxProvider } from "./models/connect";
import { ApplicationRouter } from "./router/router";
import { configure } from "mobx";
import { enableLogging } from "mobx-logger";
import { rootModel } from "./models/RootModel";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

import styles from "./App.module.scss";

// https://mobx.js.org/configuration.html#configuration-
// configure({
//   enforceActions: "always",
//   computedRequiresReaction: true,
//   reactionRequiresObservable: true,
//   observableRequiresReaction: true,
//   disableErrorBoundaries: false,
// });
//
// enableLogging({
//   predicate: () => true,
//   action: true,
//   reaction: true,
//   transaction: true,
//   compute: true,
// });

const ErrorFallback = (props: FallbackProps): JSX.Element => {
  const { error, resetErrorBoundary } = props;
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

const App = (): JSX.Element => {
  return (
    <div className={styles.App}>
      <MobxProvider value={rootModel}>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            // reset the state of your app so the error doesn't happen again
          }}
        >
          <ApplicationRouter />
        </ErrorBoundary>
      </MobxProvider>
    </div>
  );
};

export default hot(App);
