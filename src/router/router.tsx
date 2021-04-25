import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Exchange from "../pages/Exchange/Exchange";
import { Spinner } from "../components/Spinner/Spinner";

import styles from "../App.module.scss";

export const ApplicationRouter = (): JSX.Element => {
  return (
    <Router>
      <Suspense
        fallback={
          <div className={styles.LoadingWrapper}>
            <Spinner />
          </div>
        }
      >
        <Switch>
          <Route path="/dashboard/:id?" exact>
            <Dashboard />
          </Route>
          <Route path="/account/:id" exact>
            <Exchange />
          </Route>
          <Redirect from={"/"} to={"/dashboard"} />
        </Switch>
      </Suspense>
    </Router>
  );
};
