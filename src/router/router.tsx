import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Exchange from "../pages/Exchange/Exchange";

export const ApplicationRouter = (): JSX.Element => {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard/:id?" exact>
          <Dashboard />
        </Route>
        <Route path="/account/:id" exact>
          <Exchange />
        </Route>
        <Redirect from={"/"} to={"/dashboard"} />
      </Switch>
    </Router>
  );
};
