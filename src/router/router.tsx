import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { Exchange } from "../pages/Exchage/Exchage";

export const ApplicationRouter = (): JSX.Element => {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard/:id?" exact>
          <Dashboard />
        </Route>
        <Route path="/exchange/:id?" exact>
          <Exchange />
        </Route>
        <Redirect from={"/"} to={"/dashboard"} />
      </Switch>
    </Router>
  );
};
